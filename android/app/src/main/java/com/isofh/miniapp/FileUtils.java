package com.isofh.miniapp;

import android.content.Context;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class FileUtils {

        // Phương thức này sẽ đọc nội dung của tệp và trả về dưới dạng chuỗi
        public static String readFromFile(Context context,File file) {
            StringBuilder stringBuilder = new StringBuilder();
            try {
                // Kiểm tra xem tệp có tồn tại không trước khi đọc
                if (file.exists()) {
                    // Tạo một luồng đầu vào để đọc từ tệp
                    BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
                    String line;
                    // Đọc từng dòng của tệp và nối chúng thành một chuỗi
                    while ((line = bufferedReader.readLine()) != null) {
                        stringBuilder.append(line);
                        stringBuilder.append('\n'); // Thêm dòng mới
                    }
                    // Đóng luồng
                    bufferedReader.close();
                } else {
                    // Xử lý khi tệp không tồn tại
                    stringBuilder.append("File not found.");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            return stringBuilder.toString();

    }
    // Phương thức này sẽ ghi nội dung chuỗi vào tệp mới
    public static void writeToFile(Context context, File file, String content) {
        try {
            // Tạo một luồng đầu ra để ghi vào tệp
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
            // Ghi nội dung vào tệp
            bufferedWriter.write(content);
            // Đóng luồng
            bufferedWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
