package kr.co.ictedu.pitched.client.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("photoDto")
public class CampsitePhotoDto {
    private int campsite_id;   // FK
    private String url;            // 사진 URL
    private String description;    // 설명
    private String is_primary;     // 'y' / 'n'
}


