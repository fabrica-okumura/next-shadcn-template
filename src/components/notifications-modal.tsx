"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface NotificationsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Notification {
  id: string
  subject: string
  content: string
  timestamp: string
  type: "condition" | "customer"
}

const notifications: Notification[] = [
  {
    id: "1",
    subject: "「ミニバン_3列_～250万」に新着5台（合計27台）",
    content:
      "- 2020 トヨタ ノア Si（3.8万km／238万円／愛知）\n- 他4台\n→ 一覧：… / 比較：… / 通知設定：…\n※本日23:00まで。",
    timestamp: "2時間前",
    type: "condition",
  },
  {
    id: "2",
    subject: "【佐藤様】希望条件に新着2台（提案準備のご案内）",
    content:
      "最適候補：2021 ホンダ フィット e:HEV L（1.9万km／175万円／群馬）\n次アクション：見積作成→PDF送付\n→ 提案起票：… / 顧客カルテ：… / 通知設定：…",
    timestamp: "5時間前",
    type: "customer",
  },
  {
    id: "3",
    subject: "保存条件「SUV_4WD_～300万」に新着3台（合計15台）",
    content:
      "SUV_4WD_～300万 に新着がありました。\n— ハイライト —\n- 2019 トヨタ RAV4 G（5.2万km／268万円／東京）\n- 他2台\n— アクション —\n- 一覧：… / 比較：… / 通知設定：…\n※明日18:00まで。早めのご確認をおすすめします。",
    timestamp: "1日前",
    type: "condition",
  },
]

const HANDLE_NOTIFICATION = {
  subject: (notification: Notification) => notification.subject,
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const router = useRouter()

  const handleNotificationClick = (notification: Notification) => {
    HANDLE_NOTIFICATION.subject(notification)
    onOpenChange(false)
    router.push('/')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col top-0 translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">通知一覧</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className="border border-border rounded-lg p-4 bg-card hover:bg-accent/5 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm flex-1">{notification.subject}</h3>
                <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">{notification.timestamp}</span>
              </div>
              <div className="text-sm text-muted-foreground whitespace-pre-line">{notification.content}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
