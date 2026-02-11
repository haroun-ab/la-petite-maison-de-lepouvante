package fr.lpmde.catalog.web;

import fr.lpmde.catalog.dto.ProductDTO;
import fr.lpmde.catalog.entities.Product;
import fr.lpmde.catalog.repositories.ProductRepository;
import fr.lpmde.catalog.mapper.ProductMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/products")
public class ProductRestController {

    private final ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<ProductDTO> productList() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductDTO productById(@PathVariable Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ProductMapper::toDTO).orElse(null);
    }

    @PostMapping
    public ProductDTO save(@RequestBody ProductDTO productDTO) {
        Product saved = productRepository.save(ProductMapper.fromDTO(productDTO));
        return ProductMapper.toDTO(saved);
    }

    @PutMapping("/{id}")
    public ProductDTO update(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product product = ProductMapper.fromDTO(productDTO);
        product.setId(id);
        Product updated = productRepository.save(product);
        return ProductMapper.toDTO(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
