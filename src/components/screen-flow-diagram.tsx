"use client"

import { Icon } from "@/components/ui/icon"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
interface ScreenFlowDiagramProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScreenFlowDiagram({ open, onOpenChange }: ScreenFlowDiagramProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] max-h-[95vh] w-full h-full p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">画面遷移図</DialogTitle>
            <Button variant="primary" size="icon" onClick={() => onOpenChange(false)}>
              <Icon name="cross" className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="overflow-auto p-8 bg-muted/30">
          <div className="min-w-[1600px] space-y-12">
            {/* Home Screen - Central Hub */}
            <div className="flex flex-col items-center">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 shadow-lg border-2 border-primary w-80 text-center">
                <Icon name="garage" className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold text-lg">ホーム画面</h3>
                <p className="text-sm mt-1 opacity-90">検索窓・条件・お気に入り・お知らせ</p>
              </div>
            </div>

            {/* Main Navigation Branches */}
            <div className="grid grid-cols-4 gap-12">
              {/* Branch 1: Search Flow */}
              <div className="flex flex-col items-center space-y-4">
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="search" className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold">検索結果</h4>
                  <p className="text-xs text-muted-foreground mt-1">車両一覧表示</p>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded" />
                  <h4 className="font-semibold">車両詳細</h4>
                  <p className="text-xs text-muted-foreground mt-1">詳細情報・見積作成</p>
                </div>
              </div>

              {/* Branch 2: Favorites Flow */}
              <div className="flex flex-col items-center space-y-4">
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="star-outline" className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <h4 className="font-semibold">お気に入り一覧</h4>
                  <p className="text-xs text-muted-foreground mt-1">保存した車両</p>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded" />
                  <h4 className="font-semibold">車両詳細</h4>
                  <p className="text-xs text-muted-foreground mt-1">詳細情報・見積作成</p>
                </div>
              </div>

              {/* Branch 3: Customers/Negotiations Flow */}
              <div className="flex flex-col items-center space-y-4">
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="customer-management" className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-semibold">商談一覧</h4>
                  <p className="text-xs text-muted-foreground mt-1">顧客・商談管理</p>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="search" className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold">検索結果</h4>
                  <p className="text-xs text-muted-foreground mt-1">商談用車両検索</p>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded" />
                  <h4 className="font-semibold">車両詳細</h4>
                  <p className="text-xs text-muted-foreground mt-1">商談モード</p>
                </div>
              </div>

              {/* Branch 4: Conditions & Procurement */}
              <div className="flex flex-col items-center space-y-4">
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="list" className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold">検索条件一覧</h4>
                  <p className="text-xs text-muted-foreground mt-1">保存した条件</p>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 rotate-90 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-full text-center min-h-[120px] flex flex-col justify-center">
                  <Icon name="search" className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold">検索結果</h4>
                  <p className="text-xs text-muted-foreground mt-1">条件に基づく検索</p>
                </div>
              </div>
            </div>

            {/* Additional Screen: Procurement List */}
            <div className="flex justify-center pt-8 border-t">
              <div className="flex items-center gap-6">
                <div className="bg-primary/10 text-primary rounded-lg p-5 shadow border w-64 text-center">
                  <Icon name="garage" className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-semibold">ホーム画面</h4>
                </div>
                <Icon name="arrow-right" className="w-6 h-6 text-muted-foreground" />
                <div className="bg-card rounded-lg p-5 shadow border w-64 text-center">
                  <Icon name="multiple-documents" className="w-6 h-6 mx-auto mb-2 text-teal-500" />
                  <h4 className="font-semibold">仕入れ車両一覧</h4>
                  <p className="text-xs text-muted-foreground mt-1">仕入れ済み車両</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-12 pt-8 border-t">
              <h4 className="font-semibold mb-4 text-center">凡例</h4>
              <div className="flex justify-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded" />
                  <span className="text-sm">メイン画面</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-card border rounded" />
                  <span className="text-sm">サブ画面</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="arrow-right" className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">画面遷移</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
