import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scroll, Users, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback } from "./ui/avatar";

export function CampaignInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Campanha Atual</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">A Fome Invisível</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Náufragos em uma ilha remota e desconhecida, buscam por respostas e formas de sobreviver, deparam-se com moradores estranhos e um culto de comportamento perturbador. 
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InfoItem
              icon={<Users className="h-5 w-5" />}
              title="Grupo"
              content="Náufragos"
            />
            <InfoItem
              icon={<MapPin className="h-5 w-5" />}
              title="Localização Atual"
              content="Matas de Cyrillo"
            />
            <InfoItem icon={<Calendar className="h-5 w-5" />} title="Sessões" content="Sábado, 16:00" />
            <InfoItem
              icon={<Scroll className="h-5 w-5" />}
              title="Missão Atual"
              content="Interrogar a alquimista misteriosa"
            />
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Companheiros de Grupo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CompanionItem name="Gorgrim" race="Meio-Orc" class="Bárbaro" level={5} />
              <CompanionItem name="Ogrimm" race="Anão" class="Paladino" level={5} />
              <CompanionItem name="Kublai" race="Humano" class="Monge" level={5} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoItem({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
  return (
    <div className="flex flex-col p-3 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <span className="text-sm text-muted-foreground">{content}</span>
    </div>
  )
}

function CompanionItem({
  name,
  race,
  class: characterClass,
  level,
}: { name: string; race: string; class: string; level: number }) {
  return (
    <div className="flex items-center p-2 rounded-lg">
      <Avatar className="mr-2">
        <AvatarFallback className="w-8 h-8">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">
          {race} {characterClass} - Nível {level}
        </div>
      </div>
    </div>
  )
}

