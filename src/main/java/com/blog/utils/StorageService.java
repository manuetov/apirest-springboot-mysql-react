package com.blog.utils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface StorageService {

    List<String> loadAll();

    String store(MultipartFile file);

}
