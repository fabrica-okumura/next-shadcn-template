"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Heart,
  Printer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Calendar,
  Gauge,
  FileText,
  Wrench,
  Shield,
  Sparkles,
  Eye,
  Phone,
  ChevronDown,
  ChevronUp,
  Truck,
  TrendingUp,
  Clock,
  Package,
  Bell,
} from "lucide-react"
import Image from 'next/image'

interface VehicleDetailNormalProps {
  vehicleId: string
  onBack: () => void
  onPrevious?: () => void
  onNext?: () => void
}

export function VehicleDetailNormal({ vehicleId, onBack, onPrevious, onNext }: VehicleDetailNormalProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showAllEquipment, setShowAllEquipment] = useState(false)
  const [showDetailedInfo, setShowDetailedInfo] = useState(false)
  const [showInspectionModal, setShowInspectionModal] = useState(false)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
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
    mileage: 30,
    inspection: "2027/01",
    inspectionMonthsLeft: 28,
    accidentHistory: "無",
    accidentNote: "検査票確認済み",
    damageCount: 2,
    damageSeverity: "軽微",
    overallRating: 4.5,
    exteriorRating: 4.5,
    interiorRating: 4.0,
    ratingUpdated: "2024/01/15",
    wholesalePrice: 6800,
    location: "東京都",
    listingDeadline: "2024/02/15",
    images: [
      "/vehicle-front-view-wireframe.jpg",
      "/vehicle-side-view-wireframe.jpg",
      "/vehicle-rear-view-wireframe.jpg",
      "/vehicle-interior-wireframe.jpg",
    ],
    maintenanceLevel: "軽微",
    maintenanceItems: ["オイル交換", "ワイパー交換"],
    riskWarnings: [],
    equipment: {
      safety: ["衝突被害軽減ブレーキ", "車線逸脱警報", "オートハイビーム", "BSM"],
      comfort: ["パワーシート", "シートヒーター", "オートエアコン", "ステアリングヒーター"],
      exterior: ["LEDヘッドライト", "サンルーフ", "パワーバックドア"],
      interior: ["本革シート", "ウッドパネル", "アンビエントライト"],
      navigation: ["純正ナビ", "全周囲カメラ", "ETC2.0", "ドライブレコーダー"],
    },
    customerMatch: "◎",
    specs: {
      modelType: "3BA-TJAL10W",
      typeDesignation: "12345",
      categoryCode: "67890",
      chassisNumber: "****-123456",
      displacement: 2700,
      fuel: "ガソリン",
      drive: "4WD",
      transmission: "8AT",
      capacity: 7,
      color: "ホワイトパールクリスタルシャイン",
      colorCode: "070",
      vehicleHistory: "自家用",
      importType: "国内正規",
    },
    damages: [
      { panel: "フロントバンパー", status: "A1", note: "小傷" },
      { panel: "右フロントドア", status: "W1", note: "線傷" },
    ],
    inspectionSheet: "/vehicle-inspection-sheet-wireframe.jpg",
    salesPoints: "登録時走行30km・ワンオーナー・禁煙車・ディーラー整備記録簿付き",
    costEstimate: {
      purchasePrice: 6800,
      fee: 150,
      shipping: 85,
      warranty: 50,
      misc: 30,
      total: 7115,
      estimatedRetailPrice: 8500,
      grossProfit: 1385,
      profitMargin: 16.3,
    },
    shippingEstimate: 85,
    shippingNote: "積載車使用推奨",
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
  }

  const allPanels = [
    "フロントバンパー",
    "フロントフェンダー（右）",
    "フロントフェンダー（左）",
    "フロントドア（右）",
    "フロントドア（左）",
    "リアドア（右）",
    "リアドア（左）",
    "リアフェンダー（右）",
    "リアフェンダー（左）",
    "リアバンパー",
    "ボンネット",
    "ルーフ",
    "トランク",
  ]

  const damageMap = new Map(vehicle.damages.map((d) => [d.panel, d]))

  const handleOpenNotificationModal = () => {
    setNotificationConditions({
      maker: vehicle.maker,
      model: vehicle.model,
      yearFrom: (vehicle.year - 2).toString(),
      yearTo: (vehicle.year + 2).toString(),
      priceFrom: (vehicle.wholesalePrice - 5).toString(),
      priceTo: (vehicle.wholesalePrice + 5).toString(),
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

  return (
    <div className="space-y-6 pb-48">
      {/* Header Navigation */}
      <div className="flex items-center justify-between mb-6 mt-6">
        <div className="flex items-center gap-2">
          <Button variant="neutral" size="sm" onClick={onBack} className="bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            一覧へ戻る
          </Button>
          {onPrevious && (
            <Button variant="neutral" size="sm" onClick={onPrevious} className="bg-transparent">
              <ChevronLeft className="w-4 h-4 mr-2" />
              前の車両
            </Button>
          )}
          {onNext && (
            <Button variant="neutral" size="sm" onClick={onNext} className="bg-transparent">
              次の車両
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="neutral" size="sm" onClick={() => setIsFavorite(!isFavorite)} className="bg-transparent">
            <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            お気に入り
          </Button>
          <Button variant="neutral" size="sm" className="bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            印刷
          </Button>
        </div>
      </div>

      {/* Summary Status Bar */}
      <Card className="p-4 bg-muted/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{vehicle.year}年式</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">{vehicle.mileage.toLocaleString()}km</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">
                {vehicle.inspection} ({vehicle.inspectionMonthsLeft}ヶ月)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {vehicle.accidentHistory === "無" ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : vehicle.accidentHistory === "有" ? (
                <XCircle className="w-4 h-4 text-red-600" />
              ) : (
                <HelpCircle className="w-4 h-4 text-yellow-600" />
              )}
              <span className="font-semibold">事故歴: {vehicle.accidentHistory}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-muted-foreground" />
              <span className="font-semibold">
                傷・修復: {vehicle.damageCount}件 ({vehicle.damageSeverity})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                評価: {vehicle.overallRating} (外装{vehicle.exteriorRating}/内装{vehicle.interiorRating})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-right">
            <div>
              <div className="text-xs text-muted-foreground">業販価格</div>
              <div className="text-2xl font-bold text-primary">¥{vehicle.wholesalePrice.toLocaleString()}千円</div>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>出品番号: {vehicle.listingNumber}</div>
              <div>所在地: {vehicle.location}</div>
              <div className="text-red-500">掲載期限: {vehicle.listingDeadline}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">
          {vehicle.year} {vehicle.maker} {vehicle.model} {vehicle.grade}
        </h1>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 評価点、年式、走行距離、車検、事故、装備 */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">評価点</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary">{vehicle.overallRating}</div>
                <div className="text-sm text-muted-foreground mt-1">総合点</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary">{vehicle.exteriorRating}</div>
                <div className="text-sm text-muted-foreground mt-1">外装</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-3xl font-bold text-primary">{vehicle.interiorRating}</div>
                <div className="text-sm text-muted-foreground mt-1">内装</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-3">評価更新日時: {vehicle.ratingUpdated}</div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">基本情報</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">型式</span>
                <span className="text-sm font-medium">{vehicle.specs.modelType}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">型式指定</span>
                <span className="text-sm font-medium">{vehicle.specs.typeDesignation}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">類別区分</span>
                <span className="text-sm font-medium">{vehicle.specs.categoryCode}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">車台番号</span>
                <span className="text-sm font-medium">{vehicle.specs.chassisNumber}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">排気量</span>
                <span className="text-sm font-medium">{vehicle.specs.displacement}cc</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">燃料</span>
                <span className="text-sm font-medium">{vehicle.specs.fuel}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">駆動</span>
                <span className="text-sm font-medium">{vehicle.specs.drive}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">シフト</span>
                <span className="text-sm font-medium">{vehicle.specs.transmission}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">定員</span>
                <span className="text-sm font-medium">{vehicle.specs.capacity}人</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">色</span>
                <span className="text-sm font-medium">{vehicle.specs.color}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">色No</span>
                <span className="text-sm font-medium">{vehicle.specs.colorCode}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">車歴</span>
                <span className="text-sm font-medium">{vehicle.specs.vehicleHistory}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">並行区分</span>
                <span className="text-sm font-medium">{vehicle.specs.importType}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">車検・整備適合情報</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">車検有効期限</div>
                  <div className="text-lg font-semibold">
                    {vehicle.inspection}{" "}
                    <span className="text-sm text-muted-foreground">（残{vehicle.inspectionMonthsLeft}ヶ月）</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">整備必要見込み</div>
                  <div className="text-lg font-semibold">{vehicle.maintenanceLevel}</div>
                  <div className="text-xs text-muted-foreground mt-1">{vehicle.maintenanceItems.join("、")}</div>
                </div>
              </div>
              {vehicle.riskWarnings.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="font-semibold text-red-600">リスク注意</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.riskWarnings.map((warning, idx) => (
                      <Badge key={idx} variant="destructive">
                        {warning}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">事故・修復歴</h2>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold flex items-center gap-2">
                  {vehicle.accidentHistory === "無" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : vehicle.accidentHistory === "有" ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  事故・修復歴: {vehicle.accidentHistory}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">{vehicle.accidentNote}</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">装備・オプション</h2>
              <Badge variant="outline" className="text-lg px-3 py-1">
                条件一致度: {vehicle.customerMatch}
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  安全装備
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.safety.map((item, idx) => (
                    <Badge key={idx} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  快適装備
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.equipment.comfort.map((item, idx) => (
                    <Badge key={idx} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              {showAllEquipment && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">外観</h3>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.equipment.exterior.map((item, idx) => (
                        <Badge key={idx} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">インテリア</h3>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.equipment.interior.map((item, idx) => (
                        <Badge key={idx} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2">電装/ナビ</h3>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.equipment.navigation.map((item, idx) => (
                        <Badge key={idx} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <Button
                variant="neutral"
                size="sm"
                onClick={() => setShowAllEquipment(!showAllEquipment)}
                className="w-full bg-transparent"
              >
                {showAllEquipment ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    装備を閉じる
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    全装備を表示
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Decision Support Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">意思決定支援</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
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
                  <Clock className="w-4 h-4" />
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
                  <Package className="w-4 h-4" />
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
                  <Truck className="w-4 h-4" />
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

        {/* Right Column: 傷、展開、画像 */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">傷・損傷（主要パネル状態）</h2>
            <div className="grid grid-cols-4 gap-2">
              {allPanels.map((panel) => {
                const damage = damageMap.get(panel)
                return (
                  <div
                    key={panel}
                    className={`p-2 rounded text-xs text-center ${
                      damage
                        ? "bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300"
                        : "bg-green-50 dark:bg-green-900/10 border border-green-200"
                    }`}
                  >
                    <div className="font-medium">{panel}</div>
                    <div className="text-xs mt-1">{damage ? damage.status : "良好"}</div>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-semibold">損傷詳細</h3>
              {vehicle.damages.map((damage, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-muted rounded">
                  <Badge variant="outline">{damage.status}</Badge>
                  <span className="font-medium">{damage.panel}</span>
                  <span className="text-sm text-muted-foreground">{damage.note}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">展開情報</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">検査票プレビュー</h3>
                <div className="relative bg-muted rounded-lg p-4">
                  <Image
                    src={vehicle.inspectionSheet || "/placeholder.svg"}
                    alt="検査票"
                    width={400}
                    height={300}
                    className="w-1/2 h-auto mx-auto"
                  />
                </div>
                <Button
                  variant="neutral"
                  size="sm"
                  className="w-full mt-2 bg-transparent"
                  onClick={() => setShowInspectionModal(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  原寸で開く
                </Button>
              </div>
              {!showDetailedInfo && (
                <Button
                  variant="neutral"
                  size="sm"
                  onClick={() => setShowDetailedInfo(true)}
                  className="w-full bg-transparent"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  セールスポイント・特記事項を表示
                </Button>
              )}
              {showDetailedInfo && (
                <>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">セールスポイント／特記事項</h3>
                    <p className="text-sm leading-relaxed">{vehicle.salesPoints}</p>
                    <div className="text-xs text-muted-foreground mt-2">更新日時: {vehicle.ratingUpdated}</div>
                  </div>
                  <Button
                    variant="neutral"
                    size="sm"
                    onClick={() => setShowDetailedInfo(false)}
                    className="w-full bg-transparent"
                  >
                    <ChevronUp className="w-4 h-4 mr-2" />
                    閉じる
                  </Button>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">画像ギャラリー</h2>
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={vehicle.images[selectedImage] || "/placeholder.svg"}
                  alt="Vehicle"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-video rounded overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Thumbnail ${idx + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <Button variant="neutral" className="w-full bg-transparent">
                すべての写真を見る（{vehicle.images.length}枚）
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                ※画像の転用は禁止されています。
                <a href="#" className="underline ml-1">
                  詳細はこちら
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Button
          variant="neutral"
          size="md"
          onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          className="w-full bg-transparent"
        >
          {showAdditionalInfo ? (
            <>
              <ChevronUp className="w-5 h-5 mr-2" />
              詳細情報を閉じる（主要スペック・原価概算）
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5 mr-2" />
              詳細情報を表示（主要スペック・原価概算）
            </>
          )}
        </Button>

        {showAdditionalInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Specs */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">主要スペック</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">型式</span>
                  <span className="text-sm font-medium">{vehicle.specs.modelType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">型式指定</span>
                  <span className="text-sm font-medium">{vehicle.specs.typeDesignation}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">類別区分</span>
                  <span className="text-sm font-medium">{vehicle.specs.categoryCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">車台番号</span>
                  <span className="text-sm font-medium">{vehicle.specs.chassisNumber}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">排気量</span>
                  <span className="text-sm font-medium">{vehicle.specs.displacement}cc</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">燃料</span>
                  <span className="text-sm font-medium">{vehicle.specs.fuel}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">駆動</span>
                  <span className="text-sm font-medium">{vehicle.specs.drive}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">シフト</span>
                  <span className="text-sm font-medium">{vehicle.specs.transmission}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">定員</span>
                  <span className="text-sm font-medium">{vehicle.specs.capacity}人</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">色</span>
                  <span className="text-sm font-medium">{vehicle.specs.color}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">色No</span>
                  <span className="text-sm font-medium">{vehicle.specs.colorCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">車歴</span>
                  <span className="text-sm font-medium">{vehicle.specs.vehicleHistory}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">並行区分</span>
                  <span className="text-sm font-medium">{vehicle.specs.importType}</span>
                </div>
              </div>
            </Card>

            {/* Cost Estimate */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">原価・費用概算</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">落札額</span>
                    <span className="text-sm font-medium">
                      ¥{vehicle.costEstimate.purchasePrice.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">手数料</span>
                    <span className="text-sm font-medium">¥{vehicle.costEstimate.fee.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">輸送費</span>
                    <span className="text-sm font-medium">¥{vehicle.costEstimate.shipping.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">保証</span>
                    <span className="text-sm font-medium">¥{vehicle.costEstimate.warranty.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-sm text-muted-foreground">諸費用</span>
                    <span className="text-sm font-medium">¥{vehicle.costEstimate.misc.toLocaleString()}千円</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 border-primary">
                    <span className="font-semibold">仕入総額</span>
                    <span className="text-lg font-bold text-primary">
                      ¥{vehicle.costEstimate.total.toLocaleString()}千円
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">参考相場→想定売価</span>
                    <span className="text-sm font-semibold">
                      ¥{vehicle.costEstimate.estimatedRetailPrice.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">粗利</span>
                    <span className="text-sm font-semibold text-green-600">
                      ¥{vehicle.costEstimate.grossProfit.toLocaleString()}千円
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">粗利率</span>
                    <span className="text-sm font-semibold text-green-600">{vehicle.costEstimate.profitMargin}%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4" />
                    <span className="font-semibold">陸送概算</span>
                  </div>
                  <p className="text-muted-foreground">
                    {vehicle.location}→自店: ¥{vehicle.shippingEstimate.toLocaleString()}千円
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{vehicle.shippingNote}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Application/Negotiation CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">申込・交渉</h3>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">電話申込: 0120-XXX-XXX</span>
                <span className="text-xs text-muted-foreground">（平日 9:00-18:00）</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="neutral" className="bg-transparent">
                値下げ交渉
              </Button>
              <Button>商談申込み・在庫確認</Button>
              <Button variant="neutral" size="sm" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                規約
              </Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-semibold mb-3">通知設定</h4>
            <div className="flex items-center gap-2">
              <Button variant="neutral" size="sm" className="bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
                この車の更新を通知
              </Button>
              <Button variant="neutral" size="sm" className="bg-transparent" onClick={handleOpenNotificationModal}>
                <Bell className="w-4 h-4 mr-2" />
                この条件の新着を通知
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Inspection Sheet Modal */}
      <Dialog open={showInspectionModal} onOpenChange={setShowInspectionModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>検査票</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Image
              src={vehicle.inspectionSheet || "/placeholder.svg"}
              alt="検査票（原寸）"
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Modal Dialog */}
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
            <Button variant="neutral" onClick={() => setShowNotificationModal(false)}>
              キャンセル
            </Button>
            <Button onClick={handleSaveNotification}>通知設定を保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
