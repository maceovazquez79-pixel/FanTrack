"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/button"
import { Input } from "@/input"
import { Label } from "@/label"
import { Card } from "@/card"
import { Music2 } from "lucide-react"

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === "sign-up"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = isSignUp
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (error) {
      setError(isSignUp ? "No se pudo crear la cuenta. Revisa tus datos." : "Correo o contraseña incorrectos.")
      return
    }

    router.push("/")
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Music2 className="size-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">FanTrack</span>
        </Link>

        <Card className="p-6">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground text-balance">
              {isSignUp ? "Crea tu cuenta" : "Bienvenido de nuevo"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 text-pretty">
              {isSignUp
                ? "Empieza a seguir a tus artistas favoritos"
                : "Inicia sesión para ver las novedades de tus artistas"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete={isSignUp ? "new-password" : "current-password"}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Espera..." : isSignUp ? "Crear cuenta" : "Iniciar sesión"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            {isSignUp ? "¿Ya tienes una cuenta? " : "¿No tienes cuenta? "}
            <Link
              href={isSignUp ? "/sign-in" : "/sign-up"}
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              {isSignUp ? "Inicia sesión" : "Regístrate"}
            </Link>
          </p>
        </Card>
      </div>
    </main>
  )
}
