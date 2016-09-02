package uk.org.scbc.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SimpleItem {
    private String name;
    private String description;
    private String notes;
    private Float value;
    private Boolean isAsset;

    private Long storageId;
    private Long organisationId;

    private String reference;
}

