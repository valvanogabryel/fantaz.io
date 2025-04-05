"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { DangerZoneButton } from "../ui/dangerous-button"

export function AccountSettings() {
  const [formData, setFormData] = useState({
    username: "MestreDungeon",
    email: "mestre@dndcompendium.com",
    displayName: "Mestre",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Salvando dados:", formData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informações da Conta</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Atualize suas informações pessoais e como você aparece para outros usuários.
        </p>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <Avatar className="w-32 h-32 border-2">
            <AvatarImage src="/placeholder.svg?height=128&width=128" />
            <AvatarFallback className="text-2xl">FZ</AvatarFallback>
          </Avatar>

          <Button variant="outline" size="sm" className="mt-4">
            <Upload className="mr-2 h-4 w-4" />
            Alterar Avatar
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de Usuário</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">Este é seu identificador único no sistema.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Nome de Exibição</Label>
              <Input
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
              />
              <p className="text-xs text-muted-foreground">Este é o nome que será exibido para outros jogadores.</p>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" variant="default" className="cursor-pointer active:shadow-none active:translate-y-0.5">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Segurança da Conta</h3>
        <div className="mt-4 space-y-4">
          <Button variant="outline">
            Alterar Senha
          </Button>
          <Button variant="outline" className="ml-2">
            Ativar Autenticação em Dois Fatores
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium text-red-500">Zona de Perigo</h3>
        <p className="text-sm text-muted-foreground mt-1">Ações permanentes que afetam sua conta.</p>
        <div className="mt-4">
          <DangerZoneButton text="Excluir conta"/>
        </div>
      </div>
    </div>
  )
}

