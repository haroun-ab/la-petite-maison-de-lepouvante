package fr.lpmde.catalog;

import fr.lpmde.catalog.entities.Product;
import fr.lpmde.catalog.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class CatalogApplication {

	public static void main(String[] args) {
		SpringApplication.run(CatalogApplication.class, args);
	}

    @Bean
    CommandLineRunner start(ProductRepository repo) {
        return args -> {
            System.out.println("Application started !");
            List<Product> productList = List.of(
                    Product.builder().title("Ma belle figurine").description("Ceci est une figurine").price(new BigDecimal("120.00")).category("Figurine").image("src/img.jpg").stock(99).build(),
                    Product.builder().title("Mon petit jeu vidéo").description("Ceci est un jeu video").price(new BigDecimal("30.00")).category("Jeu video").image("src/img.jpg").stock(99).build(),
                    Product.builder().title("Mon magnifique livre").description("Ceci est un livre").price(new BigDecimal("12.00")).category("Livre").image("src/img.jpg").stock(99).build(),
                    Product.builder().title("Mon film en blu-ray").description("Ceci est un film en blu ray").price(new BigDecimal("20.00")).category("Film").image("src/img.jpg").stock(99).build()
            );
            repo.saveAll(productList);
            repo.findAll().forEach( a -> System.out.println(a.getTitle()));
        };
    }
}
