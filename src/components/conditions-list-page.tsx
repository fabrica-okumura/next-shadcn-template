"use client"

import { Target, Eye, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

interface ConditionsListPageProps {
  onConditionClick: (conditionId: string) => void
}

export function ConditionsListPage({ onConditionClick }: ConditionsListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const conditions = [
    {
      id: "cond-1",
      title: "佐藤様 プリウス希望",
      summary: "プリウス 2020年以降 走行5万km以下",
      hitCount: 5,
      newCount: 2,
      lastUpdated: "2024-01-15",
    },
    {
      id: "cond-2",
      title: "田中様 SUV希望",
      summary: "SUV 300万円以下 修復歴なし",
      hitCount: 12,
      newCount: 1,
      lastUpdated: "2024-01-14",
    },
    {
      id: "cond-3",
      title: "SUV低走行条件",
      summary: "2019年以降 走行3万km以下 250-400万円",
      hitCount: 8,
      newCount: 3,
      lastUpdated: "2024-01-13",
    },
    {
      id: "cond-4",
      title: "コンパクトカー条件",
      summary: "2018年以降 150万円以下",
      hitCount: 23,
      newCount: 0,
      lastUpdated: "2024-01-12",
    },
    {
      id: "cond-5",
      title: "山田様 ミニバン希望",
      summary: "ミニバン 7人乗り 2021年以降",
      hitCount: 3,
      newCount: 1,
      lastUpdated: "2024-01-15",
    },
    {
      id: "cond-6",
      title: "高級セダン条件",
      summary: "2020年以降 500万円以上 走行2万km以下",
      hitCount: 6,
      newCount: 2,
      lastUpdated: "2024-01-11",
    },
    {
      id: "cond-7",
      title: "鈴木様 ハイブリッド希望",
      summary: "ハイブリッド 2019年以降 200万円以下",
      hitCount: 15,
      newCount: 4,
      lastUpdated: "2024-01-10",
    },
    {
      id: "cond-8",
      title: "軽自動車条件",
      summary: "2020年以降 走行3万km以下 100万円以下",
      hitCount: 18,
      newCount: 5,
      lastUpdated: "2024-01-09",
    },
    {
      id: "cond-9",
      title: "高橋様 ステーションワゴン希望",
      summary: "ステーションワゴン 4WD 2018年以降",
      hitCount: 4,
      newCount: 1,
      lastUpdated: "2024-01-08",
    },
  ]

  const filteredConditions = conditions
    .filter((condition) => {
      const searchLower = searchQuery.toLowerCase()
      return (
        condition.title.toLowerCase().includes(searchLower) || condition.summary.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => b.newCount - a.newCount)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">検索条件一覧</h1>
          <p className="text-sm text-muted-foreground mt-1">全{filteredConditions.length}件の検索条件</p>
        </div>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="条件タイトルや内容で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-foreground" />
          <h2 className="text-lg font-semibold">検索条件</h2>
          <Badge variant="secondary" className="bg-muted text-foreground border border-border">
            {filteredConditions.length}件
          </Badge>
        </div>
        <div className="grid gap-3">
          {filteredConditions.map((condition) => (
            <Card
              key={condition.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onConditionClick(condition.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{condition.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{condition.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>最終更新: {condition.lastUpdated}</span>
                  </div>
                  {condition.newCount > 0 && (
                    <div className="flex gap-2 overflow-x-auto pt-2">
                      {Array.from({ length: condition.newCount }).map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative w-20 h-14 rounded border border-border bg-muted flex-shrink-0 overflow-hidden"
                        >
                          <Image
                            src={`/placeholder.svg?height=56&width=80&query=car`}
                            alt={`車両${imgIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="font-bold text-lg">{condition.hitCount}台</span>
                  </div>
                  {condition.newCount > 0 && (
                    <div className="flex items-center gap-1">
                      <Plus className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 text-lg font-bold">{condition.newCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
