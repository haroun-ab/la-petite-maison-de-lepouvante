# 📚 Guide GitLab CI/CD - La Petite Maison de l'Épouvante

## 📖 Introduction

GitLab CI/CD est un système d'intégration et déploiement continu. Il automatise les tests et le déploiement de votre code à chaque push ou merge request.

---

## 🔧 Variables Globales

### Dans `variables.yml`

```yaml
MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2"
```
**Explication:** Configure Maven pour utiliser un dossier local (`.m2`) pour stocker les dépendances Java au lieu de les télécharger à chaque fois. Cela **accélère les builds**.

```yaml
DOCKER_DRIVER: overlay2
```
**Explication:** Utilise le driver overlay2 pour Docker (système de fichiers optimisé).

```yaml
DOCKER_TLS_CERTDIR: "/certs"
```
**Explication:** Définit le chemin pour les certificats TLS de Docker (sécurité).

---

## 🎬 Stages (Étapes du Pipeline)

Le pipeline s'exécute dans cet ordre :

```
1. BUILD   → Compile tous les services et le frontend
2. TEST    → Lance les tests unitaires
3. DEPLOY  → Déploie en production (manuel)
```

Chaque stage dépend du précédent. Si le build échoue, les tests ne s'exécutent pas.

---

## 📦 Qu'est-ce que `artifacts`?

```yaml
artifacts:
  paths:
    - services/catalog/target/catalog-*.jar
  expire_in: 30 days
```

Les artifacts sont les **fichiers générés par le build** (JARs compilés, dist/ du frontend, etc.)

- `paths` → Quels fichiers garder
- `expire_in` → Combien de temps les conserver (30 jours ici)

**Utilité:** Permet aux stages suivants (test, deploy) d'utiliser ces fichiers sans recompiler.

---

## 💾 Qu'est-ce que `cache`?

```yaml
cache:
  paths:
    - front/node_modules/
```

Le cache **mémorise** les dépendances (packages npm, librairies Maven) entre les builds.

**Différence artifacts vs cache:**
| | Artifacts | Cache |
|---|---|---|
| **Durée** | 30 jours (configurable) | Entre les builds |
| **Taille** | Peu de fichiers | Beaucoup de fichiers |
| **Utilité** | Passer des fichiers entre stages | Éviter de retélécharger les dépendances |

---

## 🔄 Qu'est-ce que `only`?

```yaml
only:
  - merge_requests
  - main
  - develop
```

Le job s'exécute **uniquement** si:
- C'est une merge request
- C'est sur la branche `main`
- C'est sur la branche `develop`

Ne s'exécute **pas** si vous faites un push sur une branche de feature.

---

## ⏸️ Qu'est-ce que `when`?

```yaml
when: manual
```

Le job ne s'exécute **pas automatiquement**. Il faut cliquer sur un bouton dans GitLab pour le lancer.

**Valeurs possibles:**
- `always` → S'exécute toujours (défaut)
- `manual` → Nécessite un clic
- `on_failure` → S'exécute que si un job précédent a échoué
- `on_success` → S'exécute que si les jobs précédents ont réussi

---

## 🏗️ Structure du Pipeline

### Stage BUILD

Pour chaque service **en parallèle** :

```yaml
build:catalog:
  stage: build
  image: maven:3.8.1-openjdk-17  # Utilise cette image Docker
  script:
    - cd services/catalog
    - mvn clean package -DskipTests  # Compile sans lancer les tests
  artifacts: [...]
```

**Timeline réelle:**
```
build:config ─┐
build:discovery ├─→ (tous en parallèle, ~3-5 min chacun)
build:catalog ─┤
...           │
build:frontend┘
```

### Stage TEST

Tests de chaque service (après le BUILD):

```yaml
test:catalog:
  stage: test
  script:
    - cd services/catalog
    - mvn clean test  # Compile ET lance les tests
```

```
build:* [TERMINÉ]
    ↓
test:config ─┐
test:catalog ├─→ (tous en parallèle)
test:payment ─┤
...          │
test:frontend┘
```

### Stage DEPLOY

Déploiement manuel en production:

```yaml
deploy:catalog:
  when: manual  # ⚠️ Ne se déclenche pas automatiquement!
  script:
    - echo "Déploiement du Catalog Service..."
```

```
test:* [TERMINÉ]
    ↓
⏸️ EN ATTENTE - Cliquer sur "Play" dans GitLab
    ↓
deploy:catalog
deploy:payment
...
```

---

## 📊 Exemple: Qu'est-ce qui se passe avec un `git push`?

### Vous faites un push sur `main`:

```
1. GitLab détecte le push
2. Lance le pipeline avec les jobs ayant `only: [main]`
3. Stage BUILD:
   ✅ build:config
   ✅ build:discovery
   ✅ build:gateway
   ✅ build:catalog
   ✅ build:payment
   ✅ build:order
   ✅ build:user
   ✅ build:notification
   ✅ build:frontend
   (tous en parallèle)
4. Vérifie que tous les builds ont réussi
5. Stage TEST:
   ✅ test:config
   ✅ test:catalog
   ✅ test:frontend
   (tous en parallèle)
6. Affiche un ✅ "Pipeline réussi" ou ❌ "Pipeline échoué"
7. En attente: test:* terminé → cliquer sur "Deploy" pour lancer deploy:*
```

---

## 🛠️ Commandes Courantes dans les Scripts

### Pour Java/Maven:

```bash
mvn clean package -DskipTests    # Compile sans tests (rapide)
mvn clean test                    # Compile ET teste
mvn clean verify                  # Compile, teste, et vérifie
```

### Pour JavaScript/Node:

```bash
npm ci                            # Install (plus strict que npm install)
npm run build                     # Build pour production
npm run test -- --watch=false     # Tests (pas de watch)
npm run lint                      # Vérifie la syntaxe
```

---

## 🔍 Lire les Logs

Cliquez sur un job pour voir ses logs:

```
$ cd services/catalog
$ mvn clean test

[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile)
[INFO] Compiling 45 source files to ./target/classes
[INFO] BUILD SUCCESS
```

**Vert** ✅ = Succès  
**Rouge** ❌ = Erreur  
**Gris** ⚪ = En attente

---

## 💡 Structure de nos Fichiers

```
.gitlab-ci.yml
  ↓
  include: variables.yml ────────→ Variables globales
  include: frontend.yml ─────────→ Build + Test + Lint Angular
  include: services/*.yml ───────→ Build + Test chaque service
  include: deploy.yml ──────────→ Déploiement
```

**Avantage:** Changer un service ne touche pas aux autres. Très modulaire!

---

## 🎯 Cas d'Usage Typiques

### Scenario 1: Vous committez une petite feature sur une branche

```
git checkout -b feature/add-cart
git commit -am "Add cart page"
git push origin feature/add-cart
```

→ GitLab CI **ne fait rien** (branche non dans `only`)

### Scenario 2: Vous faites une merge request vers `main`

```
git push origin feature/add-cart
# → Créer MR sur GitLab
```

→ GitLab CI lance **tous les tests** (build + test)  
→ Si tout passe ✅, vous pouvez merger  
→ Si erreur ❌, vous devez corriger

### Scenario 3: Vous mergez dans `main`

```
# Après approval de la MR
```

→ GitLab CI lance **tous les tests** (build + test)  
→ Les **deploys** restent en **attente manuelle**  
→ Vous cliquez sur le bouton "Deploy" pour deployer

---

## ⚙️ Troubleshooting

### "Pipeline échoué, comment debug?"

1. Cliquez sur le pipeline depuis GitLab
2. Cherchez le job en rouge ❌
3. Cliquez dessus → Voir les logs complètes
4. Cherchez l'erreur (cherchez "ERROR" ou "FAIL")

### "J'ai oublié d'ajouter `npm ci` et ça crash"

Modifiez le fichier `.gitlab/ci/frontend.yml`:

```yaml
script:
  - cd front
  - npm ci              # ← Ajouter cette ligne
  - npm run build
```

Puis push → Pipeline relancé automatiquement

---

## 📚 Ressources

- [Docs GitLab CI/CD officielles](https://docs.gitlab.com/ee/ci/)
- [Syntaxe YAML](https://docs.gitlab.com/ee/ci/yaml/)
- [Variables prédéfinies](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

---

**Questions? 💬**  
Regardez les logs du pipeline → cliquez sur le job → "Show Raw"

---

## 📅 Mise à jour - 12 février 2026

✅ **Configuration Docker mise à jour**
- Migration vers Eclipse Temurin 21 (au lieu d'OpenJDK 17)
- Architecture multi-stage optimisée
- Health checks automatiques toutes les 30 secondes
- Réseau Docker bridge (`petite-maison-network`)
- Proxy Nginx avec résolution DNS Docker
- Configuration CORS dans Spring Cloud Gateway

✅ **Services opérationnels**
- 9 conteneurs déployés automatiquement
- Eureka Service Discovery fonctionnel
- Spring Cloud Config Server centralisé
- API Gateway avec load balancing
- Frontend Angular avec proxy vers backend

✅ **URLs de production**
- Application: `http://localhost`
- APIs: `http://localhost/CATALOG/products`
- Monitoring: `http://localhost:8761` (Eureka)

**Le pipeline CI/CD déploie maintenant une application microservices complète et conteneurisée !** 🚀
