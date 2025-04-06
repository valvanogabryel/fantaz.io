"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DiceRoller3D } from "@/components/dice-roller/dice-roller-3d"
import { DiceControls } from "@/components/dice-roller/dice-roller-controls"
import { DiceHistory } from "@/components/dice-roller/dice-history"
import { DiceLibrary } from "@/components/dice-roller/dice-library"
import { Card } from "@/components/ui/card"
import { ClockIcon } from "lucide-react"

export type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100"
export type DiceRoll = {
  id: string
  diceType: DiceType
  count: number
  modifier: number
  results: number[]
  total: number
  timestamp: Date
  name?: string
}

export type SavedRoll = {
  id: string
  name: string
  diceType: DiceType
  count: number
  modifier: number
}

export function DiceRollerApp() {
  const [activeTab, setActiveTab] = useState("roller")
  const [diceHistory, setDiceHistory] = useState<DiceRoll[]>([])
  const [savedRolls, setSavedRolls] = useState<SavedRoll[]>([
    { id: "1", name: "Ataque com Espada", diceType: "d20", count: 1, modifier: 5 },
    { id: "2", name: "Dano de Espada", diceType: "d8", count: 1, modifier: 3 },
    { id: "3", name: "Bola de Fogo", diceType: "d6", count: 8, modifier: 0 },
    { id: "4", name: "Cura", diceType: "d8", count: 2, modifier: 2 },
  ])

  const [rollResults, setRollResults] = useState<number[]>([]);
  const [currentRoll, setCurrentRoll] = useState<{
    diceType: DiceType
    count: number
    modifier: number
    rolling: boolean
  }>({
    diceType: "d20",
    count: 1,
    modifier: 0,
    rolling: false,
  })

  const rollDice = () => {
    if (currentRoll.rolling) return

    setCurrentRoll((prev) => ({ ...prev, rolling: true }))

    setTimeout(() => {
      const results = Array.from({ length: currentRoll.count }, () => {
        let max = 0
        switch (currentRoll.diceType) {
          case "d4":
            max = 4
            break
          case "d6":
            max = 6
            break
          case "d8":
            max = 8
            break
          case "d10":
            max = 10
            break
          case "d12":
            max = 12
            break
          case "d20":
            max = 20
            break
          case "d100":
            max = 100
            break
        }
        return Math.floor(Math.random() * max) + 1
      })

      const total = results.reduce((sum, val) => sum + val, 0) + currentRoll.modifier

      const newRoll: DiceRoll = {
        id: Date.now().toString(),
        diceType: currentRoll.diceType,
        count: currentRoll.count,
        modifier: currentRoll.modifier,
        results,
        total,
        timestamp: new Date(),
      }

      setDiceHistory((prev) => [newRoll, ...prev])
      setCurrentRoll((prev) => ({ ...prev, rolling: false }))
    }, 1500)
  }

  const saveRoll = (name: string) => {
    const newSavedRoll: SavedRoll = {
      id: Date.now().toString(),
      name,
      diceType: currentRoll.diceType,
      count: currentRoll.count,
      modifier: currentRoll.modifier,
    }

    setSavedRolls((prev) => [...prev, newSavedRoll])
  }

  const loadSavedRoll = (savedRoll: SavedRoll) => {
    setCurrentRoll({
      diceType: savedRoll.diceType,
      count: savedRoll.count,
      modifier: savedRoll.modifier,
      rolling: false,
    })
    setActiveTab("roller")
  }

  const deleteSavedRoll = (id: string) => {
    setSavedRolls((prev) => prev.filter((roll) => roll.id !== id))
  }

  const handleRollComplete = (results: number[]) => {
    setRollResults(results);
    
    // Esperar um momento e então definir rolling como false
    setTimeout(() => {
      setCurrentRoll(prev => ({
        ...prev,
        rolling: false
      }));
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden pt-0">
          <Tabs defaultValue="roller" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="h-auto py-2 flex w-full rounded-none">
                <TabsTrigger
                  value="roller"
                  className="flex-1 text-sm"
                >
                  Rolador
                </TabsTrigger>
                <TabsTrigger
                  value="library"
                  className="flex-1 text-sm"
                >
                  Biblioteca
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="flex-1 text-sm"
                >
                  Histórico
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="roller" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="h-[400px] flex items-center justify-center relative">
                  <DiceRoller3D
                    diceType={currentRoll.diceType}
                    count={currentRoll.count}
                    rolling={currentRoll.rolling}
                    onRollComplete={handleRollComplete}
                  />
                </div>
                <div className="p-6">
                  <DiceControls
                    currentRoll={currentRoll}
                    setCurrentRoll={setCurrentRoll}
                    rollDice={rollDice}
                    saveRoll={saveRoll}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="library" className="m-0 p-6">
              <DiceLibrary savedRolls={savedRolls} loadSavedRoll={loadSavedRoll} deleteSavedRoll={deleteSavedRoll} />
            </TabsContent>

            <TabsContent value="history" className="m-0 p-6">
              <DiceHistory history={diceHistory} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Resultados Recentes</h2>
          {diceHistory.length > 0 ? (
            <div className="space-y-3">
              {diceHistory.slice(0, 5).map((roll, index) => (
                <div key={roll.id} className={`p-3 ${(index === 0 && diceHistory.length > 1) && "border-b"}`}>
                  {(index === 0 && diceHistory.length > 1) && <span className="inline-flex items-center gap-1 text-xs text-muted-foreground select-none"><ClockIcon className="size-3"/> Mais Recente</span>}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">
                      {roll.count}
                      {roll.diceType} {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier < 0 ? roll.modifier : ""}
                    </span>
                    <span className="text-lg font-bold">{roll.total}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Resultados: {roll.results.join(", ")}
                    {roll.modifier !== 0 && ` (${roll.modifier > 0 ? "+" : ""}${roll.modifier})`}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Nenhum dado rolado ainda</div>
          )}
        </Card>
      </div>
    </div>
  )
}

