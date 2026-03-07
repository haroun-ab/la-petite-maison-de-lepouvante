package fr.lpmde.payment;

import fr.lpmde.payment.dto.PaymentRequestDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class PaymentConsumer {

    @RabbitListener(queues = "payment.queue")
    public void processPayment(PaymentRequestDTO paymentDTO) {

        System.out.println("Paiement reçu : " + paymentDTO);

        // simulation paiement
        System.out.println("Paiement traité pour orderId = " + paymentDTO.getOrderId());
    }

}