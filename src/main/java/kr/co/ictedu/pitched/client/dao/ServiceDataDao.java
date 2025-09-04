package kr.co.ictedu.pitched.client.dao;

import kr.co.ictedu.pitched.client.dto.ServiceData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

/**
 * Mapper for regular user operations on the Oracle database.
 * This is an interface. MyBatis will generate a proxy class at runtime that
 * implements this interface. The actual SQL queries are defined in the corresponding
 * XML file: mappers/ServiceDataMapper.xml.
 */
@Mapper
public interface ServiceDataDao {

    /**
     * Gets all service data from the Oracle database.
     * Corresponds to the 'findAll' select statement in the XML.
     */
    List<ServiceData> findAll();

    /**
     * Finds a single service data entry by its primary key.
     * Corresponds to the 'findById' select statement in the XML.
     * @param id The ID of the record.
     * @return An Optional containing the data if found.
     */
    Optional<ServiceData> findById(@Param("id") Long id);

    /**
     * Inserts a new record into the database.
     * Corresponds to the 'insert' statement in the XML.
     * @param serviceData The data to be inserted.
     * @return The number of rows affected.
     */
    int insert(ServiceData serviceData);

    /**
     * Updates an existing record in the database.
     * Corresponds to the 'update' statement in the XML.
     * @param serviceData The data to be updated, identified by its ID.
     * @return The number of rows affected.
     */
    int update(ServiceData serviceData);
}
