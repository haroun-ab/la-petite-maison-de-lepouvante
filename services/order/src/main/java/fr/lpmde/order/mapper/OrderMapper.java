package fr.lpmde.order.mapper;

import fr.lpmde.order.DTO.OrderDTO;
import fr.lpmde.order.model.Order;

public class OrderMapper {

    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;

        return new OrderDTO(
                order.getId(),
                order.getClientId(),
                order.getTotal(),
                order.getStatus(),
                order.getOrderDate()
        );
    }

    public static Order fromDTO(OrderDTO dto) {
        if (dto == null) return null;

        return Order.builder()
                .id(dto.getId())
                .clientId(dto.getClientId())
                .total(dto.getTotal())
                .status(dto.getStatus())
                .orderDate(dto.getOrderDate())
                .build();
    }
}