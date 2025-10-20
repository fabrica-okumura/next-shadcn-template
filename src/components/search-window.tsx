"use client"

import { Icon } from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface SearchWindowProps {
  onSearch: () => void
}

export function SearchWindow({ onSearch }: SearchWindowProps) {
  const [isDetailedOpen, setIsDetailedOpen] = useState(false)

  return (
    <div className="bg-card border-2 border-border rounded-lg p-6 relative mt-6">
                  <Select>
              <SelectTrigger className="" size="sm">
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">トヨタ</SelectItem>
                <SelectItem value="honda">ホンダ</SelectItem>
                <SelectItem value="nissan">日産</SelectItem>
              </SelectContent>
            </Select>
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">メーカー</label>
            <Select>
              <SelectTrigger className="" size="sm">
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toyota">トヨタ</SelectItem>
                <SelectItem value="honda">ホンダ</SelectItem>
                <SelectItem value="nissan">日産</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">車名</label>
            <Select>
              <SelectTrigger className="w-full" size="sm">
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prius">プリウス</SelectItem>
                <SelectItem value="aqua">アクア</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">年式</label>
            <div className="flex space-x-1">
              <Input placeholder="2020" className="" />
              <span className="text-muted-foreground self-center text-xs">〜</span>
              <Input placeholder="2024" className="" />
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">走行距離</label>
            <div className="flex space-x-1">
              <Input placeholder="0" className="w-full text-xs bg-white" />
              <span className="text-muted-foreground self-center text-xs">〜</span>
              <Input placeholder="50000" className="w-full text-xs bg-white" />
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">車両価格</label>
            <div className="flex space-x-1">
              <Input placeholder="100" className="w-full text-xs bg-white" />
              <span className="text-muted-foreground self-center text-xs">〜</span>
              <Input placeholder="500" className="w-full text-xs bg-white" />
            </div>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">修復歴</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="全て" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="none">なし</SelectItem>
                <SelectItem value="only">のみ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Collapsible open={isDetailedOpen} onOpenChange={setIsDetailedOpen}>
          <CollapsibleContent>
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-4 mt-4">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-3">
                  <label className="text-sm text-muted-foreground mb-2 block">ボディタイプ</label>
                  <Select>
                    <SelectTrigger className="px-2 py-1 text-left justify-between w-full [&>span]:w-full bg-white">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">セダン</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">ハッチバック</SelectItem>
                      <SelectItem value="wagon">ワゴン</SelectItem>
                      <SelectItem value="coupe">クーペ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <label className="text-sm text-muted-foreground mb-2 block">燃料</label>
                  <Select>
                    <SelectTrigger className="px-2 py-1 text-left justify-start w-full [&>span]:w-full bg-white">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gasoline">ガソリン</SelectItem>
                      <SelectItem value="hybrid">ハイブリッド</SelectItem>
                      <SelectItem value="electric">電気</SelectItem>
                      <SelectItem value="diesel">ディーゼル</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <label className="text-sm text-muted-foreground mb-2 block">駆動方式</label>
                  <Select>
                    <SelectTrigger className="px-2 py-1 text-left justify-start w-full [&>span]:w-full bg-white">
                      <SelectValue placeholder="選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2wd">2WD</SelectItem>
                      <SelectItem value="4wd">4WD</SelectItem>
                      <SelectItem value="awd">AWD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-3">
                  <label className="text-sm text-muted-foreground mb-2 block">排気量</label>
                  <div className="flex space-x-1">
                    <Input placeholder="1000" className="w-full text-xs bg-white" />
                    <span className="text-muted-foreground self-center text-xs">〜</span>
                    <Input placeholder="3000" className="w-full text-xs bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>

          <div className="border-t border-border mt-4 pt-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-center space-x-3 flex-1">
                <Button variant="primary" className="min-w-[120px] h-10 bg-transparent">
                  クリア
                </Button>
                <Button onClick={onSearch} className="bg-primary hover:bg-primary/90 min-w-[120px] h-10">
                  検索
                </Button>
              </div>

              <div className="relative">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2 bg-transparent min-w-[120px] h-10"
                  >
                    <Icon name="plus" className="w-4 h-4" />
                    詳細条件
                    <Icon name="arrow-down" className={`w-4 h-4 transition-transform ${isDetailedOpen ? "rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
        </Collapsible>
      </div>
    </div>
  )
}
