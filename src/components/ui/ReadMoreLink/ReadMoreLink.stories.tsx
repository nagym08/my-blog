import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReadMoreLink } from "./ReadMoreLink";

const meta = {
  title: "UI/ReadMoreLink",
  component: ReadMoreLink,
} satisfies Meta<typeof ReadMoreLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: "#" },
};

export const CustomLabel: Story = {
  args: { href: "#", label: "View Project" },
};

export const ContinueReading: Story = {
  args: { href: "#", label: "Continue Reading" },
};
