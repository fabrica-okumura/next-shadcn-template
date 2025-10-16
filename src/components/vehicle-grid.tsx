"use client"

import { Icons } from "@/components/ui/icon"

import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VehicleGridProps {
  negotiationMode: boolean
}

export function VehicleGrid({ negotiationMode }: VehicleGridProps) {
  const vehicles = [
    {
      id: 1,
      image: null,
      year: "2022",
      maker: "トヨタ",
      model: "プリウス",
      grade: "S",
      type: "DAA-ZVW51",
      displacement: "1800cc",
      mileage: "25,000km",
      inspection: "2025/03",
      color: "シルバー",
      transmission: "CVT",
      price: "2,580,000",
      isNew: true,
    },
    {
      id: 2,
      image: null,
      year: "2021",
      maker: "ホンダ",
      model: "ヴェゼル",
      grade: "HYBRID X",
      type: "6AA-RV6",
      displacement: "1500cc",
      mileage: "18,500km",
      inspection: "2024/11",
      color: "ホワイト",
      transmission: "CVT",
      price: "2,980,000",
      isNew: false,
    },
    {
      id: 3,
      image: null,
      year: "2023",
      maker: "ニッサン",
      model: "ノート",
      grade: "X",
      type: "5AA-E13",
      displacement: "1200cc",
      mileage: "12,000km",
      inspection: "2026/01",
      color: "ブルー",
      transmission: "CVT",
      price: "1,980,000",
      isNew: true,
    },
    {
      id: 4,
      image: null,
      year: "2020",
      maker: "マツダ",
      model: "CX-5",
      grade: "25S",
      type: "3DA-KF2P",
      displacement: "2500cc",
      mileage: "35,000km",
      inspection: "2025/08",
      color: "レッド",
      transmission: "6AT",
      price: "2,780,000",
      isNew: false,
    },
    {
      id: 5,
      image: null,
      year: "2022",
      maker: "スバル",
      model: "フォレスター",
      grade: "Touring",
      type: "5BA-SK9",
      displacement: "2000cc",
      mileage: "22,000km",
      inspection: "2025/05",
      color: "グリーン",
      transmission: "CVT",
      price: "3,180,000",
      isNew: false,
    },
    {
      id: 6,
      image: null,
      year: "2023",
      maker: "トヨタ",
      model: "アクア",
      grade: "G",
      type: "6AA-MXPK11",
      displacement: "1500cc",
      mileage: "8,500km",
      inspection: "2026/02",
      color: "ホワイト",
      transmission: "CVT",
      price: "2,280,000",
      isNew: true,
    },
    {
      id: 7,
      image: null,
      year: "2021",
      maker: "ホンダ",
      model: "フリード",
      grade: "HYBRID G",
      type: "6AA-GB7",
      displacement: "1500cc",
      mileage: "28,000km",
      inspection: "2024/12",
      color: "ブラック",
      transmission: "CVT",
      price: "2,680,000",
      isNew: false,
    },
    {
      id: 8,
      image: null,
      year: "2022",
      maker: "トヨタ",
      model: "ヴォクシー",
      grade: "S-Z",
      type: "5BA-MZRA90W",
      displacement: "2000cc",
      mileage: "15,000km",
      inspection: "2025/09",
      color: "シルバー",
      transmission: "CVT",
      price: "3,480,000",
      isNew: false,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>該当: 127台</span>
          <span>•</span>
          <span>表示: 1-8台</span>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            maker={vehicle.maker}
            model={vehicle.model}
            badge={
              vehicle.isNew ? (
                <Badge className="bg-background text-primary hover:bg-black">新着</Badge>
              ) : undefined
            }
            favorite={{}}
            header={
              <h3 className="text-lg font-semibold">
                {vehicle.year} {vehicle.maker} {vehicle.model}
              </h3>
            }
            priceSection={
              !negotiationMode ? (
                <span className="text-xl font-bold text-primary">¥{vehicle.price}</span>
              ) : undefined
            }
            specs={
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icons.Settings className="h-3 w-3" />
                  <span>{vehicle.grade}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{vehicle.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icons.Graph className="h-3 w-3" />
                  <span>{vehicle.displacement}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{vehicle.mileage}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icons.Calendar className="h-3 w-3" />
                  <span>車検: {vehicle.inspection}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icons.Settings className="h-3 w-3" />
                  <span>{vehicle.color}</span>
                </div>
              </div>
            }
            footer={
              <div className="flex space-x-2 pt-2">
                <Button variant="primary" size="sm" className="flex-1 h-10 min-w-[120px] bg-transparent">
                  <Icons.Visibility className="mr-1 h-4 w-4" />
                  詳細を見る
                </Button>
                {!negotiationMode && (
                  <Button size="sm" className="flex-1 h-10 min-w-[120px] bg-primary hover:bg-primary/90">
                    商談申込
                  </Button>
                )}
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}
