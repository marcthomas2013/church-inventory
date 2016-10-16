package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.OrganisationRepository;
import uk.org.scbc.entities.Organisation;
import uk.org.scbc.entities.SimpleItem;

/**
 * Created by marc.thomas on 16/10/2016.
 */
@Service
public class OrganisationCreationService {
    @Autowired
    private OrganisationRepository organisationRepository;

    public Organisation createOrganisation(Organisation organisation) {
        Organisation newOrganisation = new Organisation();

        newOrganisation.setName(organisation.getName());

        organisationRepository.save(newOrganisation);

        return newOrganisation;
    }
}

