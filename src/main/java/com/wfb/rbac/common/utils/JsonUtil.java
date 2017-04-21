package com.wfb.rbac.common.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * JsonUtil
 */
public class JsonUtil {

    private static final GsonBuilder BUILDER = new GsonBuilder().serializeNulls();
    private static final Gson GSON = BUILDER.create();

    static {
        BUILDER.serializeNulls();
    }

    public static Gson getGson() {
        return GSON;
    }

    public static GsonBuilder getBuilder() {
        return BUILDER;
    }

    public static String toJson(Object obj) {
        return GSON.toJson(obj);
    }

}
