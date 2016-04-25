package uk.org.scbc;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import uk.org.scbc.dao.BuildingRepository;
import uk.org.scbc.dao.RoomRepository;
import uk.org.scbc.entities.Building;
import uk.org.scbc.entities.Room;

@SpringBootApplication
public class ChurchInventoryApplication {
    private static final Logger log = LoggerFactory.getLogger(ChurchInventoryApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChurchInventoryApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(BuildingRepository repository, RoomRepository roomRepository) {
        return (args) -> {


            // save a couple of customers
            Building hall = new Building(1, "Hall");
            repository.save(hall);
            Building church = new Building(2, "Church");
            repository.save(church);
            Building wayInn = new Building(3, "Way Inn");
            repository.save(wayInn);

            roomRepository.save(new Room(1, "Room 1", wayInn));

            // fetch all Buildings
            log.info("Buildings found with findAll():");
            for (Building building : repository.findAll()) {
                System.out.println(building);
            }

            // fetch all Rooms
            log.info("Rooms found with findAll():");
            for (Room room : roomRepository.findAll()) {
                System.out.println(room);
            }
        };
    }
}
