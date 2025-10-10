"use client"

import { X, Calendar, Gauge, Palette, Settings, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Vehicle {
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
  totalPayment?: string
  vehiclePrice?: string
  expenses?: string
  rating: string
  location: string
  isNew: boolean
}

interface VehicleComparisonProps {
  vehicles: Vehicle[]
  negotiationMode: boolean
  onClose: () => void
}

export function VehicleComparison({ vehicles, negotiationMode, onClose }: VehicleComparisonProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-auto bg-white">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold">車両比較 ({vehicles.length}台)</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-border bg-muted p-3 text-left font-semibold min-w-[150px] sticky left-0 z-10">
                    項目
                  </th>
                  {vehicles.map((vehicle) => (
                    <th key={vehicle.id} className="border border-border bg-muted p-3 text-center min-w-[200px]">
                      <div className="font-semibold">
                        {vehicle.year} {vehicle.maker}
                      </div>
                      <div className="text-sm font-normal text-muted-foreground">{vehicle.model}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 出品番号 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">出品番号</td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.listingNumber}
                    </td>
                  ))}
                </tr>

                {/* 価格 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    {negotiationMode ? "支払総額" : "価格"}
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      <div className="text-lg font-bold text-primary">
                        ¥{negotiationMode ? vehicle.totalPayment : vehicle.price}
                      </div>
                      {negotiationMode && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <div>車両: ¥{vehicle.vehiclePrice}</div>
                          <div>諸費用: ¥{vehicle.expenses}</div>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>

                {/* グレード */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">グレード</td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.grade}
                    </td>
                  ))}
                </tr>

                {/* 型式 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <Settings className="w-4 h-4 inline mr-1" />
                    型式
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.type}
                    </td>
                  ))}
                </tr>

                {/* 排気量 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <Gauge className="w-4 h-4 inline mr-1" />
                    排気量
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.displacement}
                    </td>
                  ))}
                </tr>

                {/* 走行距離 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">走行距離</td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.mileage}
                    </td>
                  ))}
                </tr>

                {/* 車検 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    車検
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.inspection}
                    </td>
                  ))}
                </tr>

                {/* 色 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <Palette className="w-4 h-4 inline mr-1" />色
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.color}
                    </td>
                  ))}
                </tr>

                {/* シフト */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">シフト</td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.transmission}
                    </td>
                  ))}
                </tr>

                {/* 所在地 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    所在地
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      {vehicle.location}
                    </td>
                  ))}
                </tr>

                {/* 評価 */}
                <tr>
                  <td className="border border-border p-3 font-medium bg-muted/50 sticky left-0 z-10">
                    <Star className="w-4 h-4 inline mr-1" />
                    評価
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="border border-border p-3 text-center">
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{vehicle.rating}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose} variant="outline">
              閉じる
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
