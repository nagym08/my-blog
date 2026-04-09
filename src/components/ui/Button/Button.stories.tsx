import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { CSSProperties } from "react";
import { Button } from "./Button";

// ------- Sample icons (inline SVG, no external deps) -------
const SparkleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
  </svg>
);

// ------- Meta -------
const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "luminous",
      values: [{ name: "luminous", value: "#0e0e10" }],
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "inverted", "outlined"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    iconOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Subscribe",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ------- Individual variants -------
export const Primary: Story = {
  args: { children: "Subscribe", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Sign In", variant: "secondary" },
};

export const Inverted: Story = {
  args: { children: "Get Started", variant: "inverted" },
};

export const Outlined: Story = {
  args: { children: "Learn More", variant: "outlined" },
};

// ------- Sizes -------
export const Small: Story = {
  args: { children: "Small", variant: "primary", size: "sm" },
};

export const Medium: Story = {
  args: { children: "Medium", variant: "primary", size: "md" },
};

export const Large: Story = {
  args: { children: "Large", variant: "primary", size: "lg" },
};

// ------- With icons -------
export const WithLeftIcon: Story = {
  args: {
    children: "Create",
    variant: "primary",
    leftIcon: <EditIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: "Continue",
    variant: "secondary",
    rightIcon: <ArrowRightIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: "Enhance",
    variant: "primary",
    leftIcon: <SparkleIcon />,
    rightIcon: <ArrowRightIcon />,
  },
};

// ------- Icon-only -------
export const IconOnlyPrimary: Story = {
  args: {
    variant: "primary",
    iconOnly: true,
    "aria-label": "Edit",
    children: <EditIcon />,
  },
};

export const IconOnlySecondary: Story = {
  args: {
    variant: "secondary",
    iconOnly: true,
    "aria-label": "Search",
    children: <SearchIcon />,
  },
};

export const IconOnlyOutlined: Story = {
  args: {
    variant: "outlined",
    iconOnly: true,
    "aria-label": "Delete",
    children: <TrashIcon />,
  },
};

// ------- States -------
export const Disabled: Story = {
  args: { children: "Disabled", variant: "primary", disabled: true },
};

export const DisabledSecondary: Story = {
  args: { children: "Disabled", variant: "secondary", disabled: true },
};

// ------- Showcases -------
const row: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexWrap: "wrap",
};

const col: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "2rem",
};

const label: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(232,232,234,0.55)",
  marginBottom: "0.5rem",
};

export const AllVariants: Story = {
  render: () => (
    <div style={col}>
      <div>
        <div style={label}>Variants</div>
        <div style={row}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="inverted">Inverted</Button>
          <Button variant="outlined">Outlined</Button>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={col}>
      {(["primary", "secondary", "inverted", "outlined"] as const).map((v) => (
        <div key={v}>
          <div style={label}>{v}</div>
          <div style={row}>
            <Button variant={v} size="sm">Small</Button>
            <Button variant={v} size="md">Medium</Button>
            <Button variant={v} size="lg">Large</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const IconOnlyShowcase: Story = {
  render: () => (
    <div style={col}>
      <div>
        <div style={label}>Icon-only — Primary</div>
        <div style={row}>
          <Button variant="primary" iconOnly size="sm" aria-label="Edit"><EditIcon /></Button>
          <Button variant="primary" iconOnly size="md" aria-label="Edit"><EditIcon /></Button>
          <Button variant="primary" iconOnly size="lg" aria-label="Edit"><EditIcon /></Button>
        </div>
      </div>
      <div>
        <div style={label}>Icon-only — All variants</div>
        <div style={row}>
          <Button variant="primary" iconOnly aria-label="Sparkle"><SparkleIcon /></Button>
          <Button variant="secondary" iconOnly aria-label="Search"><SearchIcon /></Button>
          <Button variant="inverted" iconOnly aria-label="Edit"><EditIcon /></Button>
          <Button variant="outlined" iconOnly aria-label="Delete"><TrashIcon /></Button>
        </div>
      </div>
    </div>
  ),
};

export const WithIconsShowcase: Story = {
  render: () => (
    <div style={col}>
      <div>
        <div style={label}>Leading Icon</div>
        <div style={row}>
          <Button variant="primary" leftIcon={<SparkleIcon />}>Enhance</Button>
          <Button variant="secondary" leftIcon={<EditIcon />}>Edit post</Button>
          <Button variant="outlined" leftIcon={<SearchIcon />}>Search</Button>
        </div>
      </div>
      <div>
        <div style={label}>Trailing Icon</div>
        <div style={row}>
          <Button variant="primary" rightIcon={<ArrowRightIcon />}>Continue</Button>
          <Button variant="secondary" rightIcon={<ArrowRightIcon />}>Learn more</Button>
          <Button variant="inverted" rightIcon={<ArrowRightIcon />}>Get started</Button>
        </div>
      </div>
    </div>
  ),
};

export const Showcase: Story = {
  render: () => (
    <div style={{ ...col, padding: "3rem", minWidth: 520 }}>
      <div>
        <div style={label}>Primary · signature gradient</div>
        <div style={row}>
          <Button variant="primary" size="sm">Subscribe</Button>
          <Button variant="primary">Subscribe</Button>
          <Button variant="primary" size="lg" leftIcon={<SparkleIcon />}>
            Subscribe
          </Button>
        </div>
      </div>
      <div>
        <div style={label}>Secondary · ghost border</div>
        <div style={row}>
          <Button variant="secondary" size="sm">Sign In</Button>
          <Button variant="secondary">Sign In</Button>
          <Button variant="secondary" rightIcon={<ArrowRightIcon />}>
            Sign In
          </Button>
        </div>
      </div>
      <div>
        <div style={label}>Inverted · light fill</div>
        <div style={row}>
          <Button variant="inverted" size="sm">Get Started</Button>
          <Button variant="inverted">Get Started</Button>
          <Button variant="inverted" size="lg">Get Started</Button>
        </div>
      </div>
      <div>
        <div style={label}>Outlined · subtle neutral</div>
        <div style={row}>
          <Button variant="outlined" size="sm">View</Button>
          <Button variant="outlined">View</Button>
          <Button variant="outlined" size="lg">View</Button>
        </div>
      </div>
      <div>
        <div style={label}>Icon-only · circular</div>
        <div style={row}>
          <Button variant="primary" iconOnly aria-label="Enhance"><SparkleIcon /></Button>
          <Button variant="secondary" iconOnly aria-label="Search"><SearchIcon /></Button>
          <Button variant="inverted" iconOnly aria-label="Edit"><EditIcon /></Button>
          <Button variant="outlined" iconOnly aria-label="Delete"><TrashIcon /></Button>
        </div>
      </div>
      <div>
        <div style={label}>Disabled</div>
        <div style={row}>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="inverted" disabled>Disabled</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};
