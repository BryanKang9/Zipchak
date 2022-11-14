package data.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.apache.ibatis.type.Alias;

import java.sql.Timestamp;

@Data
@Alias("ShopProductDto")
public class ShopProductDto {

    private int sp_num;
    private int ur_num;
    private int pd_num;
    private String sp_title;
    private String sp_txt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone="Asia/Seoul")
    private Timestamp sp_wdate;
    private int sp_rdcnt;
    private String pd_name;
    private int pd_price;
    private String pd_ctg;
    private String pd_status;
    private String img_first;
    private String prf_nick;
    private String prf_img;
    private double prf_tmp;
}
