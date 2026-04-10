import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
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
    backgrounds: {
      default: "luminous",
      values: [{ name: "luminous", value: "#0e0e10" }],
    },
  },
  args: {
    logo: "S&S",
    navItems: defaultNavItems,
    searchHref: "/search",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignedOut: Story = {
  args: {
    authContent: (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    ),
  },
};

export const SignedIn: Story = {
  args: {
    authContent: (
      <Button variant="secondary" size="sm">
        Sign Out
      </Button>
    ),
  },
};

export const NoNav: Story = {
  args: {
    navItems: [],
    authContent: (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    ),
  },
};

export const NoSearch: Story = {
  args: {
    searchHref: undefined,
    authContent: (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    ),
  },
};
