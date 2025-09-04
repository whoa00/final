package kr.co.ictedu.pitched.client.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;
import java.util.List;

@Getter
@Setter
@Alias("campsiteDto")
public class CampsiteDto {
    private int campsite_id;
    private int user_id;
    private String camp_name;
    private String category;
    private String address;
    private int price_per_night;
    private int max_reservation;
    private int max_guests;
    private String description;
    private String status;
    private String reg_status;

    // 연관 데이터
    private List<CampsitePhotoDto> photos;
    private List<String> tags;  // 문자열 태그만 받음

}
