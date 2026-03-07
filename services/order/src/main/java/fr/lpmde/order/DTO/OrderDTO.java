package fr.lpmde.order.DTO;

import fr.lpmde.order.model.Order;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private Long clientId;
    private Double total;
    private String status;
    private LocalDateTime orderDate;

}