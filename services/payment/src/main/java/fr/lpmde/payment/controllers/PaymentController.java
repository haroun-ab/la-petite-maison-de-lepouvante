package fr.lpmde.payment.controllers;

import fr.lpmde.payment.dto.PaymentDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @PostMapping
    public String processPayment(@RequestBody PaymentDTO payment) {

        System.out.println("Paiement reçu pour la commande : " + payment.getOrderId());

        return "PAYMENT_SUCCESS";
    }
}