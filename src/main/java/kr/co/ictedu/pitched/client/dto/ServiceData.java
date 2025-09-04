package kr.co.ictedu.pitched.client.dto;

import lombok.Data;

/**
 * DTO (Data Transfer Object) for Service Data.
 * This class represents a single record from your main Oracle table.
 * The fields in this class should correspond to the columns in your table.
 *
 * The @Data annotation from Lombok automatically generates:
 * - Getters for all fields
 * - Setters for all fields
 * - A useful toString() method
 * - equals() and hashCode() implementations
 * - A constructor that accepts all final fields
 */
@Data
public class ServiceData {

    /**
     * Corresponds to the primary key column (e.g., ID NUMBER).
     */
    private Long id;

    /**
     * Corresponds to a text column (e.g., NAME VARCHAR2(255)).
     */
    private String name;

    /**
     * Corresponds to another text column (e.g., DESCRIPTION VARCHAR2(1000)).
     */
    private String description;

}
