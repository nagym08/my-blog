"use client";

import { useEffect, useRef } from "react";
import { trackView } from "@/actions/views";

export function ViewTracker({ slug }: { slug: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackView(slug);
  }, [slug]);

  return null;
}
