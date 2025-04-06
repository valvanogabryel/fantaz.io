"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dice1, Dice4, Dice5, Dice6, Plus, Minus, Save, DicesIcon } from "lucide-react"
import type { DiceType } from "./dice-roller-app"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DiceControlsProps {
  currentRoll: {
    diceType: DiceType
    count: number
    modifier: number
    rolling: boolean
  }
  setCurrentRoll: React.Dispatch<
    React.SetStateAction<{
      diceType: DiceType
      count: number
      modifier: number
      rolling: boolean
    }>
  >
  rollDice: () => void
  saveRoll: (name: string) => void
}

export function DiceControls({ currentRoll, setCurrentRoll, rollDice, saveRoll }: DiceControlsProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [rollName, setRollName] = useState("")


  const handleDiceTypeChange = (diceType: DiceType) => {
    setCurrentRoll((prev) => ({ ...prev, diceType }))
  }

  const handleCountChange = (increment: boolean) => {
    setCurrentRoll((prev) => ({
      ...prev,
      count: increment
        ? Math.min(prev.count + 1, 20) // Máximo de 20 dados
        : Math.max(prev.count - 1, 1), // Mínimo de 1 dado
    }))
  }

  const handleModifierChange = (increment: boolean) => {
    setCurrentRoll((prev) => ({
      ...prev,
      modifier: increment ? prev.modifier + 1 : prev.modifier - 1,
    }))
  }

  const handleSaveRoll = () => {
    if (rollName.trim()) {
      saveRoll(rollName)
      setRollName("")
      setSaveDialogOpen(false)
    }
  }

  const handleRollClick = () => {
    if (currentRoll.rolling) return
    
    rollDice()

    if (window.innerWidth < 768) {
      const diceContainer = document.querySelector(".h-[400px]")
      if (diceContainer) {
        diceContainer.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-medium mb-3 block">Tipo de Dado</Label>
        <div className="grid grid-cols-4 gap-2">
          {(["d4", "d6", "d8", "d10", "d12", "d20", "d100"] as DiceType[]).map((diceType) => (
            <Button
              key={diceType}
              variant={currentRoll.diceType === diceType ? "default" : "outline"}
              onClick={() => handleDiceTypeChange(diceType)}
              disabled={currentRoll.rolling}
            >
              {diceType}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-lg font-medium mb-3 block">Quantidade</Label>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCountChange(false)}
              disabled={currentRoll.count <= 1 || currentRoll.rolling}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 mx-2 text-center text-xl font-bold">{currentRoll.count}</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleCountChange(true)}
              disabled={currentRoll.count >= 20 || currentRoll.rolling}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-lg font-medium mb-3 block">Modificador</Label>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleModifierChange(false)}
              disabled={currentRoll.rolling}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 mx-2 text-center text-xl font-bold">
              {currentRoll.modifier > 0 ? `+${currentRoll.modifier}` : currentRoll.modifier}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleModifierChange(true)}
              disabled={currentRoll.rolling}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 flex space-x-2">
        <Button
          className="flex-1 cursor-pointer active:shadow-none active:translate-y-0.5"
          variant="default"
          size="default"
          onClick={handleRollClick}
          disabled={currentRoll.rolling}
        >
          <DicesIcon/>
          {currentRoll.rolling ? "Rolando..." : "Rolar Dados"}
        </Button>

        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" disabled={currentRoll.rolling}>
              <Save className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Salvar Rolagem</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Salve esta configuração de dados para uso futuro.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Label htmlFor="roll-name" className="mb-2 block">
                Nome da Rolagem
              </Label>
              <Input
                id="roll-name"
                value={rollName}
                onChange={(e) => setRollName(e.target.value)}
                placeholder="Ex: Ataque com Espada"
              />

              <div className="mt-4 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Configuração:</div>
                <div className="font-medium mt-1">
                  {currentRoll.count} {currentRoll.diceType}
                  {currentRoll.modifier > 0 && ` +${currentRoll.modifier}`}
                  {currentRoll.modifier < 0 && ` ${currentRoll.modifier}`}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSaveDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSaveRoll} disabled={!rollName.trim()}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

