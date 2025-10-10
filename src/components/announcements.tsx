import { Bell, Calendar, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Announcements() {
  const announcements = [
    {
      id: 1,
      type: "system",
      title: "システムメンテナンスのお知らせ",
      date: "2024/01/15",
      content: "1月20日(土) 2:00-6:00にシステムメンテナンスを実施いたします。",
      priority: "high",
    },
    {
      id: 2,
      type: "feature",
      title: "新機能：AI価格予測機能をリリース",
      date: "2024/01/12",
      content: "市場価格の変動を予測するAI機能を追加しました。",
      priority: "medium",
    },
    {
      id: 3,
      type: "event",
      title: "2月度オークション開催スケジュール",
      date: "2024/01/10",
      content: "2月のオークション開催日程を公開いたします。",
      priority: "low",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          運営からのお知らせ
        </h2>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {announcement.type === "system" && <AlertCircle className="w-4 h-4 text-primary" />}
                {announcement.type === "feature" && <Bell className="w-4 h-4 text-primary" />}
                {announcement.type === "event" && <Calendar className="w-4 h-4 text-primary" />}
                <h3 className="font-medium">{announcement.title}</h3>
                {announcement.priority === "high" && (
                  <Badge variant="destructive" className="text-xs">
                    重要
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{announcement.date}</span>
            </div>
            <p className="text-sm text-muted-foreground">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
