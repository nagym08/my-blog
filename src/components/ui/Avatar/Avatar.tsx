"use client";

/* eslint-disable react-hooks/refs --
   This component wires @floating-ui, whose stable callback refs
   (refs.setReference / refs.setFloating) are meant to be read during render and
   passed as `ref={}`. The react-hooks/refs rule flags that as a false positive
   here; JSX doesn't allow per-attribute disable comments, so it's file-scoped. */

import Image from "next/image";
import { useRef, useState } from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import clsx from "clsx";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarMenuItem {
  label: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  variant?: "default" | "danger";
}

export interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: AvatarSize;
  tooltip?: React.ReactNode;
  menuItems?: AvatarMenuItem[];
  "aria-label"?: string;
}

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const SIZES = { sm: 32, md: 40, lg: 56 } as const;

export function Avatar({
  src,
  name,
  size = "md",
  tooltip,
  menuItems,
  "aria-label": ariaLabel,
}: AvatarProps) {
  const hasMenu = !!menuItems?.length;
  const tooltipContent = tooltip ?? name;
  const px = SIZES[size];

  // ---- Menu floating ----
  const [menuOpen, setMenuOpen] = useState(false);
  const menuListRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {
    refs: menuRefs,
    floatingStyles: menuFloatingStyles,
    context: menuContext,
  } = useFloating({
    open: menuOpen,
    onOpenChange: setMenuOpen,
    placement: "bottom-end",
    strategy: "fixed",
    transform: false,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const {
    getReferenceProps: getMenuRefProps,
    getFloatingProps: getMenuFloatingProps,
    getItemProps,
  } = useInteractions([
    useClick(menuContext, { enabled: hasMenu }),
    useDismiss(menuContext),
    useRole(menuContext, { role: "menu" }),
    useListNavigation(menuContext, {
      listRef: menuListRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
  ]);

  // ---- Tooltip floating ----
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipEnabled = !!tooltipContent && !menuOpen;

  const {
    refs: tooltipRefs,
    floatingStyles: tooltipFloatingStyles,
    context: tooltipContext,
  } = useFloating({
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    placement: "bottom",
    strategy: "fixed",
    transform: false,
    middleware: [offset(10), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const {
    getReferenceProps: getTooltipRefProps,
    getFloatingProps: getTooltipFloatingProps,
  } = useInteractions([
    useHover(tooltipContext, {
      enabled: tooltipEnabled,
      move: false,
      delay: { open: 150, close: 0 },
    }),
    useFocus(tooltipContext, { enabled: tooltipEnabled }),
    // referencePress: true closes the tooltip when the trigger is pressed (so it
    // doesn't stack on top of the opening menu)
    useDismiss(tooltipContext, { referencePress: true }),
    useRole(tooltipContext, { role: "tooltip" }),
  ]);

  // Merge refs from both floating instances onto a single trigger element
  const triggerRef = useMergeRefs([menuRefs.setReference, tooltipRefs.setReference]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={clsx(styles.trigger, styles[size])}
        aria-label={ariaLabel ?? name ?? "Account"}
        aria-haspopup={hasMenu ? "menu" : undefined}
        aria-expanded={hasMenu ? menuOpen : undefined}
        {...getMenuRefProps(getTooltipRefProps())}
      >
        {src ? (
          <Image
            src={src}
            alt={name ?? "User avatar"}
            width={px}
            height={px}
            className={styles.image}
          />
        ) : (
          <span className={styles.fallbackIcon} aria-hidden="true">
            <UserIcon />
          </span>
        )}
      </button>

      {/* Tooltip — gated on open state directly; CSS @keyframes handles the enter animation */}
      {tooltipOpen && tooltipContent && (
        <FloatingPortal>
          <div
            ref={tooltipRefs.setFloating}
            className={styles.tooltip}
            style={tooltipFloatingStyles}
            {...getTooltipFloatingProps()}
          >
            {tooltipContent}
          </div>
        </FloatingPortal>
      )}

      {/* Context menu — same pattern */}
      {menuOpen && hasMenu && (
        <FloatingPortal>
          <FloatingFocusManager context={menuContext} modal={false}>
            <div
              ref={menuRefs.setFloating}
              className={styles.menu}
              style={menuFloatingStyles}
              {...getMenuFloatingProps()}
            >
              {menuItems.map((item, i) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  tabIndex={activeIndex === i ? 0 : -1}
                  ref={(node) => {
                    menuListRef.current[i] = node;
                  }}
                  className={clsx(
                    styles.menuItem,
                    item.variant === "danger" && styles.menuItemDanger,
                  )}
                  {...getItemProps({
                    onClick: () => {
                      item.onSelect();
                      setMenuOpen(false);
                    },
                  })}
                >
                  {item.icon && (
                    <span className={styles.menuItemIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
