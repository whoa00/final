package kr.co.ictedu.pitched.client.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("reviewDto")
public class ReviewDto {
	private int review_id;       // 리뷰 ID (PK)
    private int reservation_id;  // 예약 ID (FK, UNIQUE)
    private int user_id;         // 사용자 ID (FK)
    private int campsite_id;     // 캠핑장 ID (FK)
    private int rating;         // 평점 (1~5)
    private String comm;        // 리뷰 내용
    private String created_at;    // 작성일
    private int reported_num;    // 신고 횟수
}
