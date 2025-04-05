
import { ConfigTabs } from "@/components/config-tabs"

export default function ConfigsPage() {
  return (
    <div className="min-h-screen">
      <main className="md:ml-60 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Configurações</h1>

          <div className="rounded-lg overflow-hidden">
            <ConfigTabs />
          </div>
        </div>
      </main>
    </div>
  )
}

