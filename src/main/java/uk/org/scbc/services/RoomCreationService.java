package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.RoomRepository;
import uk.org.scbc.entities.Room;

/**
 * Created by marc.thomas on 20/10/2016.
 */
@Service
public class RoomCreationService {
    @Autowired
    private RoomRepository roomRepository;

    public Room createRoom(Room room) {
        Room newRoom = new Room();

        newRoom.setName(room.getName());

        roomRepository.save(newRoom);

        return newRoom;
    }
}
