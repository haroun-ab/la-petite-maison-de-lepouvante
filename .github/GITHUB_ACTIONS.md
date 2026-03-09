# GitHub Actions CI/CD Pipeline

## Vue d'ensemble

Ce projet utilise GitHub Actions comme système de CI/CD. Le pipeline est défini dans `.github/workflows/github-action.yml` et s'exécute sur la branche `rabbitmq`.

```
push / pull_request → rabbitmq
         │
         ├─── test-backend  ──────────────────────────────┐
         │                                                 ├──► build ──► deploy
         └─── test-frontend ──► sonar-frontend            │
                          └──► sonar-backend ─────────────┘
```

---

## Déclencheurs

| Événement | Branche |
|---|---|
| `push` | `rabbitmq` |
| `pull_request` | `rabbitmq` |

---

## Jobs

### 1. `test-backend` — Tests Backend

| Propriété | Valeur |
|---|---|
| Runner | `ubuntu-latest` (GitHub-hosted) |
| JDK | Eclipse Temurin 21 |
| Service auxiliaire | RabbitMQ 3 Management |

**Ce qu'il fait :**
- Lance `mvn test` pour chaque service : `catalog`, `order`, `payment`, `user`, `notification`, `gateway`, `discovery`, `config`
- Configure le profil Spring `test` avec config cloud désactivée
- Se connecte au RabbitMQ de test (`localhost:5672`, user: `user`, password: `password`)
- Uploade les rapports Surefire en artifact

**Service RabbitMQ :**
```
Image   : rabbitmq:3-management
User    : user
Password: password
Ports   : 5672 (AMQP), 15672 (Management UI)
```

---

### 2. `test-frontend` — Tests Frontend

| Propriété | Valeur |
|---|---|
| Runner | `ubuntu-latest` (GitHub-hosted) |
| Node.js | 24 |
| Framework de test | Karma / Jasmine (Angular) |

**Ce qu'il fait :**
- Installe les dépendances via `npm ci`
- Lance les tests Angular en mode CI (headless Chromium)
- Uploade le rapport de couverture Cobertura en artifact

---

### 3. `sonar-backend` — Analyse SonarCloud Backend

| Propriété | Valeur |
|---|---|
| Runner | `ubuntu-latest` (GitHub-hosted) |
| Dépend de | `test-backend` |
| Tests | Désactivés (`-DskipTests=true`) |

**Ce qu'il fait :**
- Exécute `mvn verify sonar:sonar` sur chaque service Java
- Envoie les résultats d'analyse vers SonarCloud
- Utilise `fetch-depth: 0` pour l'analyse de l'historique Git complet (blame)

---

### 4. `sonar-frontend` — Analyse SonarCloud Frontend

| Propriété | Valeur |
|---|---|
| Runner | `ubuntu-latest` (GitHub-hosted) |
| Dépend de | `test-frontend` |
| Action utilisée | `SonarSource/sonarcloud-github-action@master` |

**Ce qu'il fait :**
- Analyse le code Angular (`front/src`)
- Exclut les fichiers de test (`*.spec.ts`) et `node_modules`
- Utilise le rapport de couverture LCOV généré par les tests

---

### 5. `build` — Build & Push Images Docker

| Propriété | Valeur |
|---|---|
| Runner | `ubuntu-latest` (GitHub-hosted) |
| Registry | GitHub Container Registry (GHCR) |
| Dépend de | `test-backend`, `test-frontend` |

**Ce qu'il fait :**
- Se connecte à `ghcr.io` avec `GITHUB_TOKEN` (automatique)
- Builde et pousse chaque image avec **deux tags** :
  - `:latest`
  - `:<sha_du_commit>` (ex: `:a3f2c1d`)
- Utilise le **cache GitHub Actions** pour accélérer les builds

**Images poussées :**
```
ghcr.io/<owner>/la-petite-maison-de-lepouvante/discovery:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/config:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/gateway:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/catalog:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/payment:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/order:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/user:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/notification:latest
ghcr.io/<owner>/la-petite-maison-de-lepouvante/frontend:latest
```

---

### 6. `deploy` — Déploiement Local

| Propriété | Valeur |
|---|---|
| Runner | `self-hosted` avec label `local-deploy` |
| Dépend de | `build` |

**Ce qu'il fait :**
- S'exécute sur le runner installé localement (ta machine)
- Pull les nouvelles images depuis GHCR
- Redémarre le stack complet via `docker compose up -d`
- RabbitMQ Management UI disponible sur `http://localhost:15672`

> **Note :** Ce job nécessite un runner auto-hébergé installé sur la machine cible avec le label `local-deploy`. Voir la section [Installation du Runner](#installation-du-runner) ci-dessous.

---

## Variables et Secrets requis

À configurer dans **GitHub → Settings → Secrets and variables → Actions** :

### Secrets

| Nom | Description |
|---|---|
| `SONAR_TOKEN` | Token d'authentification SonarCloud (généré sur sonarcloud.io) |

> `GITHUB_TOKEN` est **automatiquement injecté** par GitHub, pas besoin de le configurer.

### Variables (Repository variables)

| Nom | Valeur |
|---|---|
| `SONAR_ORGANIZATION` | `haroun-ab` |
| `SONAR_PROJECT_KEY` | `haroun-ab_la-petite-maison-de-lepouvante` |

---

## Installation du Runner (self-hosted)

Le job `deploy` nécessite un runner installé localement avec le label `local-deploy`.

### 1. Créer le runner sur GitHub

1. Aller sur le dépôt → **Settings** → **Actions** → **Runners**
2. Cliquer sur **New self-hosted runner**
3. Sélectionner **Windows** / **x64**
4. Copier le **token** affiché

### 2. Installer le runner

```powershell
# Créer le dossier
New-Item -ItemType Directory -Force -Path "C:\actions-runner"
cd C:\actions-runner

# Télécharger
Invoke-WebRequest -Uri "https://github.com/actions/runner/releases/download/v2.323.0/actions-runner-win-x64-2.323.0.zip" -OutFile "actions-runner-win-x64.zip"

# Extraire
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory("C:\actions-runner\actions-runner-win-x64.zip", "C:\actions-runner")

# Enregistrer (remplacer TON_TOKEN par le token GitHub)
.\config.cmd `
  --url https://github.com/haroun-ab/la-petite-maison-de-lepouvante `
  --token TON_TOKEN `
  --name "local-runner" `
  --labels "local-deploy" `
  --unattended

# Installer et démarrer en tant que service Windows
.\svc.cmd install
.\svc.cmd start
```

### 3. Vérifier

Le runner doit apparaître **vert (Idle)** dans GitHub → Settings → Actions → Runners.

---

## Différences avec GitLab CI

| Fonctionnalité | GitLab CI (`.gitlab-ci.yml`) | GitHub Actions |
|---|---|---|
| Registry Docker | GitLab Registry (`$CI_REGISTRY_IMAGE`) | GHCR (`ghcr.io`) |
| Token d'auth registry | `$CI_REGISTRY_USER` / `$CI_JOB_TOKEN` | `GITHUB_TOKEN` (automatique) |
| Agent de build | GitLab Runner | GitHub-hosted runner (`ubuntu-latest`) |
| Agent de déploiement | GitLab Runner tagué `local-deploy` | Self-hosted runner labelé `local-deploy` |
| Variables protégées | CI/CD Variables (GitLab UI) | Secrets + Variables (GitHub UI) |
| Services (ex: RabbitMQ) | `services:` dans le job | `services:` dans le job (même syntaxe) |
| Artefacts | `artifacts: paths:` | `actions/upload-artifact@v4` |
