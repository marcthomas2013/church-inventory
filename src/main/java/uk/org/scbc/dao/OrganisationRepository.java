package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Organisation;

import java.util.List;

/**
 * Organisation Repository for retrieving and persisting organisation.
 */
@RepositoryRestResource(collectionResourceRel = "organisations", path = "organisations")
public interface OrganisationRepository extends PagingAndSortingRepository<Organisation, Long> {
    List<Organisation> findByName(@Param(value = "name") String name);

    Organisation findById(@Param(value = "id") Long id);
}
