package kr.co.ictedu.pitched.client.service;

import kr.co.ictedu.pitched.client.dao.HostDao;
import kr.co.ictedu.pitched.client.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HostService {

	@Autowired
	private HostDao hostDAO;
	
	public List<CampsiteDto> owncamp() {
        return hostDAO.owncamp();
    }
	
	public List<PaymentDto> earn(int reservation_id) {
        return hostDAO.earn(reservation_id);
    }
	
	public List<ReviewDto> review() {
        return hostDAO.review();
    }

    public List<CampsiteDto> getAllCampsites(int user_id) {
        return hostDAO.selectAllCampsites(user_id);
    }
	@Transactional
	public void campsite_add(CampsiteDto dto) {
		// 1. 캠핑장 등록
		hostDAO.campsite_add(dto);

		// 2. 사진 등록
		if (dto.getPhotos() != null) {
			for (CampsitePhotoDto photo : dto.getPhotos()) {
				photo.setCampsite_id(dto.getCampsite_id());
				hostDAO.campsite_photos_add(photo);
			}
		}

		// 3. 해시태그 등록
		if (dto.getTags() != null) {
			for (String tag : dto.getTags()) {
				Integer hashtagId = hostDAO.getHashtagByName(tag);

				if (hashtagId == null) { // 없으면 새로 insert
					HashtagDto hashtagDTO = new HashtagDto();
					hashtagDTO.setTag_name(tag);
					hostDAO.insertHashtag(hashtagDTO);
					hashtagId = hashtagDTO.getHashtag_id();
				}

				Map<String, Object> tagParam = new HashMap<>();
				tagParam.put("campsite_id", dto.getCampsite_id());
				tagParam.put("hashtag_id", hashtagId);
				hostDAO.insertCampsiteHashtag(tagParam);
			}
		}
	}
}
