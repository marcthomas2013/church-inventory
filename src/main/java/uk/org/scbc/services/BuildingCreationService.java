package uk.org.scbc.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.org.scbc.dao.BuildingRepository;
import uk.org.scbc.entities.Building;

/**
 * Created by marc.thomas on 20/10/2016.
 */
@Service
public class BuildingCreationService {
    @Autowired
    private BuildingRepository buildingRepository;

    public Building createBuilding(Building building) {
        Building newBuilding = new Building();

        newBuilding.setName(building.getName());

        buildingRepository.save(newBuilding);

        return newBuilding;
    }
}
