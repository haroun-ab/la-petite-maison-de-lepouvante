package config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.config.CorsRegistry;

public abstract class WebFluxConfigurer {
    @Bean
    public WebFluxConfigurer corsConfigurer() {
        return new WebFluxConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200") // ton front
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);            }
        };
    }

    public abstract void addCorsMappings(CorsRegistry registry);
}
