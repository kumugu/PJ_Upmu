"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SalaryPage() {
  const [salaries, setSalaries] = useState<any[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("salaries").select("*").then(({ data }) => {
      setSalaries(data || []);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">급여 내역</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>날짜</th>
            <th>급여</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map(s => (
            <tr key={s.id}>
              <td>{s.date}</td>
              <td>{s.pay}</td>
              <td>{s.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
