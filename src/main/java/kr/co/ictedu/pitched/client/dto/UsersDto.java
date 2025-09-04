package kr.co.ictedu.pitched.client.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@Alias("usersDto")
public class UsersDto {
    private int user_id;          // PK, NUMBER(10)
    private String id;                // 아이디, VARCHAR2(50)
    private String pwd;               // 비밀번호, VARCHAR2(200)
    private String email;             // 이메일, VARCHAR2(255)
    private String u_name;            // 이름, VARCHAR2(100)
    private String gender;            // 성별, '남자','여자','기타'
    private String profile_img;       // 프로필 이미지, VARCHAR2(255)
    private String tel;               // 전화번호, VARCHAR2(20)
    private String u_role;            // 역할, 'guest','host','admin'
    private String created_at;          // 생성일, DATE
    private String bdate;               // 생년월일, DATE
    private String host_reg_status;   // 호스트 등록 상태, 'pending','approved','rejected'
    private String c_name;            // 회사명, VARCHAR2(50)
    private String co_license;        // 사업자 번호, VARCHAR2(50)
    private String co_address;        // 회사 주소, VARCHAR2(150)
    private String co_ph_num;         // 회사 전화번호, VARCHAR2(20)
    private String host_intro;        // 호스트 소개, VARCHAR2(255)
    private String host_color;        // 호스트 컬러, VARCHAR2(15)
}
