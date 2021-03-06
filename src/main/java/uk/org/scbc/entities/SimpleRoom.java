package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by marc.thomas on 12/11/2016.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimpleRoom {
    private String id;
    private String name;

    private Long buildingId;
}
