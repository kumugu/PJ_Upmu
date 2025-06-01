"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FaCalendarAlt, FaMoneyCheckAlt, FaClipboardCheck, FaBell, FaSignInAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [recentSchedule, setRecentSchedule] = useState<any>(null);
  const [recentSalary, setRecentSalary] = useState<any>(null);
  const [recentChecklist, setRecentChecklist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 알림/공지 예시
  const notices = [
    { id: 1, text: "6월 5일 야간근무자 교육이 있습니다." },
    { id: 2, text: "급여 정산은 매월 10일 진행됩니다." }
  ];

  useEffect(() => {
    const supabase = createClient();

    // 사용자 정보 가져오기
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);

      if (data.user) {
        const userId = data.user.id;

        // 최근 근무 스케줄
        supabase
          .from("work_schedules")
          .select("*")
          .eq("userId", userId)
          .order("date", { ascending: false })
          .limit(1)
          .then(({ data }) => setRecentSchedule(data?.[0]));

        // 최근 급여
        supabase
          .from("salaries")
          .select("*")
          .eq("userId", userId)
          .order("date", { ascending: false })
          .limit(1)
          .then(({ data }) => setRecentSalary(data?.[0]));

        // 최근 체크리스트
        supabase
          .from("work_details")
          .select("*")
          .eq("userId", userId)
          .order("date", { ascending: false })
          .limit(1)
          .then(({ data }) => setRecentChecklist(data?.[0]));
      }
      setLoading(false);
    });
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.reload();
  };

  // 로그인 페이지 이동
  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-0">
      {/* 상단바 */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <FaUserCircle size={28} className="text-blue-600" />
          <span className="font-semibold text-lg text-gray-700">
            {user ? `${user.email}님 환영합니다!` : "로그인 해주세요"}
          </span>
        </div>
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
            >
              <FaSignOutAlt />
              로그아웃
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              <FaSignInAlt />
              로그인
            </button>
          )}
        </div>
      </header>

      {/* 알림/공지 영역 */}
      <section className="w-full max-w-xl mt-6 px-6">
        <div className="flex items-center gap-2 mb-2">
          <FaBell className="text-yellow-500" />
          <span className="font-semibold text-gray-800">공지사항 & 알림</span>
        </div>
        <ul className="bg-yellow-50 border-l-4 border-yellow-400 rounded p-3 mb-6 shadow-sm">
          {notices.map(n => (
            <li key={n.id} className="text-sm text-gray-700 mb-1 last:mb-0">• {n.text}</li>
          ))}
        </ul>
      </section>

      {/* 대시보드 카드 */}
      <section className="w-full max-w-xl grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {/* 근무 스케줄 */}
        <a
          href="/schedule"
          className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-blue-100 group"
        >
          <FaCalendarAlt size={32} className="text-blue-500 mb-2 group-hover:scale-110 transition" />
          <span className="font-semibold text-lg mb-2">근무 스케줄</span>
          <div className="text-sm text-gray-500">
            {recentSchedule ? (
              <>
                <div>날짜: {recentSchedule.date}</div>
                <div>시간: {recentSchedule.startTime} ~ {recentSchedule.endTime}</div>
                <div>유형: {recentSchedule.workType}</div>
              </>
            ) : (
              <div>최근 근무 내역 없음</div>
            )}
          </div>
        </a>

        {/* 급여 관리 */}
        <a
          href="/salary"
          className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-green-100 group"
        >
          <FaMoneyCheckAlt size={32} className="text-green-500 mb-2 group-hover:scale-110 transition" />
          <span className="font-semibold text-lg mb-2">급여 관리</span>
          <div className="text-sm text-gray-500">
            {recentSalary ? (
              <>
                <div>날짜: {recentSalary.date}</div>
                <div>급여: {recentSalary.pay?.toLocaleString()}원</div>
                <div>비고: {recentSalary.memo || "-"}</div>
              </>
            ) : (
              <div>최근 급여 내역 없음</div>
            )}
          </div>
        </a>

        {/* 체크리스트 */}
        <a
          href="/checklist"
          className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-yellow-100 group"
        >
          <FaClipboardCheck size={32} className="text-yellow-500 mb-2 group-hover:scale-110 transition" />
          <span className="font-semibold text-lg mb-2">업무 체크리스트</span>
          <div className="text-sm text-gray-500">
            {recentChecklist ? (
              <>
                <div>날짜: {recentChecklist.date}</div>
                <div>이슈: {recentChecklist.issues || "없음"}</div>
                <div>인수인계: {recentChecklist.handover || "없음"}</div>
              </>
            ) : (
              <div>최근 체크리스트 없음</div>
            )}
          </div>
        </a>
      </section>

      {/* 로딩 처리 */}
      {loading && (
        <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}
    </main>
  );
}
