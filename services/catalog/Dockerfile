# Stage 1: Build
FROM maven:3.9.5-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy pom.xml et télécharger les dépendances
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code et builder
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21

WORKDIR /app

# Copy le JAR compilé
COPY --from=builder /build/target/*.jar app.jar

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD java -cp app.jar org.springframework.boot.loader.JarLauncher || exit 1

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
