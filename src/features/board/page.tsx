import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getStoredUser,
  getToken,
  type Comment,
  type Post,
  type PostCategory,
  type User,
} from "../../api/client";
import { boardApi } from "./api";
import AuthRequiredPanel from "./components/AuthRequiredPanel";
import BoardTabs from "./components/BoardTabs";
import DirectChatSection from "./components/DirectChatSection";
import PostDetail from "./components/PostDetail";
import PostEditor from "./components/PostEditor";
import PostTable from "./components/PostTable";
import { useBoardPosts } from "./hooks/useBoardPosts";
import { useDirectChat } from "./hooks/useDirectChat";
import type { BoardMode, BoardSection } from "./types";
import { roleLabel } from "../../utils/format";
import styles from "./Board.module.css";

const PAGE_SIZE = 10;

export default function Board() {
  const navigate = useNavigate();
  const { postId } = useParams();

  // Board 페이지는 "상태와 API 연결"만 담당하고, 실제 UI 조각은 components/board/*가 담당합니다.
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [activeBoard, setActiveBoard] = useState<BoardSection>("qna");
  const { page, pageData, loadPosts } = useBoardPosts(PAGE_SIZE);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [mode, setMode] = useState<BoardMode>("list");
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const { chatRooms, selectedChatRoom, setSelectedChatRoom, loadChatRooms: fetchChatRooms } = useDirectChat();
  const [chatTitle, setChatTitle] = useState("");
  const [chatFirstMessage, setChatFirstMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const boardTitle = activeBoard === "notice" ? "NOTICE" : activeBoard === "direct" ? "1:1 문의" : "QnA";
  const currentCategory: PostCategory = activeBoard === "notice" ? "notice" : "qna";

  async function loadPost(postId: number) {
    // 상세 글을 열 때 백엔드가 돌려준 category에 맞춰 탭도 같이 맞춥니다.
    const detail = await boardApi.getPost(postId);
    setActiveBoard(detail.category === "notice" ? "notice" : "qna");
    setSelectedPost(detail);
    setMode("detail");
    setEditingCommentId(null);
  }

  async function loadChatRooms(nextRoomId?: number) {
    // 1:1 문의는 백엔드 권한에 따라 일반 사용자는 본인 방, 관리자는 전체 방을 받습니다.
    if (!user) return;
    await fetchChatRooms(nextRoomId);
  }

  useEffect(() => {
    // 로그인하지 않은 사용자는 목록 API를 호출하지 않고 안내 패널만 보여줍니다.
    const syncUser = () => setUser(getStoredUser());
    window.addEventListener("mshome-auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    if (!getToken()) {
      setUser(null);
      setIsLoading(false);
      return () => {
        window.removeEventListener("mshome-auth-change", syncUser);
        window.removeEventListener("storage", syncUser);
      };
    }

    boardApi
      .me()
      .then((me) => setUser(me))
      .catch(() => {
        if (!getToken()) setUser(null);
      });

    if (postId) {
      loadPost(Number(postId))
        .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다."))
        .finally(() => setIsLoading(false));
    } else {
      loadPosts(1, "", currentCategory)
        .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다."))
        .finally(() => setIsLoading(false));
    }

    return () => {
      window.removeEventListener("mshome-auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, [postId, activeBoard]);

  async function handlePageChange(nextPage: number) {
    setError("");
    setMessage("");
    setIsLoading(true);
    try {
      await loadPosts(nextPage, keyword, currentCategory);
      setMode("list");
      setSelectedPost(null);
    } catch (pageError) {
      setError(pageError instanceof Error ? pageError.message : "페이지 이동에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch(nextKeyword: string) {
    setError("");
    setMessage("");
    setKeyword(nextKeyword);
    setIsLoading(true);
    try {
      await loadPosts(1, nextKeyword, currentCategory);
      setMode("list");
      setSelectedPost(null);
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : "검색에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const saved = editingPostId
        ? await boardApi.updatePost(editingPostId, { title, content, is_secret: isSecret })
        : await boardApi.createQnaPost({ title, content, is_secret: isSecret });
      setTitle("");
      setContent("");
      setIsSecret(false);
      setEditingPostId(null);
      setMessage(editingPostId ? "게시글이 수정되었습니다." : "게시글이 등록되었습니다.");
      await loadPosts(editingPostId ? page : 1, keyword, currentCategory);
      navigate(`/board/${saved.id}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "게시글 저장에 실패했습니다.");
    }
  }

  function startWrite() {
    if (!user) return;
    setEditingPostId(null);
    setTitle("");
    setContent("");
    setIsSecret(false);
    setSelectedPost(null);
    setMode("write");
  }

  function startEditPost(post: Post) {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setIsSecret(post.is_secret);
    setMode("write");
  }

  async function handleDeletePost(postId: number) {
    setError("");
    setMessage("");

    try {
      await boardApi.deletePost(postId);
      setSelectedPost(null);
      setMode("list");
      setMessage("게시글이 삭제되었습니다.");
      await loadPosts(page, keyword, currentCategory);
      navigate("/board");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "게시글 삭제에 실패했습니다.");
    }
  }

  async function handleSubmitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPost) return;
    setError("");
    setMessage("");

    try {
      await boardApi.createComment(selectedPost.id, commentContent);
      setCommentContent("");
      setMessage("댓글이 등록되었습니다.");
      await loadPost(selectedPost.id);
      await loadPosts(page, keyword, currentCategory);
    } catch (commentError) {
      setError(commentError instanceof Error ? commentError.message : "댓글 등록에 실패했습니다.");
    }
  }

  async function handleUpdateComment(comment: Comment) {
    if (!selectedPost) return;
    setError("");
    setMessage("");

    try {
      await boardApi.updateComment(selectedPost.id, comment.id, editingCommentContent);
      setEditingCommentId(null);
      setEditingCommentContent("");
      setMessage("댓글이 수정되었습니다.");
      await loadPost(selectedPost.id);
    } catch (commentError) {
      setError(commentError instanceof Error ? commentError.message : "댓글 수정에 실패했습니다.");
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (!selectedPost) return;
    setError("");
    setMessage("");

    try {
      await boardApi.deleteComment(selectedPost.id, commentId);
      setMessage("댓글이 삭제되었습니다.");
      await loadPost(selectedPost.id);
      await loadPosts(page, keyword, currentCategory);
    } catch (commentError) {
      setError(commentError instanceof Error ? commentError.message : "댓글 삭제에 실패했습니다.");
    }
  }

  async function handleBoardChange(nextBoard: BoardSection) {
    setActiveBoard(nextBoard);
    setError("");
    setMessage("");

    if ((nextBoard === "qna" || nextBoard === "notice") && postId) {
      navigate("/board");
    }

    if ((nextBoard === "qna" || nextBoard === "notice") && user) {
      setMode("list");
      setSelectedPost(null);
      setKeyword("");
      setIsLoading(true);
      try {
        await loadPosts(1, "", nextBoard === "notice" ? "notice" : "qna");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "게시글을 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    if (nextBoard === "direct" && user) {
      try {
        await loadChatRooms();
      } catch (chatError) {
        setError(chatError instanceof Error ? chatError.message : "1:1 문의를 불러오지 못했습니다.");
      }
    }
  }

  async function handleCreateChatRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const room = await boardApi.createDirectChatRoom({ title: chatTitle, message: chatFirstMessage });
      setChatTitle("");
      setChatFirstMessage("");
      setMessage("1:1 문의방이 생성되었습니다.");
      await loadChatRooms(room.id);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "1:1 문의방 생성에 실패했습니다.");
    }
  }

  async function handleSelectChatRoom(roomId: number) {
    setError("");
    setMessage("");

    try {
      setSelectedChatRoom(await boardApi.getDirectChatRoom(roomId));
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "1:1 문의방을 불러오지 못했습니다.");
    }
  }

  async function handleSendChatMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedChatRoom) return;
    setError("");
    setMessage("");

    try {
      await boardApi.createDirectChatMessage(selectedChatRoom.id, chatMessage);
      setChatMessage("");
      await loadChatRooms(selectedChatRoom.id);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "메시지 전송에 실패했습니다.");
    }
  }

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <h1>{boardTitle}</h1>
      </header>

      <BoardTabs activeBoard={activeBoard} onChange={handleBoardChange} />

      <div className={styles.userLine}>
        {user ? (
          <span>
            {user.real_name}님 · {roleLabel(user.role)}
          </span>
        ) : (
          <Link to="/auth?mode=login">로그인 후 글과 댓글을 작성할 수 있습니다.</Link>
        )}
      </div>

      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!user && activeBoard !== "direct" && <AuthRequiredPanel mode="posts" />}

      {user && (activeBoard === "qna" || activeBoard === "notice") && !postId && mode === "list" && (
        <PostTable
          board={activeBoard}
          isLoading={isLoading}
          pageData={pageData}
          keyword={keyword}
          user={user}
          onOpenPost={(id) => navigate(`/board/${id}`)}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onWrite={startWrite}
        />
      )}

      {activeBoard === "direct" && (
        <DirectChatSection
          user={user}
          rooms={chatRooms}
          selectedRoom={selectedChatRoom}
          chatTitle={chatTitle}
          chatFirstMessage={chatFirstMessage}
          chatMessage={chatMessage}
          onChatTitleChange={setChatTitle}
          onChatFirstMessageChange={setChatFirstMessage}
          onChatMessageChange={setChatMessage}
          onCreateRoom={handleCreateChatRoom}
          onSelectRoom={handleSelectChatRoom}
          onSendMessage={handleSendChatMessage}
        />
      )}

      {activeBoard === "qna" && mode === "write" && (
        <PostEditor
          isEditing={Boolean(editingPostId)}
          title={title}
          content={content}
          isSecret={isSecret}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSecretChange={setIsSecret}
          onSubmit={handleSubmitPost}
          onCancel={() => {
            setMode(selectedPost ? "detail" : "list");
            if (!selectedPost) navigate("/board");
          }}
        />
      )}

      {user && (activeBoard === "qna" || activeBoard === "notice") && postId && mode === "detail" && selectedPost && (
        <PostDetail
          post={selectedPost}
          user={user}
          commentContent={commentContent}
          editingCommentId={editingCommentId}
          editingCommentContent={editingCommentContent}
          onCommentContentChange={setCommentContent}
          onSubmitComment={handleSubmitComment}
          onEditPost={startEditPost}
          onDeletePost={handleDeletePost}
          onStartEditComment={(comment) => {
            setEditingCommentId(comment.id);
            setEditingCommentContent(comment.content);
          }}
          onEditingCommentContentChange={setEditingCommentContent}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
          onCancelEditComment={() => setEditingCommentId(null)}
          onBackToList={() => navigate("/board")}
        />
      )}
    </section>
  );
}
