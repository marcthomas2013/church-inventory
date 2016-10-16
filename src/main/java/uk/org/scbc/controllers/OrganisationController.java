package uk.org.scbc.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import uk.org.scbc.entities.Organisation;
import uk.org.scbc.services.OrganisationCreationService;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@RestController
public class OrganisationController {
    @Autowired
    private OrganisationCreationService organisationCreationService;

    @RequestMapping(value = "/api/createOrganisation",  method = RequestMethod.POST)
    public ResponseEntity<String> createItem(@RequestBody Organisation organisation) {
        Organisation newOrganisation = organisationCreationService.createOrganisation(organisation);
        ResponseEntity<String> response;

        if (newOrganisation != null) {
            response = new ResponseEntity<>("{\"response\": \"success\"}", HttpStatus.CREATED);
        } else {
            response = new ResponseEntity<>("{\"response\": \"failed to create entity\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return response;
    }
}
