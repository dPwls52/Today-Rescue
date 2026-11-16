"use client";

import { usePathname } from "next/navigation";
import TabBar from "./TabBar";
import { APP_MAX_WIDTH, TAB_BAR_HEIGHT, isTabPath } from "./layout";

/**
 * 모든 화면을 감싸는 틀 (루트 layout.tsx에서만 사용)
 * - 휴대폰 폭(390px)으로 가운데 정렬
 * - 탭 화면(/, /recommend, /records, /dashboard)일 때만 하단 탭바를 붙임
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = isTabPath(pathname);

  return (
    <div
      className="relative mx-auto min-h-dvh w-full bg-white"
      style={{
        maxWidth: APP_MAX_WIDTH,
        paddingBottom: showTabBar
          ? `calc(${TAB_BAR_HEIGHT}px + env(safe-area-inset-bottom))`
          : undefined,
      }}
    >
      {children}
      {showTabBar && <TabBar />}
    </div>
  );
}
