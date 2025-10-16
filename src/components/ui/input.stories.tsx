import type { Meta, StoryObj } from "@storybook/nextjs"
import { Input } from "./input"

const meta = {
  component: Input,
  title: "Components/Ui/Input",
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
}

