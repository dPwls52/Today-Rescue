import Link from "next/link";

// 오늘 메인 (C 담당) - 오전-1 / ① 마감 메인을 시간대에 따라 전환할 예정.
// 지금은 뼈대 확인용 임시 화면.
export default function Home() {
  return (
    <main className="px-5 py-6">
      <h1 className="text-heading-lg font-bold">오늘구조대</h1>
      <p className="mt-1 text-body-md text-gray-600">뼈대 확인용 임시 메인 화면이에요.</p>

      <section className="mt-6 rounded-2xl bg-primary-50 p-5">
        <p className="text-label-md font-semibold text-primary-600">오전 판매 모드</p>
        <p className="mt-1 text-title-lg font-semibold">
          마감 알림까지 <span className="text-primary-500">3시간 55분</span>
        </p>
      </section>

      <ul className="mt-6 space-y-2 text-body-md">
        <li><Link className="text-primary-600 underline" href="/onboarding">온보딩 (0-0)</Link></li>
        <li><Link className="text-primary-600 underline" href="/onboarding/store">가게 정보 (0-1)</Link></li>
        <li><Link className="text-primary-600 underline" href="/dashboard">대시보드 (⑦)</Link></li>
      </ul>
    </main>
  );
}
