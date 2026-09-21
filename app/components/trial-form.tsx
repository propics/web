"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDictionary, localePath } from "@/lib/i18n";

function FileDrop({
  name,
  title,
  dragDrop,
  orSelect,
  selectFile,
  wide,
}: {
  name: string;
  title: string;
  dragDrop: string;
  orSelect: string;
  selectFile: string;
  wide?: boolean;
}) {
  const [fileName, setFileName] = useState("");

  return (
    <label className={wide ? "wide" : undefined}>
      <span>
        {title} <b>*</b>
      </span>
      <div className={"file-drop" + (fileName ? " has-file" : "")}>
        <input
          name={name}
          type="file"
          required
          accept="image/*,.pdf,.doc,.docx"
          onChange={(event) =>
            setFileName(event.target.files?.[0]?.name || "")
          }
        />
        {fileName ? (
          <span>{fileName}</span>
        ) : (
          <span>
            {dragDrop}
            <br />
            {orSelect} <em>{selectFile}</em>
          </span>
        )}
      </div>
    </label>
  );
}

function PhoneInput({
  name,
  title,
  countryCode,
  placeholder,
}: {
  name: string;
  title: string;
  countryCode: string;
  placeholder: string;
}) {
  return (
    <label>
      <span>
        {title} <b>*</b>
      </span>
      <div className="trial-phone">
        <span className="trial-phone-code">{countryCode}</span>
        <input
          name={name}
          required
          inputMode="tel"
          autoComplete="tel-national"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

export function TrialForm({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale).trial;
  const [type, setType] = useState<"individual" | "company">("company");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("type");
    if (requested === "individual" || requested === "company") setType(requested);
  }, []);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = { userType: type };

    formData.forEach((value, key) => {
      data[key] = value instanceof File ? value.name : String(value);
    });

    const prefix = t.countryCode.replace(/\s/g, "");
    for (const key of ["phone", "companyPhone"]) {
      const raw = (data[key] || "").replace(/\s/g, "");
      if (!raw) continue;
      data[key] = raw.startsWith("+") ? raw : `${prefix}${raw.replace(/^0/, "")}`;
    }

    try {
      const response = await fetch("/api/free-trial", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (response.ok) {
        setStatus("success");
        setMessage(result.message || t.successBody);
      } else {
        setStatus("error");
        setMessage(result.message || t.error);
      }
    } catch {
      setStatus("error");
      setMessage(t.connectionFailed);
    }
  }

  if (status === "success") {
    return (
      <div className="trial-success" role="status">
        <h2>
          <span className="trial-success-check" aria-hidden="true">
            ✓
          </span>
          {t.successTitle}
        </h2>
        <p>{t.successBody}</p>
        <Link className="button primary" href={localePath(locale)}>
          {t.goBack}
        </Link>
      </div>
    );
  }

  return (
    <form className="trial-form" onSubmit={submit}>
      <section className="trial-section">
        <h2>{t.userType}</h2>
        <div className="user-types">
          <label>
            <input
              type="radio"
              name="userTypeChoice"
              checked={type === "individual"}
              onChange={() => setType("individual")}
            />
            {t.individual}
          </label>
          <label>
            <input
              type="radio"
              name="userTypeChoice"
              checked={type === "company"}
              onChange={() => setType("company")}
            />
            {t.company}
          </label>
        </div>
      </section>

      {type === "company" && (
        <section className="trial-section">
          <h2>{t.companyInfo}</h2>
          <div className="trial-fields">
            <label>
              <span>
                {t.companyName} <b>*</b>
              </span>
              <input name="company" required placeholder={t.companyNamePh} />
            </label>
            <PhoneInput
              name="companyPhone"
              title={t.mobile}
              countryCode={t.countryCode}
              placeholder={t.mobilePh}
            />
            <label className="wide">
              <span>
                {t.officialEmail} <b>*</b>
              </span>
              <input
                name="companyEmail"
                type="email"
                required
                placeholder={t.officialEmailPh}
              />
            </label>
            <FileDrop
              name="commercialRegistration"
              title={t.commercialRegistration}
              dragDrop={t.dragDrop}
              orSelect={t.orSelect}
              selectFile={t.selectFile}
            />
            <FileDrop
              name="taxDocument"
              title={t.taxDocument}
              dragDrop={t.dragDrop}
              orSelect={t.orSelect}
              selectFile={t.selectFile}
            />
          </div>
        </section>
      )}

      <section className="trial-section">
        <h2>{t.personalInfo}</h2>
        <div className="trial-fields">
          <label>
            <span>
              {t.fullName} <b>*</b>
            </span>
            <input name="name" required placeholder={t.fullNamePh} autoComplete="name" />
          </label>
          <PhoneInput
            name="phone"
            title={t.mobile}
            countryCode={t.countryCode}
            placeholder={t.mobilePh}
          />
          <label className="wide">
            <span>
              {t.email} <b>*</b>
            </span>
            <input
              name="email"
              type="email"
              required
              placeholder={t.emailPh}
              autoComplete="email"
            />
          </label>
          <FileDrop
            wide
            name="idDocument"
            title={t.idDocument}
            dragDrop={t.dragDrop}
            orSelect={t.orSelect}
            selectFile={t.selectFile}
          />
        </div>
      </section>

      <button className="trial-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? t.sending : t.submit}
      </button>
      {message && <p className={`form-message ${status}`}>{message}</p>}
    </form>
  );
}
