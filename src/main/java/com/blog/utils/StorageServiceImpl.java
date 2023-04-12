package com.blog.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Component
public class StorageServiceImpl implements StorageService{

    @Value("${spring.servlet.multipart.location}")
    private String BASEPATH;

    @Override
    public String store(MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        String ext=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        System.out.println(ext);
        String fileName = UUID.randomUUID().toString().replaceAll("-", "")+ext;
        File filePath = new File(BASEPATH, fileName);
        System.out.println(filePath);
        try(FileOutputStream out = new FileOutputStream(filePath)) {
            FileCopyUtils.copy(file.getInputStream(), out);
            System.out.println(fileName);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
