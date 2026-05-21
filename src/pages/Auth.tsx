import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, saveAuth } from "../api/client";
import styles from "./Auth.module.css";

type Mode = "login" | "signup";

export default function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [realName, setRealName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignupEmailVerified = Boolean(emailVerificationToken);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const auth = await api.login(email, password);
      saveAuth(auth);
      navigate("/board");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSendSignupEmail() {
    setIsSubmitting(true);
    setError("");
    setMessage("");
    setEmailVerificationToken("");

    try {
      const response = await api.requestSignupVerification(email);
      setMessage(response.message);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "인증메일 발송에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmSignupEmail() {
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await api.confirmSignupVerification(email, verificationCode);
      setEmailVerificationToken(response.email_verification_token);
      setMessage(response.message);
    } catch (confirmError) {
      setError(confirmError instanceof Error ? confirmError.message : "이메일 인증에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await api.signup({
        email,
        password,
        real_name: realName,
        phone,
        company_name: companyName || null,
        email_verification_token: emailVerificationToken,
      });
      setMessage(response.message);
      setMode("login");
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function switchMode(nextMode: Mode) {
    setMode(nextMode);
    setMessage("");
    setError("");
  }

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p>MEMBER ACCESS</p>
        <h1>회원 로그인</h1>
        <span>회원가입은 이메일 인증을 먼저 완료한 뒤 진행됩니다.</span>
      </header>

      <div className={styles.panel}>
        <div className={styles.tabs} aria-label="회원 메뉴">
          <button className={mode === "login" ? styles.activeTab : ""} onClick={() => switchMode("login")}>
            로그인
          </button>
          <button className={mode === "signup" ? styles.activeTab : ""} onClick={() => switchMode("signup")}>
            회원가입
          </button>
        </div>

        {message && <p className={styles.message}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        {mode === "login" && (
          <form className={styles.form} onSubmit={handleLogin}>
            <label>
              이메일
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
            </label>
            <label>
              비밀번호
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                minLength={8}
                required
              />
            </label>
            <button className={styles.primaryButton} disabled={isSubmitting}>
              로그인
            </button>
          </form>
        )}

        {mode === "signup" && (
          <form className={styles.form} onSubmit={handleSignup}>
            <label>
              이메일
              <div className={styles.inlineControl}>
                <input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setEmailVerificationToken("");
                  }}
                  type="email"
                  required
                />
                <button type="button" onClick={handleSendSignupEmail} disabled={isSubmitting || !email}>
                  인증메일 보내기
                </button>
              </div>
            </label>
            <label>
              인증번호
              <div className={styles.inlineControl}>
                <input
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value)}
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6자리"
                  required
                />
                <button type="button" onClick={handleConfirmSignupEmail} disabled={isSubmitting || !email || verificationCode.length !== 6}>
                  인증 확인
                </button>
              </div>
            </label>
            <label>
              실명
              <input value={realName} onChange={(event) => setRealName(event.target.value)} minLength={2} required />
            </label>
            <label>
              전화번호
              <input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" minLength={7} required />
            </label>
            <label>
              업체명
              <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="선택 입력" />
            </label>
            <label>
              비밀번호
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                minLength={8}
                required
              />
            </label>
            <button className={styles.primaryButton} disabled={isSubmitting || !isSignupEmailVerified}>
              회원가입
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
