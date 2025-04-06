import { Button } from "@/components/ui/button"
import type { DiceRoll } from "./dice-roller-app"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { PartyPopperIcon } from "lucide-react"

interface DiceHistoryProps {
  history: DiceRoll[]
}

export function DiceHistory({ history }: DiceHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="mb-2">Nenhuma rolagem no histórico</p>
        <p className="text-sm">As rolagens aparecerão aqui após você rolar os dados</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Histórico de Rolagens</h3>
        <Button variant="secondary" size="sm">
          Limpar Histórico
        </Button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {history.map((roll) => (
          <div key={roll.id} className="p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium text-lg">
                  {roll.count}
                  {roll.diceType}
                  {roll.modifier > 0 && ` +${roll.modifier}`}
                  {roll.modifier < 0 && ` ${roll.modifier}`}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatDistanceToNow(roll.timestamp, { addSuffix: true, locale: ptBR })}
                </div>
              </div>
              <div className="text-2xl font-bold">{roll.total}</div>
            </div>

            <div className="mt-2 pt-2 border-t">
              <div className="text-sm mb-1">Resultados:</div>
              <div className="flex flex-wrap gap-2 select-none">
              {roll.results.map((result, index) => {
                const isMax = result === getMaxValue(roll.diceType)

                return isMax ? (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded-md font-medium bg-[#8a3c3c] text-white"
                        >
                          {result}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-2">
                        <PartyPopperIcon className="size-4"/> Crítico!
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div
                    key={index}
                    className="w-8 h-8 flex items-center justify-center rounded-md font-medium"
                  >
                    {result}
                  </div>
                )
              })}

                {roll.modifier !== 0 && (
                  <div className="w-8 h-8 flex items-center justify-center rounded-md font-medium">
                    {roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getMaxValue(diceType: string): number {
  switch (diceType) {
    case "d4":
      return 4
    case "d6":
      return 6
    case "d8":
      return 8
    case "d10":
      return 10
    case "d12":
      return 12
    case "d20":
      return 20
    case "d100":
      return 100
    default:
      return 0
  }
}

