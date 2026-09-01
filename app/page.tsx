import Link from "next/link"

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #312e81 50%, #7c3aed 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "76px",
            height: "76px",
            margin: "0 auto 24px",
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.15)",
            fontSize: "36px",
          }}
        >
          🎵
        </div>

        <h1
          style={{
            margin: "0 0 12px",
            fontSize: "48px",
            fontWeight: 800,
          }}
        >
          FanTrack
        </h1>

        <p
          style={{
            margin: "0 auto 36px",
            maxWidth: "390px",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Todo lo que pasa con tus artistas favoritos, en un solo lugar.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <Link
            href="/sign-up"
            style={{
              display: "block",
              padding: "16px",
              borderRadius: "14px",
              background: "white",
              color: "#312e81",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Crear cuenta
          </Link>

          <Link
            href="/sign-in"
            style={{
              display: "block",
              padding: "16px",
              border: "1px solid rgba(255,255,255,0.35)",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Iniciar sesión
          </Link>
        </div>

        <p
          style={{
            marginTop: "28px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Descubre. Sigue. No te pierdas nada.
        </p>
      </div>
    </main>
  )
}
