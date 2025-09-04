package kr.co.ictedu.pitched.client.service;

import kr.co.ictedu.pitched.client.dao.UsersDao;
import kr.co.ictedu.pitched.client.dto.UsersDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersService {
	@Autowired
    private final UsersDao usersDao;

    @Transactional
    public void saveHostProfile(UsersDto dto) {
        usersDao.updateHostProfile(dto);
    }
}
