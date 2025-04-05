"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountSettings } from "@/components/config/account-settings"
import { NotificationSettings } from "@/components/config/notification-settings"
import { AppearanceSettings } from "@/components/config/appearance-settings"
import { GameSettings } from "@/components/config/game-settings"
import { PrivacySettings } from "@/components/config/privacy-settings"

export function ConfigTabs() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <Tabs defaultValue="account" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="pb-4 border-b">
        <TabsList className="bg-transparent h-auto p-0 flex w-full rounded-none">
          <TabsTrigger
            value="account"
            className="flex-1 py-3 text-sm"
          >
            Conta
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex-1 py-3 text-sm"
          >
            Notificações
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex-1 py-3 text-sm"
          >
            Aparência
          </TabsTrigger>
          <TabsTrigger
            value="game"
            className="flex-1 py-3 text-sm"
          >
            Jogo
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="flex-1 py-3 text-sm"
          >
            Privacidade
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="p-6">
        <TabsContent value="account" className="mt-0">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="appearance" className="mt-0">
          <AppearanceSettings />
        </TabsContent>

        <TabsContent value="game" className="mt-0">
          <GameSettings />
        </TabsContent>

        <TabsContent value="privacy" className="mt-0">
          <PrivacySettings />
        </TabsContent>
      </div>
    </Tabs>
  )
}

