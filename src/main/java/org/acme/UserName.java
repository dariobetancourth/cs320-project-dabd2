package org.acme;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user_names") // Ensure the table name matches your database schema
public class UserName extends PanacheEntity {
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "name", nullable = false, length = 50)
    public String name;

    // Default constructor
    public UserName() {}

    public UserName(String name) {
        this.name = name;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "UserName{" +
                "id=" + id + // Accessing id inherited from PanacheEntity
                ", name='" + name + '\'' +
                '}';
    }
}
