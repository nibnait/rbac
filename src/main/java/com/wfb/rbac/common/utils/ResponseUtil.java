package com.wfb.rbac.common.utils;

import com.wfb.rbac.common.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 操作原生响应工具类
 */
public class ResponseUtil {

    public static void write(HttpServletResponse res, Object obj) throws IOException {
        res.setStatus(200);
        res.setContentType(Constants.RESPONSE_MIME);
        res.setCharacterEncoding(Constants.CHARSET);
        PrintWriter writer = res.getWriter();
        writer.write(JsonUtil.toJson(obj));
    }
}
