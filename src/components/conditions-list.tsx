"use client"

import { Target, Eye, Plus, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ConditionsListProps {
  onViewList: () => void
  onConditionClick?: (conditionId: string) => void
}

export function ConditionsList({ onViewList, onConditionClick }: ConditionsListProps) {
  const vehicleImages = [
    "/toyota-prius-silver-car.jpg",
    "/honda-vezel-white-suv.jpg",
    "/toyota-alphard-white-van.jpg",
    "/mazda-cx5-red-suv.jpg",
    "/nissan-note-blue-compact.jpg",
    "/subaru-forester-green-suv.jpg",
    "/lexus-sedan-luxury-car.jpg",
  ]

  const conditions = [
    {
      id: "condition-1",
      title: "佐藤様 プリウス希望",
      summary: "プリウス 2020年以降 走行5万km以下",
      hitCount: 5,
      newCount: 2,
      vehicleCount: 5,
    },
    {
      id: "condition-2",
      title: "田中様 SUV希望",
      summary: "SUV 300万円以下 修復歴なし",
      hitCount: 12,
      newCount: 1,
      vehicleCount: 5,
    },
    {
      id: "condition-3",
      title: "SUV低走行条件",
      summary: "2019年以降 走行3万km以下 250-400万円",
      hitCount: 8,
      newCount: 3,
      vehicleCount: 5,
    },
    {
      id: "condition-4",
      title: "コンパクトカー条件",
      summary: "2018年以降 150万円以下",
      hitCount: 23,
      newCount: 0,
      vehicleCount: 5,
    },
    {
      id: "condition-5",
      title: "山田様 ミニバン希望",
      summary: "ミニバン 7人乗り 2021年以降",
      hitCount: 3,
      newCount: 1,
      vehicleCount: 5,
    },
    {
      id: "condition-6",
      title: "高級セダン条件",
      summary: "2020年以降 500万円以上 走行2万km以下",
      hitCount: 6,
      newCount: 2,
      vehicleCount: 5,
    },
    {
      id: "condition-7",
      title: "鈴木様 ハイブリッド希望",
      summary: "ハイブリッド 2019年以降 200万円以下",
      hitCount: 15,
      newCount: 4,
      vehicleCount: 5,
    },
    {
      id: "condition-8",
      title: "軽自動車条件",
      summary: "2020年以降 走行3万km以下 100万円以下",
      hitCount: 18,
      newCount: 5,
      vehicleCount: 5,
    },
    {
      id: "condition-9",
      title: "高橋様 ステーションワゴン希望",
      summary: "ステーションワゴン 4WD 2018年以降",
      hitCount: 4,
      newCount: 1,
      vehicleCount: 5,
    },
  ]

  const sortedConditions = [...conditions].sort((a, b) => b.newCount - a.newCount)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">検索履歴保存リスト</h2>
        <Button variant="outline" size="sm" onClick={onViewList} className="min-w-[120px] h-10 bg-transparent">
          <List className="w-4 h-4 mr-2" />
          詳しく見る
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sortedConditions.map((condition, index) => (
          <div
            key={index}
            onClick={() => onConditionClick?.(condition.id)}
            className="bg-card border border-border rounded-lg p-3 hover:bg-accent/50 cursor-pointer transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2 min-w-0">
                <Target className="w-4 h-4 text-foreground flex-shrink-0" />
                <span className="font-medium text-sm truncate">{condition.title}</span>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <Eye className="w-3 h-3 text-muted-foreground" />
                  <span className="font-bold text-base">{condition.hitCount}台</span>
                </div>
                {condition.newCount > 0 && (
                  <div className="flex items-center space-x-1 text-base">
                    <Plus className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 text-base font-bold">{condition.newCount}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{condition.summary}</p>

            {condition.newCount > 0 && (
              <div className="flex gap-2 overflow-x-auto mt-2">
                {Array.from({ length: condition.newCount }).map((_, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative w-16 h-12 rounded border border-border bg-muted flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={vehicleImages[(index + imgIndex) % vehicleImages.length] || "/placeholder.svg"}
                      alt={`車両${imgIndex + 1}`}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
