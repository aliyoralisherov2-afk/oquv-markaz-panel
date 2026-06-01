import { useState } from "react";
import "./Login.css";

// Hardcoded credentials — App.jsx dagi CREDENTIALS bilan mos bo'lishi kerak
const VALID_LOGIN = "admin";
const VALID_PASSWORD = "admin123";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ msg: "", ok: false });

  const handleSubmit = () => {
    if (loading) return;

    // Bo'sh maydonlar tekshiruvi
    if (!username.trim() || !password.trim()) {
      setStatus({ msg: "Iltimos, barcha maydonlarni to'ldiring.", ok: false });
      return;
    }

    setStatus({ msg: "", ok: false });
    setLoading(true);

    // 1.5 soniyalik spinner simulatsiyasi
    setTimeout(() => {
      if (username.trim() === VALID_LOGIN && password === VALID_PASSWORD) {
        setStatus({ msg: "Muvaffaqiyatli kirildi! Yo'naltirilmoqda...", ok: true });
        setTimeout(() => {
          onLogin();
        }, 600);
      } else {
        setStatus({ msg: "Login yoki parol noto'g'ri. Qayta urinib ko'ring.", ok: false });
        setLoading(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-wrap">
      {/* Orqa fon: suzuvchi sharlar */}
      <div className="bg-orbs" aria-hidden="true">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>

      {/* Orqa fon: grid chiziqlar */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Asosiy karta */}
      <div className="card" role="main">
        {/* Logo va sarlavha */}
        <div className="logo-area">
          <div className="logo-icon" aria-hidden="true">🎓</div>
          <h1 className="logo-title">Pro Panel</h1>
          <p className="logo-sub">O'qituvchilar boshqaruv tizimi</p>
        </div>

        {/* Login input */}
        <div className="form-group">
          <div className="field-wrap">
            <input
              className="login-input"
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="username"
              autoFocus
              aria-label="Login"
            />
            <span className="field-icon" aria-hidden="true">👤</span>
          </div>
        </div>

        {/* Parol input */}
        <div className="form-group">
          <div className="field-wrap">
            <input
              className="login-input"
              type={showPass ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
              aria-label="Parol"
            />
            <span className="field-icon" aria-hidden="true">🔒</span>
            <button
              className="toggle-pass"
              onClick={() => setShowPass((v) => !v)}
              type="button"
              aria-label={showPass ? "Parolni yashirish" : "Parolni ko'rsatish"}
              title={showPass ? "Yashirish" : "Ko'rsatish"}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="forgot">
            <a href="#" onClick={(e) => { e.preventDefault(); setStatus({ msg: "Parolni tiklash uchun admin bilan bog'laning.", ok: false }); }}>
              Parolni unutdingizmi?
            </a>
          </div>
        </div>

        {/* Kirish tugmasi */}
        <button
          className={`btn-kirish${loading ? " loading" : ""}`}
          onClick={handleSubmit}
          type="button"
          aria-label="Tizimga kirish"
          disabled={loading}
        >
          <span className="btn-text">
            <span className="spinner" aria-hidden="true" />
            <span className="btn-label">{loading ? "" : "Kirish"}</span>
          </span>
        </button>

        {/* Status xabari */}
        {status.msg && (
          <p className={`status-msg${status.ok ? " ok" : ""}`} role="alert">
            {status.ok ? "✓ " : "✕ "}{status.msg}
          </p>
        )}

        {/* Ajratuvchi */}
        <div className="divider">
          <span>Xavfsiz kirish</span>
        </div>

        {/* Pastki izoh */}
        <p className="footer-note">
          © 2025 Pro Panel · Barcha huquqlar himoyalangan
        </p>
      </div>
    </div>
  );
}