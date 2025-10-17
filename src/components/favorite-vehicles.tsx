"use client"

import { Icons } from "@/components/ui/icon"

import { SectionHeader } from "@/components/shared/section-header"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FavoriteVehiclesProps {
  negotiationMode: boolean
  onShowList?: () => void
  onVehicleClick?: (vehicleId: string) => void
}

export function FavoriteVehicles({ negotiationMode, onShowList, onVehicleClick }: FavoriteVehiclesProps) {
  const favoriteVehicles = [
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
      totalPayment: "2,780,000",
      vehiclePrice: "2,580,000",
      expenses: "200,000",
      isNew: true,
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
      totalPayment: "2,150,000",
      vehiclePrice: "1,980,000",
      expenses: "170,000",
      isNew: true,
    },
    {
      id: 5,
      image: null,
      year: "2021",
      maker: "ホンダ",
      model: "ヴェゼル",
      grade: "HYBRID X",
      type: "6AA-RV3",
      displacement: "1500cc",
      mileage: "35,000km",
      inspection: "2024/11",
      color: "ホワイト",
      transmission: "CVT",
      price: "2,890,000",
      totalPayment: "3,090,000",
      vehiclePrice: "2,890,000",
      expenses: "200,000",
      isNew: false,
    },
    {
      id: 7,
      image: null,
      year: "2020",
      maker: "マツダ",
      model: "CX-5",
      grade: "25S PROACTIVE",
      type: "3DA-KF2P",
      displacement: "2500cc",
      mileage: "45,000km",
      inspection: "2025/08",
      color: "レッド",
      transmission: "6AT",
      price: "2,450,000",
      totalPayment: "2,650,000",
      vehiclePrice: "2,450,000",
      expenses: "200,000",
      isNew: false,
    },
    {
      id: 9,
      image: null,
      year: "2023",
      maker: "レクサス",
      model: "IS",
      grade: "300h",
      type: "6AA-AVE35",
      displacement: "2500cc",
      mileage: "8,000km",
      inspection: "2026/05",
      color: "ブラック",
      transmission: "CVT",
      price: "5,280,000",
      totalPayment: "5,530,000",
      vehiclePrice: "5,280,000",
      expenses: "250,000",
      isNew: true,
    },
    {
      id: 11,
      image: null,
      year: "2022",
      maker: "トヨタ",
      model: "アルファード",
      grade: "2.5S",
      type: "3BA-AGH30W",
      displacement: "2500cc",
      mileage: "18,000km",
      inspection: "2025/12",
      color: "ホワイト",
      transmission: "CVT",
      price: "4,850,000",
      totalPayment: "5,100,000",
      vehiclePrice: "4,850,000",
      expenses: "250,000",
      isNew: false,
    },
  ]

  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<Icons.StarOutline className="h-5 w-5 text-primary" />}
        title="お気に入り車両"
        action={
          <Button variant="primary" size="sm" className="h-10 min-w-[120px] bg-transparent" onClick={onShowList}>
            <Icons.List className="mr-2 h-4 w-4" />
            詳しく見る
          </Button>
        }
      />

      <div className="flex gap-4 overflow-x-auto">
        {favoriteVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            maker={vehicle.maker}
            model={vehicle.model}
            badge={
              vehicle.isNew ? (
                <Badge className="rounded-full bg-[var(--usage-button-primary)] px-4 py-1 text-sm text-white shadow">
                  新着
                </Badge>
              ) : undefined
            }
            favorite={{}}
            header={
              <h3 className="truncate text-[20px] font-bold leading-snug">
                {vehicle.maker} {vehicle.model}
              </h3>
            }
            priceSection={
              <div className="flex items-baseline gap-2 text-xs">
                <span>{negotiationMode ? "支払総額" : "業販価格"}</span>
                <div className="flex items-baseline gap-1 font-bold">
                  <span className="text-[20px]">¥</span>
                  <span className="text-[28px] leading-none">
                    {negotiationMode ? vehicle.totalPayment : vehicle.price}
                  </span>
                </div>
              </div>
            }
            specs={
              <div className="space-y-2 text-sm">
                <div className="flex gap-6">
                  <span className="flex-1 truncate">{vehicle.grade}</span>
                  <span className="flex-1 truncate">{vehicle.type}</span>
                </div>
                <div className="flex gap-6">
                  <span className="flex-1 truncate">{vehicle.displacement}</span>
                  <span className="flex-1 truncate">{vehicle.mileage}</span>
                </div>
                <div className="flex gap-6">
                  <span className="flex-1 truncate">車検：{vehicle.inspection}</span>
                  <span className="flex-1 truncate">{vehicle.color}</span>
                </div>
                {negotiationMode && (
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>車両価格</span>
                      <span className="font-medium">¥{vehicle.vehiclePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>諸費用</span>
                      <span className="font-medium">¥{vehicle.expenses}</span>
                    </div>
                  </div>
                )}
              </div>
            }
            footer={
              <div className="flex gap-2 pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 h-10 min-w-[120px] border-[#b2b6b8] hover:bg-white"
                  onClick={() => onVehicleClick?.(vehicle.id.toString())}
                >
                  <Icons.Eye className="mr-1 h-4 w-4" />
                  詳細を見る
                </Button>
                {!negotiationMode && (
                  <Button
                    size="sm"
                    className="flex-1 h-10 min-w-[120px] bg-[var(--color-color-usage-button-primary)] text-white hover:bg-[var(--color-color-usage-button-primary-hover)]"
                    onClick={() => onVehicleClick?.(vehicle.id.toString())}
                  >
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
