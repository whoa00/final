package kr.co.ictedu.pitched.client.dao;

import kr.co.ictedu.pitched.client.dto.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface HostDao {

	List<CampsiteDto> owncamp();
	
    List<CampsiteDto> selectAllCampsites(int user_id);
    
    List<PaymentDto> earn(int user_id);
    
    List<ReviewDto> review();

    void campsite_add(CampsiteDto dto);

    void campsite_photos_add(CampsitePhotoDto photoDto);

    Integer getHashtagByName(@Param("tag_name") String tag_name);

    int insertHashtag(HashtagDto hashtagDto);

    void insertCampsiteHashtag(Map<String, Object> tagParam);
    
    
}
