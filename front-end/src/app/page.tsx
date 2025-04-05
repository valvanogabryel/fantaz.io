import { CharacterCard } from "@/components/character-card"
import { DiceRoller } from "@/components/dice-roler"
import { CampaignInfo } from "@/components/campaign-info"
import { UpcomingSessions } from "@/components/upcoming-sessions"

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="md:ml-60 min-h-screen transition-all duration-300">        
        <div className="containe pr-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <CharacterCard />
              <CampaignInfo />
            </div>
            <div className="space-y-6">
              <DiceRoller />
              <UpcomingSessions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}