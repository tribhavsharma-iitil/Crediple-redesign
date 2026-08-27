"use client";

import { useEffect, useRef } from "react";
import { blogStreamUrl } from "@/lib/blogs";

const RECONNECT_DELAY_MS = 3000;

/**
 * Subscribes to the CMS's live blog-change stream for as long as the
 * component is mounted, and calls `onChange` for every real event
 * (heartbeats are ignored).
 *
 * Uses `fetch` + manual SSE parsing instead of the native `EventSource` API.
 * EventSource can't send custom request headers, and the CMS's dev tunnel
 * (ngrok free tier) requires an `ngrok-skip-browser-warning` header on
 * every browser request — otherwise it serves an interstitial page instead
 * of the real stream, which shows up in devtools as a CORS error since the
 * interstitial has no CORS headers. `fetch` can set that header. This also
 * works unchanged once the backend moves off the ngrok tunnel — it's a
 * strict superset of what EventSource could do here.
 */
export function useBlogStream(onChange: () => void) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const url = blogStreamUrl();
    if (!url) return;

    const controller = new AbortController();
    let stopped = false;

    async function connect() {
      while (!stopped) {
        try {
          const res = await fetch(url as string, {
            headers: { "ngrok-skip-browser-warning": "true" },
            signal: controller.signal,
          });
          if (!res.ok || !res.body) throw new Error(`Stream request failed: ${res.status}`);

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          console.log("[blog stream] connected");

          while (!stopped) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            let boundary;
            while ((boundary = buffer.indexOf("\n\n")) !== -1) {
              const rawEvent = buffer.slice(0, boundary);
              buffer = buffer.slice(boundary + 2);

              const data = rawEvent
                .split("\n")
                .filter((line) => line.startsWith("data:"))
                .map((line) => line.slice(5).trim())
                .join("\n");
              if (!data) continue;

              try {
                const payload = JSON.parse(data);
                if (payload?.type === "heartbeat") {
                  console.log("[blog stream] heartbeat");
                  continue;
                }
              } catch {
                // Non-JSON payload — treat it as a change signal too.
              }
              console.log("[blog stream] change event — refreshing");
              onChangeRef.current();
            }
          }
        } catch {
          // Connection dropped or failed — fall through to reconnect below,
          // unless we were the ones who aborted it on unmount.
        }

        if (stopped) return;
        await new Promise((resolve) => setTimeout(resolve, RECONNECT_DELAY_MS));
      }
    }

    connect();

    return () => {
      stopped = true;
      controller.abort();
    };
  }, []);
}
