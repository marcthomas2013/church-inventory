package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Building;
import uk.org.scbc.entities.Item;
import uk.org.scbc.entities.ItemWithInlineStorage;

import java.util.List;

/**
 * @author marc.thomas
 */
@RepositoryRestResource(collectionResourceRel = "items", path = "items", excerptProjection = ItemWithInlineStorage.class)
public interface ItemRepository extends PagingAndSortingRepository<Item, Long> {
    List<Building> findByName(@Param(value = "name") String name);
}
