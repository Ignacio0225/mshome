import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { adminApi } from "./api";
import AdminDirectChat from "./components/AdminDirectChat";
import AdminTabs from "./components/AdminTabs";
import NoticeEditor from "./components/NoticeEditor";
import UserTable from "./components/UserTable";
import { useAdminData } from "./hooks/useAdminData";
import type { AdminSection, UserRole } from "./types";
import { canUseAdmin, isSuperAdmin as checkSuperAdmin } from "../../utils/permissions";
import styles from "./Admin.module.css";

export default function Admin() {
  // Admin 페이지는 데이터 로딩/저장 흐름만 담당하고, 표/채팅/공지 폼은 components/admin/*가 담당합니다.
  const { currentUser, users, setUsers, rooms, notices, selectedRoom, setSelectedRoom, loadAdminData } = useAdminData();
  const [chatMessage, setChatMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("members");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const isSuperAdmin = checkSuperAdmin(currentUser);

  useEffect(() => {
    setIsLoading(true);
    loadAdminData()
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "관리자 정보를 불러오지 못했습니다.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function handleRoleChange(userId: number, role: UserRole) {
    setError("");
    setMessage("");

    try {
      const updated = await adminApi.updateUserRole(userId, role);
      setUsers((prev) => prev.map((user) => (user.id === updated.id ? updated : user)));
      setMessage("권한이 변경되었습니다.");
    } catch (roleError) {
      setError(roleError instanceof Error ? roleError.message : "권한 변경에 실패했습니다.");
    }
  }

  async function handleActiveChange(userId: number, isActive: boolean) {
    setError("");
    setMessage("");

    try {
      await adminApi.updateUserActive(userId, isActive);
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, is_active: isActive } : user)));
      setMessage("회원 상태가 변경되었습니다.");
    } catch (activeError) {
      setError(activeError instanceof Error ? activeError.message : "회원 상태 변경에 실패했습니다.");
    }
  }

  async function handleSelectRoom(roomId: number) {
    setError("");
    setMessage("");

    try {
      setSelectedRoom(await adminApi.getDirectChatRoom(roomId));
      setActiveSection("direct");
    } catch (roomError) {
      setError(roomError instanceof Error ? roomError.message : "1:1 문의방을 불러오지 못했습니다.");
    }
  }

  async function handleSendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedRoom) return;
    setError("");
    setMessage("");

    try {
      await adminApi.createDirectChatMessage(selectedRoom.id, chatMessage);
      setChatMessage("");
      await loadAdminData(selectedRoom.id);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "답변 전송에 실패했습니다.");
    }
  }

  async function handleCreateNotice(event: FormEvent<HTMLFormElement>) {
    // 공지사항은 posts API를 category=notice로 호출합니다. 백엔드에서 슈퍼관리자 권한을 다시 확인합니다.
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await adminApi.createNotice({ title: noticeTitle, content: noticeContent });
      setNoticeTitle("");
      setNoticeContent("");
      setMessage("공지사항이 등록되었습니다.");
      await loadAdminData();
      setActiveSection("notices");
    } catch (noticeError) {
      setError(noticeError instanceof Error ? noticeError.message : "공지사항 등록에 실패했습니다.");
    }
  }

  if (!isLoading && !canUseAdmin(currentUser)) {
    return (
      <section className={styles.page}>
        <header className={styles.hero}>
          <p>ADMIN</p>
          <h1>관리자 페이지</h1>
        </header>
        <div className={styles.notice}>
          <strong>관리자 권한이 필요합니다.</strong>
          <Link to="/auth?mode=login">로그인으로 이동</Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p>ADMIN</p>
        <h1>관리자 페이지</h1>
        <span>회원정보, 권한관리, 1:1 문의를 한 곳에서 확인합니다.</span>
      </header>

      <AdminTabs activeSection={activeSection} isSuperAdmin={isSuperAdmin} onChange={setActiveSection} />

      {message && <p className={styles.message}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {isLoading && <div className={styles.notice}>관리자 정보를 불러오는 중입니다.</div>}

      {!isLoading && (activeSection === "members" || activeSection === "roles") && (
        <UserTable
          users={users}
          currentUser={currentUser}
          mode={activeSection}
          isSuperAdmin={isSuperAdmin}
          onRoleChange={handleRoleChange}
          onActiveChange={handleActiveChange}
        />
      )}

      {!isLoading && activeSection === "notices" && isSuperAdmin && (
        <NoticeEditor
          notices={notices}
          title={noticeTitle}
          content={noticeContent}
          onTitleChange={setNoticeTitle}
          onContentChange={setNoticeContent}
          onSubmit={handleCreateNotice}
        />
      )}

      {!isLoading && activeSection === "direct" && (
        <AdminDirectChat
          currentUser={currentUser}
          rooms={rooms}
          selectedRoom={selectedRoom}
          message={chatMessage}
          onMessageChange={setChatMessage}
          onSelectRoom={handleSelectRoom}
          onSendMessage={handleSendMessage}
        />
      )}
    </section>
  );
}
