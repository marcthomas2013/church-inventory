package uk.org.scbc;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import uk.org.scbc.dao.BuildingRepository;
import uk.org.scbc.entities.Building;

@SpringBootApplication
public class ChurchInventoryApplication {
    private static final Logger log = LoggerFactory.getLogger(ChurchInventoryApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChurchInventoryApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(BuildingRepository repository) {
        return (args) -> {
            // save a couple of customers
            repository.save(new Building(1, "Hall"));
            repository.save(new Building(2, "Church"));
            repository.save(new Building(3, "Way Inn"));

            // fetch all customers
            log.info("Customers found with findAll():");
            log.info("-------------------------------");
        };
    }
}
