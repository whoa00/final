package kr.co.ictedu.pitched.client.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("hashtagDto")
public class HashtagDto {
    private Integer hashtag_id;    // PK
    private String tag_name;       // 태그명
}

