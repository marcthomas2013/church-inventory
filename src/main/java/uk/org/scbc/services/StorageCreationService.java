package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.RoomRepository;
import uk.org.scbc.dao.StorageRepository;
import uk.org.scbc.entities.SimpleStorage;
import uk.org.scbc.entities.Storage;

/**
 * Created by marc.thomas on 20/10/2016.
 */
@Service
public class StorageCreationService {
    @Autowired
    private StorageRepository storageRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Storage createStorage(Storage storage) {
        Storage newStorage = new Storage();

        newStorage.setName(storage.getName());
        newStorage.setMainContents(storage.getMainContents());
        newStorage.setNotes(storage.getNotes());
        // TODO we need to set the correct room based on the selection
        newStorage.setRoom(roomRepository.findOne(1L));

        storageRepository.save(newStorage);

        return newStorage;
    }

    public Storage updateStorageFromSimpleStorage(SimpleStorage simpleStorage) {
        Storage storage = storageRepository.findOne(Long.parseLong(simpleStorage.getId()));

        storage.setName(simpleStorage.getName());
        storage.setRoom(roomRepository.findById(simpleStorage.getRoomId()));

        storageRepository.save(storage);

        return storage;
    }
}
