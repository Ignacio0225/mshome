import type { User, UserRole } from "../../../api/client";
import { roleLabel } from "../../../utils/format";
import styles from "../Admin.module.css";

type UserTableProps = {
  users: User[];
  currentUser: User | null;
  mode: "members" | "roles";
  isSuperAdmin: boolean;
  onRoleChange: (userId: number, role: UserRole) => void;
  onActiveChange: (userId: number, isActive: boolean) => void;
};

// 회원정보 확인과 권한관리가 함께 쓰는 테이블입니다.
// role/active 변경 버튼은 슈퍼관리자에게만 열립니다.
export default function UserTable({ users, currentUser, mode, isSuperAdmin, onRoleChange, onActiveChange }: UserTableProps) {
  return (
    <div className={styles.tableShell}>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>전화번호</th>
            <th>업체명</th>
            <th>권한</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.real_name}</td>
              <td>{user.email}</td>
              <td>{user.phone || "-"}</td>
              <td>{user.company_name || "-"}</td>
              <td>
                {mode === "roles" && isSuperAdmin && user.role !== "super_admin" ? (
                  <select value={user.role} onChange={(event) => onRoleChange(user.id, event.target.value as UserRole)}>
                    <option value="user">일반 사용자</option>
                    <option value="admin">관리자</option>
                  </select>
                ) : (
                  roleLabel(user.role)
                )}
              </td>
              <td>
                {mode === "roles" && isSuperAdmin && user.id !== currentUser?.id ? (
                  <button className={styles.stateButton} onClick={() => onActiveChange(user.id, !user.is_active)}>
                    {user.is_active ? "활성" : "비활성"}
                  </button>
                ) : user.is_active ? (
                  "활성"
                ) : (
                  "비활성"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {mode === "roles" && !isSuperAdmin && <p className={styles.hint}>권한 변경은 슈퍼 관리자만 사용할 수 있습니다.</p>}
    </div>
  );
}
