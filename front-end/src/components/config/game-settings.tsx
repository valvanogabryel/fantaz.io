"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { useState } from "react"

export function GameSettings() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Configurações de Jogo</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Personalize suas preferências para sessões de jogo e rolagem de dados.
        </p>
      </div>

      <Separator  />

      <div className="space-y-4">
        <h4 className="font-medium">Sistema de Regras</h4>

        <RadioGroup defaultValue="5e">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 p-4 border rounded-md">
              <RadioGroupItem value="5e" id="5e" />
              <div>
                <Label htmlFor="5e">D&D 5ª Edição</Label>
                <p className="text-xs text-muted-foreground">Sistema padrão do D&D 5e com todas as regras oficiais.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-md">
              <RadioGroupItem value="3.5" id="3.5" />
              <div>
                <Label htmlFor="3.5">D&D 3.5</Label>
                <p className="text-xs text-muted-foreground">Sistema clássico do D&D 3.5 com regras completas.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-md">
              <RadioGroupItem value="pathfinder" id="pathfinder" />
              <div>
                <Label htmlFor="pathfinder">Pathfinder</Label>
                <p className="text-xs text-muted-foreground">Sistema Pathfinder com regras e mecânicas específicas.</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-md">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value="custom" id="custom" />
                    <div>
                      <Label htmlFor="custom">Personalizado</Label>
                      <p className="text-xs text-muted-foreground">Configure suas próprias regras e modificações.</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Configurar Sistema Personalizado</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Defina suas próprias regras e modificações para criar um sistema personalizado.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="system-name">Nome do Sistema</Label>
                      <Input
                        id="system-name"
                        placeholder="Ex: D&D 5e Modificado"
                      />
                    </div>

                    <Separator className="my-2" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ability-scores">Método de Atributos</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Padrão (15, 14, 13, 12, 10, 8)</SelectItem>
                            <SelectItem value="point-buy">Compra de Pontos</SelectItem>
                            <SelectItem value="roll">Rolagem (4d6, descarta menor)</SelectItem>
                            <SelectItem value="heroic">Heróico (16, 15, 14, 13, 12, 10)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hit-points">Pontos de Vida</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um método" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Padrão (Média ou Rolagem)</SelectItem>
                            <SelectItem value="max-first">Máximo no 1º Nível, Média depois</SelectItem>
                            <SelectItem value="max-all">Máximo em Todos os Níveis</SelectItem>
                            <SelectItem value="fixed">Valor Fixo por Nível</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Regras Opcionais Ativas</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="feats" />
                          <Label htmlFor="feats" className="text-sm">
                            Talentos
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="multiclass" />
                          <Label htmlFor="multiclass" className="text-sm">
                            Multiclasse
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="flanking" />
                          <Label htmlFor="flanking" className="text-sm">
                            Flanqueamento
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="inspiration" />
                          <Label htmlFor="inspiration" className="text-sm">
                            Inspiração
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hero-points" />
                          <Label htmlFor="hero-points" className="text-sm">
                            Pontos de Herói
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="critical-fumble"
                          />
                          <Label htmlFor="critical-fumble" className="text-sm">
                            Falha Crítica
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="space-y-2">
                      <Label htmlFor="custom-rules">Regras Personalizadas</Label>
                      <Textarea
                        id="custom-rules"
                        placeholder="Descreva quaisquer regras personalizadas específicas para o seu jogo..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="default">Salvar Sistema</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator  />

      <div className="space-y-4">
        <h4 className="font-medium">Rolagem de Dados</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-roll">Rolagem Automática</Label>
              <p className="text-xs text-muted-foreground">Rolar dados automaticamente para testes de habilidade.</p>
            </div>
            <Switch id="auto-roll" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="advantage-disadvantage">Vantagem/Desvantagem Automática</Label>
              <p className="text-xs text-muted-foreground">
                Calcular automaticamente vantagem/desvantagem com base nas condições.
              </p>
            </div>
            <Switch id="advantage-disadvantage" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="critical-hits">Acertos Críticos Especiais</Label>
              <p className="text-xs text-muted-foreground">Ativar efeitos especiais para acertos críticos (20 natural).</p>
            </div>
            <Switch id="critical-hits" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5"> 
              <Label htmlFor="dice-animations">Animações de Dados</Label>
              <p className="text-xs text-muted-foreground">Mostrar animações 3D ao rolar dados.</p>
            </div>
            <Switch id="dice-animations" defaultChecked />
          </div>
        </div>
      </div>

      <Separator  />

      <div className="space-y-4">
        <h4 className="font-medium">Preferências de Campanha</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="default-map-style">Estilo de Mapa Padrão</Label>
            <Select defaultValue="fantasy">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um estilo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fantasy">Fantasia Medieval</SelectItem>
                <SelectItem value="realistic">Realista</SelectItem>
                <SelectItem value="abstract">Abstrato</SelectItem>
                <SelectItem value="hex">Hexagonal</SelectItem>
                <SelectItem value="isometric">Isométrico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-initiative">Sistema de Iniciativa</Label>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um sistema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Padrão (d20 + Destreza)</SelectItem>
                <SelectItem value="group">Iniciativa em Grupo</SelectItem>
                <SelectItem value="popcorn">Iniciativa Popcorn</SelectItem>
                <SelectItem value="cards">Cartas de Iniciativa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rest-rules">Regras de Descanso</Label>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Selecione regras de descanso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Padrão (Curto: 1h, Longo: 8h)</SelectItem>
                <SelectItem value="gritty">Realista (Curto: 8h, Longo: 7 dias)</SelectItem>
                <SelectItem value="epic">Épico (Curto: 5min, Longo: 1h)</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="encumbrance">Sistema de Carga</Label>
            <Select defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um sistema de carga" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Padrão</SelectItem>
                <SelectItem value="variant">Variante</SelectItem>
                <SelectItem value="simplified">Simplificado</SelectItem>
                <SelectItem value="none">Sem Carga</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button variant="default" className="cursor-pointer active:shadow-none active:translate-y-0.5">Salvar Configurações</Button>
      </div>
    </div>
  )
}

