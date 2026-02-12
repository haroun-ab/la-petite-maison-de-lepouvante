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

# Copy JAR from builder
COPY --from=builder /build/target/*.jar app.jar

# Extract JAR to access config-files (optional but helps debug)
RUN jar -xf app.jar

EXPOSE 9999

ENTRYPOINT ["java", "-jar", "app.jar"]
