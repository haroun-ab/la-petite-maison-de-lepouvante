package fr.lpmde.order.DTO;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Builder
public class PaymentRequestDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long orderId;
    private Long clientId;
    private BigDecimal amount;
    private String status;
    // getters/setters
}