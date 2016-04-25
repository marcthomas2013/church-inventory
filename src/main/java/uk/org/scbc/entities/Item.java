package uk.org.scbc.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by marc.thomas on 25/04/2016.
 */
@Data
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

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
