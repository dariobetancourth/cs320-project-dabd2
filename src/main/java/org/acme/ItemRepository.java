package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;

/**
 * Repository interface for managing Item entities. Provides CRUD operations for items.
 * This interface allows operations such as adding, updating, or retrieving item information.
 */
@ApplicationScoped
public class ItemRepository {

    @Transactional
    public void addItem(Item item) {
        item.persist();
    }

    public List<Item> listAll() {
        return Item.listAll();
    }

    public Item findItemById(Long id) {
        return Item.findById(id);
    }

    @Transactional
    public void updateItem(Long id, Item updatedItem) {
        Item item = Item.findById(id);
        if (item != null) {
            item.setItemName(updatedItem.getItemName());
            item.setQuantity(updatedItem.getQuantity());
            item.setPrice(updatedItem.getPrice());
        }
    }

    @Transactional
    public void deleteItem(Long id) {
        Item item = Item.findById(id);
        if (item != null) {
            item.delete();
        }
    }
}
