import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Header } from "./Header";

const defaultNavItems = [
  { label: "Coding", href: "/category/coding" },
  { label: "Projects", href: "/category/project" },
  { label: "Dev Growth", href: "/category/developer-growth" },
  { label: "About", href: "/about" },
];

const meta = {
  title: "UI/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    logo: "S&S",
    navItems: defaultNavItems,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
  args: {
    isSignedIn: false,
  },
};

export const SignedIn: Story = {
  args: {
    isSignedIn: true,
    userName: "John Doe",
    userAvatar: "https://i.pravatar.cc/64?u=johndoe",
  },
};

export const NoNav: Story = {
  args: {
    navItems: [],
    isSignedIn: false,
  },
};
