import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { Header } from "./Header";

const UserSettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    <circle cx="19" cy="19" r="2" />
    <path d="M19 15v2M19 21v2M15 19h2M21 19h2" />
  </svg>
);

const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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
      <Avatar
        src="https://i.pravatar.cc/150?img=47"
        name="Jane Doe"
        size="md"
        tooltip="Jane Doe"
        menuItems={[
          {
            label: "Manage account",
            icon: <UserSettingsIcon />,
            onSelect: () => {},
          },
          {
            label: "Sign out",
            icon: <SignOutIcon />,
            onSelect: () => {},
            variant: "danger",
          },
        ]}
      />
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
