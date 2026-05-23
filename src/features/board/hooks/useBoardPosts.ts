import { useCallback, useState } from "react";
import type { PageData, PostCategory, PostListItem } from "../types";
import { boardApi } from "../api";

const EMPTY_PAGE: PageData<PostListItem> = {
  items: [],
  total: 0,
  page: 1,
  size: 10,
  total_pages: 1,
};

// NOTICE/QnA 목록과 상세 게시글 API 호출을 담당합니다.
export function useBoardPosts(pageSize: number) {
  const [pageData, setPageData] = useState<PageData<PostListItem>>({ ...EMPTY_PAGE, size: pageSize });
  const [page, setPage] = useState(1);

  const resetPosts = useCallback(() => {
    setPageData({ ...EMPTY_PAGE, size: pageSize });
    setPage(1);
  }, [pageSize]);

  const loadPosts = useCallback(async (nextPage: number, keyword: string, category: PostCategory) => {
    const data = await boardApi.listPosts({ page: nextPage, size: pageSize, q: keyword, category });
    const filteredItems = data.items.filter((post) => post.category === category);
    const safeData = filteredItems.length === data.items.length ? data : { ...data, items: filteredItems, total: filteredItems.length };
    setPageData(safeData);
    setPage(safeData.page);
    return safeData;
  }, [pageSize]);

  return { page, pageData, setPage, setPageData, resetPosts, loadPosts };
}
