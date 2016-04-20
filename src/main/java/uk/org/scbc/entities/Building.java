package uk.org.scbc.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by marc.thomas on 20/04/2016.
 */

@Entity
@Table(name = "buildings")
public class Building {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    private String name;
}
