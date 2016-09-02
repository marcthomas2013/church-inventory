package uk.org.scbc.entities;

import org.springframework.data.rest.core.config.Projection;

/**
 * Created by marc.thomas on 02/09/2016.
 */
@Projection(name = "inlineStorage", types = { Item.class })
public interface InlineStorage {
    String getName();
    String getDescription();
    String getNotes();
    Float getValue();
    Boolean getIsAsset();

    Storage getStorage();

    Organisation getOrganisation();
}
