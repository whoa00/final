package kr.co.ictedu.pitched.client.service;

import kr.co.ictedu.pitched.client.dto.ServiceData;
import kr.co.ictedu.pitched.client.dao.ServiceDataDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer containing business logic for service data operations.
 * This class acts as an intermediary between the Controller and the Mapper.
 * All interactions with the Oracle database for service data go through this class.
 */
@Service
@RequiredArgsConstructor
public class ServiceDataService {

    private final ServiceDataDao serviceDataDao;

    public List<ServiceData> findAll() {
        return serviceDataDao.findAll();
    }

    public Optional<ServiceData> findById(Long id) {
        return serviceDataDao.findById(id);
    }

    /**
     * Creates a new service data entry.
     * Here you could add business logic, e.g., validation, logging, etc.
     * @param serviceData The data to create.
     * @return The created data, potentially with a new ID from the database.
     */
    public ServiceData create(ServiceData serviceData) {
        serviceDataDao.insert(serviceData);
        return serviceData;
    }

    /**
     * Updates an existing service data entry.
     * You could add validation here to ensure the record exists before updating.
     * @param serviceData The data to update.
     * @return The updated data.
     */
    public ServiceData update(ServiceData serviceData) {
        serviceDataDao.update(serviceData);
        return serviceData;
    }
}
