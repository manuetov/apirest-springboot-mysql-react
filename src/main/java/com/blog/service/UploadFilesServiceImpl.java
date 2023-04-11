package com.blog.service;

import com.blog.service.impl.UploadFilesService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UploadFilesServiceImpl implements UploadFilesService {

    @Override
    public String fileUpload(MultipartFile file) {
        try{
            // cambia nombre al fichero subido añadiendo un uid unico
            String fileName = UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            String fileoriginalName = file.getOriginalFilename();

            // controla el tamaño del archivo subido
            long fileSize = file.getSize();
            long maxFileSize = 5 * 1024 * 1024;

            if (fileSize > maxFileSize)
                return "El tamaño del fichero debe ser menor o igual a 5MB";

            if(!fileoriginalName.endsWith(".jpg")
                    && !fileoriginalName.endsWith(".jpeg")
                    && !fileoriginalName.endsWith(".png")
                    && !fileoriginalName.endsWith(".gif")){
                return "formatos de archivos permitidos JPG, JPEG, PNG, GIF";
            }

            // guarda lo que este despues del punto
            String fileExtenxion = fileoriginalName.substring(fileoriginalName.lastIndexOf("."));
            String newFileName = fileName + fileExtenxion;

            //creo una sola vez la carpeta donde se alojaran los files
            File folder = new File("src/main/resources/uploadImages");
            if(!folder.exists()){
                folder.mkdirs();
            }
            // creo la ruta y concateno el file
            Path path = Paths.get("src/main/resources/uploadImages/" + newFileName);
            Files.write(path, bytes);
            return "File subido correctamente";

   /*         // nombre del archivo para guardarlo en local
            File imageFile = new File(route + fileName );
            System.out.println("Archivo: " + imageFile.getAbsolutePath());
            file.transferTo(imageFile);
            return fileName;*/

        }catch (IOException e) {
            System.out.println("Error " + e.getMessage());
            return null;
        }
    }

}
