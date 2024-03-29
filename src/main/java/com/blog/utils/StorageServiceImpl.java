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
    public String store(MultipartFile imagen) {
        System.out.println(imagen.getOriginalFilename());
        String ext=imagen.getOriginalFilename().substring(imagen.getOriginalFilename().lastIndexOf("."));
        System.out.println(ext);
        String fileName = UUID.randomUUID().toString().replaceAll("-", "")+ext;
        File filePath = new File(BASEPATH, fileName);
        System.out.println(BASEPATH);
        System.out.println(filePath);
        try(FileOutputStream out = new FileOutputStream(filePath)) {
            FileCopyUtils.copy(imagen.getInputStream(), out);
            System.out.println(fileName);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Resource load(String fileName) {
        File filePath = new File(BASEPATH, fileName);
        if(filePath.exists())
            return new FileSystemResource(filePath);
        return null;
    }

}


/*
    @Override
    public List<String> loadAll() {
        File dirPath = new File(BASEPATH);
        return Arrays.asList(dirPath.list());
    }
*/