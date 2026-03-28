import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  argTypes: {
    variant: { control: "select", options: ["featured", "standard"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Featured: Story = {
  args: {
    variant: "featured",
    image: {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
      alt: "Code on a screen",
    },
    tags: [
      { label: "TypeScript", color: "typescript" },
    ],
    title: "Mastering TypeScript: Best Practices for Robust Code",
    description:
      "Mastering TypeScript: Best Practices for Robust Code to improve codebase structure and Microservices, the potential, or each promise, and energy entitlements...",
    date: "Jan 24, 2024",
    href: "#",
  },
};

export const Standard: Story = {
  args: {
    variant: "standard",
    tags: [
      { label: "Backend", color: "backend" },
      { label: "API", color: "api" },
    ],
    title: "Building Scalable APIs with Node.js & Go",
    description:
      "Building scalable APIs with Node.js & Go adds a lovely improvement style, yet maintaining clean architecture...",
    date: "Jan 24, 2024",
    href: "#",
  },
};

export const StandardMinimal: Story = {
  args: {
    variant: "standard",
    tags: [{ label: "CSS Design", color: "css-design" }],
    title: "Advanced CSS Layouts with Grid & Flexbox",
    date: "Jan 24, 2024",
    href: "#",
  },
};

export const FeaturedNoImage: Story = {
  args: {
    variant: "featured",
    tags: [
      { label: "Dev Growth", color: "dev-growth" },
    ],
    title: "Navigating the Junior to Senior Dev Path",
    description:
      "Navigating the Junior to Senior Dev Path is developing your understanding of best practices...",
    date: "Jan 24, 2024",
    href: "#",
  },
};

export const CardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1.5rem",
        maxWidth: "900px",
      }}
    >
      <div style={{ gridRow: "1 / 3" }}>
        <Card
          variant="featured"
          image={{
            src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
            alt: "Code on a screen",
          }}
          tags={[{ label: "TypeScript", color: "typescript" }]}
          title="Mastering TypeScript: Best Practices for Robust Code"
          description="Mastering TypeScript: Best Practices for Robust Code to improve codebase structure and Microservices, the potential, or each promise, and energy entitlements..."
          date="Jan 24, 2024"
          href="#"
        />
      </div>
      <Card
        variant="standard"
        tags={[
          { label: "Backend", color: "backend" },
          { label: "API", color: "api" },
        ]}
        title="Building Scalable APIs with Node.js & Go"
        description="Building scalable APIs with Node.js & Go adds a lovely improvement style..."
        date="Jan 24, 2024"
        href="#"
      />
      <Card
        variant="standard"
        tags={[{ label: "CSS Design", color: "css-design" }]}
        title="Advanced CSS Layouts with Grid & Flexbox"
        description="Advanced CSS Layouts with Grid & Flexbox adaptive design, art Grid &..."
        date="Jan 24, 2024"
        href="#"
      />
      <Card
        variant="standard"
        tags={[{ label: "Dev Growth", color: "dev-growth" }]}
        title="Navigating the Junior to Senior Dev Path"
        description="Navigating the Junior to Senior Dev Path is developing your understanding..."
        date="Jan 24, 2024"
        href="#"
      />
      <Card
        variant="standard"
        tags={[{ label: "Frontend", color: "frontend" }]}
        title="Project Case Study: The Portfolio Builder"
        description="Project Case Study: The Portfolio Builder, a curated element of first..."
        date="Jan 19, 2024"
        href="#"
      />
    </div>
  ),
};
