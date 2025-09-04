package kr.co.ictedu.pitched.client.controller;

import kr.co.ictedu.pitched.client.dto.ServiceData;
import kr.co.ictedu.pitched.client.service.ServiceDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing regular service data.
 * This exposes endpoints for standard CRUD operations on the Oracle database.
 * It delegates all business logic to the ServiceDataService.
 */
@RestController
@RequestMapping("/api/service-data")
@RequiredArgsConstructor
public class ServiceDataController {

    private final ServiceDataService serviceDataService;

    @GetMapping
    public ResponseEntity<List<ServiceData>> getAllServiceData() {
        return ResponseEntity.ok(serviceDataService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceData> getServiceDataById(@PathVariable Long id) {
        return serviceDataService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ServiceData> createServiceData(@RequestBody ServiceData serviceData) {
        return ResponseEntity.ok(serviceDataService.create(serviceData));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceData> updateServiceData(@PathVariable Long id, @RequestBody ServiceData serviceData) {
        // Ensure the ID in the path matches the ID in the body
        serviceData.setId(id);
        return ResponseEntity.ok(serviceDataService.update(serviceData));
    }
}
