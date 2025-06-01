"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChecklistPage() {
  const [checklists, setChecklists] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("work_details").select("*").then(({ data }) => {
      setChecklists(data || []);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">근무 체크리스트</h2>
      <ul>
        {checklists.map(c => (
          <li key={c.id} className="border-b py-2">
            <div>날짜: {c.date}</div>
            <div>이슈: {c.issues}</div>
            <div>인수인계: {c.handover}</div>
            {/* 필요시 checklist 배열도 상세 출력 */}
          </li>
        ))}
      </ul>
    </div>
  );
}
