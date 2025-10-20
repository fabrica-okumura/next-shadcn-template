"use client"

import { Icon } from "@/components/ui/icon"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: "JA" | "EN"
  setLanguage: (language: "JA" | "EN") => void
}

export function SettingsModal({ open, onOpenChange, language, setLanguage }: SettingsModalProps) {
  const handleLogout = () => {
    console.log("[v0] Logout clicked")
    alert("ログアウトしました")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] top-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">マイページ</h3>
            <div className="bg-accent/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="user-plus" className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">田中 太郎</p>
                  <p className="text-sm text-muted-foreground">営業部</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="icon-mail" className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">tanaka@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="icon-mail" className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">090-1234-5678</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="garage" className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">株式会社サンプル</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium">言語 / Language</label>
            <div className="flex items-center border border-border rounded-md overflow-hidden w-fit">
              <button
                onClick={() => setLanguage("JA")}
                className={`px-4 py-2 text-sm transition-colors ${
                  language === "JA"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent"
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-4 py-2 text-sm transition-colors ${
                  language === "EN"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <Separator />

          <Button onClick={handleLogout} variant="danger" className="w-full">
                <Icon name="logout" className="w-4 h-4 mr-2" />
            ログアウト
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
