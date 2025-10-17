"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/ui/icon"
import Image from 'next/image'

interface VehicleDetailProps {
  vehicleId: string
  onBack: () => void
  onPrevious?: () => void
  onNext?: () => void
}

export function VehicleDetail({ vehicleId, onBack, onPrevious, onNext }: VehicleDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [imageCategory, setImageCategory] = useState<"all" | "exterior" | "interior" | "features" | "damage">("all")
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [notificationConditions, setNotificationConditions] = useState({
    maker: "",
    model: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
    colors: [] as string[],
    transmission: "",
    fuel: "",
    drive: "",
    notifyEmail: true,
    notifyApp: true,
  })

  const vehicle = {
    id: vehicleId,
    listingNumber: "A-12345",
    maker: "トヨタ",
    model: "ランドクルーザー250",
    grade: "VX",
    year: 2024,
    location: "東京都",
    listingDeadline: "2024/02/15",
    totalPayment: 271.6,
    vehiclePrice: 258.0,
    expenses: 13.6,
    feeNote: "※陸送費・登録費用別途",
    overallRating: 4.5,
    interiorRating: 4.0,
    summary: "登録時走行30km・ワンオーナー",
    images: [
      { url: "/toyota-alphard-white-van.jpg", category: "exterior" },
      { url: "/lexus-sedan-luxury-car.jpg", category: "interior" },
      { url: "/toyota-prius-silver-car.jpg", category: "features" },
      { url: "/honda-vezel-white-suv.jpg", category: "exterior" },
      { url: "/mazda-cx5-red-suv.jpg", category: "damage" },
    ],
    specs: {
      chassisNumber: "****-123456",
      modelType: "3BA-TJAL10W",
      categoryCode: "12345",
      mileage: 30,
      inspection: "2027/01",
      color: "ホワイトパールクリスタルシャイン",
      colorCode: "070",
      displacement: 2700,
      fuel: "ガソリン",
      drive: "4WD",
      transmission: "8AT",
      capacity: 7,
      doors: 5,
      recycleTicket: "あり",
      steering: "右",
      plateType: "3ナンバー",
      importType: "国内正規",
      meterNote: "メーター交換歴なし",
    },
    highlights: [
      "サンルーフ",
      "本革シート（ブラック）",
      "全方位カメラ",
      "パワーバックドア",
      "3列シート",
      "LEDヘッドライト",
      "クルーズコントロール",
    ],
    equipment: {
      safety: ["衝突被害軽減ブレーキ", "車線逸脱警報", "オートハイビーム", "BSM"],
      comfort: ["パワーシート", "シートヒーター", "オートエアコン", "ステアリングヒーター"],
      interior: ["本革シート", "ウッドパネル", "アンビエントライト"],
      assist: ["パーキングアシスト", "全方位カメラ", "クルーズコントロール"],
      key: ["スマートキー×2"],
      documents: ["取扱説明書", "整備手帳", "保証書"],
    },
    condition: {
      damages: [
        { location: "フロントバンパー", code: "A1", note: "小傷", area: "front" },
        { location: "右フロントドア", code: "W1", note: "線傷", area: "right-front-door" },
      ],
      aiSummary: "再塗装歴なし。小傷のみで全体的に良好な状態です。再販時の影響は軽微と判断されます。",
    },
    inspectionSheet: "https://imgl.asnet2.com/ASDATA/15/L/00006718/1567182724o.jpg",
    marketData: {
      priceRange: { min: 6500, max: 7200, median: 6850 },
      estimatedRetailPrice: 8500,
      estimatedProfit: 1700,
      profitMargin: 20,
      estimatedTurnoverDays: 45,
    },
    matchScore: 92,
    sellerScore: {
      overall: 4.8,
      transactions: 1250,
      refundRate: 0.5,
      complaintRate: 0.2,
    },
    logistics: {
      shippingEstimate: 85,
      leadTime: "7-10日",
      paymentTerms: "後払い可（要審査）",
      creditLimit: 5000,
    },
    status: "連絡待ち",
  }

  const handleOpenNotificationModal = () => {
    setNotificationConditions({
      maker: vehicle.maker,
      model: vehicle.model,
      yearFrom: (vehicle.year - 2).toString(),
      yearTo: (vehicle.year + 2).toString(),
      priceFrom: (vehicle.vehiclePrice - 5).toString(),
      priceTo: (vehicle.vehiclePrice + 5).toString(),
      mileageFrom: "0",
      mileageTo: "50000",
      colors: [vehicle.specs.color],
      transmission: vehicle.specs.transmission,
      fuel: vehicle.specs.fuel,
      drive: vehicle.specs.drive,
      notifyEmail: true,
      notifyApp: true,
    })
    setShowNotificationModal(true)
  }

  const handleSaveNotification = () => {
    console.log("[v0] Saving notification conditions:", notificationConditions)
    // In a real app, this would save to backend
    setShowNotificationModal(false)
    // Show success message (could use toast notification)
    alert("通知設定を保存しました")
  }

  const filteredImages =
    imageCategory === "all" ? vehicle.images : vehicle.images.filter((img) => img.category === imageCategory)

  const statusConfig = {
    連絡待ち: { color: "bg-blue-500", icon: Icons.StarOutline },
    審査中: { color: "bg-yellow-500", icon: Icons.Error },
    落札手続き: { color: "bg-orange-500", icon: Icons.MultipleDocuments },
    "陸送手配／輸送中": { color: "bg-purple-500", icon: Icons.Car },
    入庫完了: { color: "bg-green-500", icon: Icons.Good },
  }

  const currentStatus = statusConfig[vehicle.status as keyof typeof statusConfig]
  const StatusIcon = currentStatus.icon

  const filteredDamages = vehicle.condition.damages

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6 mt-6">
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={onBack} className="bg-transparent">
            <Icons.ArrowLeft className="w-4 h-4 mr-2" />
            一覧へ戻る
          </Button>
          {onPrevious && (
            <Button variant="primary" size="sm" onClick={onPrevious} className="bg-transparent">
              <Icons.ArrowLeft className="w-4 h-4 mr-2" />
              前の車両
            </Button>
          )}
          {onNext && (
            <Button variant="primary" size="sm" onClick={onNext} className="bg-transparent">
              次の車両
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => setIsFavorite(!isFavorite)} className="bg-transparent">
            <Icons.StarOutline className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            お気に入り
          </Button>
          <Button variant="primary" size="sm" className="bg-transparent">
            <Icons.Printe className="w-4 h-4 mr-2" />
            印刷
          </Button>
        </div>
      </div>

      {/* Title Section */}
      <Card className="text-xs text-muted-foreground whitespace-nowrap font-bold mx-0 px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {vehicle.maker} {vehicle.model} {vehicle.grade}
              </h1>
              <Badge variant="default" className={`${currentStatus.color} text-white border-0`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {vehicle.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icons.Calendar className="w-4 h-4" />
                {vehicle.year}年式
              </span>
              <span className="flex items-center gap-1">
                <Icons.Car className="w-4 h-4" />
                {vehicle.location}
              </span>
              <span>出品番号: {vehicle.listingNumber}</span>
              <span className="text-red-500">掲載期限: {vehicle.listingDeadline}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icons.StarOutline
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(vehicle.overallRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">{vehicle.overallRating}</span>
                <span className="text-sm text-muted-foreground">（内装: {vehicle.interiorRating}）</span>
              </div>
              <span className="text-sm text-muted-foreground">{vehicle.summary}</span>
            </div>
          </div>
          <div className="text-right space-y-3">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-muted-foreground whitespace-nowrap font-bold text-sm">支払総額</span>
                <div className="text-3xl font-bold text-primary">
                  {vehicle.totalPayment}
                  <span className="text-sm font-normal text-muted-foreground ml-1">万円</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 justify-end text-sm">
                <span className="text-muted-foreground whitespace-nowrap">車両価格</span>
                <span className="font-semibold">
                  {vehicle.vehiclePrice}
                  <span className="text-xs text-muted-foreground ml-1">万円</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2 justify-end text-sm">
                <span className="text-muted-foreground whitespace-nowrap">諸費用</span>
                <span className="font-semibold">
                  {vehicle.expenses}
                  <span className="text-xs text-muted-foreground ml-1">万円</span>
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{vehicle.feeNote}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden group">
                <Image
                  src={filteredImages[selectedImage]?.url || "/placeholder.svg"}
                  alt="Vehicle"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full"
                />
                <Button
                  variant="primary"
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icons.Maximize className="w-4 h-4 mr-2" />
                  拡大
                </Button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant={imageCategory === "all" ? "primary" : "neutral"}
                  size="sm"
                  onClick={() => setImageCategory("all")}
                  className={imageCategory !== "all" ? "bg-transparent" : ""}
                >
                  すべて
                </Button>
                <Button
                  variant={imageCategory === "exterior" ? "primary" : "neutral"}
                  size="sm"
                  onClick={() => setImageCategory("exterior")}
                  className={imageCategory !== "exterior" ? "bg-transparent" : ""}
                >
                  外装
                </Button>
                <Button
                  variant={imageCategory === "interior" ? "primary" : "neutral"}
                  size="sm"
                  onClick={() => setImageCategory("interior")}
                  className={imageCategory !== "interior" ? "bg-transparent" : ""}
                >
                  内装
                </Button>
                <Button
                  variant={imageCategory === "features" ? "primary" : "neutral"}
                  size="sm"
                  onClick={() => setImageCategory("features")}
                  className={imageCategory !== "features" ? "bg-transparent" : ""}
                >
                  機能
                </Button>
                <Button
                  variant={imageCategory === "damage" ? "primary" : "neutral"}
                  size="sm"
                  onClick={() => setImageCategory("damage")}
                  className={imageCategory !== "damage" ? "bg-transparent" : ""}
                >
                  瑕疵
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {filteredImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img.url || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      width={400}
                      height={300}
                      className="rounded-lg object-cover grayscale"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Specs */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">主要スペック</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">車台番号</span>
                  <span className="text-sm font-medium">{vehicle.specs.chassisNumber}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">型式</span>
                  <span className="text-sm font-medium">{vehicle.specs.modelType}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.Graph className="w-4 h-4" />
                    走行距離
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.mileage.toLocaleString()}km</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">車検</span>
                  <span className="text-sm font-medium">{vehicle.specs.inspection}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.Settings className="w-4 h-4" />
                    外装色
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.color}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">色コード</span>
                  <span className="text-sm font-medium">{vehicle.specs.colorCode}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">排気量</span>
                  <span className="text-sm font-medium">{vehicle.specs.displacement}cc</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.Garage className="w-4 h-4" />
                    燃料
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.fuel}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.Settings className="w-4 h-4" />
                    駆動
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.drive}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">シフト</span>
                  <span className="text-sm font-medium">{vehicle.specs.transmission}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.CustomerManagement className="w-4 h-4" />
                    定員
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.capacity}人</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icons.Car className="w-4 h-4" />
                    ドア
                  </span>
                  <span className="text-sm font-medium">{vehicle.specs.doors}ドア</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">R券</span>
                  <span className="text-sm font-medium">{vehicle.specs.recycleTicket}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">ナンバー</span>
                  <span className="text-sm font-medium">{vehicle.specs.plateType}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Highlights */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">セールスポイント</h3>
            <div className="flex flex-wrap gap-2">
              {vehicle.highlights.map((highlight, idx) => (
                <Badge key={idx} variant="default" className="px-3 py-1">
                  {highlight}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Equipment */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">装備一覧</h3>
            <Tabs defaultValue="safety" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="safety">安全</TabsTrigger>
                <TabsTrigger value="comfort">快適</TabsTrigger>
                <TabsTrigger value="interior">内外装</TabsTrigger>
                <TabsTrigger value="assist">運転支援</TabsTrigger>
                <TabsTrigger value="key">キー</TabsTrigger>
                <TabsTrigger value="documents">書類</TabsTrigger>
              </TabsList>
              <TabsContent value="safety" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.safety.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="comfort" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.comfort.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="interior" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.interior.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="assist" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.assist.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="key" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.key.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="documents" className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.documents.map((item, idx) => (
                    <Badge key={idx} variant="default">
                      {item}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Condition */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">車両状態・検査情報</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-3">車両展開図</h4>
                <div className="relative bg-muted rounded-lg p-4">
                  <Image
                    src={vehicle.inspectionSheet || "/placeholder.svg"}
                    alt="車両展開図"
                    width={400}
                    height={300}
                    className="w-1/2 h-auto mx-auto"
                    useMap="#damage-map"
                  />
                  <map name="damage-map">{/* Interactive areas would be defined here in a production app */}</map>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">損傷・補修部位</h4>
                {filteredDamages.length > 0 ? (
                  <div className="space-y-2">
                    {filteredDamages.map((damage, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-muted rounded">
                        <Badge variant="default">{damage.code}</Badge>
                        <span className="text-sm font-medium">{damage.location}</span>
                        <span className="text-sm text-muted-foreground">{damage.note}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-2 bg-muted rounded">選択した部位に損傷はありません</p>
                )}
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Icons.Error className="w-4 h-4" />
                  AI コンディション要約
                </h4>
                <p className="text-sm text-muted-foreground">{vehicle.condition.aiSummary}</p>
              </div>
            </div>
          </Card>

          {/* Decision Support */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">意思決定支援</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icons.Graph className="w-4 h-4" />
                  相場・利益分析
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">相場レンジ</span>
                    <span className="font-medium">
                      ¥{vehicle.marketData.priceRange.min.toLocaleString()} - ¥
                      {vehicle.marketData.priceRange.max.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">中央値</span>
                    <span className="font-medium">¥{vehicle.marketData.priceRange.median.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">推定小売価格</span>
                    <span className="font-medium text-primary">
                      ¥{vehicle.marketData.estimatedRetailPrice.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">粗利見込み</span>
                    <span className="font-semibold text-green-600">
                      ¥{vehicle.marketData.estimatedProfit.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">利益率</span>
                    <span className="font-semibold text-green-600">{vehicle.marketData.profitMargin}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icons.Clock className="w-4 h-4" />
                  回転・適合度
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">回転日数目安</span>
                    <span className="font-medium">{vehicle.marketData.estimatedTurnoverDays}日</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">条件適合度</span>
                    <span className="font-semibold text-primary">{vehicle.matchScore}%</span>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${vehicle.matchScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icons.MultipleDocuments className="w-4 h-4" />
                  出品者信用
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">総合スコア</span>
                    <span className="font-semibold text-primary">{vehicle.sellerScore.overall}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">取引実績</span>
                    <span className="font-medium">{vehicle.sellerScore.transactions.toLocaleString()}件</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">返金対応率</span>
                    <span className="font-medium">{vehicle.sellerScore.refundRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">クレーム率</span>
                    <span className="font-medium">{vehicle.sellerScore.complaintRate}%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Icons.Car className="w-4 h-4" />
                  物流・資金
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">陸送概算</span>
                    <span className="font-medium">¥{vehicle.logistics.shippingEstimate.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">リードタイム</span>
                    <span className="font-medium">{vehicle.logistics.leadTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">支払条件</span>
                    <span className="font-medium">{vehicle.logistics.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">与信枠残</span>
                    <span className="font-medium">¥{vehicle.logistics.creditLimit.toLocaleString()}千円</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar - Actions */}
        <div className="space-y-4">
          <Card className="p-4 sticky top-24">
            <div className="space-y-2">
              <Button size="md" className="w-full bg-black text-white hover:bg-black/90">
                見積作成
              </Button>
              <Button variant="primary" className="w-full bg-transparent">
                比較に追加
              </Button>
              <Button variant="primary" className="w-full bg-transparent">
                  <Icons.SendOutline className="w-4 h-4 mr-2" />
                共有
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold mb-3">通知設定</h4>
              <div className="space-y-2">
                <Button variant="primary" size="sm" className="w-full justify-start bg-transparent">
                  <Icons.StarOutline className="w-4 h-4 mr-2" />
                  この車の更新を通知
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={handleOpenNotificationModal}
                >
                  <Icons.StarOutline className="w-4 h-4 mr-2" />
                  この条件の新着を通知
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showNotificationModal} onOpenChange={setShowNotificationModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新着通知の条件設定</DialogTitle>
            <DialogDescription>
              この車両の条件をベースに、新着通知を受け取る条件を設定できます。条件を変更して保存してください。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">基本条件</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maker">メーカー</Label>
                  <Input
                    id="maker"
                    value={notificationConditions.maker}
                    onChange={(e) => setNotificationConditions({ ...notificationConditions, maker: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">車種</Label>
                  <Input
                    id="model"
                    value={notificationConditions.model}
                    onChange={(e) => setNotificationConditions({ ...notificationConditions, model: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">年式</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearFrom">年式（開始）</Label>
                  <Input
                    id="yearFrom"
                    type="number"
                    value={notificationConditions.yearFrom}
                    onChange={(e) => setNotificationConditions({ ...notificationConditions, yearFrom: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearTo">年式（終了）</Label>
                  <Input
                    id="yearTo"
                    type="number"
                    value={notificationConditions.yearTo}
                    onChange={(e) => setNotificationConditions({ ...notificationConditions, yearTo: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">価格帯（千円）</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceFrom">価格（下限）</Label>
                  <Input
                    id="priceFrom"
                    type="number"
                    value={notificationConditions.priceFrom}
                    onChange={(e) =>
                      setNotificationConditions({ ...notificationConditions, priceFrom: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceTo">価格（上限）</Label>
                  <Input
                    id="priceTo"
                    type="number"
                    value={notificationConditions.priceTo}
                    onChange={(e) => setNotificationConditions({ ...notificationConditions, priceTo: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Mileage Range */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">走行距離（km）</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mileageFrom">走行距離（下限）</Label>
                  <Input
                    id="mileageFrom"
                    type="number"
                    value={notificationConditions.mileageFrom}
                    onChange={(e) =>
                      setNotificationConditions({ ...notificationConditions, mileageFrom: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mileageTo">走行距離（上限）</Label>
                  <Input
                    id="mileageTo"
                    type="number"
                    value={notificationConditions.mileageTo}
                    onChange={(e) =>
                      setNotificationConditions({ ...notificationConditions, mileageTo: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">スペック</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transmission">ミッション</Label>
                  <Select
                    value={notificationConditions.transmission}
                    onValueChange={(value) =>
                      setNotificationConditions({ ...notificationConditions, transmission: value })
                    }
                  >
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AT">AT</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                      <SelectItem value="8AT">8AT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuel">燃料</Label>
                  <Select
                    value={notificationConditions.fuel}
                    onValueChange={(value) => setNotificationConditions({ ...notificationConditions, fuel: value })}
                  >
                    <SelectTrigger id="fuel">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ガソリン">ガソリン</SelectItem>
                      <SelectItem value="ディーゼル">ディーゼル</SelectItem>
                      <SelectItem value="ハイブリッド">ハイブリッド</SelectItem>
                      <SelectItem value="電気">電気</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drive">駆動方式</Label>
                  <Select
                    value={notificationConditions.drive}
                    onValueChange={(value) => setNotificationConditions({ ...notificationConditions, drive: value })}
                  >
                    <SelectTrigger id="drive">
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2WD">2WD</SelectItem>
                      <SelectItem value="4WD">4WD</SelectItem>
                      <SelectItem value="AWD">AWD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notification Method */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">通知方法</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyEmail"
                    checked={notificationConditions.notifyEmail}
                    onCheckedChange={(checked) =>
                      setNotificationConditions({ ...notificationConditions, notifyEmail: checked as boolean })
                    }
                  />
                  <Label htmlFor="notifyEmail" className="text-sm font-normal cursor-pointer">
                    メールで通知
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyApp"
                    checked={notificationConditions.notifyApp}
                    onCheckedChange={(checked) =>
                      setNotificationConditions({ ...notificationConditions, notifyApp: checked as boolean })
                    }
                  />
                  <Label htmlFor="notifyApp" className="text-sm font-normal cursor-pointer">
                    アプリ内で通知
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="primary" onClick={() => setShowNotificationModal(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSaveNotification}>通知設定を保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
