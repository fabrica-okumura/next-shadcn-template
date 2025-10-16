import type { Meta, StoryObj } from "@storybook/nextjs"
import { VehicleCardNegotiation } from "./vehicle-card-negotiation"

const mockVehicle = {
  id: 1,
  listingNumber: "A123456",
  favorite: false,
  image: "/placeholder.svg",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  location: "東京都",
  year: 2021,
  maker: "トヨタ",
  model: "プリウス",
  grade: "S ツーリング",
  modelType: "2WD",
  mileage: 12500,
  transmission: "CVT",
  color: "パールホワイト",
  rating: 4.5,
  inspection: "令和8年5月",
  price: 2450000,
  totalPayment: 2650000,
  vehiclePrice: 2450000,
  expenses: 200000,
  displacement: "1800cc",
  capacity: 5,
  repairHistory: "なし",
  listingPeriod: "掲載から15日",
  isNew: true,
  isPriceDown: true,
  isInNegotiation: true,
  matchScore: 92,
  conditionMatch: "装備バランス良好",
  dealer: {
    name: "車両ドットコム東京店",
    location: "東京都世田谷区",
    rating: 4.2,
    reviewCount: 128,
    phone: "0120-123-456",
  },
}

const meta = {
  component: VehicleCardNegotiation,
  title: "components/vehicle-card-negotiation",
  tags: ["autodocs"],
  args: {
    vehicle: mockVehicle,
    selected: false,
  },
} satisfies Meta<typeof VehicleCardNegotiation>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    vehicle: {
      ...mockVehicle,
      favorite: true,
      isPriceDown: true,
      isInNegotiation: true,
    },
    selected: true,
  },
}

export const Basic: Story = {
  args: {
    vehicle: mockVehicle,
    selected: false,
  },
}

