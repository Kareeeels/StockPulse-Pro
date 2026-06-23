package com.stockpulse;

import com.stockpulse.entity.Stock;
import com.stockpulse.entity.User;
import com.stockpulse.repository.StockRepository;
import com.stockpulse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StockRepository stockRepository;

    @Override
    public void run(String... args) throws Exception {
        // Crear usuario admin si no existe
        if (userRepository.findByUsername("admin") == null) {
            User admin = new User("admin", "12345");
            userRepository.save(admin);
            System.out.println("Usuario admin creado: admin / 12345");
        }

        // Crear acciones de ejemplo si no hay ninguna
        if (stockRepository.count() == 0) {
            stockRepository.save(new Stock("NVIDIA", "NVDA", "Tecnología", 124.50, "NASDAQ"));
            stockRepository.save(new Stock("Google", "GOOGL", "Tecnología", 178.20, "NASDAQ"));
            stockRepository.save(new Stock("BBVA", "BBVA", "Banca", 11.40, "BMV"));
            stockRepository.save(new Stock("Apple", "AAPL", "Tecnología", 210.30, "NASDAQ"));
            System.out.println("Acciones de ejemplo creadas");
        }
    }
}
