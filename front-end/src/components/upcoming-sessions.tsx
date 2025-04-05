import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"

export function UpcomingSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Próximas Sessões</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SessionItem
            date="15 de Abril"
            time="19:00 - 23:00"
            title="A Fome Invisível"
            description="Continuação da exploração do Moinho Velho"
          />

          <SessionItem
            date="22 de Abril"
            time="19:00 - 23:00"
            title="A Fome Invisível"
            description="Viagem para Xiq-Xiq"
          />

          <SessionItem
            date="29 de Abril"
            time="19:00 - 23:00"
            title="Sinais do Abrolho"
            description="Investigação em Xiq-Xiq"
          />

          <div className="pt-2 text-center">
            <a href="#" className="text-sm hover:underline">
              Ver Calendário Completo
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SessionItem({
  date,
  time,
  title,
  description,
}: { date: string; time: string; title: string; description: string }) {
  return (
    <div className="p-3 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1.5 text-xs">
          <CalendarDays className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <Clock className="h-4 w-4" />
          <span>{time}</span>
        </div>
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  )
}

