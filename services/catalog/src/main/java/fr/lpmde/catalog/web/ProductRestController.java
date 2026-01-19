package fr.lpmde.catalog.web;

import fr.lpmde.catalog.entities.Product;
import fr.lpmde.catalog.repositories.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductRestController {
    private ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    @GetMapping("/product")
    public List<Product> productList()
    {
        return productRepository.findAll();
    }

    @GetMapping("/product/{id}")
    public Product productById (@PathVariable Long id){
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return product.get();
        } else return null;
    }

    @PostMapping("/product")
    public Product save (@RequestBody Product product){
        return productRepository.save(product);
    }

    @PutMapping("/product/{id}")
    public Product update (@PathVariable Long id, @RequestBody Product product){
        product.setId(id);
        return productRepository.save(product);
    }

    @DeleteMapping("/product/{id}")
    public void delete (@PathVariable Long id){
        productRepository.deleteById(id);
    }
}
