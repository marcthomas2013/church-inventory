package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.BuildingRepository;
import uk.org.scbc.dao.RoomRepository;
import uk.org.scbc.entities.Room;
import uk.org.scbc.entities.SimpleRoom;

/**
 * Created by marc.thomas on 20/10/2016.
 */
@Service
public class RoomCreationService {
    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BuildingRepository buildingRepository;

    public Room createRoom(SimpleRoom room) {
        Room newRoom = new Room();

        newRoom.setName(room.getName());
        newRoom.setBuilding(buildingRepository.findById(room.getBuildingId()));

        roomRepository.save(newRoom);

        return newRoom;
    }

    public Room updateRoomFromSimpleRoom(SimpleRoom simpleRoom) {
        Room room = roomRepository.findOne(Long.parseLong(simpleRoom.getId()));

        room.setName(simpleRoom.getName());
        room.setBuilding(buildingRepository.findById(simpleRoom.getBuildingId()));

        roomRepository.save(room);

        return room;
    }
}
