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
            if (repo.count() == 0) {
                List<Product> productList = List.of(
                        Product.builder()
                                .title("La Maison Hantée")
                                .description("Explorez une maison remplie de fantômes et de mystères")
                                .price(new BigDecimal("25.00"))
                                .category("Film")
                                .image("https://picsum.photos/id/1011/400/300")
                                .stock(50)
                                .build(),

                        Product.builder()
                                .title("Le Spectre du Grenier")
                                .description("Un esprit maléfique rôde dans le grenier")
                                .price(new BigDecimal("18.00"))
                                .category("Livre")
                                .image("https://picsum.photos/id/1012/400/300")
                                .stock(10)
                                .build(),

                        Product.builder()
                                .title("Zombie Apocalypse")
                                .description("Survivez à une invasion de zombies")
                                .price(new BigDecimal("35.00"))
                                .category("Jeu vidéo")
                                .image("https://picsum.photos/id/1013/400/300")
                                .stock(60)
                                .build(),

                        Product.builder()
                                .title("Figurine Vampire")
                                .description("Une figurine collector du vampire légendaire")
                                .price(new BigDecimal("45.00"))
                                .category("Figurine")
                                .image("https://picsum.photos/id/1014/400/300")
                                .stock(30)
                                .build(),

                        Product.builder()
                                .title("L’Épouvantail Maudit")
                                .description("Un épouvantail qui prend vie la nuit")
                                .price(new BigDecimal("22.00"))
                                .category("Livre")
                                .image("https://picsum.photos/id/1015/400/300")
                                .stock(40)
                                .build(),

                        Product.builder()
                                .title("Sang sur le Tapis")
                                .description("Film d’horreur culte pour les amateurs de frissons")
                                .price(new BigDecimal("20.00"))
                                .category("Film")
                                .image("https://picsum.photos/id/1016/400/300")
                                .stock(50)
                                .build(),

                        Product.builder()
                                .title("Maison des Morts")
                                .description("Parcourez la demeure où vivent des esprits vengeurs")
                                .price(new BigDecimal("30.00"))
                                .category("Jeu vidéo")
                                .image("https://picsum.photos/id/1018/400/300")
                                .stock(70)
                                .build(),

                        Product.builder()
                                .title("Figurine Fantôme")
                                .description("Fantôme en PVC, parfait pour les collectionneurs d’horreur")
                                .price(new BigDecimal("40.00"))
                                .category("Figurine")
                                .image("https://picsum.photos/id/1019/400/300")
                                .stock(25)
                                .build(),

                        Product.builder()
                                .title("Cimetière Interdit")
                                .description("Livre d’histoires effrayantes se déroulant dans un vieux cimetière")
                                .price(new BigDecimal("15.00"))
                                .category("Livre")
                                .image("https://picsum.photos/id/1020/400/300")
                                .stock(35)
                                .build(),

                        Product.builder()
                                .title("La Nuit des Démons")
                                .description("Film culte des années 80 rempli de créatures démoniaques")
                                .price(new BigDecimal("23.00"))
                                .category("Film")
                                .image("https://picsum.photos/id/1021/400/300")
                                .stock(45)
                                .build(),

                        Product.builder()
                                .title("Vampire Sanglant")
                                .description("Jeu vidéo d’horreur où vous incarnez un vampire")
                                .price(new BigDecimal("38.00"))
                                .category("Jeu vidéo")
                                .image("https://picsum.photos/id/1022/400/300")
                                .stock(55)
                                .build(),

                        Product.builder()
                                .title("Figurine Loup-Garou")
                                .description("Collectionnez le loup-garou terrifiant")
                                .price(new BigDecimal("42.00"))
                                .category("Figurine")
                                .image("https://picsum.photos/id/1023/400/300")
                                .stock(30)
                                .build(),

                        Product.builder()
                                .title("Les Revenants")
                                .description("Livre de récits de fantômes modernes")
                                .price(new BigDecimal("19.00"))
                                .category("Livre")
                                .image("https://picsum.photos/id/1024/400/300")
                                .stock(40)
                                .build(),

                        Product.builder()
                                .title("Horreur à la Crypte")
                                .description("Film pour amateurs de sensations fortes et de frissons")
                                .price(new BigDecimal("21.00"))
                                .category("Film")
                                .image("https://picsum.photos/id/1025/400/300")
                                .stock(50)
                                .build(),

                        Product.builder()
                                .title("Zombie Survival Kit")
                                .description("Jeu vidéo d’action et survie dans un monde infesté de zombies")
                                .price(new BigDecimal("36.00"))
                                .category("Jeu vidéo")
                                .image("https://picsum.photos/id/1026/400/300")
                                .stock(60)
                                .build(),

                        Product.builder()
                                .title("Figurine Sorcière")
                                .description("Sorcière maléfique en édition limitée")
                                .price(new BigDecimal("47.00"))
                                .category("Figurine")
                                .image("https://picsum.photos/id/1027/400/300")
                                .stock(25)
                                .build(),

                        Product.builder()
                                .title("Carnet de l’Horreur")
                                .description("Livre interactif avec des histoires terrifiantes")
                                .price(new BigDecimal("16.00"))
                                .category("Livre")
                                .image("https://picsum.photos/id/1028/400/300")
                                .stock(35)
                                .build(),

                        Product.builder()
                                .title("La Crypte Interdite")
                                .description("Film d’horreur où la crypte cache des secrets sombres")
                                .price(new BigDecimal("22.00"))
                                .category("Film")
                                .image("https://picsum.photos/id/1029/400/300")
                                .stock(45)
                                .build(),

                        Product.builder()
                                .title("Figurine Fantôme du Manoir")
                                .description("Fantôme transparent et effrayant pour collectionneurs")
                                .price(new BigDecimal("44.00"))
                                .category("Figurine")
                                .image("https://picsum.photos/id/1031/400/300")
                                .stock(30)
                                .build()
                );
                repo.saveAll(productList);
            }

        };

    }
}
