package fr.lpmde.order;

import fr.lpmde.order.DTO.PaymentRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import static fr.lpmde.order.RabbitMQConfig.EXCHANGE;
import static fr.lpmde.order.RabbitMQConfig.ROUTING_KEY;

@Service
@RequiredArgsConstructor
public class PaymentProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendPaymentRequest(PaymentRequestDTO paymentDTO) {

        rabbitTemplate.convertAndSend(
                EXCHANGE,
                ROUTING_KEY,
                paymentDTO
        );

        System.out.println("Payment event envoyé : " + paymentDTO);
    }

}