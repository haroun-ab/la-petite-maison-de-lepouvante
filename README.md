# 🦇 La Petite Maison de l'Épouvante 🦇

*Une plateforme e-commerce d'horreur avec architecture microservices moderne*

## 📋 Vue d'ensemble

Application e-commerce complète avec thème d'horreur, construite avec une architecture microservices moderne utilisant Spring Cloud, Angular, Docker et GitLab CI/CD.

## 🏗️ Architecture

### Technologies Principales
- **Frontend**: Angular 18+ avec Angular Material
- **Backend**: Spring Boot 3.5.10 + Spring Cloud 2025.0.1
- **Base de données**: H2 (développement)
- **Conteneurisation**: Docker + Docker Compose
- **Orchestration**: Docker Compose (extension vers Kubernetes prévue)
- **CI/CD**: GitLab CI/CD
- **Service Discovery**: Eureka
- **Configuration**: Spring Cloud Config Server
- **API Gateway**: Spring Cloud Gateway

### Microservices
- **API Gateway**: Routage, validation, CORS
- **Discovery**: Service registry Eureka
- **Config**: Configuration centralisée
- **Catalog**: Gestion du catalogue produits
- **Order**: Gestion des commandes
- **Payment**: Traitement des paiements
- **User**: Gestion utilisateurs
- **Notification**: Service de notifications

## 🚀 Démarrage Rapide

### Prérequis
- Docker 20+
- Docker Compose 2+
- 4GB RAM minimum

### Lancement Complet
```bash
# Clone le repository
git clone <repository-url>
cd la-petite-maison-de-lepouvante

# Lance tous les services
docker compose up --build

# Attends 2-3 minutes pour le démarrage complet
```

### URLs d'Accès
| Service | URL | Description |
|---------|-----|-------------|
| **Application** | http://localhost | Interface utilisateur Angular |
| **API Gateway** | http://localhost:8888 | Point d'entrée API |
| **Eureka Dashboard** | http://localhost:8761 | Service Discovery |
| **Config Server** | http://localhost:9999 | Configuration centralisée |

## 🐳 Déploiement Docker

### Architecture des Conteneurs
```
petite-maison-network (bridge)
├── frontend (nginx:alpine) - port 80
├── gateway (eclipse-temurin:21) - port 8888
├── discovery (eclipse-temurin:21) - port 8761
├── config (eclipse-temurin:21) - port 9999
├── catalog (eclipse-temurin:21) - port 8080
├── order (eclipse-temurin:21) - port 8082
├── payment (eclipse-temurin:21) - port 8081
├── user (eclipse-temurin:21) - port 8083
└── notification (eclipse-temurin:21) - port 8084
```

### Commandes Utiles
```bash
# Démarrer en arrière-plan
docker compose up -d

# Voir les logs
docker compose logs -f

# Arrêter tout
docker compose down

# Redémarrer un service
docker compose restart frontend
```

## 🔄 CI/CD GitLab

### Pipeline Automatisé
Le pipeline GitLab CI/CD s'exécute automatiquement sur chaque push :

1. **Build** : Compilation de tous les services Java et Angular
2. **Test** : Exécution des tests unitaires
3. **Deploy** : Déploiement en production (approbation manuelle)

### Structure CI/CD
```
.gitlab/ci/
├── README.md          # Documentation complète
├── variables.yml      # Variables globales
├── frontend.yml       # Pipeline frontend
├── services/          # Pipelines par service
└── deploy.yml         # Déploiement
```

### Déclencheurs
- **Automatique** : Push sur `main` ou `develop`
- **Manuel** : Déploiement en production
- **Merge Requests** : Tests automatiques

## 📁 Structure du Projet

```
la-petite-maison-de-lepouvante/
├── docker-compose.yml          # Orchestration Docker
├── Dockerfile                  # Frontend
├── nginx.conf                  # Configuration Nginx
├── front/                      # Application Angular
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
├── services/                   # Microservices Java
│   ├── config/                 # Config Server
│   ├── discovery/              # Eureka
│   ├── gateway/                # API Gateway
│   ├── catalog/                # Catalogue produits
│   ├── order/                  # Commandes
│   ├── payment/                # Paiements
│   ├── user/                   # Utilisateurs
│   └── notification/           # Notifications
└── .gitlab/ci/                 # Configuration CI/CD
```

## 🔧 Développement

### Prérequis Développement
- Java 21
- Node.js 18+
- Maven 3.9+
- Angular CLI

### Lancement en Mode Développement
```bash
# Backend (dans chaque service)
cd services/catalog
mvn spring-boot:run

# Frontend
cd front
npm install
ng serve
```

## 📊 Monitoring & Observabilité

### Health Checks
Tous les services exposent des endpoints de santé :
- `/actuator/health` - État général
- `/actuator/info` - Informations service

### Logs Centralisés
```bash
# Logs de tous les services
docker compose logs -f

# Logs d'un service spécifique
docker compose logs -f catalog
```

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

*Développé avec ❤️ pour les amateurs d'horreur et de bonnes architectures*



