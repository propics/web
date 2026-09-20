"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function BookingForm({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).bookDemo;
  const now = new Date();
  const [view, setView] = useState(new Date(now.getFullYear(), now.getMonth() + 1, 1));
  const [day, setDay] = useState(6);
  const [time, setTime] = useState(t.slots[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const cells = useMemo(() => {
    const year = view.getFullYear();
    const month = view.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const leading = Array.from({ length: firstWeekday }, (_, i) => ({
      day: daysInPrev - firstWeekday + i + 1,
      outside: true as const,
    }));
    const current = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      outside: false as const,
    }));
    const trailingCount = (7 - ((leading.length + current.length) % 7)) % 7;
    const trailing = Array.from({ length: trailingCount }, (_, i) => ({
      day: i + 1,
      outside: true as const,
    }));
    return [...leading, ...current, ...trailing];
  }, [view]);

  const date = `${view.getFullYear()}-${String(view.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  function changeMonth(amount: number) {
    setView(new Date(view.getFullYear(), view.getMonth() + amount, 1));
    setDay(1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (response.ok) {
        setStatus("success");
        setMessage(result.message || t.success);
        form.reset();
      } else {
        setStatus("error");
        setMessage(result.message || t.error);
      }
    } catch {
      setStatus("error");
      setMessage(t.connectionFailed);
    }
  }

  return (
    <form className="demo-booking" onSubmit={submit}>
      <h2>{t.selectDate}</h2>
      <div className="scheduler">
        <div className="calendar">
          <div className="calendar-head">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            />
            <strong>
              <small>{view.getFullYear()}</small>
              {t.months[view.getMonth()]}
            </strong>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            />
          </div>
          <div className="weekdays">
            {t.weekdays.map((x) => (
              <b key={x}>{x}</b>
            ))}
          </div>
          <div className="days">
            {cells.map((cell, index) =>
              cell.outside ? (
                <span className="outside" key={index}>
                  {cell.day}
                </span>
              ) : (
                <button
                  type="button"
                  className={cell.day === day ? "selected" : ""}
                  onClick={() => setDay(cell.day)}
                  key={index}
                >
                  {cell.day}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="slots">
          <h3>{t.availableSlots}</h3>
          {t.slots.map((slot) => (
            <button
              type="button"
              className={time === slot ? "selected" : ""}
              onClick={() => setTime(slot)}
              key={slot}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="time" value={time} />
      <div className="booking-details">
        <label>
          {t.name}
          <input name="name" required placeholder={t.namePh} />
        </label>
        <label>
          {t.company}
          <input name="company" required placeholder={t.companyPh} />
        </label>
        <label>
          {t.phone}
          <input name="phone" required placeholder={t.phonePh} />
        </label>
        <label>
          {t.email}
          <input name="email" type="email" required placeholder={t.emailPh} />
        </label>
      </div>
      <button className="confirm-booking" disabled={status === "loading"}>
        {status === "loading" ? t.booking : t.confirm}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
