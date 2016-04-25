package uk.org.scbc.entities;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by marc.thomas on 25/04/2016.
 */
@Data
@Entity
@Table(name = "organisations")
public class Organisation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;
}
