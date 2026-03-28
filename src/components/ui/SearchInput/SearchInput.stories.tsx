import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchInput } from "./SearchInput";

const meta = {
  title: "UI/SearchInput",
  component: SearchInput,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search articles..." },
};

export const WithValue: Story = {
  args: { placeholder: "Search articles...", defaultValue: "TypeScript" },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: "Find a project..." },
};
