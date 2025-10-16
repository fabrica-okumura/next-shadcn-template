"use client"

import type React from "react"

import { Icons } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchHistoryItem {
  id: string
  query: string
  filters: string
  timestamp: Date
  resultCount: number
}

interface SearchHistoryListProps {
  onClose?: () => void
  onSearchClick?: (historyId: string) => void
}

export function SearchHistoryList({ onClose, onSearchClick }: SearchHistoryListProps) {
  const [historyItems, setHistoryItems] = useState<SearchHistoryItem[]>([
    {
      id: "history-1",
      query: "プリウス 2020年以降",
      filters: "走行5万km以下 / 修復歴なし",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
      resultCount: 12,
    },
    {
      id: "history-2",
      query: "SUV 300万円以下",
      filters: "2019年以降 / 修復歴なし",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
      resultCount: 23,
    },
    {
      id: "history-3",
      query: "ミニバン 7人乗り",
      filters: "2021年以降 / 走行3万km以下",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5時間前
      resultCount: 8,
    },
    {
      id: "history-4",
      query: "コンパクトカー",
      filters: "150万円以下 / 2018年以降",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1日前
      resultCount: 34,
    },
    {
      id: "history-5",
      query: "ハイブリッド",
      filters: "200万円以下 / 2019年以降",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2日前
      resultCount: 19,
    },
    {
      id: "history-6",
      query: "軽自動車",
      filters: "100万円以下 / 走行3万km以下",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3日前
      resultCount: 45,
    },
    {
      id: "history-7",
      query: "高級セダン",
      filters: "500万円以上 / 2020年以降",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5日前
      resultCount: 7,
    },
    {
      id: "history-8",
      query: "ステーションワゴン 4WD",
      filters: "2018年以降 / 走行5万km以下",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1週間前
      resultCount: 11,
    },
  ])

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins}分前`
    } else if (diffHours < 24) {
      return `${diffHours}時間前`
    } else if (diffDays < 7) {
      return `${diffDays}日前`
    } else {
      return date.toLocaleDateString("ja-JP", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    }
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setHistoryItems(historyItems.filter((item) => item.id !== id))
  }

  const handleClearAll = () => {
    if (confirm("すべての検索履歴を削除しますか？")) {
      setHistoryItems([])
    }
  }

  const handleReSearch = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onSearchClick?.(id)
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Icons.Clock className="w-6 h-6" />
            <h1 className="text-2xl font-bold">検索履歴</h1>
            <span className="text-sm text-muted-foreground">({historyItems.length}件)</span>
          </div>
          <div className="flex items-center space-x-2">
            {historyItems.length > 0 && (
              <Button variant="primary" size="sm" onClick={handleClearAll} className="bg-transparent">
                <Icons.Trash className="w-4 h-4 mr-2" />
                すべて削除
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icons.Close className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {historyItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Icons.Clock className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">検索履歴がありません</p>
            <p className="text-sm text-muted-foreground mt-2">検索を実行すると、ここに履歴が表示されます</p>
          </div>
        ) : (
          <div className="space-y-3">
            {historyItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSearchClick?.(item.id)}
                className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icons.Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-base">{item.query}</span>
                      <span className="text-sm text-muted-foreground">({item.resultCount}件)</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">{item.filters}</p>
                    <p className="text-xs text-muted-foreground ml-6 mt-1">{formatTimestamp(item.timestamp)}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => handleReSearch(item.id, e)}
                      className="bg-transparent"
                    >
                      <Icons.Refresh className="w-4 h-4 mr-2" />
                      再検索
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDelete(item.id, e)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Icons.Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
