import type { Meta, StoryObj } from "@storybook/nextjs"
import { Button } from "./button"

const meta = {
  component: Button,
  title: "components/ui/button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "neutral", "danger"],
    },
    size: {
      control: "select",
      options: ["md", "sm", "icon"],
    },
  },
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
}

