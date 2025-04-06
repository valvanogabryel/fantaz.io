import { DiceRollerApp } from "@/components/dice-roller/dice-roller-app"

export default function DiceRollerPage() {
  return (
    <div className="min-h-screen">
      <main className="md:ml-60 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 pb-8">
          <h1 className="text-3xl font-bold mb-6">Rolador de Dados</h1>
          
          <DiceRollerApp />
        </div>
      </main>
    </div>
  )
}
