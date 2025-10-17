"use client"

import { Icons } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Image from "next/image"

interface VehicleCardNegotiationProps {
  vehicle: {
    id: number
    listingNumber: string
    favorite: boolean
    image: string
    images?: string[]
    location: string
    year: number
    maker: string
    model: string
    grade: string
    modelType: string
    mileage: number
    transmission: string
    color: string
    rating: number
    inspection: string
    price: number
    totalPayment: number
    vehiclePrice: number
    expenses: number
    displacement?: string
    capacity?: number
    repairHistory?: string
    listingPeriod: string
    isNew?: boolean
    isPriceDown?: boolean
    isInNegotiation?: boolean
    matchScore?: number
    conditionMatch?: string
    dealer?: {
      name: string
      location: string
      rating: number
      reviewCount: number
      phone: string
    }
  }
  selected?: boolean
  onSelect?: (checked: boolean) => void
  onClick?: () => void
  onFavoriteToggle?: () => void
}

export function VehicleCardNegotiation({
  vehicle,
  selected = false,
  onSelect,
  onClick,
  onFavoriteToggle,
}: VehicleCardNegotiationProps) {
  const [imageIndex, setImageIndex] = useState(0)

  // Sample images for thumbnails
  const thumbnails = vehicle.images || [vehicle.image, vehicle.image, vehicle.image, vehicle.image]
  const totalImages = thumbnails.length

  return (
    <section
      className="bg-card border border-border rounded overflow-hidden hover:shadow-md transition-all cursor-pointer"
      data-id={`${vehicle.listingNumber}`}
      onClick={onClick}
    >
      {/* Top badge row */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        {vehicle.isNew && (
          <Badge variant="default" className="text-xs px-2 py-0.5 bg-blue-600">
            新着
          </Badge>
        )}
        {vehicle.isInNegotiation && (
          <Badge variant="default" className="text-xs px-2 py-0.5">
            商談中
          </Badge>
        )}
        {vehicle.isPriceDown && (
          <Badge variant="default" className="text-xs px-2 py-0.5 border-red-500 text-red-600">
            値下げ
          </Badge>
        )}
      </div>

      {/* Title row */}
      <div className="px-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-muted-foreground mb-0.5">{vehicle.maker}</div>
            <h3 className="font-bold text-lg leading-tight">
              {vehicle.model} {vehicle.grade}{" "}
              <span className="text-sm font-normal text-muted-foreground">({vehicle.modelType})</span>
            </h3>
          </div>
          <Checkbox checked={selected} onCheckedChange={onSelect} onClick={(e) => e.stopPropagation()} />
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-[210px_1fr_300px] gap-6 px-4 pb-4">
        {/* Left: Image gallery */}
        <div className="space-y-2">
          <div className="relative w-full aspect-[4/3] bg-muted rounded overflow-hidden border">
            <Image
              src={thumbnails[imageIndex] || "/placeholder.svg"}
              alt={`${vehicle.maker} ${vehicle.model}`}
              fill
              className="object-cover grayscale"
            />
          </div>

          {/* Thumbnail strip */}
          <div className="grid grid-cols-4 gap-1.5">
            {thumbnails.slice(0, 3).map((thumb, idx) => (
              <button
                key={idx}
                className={`relative aspect-[4/3] bg-muted rounded overflow-hidden border-2 transition-colors ${
                  imageIndex === idx ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setImageIndex(idx)
                }}
              >
                <Image src={thumb || "/placeholder.svg"} alt="" fill className="object-cover grayscale" />
              </button>
            ))}
            <button
              className="relative aspect-[4/3] bg-muted rounded overflow-hidden border flex items-center justify-center text-xs font-medium hover:bg-muted/80 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                // Open image modal
              }}
            >
              全{totalImages}枚
            </button>
          </div>
        </div>

        {/* Center: Price & conditions */}
        <div className="space-y-3">
          {/* Price display */}
          <div className="border rounded overflow-hidden bg-background">
            <div className="bg-muted/50 px-3 py-2 border-b">
              <div className="text-xs text-muted-foreground mb-0.5">支払総額(税込)</div>
              <div className="text-3xl font-bold text-foreground">{(vehicle.totalPayment / 10000).toFixed(1)}万円</div>
            </div>
            <div className="grid grid-cols-2 divide-x">
              <div className="px-3 py-2">
                <div className="text-xs text-muted-foreground">車両価格(税込)</div>
                <div className="text-base font-semibold">{(vehicle.vehiclePrice / 10000).toFixed(0)}万円</div>
              </div>
              <div className="px-3 py-2">
                <div className="text-xs text-muted-foreground">諸費用(税込)</div>
                <div className="text-base font-semibold">{(vehicle.expenses / 10000).toFixed(1)}万円</div>
              </div>
            </div>
          </div>

          {/* Sales conditions */}
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground min-w-[48px] font-medium">車検</span>
              <span>{vehicle.inspection === "なし" ? "なし" : vehicle.inspection}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground min-w-[48px] font-medium">整備</span>
              <span>定期点検整備有</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground min-w-[48px] font-medium">保証</span>
              <span className="line-clamp-2">
                車両ドットコム保証EGSプラス付き(スタンダードプラン1年間 走行距離無制限)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Specs & CTA */}
        <div className="space-y-3">
          {/* Specs table */}
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium w-24">年式</th>
                <td className="py-2">
                  {vehicle.year}年(H{vehicle.year - 1988})
                </td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">排気量</th>
                <td className="py-2">{vehicle.displacement || "1,990cc"}</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">修復歴</th>
                <td className="py-2">
                  <span className={vehicle.repairHistory === "有" ? "text-red-600 font-semibold" : ""}>
                    {vehicle.repairHistory || "なし"}
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">走行距離</th>
                <td className="py-2">{(vehicle.mileage / 10000).toFixed(2)}万km</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">車体色</th>
                <td className="py-2">{vehicle.color}</td>
              </tr>
              <tr className="border-b">
                <th className="text-left py-2 pr-3 text-muted-foreground font-medium">ミッション</th>
                <td className="py-2">{vehicle.transmission}</td>
              </tr>
            </tbody>
          </table>

          {/* CTA buttons */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 h-9 text-xs bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  onFavoriteToggle?.()
                }}
              >
                <Icons.StarOutline className={`w-3.5 h-3.5 mr-1.5 ${vehicle.favorite ? "fill-red-500 text-red-500" : ""}`} />
                お気に入り追加
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="px-3 h-9 text-xs bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                無料
              </Button>
            </div>
            <Button
              size="default"
              className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              見積作成
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom: Dealer info */}
      {vehicle.dealer && (
        <div className="border-t bg-muted/20 px-4 py-3">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-center text-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">{vehicle.dealer.location}</span>
              </div>
              <div className="font-semibold">{vehicle.dealer.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                ~~~ラボールコーポレーションへようこそ!~~~ 当社では「信頼第一...
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-yellow-500">★★★</span>
                <span className="text-xs font-semibold">{vehicle.dealer.rating}点</span>
              </div>
              <div className="text-xs text-muted-foreground">
                販売店の評価・口コミ
                <br />
                総合評価 <span className="font-semibold">{vehicle.dealer.rating}点</span> ({vehicle.dealer.reviewCount}
                件)
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">お問合せ（無料電話）</div>
              <div className="text-xl font-bold">{vehicle.dealer.phone}</div>
              <Button variant="primary" size="sm" className="mt-2 text-xs bg-transparent">
                来店予約
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
