"use client"

import { Header } from "@/components/header"
import { SearchWindow } from "@/components/search-window"
import { ConditionsList } from "@/components/conditions-list"
import { FavoriteVehicles } from "@/components/favorite-vehicles"
import { Announcements } from "@/components/announcements"
import { VehicleSearchResults } from "@/components/vehicle-search-results"
import { Breadcrumb } from "@/components/breadcrumb"
import { useState } from "react"
import { FavoritesList } from "@/components/favorites-list"
import { CustomersList } from "@/components/customers-list"
import { ConditionsListPage } from "@/components/conditions-list-page"
import { ProcurementList } from "@/components/procurement-list"
import { VehicleDetail } from "@/components/vehicle-detail"
import { VehicleDetailNormal } from "@/components/vehicle-detail-normal"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [negotiationMode, setNegotiationMode] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [showFavoritesList, setShowFavoritesList] = useState(false)
  const [showCustomersList, setShowCustomersList] = useState(false)
  const [showConditionsList, setShowConditionsList] = useState(false)
  const [showProcurementList, setShowProcurementList] = useState(false)
  const [selectedNegotiationId, setSelectedNegotiationId] = useState<string | null>(null)
  const [showVehicleDetail, setShowVehicleDetail] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

  const handleNegotiationClick = (negotiationId: string) => {
    setSelectedNegotiationId(negotiationId)
    setShowCustomersList(false)
    setShowSearchResults(true)
  }

  const handleNavigateHome = () => {
    setShowSearchResults(false)
    setShowFavoritesList(false)
    setShowCustomersList(false)
    setShowConditionsList(false)
    setShowProcurementList(false)
    setShowVehicleDetail(false)
    setSelectedNegotiationId(null)
    setSelectedVehicleId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        negotiationMode={negotiationMode}
        setNegotiationMode={setNegotiationMode}
        onShowFavorites={() => setShowFavoritesList(true)}
        onShowConditions={() => setShowConditionsList(true)}
        onShowProcurement={() => setShowProcurementList(true)}
        onNavigateHome={handleNavigateHome}
      />
      <main className="max-w-[1440px] mx-auto px-6 py-6 space-y-6 pt-[73px]">
        {showVehicleDetail && selectedVehicleId ? (
          <>
            {negotiationMode ? (
              <VehicleDetail
                vehicleId={selectedVehicleId}
                onBack={() => {
                  setShowVehicleDetail(false)
                  setSelectedVehicleId(null)
                }}
              />
            ) : (
              <VehicleDetailNormal
                vehicleId={selectedVehicleId}
                onBack={() => {
                  setShowVehicleDetail(false)
                  setSelectedVehicleId(null)
                }}
              />
            )}
          </>
        ) : showProcurementList ? (
          <>
            <Breadcrumb
              items={[{ label: "ホーム", onClick: () => setShowProcurementList(false) }, { label: "仕入れ車両一覧" }]}
            />
            <ProcurementList />
          </>
        ) : showConditionsList ? (
          <>
            <Breadcrumb
              items={[{ label: "ホーム", onClick: () => setShowConditionsList(false) }, { label: "検索条件一覧" }]}
            />
            <ConditionsListPage
              onConditionClick={(conditionId) => {
                setShowConditionsList(false)
                setSelectedNegotiationId(conditionId)
                setShowSearchResults(true)
              }}
            />
          </>
        ) : showCustomersList ? (
          <>
            <Breadcrumb
              items={[{ label: "ホーム", onClick: () => setShowCustomersList(false) }, { label: "商談一覧" }]}
            />
            <CustomersList onNegotiationClick={handleNegotiationClick} />
          </>
        ) : showFavoritesList ? (
          <>
            <Breadcrumb
              items={[{ label: "ホーム", onClick: () => setShowFavoritesList(false) }, { label: "お気に入り" }]}
            />
            <FavoritesList negotiationMode={negotiationMode} />
          </>
        ) : showSearchResults ? (
          <>
            <Breadcrumb
              items={[{ label: "ホーム", onClick: () => setShowSearchResults(false) }, { label: "検索結果" }]}
            />
            <SearchWindow onSearch={() => setShowSearchResults(true)} />
            <VehicleSearchResults
              negotiationMode={negotiationMode}
              onClose={() => {
                setShowSearchResults(false)
                setSelectedNegotiationId(null)
              }}
              negotiationId={selectedNegotiationId}
              onVehicleClick={(vehicleId) => {
                setSelectedVehicleId(vehicleId)
                setShowVehicleDetail(true)
              }}
            />
          </>
        ) : (
          <>
            <SearchWindow onSearch={() => setShowSearchResults(true)} />

            <ConditionsList
              onViewList={() => setShowConditionsList(true)}
              onConditionClick={(conditionId) => {
                setSelectedNegotiationId(conditionId)
                setShowSearchResults(true)
              }}
            />

            <div className="space-y-8">
              <section className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold">Button バリエーション確認</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">primary</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="primary" size="md">
                            primary / md
                          </Button>
                          <span className="text-xs text-muted-foreground">size: md</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="primary" size="sm">
                            primary / sm
                          </Button>
                          <span className="text-xs text-muted-foreground">size: sm</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="primary" size="icon" aria-label="primary icon ボタン">
                            <span className="font-bold">●</span>
                          </Button>
                          <span className="text-xs text-muted-foreground">size: icon</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">accent</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="accent" size="md">
                            accent / md
                          </Button>
                          <span className="text-xs text-muted-foreground">size: md</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="accent" size="sm">
                            accent / sm
                          </Button>
                          <span className="text-xs text-muted-foreground">size: sm</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="accent" size="icon" aria-label="accent icon ボタン">
                            <span className="font-bold">●</span>
                          </Button>
                          <span className="text-xs text-muted-foreground">size: icon</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">neutral</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="neutral" size="md">
                            neutral / md
                          </Button>
                          <span className="text-xs text-muted-foreground">size: md</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="neutral" size="sm">
                            neutral / sm
                          </Button>
                          <span className="text-xs text-muted-foreground">size: sm</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="neutral" size="icon" aria-label="neutral icon ボタン">
                            <span className="font-bold">●</span>
                          </Button>
                          <span className="text-xs text-muted-foreground">size: icon</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">danger</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="danger" size="md">
                            danger / md
                          </Button>
                          <span className="text-xs text-muted-foreground">size: md</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="danger" size="sm">
                            danger / sm
                          </Button>
                          <span className="text-xs text-muted-foreground">size: sm</span>
                        </div>
                        <div className="flex min-w-[180px] items-center gap-3">
                          <Button variant="danger" size="icon" aria-label="danger icon ボタン">
                            <span className="font-bold">●</span>
                          </Button>
                          <span className="text-xs text-muted-foreground">size: icon</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>
              <FavoriteVehicles
                negotiationMode={negotiationMode}
                onShowList={() => setShowFavoritesList(true)}
                onVehicleClick={(vehicleId) => {
                  setSelectedVehicleId(vehicleId)
                  setShowVehicleDetail(true)
                }}
              />
              <Announcements />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
