package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Item Entity
 *
 * @author marc.thomas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String notes;
    private Float value;
    private Boolean isAsset;

    @ManyToOne
    private Storage storage;

    @ManyToOne
    private Organisation organisation;

    private String reference;
}
