package kr.co.ictedu.pitched.client.controller;

import kr.co.ictedu.pitched.client.dto.UsersDto;
import kr.co.ictedu.pitched.client.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/host")
@RequiredArgsConstructor
public class UsersController {
	@Autowired
    private final UsersService usersService;

    @PostMapping("/profile/save")
    public String saveHostProfile(@RequestBody UsersDto dto) {
        usersService.saveHostProfile(dto);
        return "호스트 프로필 저장 완료";
    }
}
