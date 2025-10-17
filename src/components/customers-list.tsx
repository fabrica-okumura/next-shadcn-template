"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilterChips } from "@/components/shared/filter-chips"
import { SearchInput } from "@/components/shared/search-input"
import { Icons } from "@/components/ui/icon"
import { useState } from "react"

interface Customer {
  id: string
  name: string
  company: string
  email: string
  phone: string
  lastContact: string
  status: "active" | "pending" | "inactive"
  negotiations: {
    id: string
    title: string
    searchConditions: string[]
    updatedAt: string
  }[]
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "山田太郎",
    company: "株式会社サンプル",
    email: "yamada@example.com",
    phone: "03-1234-5678",
    lastContact: "2024-01-15",
    status: "active",
    negotiations: [
      {
        id: "n1",
        title: "新規車両購入",
        searchConditions: ["予算: 300-400万円", "車種: SUV", "年式: 2020年以降", "走行距離: 3万km以下"],
        updatedAt: "2024-01-15",
      },
      {
        id: "n2",
        title: "セカンドカー検討",
        searchConditions: ["予算: 150-200万円", "車種: コンパクトカー", "燃費重視"],
        updatedAt: "2024-01-10",
      },
    ],
  },
  {
    id: "2",
    name: "佐藤花子",
    company: "テスト商事",
    email: "sato@test.com",
    phone: "03-8765-4321",
    lastContact: "2024-01-10",
    status: "active",
    negotiations: [
      {
        id: "n3",
        title: "社用車リース",
        searchConditions: ["予算: 250万円", "車種: セダン", "カラー: 黒または白", "オプション: ナビ必須"],
        updatedAt: "2024-01-10",
      },
    ],
  },
  {
    id: "3",
    name: "鈴木一郎",
    company: "デモ株式会社",
    email: "suzuki@demo.com",
    phone: "03-5555-6666",
    lastContact: "2023-12-20",
    status: "pending",
    negotiations: [
      {
        id: "n4",
        title: "ファミリーカー購入",
        searchConditions: ["予算: 400-500万円", "車種: ミニバン", "7人乗り以上", "スライドドア"],
        updatedAt: "2023-12-20",
      },
      {
        id: "n5",
        title: "下取り車査定",
        searchConditions: ["車種: プリウス", "年式: 2015年", "走行距離: 8万km"],
        updatedAt: "2023-12-18",
      },
      {
        id: "n6",
        title: "ローン相談",
        searchConditions: ["期間: 5年", "頭金: 100万円"],
        updatedAt: "2023-12-15",
      },
    ],
  },
  {
    id: "4",
    name: "田中美咲",
    company: "サンプル工業",
    email: "tanaka@sample.com",
    phone: "03-7777-8888",
    lastContact: "2023-11-30",
    status: "inactive",
    negotiations: [],
  },
]

const KANA_FILTERS = ["全て", "あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"]

const getKanaGroup = (name: string): string => {
  const firstChar = name.charAt(0)
  const kanaMap: { [key: string]: string } = {
    あ: "あいうえお",
    か: "かきくけこがぎぐげご",
    さ: "さしすせそざじずぜぞ",
    た: "たちつてとだぢづでど",
    な: "なにぬねの",
    は: "はひふへほばびぶべぼぱぴぷぺぽ",
    ま: "まみむめも",
    や: "やゆよ",
    ら: "らりるれろ",
    わ: "わをん",
  }

  for (const [group, chars] of Object.entries(kanaMap)) {
    if (chars.includes(firstChar)) {
      return group
    }
  }
  return "その他"
}

export function CustomersList({ onNegotiationClick }: { onNegotiationClick?: (negotiationId: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedKana, setSelectedKana] = useState("全て")

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesKana = selectedKana === "全て" || getKanaGroup(customer.name) === selectedKana

    return matchesSearch && matchesKana
  })

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "inactive":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  const getStatusLabel = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "アクティブ"
      case "pending":
        return "保留中"
      case "inactive":
        return "非アクティブ"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">商談一覧</h1>
        <Button>新規商談追加</Button>
      </div>

      <FilterChips items={KANA_FILTERS} value={selectedKana} onChange={setSelectedKana} />

      <SearchInput
        placeholder="担当者名、会社名、メールアドレスで検索..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{customer.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                    {getStatusLabel(customer.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icons.Garage className="w-4 h-4" />
                    <span>{customer.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.IconMail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.IconMail className="w-4 h-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Calendar className="w-4 h-4" />
                    <span>最終連絡: {customer.lastContact}</span>
                  </div>
                </div>

                {customer.negotiations.length > 0 && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icons.MultipleDocuments className="w-4 h-4" />
                      <span>商談中の検索条件 ({customer.negotiations.length}件)</span>
                    </div>
                    <div className="space-y-2">
                      {customer.negotiations.map((negotiation) => (
                        <div
                          key={negotiation.id}
                          onClick={() => onNegotiationClick?.(negotiation.id)}
                          className="pl-6 border-l-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer rounded-r p-2 -ml-2"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-medium">{negotiation.title}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {negotiation.updatedAt}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {negotiation.searchConditions.map((condition, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-primary/5 text-primary text-xs rounded border border-primary/10"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  詳細
                </Button>
                <Button variant="primary" size="sm">
                  編集
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>該当する商談が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
