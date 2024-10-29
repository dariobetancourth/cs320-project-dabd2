package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
/**
 * Repository interface for managing Inventory entities. Extends PanacheRepository to provide data access methods for Inventory items.
 * This interface allows CRUD operations on the inventory, such as adding, updating, or retrieving items.
 */

@ApplicationScoped
public class InventoryRepository implements PanacheRepository<Inventory> {
    // Inherits CRUD operations from PanacheRepository
}
