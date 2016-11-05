package uk.org.scbc.controllers;

/**
 * Created by marc.thomas on 20/10/2016.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import uk.org.scbc.entities.Room;
import uk.org.scbc.services.RoomCreationService;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@RestController
public class RoomController {
    @Autowired
    private RoomCreationService roomCreationService;

    @RequestMapping(value = "/api/createRoom",  method = RequestMethod.POST)
    public ResponseEntity<String> createItem(@RequestBody Room room) {
        Room newRoom = roomCreationService.createRoom(room);
        ResponseEntity<String> response;

        if (newRoom != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.CREATED);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
