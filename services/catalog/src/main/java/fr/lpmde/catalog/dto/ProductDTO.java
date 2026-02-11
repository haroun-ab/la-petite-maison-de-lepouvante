package fr.lpmde.catalog.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private long id;
    private String category;
    private String title;
    private String description;
    private BigDecimal price;
    private int stock;
    private String image;

    public ProductDTO() {}

    public ProductDTO(long id, String category, String title, String description,
                      BigDecimal price, int stock, String image) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
    }

    public long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getStock() {
        return stock;
    }

    public String getImage() {
        return image;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
