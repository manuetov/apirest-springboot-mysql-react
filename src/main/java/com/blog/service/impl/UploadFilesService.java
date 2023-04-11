package com.blog.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UploadFilesService {

    String fileUpload(MultipartFile file);
}
