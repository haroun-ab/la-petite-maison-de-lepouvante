package fr.lpmde.order.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
@AllArgsConstructor
@Getter@Setter
public class OrderDTO {
    private Long id;
    private Long clientId;
    private LocalDateTime orderDate;
    private String status;
}
