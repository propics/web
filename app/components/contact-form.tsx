"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).contact;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    try {
      const data = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/contact", {
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
    <form className="booking-form contact-form" onSubmit={submit}>
      <h2>{t.formTitle}</h2>
      <div className="form-row">
        <label>
          {t.name}
          <input name="name" required placeholder={t.namePh} autoComplete="name" />
        </label>
        <label>
          {t.email}
          <input name="email" type="email" required placeholder={t.emailPh} autoComplete="email" />
        </label>
      </div>
      <label>
        {t.phone}
        <input name="phone" required placeholder={t.phonePh} autoComplete="tel" />
      </label>
      <label>
        {t.message}
        <textarea name="message" required rows={5} placeholder={t.messagePh} />
      </label>
      <button className="button primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? t.sending : t.submit}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
