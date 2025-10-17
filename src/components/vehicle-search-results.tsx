"use client"

import { Icons } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { VehicleCardNegotiation } from "./vehicle-card-negotiation"
import { Card } from "@/components/ui/card"

type VehicleSearchResultsProps = {
  negotiationMode: boolean
  negotiationId: string | null
  onVehicleClick: (vehicleId: string) => void
  onClose?: () => void
}

type SortField = "year" | "mileage" | "rating" | "price" | null
type SortDirection = "asc" | "desc"

export function VehicleSearchResults({
  negotiationMode,
  negotiationId,
  onVehicleClick,
}: VehicleSearchResultsProps) {
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedVehicles, setSelectedVehicles] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<"card" | "table">("card")
  const [showZeroResults, setShowZeroResults] = useState(false)

  const itemsPerPage = 10
  const router = useRouter()

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const vehicles = [
    {
      id: 1,
      listingNumber: "A-12345",
      favorite: false,
      image: "/toyota-prius-vehicle-wireframe.jpg",
      images: ["/vehicle-front-wireframe.jpg", "/vehicle-side-wireframe.jpg", "/vehicle-rear-wireframe.jpg"],
      location: "東京都",
      year: 2022,
      maker: "トヨタ",
      model: "プリウス",
      grade: "S",
      modelType: "DAA-ZVW51",
      mileage: 25000,
      transmission: "CVT",
      color: "シルバー",
      rating: 4.5,
      inspection: "2025/03",
      price: 2580,
      totalPayment: 271.6,
      vehiclePrice: 258.0,
      expenses: 13.6,
      displacement: "1800cc",
      capacity: 5,
      repairHistory: "なし",
      listingPeriod: "2024/01/15",
      isNew: true,
      isPriceDown: false,
      isInNegotiation: false,
      matchScore: 85,
      conditionMatch: "年式○ / 走行○ / 修復歴○ / 価格○",
      dealer: {
        name: "ラボールコーポレーション本店",
        location: "東京都町田市鶴間",
        rating: 5.0,
        reviewCount: 2,
        phone: "0078-6015-10857",
      },
    },
    {
      id: 2,
      listingNumber: "B-23456",
      favorite: true,
      image: "/honda-vezel-suv-wireframe.jpg",
      images: ["/vehicle-front-wireframe.jpg", "/vehicle-side-wireframe.jpg", "/vehicle-rear-wireframe.jpg"],
      location: "神奈川県",
      year: 2021,
      maker: "ホンダ",
      model: "ヴェゼル",
      grade: "HYBRID X",
      modelType: "6AA-RV6",
      mileage: 18500,
      transmission: "CVT",
      color: "ホワイト",
      rating: 4.0,
      inspection: "2024/11",
      price: 2980,
      totalPayment: 313.8,
      vehiclePrice: 298.0,
      expenses: 15.8,
      displacement: "1500cc",
      capacity: 5,
      repairHistory: "なし",
      listingPeriod: "2024/01/10",
      isNew: false,
      isPriceDown: true,
      isInNegotiation: true,
      matchScore: 92,
      conditionMatch: "年式◎ / 走行◎ / 修復歴○ / 価格○",
      dealer: {
        name: "横浜オートセンター",
        location: "神奈川県横浜市",
        rating: 4.8,
        reviewCount: 15,
        phone: "0078-6015-20123",
      },
    },
    {
      id: 3,
      listingNumber: "C-34567",
      favorite: false,
      image: "/nissan-note-compact-wireframe.jpg",
      images: ["/vehicle-front-wireframe.jpg", "/vehicle-side-wireframe.jpg", "/vehicle-rear-wireframe.jpg"],
      location: "埼玉県",
      year: 2023,
      maker: "ニッサン",
      model: "ノート",
      grade: "X",
      modelType: "5AA-E13",
      mileage: 12000,
      transmission: "CVT",
      color: "ブルー",
      rating: 4.8,
      inspection: "2026/01",
      price: 1980,
      totalPayment: 210.2,
      vehiclePrice: 198.0,
      expenses: 12.2,
      displacement: "1200cc",
      capacity: 5,
      repairHistory: "なし",
      listingPeriod: "2024/01/20",
      isNew: true,
      isPriceDown: false,
      isInNegotiation: false,
      matchScore: 78,
      conditionMatch: "年式◎ / 走行◎ / 修復歴○ / 価格△",
      dealer: {
        name: "埼玉カーセールス",
        location: "埼玉県さいたま市",
        rating: 4.5,
        reviewCount: 8,
        phone: "0078-6015-30456",
      },
    },
    {
      id: 4,
      listingNumber: "D-45678",
      favorite: false,
      image: "/mazda-cx5-suv-wireframe.jpg",
      images: ["/vehicle-front-wireframe.jpg", "/vehicle-side-wireframe.jpg", "/vehicle-rear-wireframe.jpg"],
      location: "千葉県",
      year: 2020,
      maker: "マツダ",
      model: "CX-5",
      grade: "25S",
      modelType: "3DA-KF2P",
      mileage: 35000,
      transmission: "6AT",
      color: "レッド",
      rating: 4.2,
      inspection: "2025/08",
      price: 2780,
      totalPayment: 292.4,
      vehiclePrice: 278.0,
      expenses: 14.4,
      displacement: "2500cc",
      capacity: 5,
      repairHistory: "なし",
      listingPeriod: "2024/01/05",
      isNew: false,
      isPriceDown: false,
      isInNegotiation: false,
      matchScore: 65,
      conditionMatch: "年式○ / 走行△ / 修復歴○ / 価格○",
      dealer: {
        name: "千葉モータース",
        location: "千葉県千葉市",
        rating: 4.3,
        reviewCount: 12,
        phone: "0078-6015-40789",
      },
    },
    {
      id: 5,
      listingNumber: "E-56789",
      favorite: true,
      image: "/subaru-forester-suv-wireframe.jpg",
      images: ["/vehicle-front-wireframe.jpg", "/vehicle-side-wireframe.jpg", "/vehicle-rear-wireframe.jpg"],
      location: "東京都",
      year: 2022,
      maker: "スバル",
      model: "フォレスター",
      grade: "Touring",
      modelType: "5BA-SK9",
      mileage: 22000,
      transmission: "CVT",
      color: "グリーン",
      rating: 4.6,
      inspection: "2025/05",
      price: 3180,
      totalPayment: 333.8,
      vehiclePrice: 318.0,
      expenses: 15.8,
      displacement: "2000cc",
      capacity: 5,
      repairHistory: "なし",
      listingPeriod: "2024/01/12",
      isNew: false,
      isPriceDown: false,
      isInNegotiation: false,
      matchScore: 88,
      conditionMatch: "年式◎ / 走行◎ / 修復歴○ / 価格○",
      dealer: {
        name: "東京スバル販売",
        location: "東京都新宿区",
        rating: 4.7,
        reviewCount: 20,
        phone: "0078-6015-50912",
      },
    },
  ]

  const totalItems = showZeroResults ? 0 : 127
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const displayedVehicles = showZeroResults ? [] : vehicles

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleSaveCondition = () => {
    router.push("/conditions")
  }

  const handleVehicleSelect = (vehicleId: number, checked: boolean) => {
    const newSelected = new Set(selectedVehicles)
    if (checked) {
      newSelected.add(vehicleId)
    } else {
      newSelected.delete(vehicleId)
    }
    setSelectedVehicles(newSelected)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVehicles(new Set(vehicles.map((v) => v.id)))
    } else {
      setSelectedVehicles(new Set())
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <Icons.ArrowUp className="w-3 h-3 ml-1" />
    }
    return sortDirection === "asc" ? <Icons.ArrowUp className="w-3 h-3 ml-1" /> : <Icons.ArrowDown className="w-3 h-3 ml-1" />
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">検索結果</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">該当: {totalItems}台</span>
          {negotiationId && (
            <span className="text-sm text-muted-foreground px-3 py-1 bg-primary/10 rounded-full">
              商談ID: {negotiationId}
            </span>
          )}
          {negotiationMode && (
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant="primary"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setViewMode("card")}
              >
                <Icons.DotsVertical className="w-4 h-4" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setViewMode("table")}
              >
                <Icons.List className="w-4 h-4" />
              </Button>
            </div>
          )}
          <Button size="sm" onClick={handleSaveCondition} className="min-w-[120px] h-10">
            検索条件を保存
          </Button>
        </div>
      </div>

      {showZeroResults ? (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Icons.Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">検索条件に一致する車両が見つかりませんでした</h3>
              <p className="text-muted-foreground max-w-md">
                現在、ご指定の条件に合う車両の在庫がございません。
                検索条件を保存して通知を受け取ることで、条件に合う車両が入荷次第お知らせいたします。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <Button size="md" className="flex-1 gap-2" onClick={handleSaveCondition}>
                <Icons.StarOutline className="w-4 h-4" />
                検索条件を保存して通知を受け取る
              </Button>
              <Button
                size="md"
                className="flex-1"
                onClick={() => {
                  // Reset search or modify conditions
                  console.log("Modify search conditions")
                }}
              >
                検索条件を変更
              </Button>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>💡 検索のヒント:</p>
              <ul className="text-left space-y-1 ml-4">
                <li>• 価格帯を広げてみる</li>
                <li>• 年式の範囲を広げてみる</li>
                <li>• 走行距離の条件を緩和してみる</li>
                <li>• 地域を拡大してみる</li>
              </ul>
            </div>
          </div>
        </Card>
      ) : negotiationMode && viewMode === "card" ? (
        <div className="space-y-3">
          {displayedVehicles.map((vehicle) => (
            <VehicleCardNegotiation
              key={vehicle.id}
              vehicle={vehicle}
              selected={selectedVehicles.has(vehicle.id)}
              onSelect={(checked) => handleVehicleSelect(vehicle.id, checked)}
              onClick={() => onVehicleClick(vehicle.listingNumber)}
              onFavoriteToggle={() => {
                console.log("Toggle favorite:", vehicle.id)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold sticky left-0 bg-muted z-20">
                    <Icons.StarOutline
                      className={`w-5 h-5 cursor-pointer transition-colors ${
                        selectedVehicles.size === vehicles.length
                          ? "fill-red-400 text-red-400"
                          : "text-muted-foreground hover:text-red-400"
                      }`}
                      onClick={() => handleSelectAll(selectedVehicles.size !== vehicles.length)}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[100px] sticky left-[52px] bg-muted z-20">
                    写真
                  </th>
                  {negotiationMode ? (
                    <>
                      <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px] sticky left-[180px] bg-muted z-20">
                        <button
                          onClick={() => handleSort("price")}
                          className="flex items-center hover:text-primary transition-colors"
                        >
                          支払総額(千円)
                          <SortIcon field="price" />
                        </button>
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px]">車両価格(千円)</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px]">諸費用(千円)</th>
                    </>
                  ) : (
                    <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px] sticky left-[180px] bg-muted z-20">
                      <button
                        onClick={() => handleSort("price")}
                        className="flex items-center hover:text-primary transition-colors"
                      >
                        業販価格(千円)
                        <SortIcon field="price" />
                      </button>
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[100px]">所在地</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[80px]">
                    <button
                      onClick={() => handleSort("year")}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      年式
                      <SortIcon field="year" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[180px]">
                    <div>出品番号/メーカー</div>
                    <div>車名/グレード</div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px]">型式</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[100px]">
                    <button
                      onClick={() => handleSort("mileage")}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      走行距離
                      <SortIcon field="mileage" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[80px]">シフト</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[80px]">色</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[80px]">
                    <button
                      onClick={() => handleSort("rating")}
                      className="flex items-center hover:text-primary transition-colors"
                    >
                      評価点
                      <SortIcon field="rating" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[100px]">車検</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold min-w-[120px]">掲載期間</th>
                </tr>
              </thead>
              <tbody>
                {displayedVehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle.id}
                    className={`border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/20"
                    }`}
                    onClick={() => onVehicleClick(vehicle.listingNumber)} // Added click handler to navigate to detail
                  >
                    <td className="px-4 py-3 sticky left-0 bg-inherit z-10">
                      <Icons.StarOutline
                        className={`w-5 h-5 cursor-pointer transition-colors ${
                          selectedVehicles.has(vehicle.id)
                            ? "fill-red-400 text-red-400"
                            : "text-muted-foreground hover:text-red-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVehicleSelect(vehicle.id, !selectedVehicles.has(vehicle.id))
                        }}
                      />
                    </td>
                    <td className="px-4 py-3 sticky left-[52px] bg-inherit z-10">
                      <div className="w-20 h-14 bg-muted border border-border rounded overflow-hidden relative">
                        <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={`${vehicle.maker} ${vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    {negotiationMode ? (
                      <>
                        <td className="px-4 py-3 text-sm font-semibold text-primary sticky left-[180px] bg-inherit z-10">
                          ¥{vehicle.totalPayment.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">¥{vehicle.vehiclePrice.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">¥{vehicle.expenses.toLocaleString()}</td>
                      </>
                    ) : (
                      <td className="px-4 py-3 text-sm font-semibold text-primary sticky left-[180px] bg-inherit z-10">
                        ¥{vehicle.price.toLocaleString()}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm">{vehicle.location}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.year}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm space-y-1">
                        <div>
                          {vehicle.listingNumber} / {vehicle.maker}
                        </div>
                        <div>
                          {vehicle.model} / {vehicle.grade}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{vehicle.modelType}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.mileage.toLocaleString()}km</td>
                    <td className="px-4 py-3 text-sm">{vehicle.transmission}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.color}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.rating}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.inspection}</td>
                    <td className="px-4 py-3 text-sm">{vehicle.listingPeriod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!showZeroResults && (
        <div className="flex justify-end items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {startIndex + 1}-{endIndex} / {totalItems}件
          </span>
          <div className="flex gap-1">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <Icons.ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <Icons.ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowZeroResults(!showZeroResults)}
          className="shadow-lg"
        >
          {showZeroResults ? "結果を表示" : "0件表示"}
        </Button>
      </div>
    </div>
  )
}
