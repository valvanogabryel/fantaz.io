import type React from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Sword, Zap, Heart, Brain, Star } from "lucide-react"

export function CharacterCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Gekkiesh Ap</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">Anão Guerreiro - Nível 5</div>
          </div>
          <Badge variant="combat">Combate</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500 animate-pulse" />
              <span>Pontos de Vida</span>
            </div>
            <div className="font-medium select-none">42/45</div>
          </div>
          <Progress value={93} className="h-2 bg-gray-700" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <StatItem icon={<Sword className="h-5 w-5" />} name="Força" value="18" />
            <StatItem icon={<Zap className="h-5 w-5" />} name="Destreza" value="12" />
            <StatItem icon={<Heart className="h-5 w-5" />} name="Constituição" value="16" />
            <StatItem icon={<Brain className="h-5 w-5" />} name="Inteligência" value="10" />
            <StatItem icon={<Star className="h-5 w-5" />} name="Sabedoria" value="13" />
            <StatItem icon={<Shield className="h-5 w-5" />} name="Carisma" value="8" />
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Perícias Destacadas</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-transparent">
                Atletismo +6
              </Badge>
              <Badge variant="outline" className="bg-transparent">
                Intimidação +3
              </Badge>
              <Badge variant="outline" className="bg-transparent">
                Percepção +4
              </Badge>
              <Badge variant="outline" className="bg-transparent">
                Sobrevivência +4
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({ icon, name, value }: { icon: React.ReactNode; name: string; value: string }) {
  return (
    <div className="flex flex-col items-center p-2 rounded-lg">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm">{name}</span>
      </div>
      <span className="text-xl font-bold">{value}</span>
    </div>
  )
}

