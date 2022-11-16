package data.service;

import data.dto.FeedDto;
import data.dto.FeedListDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FeedServiceInter {
    public void insertFeed(MultipartFile file, FeedDto dto);
    public List<FeedListDto> getAllFeeds(String search_col, String search_word, String order_col);
    public FeedDto getFeedByNum(int fd_num);
    public void deleteFeed(int fd_num);
    public void updateFeed(FeedDto dto);
}
