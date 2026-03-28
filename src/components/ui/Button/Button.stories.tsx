import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["ghost", "primary"] },
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {
  args: { children: "Sign In", variant: "ghost" },
};

export const Primary: Story = {
  args: { children: "Subscribe", variant: "primary" },
};

export const SmallGhost: Story = {
  args: { children: "Sign In", variant: "ghost", size: "sm" },
};

export const SmallPrimary: Story = {
  args: { children: "Subscribe", variant: "primary", size: "sm" },
};

export const Disabled: Story = {
  args: { children: "Disabled", variant: "ghost", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="ghost" size="sm">Ghost SM</Button>
      <Button variant="primary" size="sm">Primary SM</Button>
      <Button variant="ghost" disabled>Disabled</Button>
    </div>
  ),
};
