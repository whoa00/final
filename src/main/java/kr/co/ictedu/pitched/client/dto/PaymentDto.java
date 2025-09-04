package kr.co.ictedu.pitched.client.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Alias("payDto")
public class PaymentDto {
    private int payment_id;          // 결제 ID (PK)
    private int reservation_id;      // 예약 ID (FK)
    private int amount;       // 결제 금액
    private String payment_date; // 결제 일시
    private String paymentMethod;    // 결제 수단
    private String payment_status;    // 결제 상태 (paid, pending, failed, refunded)
    private String transaction_id;    // 거래 고유 ID (Unique)
}
