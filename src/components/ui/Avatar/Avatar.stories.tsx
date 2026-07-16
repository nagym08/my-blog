import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Avatar } from "./Avatar";

// ---- Sample icons (inline SVG, no external deps) ----
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

// ---- Meta ----
const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    src: { control: "text" },
    name: { control: "text" },
    tooltip: { control: "text" },
  },
  args: {
    name: "Jane Doe",
    size: "md",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Individual stories ----

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=47",
    name: "Jane Doe",
    size: "md",
  },
};

export const Fallback: Story = {
  args: {
    src: null,
    name: "Jane Doe",
    size: "md",
  },
};

export const WithTooltip: Story = {
  args: {
    src: null,
    name: "Jane Doe",
    tooltip: "Jane Doe",
    size: "md",
  },
};

export const WithMenu: Story = {
  args: {
    src: null,
    name: "Jane Doe",
    menuItems: [
      {
        label: "Manage account",
        icon: <UserSettingsIcon />,
        onSelect: fn(),
      },
      {
        label: "Sign out",
        icon: <SignOutIcon />,
        onSelect: fn(),
        variant: "danger",
      },
    ],
  },
};

// ---- Showcase ----

const col: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "2rem",
};

const row: CSSProperties = {
  display: "flex",
  gap: "1.5rem",
  alignItems: "center",
};

const label: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--text-secondary)",
  marginBottom: "0.75rem",
};

export const Sizes: Story = {
  render: () => (
    <div style={col}>
      <div>
        <div style={label}>With image</div>
        <div style={row}>
          <Avatar src="https://i.pravatar.cc/150?img=47" name="Jane" size="sm" />
          <Avatar src="https://i.pravatar.cc/150?img=47" name="Jane" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=47" name="Jane" size="lg" />
        </div>
      </div>
      <div>
        <div style={label}>Fallback icon</div>
        <div style={row}>
          <Avatar name="Jane" size="sm" />
          <Avatar name="Jane" size="md" />
          <Avatar name="Jane" size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div style={{ ...col, minWidth: 320 }}>
      <div>
        <div style={label}>With image + menu</div>
        <div style={row}>
          <Avatar
            src="https://i.pravatar.cc/150?img=47"
            name="Jane Doe"
            size="md"
            menuItems={[
              { label: "Manage account", icon: <UserSettingsIcon />, onSelect: () => {} },
              { label: "Sign out", icon: <SignOutIcon />, onSelect: () => {}, variant: "danger" },
            ]}
          />
        </div>
      </div>
      <div>
        <div style={label}>Fallback + menu</div>
        <div style={row}>
          <Avatar
            name="Jane Doe"
            size="md"
            menuItems={[
              { label: "Manage account", icon: <UserSettingsIcon />, onSelect: () => {} },
              { label: "Sign out", icon: <SignOutIcon />, onSelect: () => {}, variant: "danger" },
            ]}
          />
        </div>
      </div>
      <div>
        <div style={label}>Sizes — fallback</div>
        <div style={row}>
          <Avatar name="A" size="sm" />
          <Avatar name="B" size="md" />
          <Avatar name="C" size="lg" />
        </div>
      </div>
    </div>
  ),
};

// ---- Interaction tests (play functions) ----

export const HoverShowsTooltip: Story = {
  name: "Hover shows tooltip",
  args: {
    src: null,
    name: "Jane Doe",
    tooltip: "Jane Doe",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);

    await waitFor(() => {
      const tooltip = within(document.body).getByRole("tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Jane Doe");
    });

    await userEvent.unhover(trigger);

    await waitFor(() => {
      expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument();
    });
  },
};

export const ClickOpensMenu: Story = {
  name: "Click opens menu",
  args: {
    src: null,
    name: "Jane Doe",
    menuItems: [
      { label: "Manage account", onSelect: fn() },
      { label: "Sign out", onSelect: fn(), variant: "danger" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument();
    });

    expect(trigger).toHaveAttribute("aria-expanded", "true");

    const menu = within(document.body).getByRole("menu");
    const items = within(menu).getAllByRole("menuitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Manage account");
    expect(items[1]).toHaveTextContent("Sign out");
  },
};

export const MenuItemInvokesCallback: Story = {
  name: "Menu item invokes callback and closes menu",
  args: {
    src: null,
    name: "Jane Doe",
    menuItems: [
      { label: "Manage account", onSelect: fn() },
      { label: "Sign out", onSelect: fn(), variant: "danger" },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);
    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument();
    });

    const signOut = within(document.body).getByRole("menuitem", { name: "Sign out" });
    await userEvent.click(signOut);

    // The onSelect spy on the second item should have been called
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((args.menuItems as any[])[1].onSelect).toHaveBeenCalledOnce();

    // Menu should close
    await waitFor(() => {
      expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
    });
  },
};

export const EscapeClosesMenu: Story = {
  name: "Escape closes menu and returns focus",
  args: {
    src: null,
    name: "Jane Doe",
    menuItems: [
      { label: "Manage account", onSelect: fn() },
      { label: "Sign out", onSelect: fn(), variant: "danger" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);
    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument();
    });

    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
    });

    // Focus should return to the trigger
    expect(trigger).toHaveFocus();
  },
};

export const TooltipSuppressedWhileMenuOpen: Story = {
  name: "Tooltip is suppressed while menu is open",
  args: {
    src: null,
    name: "Jane Doe",
    tooltip: "Jane Doe",
    menuItems: [
      { label: "Manage account", onSelect: fn() },
      { label: "Sign out", onSelect: fn(), variant: "danger" },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    // Open the menu
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument();
    });

    // Now hover — tooltip should NOT appear since menu is open
    await userEvent.hover(trigger);

    // Wait longer than the tooltip open delay (150ms)
    await new Promise((r) => setTimeout(r, 250));

    expect(within(document.body).queryByRole("tooltip")).not.toBeInTheDocument();
  },
};
