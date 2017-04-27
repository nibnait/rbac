package com.wfb.rbac.api.controller.user;

import com.wfb.rbac.api.resultModel.user.HeadImgModel;
import com.wfb.rbac.common.ErrorsResult;
import com.wfb.rbac.common.ResultBuilder;
import com.wfb.rbac.common.models.ApiResultModel;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Decoder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UploadHeadImgController {

    /**
     * 上传头像
     */
    @RequestMapping("/uploadHeadImage")
    public ApiResultModel uploadHeadImage(@RequestParam(required = false) String userId, @RequestParam(required = true) String fileBase64) {
        if (StringUtils.isEmpty(fileBase64)){
            return ErrorsResult.PARAM_ERROR;
        }
        HeadImgModel headImgModel = new HeadImgModel();
        String filePath = "/headImg";
        String fileName = GenerateImage(fileBase64, filePath);
        if (fileName != null){
            headImgModel.setUrl(filePath+"/"+fileName);
            return ResultBuilder.getSuccess(headImgModel);
        } else {
            return ErrorsResult.UPLOAD_ERROR;
        }
    }

    /**
     * 对字节数组字符串进行Base64解码并生成图片
     * @param imgStr Base64字符串
     * @param imgFilePath 生成图片保存路径
     * @return boolean
     */
    public static String GenerateImage(String imgStr, String imgFilePath) {
        if (imgStr == null) {// 图像数据为空
            return null;
        }
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] bytes = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < bytes.length; ++i) {
                if (bytes[i] < 0) {// 调整异常数据
                    bytes[i] += 256;
                }
            }
            //创建目录
            imgFilePath = "c://apache-tomcat-7.0.68/webapps/ROOT"+imgFilePath;
            File file = new File(imgFilePath);
            if (!file.exists()) {
                file.mkdirs();
            }
            String fileName = UUID.randomUUID().toString().replace("-","")+".jpg";
            // 生成jpeg图片
            OutputStream out = new FileOutputStream(imgFilePath+"\\"+fileName);
            out.write(bytes);
            out.flush();
            out.close();
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
