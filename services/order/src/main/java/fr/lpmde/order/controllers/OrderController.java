package fr.lpmde.order.controllers;

import fr.lpmde.order.DTO.OrderDTO;
import fr.lpmde.order.mapper.OrderMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import fr.lpmde.order.repository.OrderRepository;

import java.util.List;
import java.util.stream.Collectors;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class OrderController {
    private OrderRepository orderRepository;
    OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    @GetMapping("/orders")
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }
}
