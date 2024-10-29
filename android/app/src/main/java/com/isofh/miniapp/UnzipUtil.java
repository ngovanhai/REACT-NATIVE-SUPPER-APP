package com.isofh.miniapp;

import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class UnzipUtil {
    private static final String TAG = "UnzipUtil";

    public static Boolean unzipFile(Context context, String appId, String zipFilePath, String destinationFolder) {
//        Executor executor = Executors.newSingleThreadExecutor();
//        CountDownLatch latch = new CountDownLatch(1);
//        AtomicBoolean success = new AtomicBoolean(false);
        try {
            File destination = new File(destinationFolder);
            if (!destination.exists()) {
                destination.mkdirs();
            }

            FileInputStream fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze;

            byte[] buffer = new byte[1024];
            int count;
            int index = 0;
            File cacheDir = context.getCacheDir();

            // Create a directory for the specific appId within the cache directory
            File appDir = new File(cacheDir, appId);
            File newFile = null;
            while ((ze = zis.getNextEntry()) != null) {
                String fileName = ze.getName();
                if (fileName.endsWith("/")) {
                    newFile = new File(appDir, fileName.replace("/", ""));
                    if (!newFile.exists())
                        newFile.mkdirs();
                    continue;
                }
                File cacheFile = new File(appDir, fileName);
                FileOutputStream fos = new FileOutputStream(cacheFile);
                while ((count = zis.read(buffer)) != -1) {
                    fos.write(buffer, 0, count);
                }
                fos.close();
                zis.closeEntry();
            }

            zis.close();
            fis.close();
            return true;
        } catch (IOException e) {
            Log.e(TAG, "Error while unzipping: " + e.getMessage());
            return false;
        } finally {
        }
    }
}