package fr.lpmde.catalog.mapper;

import fr.lpmde.catalog.dto.ProductDTO;
import fr.lpmde.catalog.entities.Product;

public class ProductMapper {

    // Entity -> DTO
    public static ProductDTO toDTO(Product product) {
        if (product == null) return null;
        return new ProductDTO(
                product.getId(),
                product.getCategory(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImage()
        );
    }

    // DTO -> Entity
    public static Product fromDTO(ProductDTO dto) {
        if (dto == null) return null;
        Product product = new Product();
        product.setId(dto.getId());
        product.setCategory(dto.getCategory());
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImage(dto.getImage());
        return product;
    }
}
