import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExpandableSearch } from "./ExpandableSearch";

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
  {
    slug: "developer-growth-mindset",
    title: "Developer Growth Mindset",
    excerpt: "How to keep learning and growing as a software developer.",
    tags: ["career", "learning"],
    category: "developer-growth",
  },
  {
    slug: "css-grid-layout",
    title: "Mastering CSS Grid Layout",
    excerpt: "A deep dive into CSS Grid for modern web layouts.",
    tags: ["css", "layout"],
    category: "coding",
  },
];

const meta = {
  title: "UI/ExpandableSearch",
  component: ExpandableSearch,
  parameters: {
    layout: "padded",
  },
  args: {
    searchIndex: mockSearchIndex,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "1rem",
          background: "var(--surface-overlay)",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExpandableSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};

export const EmptyIndex: Story = {
  args: {
    searchIndex: [],
  },
};
