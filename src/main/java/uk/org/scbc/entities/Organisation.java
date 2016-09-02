package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Organisation Entity
 *
 * @author marc.thomas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "organisations")
public class Organisation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    /**
     * This is used to return the ID in the JSON to the client which can be used to set the ID when the item is created.
     * @return the ID of the organisation
     */
    public Long getOrganisationId() {
        return id;
    }
}
