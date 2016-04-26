package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Building;
import uk.org.scbc.entities.Item;

import java.util.List;

/**
 * @author marc.thomas
 */
@RepositoryRestResource(collectionResourceRel = "item", path = "item")
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    List<Building> findByName(@Param(value = "name") String name);
}
