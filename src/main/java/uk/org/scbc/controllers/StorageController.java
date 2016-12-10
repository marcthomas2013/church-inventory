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
import uk.org.scbc.entities.SimpleStorage;
import uk.org.scbc.entities.Storage;
import uk.org.scbc.services.StorageCreationService;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@RestController
public class StorageController {
    @Autowired
    private StorageCreationService storageCreationService;

    @RequestMapping(value = "/api/createStorage",  method = RequestMethod.POST)
    public ResponseEntity<String> createStorage(@RequestBody SimpleStorage storage) {
        Storage newStorage = storageCreationService.createStorage(storage);
        ResponseEntity<String> response;

        if (newStorage != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.CREATED);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @RequestMapping(value = "/api/updateStorage", method = RequestMethod.PUT)
    public ResponseEntity<String> updateItem(@RequestBody SimpleStorage simpleStorage) {
        Storage updatedRoom = storageCreationService.updateStorageFromSimpleStorage(simpleStorage);
        ResponseEntity<String> response;

        if (updatedRoom != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.OK);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
