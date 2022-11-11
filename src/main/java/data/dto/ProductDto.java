package data.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("ProductDto")
public class ProductDto {

    private int pd_num;
    private String pd_name;
    private int pd_price;
    private String pd_ctg;
    private String pd_status;
    private int img_num;
    private String img_name;

}
