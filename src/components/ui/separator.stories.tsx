import type { Meta, StoryObj } from "@storybook/nextjs"
import { Separator } from "./separator"

const meta = {
  component: Separator,
  title: "components/ui/separator",
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
}

