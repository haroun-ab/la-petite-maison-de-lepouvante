# =============================
# Stage 1: Build Java Payment Service
# =============================
FROM maven:3.9.5-eclipse-temurin-21 AS builder

WORKDIR /build

# Copier pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline

# Copier le code source et build
COPY src ./src
RUN mvn clean package -DskipTests

# =============================
# Stage 2: Runtime
# =============================
FROM eclipse-temurin:21

WORKDIR /app

# Copier le jar buildé depuis le builder
COPY --from=builder /build/target/*.jar app.jar

# Exposer le port de service
EXPOSE 8081

# Démarrage de l'application
ENTRYPOINT ["java", "-jar", "app.jar"]