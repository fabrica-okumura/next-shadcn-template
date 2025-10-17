"use client"

import { Icons } from "@/components/ui/icon"

import { SectionHeader } from "@/components/shared/section-header"
import { FavoriteToggleButton } from "@/components/shared/favorite-toggle-button"
import { VehicleCardShell } from "@/components/shared/vehicle-card-shell"
import { VehicleMediaPlaceholder } from "@/components/shared/vehicle-media-placeholder"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

import { VehicleComparison } from "./vehicle-comparison"

interface FavoritesListProps {
  negotiationMode: boolean
  onVehicleClick?: (vehicleId: string) => void
}

interface FavoriteVehicleDealer {
  name: string
  location: string
  rating: number
  reviewCount: number
  phone: string
}

interface FavoriteVehicle {
  id: number
  listingNumber: string
  image: string | null
  year: string
  maker: string
  model: string
  grade: string
  type: string
  displacement: string
  mileage: string
  inspection: string
  color: string
  transmission: string
  price: string
  totalPayment: string
  vehiclePrice: string
  expenses: string
  rating: string
  location: string
  isNew: boolean
  dealer?: FavoriteVehicleDealer
}

export function FavoritesList({ negotiationMode, onVehicleClick }: FavoritesListProps) {
  const [selectedVehicles, setSelectedVehicles] = useState<number[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const favoriteVehicles: FavoriteVehicle[] = [
    {
      id: 1,
      listingNumber: "A12345",
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
      totalPayment: "2,850,000",
      vehiclePrice: "2,580,000",
      expenses: "270,000",
      rating: "4.5",
      location: "東京",
      isNew: true,
    },
    {
      id: 3,
      listingNumber: "B23456",
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
      totalPayment: "2,180,000",
      vehiclePrice: "1,980,000",
      expenses: "200,000",
      rating: "4.0",
      location: "神奈川",
      isNew: true,
    },
    {
      id: 5,
      listingNumber: "C34567",
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
      totalPayment: "3,190,000",
      vehiclePrice: "2,890,000",
      expenses: "300,000",
      rating: "4.5",
      location: "千葉",
      isNew: false,
    },
    {
      id: 7,
      listingNumber: "D45678",
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
      totalPayment: "2,700,000",
      vehiclePrice: "2,450,000",
      expenses: "250,000",
      rating: "4.0",
      location: "埼玉",
      isNew: false,
    },
    {
      id: 9,
      listingNumber: "E56789",
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
      totalPayment: "5,680,000",
      vehiclePrice: "5,280,000",
      expenses: "400,000",
      rating: "5.0",
      location: "東京",
      isNew: true,
    },
    {
      id: 11,
      listingNumber: "F67890",
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
      totalPayment: "5,200,000",
      vehiclePrice: "4,850,000",
      expenses: "350,000",
      rating: "4.5",
      location: "神奈川",
      isNew: false,
    },
  ]

  const handleVehicleSelect = (vehicleId: number) => {
    setSelectedVehicles((prev) =>
      prev.includes(vehicleId) ? prev.filter((id) => id !== vehicleId) : [...prev, vehicleId],
    )
  }

  const selectedVehicleData = favoriteVehicles.filter((v) => selectedVehicles.includes(v.id))

  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<Icons.StarOutline className="h-6 w-6 text-primary" />}
        title="お気に入り車両一覧"
        action={
          <div className="flex items-center gap-4">
            {selectedVehicles.length > 0 && (
              <Button onClick={() => setShowComparison(true)} className="bg-primary hover:bg-primary/90">
                選択した車両を比較 ({selectedVehicles.length})
              </Button>
            )}
            <div className="text-sm text-muted-foreground">{favoriteVehicles.length}件</div>
          </div>
        }
      />

      <div className="space-y-4">
        {favoriteVehicles.map((vehicle) => {
          const isSelected = selectedVehicles.includes(vehicle.id)
          return (
            <VehicleCardShell
              key={vehicle.id}
              className="flex flex-col border border-border bg-card hover:border-primary/50 transition-colors"
              mediaWrapperClassName="relative w-[320px] flex-shrink-0"
              media={
                <>
                  <VehicleMediaPlaceholder maker={vehicle.maker} model={vehicle.model} className="absolute inset-0" />
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleVehicleSelect(vehicle.id)}
                    className="absolute left-2 top-2 z-10"
                  />
                  <FavoriteToggleButton className="absolute right-2 top-2" />
                </>
              }
              bodyClassName="grid w-full grid-cols-[minmax(0,1fr)] gap-4 p-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-2 border-b pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {vehicle.isNew && <Badge className="bg-background text-primary hover:bg-black">新着</Badge>}
                    <span>出品番号: {vehicle.listingNumber}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {vehicle.year} {vehicle.maker} {vehicle.model}
                    </h3>
                    <div className="text-lg text-muted-foreground">{vehicle.grade}</div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Icons.Settings className="h-4 w-4" />
                        <span className="font-medium text-foreground">型式:</span>
                        <span>{vehicle.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icons.Graph className="h-4 w-4" />
                        <span className="font-medium text-foreground">排気量:</span>
                        <span>{vehicle.displacement}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">走行距離:</span>
                        <span>{vehicle.mileage}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icons.Calendar className="h-4 w-4" />
                        <span className="font-medium text-foreground">車検:</span>
                        <span>{vehicle.inspection}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Icons.Settings className="h-4 w-4" />
                        <span className="font-medium text-foreground">色:</span>
                        <span>{vehicle.color}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">シフト:</span>
                        <span>{vehicle.transmission}</span>
                      </div>
                    </div>
                    <div className="min-w-[200px] text-right">
                      {negotiationMode ? (
                        <div className="space-y-2">
                          <div>
                            <div className="text-sm text-muted-foreground">支払総額</div>
                            <div className="text-2xl font-bold text-primary">¥{vehicle.totalPayment}</div>
                          </div>
                          <div className="rounded border bg-muted/30 px-3 py-2 text-xs text-muted-foreground space-y-1">
                            <div>車両価格（業販価格）: ¥{vehicle.vehiclePrice}</div>
                            <div>諸費用: ¥{vehicle.expenses}</div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-sm text-muted-foreground">業販価格</div>
                          <div className="text-2xl font-bold text-primary">¥{vehicle.price}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icons.Car className="h-4 w-4" />
                      <span className="font-medium text-foreground">所在地:</span>
                      <span>{vehicle.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icons.StarOutline className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{vehicle.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="h-10 min-w-[120px]"
                      onClick={() => onVehicleClick?.(vehicle.listingNumber)}
                    >
                      <Icons.Eye className="mr-1 h-4 w-4" />
                      詳細を見る
                    </Button>
                    <Button size="sm" className="h-10 min-w-[120px] bg-primary hover:bg-primary/90">
                      商談申込
                    </Button>
                  </div>
                </div>
              </div>

              {vehicle.dealer && (
                <div className="space-y-3 border-l pl-0 md:border-l md:pl-4">
                  <div className="space-y-1 text-sm">
                    <div className="text-xs text-muted-foreground">販売店情報</div>
                    <div className="font-semibold">{vehicle.dealer.name}</div>
                    <div className="text-xs text-muted-foreground">所在地: {vehicle.dealer.location}</div>
                  </div>
                  <div className="rounded border bg-muted/20 px-3 py-2 text-xs text-muted-foreground space-y-1">
                    <div>評価: {vehicle.dealer.rating}点 ({vehicle.dealer.reviewCount}件)</div>
                    <div className="font-semibold text-foreground">{vehicle.dealer.phone}</div>
                  </div>
                  <Button variant="primary" size="sm" className="w-full text-xs bg-transparent">
                    来店予約
                  </Button>
                </div>
              )}
            </VehicleCardShell>
          )
        })}
      </div>

      {showComparison && (
        <VehicleComparison
          vehicles={selectedVehicleData}
          negotiationMode={negotiationMode}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  )
}
