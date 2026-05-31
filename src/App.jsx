import { useState, useEffect, useRef } from "react";
import './App.css';

const STORAGE_KEY = "teacher_dashboard_v1";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { groups: [], lessons: [] };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const TABS = ["Guruhlar", "Yangi dars", "Davomat", "Tarix"];

const styles = {
  glassCard: {
    background: "rgba(20, 20, 25, 0.65)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    borderRadius: "16px",
  },
  glassInput: {
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#ffffff",
    padding: "10px 14px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  neonButton: {
    background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    border: "none",
    color: "#000000",
    fontWeight: "600",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }
};

// ============================================================
// LOGIN SCREEN KOMPONENTI — To'liq tuzatilgan versiya
// ============================================================
function LoginScreen({ onLogin }) {
  // active=false → Login oynasi ko'rinadi (o'ng panel)
  // active=true  → Register oynasi ko'rinadi (chap panel)
  const [isActive, setIsActive] = useState(false);

  const [username, setUsername]   = useState("");
  const [password, setPassword]   = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 3000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        /* Fon transparentligi - orqadagi koinot ko'rinsin */
        backgroundColor: "transparent",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* ── Asosiy animatsiyali quti ── */}
      <div className={`auth-wrapper ${isActive ? "active" : ""}`}>

        {/* ━━━━━ LOGIN FORMASI (Chap) ━━━━━ */}
        <div className="form-box login">
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            {/* Logo */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #00f2fe, #9b51e0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 14px",
                boxShadow: "0 0 20px rgba(0,242,254,0.4)",
              }}
            >
              <span style={{ fontSize: 22 }}>🎓</span>
            </div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                margin: "0 0 6px",
                background: "linear-gradient(135deg, #fff 0%, #a0d8e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tizimga kirish
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              Pro Panel boshqaruviga xush kelibsiz
            </p>
          </div>

          <form onSubmit={handleLogin} autoComplete="off">
            <div className="input-group">
              <input
                type="text"
                placeholder="Login"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setLoginError(false); }}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                required
              />
            </div>

            {loginError && (
              <p
                style={{
                  color: "#ff6b6b",
                  fontSize: 13,
                  textAlign: "center",
                  marginBottom: 14,
                  padding: "8px 12px",
                  background: "rgba(255,71,87,0.1)",
                  borderRadius: 8,
                  border: "1px solid rgba(255,71,87,0.2)",
                }}
              >
                ⚠️ Login yoki parol noto'g'ri!
              </p>
            )}

            <button type="submit" className="auth-btn">
              Kirish
            </button>
          </form>
        </div>

        {/* ━━━━━ REGISTER FORMASI (O'ng) ━━━━━ */}
        <div className="form-box register">
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 700,
                margin: "0 0 6px",
                background: "linear-gradient(135deg, #fff 0%, #a0d8e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ro'yxatdan o'tish
            </h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>
              Yangii hisob yarating
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <div className="input-group">
              <input type="text" placeholder="Ismingiz" required />
            </div>
            <div className="input-group">
              <input type="email" placeholder="Email manzil" required />
            </div>
            <div className="input-group">
              <input type="password" placeholder="Parol" required />
            </div>
            <button type="submit" className="auth-btn">
              Hisob yaratish
            </button>
          </form>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            TOGGLE BOX — Glassmorphism slayd paneli
            MUAMMO TUZATILDI:
            - toggle-left va toggle-right endi
              position:absolute va to'liq balandlikda
            - overflow matn qirqmaslik uchun
              padding va box-sizing to'g'rilandi
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="toggle-box">

          {/* Chap panel: Register holatida ko'rinadi */}
          <div className="toggle-panel toggle-left">
            <h2>Xush kelibsiz!</h2>
            <p>
              Profilingiz bormi? Unda tizimga kiring
              va ishlashda davom eting.
            </p>
            <button
              className="toggle-btn"
              onClick={() => setIsActive(false)}
            >
              Kirish
            </button>
          </div>

          {/* O'ng panel: Login holatida ko'rinadi */}
          <div className="toggle-panel toggle-right">
            <h2>Salom, Do'stim!</h2>
            <p>
              Hali hisobingiz yo'qmi?
              Hoziroq ro'yxatdan o'ting va
              barcha imkoniyatlardan foydalaning.
            </p>
            <button
              className="toggle-btn"
              onClick={() => setIsActive(true)}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

        </div>
        {/* ━━━━━ toggle-box TUGADI ━━━━━ */}

      </div>
      {/* auth-wrapper tugadi */}
    </div>
  );
}

// ============================================================
// ASOSIY APP KOMPONENTI
// ============================================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [data, setData]                     = useState(loadData);
  const [tab, setTab]                       = useState(0);
  const [selectedGroup, setSelectedGroup]   = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [historyLesson, setHistoryLesson]   = useState(null);
  const canvasRef                           = useRef(null);

  useEffect(() => saveData(data), [data]);

  /* ── Koinot zarrachalari animatsiyasi ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width  = (canvas.width  = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width  = canvas.width  = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const numParticles = Math.min(100, Math.floor((width * height) / 15000));
    const particles    = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x:      Math.random() * width,
        y:      Math.random() * height,
        z:      Math.random() * width,
        radius: Math.random() * 1.8 + 0.5,
        color:  Math.random() > 0.5
          ? "rgba(0, 242, 254, "
          : "rgba(155, 81, 224, ",
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.z -= p.speed * 2;
        if (p.z <= 0) {
          p.z = width;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

        const k   = 400 / p.z;
        const px  = (p.x - width / 2) * k + width / 2;
        const py  = (p.y - height / 2) * k + height / 2;
        const size = p.radius * k * 1.5;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (1 - p.z / width) * 0.8);
          ctx.beginPath();
          ctx.arc(px, py, Math.abs(size), 0, Math.PI * 2);
          ctx.fillStyle  = `${p.color}${alpha})`;
          ctx.shadowBlur  = size * 2;
          ctx.shadowColor = p.color.includes("242") ? "#00f2fe" : "#9b51e0";
          ctx.fill();
        }
      });
      ctx.shadowBlur     = 0;
      animationFrameId   = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const updateData = (fn) =>
    setData((d) => {
      const copy = {
        groups:  d.groups.map((g) => ({ ...g, students: [...g.students] })),
        lessons: d.lessons.map((l) => ({ ...l, attendance: { ...l.attendance } })),
      };
      fn(copy);
      return copy;
    });

  return (
    <div
      style={{
        minHeight:   "100vh",
        backgroundColor: "#000000",
        color:       "#ffffff",
        fontFamily:  "'Segoe UI', system-ui, sans-serif",
        position:    "relative",
        overflowX:   "hidden",
      }}
    >
      <style>{`
        input, select, button { font-family: inherit; }
        input:focus, select:focus {
          border-color: #00f2fe !important;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.3) !important;
        }
        select option { background-color: #141419; color: #fff; }
        input::placeholder { color: rgba(255,255,255,0.3) !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 242, 254, 0.4); }
      `}</style>

      {/* Orqa fon koinot animatsiyasi — har doim ko'rinib turadi */}
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          width:         "100vw",
          height:        "100vh",
          zIndex:        0,
          pointerEvents: "none",
        }}
      />

      {/* ── Avtorizatsiya tekshiruvi ── */}
      {!isAuthenticated ? (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ── Header ── */}
          <header
            style={{
              background:           "rgba(10, 10, 12, 0.7)",
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom:         "1px solid rgba(255, 255, 255, 0.08)",
              padding:              "0 1rem",
              position:             "sticky",
              top:                  0,
              zIndex:               10,
            }}
          >
            <div
              style={{
                maxWidth:       900,
                margin:         "0 auto",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                height:         64,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    background:   "linear-gradient(135deg, #00f2fe, #9b51e0)",
                    borderRadius: "10px",
                    width:        "32px",
                    height:       "32px",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    boxShadow:    "0 0 15px rgba(0,242,254,0.4)",
                  }}
                >
                  <i className="ti ti-school" style={{ fontSize: 18, color: "#000000" }} aria-hidden="true" />
                </div>
                <span
                  style={{
                    fontWeight:             600,
                    fontSize:               18,
                    letterSpacing:          "0.5px",
                    background:             "linear-gradient(to right, #ffffff, #a0aec0)",
                    WebkitBackgroundClip:   "text",
                    WebkitTextFillColor:    "transparent",
                  }}
                >
                  Pro Panel
                </span>
              </div>

              <nav
                style={{
                  display:      "flex",
                  gap:          4,
                  background:   "rgba(255,255,255,0.03)",
                  padding:      "4px",
                  borderRadius: "10px",
                  border:       "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {TABS.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => { setTab(i); setHistoryLesson(null); }}
                    style={{
                      padding:     "6px 14px",
                      fontSize:    13,
                      fontWeight:  tab === i ? 600 : 400,
                      borderRadius: "8px",
                      border:      "none",
                      cursor:      "pointer",
                      background:  tab === i ? "rgba(0, 242, 254, 0.15)" : "transparent",
                      color:       tab === i ? "#00f2fe" : "rgba(255,255,255,0.6)",
                      textShadow:  tab === i ? "0 0 10px rgba(0,242,254,0.5)" : "none",
                      transition:  "all 0.2s",
                      display:     "flex",
                      alignItems:  "center",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </nav>
            </div>
          </header>

          {/* ── Asosiy kontent ── */}
          <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
            {tab === 0 && <GroupsTab data={data} updateData={updateData} />}
            {tab === 1 && (
              <NewLessonTab
                data={data}
                updateData={updateData}
                onCreated={() => setTab(2)}
                setSelectedGroup={setSelectedGroup}
                setSelectedLesson={setSelectedLesson}
              />
            )}
            {tab === 2 && (
              <AttendanceTab
                data={data}
                updateData={updateData}
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                selectedLesson={selectedLesson}
                setSelectedLesson={setSelectedLesson}
              />
            )}
            {tab === 3 && (
              <HistoryTab
                data={data}
                historyLesson={historyLesson}
                setHistoryLesson={setHistoryLesson}
              />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

// ============================================================
// QOLGAN KOMPONENTLAR — O'ZGARISHSIZ
// ============================================================

function GroupsTab({ data, updateData }) {
  const [newGroupName,     setNewGroupName]     = useState("");
  const [expandedGroup,    setExpandedGroup]    = useState(null);
  const [newStudentFirst,  setNewStudentFirst]  = useState("");
  const [newStudentLast,   setNewStudentLast]   = useState("");

  const addGroup = () => {
    const name = newGroupName.trim();
    if (!name) return;
    updateData((d) => d.groups.push({ id: Date.now(), name, students: [] }));
    setNewGroupName("");
  };

  const addStudent = (groupId) => {
    const f = newStudentFirst.trim();
    const l = newStudentLast.trim();
    if (!f || !l) return;
    updateData((d) => {
      const g = d.groups.find((g) => g.id === groupId);
      if (g) g.students.push({ id: Date.now(), firstName: f, lastName: l });
    });
    setNewStudentFirst("");
    setNewStudentLast("");
  };

  const removeStudent = (groupId, studentId) => {
    updateData((d) => {
      const g = d.groups.find((g) => g.id === groupId);
      if (g) g.students = g.students.filter((s) => s.id !== studentId);
    });
  };

  const removeGroup = (groupId) => {
    updateData((d) => { d.groups = d.groups.filter((g) => g.id !== groupId); });
    if (expandedGroup === groupId) setExpandedGroup(null);
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.5px" }}>
        Guruhlar boshqaruvi
      </h2>

      <div style={{ ...styles.glassCard, padding: "1.25rem", marginBottom: "1.5rem" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 10, fontWeight: 500 }}>
          Yangi guruh qo'shish
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addGroup()}
            placeholder="Guruh nomi (masalan: 1-guruh)"
            style={{ ...styles.glassInput, flex: 1, fontSize: 14 }}
          />
          <button onClick={addGroup} style={{ ...styles.neonButton, padding: "0 20px", fontSize: 13 }}>
            <i className="ti ti-plus" aria-hidden="true" style={{ marginRight: "4px" }} /> Qo'shish
          </button>
        </div>
      </div>

      {data.groups.length === 0 && (
        <div style={{ ...styles.glassCard, textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          <i className="ti ti-users" style={{ fontSize: 44, display: "block", marginBottom: 12, color: "#9b51e0" }} aria-hidden="true" />
          Tizimda hali guruhlar mavjud emas.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {data.groups.map((g) => (
          <div key={g.id} style={{ ...styles.glassCard, overflow: "hidden", transition: "all 0.3s" }}>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", cursor: "pointer" }}
              onClick={() => setExpandedGroup(expandedGroup === g.id ? null : g.id)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <i className="ti ti-users-group" style={{ fontSize: 20, color: "#00f2fe" }} aria-hidden="true" />
                <span style={{ fontWeight: 600, fontSize: 16 }}>{g.name}</span>
                <span style={{ fontSize: 12, color: "#9b51e0", background: "rgba(155, 81, 224, 0.12)", border: "1px solid rgba(155, 81, 224, 0.2)", padding: "2px 10px", borderRadius: "20px", fontWeight: 500 }}>
                  {g.students.length} o'quvchi
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); removeGroup(g.id); }}
                  style={{ padding: "6px 10px", fontSize: 12, color: "#ff4757", border: "1px solid rgba(255, 71, 87, 0.3)", borderRadius: "6px", background: "rgba(255, 71, 87, 0.05)", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 71, 87, 0.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 71, 87, 0.05)"}
                >
                  <i className="ti ti-trash" aria-hidden="true" />
                </button>
                <i className={`ti ti-chevron-${expandedGroup === g.id ? "up" : "down"}`} style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
              </div>
            </div>

            {expandedGroup === g.id && (
              <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "16px 20px", background: "rgba(0,0,0,0.2)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 14 }}>
                  <input value={newStudentFirst} onChange={(e) => setNewStudentFirst(e.target.value)} placeholder="Ism" style={{ ...styles.glassInput, fontSize: 13 }} />
                  <input value={newStudentLast} onChange={(e) => setNewStudentLast(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addStudent(g.id)} placeholder="Familiya" style={{ ...styles.glassInput, fontSize: 13 }} />
                  <button
                    onClick={() => addStudent(g.id)}
                    disabled={!newStudentFirst.trim() || !newStudentLast.trim()}
                    style={{ ...styles.neonButton, padding: "0 18px", fontSize: 13, background: (!newStudentFirst.trim() || !newStudentLast.trim()) ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #9b51e0 0%, #7f00ff 100%)", color: "#fff", cursor: (!newStudentFirst.trim() || !newStudentLast.trim()) ? "not-allowed" : "pointer" }}
                  >
                    <i className="ti ti-plus" aria-hidden="true" /> Qo'shish
                  </button>
                </div>
                {g.students.length === 0 ? (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "1.5rem 0" }}>O'quvchilar ro'yxati bo'sh</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {g.students.map((s, i) => (
                      <div key={s.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                        <span style={{ fontSize: 14 }}>
                          <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 8, fontSize: 12 }}>{i + 1}.</span>
                          {s.firstName} {s.lastName}
                        </span>
                        <button
                          onClick={() => removeStudent(g.id, s.id)}
                          style={{ padding: "4px 8px", fontSize: 12, color: "rgba(255,255,255,0.4)", border: "none", background: "none", cursor: "pointer", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = "#ff4757"}
                          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                        >
                          <i className="ti ti-x" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function NewLessonTab({ data, updateData, onCreated, setSelectedGroup, setSelectedLesson }) {
  const [groupId, setGroupId] = useState("");
  const [date,    setDate]    = useState(new Date().toISOString().slice(0, 10));
  const [topic,   setTopic]   = useState("");

  const create = () => {
    if (!groupId || !date || !topic.trim()) return;
    const lesson = { id: Date.now(), groupId: Number(groupId), date, topic: topic.trim(), attendance: {} };
    updateData((d) => d.lessons.push(lesson));
    setSelectedGroup(Number(groupId));
    setSelectedLesson(lesson.id);
    setTopic("");
    onCreated();
  };

  const isDisabled = !groupId || !date || !topic.trim();

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Yangi dars kiritish</h2>
      <div style={{ ...styles.glassCard, padding: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Guruhni tanlang</span>
            <select value={groupId} onChange={(e) => setGroupId(e.target.value)} style={{ ...styles.glassInput, fontSize: 14, cursor: "pointer" }}>
              <option value="">— Guruh —</option>
              {data.groups.map((g) => (
                <option key={g.id} value={g.id}>{g.name} ({g.students.length} o'quvchi)</option>
              ))}
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Dars sanasi</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ ...styles.glassInput, fontSize: 14 }} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Mavzu nomi</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && create()}
              placeholder="Masalan: JavaScript asoslari yoki Obyektlar"
              style={{ ...styles.glassInput, fontSize: 14 }}
            />
          </label>
          <button
            onClick={create}
            disabled={isDisabled}
            style={{
              ...styles.neonButton,
              padding:    "12px 20px",
              fontSize:   14,
              background: isDisabled ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
              color:      isDisabled ? "rgba(255,255,255,0.2)" : "#000000",
              border:     isDisabled ? "1px solid rgba(255,255,255,0.05)" : "none",
              boxShadow:  isDisabled ? "none" : "0 0 20px rgba(0, 242, 254, 0.4)",
              cursor:     isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <i className="ti ti-calendar-plus" aria-hidden="true" style={{ marginRight: 6 }} /> Davomatga o'tish
          </button>
        </div>
      </div>
    </div>
  );
}

function AttendanceTab({ data, updateData, selectedGroup, setSelectedGroup, selectedLesson, setSelectedLesson }) {
  const group        = data.groups.find((g) => g.id === selectedGroup);
  const lesson       = data.lessons.find((l) => l.id === selectedLesson);
  const groupLessons = data.lessons.filter((l) => l.groupId === selectedGroup);

  const setAttendance = (studentId, field, value) => {
    if ((field === "homework" || field === "classwork") && value !== "") {
      const num = Number(value);
      if (num < 0 || num > 10) return;
    }
    updateData((d) => {
      const l = d.lessons.find((l) => l.id === selectedLesson);
      if (!l) return;
      if (!l.attendance[studentId]) l.attendance[studentId] = { present: null, homework: "", classwork: "" };
      l.attendance[studentId][field] = value;
    });
  };

  const getAtt = (studentId) => lesson?.attendance?.[studentId] || { present: null, homework: "", classwork: "" };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Davomat va baholash</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: "1.5rem" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Guruh</span>
          <select value={selectedGroup || ""} onChange={(e) => { setSelectedGroup(Number(e.target.value)); setSelectedLesson(null); }} style={{ ...styles.glassInput, fontSize: 14 }}>
            <option value="">— Guruhni tanlang —</option>
            {data.groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Dars</span>
          <select value={selectedLesson || ""} onChange={(e) => setSelectedLesson(Number(e.target.value))} style={{ ...styles.glassInput, fontSize: 14 }} disabled={!selectedGroup}>
            <option value="">— Darsni tanlang —</option>
            {groupLessons.map((l) => <option key={l.id} value={l.id}>{l.date} — {l.topic}</option>)}
          </select>
        </label>
      </div>

      {!group || !lesson ? (
        <div style={{ ...styles.glassCard, textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          <i className="ti ti-clipboard-list" style={{ fontSize: 44, display: "block", marginBottom: 12, color: "#00f2fe" }} aria-hidden="true" />
          Iltimos, yuqoridan guruh va darsni tanlang
        </div>
      ) : group.students.length === 0 ? (
        <div style={{ ...styles.glassCard, textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.4)" }}>Bu guruhda o'quvchilar yo'q</div>
      ) : (
        <div style={{ ...styles.glassCard, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            <span>O'quvchi</span>
            <span style={{ textAlign: "center" }}>Davomat</span>
            <span style={{ textAlign: "center" }}>Vazifa (0-10)</span>
            <span style={{ textAlign: "center" }}>Dars (0-10)</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {group.students.map((s, i) => {
              const att = getAtt(s.id);
              return (
                <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", gap: 10, padding: "12px 16px", alignItems: "center", borderBottom: i < group.students.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none", background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 8, fontSize: 12 }}>{i + 1}.</span>
                    {s.firstName} {s.lastName}
                  </span>
                  <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                    <button onClick={() => setAttendance(s.id, "present", true)} style={{ fontSize: 11, padding: "5px 10px", background: att.present === true ? "rgba(46, 213, 115, 0.15)" : "transparent", color: att.present === true ? "#2ed573" : "rgba(255,255,255,0.4)", border: `1px solid ${att.present === true ? "#2ed573" : "rgba(255,255,255,0.1)"}`, borderRadius: "6px", cursor: "pointer", fontWeight: 600, transition: "all 0.15s" }}>
                      Keldi
                    </button>
                    <button onClick={() => setAttendance(s.id, "present", false)} style={{ fontSize: 11, padding: "5px 10px", background: att.present === false ? "rgba(255, 71, 87, 0.15)" : "transparent", color: att.present === false ? "#ff4757" : "rgba(255,255,255,0.4)", border: `1px solid ${att.present === false ? "#ff4757" : "rgba(255,255,255,0.1)"}`, borderRadius: "6px", cursor: "pointer", fontWeight: 600, transition: "all 0.15s" }}>
                      Kelmadi
                    </button>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type="number" min="0" max="10" value={att.homework} onChange={(e) => setAttendance(s.id, "homework", e.target.value)} placeholder="—" style={{ ...styles.glassInput, width: 56, textAlign: "center", fontSize: 14, padding: "6px" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <input type="number" min="0" max="10" value={att.classwork} onChange={(e) => setAttendance(s.id, "classwork", e.target.value)} placeholder="—" style={{ ...styles.glassInput, width: 56, textAlign: "center", fontSize: 14, padding: "6px" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", display: "flex", gap: 20, fontSize: 13, color: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.2)" }}>
            {(() => {
              const vals   = group.students.map((s) => getAtt(s.id));
              const came   = vals.filter((v) => v.present === true).length;
              const absent = vals.filter((v) => v.present === false).length;
              return (
                <>
                  <span>✓ Keldi:   <strong style={{ color: "#2ed573" }}>{came}</strong></span>
                  <span>✗ Kelmadi: <strong style={{ color: "#ff4757" }}>{absent}</strong></span>
                  <span>— Qoldi:   <strong style={{ color: "#00f2fe" }}>{group.students.length - came - absent}</strong></span>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab({ data, historyLesson, setHistoryLesson }) {
  if (historyLesson) {
    const lesson = data.lessons.find((l) => l.id === historyLesson);
    const group  = lesson ? data.groups.find((g) => g.id === lesson.groupId) : null;
    return (
      <div>
        <button onClick={() => setHistoryLesson(null)} style={{ fontSize: 13, marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 6, color: "#00f2fe", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 500 }}>
          <i className="ti ti-arrow-left" aria-hidden="true" /> Tarixga qaytish
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{lesson?.topic}</h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
          {lesson?.date} · <span style={{ color: "#9b51e0" }}>{group?.name}</span>
        </p>
        {!group || group.students.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Tarixiy ma'lumotlar mavjud emas</p>
        ) : (
          <div style={{ ...styles.glassCard, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              <span>O'quvchi</span><span style={{ textAlign: "center" }}>Davomat</span><span style={{ textAlign: "center" }}>Vazifa</span><span style={{ textAlign: "center" }}>Ishtirok</span>
            </div>
            {group.students.map((s, i) => {
              const att = lesson.attendance?.[s.id] || {};
              return (
                <div key={s.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 10, padding: "12px 16px", alignItems: "center", borderBottom: i < group.students.length - 1 ? "1px solid rgba(255, 255, 255, 0.05)" : "none", background: i % 2 === 1 ? "rgba(255,255,255,0.01)" : "transparent" }}>
                  <span style={{ fontSize: 14 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", marginRight: 8, fontSize: 12 }}>{i + 1}.</span>
                    {s.firstName} {s.lastName}
                  </span>
                  <div style={{ textAlign: "center" }}>
                    {att.present === true  ? <span style={{ fontSize: 12, padding: "4px 10px", background: "rgba(46, 213, 115, 0.15)", color: "#2ed573",  borderRadius: "6px", fontWeight: 500 }}>Keldi</span>
                    : att.present === false ? <span style={{ fontSize: 12, padding: "4px 10px", background: "rgba(255, 71, 87, 0.15)",  color: "#ff4757",  borderRadius: "6px", fontWeight: 500 }}>Kelmadi</span>
                    : <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>—</span>}
                  </div>
                  <div style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "#00f2fe" }}>{att.homework  || "—"}</div>
                  <div style={{ textAlign: "center", fontSize: 14, fontWeight: "500", color: "#9b51e0" }}>{att.classwork || "—"}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const grouped = {};
  data.lessons.forEach((l) => {
    if (!grouped[l.groupId]) grouped[l.groupId] = [];
    grouped[l.groupId].push(l);
  });

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.5px" }}>Darslar tarixi</h2>
      {data.lessons.length === 0 ? (
        <div style={{ ...styles.glassCard, textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          <i className="ti ti-history" style={{ fontSize: 44, display: "block", marginBottom: 12, color: "#9b51e0" }} aria-hidden="true" />
          Hali darslar o'tilmagan
        </div>
      ) : Object.entries(grouped).map(([groupId, lessons]) => {
        const currentGroup = data.groups.find((g) => g.id === Number(groupId));
        const groupName    = currentGroup ? currentGroup.name : "Noma'lum guruh";
        return (
          <div key={groupId} style={{ marginBottom: "2rem" }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#00f2fe", marginBottom: 10, letterSpacing: "0.5px", textTransform: "uppercase" }}>{groupName}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...lessons].sort((a, b) => b.date.localeCompare(a.date)).map((l) => {
                const total = currentGroup?.students.length || 0;
                const came  = Object.values(l.attendance || {}).filter((a) => a.present === true).length;
                return (
                  <div
                    key={l.id}
                    onClick={() => setHistoryLesson(l.id)}
                    style={{ ...styles.glassCard, padding: "14px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.2s ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0, 242, 254, 0.4)"; e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.currentTarget.style.background = "rgba(20, 20, 25, 0.65)"; }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "#ffffff" }}>{l.topic}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{l.date} • {came}/{total} kelgan</p>
                    </div>
                    <i className="ti ti-chevron-right" style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}