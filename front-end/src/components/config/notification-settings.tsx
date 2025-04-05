"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferências de Notificação</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Controle como e quando você recebe notificações sobre suas campanhas e personagens.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Notificações por Email</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-sessions">Lembretes de Sessão</Label>
              <p className="text-xs text-muted-foreground">Receba lembretes sobre sessões agendadas.</p>
            </div>
            <Switch id="email-sessions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-campaigns">Atualizações de Campanha</Label>
              <p className="text-xs text-muted-foreground">Receba notificações quando houver atualizações em suas campanhas.</p>
            </div>
            <Switch id="email-campaigns" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-messages">Mensagens</Label>
              <p className="text-xs text-muted-foreground">Receba notificações quando receber mensagens de outros jogadores.</p>
            </div>
            <Switch id="email-messages" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-newsletter">Newsletter</Label>
              <p className="text-xs text-muted-foreground">Receba atualizações sobre novos recursos e conteúdos.</p>
            </div>
            <Switch id="email-newsletter" />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Notificações no Aplicativo</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-sessions">Lembretes de Sessão</Label>
              <p className="text-xs text-muted-foreground">Receba lembretes sobre sessões agendadas.</p>
            </div>
            <Switch id="app-sessions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-dice-rolls">Rolagens de Dados</Label>
              <p className="text-xs text-muted-foreground">Receba notificações sobre rolagens de dados importantes.</p>
            </div>
            <Switch id="app-dice-rolls" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-messages">Mensagens</Label>
              <p className="text-xs text-muted-foreground">Receba notificações quando receber mensagens de outros jogadores.</p>
            </div>
            <Switch id="app-messages" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-character-updates">Atualizações de Personagem</Label>
              <p className="text-xs text-muted-foreground">
                Receba notificações quando houver atualizações em seus personagens.
              </p>
            </div>
            <Switch id="app-character-updates" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Frequência de Notificações</h4>

        <RadioGroup defaultValue="balanced">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">Todas as Notificações</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="balanced" id="balanced" />
            <Label htmlFor="balanced">Balanceado (Recomendado)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="minimal" id="minimal" />
            <Label htmlFor="minimal">Apenas Importantes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">Nenhuma</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-4 space-x-2">
        <Button variant="default" className="cursor-pointer active:shadow-none active:translate-y-0.5">Salvar Preferências</Button>
        <Button variant="outline">Desfazer mudanças</Button>
      </div>
    </div>
  )
}

