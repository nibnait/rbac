package com.wfb.rbac.api.controller.login;

import com.wfb.rbac.api.resultModel.login.CaptchaModel;
import com.wfb.rbac.common.*;
import com.wfb.rbac.common.models.ApiResultModel;
import org.patchca.color.RandomColorFactory;
import org.patchca.filter.predefined.CurvesRippleFilterFactory;
import org.patchca.service.ConfigurableCaptchaService;
import org.patchca.word.WordFactory;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

@RestController
@RequestMapping("/login")
public class GetCaptchaController {

    @RequestMapping("/getCaptcha")
    public ApiResultModel getCaptcha(HttpSession session) throws IOException {
        ConfigurableCaptchaService cs = new ConfigurableCaptchaService();
        cs.setColorFactory(new RandomColorFactory());
        cs.setFilterFactory(new CurvesRippleFilterFactory(cs.getColorFactory()));
        LoginWordFactory loginWord = new LoginWordFactory();
        cs.setWordFactory(loginWord);
        BufferedImage image = cs.getCaptcha().getImage();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, "png", outputStream);
        String imgStr = Base64Utils.encodeToString(outputStream.toByteArray());
        String captchaStr = loginWord.getCurrentStr();
        // 将四位数字的验证码保存到Session中
        session.setAttribute("captcha", captchaStr);
        CaptchaModel captchaModel = new CaptchaModel();
        captchaModel.setCaptchaData(imgStr);
        captchaModel.setCodeKey(captchaStr);
        return ResultBuilder.getSuccess(captchaModel);
    }

    private static class LoginWordFactory implements WordFactory {

        private String mCurrentStr;
        String characters;
        int minLength;
        int maxLength;

        public void setCharacters(String characters) {
            this.characters = characters;
        }

        public void setMinLength(int minLength) {
            this.minLength = minLength;
        }

        public void setMaxLength(int maxLength) {
            this.maxLength = maxLength;
        }

        LoginWordFactory() {
            characters = "absdegkmnopwx23456789";
            minLength = 4;
            maxLength = 4;
        }

        @Override
        public String getNextWord() {
            Random rnd = new Random();
            StringBuilder sb = new StringBuilder();
            int l = minLength + (maxLength > minLength ? rnd.nextInt(maxLength - minLength) : 0);
            for (int i = 0; i < l; i++) {
                int j = rnd.nextInt(characters.length());
                sb.append(characters.charAt(j));
            }
            mCurrentStr = sb.toString();
            return mCurrentStr;
        }

        String getCurrentStr() {
            return mCurrentStr;
        }
    }
}

