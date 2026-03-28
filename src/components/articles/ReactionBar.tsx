"use client";

import { useOptimistic, useTransition } from "react";
import { toggleReaction } from "@/actions/reactions";
import styles from "./ReactionBar.module.css";

const REACTION_TYPES = [
  { type: "like", emoji: "\u{1F44D}" },
  { type: "clap", emoji: "\u{1F44F}" },
  { type: "fire", emoji: "\u{1F525}" },
];

export function ReactionBar({
  articleSlug,
  initialCounts,
  initialUserReactions,
}: {
  articleSlug: string;
  initialCounts: Record<string, number>;
  initialUserReactions: string[];
}) {
  const [isPending, startTransition] = useTransition();

  const [optimistic, setOptimistic] = useOptimistic(
    { counts: initialCounts, userReactions: initialUserReactions },
    (state, toggledType: string) => {
      const hasReaction = state.userReactions.includes(toggledType);
      return {
        counts: {
          ...state.counts,
          [toggledType]: (state.counts[toggledType] ?? 0) + (hasReaction ? -1 : 1),
        },
        userReactions: hasReaction
          ? state.userReactions.filter((t) => t !== toggledType)
          : [...state.userReactions, toggledType],
      };
    }
  );

  function handleClick(type: string) {
    startTransition(async () => {
      setOptimistic(type);
      await toggleReaction(articleSlug, type);
    });
  }

  return (
    <div className={styles.bar}>
      {REACTION_TYPES.map(({ type, emoji }) => {
        const count = optimistic.counts[type] ?? 0;
        const active = optimistic.userReactions.includes(type);

        return (
          <button
            key={type}
            onClick={() => handleClick(type)}
            disabled={isPending}
            className={`${styles.reaction} ${active ? styles.active : ""}`}
          >
            <span>{emoji}</span>
            {count > 0 && <span className={styles.count}>{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
