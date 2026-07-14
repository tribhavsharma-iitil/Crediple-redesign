"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import {
  normalizePath,
  pathsMatch,
  scrollToHash,
  setPendingHash,
  splitHashHref,
} from "@/lib/scrollToHash";

type HashLinkProps = ComponentProps<typeof Link>;

/**
 * Hash links always animate into the target section.
 * Cross-route: navigate without the hash first (avoids an instant jump),
 * then AppShell smooth-scrolls after mount.
 */
export default function HashLink({ href, onClick, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const hrefStr = typeof href === "string" ? href : "";

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !hrefStr.includes("#")) return;

    const { path, hash } = splitHashHref(hrefStr);
    if (!hash) return;

    e.preventDefault();
    const nextPath = normalizePath(path);

    if (pathsMatch(pathname, path)) {
      scrollToHash(hash, "smooth");
      window.history.replaceState(null, "", `${nextPath}#${hash}`);
      return;
    }

    setPendingHash(hash);
    router.push(nextPath);
  };

  return <Link href={href} onClick={handleClick} {...props} />;
}
