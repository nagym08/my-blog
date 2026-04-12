import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../Button/Button";
import { Header } from "./Header";

const defaultNavItems = [
  { label: "Coding", href: "/category/coding" },
  { label: "Projects", href: "/category/project" },
  { label: "Dev Growth", href: "/category/developer-growth" },
  { label: "About", href: "/about" },
];

const mockSearchIndex = [
  {
    slug: "getting-started-with-typescript",
    title: "Getting Started with TypeScript",
    excerpt: "A practical guide to adding TypeScript to your project.",
    tags: ["typescript", "javascript"],
    category: "coding",
  },
  {
    slug: "react-performance-tips",
    title: "React Performance Tips",
    excerpt: "Techniques to keep your React apps fast and responsive.",
    tags: ["react", "performance"],
    category: "coding",
  },
  {
    slug: "building-a-blog-with-nextjs",
    title: "Building a Blog with Next.js",
    excerpt: "Step-by-step walkthrough of building a Next.js blog.",
    tags: ["nextjs", "react"],
    category: "project",
  },
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
    searchIndex: mockSearchIndex,
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
    searchIndex: undefined,
    authContent: (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    ),
  },
};
