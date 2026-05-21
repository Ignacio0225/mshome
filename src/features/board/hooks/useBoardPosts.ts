import { useState } from "react";
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

  async function loadPosts(nextPage: number, keyword: string, category: PostCategory) {
    const data = await boardApi.listPosts({ page: nextPage, size: pageSize, q: keyword, category });
    setPageData(data);
    setPage(data.page);
    return data;
  }

  return { page, pageData, setPage, setPageData, loadPosts };
}
