# 🐳 Docker - La Petite Maison de l'Épouvante

*Guide complet pour déployer l'application avec Docker*

## 📋 Vue d'ensemble

L'application utilise une architecture microservices conteneurisée avec Docker Compose pour l'orchestration locale. Tous les services communiquent via un réseau bridge Docker (`petite-maison-network`).

## 🏗️ Architecture Docker

### Services et Ports

| Service | Image | Port Interne | Port Externe | Santé |
|---------|-------|--------------|--------------|-------|
| **frontend** | nginx:alpine | 80 | 80 | ✅ Healthy |
| **gateway** | eclipse-temurin:21 | 8888 | 8888 | ✅ Healthy |
| **discovery** | eclipse-temurin:21 | 8761 | 8761 | ✅ Healthy |
| **config** | eclipse-temurin:21 | 9999 | 9999 | ✅ Healthy |
| **catalog** | eclipse-temurin:21 | 8080 | - | ✅ Healthy |
| **order** | eclipse-temurin:21 | 8082 | - | ✅ Healthy |
| **payment** | eclipse-temurin:21 | 8081 | - | ✅ Healthy |
| **user** | eclipse-temurin:21 | 8083 | - | ✅ Healthy |
| **notification** | eclipse-temurin:21 | 8084 | - | ✅ Healthy |

### Réseau Docker
```
petite-maison-network (bridge driver)
├── frontend (nginx) → gateway (proxy /CATALOG/*, /ORDERS/*)
├── gateway → services (load balancing, CORS)
├── services → discovery (enregistrement)
├── services → config (configuration)
└── config → discovery (dépendance)
```

## 🚀 Démarrage Rapide

### Prérequis
- Docker 20+
- Docker Compose 2+
- 4GB RAM disponible

### Lancement Complet
```bash
# Depuis la racine du projet
docker compose up --build

# Ou en arrière-plan
docker compose up -d --build
```

### Attente de Démarrage
⏱️ **2-3 minutes** sont nécessaires pour :
1. Build des images multi-stage
2. Démarrage en cascade des services
3. Health checks automatiques
4. Enregistrement Eureka

### Vérification
```bash
# État des conteneurs
docker compose ps

# Logs en temps réel
docker compose logs -f
```

## 🌐 URLs d'Accès

| Service | URL | Description | Statut |
|---------|-----|-------------|--------|
| **Application** | http://localhost | Interface Angular + API proxy | ✅ |
| **API Gateway** | http://localhost:8888 | Point d'entrée API | ✅ |
| **Catalog API** | http://localhost/CATALOG/products | Produits (via proxy) | ✅ |
| **Order API** | http://localhost/ORDERS/orders | Commandes (via proxy) | ✅ |
| **Eureka** | http://localhost:8761 | Dashboard services | ✅ |
| **Config** | http://localhost:9999 | Configuration | ✅ |

### Configuration Technique et Injection

Pour assurer le bon fonctionnement dans l'environnement conteneurisé, la configuration du Config Server est injectée dynamiquement via des variables d'environnement dans `docker-compose.yml`, surchargeant les propriétés par défaut (`application.properties`).

```yaml
environment:
  - SPRING_CONFIG_IMPORT=configserver:http://config:9999
  - EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://discovery:8761/eureka
```

Cette approche permet de découpler la configuration locale de développement (qui peut échouer sans le serveur de config) de la configuration d'exécution Docker.

### Health Checks Automatiques

Chaque service a un health check toutes les **30 secondes** :

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://service:port/actuator/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Dépendances de Démarrage

```
1. discovery (Eureka)           ← Aucun dépendance
   ↓
2. config (Config Server)       ← discovery healthy
   ↓
3. gateway + services           ← config + discovery healthy
   ↓
4. frontend (Nginx)             ← gateway healthy
```

### Variables d'Environnement

```yaml
# Services Java
SPRING_PROFILES_ACTIVE: native
EUREKA_CLIENT_SERVICEURL_DEFAULTZONE: http://discovery:8761/eureka
SPRING_CONFIG_IMPORT: configserver:http://config:9999

# Frontend
- Attends gateway avant démarrage
- Proxy vers /CATALOG/* et /ORDERS/*
- CORS géré par gateway
```

## 🛠️ Commandes Utiles

### Gestion des Conteneurs
```bash
# Démarrer tous les services
docker compose up -d

# Arrêter tout
docker compose down

# Supprimer volumes (données)
docker compose down -v

# Redémarrer un service
docker compose restart frontend

# Logs d'un service
docker compose logs -f catalog

# Logs de tous les services
docker compose logs -f
```

### Debugging
```bash
# État détaillé
docker compose ps

# Ressources utilisées
docker stats

# Inspecter un conteneur
docker inspect la-petite-maison-de-lepouvante-frontend

# Se connecter à un conteneur
docker exec -it la-petite-maison-de-lepouvante-catalog sh
```

### Nettoyage
```bash
# Supprimer images non utilisées
docker image prune

# Supprimer conteneurs arrêtés
docker container prune

# Nettoyage complet
docker system prune -a
```

## 📦 Dockerfiles Expliqués

### Services Java (Multi-stage Build)

```dockerfile
# Stage 1: Build
FROM maven:3.9.5-eclipse-temurin-21 AS builder
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Optimisations :**
- Image finale **10x plus petite**
- Pas de Maven/Source dans l'image runtime
- Démarrage plus rapide

### Frontend Angular + Nginx

```dockerfile
# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine
RUN apk add --no-cache netcat-openbsd curl
COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
COPY --from=builder /build/dist/front/browser /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
```

**Fonctionnalités :**
- Build Angular optimisé
- Nginx avec proxy vers gateway
- Attente gateway avant démarrage
- SPA routing support

## 🔍 Troubleshooting

### Service Unhealthy
```bash
# Vérifier les logs
docker compose logs service-name

# Redémarrer le service
docker compose restart service-name

# Vérifier health endpoint
curl http://localhost:port/actuator/health
```

### Problèmes CORS
- Vérifier configuration gateway
- Frontend utilise proxy nginx (pas de CORS)
- Gateway gère CORS pour les appels externes

### Problèmes de Réseau
```bash
# Vérifier réseau Docker
docker network ls
docker network inspect petite-maison-network

# Ping entre conteneurs
docker exec la-petite-maison-de-lepouvante-frontend ping gateway
```

### Build Lent
```bash
# Utiliser cache Docker
docker compose build --no-cache service-name

# Vérifier espace disque
docker system df
```

## 📊 Monitoring

### Métriques Disponibles
- **Eureka Dashboard** : `http://localhost:8761`
- **Health Endpoints** : `/actuator/health`
- **Info Endpoints** : `/actuator/info`
- **Metrics** : `/actuator/metrics`

### Logs Structurés
```bash
# Logs avec timestamps
docker compose logs --timestamps

# Logs des dernières heures
docker compose logs --since 1h
```

## 🔄 Mise à Jour

### Rebuild Complet
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Mise à Jour d'un Service
```bash
docker compose build service-name
docker compose up -d service-name
```

---

*Documentation mise à jour le 12 février 2026*
