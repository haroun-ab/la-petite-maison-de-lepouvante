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
                        .allowedOrigins("http://frontend") // docker frontend
                        .allowedMethods("*");
            }
        };
    }

    public abstract void addCorsMappings(CorsRegistry registry);
}
