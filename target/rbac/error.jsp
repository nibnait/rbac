<%@ page import="com.wfb.rbac.common.models.ApiResultModel" %>
<%@ page import="com.wfb.rbac.common.utils.ResponseUtil" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" isErrorPage="true" %>
<%
    ApiResultModel resultModel = new ApiResultModel();
    resultModel.setStatus(response.getStatus());
    if (exception != null) {
        StackTraceElement[] stackTrace = exception.getStackTrace();
        String msg = String.format("%s:%s", exception.toString(), stackTrace.length > 0 ? stackTrace[0] : "");
        resultModel.setMsg(msg);
        ResponseUtil.write(response, resultModel);
    }
%>