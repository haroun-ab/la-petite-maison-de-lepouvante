package fr.lpmde.order.controllers;

import fr.lpmde.order.DTO.OrderDTO;
import fr.lpmde.order.DTO.PaymentRequestDTO;
import fr.lpmde.order.PaymentProducer;
import fr.lpmde.order.mapper.OrderMapper;
import fr.lpmde.order.model.Order;
import org.springframework.web.bind.annotation.*;
import fr.lpmde.order.repository.OrderRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://frontend")
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository orderRepository;
    private final PaymentProducer paymentProducer;

    public OrderController(OrderRepository orderRepository, PaymentProducer paymentProducer) {
        this.orderRepository = orderRepository;
        this.paymentProducer = paymentProducer;
    }

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = OrderMapper.fromDTO(orderDTO);
        order.setStatus("CREATED");
        order.setOrderDate(LocalDateTime.now());

        Order saved = orderRepository.save(order);

        PaymentRequestDTO paymentDTO = PaymentRequestDTO.builder()
                .orderId(order.getId())
                .clientId(order.getClientId())
                .amount(BigDecimal.valueOf(order.getTotal()))
                .status("PENDING")
                .build();
        paymentProducer.sendPaymentRequest(paymentDTO);

        return OrderMapper.toDTO(saved);
    }
}
