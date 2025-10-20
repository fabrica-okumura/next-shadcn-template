"use client"

import { Icon } from "@/components/ui/icon"
import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilterChips } from "@/components/shared/filter-chips"
import { SearchInput } from "@/components/shared/search-input"
import { useState } from "react"
import Image from "next/image"

type ProcurementStatus = "連絡待ち" | "審査中" | "落札手続き" | "陸送手配／輸送中" | "完了"

interface ProcurementVehicle {
  id: string
  name: string
  maker: string
  year: number
  mileage: string
  price: string
  image: string
  status: ProcurementStatus
  auctionHouse: string
  auctionDate: string
  location: string
  estimatedArrival?: string
  completedDate?: string
  notes?: string
}

const mockProcurementVehicles: ProcurementVehicle[] = [
  {
    id: "p1",
    name: "プリウス",
    maker: "トヨタ",
    year: 2021,
    mileage: "2.5万km",
    price: "280万円",
    image: "/toyota-prius-vehicle-wireframe.jpg",
    status: "連絡待ち",
    auctionHouse: "USS東京",
    auctionDate: "2024-01-20",
    location: "東京",
    notes: "出品者への確認事項あり",
  },
  {
    id: "p2",
    name: "ヴェゼル",
    maker: "ホンダ",
    year: 2022,
    mileage: "1.8万km",
    price: "320万円",
    image: "/honda-vezel-suv-wireframe.jpg",
    status: "審査中",
    auctionHouse: "TAA横浜",
    auctionDate: "2024-01-18",
    location: "神奈川",
    notes: "修復歴の詳細確認中",
  },
  {
    id: "p3",
    name: "アルファード",
    maker: "トヨタ",
    year: 2020,
    mileage: "4.2万km",
    price: "450万円",
    image: "/toyota-alphard-van-wireframe.jpg",
    status: "落札手続き",
    auctionHouse: "USS名古屋",
    auctionDate: "2024-01-15",
    location: "愛知",
    notes: "書類準備中",
  },
  {
    id: "p4",
    name: "CX-5",
    maker: "マツダ",
    year: 2021,
    mileage: "3.1万km",
    price: "310万円",
    image: "/mazda-cx5-suv-wireframe.jpg",
    status: "陸送手配／輸送中",
    auctionHouse: "JAA大阪",
    auctionDate: "2024-01-10",
    location: "大阪",
    estimatedArrival: "2024-01-25",
    notes: "陸送業者: 〇〇運輸",
  },
  {
    id: "p5",
    name: "ノート",
    maker: "日産",
    year: 2022,
    mileage: "1.5万km",
    price: "180万円",
    image: "/nissan-note-compact-wireframe.jpg",
    status: "審査中",
    auctionHouse: "USS東京",
    auctionDate: "2024-01-19",
    location: "東京",
  },
  {
    id: "p6",
    name: "フォレスター",
    maker: "スバル",
    year: 2021,
    mileage: "2.8万km",
    price: "340万円",
    image: "/subaru-forester-suv-wireframe.jpg",
    status: "陸送手配／輸送中",
    auctionHouse: "TAA仙台",
    auctionDate: "2024-01-12",
    location: "宮城",
    estimatedArrival: "2024-01-26",
  },
  {
    id: "p7",
    name: "レクサス LS",
    maker: "レクサス",
    year: 2020,
    mileage: "3.5万km",
    price: "580万円",
    image: "/lexus-sedan-luxury-wireframe.jpg",
    status: "完了",
    auctionHouse: "USS東京",
    auctionDate: "2024-01-05",
    location: "東京",
    completedDate: "2024-01-22",
    notes: "在庫登録完了",
  },
  {
    id: "p8",
    name: "プリウス",
    maker: "トヨタ",
    year: 2022,
    mileage: "1.2万km",
    price: "295万円",
    image: "/toyota-prius-vehicle-wireframe.jpg",
    status: "完了",
    auctionHouse: "TAA横浜",
    auctionDate: "2024-01-08",
    location: "神奈川",
    completedDate: "2024-01-23",
    notes: "在庫登録完了・展示準備済み",
  },
]

const STATUS_FILTERS: (ProcurementStatus | "全て")[] = [
  "全て",
  "連絡待ち",
  "審査中",
  "落札手続き",
  "陸送手配／輸送中",
  "完了",
]

export function ProcurementList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<ProcurementStatus | "全て">("全て")

  const filteredVehicles = mockProcurementVehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.maker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.auctionHouse.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === "全て" || vehicle.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: ProcurementStatus) => {
    switch (status) {
      case "連絡待ち":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "審査中":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "落札手続き":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
      case "陸送手配／輸送中":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "完了":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: ProcurementStatus) => {
    switch (status) {
      case "連絡待ち":
        return <Icon name="clock" className="w-4 h-4" />
      case "審査中":
        return <Icon name="multiple-documents" className="w-4 h-4" />
      case "落札手続き":
        return <Icon name="good" className="w-4 h-4" />
      case "陸送手配／輸送中":
        return <Icon name="car" className="w-4 h-4" />
      case "完了":
        return <Icon name="good" className="w-4 h-4" />
    }
  }

  const getStatusCount = (status: ProcurementStatus | "全て") => {
    if (status === "全て") return mockProcurementVehicles.length
    return mockProcurementVehicles.filter((v) => v.status === status).length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">仕入れ車両一覧</h1>
        <Button>新規仕入れ追加</Button>
      </div>

      <FilterChips items={STATUS_FILTERS} value={selectedStatus} onChange={setSelectedStatus} getCount={getStatusCount} />

      <SearchInput
        placeholder="車両名、メーカー、オークション会場で検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid gap-4">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-64 h-48 md:h-auto bg-muted">
                <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        {vehicle.maker} {vehicle.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(vehicle.status)}`}
                      >
                        {getStatusIcon(vehicle.status)}
                        {vehicle.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{vehicle.year}年式</span>
                      <span>{vehicle.mileage}</span>
                      <span className="text-lg font-semibold text-foreground">{vehicle.price}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="garage" className="w-4 h-4" />
                    <span>{vehicle.auctionHouse}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="calendar" className="w-4 h-4" />
                    <span>オークション日: {vehicle.auctionDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="car" className="w-4 h-4" />
                    <span>{vehicle.location}</span>
                  </div>
                  {vehicle.estimatedArrival && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="car" className="w-4 h-4" />
                      <span>到着予定: {vehicle.estimatedArrival}</span>
                    </div>
                  )}
                  {vehicle.completedDate && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="checkmark-circle" className="w-4 h-4" />
                      <span>完了日: {vehicle.completedDate}</span>
                    </div>
                  )}
                </div>

                {vehicle.notes && (
                  <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground border">
                    <span className="font-medium">備考: </span>
                    {vehicle.notes}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="primary" size="sm">
                    詳細
                  </Button>
                  <Button variant="primary" size="sm">
                    ステータス更新
                  </Button>
                  <Button variant="primary" size="sm">
                    書類管理
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>該当する仕入れ車両が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}

