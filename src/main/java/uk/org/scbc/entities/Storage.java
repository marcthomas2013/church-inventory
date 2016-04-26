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
}
