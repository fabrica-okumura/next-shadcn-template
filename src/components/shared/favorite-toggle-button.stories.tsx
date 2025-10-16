import type { Meta, StoryObj } from "@storybook/nextjs"
import { FavoriteToggleButton } from "./favorite-toggle-button"

const meta = {
  component: FavoriteToggleButton,
  title: "components/shared/favorite-toggle-button",
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} satisfies Meta<typeof FavoriteToggleButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

