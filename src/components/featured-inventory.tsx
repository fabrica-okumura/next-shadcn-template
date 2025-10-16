import { Icons } from "@/components/ui/icon"

import { SectionHeader } from "@/components/shared/section-header"
import { VehicleCard } from "@/components/shared/vehicle-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FeaturedInventory() {
  const featuredVehicles = [
    {
      id: 1,
      image: null,
      year: "2023",
      maker: "レクサス",
      model: "LS500h",
      grade: "Executive",
      displacement: "3500cc",
      mileage: "5,000km",
      inspection: "2026/03",
      color: "ブラック",
      transmission: "CVT",
      price: "8,980,000",
      highlight: "低走行・ワンオーナー",
      tag: "プレミアム",
    },
    {
      id: 2,
      image: null,
      year: "2022",
      maker: "トヨタ",
      model: "アルファード",
      grade: "Executive Lounge",
      displacement: "3500cc",
      mileage: "12,000km",
      inspection: "2025/08",
      color: "ホワイト",
      transmission: "CVT",
      price: "5,480,000",
      highlight: "人気グレード・即納可能",
      tag: "人気",
    },
  ]

  return (
    <div className="space-y-4">
      <SectionHeader
        icon={<Icons.Star className="h-5 w-5 text-primary" />}
        title="本日の注目在庫"
        action={
          <Button variant="primary" size="sm">
            <Icons.Graph className="mr-1 h-4 w-4" />
            もっと見る
          </Button>
        }
      />

      <div className="flex gap-4 overflow-x-auto">
        {featuredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            maker={vehicle.maker}
            model={vehicle.model}
            badge={
              <Badge className="bg-background text-black hover:bg-yellow-500">{vehicle.tag}</Badge>
            }
            header={
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">
                  {vehicle.year} {vehicle.maker} {vehicle.model}
                </h3>
                <span className="text-xl font-bold text-primary">¥{vehicle.price}</span>
              </div>
            }
            specs={
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icons.Settings className="h-3 w-3" />
                  <span>{vehicle.grade}</span>
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
                <div className="flex items-center space-x-1">
                  <span>{vehicle.transmission}</span>
                </div>
              </div>
            }
            footer={
              <div className="flex space-x-2 pt-2">
                <Button variant="primary" size="sm" className="flex-1 bg-transparent">
                  <Icons.Visibility className="mr-1 h-4 w-4" />
                  詳細を見る
                </Button>
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  申込
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}
