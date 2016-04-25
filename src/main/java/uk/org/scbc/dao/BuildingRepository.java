package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Building;

import java.util.List;

/**
 * Created by marc.thomas on 25/04/2016.
 */
@RepositoryRestResource(collectionResourceRel = "building", path = "building")
public interface BuildingRepository extends PagingAndSortingRepository<Building, Long> {
    List<Building> findByName(@Param(value = "name") String name);
}
