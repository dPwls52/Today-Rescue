/** 앱 화면 최대 너비(px). 데스크톱에서 열어도 휴대폰 폭으로 가운데 보이게 함 */
export const APP_MAX_WIDTH = 390;

/** 하단 탭바 높이(px). 탭 화면의 콘텐츠가 탭바에 가리지 않도록 여백으로도 씀 */
export const TAB_BAR_HEIGHT = 64;

/** 하단 탭바 4칸. 경로는 팀에서 약속한 URL */
export const TABS = [
  { key: "today", label: "오늘", href: "/" },
  { key: "recommend", label: "추천", href: "/recommend" }, // B 담당 ⑧ (경로 B와 확인)
  { key: "records", label: "기록", href: "/records" }, // B 담당 ⑥
  { key: "dashboard", label: "대시보드", href: "/dashboard" }, // C 담당 ⑦
] as const;

export type TabKey = (typeof TABS)[number]["key"];

/** 지금 경로가 탭바를 보여줄 화면인지 */
export function isTabPath(pathname: string) {
  return TABS.some((tab) => tab.href === pathname);
}
