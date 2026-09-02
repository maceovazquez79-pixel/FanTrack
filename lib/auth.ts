import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { pool } from "@/lib/db"

export const auth = betterAuth({
  database: pool,

  baseURL:
    process.env.BETTER_AUTH_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.V0_RUNTIME_URL),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,

    sendResetPassword: async ({ user, url }) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "FanTrack <onboarding@resend.dev>",
          to: [user.email],
          subject: "Restablece tu contraseña de FanTrack",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
              <h2>Restablecer contraseña</h2>
              <p>Hola ${user.name || ""},</p>
              <p>Recibimos una solicitud para restablecer tu contraseña de FanTrack.</p>
              <p>
                <a href="${url}" style="display:inline-block;padding:12px 20px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">
                  Restablecer contraseña
                </a>
              </p>
              <p>Si tú no solicitaste este cambio, puedes ignorar este correo.</p>
            </div>
          `,
        }),
      })

      if (!response.ok) {
        throw new Error("No se pudo enviar el correo de recuperación")
      }
    },
  },

  trustedOrigins: [
    ...(process.env.NODE_ENV === "development"
      ? [
          "http://localhost:3000",
          ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
          "https://*.vusercontent.net",
          "https://*.vercel.run",
          "https://*.v0.build",
        ]
      : []),

    ...(process.env.NODE_ENV === "production"
      ? [
          ...(process.env.VERCEL_URL
            ? [`https://${process.env.VERCEL_URL}`]
            : []),
          ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
            : []),
        ]
      : []),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  ...(process.env.NODE_ENV === "development"
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),

  plugins: [nextCookies()],
})


