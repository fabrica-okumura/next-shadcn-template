"use client"

import { Icon } from "@/components/ui/icon"
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
                <h2 className="text-lg font-bold">アイコン一覧</h2>
                <div className="grid grid-cols-6 gap-6 md:grid-cols-8 lg:grid-cols-10">
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="ai" />
                    <span className="text-xs text-center">Ai</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="ai2" />
                    <span className="text-xs text-center">Ai2</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="archivebox" size={32} />
                    <span className="text-xs text-center">Archivebox</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-back-left" size={32} />
                    <span className="text-xs text-center">ArrowBackLeft</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-close" size={32} />
                    <span className="text-xs text-center">ArrowClose</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-down" size={32} />
                    <span className="text-xs text-center">ArrowDown</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-go-left" size={32} />
                    <span className="text-xs text-center">ArrowGoLeft</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-go-right" size={32} />
                    <span className="text-xs text-center">ArrowGoRight</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-left" size={32} />
                    <span className="text-xs text-center">ArrowLeft</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-open" size={32} />
                    <span className="text-xs text-center">ArrowOpen</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-right" size={32} />
                    <span className="text-xs text-center">ArrowRight</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="arrow-up" size={32} />
                    <span className="text-xs text-center">ArrowUp</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="back" size={32} />
                    <span className="text-xs text-center">Back</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="bell" size={32} />
                    <span className="text-xs text-center">Bell</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="blanc" size={32} />
                    <span className="text-xs text-center">Blanc</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="calculator" size={32} />
                    <span className="text-xs text-center">Calculator</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="calendar" size={32} />
                    <span className="text-xs text-center">Calendar</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="car" size={32} />
                    <span className="text-xs text-center">Car</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="chain" size={32} />
                    <span className="text-xs text-center">Chain</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="change-search" size={32} />
                    <span className="text-xs text-center">ChangeSearch</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="change" size={32} />
                    <span className="text-xs text-center">Change</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="checkmark" size={32} />
                    <span className="text-xs text-center">Checkmark</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="circle-cross" size={32} />
                    <span className="text-xs text-center">CircleCross</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="circle-minus" size={32} />
                    <span className="text-xs text-center">CircleMinus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="circle-plus" size={32} />
                    <span className="text-xs text-center">CirclePlus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="circle-settle" size={32} />
                    <span className="text-xs text-center">CircleSettle</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="clip" size={32} />
                    <span className="text-xs text-center">Clip</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="clock" size={32} />
                    <span className="text-xs text-center">Clock</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="copy" size={32} />
                    <span className="text-xs text-center">Copy</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="cross" size={32} />
                    <span className="text-xs text-center">Cross</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="customer-management" size={32} />
                    <span className="text-xs text-center">CustomerManagement</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="dots-horizontal" size={32} />
                    <span className="text-xs text-center">DotsHorizontal</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="dots-vertical" size={32} />
                    <span className="text-xs text-center">DotsVertical</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="download" size={32} />
                    <span className="text-xs text-center">Download</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="error" size={32} />
                    <span className="text-xs text-center">Error</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="eye-off" size={32} />
                    <span className="text-xs text-center">EyeOff</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="eye" size={32} />
                    <span className="text-xs text-center">Eye</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="filter" size={32} />
                    <span className="text-xs text-center">Filter</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="folder-plus" size={32} />
                    <span className="text-xs text-center">FolderPlus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="folder" size={32} />
                    <span className="text-xs text-center">Folder</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="gantt" size={32} />
                    <span className="text-xs text-center">Gantt</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="garage" size={32} />
                    <span className="text-xs text-center">Garage</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="good" size={32} />
                    <span className="text-xs text-center">Good</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="graph" size={32} />
                    <span className="text-xs text-center">Graph</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="history" size={32} />
                    <span className="text-xs text-center">History</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="mail" size={32} />
                    <span className="text-xs text-center">Mail</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="info" size={32} />
                    <span className="text-xs text-center">Info</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="list-plus" size={32} />
                    <span className="text-xs text-center">ListPlus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="list-settle" size={32} />
                    <span className="text-xs text-center">ListSettle</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="list" size={32} />
                    <span className="text-xs text-center">List</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="login" size={32} />
                    <span className="text-xs text-center">Login</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="logout" size={32} />
                    <span className="text-xs text-center">Logout</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="maximize" size={32} />
                    <span className="text-xs text-center">Maximize</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="message" size={32} />
                    <span className="text-xs text-center">Message</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="minimize" size={32} />
                    <span className="text-xs text-center">Minimize</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="minus" size={32} />
                    <span className="text-xs text-center">Minus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="money" size={32} />
                    <span className="text-xs text-center">Money</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="multiple-documents" size={32} />
                    <span className="text-xs text-center">MultipleDocuments</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="option-plus" size={32} />
                    <span className="text-xs text-center">OptionPlus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="padlock" size={32} />
                    <span className="text-xs text-center">Padlock</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="pencil" size={32} />
                    <span className="text-xs text-center">Pencil</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="play" size={32} />
                    <span className="text-xs text-center">Play</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="plus" size={32} />
                    <span className="text-xs text-center">Plus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="print" size={32} />
                    <span className="text-xs text-center">Print</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="question" size={32} />
                    <span className="text-xs text-center">Question</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="reload" size={32} />
                    <span className="text-xs text-center">Reload</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="search" size={32} />
                    <span className="text-xs text-center">Search</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="send-outline" size={32} />
                    <span className="text-xs text-center">SendOutline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="settings" size={32} />
                    <span className="text-xs text-center">Settings</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="share" size={32} />
                    <span className="text-xs text-center">Share</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="sorting" size={32} />
                    <span className="text-xs text-center">Sorting</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="spanner" size={32} />
                    <span className="text-xs text-center">Spanner</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="star-outline" size={32} />
                    <span className="text-xs text-center">StarOutline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="stop" size={32} />
                    <span className="text-xs text-center">Stop</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="tips" size={32} />
                    <span className="text-xs text-center">Tips</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="trashbox" size={32} />
                    <span className="text-xs text-center">Trashbox</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="user-plus" size={32} />
                    <span className="text-xs text-center">UserPlus</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Icon name="zoom" size={32} />
                    <span className="text-xs text-center">Zoom</span>
                  </div>
                </div>
              </section>
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
                          <Icon name="user-plus" size={32} />
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
                          <Icon name="user-plus" size={32} />
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
                          <Icon name="user-plus" size={32} />
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
                          <Icon name="user-plus" size={32} />
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
