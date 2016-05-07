package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Storage;

import java.util.List;

/**
 * Storage Repository for retrieving and persisting storage.
 *
 * @author marc.thomas
 */
@RepositoryRestResource(collectionResourceRel = "storage", path = "storage")
public interface StorageRepository extends PagingAndSortingRepository<Storage, Long> {
    List<Storage> findByName(@Param(value = "name") String name);
}
