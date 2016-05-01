package uk.org.scbc.dao;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import uk.org.scbc.entities.Building;
import uk.org.scbc.entities.Room;

import java.util.List;

/**
 * Room Repository for retrieving and persisting rooms.
 *
 * @author marc.thomas
 */
@RepositoryRestResource(collectionResourceRel = "rooms", path = "rooms")
public interface RoomRepository extends PagingAndSortingRepository<Room, Long> {
    List<Building> findByName(@Param(value = "name") String name);
}
