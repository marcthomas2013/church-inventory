package uk.org.scbc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import uk.org.scbc.entities.Item;
import uk.org.scbc.entities.SimpleItem;
import uk.org.scbc.services.ItemCreationService;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@RestController
public class ItemController {
    @Autowired
    private ItemCreationService itemCreationService;

    @RequestMapping(value = "/api/createItem",  method = RequestMethod.POST)
    public ResponseEntity<String> createItem(@RequestBody SimpleItem simpleItem) {
        Item newItem = itemCreationService.createItemFromSimpleItem(simpleItem);
        ResponseEntity<String> response;

        if (newItem != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.CREATED);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }

    @RequestMapping(value = "/api/updateItem", method = RequestMethod.PUT)
    public ResponseEntity<String> updateItem(@RequestBody SimpleItem simpleItem) {
        Item updatedItem = itemCreationService.updateItemFromSimpleItem(simpleItem);
        ResponseEntity<String> response;

        if (updatedItem != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.OK);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
