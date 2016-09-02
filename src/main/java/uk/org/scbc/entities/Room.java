package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Room Entity
 *
 * @author marc.thomas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    private Building building;

    /**
     * This is used to return the ID in the JSON to the client which can be used to set the ID when the item is created.
     * @return the ID of the room
     */
    public Long getRoomId() {
        return id;
    }
}
