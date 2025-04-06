"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dice5, Dice6, ExpandIcon } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { DiceRollerApp } from "./dice-roller/dice-roller-app"

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20" | "d100"

export function DiceRoller() {
  const [results, setResults] = useState<{ dice: DiceType; result: number }[]>([])

  const rollDice = (dice: DiceType) => {
    let max = 0
    switch (dice) {
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

    const result = Math.floor(Math.random() * max) + 1
    setResults((prev) => [{ dice, result }, ...prev].slice(0, 5))
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl">Rolador de Dados</CardTitle>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <ExpandIcon/>
            </Button>
          </DialogTrigger>

          <DialogContent className="!max-w-none !w-[90lvw]">
            <DiceRollerApp/>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <DiceButton dice="d4" onClick={() => rollDice("d4")} />
          <DiceButton dice="d6" onClick={() => rollDice("d6")} />
          <DiceButton dice="d8" onClick={() => rollDice("d8")} />
          <DiceButton dice="d10" onClick={() => rollDice("d10")} />
          <DiceButton dice="d12" onClick={() => rollDice("d12")} />
          <DiceButton dice="d20" onClick={() => rollDice("d20")} />
          <DiceButton dice="d100" onClick={() => rollDice("d100")} className="col-span-3" />
        </div>

        <div className="mt-4 pt-4 border-t">
          <h3 className="font-medium mb-2">Resultados Recentes <span className="text-muted-foreground block text-xs">(últimos 5 dados)</span></h3>
          {results.length > 0 ? (
            <div className="space-y-2">
              {results.map((roll, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className={`flex justify-between items-center p-2 rounded-lg ${index === 0 && "bg-muted/50"}`}
                >
                  <span>{roll.dice}</span>
                  <span className="text-lg">
                    {roll.result}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-muted text-center py-2">Nenhum dado rolado ainda</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DiceButton({ dice, onClick, className = "" }: { dice: DiceType; onClick: () => void; className?: string }) {
  const getDiceIcon = () => {
    switch (dice) {
      case "d6":
        return <Dice6 className="h-4 w-4 mr-1" />
      case "d4":
      case "d8":
      case "d10":
      case "d12":
      case "d20":
      case "d100":
        return <Dice5 className="h-4 w-4 mr-1" />
    }
  }

  return (
    <Button
      variant="outline"
      className={`${className}`}
      onClick={onClick}
    >
      {getDiceIcon()}
      {dice}
    </Button>
  )
}

