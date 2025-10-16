import type { Meta, StoryObj } from "@storybook/nextjs"
import { Switch } from "./switch"

const meta = {
  component: Switch,
  title: "components/ui/switch",
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
}

