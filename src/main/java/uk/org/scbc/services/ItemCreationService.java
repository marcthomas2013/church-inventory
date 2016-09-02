package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.ItemRepository;
import uk.org.scbc.dao.OrganisationRepository;
import uk.org.scbc.dao.StorageRepository;
import uk.org.scbc.entities.Item;
import uk.org.scbc.entities.SimpleItem;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@Service
public class ItemCreationService {
    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Item createItemFromSimpleItem(SimpleItem simpleItem) {
        Item item = new Item();

        item.setName(simpleItem.getName());
        item.setDescription(simpleItem.getDescription());
        item.setNotes(simpleItem.getNotes());
        item.setValue(simpleItem.getValue());
        item.setIsAsset(simpleItem.getIsAsset());
        item.setStorage(storageRepository.findById(simpleItem.getStorageId()));
        item.setOrganisation(organisationRepository.findById(simpleItem.getOrganisationId()));

        itemRepository.save(item);

        return item;
    }
}
