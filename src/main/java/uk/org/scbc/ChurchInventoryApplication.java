package uk.org.scbc;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import uk.org.scbc.dao.BuildingRepository;
import uk.org.scbc.dao.ItemRepository;
import uk.org.scbc.dao.OrganisationRepository;
import uk.org.scbc.dao.RoomRepository;
import uk.org.scbc.entities.*;

@SpringBootApplication
public class ChurchInventoryApplication {
    private static final Logger log = LoggerFactory.getLogger(ChurchInventoryApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ChurchInventoryApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(OrganisationRepository organisationRepository, BuildingRepository repository, RoomRepository roomRepository, ItemRepository itemRepository) {
        return (args) -> {
            // save a couple of customers
            Building hall = new Building(1L, "Hall");
            Building church = new Building(2L, "Church");
            Building wayInn = new Building(3L, "Way Inn");

            Room newRoom = new Room(1L, "Hall", hall);
            roomRepository.save(newRoom);

            repository.save(hall);
            repository.save(church);
            repository.save(wayInn);

            Storage storage = new Storage(1L, "AV Cupboard", "AV Equipment", newRoom, "Details on storage");
            Organisation boysBrigade = new Organisation(1L, "Boys Brigade");
            Organisation girlsBrigade = new Organisation(2L, "Girls Brigade");
            organisationRepository.save(boysBrigade);
            organisationRepository.save(girlsBrigade);

            Item plasticGoals = new Item(1L, "Plastic Goals", "Red Plastic Goals", "Some notes on the goals", 1.0f, false, storage, boysBrigade, "");
            Item tableTennisTable = new Item(2L, "Table Tennis Table", "Table Tennis Table", "Some notes on the tables", 1.0f, true, storage, boysBrigade, "");
            itemRepository.save(tableTennisTable);
            itemRepository.save(plasticGoals);

            newRoom = new Room(2L, "G1", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(3L, "G2", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(4L, "G3", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(5L, "G4 Under 5's", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(6L, "Lounge", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(7L, "Shutter store", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(8L, "Entrance", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(9L, "Upstairs", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(10L, "L1", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(11L, "L2", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(12L, "L3 Comfy chairs", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(13L, "Prayer room", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(14L, "Office", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(15L, "Boiler room", hall);
            roomRepository.save(newRoom);
            newRoom = new Room(16L, "Reception", church);
            roomRepository.save(newRoom);
            newRoom = new Room(17L, "Lounge", church);
            roomRepository.save(newRoom);
            newRoom = new Room(18L, "Church", church);
            roomRepository.save(newRoom);
            newRoom = new Room(19L, "Music room", church);
            roomRepository.save(newRoom);
            newRoom = new Room(20L, "Vestry", church);
            roomRepository.save(newRoom);
            newRoom = new Room(21L, "Kitchen", church);
            roomRepository.save(newRoom);
            newRoom = new Room(22L, "Boiler room", church);
            roomRepository.save(newRoom);
            newRoom = new Room(23L, "Vault 1", church);
            roomRepository.save(newRoom);
            newRoom = new Room(24L, "Vault church", church);
            roomRepository.save(newRoom);
            newRoom = new Room(25L, "Vault 3", church);
            roomRepository.save(newRoom);
            newRoom = new Room(26L, "Vault 4", church);
            roomRepository.save(newRoom);
            newRoom = new Room(27L, "Prayer Room", church);
            roomRepository.save(newRoom);

            log.info("Items found with findAll():");
            for (Item item : itemRepository.findAll()) {
                System.out.println(item);
            }

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
