package fr.lpmde.catalog.repositories;

import fr.lpmde.catalog.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProductRepository extends JpaRepository<Product, Long> {}
