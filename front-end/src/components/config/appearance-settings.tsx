"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Personalize a aparência do aplicativo de acordo com suas preferências.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Tema</h4>

        <RadioGroup defaultValue="dark">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-white rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light">Claro</Label>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-[#1a1a24] rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-[#2a2a35] rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark"/>
                <Label htmlFor="dark">Escuro</Label>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-gradient-to-b from-[#1a1a24] to-[#2a2a35] rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-[#3a3a45] rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system"/>
                <Label htmlFor="system">Sistema</Label>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="font-medium">Estilo de Tema</h4>

        <RadioGroup defaultValue="fantasy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-[#1a1a24] rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-[#e2c08d] rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fantasy" id="fantasy" />
                <Label htmlFor="fantasy">Fantasia Medieval</Label>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-[#1a1a24] rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-[#6a5acd] rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="arcane" id="arcane" />
                <Label htmlFor="arcane">Arcano</Label>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 p-4 border rounded-md">
              <div className="w-full h-24 bg-[#1a1a24] rounded-md flex items-center justify-center">
                <div className="w-3/4 h-4 bg-[#2e8b57] rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nature" id="nature"  />
                <Label htmlFor="nature">Natureza</Label>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      <Separator className="bg-[#3a3a45]" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Tamanho da Fonte</h4>
            <p className="text-xs text-muted-foreground">Ajuste o tamanho do texto em toda a aplicação.</p>
          </div>
          <div className="w-1/3">
            <Slider defaultValue={[100]} max={150} min={75} step={5} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Animações</h4>
            <p className="text-xs text-muted-foreground">Ativar ou desativar animações na interface.</p>
          </div>
          <Switch id="animations" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Efeitos Sonoros</h4>
            <p className="text-xs text-muted-foreground">Ativar ou desativar sons ao rolar dados e em outras interações.</p>
          </div>
          <Switch id="sound-effects" defaultChecked />
        </div>
      </div>

      <div className="pt-4">
        <Button variant="default">Salvar Preferências</Button>
      </div>
    </div>
  )
}

