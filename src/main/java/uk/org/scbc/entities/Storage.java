package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Storage Entity
 *
 * @author marc.thomas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "storage")
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String mainContents;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    private Room room;

    private String notes;

    /**
     * This is used to return the ID in the JSON to the client which can be used to set the ID when the item is created.
     * @return the ID of the storage
     */
    public Long getStorageId() {
        return id;
    }

    /**
     * This has been added to be able to display what the building is in the storage screen.
     *
     * @return building entity
     */
    public Building getBuilding() {
        return room.getBuilding();
    }
}
