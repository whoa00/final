package kr.co.ictedu.pitched.client.controller;

import kr.co.ictedu.pitched.client.dto.CampsiteDto;
import kr.co.ictedu.pitched.client.dto.PaymentDto;
import kr.co.ictedu.pitched.client.dto.ReviewDto;
import kr.co.ictedu.pitched.client.service.HostService;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/host")
public class HostController {

	@Autowired
	private HostService hostService;
	
	@GetMapping("/owncamp")
    public List<CampsiteDto> owncamp() {
        return hostService.owncamp();
    }

    @GetMapping("/earn")
    public List<PaymentDto> earn(@RequestParam("user_id") int user_id) {
        return hostService.earn(user_id);
    }

    @GetMapping("/review")
    public List<ReviewDto> review() {
        return hostService.review();
    }

    @GetMapping("/campsites")
    public List<CampsiteDto> getAllCampsites(@RequestParam("user_id") int user_id) {
        return hostService.getAllCampsites(user_id);
    }
	@PostMapping("/campsite")
	public ResponseEntity<?> campsite_add(@RequestBody CampsiteDto dto) {
		try {
			hostService.campsite_add(dto);
			return ResponseEntity.ok("캠핑장 등록 성공");
		} catch (Exception e) {
			// 디버깅을 위해 예외 로그 남기기
			// logger.error("캠핑장 등록 중 오류 발생", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("캠핑장 등록에 실패했습니다: " + e.getMessage());
		}
	}
}
