"use client"

import { Bell, Heart, Settings, ListFilter, Car, History, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { NotificationsModal } from "@/components/notifications-modal"
import { SettingsModal } from "@/components/settings-modal"
import { useState } from "react"

interface HeaderProps {
  negotiationMode: boolean
  setNegotiationMode: (value: boolean) => void
  onShowFavorites?: () => void
  onShowConditions?: () => void
  onShowProcurement?: () => void
  onShowSearchHistory?: () => void
  onNavigateHome?: () => void
  onShowMyPage?: () => void
}

export function Header({
  negotiationMode,
  setNegotiationMode,
  onShowFavorites,
  onShowConditions,
  onShowProcurement,
  onShowSearchHistory,
  onNavigateHome,
  onShowMyPage,
}: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [language, setLanguage] = useState<"JA" | "EN">("JA")

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span
                className="text-5xl font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onNavigateHome}
              >
                ロゴ
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">商談モード</span>
                <Switch
                  checked={negotiationMode}
                  onCheckedChange={setNegotiationMode}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="neutral" size="sm" className="text-muted-foreground" onClick={onShowConditions}>
                <ListFilter className="w-4 h-4" />
                <span className="ml-2">検索条件</span>
              </Button>
              <Button variant="neutral" size="sm" className="text-muted-foreground" onClick={onShowSearchHistory}>
                <History className="w-4 h-4" />
                <span className="ml-2">検索履歴</span>
              </Button>
              <Button variant="neutral" size="sm" className="text-muted-foreground" onClick={onShowFavorites}>
                <Heart className="w-4 h-4" />
                <span className="ml-2">お気に入り</span>
              </Button>
              <Button variant="neutral" size="sm" className="text-muted-foreground" onClick={onShowProcurement}>
                <Car className="w-4 h-4" />
                <span className="ml-2">仕入れ車両</span>
              </Button>
              <Button variant="neutral" size="sm" className="text-muted-foreground" onClick={onShowMyPage}>
                <User className="w-4 h-4" />
                <span className="ml-2">マイページ</span>
              </Button>
              <Button
                variant="neutral"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="neutral"
                size="icon"
                className="text-muted-foreground"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <NotificationsModal open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} language={language} setLanguage={setLanguage} />
    </>
  )
}
