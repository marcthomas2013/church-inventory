package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Building;

import java.util.List;

/**
 * Building Repository for retrieving and persisting building items.
 *
 * @author marc.thomas
 */
@RepositoryRestResource(collectionResourceRel = "buildings", path = "buildings")
public interface BuildingRepository extends PagingAndSortingRepository<Building, Long> {
    List<Building> findByName(@Param(value = "name") String name);
}
