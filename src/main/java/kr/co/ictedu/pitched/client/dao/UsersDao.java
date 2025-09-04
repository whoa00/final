package kr.co.ictedu.pitched.client.dao;

import kr.co.ictedu.pitched.client.dto.UsersDto;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface UsersDao {
    int updateHostProfile(UsersDto dto);
}
