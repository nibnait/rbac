package com.wfb.rbac.common.page;

/**
 * 分页信息辅助类
 */
public class PageUtil {

    public static PageModel createPage(int everyPage, int totalCount, int currentPage) {
        everyPage = getEveryPage(everyPage);
        currentPage = getCurrentPage(currentPage);
        int totalPage = getTotalPage(everyPage, totalCount);
        int beginIndex = getBeginIndex(everyPage, currentPage);
        boolean hasPrePage = getHasPrePage(currentPage);
        boolean hasNextPage = getHasNextPage(totalPage, currentPage);
        return new PageModel(everyPage, totalCount, totalPage, currentPage, beginIndex, hasPrePage, hasNextPage);
    }

    public static PageModel createPage(PageModel page, int totalCount) {
        int everyPage = getEveryPage(page.getEveryPage());
        int currentPage = getCurrentPage(page.getCurrentPage());
        int totalPage = getTotalPage(everyPage, totalCount);
        int beginIndex = getBeginIndex(everyPage, currentPage);
        boolean hasPrePage = getHasPrePage(currentPage);
        boolean hasNextPage = getHasNextPage(totalPage, currentPage);
        return new PageModel(everyPage, totalCount, totalPage, currentPage, beginIndex, hasPrePage, hasNextPage);
    }

    /**
     * 设置每页显示记录数
     *
     * @param everyPage int
     *
     * @return int
     */
    public static int getEveryPage(int everyPage) {
        return everyPage == 0 ? 10 : everyPage;
    }

    /**
     * 设置当前页
     *
     * @param currentPage int
     *
     * @return int
     */
    public static int getCurrentPage(int currentPage) {
        return currentPage == 0 ? 1 : currentPage;
    }

    /**
     * 设置总页数,需要总记录数，每页显示多少
     *
     * @param everyPage  int
     * @param totalCount int
     *
     * @return int
     */
    public static int getTotalPage(int everyPage, int totalCount) {
        int totalPage;
        if (totalCount % everyPage == 0) {
            totalPage = totalCount / everyPage;
        } else {
            totalPage = totalCount / everyPage + 1;
        }
        return totalPage;
    }

    /**
     * 设置起始点，需要每页显示多少，当前页
     *
     * @param everyPage   int
     * @param currentPage int
     *
     * @return int
     */
    public static int getBeginIndex(int everyPage, int currentPage) {
        return (currentPage - 1) * everyPage;
    }

    /**
     * 设置是否有上一页，需要当前页
     *
     * @param currentPage int
     *
     * @return boolean
     */
    public static boolean getHasPrePage(int currentPage) {
        return currentPage != 1;
    }

    /**
     * 设置是否有下一个，需要总页数和当前页
     *
     * @param totalPage   int
     * @param currentPage int
     *
     * @return boolean
     */
    public static boolean getHasNextPage(int totalPage, int currentPage) {
        return !(currentPage >= totalPage || totalPage == 0);
    }
}

