package fr.lpmde.order;

import fr.lpmde.order.model.Order;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import fr.lpmde.order.repository.OrderRepository;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class OrderApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderApplication.class, args);
	}
	@Bean
	CommandLineRunner start(OrderRepository repo) {
		return args -> {
			if (repo.count() == 0) {
				List<Order> orders = List.of(
						Order.builder().clientId(1L).orderDate(LocalDateTime.now().minusDays(3)).status("PAID").build(),
						Order.builder().clientId(2L).orderDate(LocalDateTime.now().minusDays(2)).status("PENDING").build(),
						Order.builder().clientId(1L).orderDate(LocalDateTime.now().minusDays(1)).status("SHIPPED").build()
				);
				repo.saveAll(orders);
			}
			System.out.println("Orders loaded in DB!");
		};
	}
}
