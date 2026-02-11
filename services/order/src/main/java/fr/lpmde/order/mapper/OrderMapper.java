package fr.lpmde.order.mapper;

import fr.lpmde.order.DTO.OrderDTO;
import fr.lpmde.order.model.Order;

public class OrderMapper {

    // Entity -> DTO
    public static OrderDTO toDTO(Order order) {
        if (order == null) return null;
        return new OrderDTO(
                order.getId(),
                order.getClientId(),
                order.getOrderDate(),
                order.getStatus()
        );
    }

    // DTO -> Entity
    public static Order fromDTO(OrderDTO orderDTO) {
        if (orderDTO == null) {
            return null;
        }

        Order order = new Order();
        order.setId(orderDTO.getId());
        order.setClientId(orderDTO.getClientId());
        order.setStatus(orderDTO.getStatus());
        order.setOrderDate(orderDTO.getOrderDate());
        return order;
    }
}
