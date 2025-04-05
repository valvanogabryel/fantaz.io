"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadIcon } from "lucide-react"

export function PrivacySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações de Privacidade</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Controle quem pode ver suas informações e como seus dados são utilizados.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Visibilidade do Perfil</h4>

        <RadioGroup defaultValue="friends">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <div>
                <Label htmlFor="public">Público</Label>
                <p className="text-xs text-muted-foreground">Qualquer pessoa pode ver seu perfil e personagens.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="friends" id="friends" />
              <div>
                <Label htmlFor="friends">Apenas Amigos</Label>
                <p className="text-xs text-muted-foreground">Somente jogadores em sua lista de amigos podem ver seu perfil.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <div>
                <Label htmlFor="private">Privado</Label>
                <p className="text-xs text-muted-foreground">
                  Seu perfil é visível apenas para você e mestres de suas campanhas.
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Visibilidade de Personagens</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="character-stats">Estatísticas de Personagem</Label>
              <p className="text-xs text-muted-foreground">
                Permitir que outros jogadores vejam as estatísticas dos seus personagens.
              </p>
            </div>
            <Select defaultValue="party">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Todos</SelectItem>
                <SelectItem value="party">Apenas Grupo</SelectItem>
                <SelectItem value="dm">Apenas Mestre</SelectItem>
                <SelectItem value="none">Ninguém</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="character-inventory">Inventário</Label>
              <p className="text-xs text-muted-foreground">
                Permitir que outros jogadores vejam o inventário dos seus personagens.
              </p>
            </div>
            <Select defaultValue="dm">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Todos</SelectItem>
                <SelectItem value="party">Apenas Grupo</SelectItem>
                <SelectItem value="dm">Apenas Mestre</SelectItem>
                <SelectItem value="none">Ninguém</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="character-spells">Magias e Habilidades</Label>
              <p className="text-xs text-muted-foreground">
                Permitir que outros jogadores vejam as magias e habilidades dos seus personagens.
              </p>
            </div>
            <Select defaultValue="party">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Todos</SelectItem>
                <SelectItem value="party">Apenas Grupo</SelectItem>
                <SelectItem value="dm">Apenas Mestre</SelectItem>
                <SelectItem value="none">Ninguém</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Dados e Privacidade</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="analytics">Análise de Uso</Label>
              <p className="text-xs text-muted-foreground">Permitir coleta de dados anônimos para melhorar a plataforma.</p>
            </div>
            <Switch id="analytics" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="personalization">Personalização</Label>
              <p className="text-xs text-muted-foreground">Permitir personalização baseada em seu histórico de uso.</p>
            </div>
            <Switch id="personalization" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="third-party">Compartilhamento com Terceiros</Label>
              <p className="text-xs text-muted-foreground">Permitir compartilhamento de dados com serviços de terceiros.</p>
            </div>
            <Switch id="third-party" />
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-2">
        <Button variant="default" className="cursor-pointer active:shadow-none active:translate-y-0.5">Salvar Configurações</Button>
        <Button variant="outline">
          <DownloadIcon className="size-4 flex"/>
          Exportar Meus Dados
        </Button>
      </div>
    </div>
  )
}

