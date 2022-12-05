package data.service;

import data.dto.FeedDto;
import data.dto.ProductDto;
import data.dto.ProductImageDto;
import data.dto.ShopDto;
import data.mapper.FeedMapper;
import data.mapper.ProductMapper;
import data.mapper.ShopMapper;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public class ExcelService {

    @Autowired
    FeedMapper feedMapper;

    @Autowired
    ProductMapper productMapper;

    @Autowired
    ShopMapper shopMapper;


    @Autowired
    ExcelUtil excelUtil;

    public void insertFeed(MultipartFile file) throws InvalidFormatException {

        List<Map<String, String>> dataList = excelUtil.getListData(file);

        for(Map<String, String> data:dataList){
            FeedDto feedDto = new FeedDto();
            feedDto.setUr_num(Integer.parseInt(data.get("ur_num").split("[.]")[0]));
            feedDto.setFd_title(data.get("fd_title"));
            feedDto.setFd_txt(data.get("fd_txt"));
            int sidx = data.get("fd_img").lastIndexOf("/")+1;
            int lidx = data.get("fd_img").lastIndexOf("?");
            feedDto.setFd_img(data.get("fd_img").substring(sidx,lidx));
            feedDto.setFd_spc(Integer.parseInt(data.get("fd_spc")));
            feedDto.setFd_lvtp(data.get("fd_lvtp"));
            feedDto.setFd_fml(data.get("fd_fml"));
            feedDto.setFd_style(data.get("fd_style"));
            feedMapper.insertFeed(feedDto);
        }
    }

    public void insertShop(MultipartFile file) throws InvalidFormatException {
        List<Map<String,String>> dataList = excelUtil.getListData(file);

        for(Map<String, String> data:dataList){
            ProductDto productDto = new ProductDto();
            productDto.setPd_ctg(data.get("pd_ctg"));
            productDto.setPd_price(Integer.parseInt(data.get("pd_price")));
            productDto.setPd_status(data.get("pd_status"));
            productMapper.insertProduct(productDto);

            ShopDto shopDto = new ShopDto();
            shopDto.setSp_title(data.get("sp_title"));
            shopDto.setPd_num(productDto.getPd_num());
            shopDto.setUr_num((int)Math.ceil(Math.random())*10+40);
            shopMapper.insertShop(shopDto);

            String pdimg = data.get("pd_img");
            String[] imgsplit = pdimg.split(",");
            for(String img:imgsplit){
                ProductImageDto productImageDto = new ProductImageDto();
                productImageDto.setPd_num(productDto.getPd_num());
                productImageDto.setImg_name(img);
                productMapper.insertProductImg(productImageDto);
            }
        }
    }
}
