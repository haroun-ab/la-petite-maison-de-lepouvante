package fr.lpmde.catalog.web;

import fr.lpmde.catalog.dto.ProductDTO;
import fr.lpmde.catalog.entities.Product;
import fr.lpmde.catalog.repositories.ProductRepository;
import fr.lpmde.catalog.mapper.ProductMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://frontend", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE})
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

    @GetMapping("/{id}/stock")
    public int getStock(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(Product::getStock)
                .orElse(0);
    }
    @PatchMapping("/{id}/decrement-stock")
    public ProductDTO decrementStock(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    if (product.getStock() > 0) {
                        product.setStock(product.getStock() - 1);
                        Product updated = productRepository.save(product);
                        return ProductMapper.toDTO(updated);
                    } else {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock insuffisant");
                    }
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit non trouvé"));
    }
}
