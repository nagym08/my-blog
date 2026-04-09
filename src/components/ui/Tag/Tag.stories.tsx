import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from "./Tag";

const meta = {
  title: "UI/Tag",
  component: Tag,
  argTypes: {
    color: {
      control: "select",
      options: [
        "typescript",
        "backend",
        "api",
        "css-design",
        "dev-growth",
        "frontend",
        "default",
      ],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Typescript: Story = {
  args: { label: "TypeScript", color: "typescript" },
};

export const Backend: Story = {
  args: { label: "Backend", color: "backend" },
};

export const Api: Story = {
  args: { label: "API", color: "api" },
};

export const CssDesign: Story = {
  args: { label: "CSS Design", color: "css-design" },
};

export const DevGrowth: Story = {
  args: { label: "Dev Growth", color: "dev-growth" },
};

export const Frontend: Story = {
  args: { label: "Frontend", color: "frontend" },
};

export const Default: Story = {
  args: { label: "General", color: "default" },
};

export const AllColors: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <Tag label="TypeScript" color="typescript" />
      <Tag label="Backend" color="backend" />
      <Tag label="API" color="api" />
      <Tag label="CSS Design" color="css-design" />
      <Tag label="Dev Growth" color="dev-growth" />
      <Tag label="Frontend" color="frontend" />
      <Tag label="General" color="default" />
    </div>
  ),
};
