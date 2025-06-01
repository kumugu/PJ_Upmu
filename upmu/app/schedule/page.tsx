"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("work_schedules").select("*").then(({ data }) => {
      setSchedules(data || []);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">근무 스케줄</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>날짜</th>
            <th>시작</th>
            <th>종료</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(s => (
            <tr key={s.id}>
              <td>{s.date}</td>
              <td>{s.startTime}</td>
              <td>{s.endTime}</td>
              <td>{s.workType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
