"use client"

import { Button } from "@/components/ui/button"
import type { SavedRoll } from "./dice-roller-app"
import { Pencil, Trash2, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface DiceLibraryProps {
  savedRolls: SavedRoll[]
  loadSavedRoll: (roll: SavedRoll) => void
  deleteSavedRoll: (id: string) => void
}

export function DiceLibrary({ savedRolls, loadSavedRoll, deleteSavedRoll }: DiceLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRolls = savedRolls.filter((roll) => roll.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (savedRolls.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="mb-2">Nenhuma rolagem salva</p>
        <p className="text-sm">Salve suas rolagens frequentes para acesso rápido</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Rolagens Salvas</h3>
        <Input
          placeholder="Buscar rolagens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {filteredRolls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2">
          {filteredRolls.map((roll) => (
            <div key={roll.id} className="p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{roll.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {roll.count}
                    {roll.diceType}
                    {roll.modifier > 0 && ` +${roll.modifier}`}
                    {roll.modifier < 0 && ` ${roll.modifier}`}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => loadSavedRoll(roll)}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => deleteSavedRoll(roll.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">Nenhuma rolagem encontrada com "{searchTerm}"</div>
      )}
    </div>
  )
}

