"use client";

import { useState } from "react";

const PRESETS = [1000, 2000, 3000, 4000]; // cents

export default function DonateForm() {
  const [amountCents, setAmountCents] = useState<number>(2000);
  const [custom, setCustom] = useState("");
  const [coverFee, setCoverFee] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "error">("idle");
  const [message, setMessage] = useState("");

  function chooseCustom(value: string) {
    setCustom(value);
    const dollars = Number(value);
    if (Number.isFinite(dollars) && dollars > 0) {
      setAmountCents(Math.round(dollars * 100));
    }
  }

  async function donate() {
    setStatus("working");
    setMessage("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents, coverFee }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Donation could not be started.");
      }
      window.location.href = data.url;
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Something broke. Try again."
      );
    }
  }

  const customActive = custom !== "";

  return (
    <div className="donate">
      <div className="donate-presets" role="radiogroup" aria-label="Amount">
        {PRESETS.map((cents) => {
          const active = !customActive && amountCents === cents;
          return (
            <button
              key={cents}
              type="button"
              role="radio"
              aria-checked={active}
              className={`variant-option${active ? " is-active" : ""}`}
              onClick={() => {
                setCustom("");
                setAmountCents(cents);
              }}
            >
              ${cents / 100}
            </button>
          );
        })}
      </div>

      <label className="donate-custom">
        <span className="variant-label">Or name your own</span>
        <span className="donate-custom-field">
          <span aria-hidden="true">$</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            max={10000}
            placeholder="50"
            value={custom}
            onChange={(e) => chooseCustom(e.target.value)}
          />
        </span>
      </label>

      <label className="donate-fee">
        <input
          type="checkbox"
          checked={coverFee}
          onChange={(e) => setCoverFee(e.target.checked)}
        />
        <span>Add 3% to cover the card fees</span>
      </label>

      <button
        type="button"
        className="button"
        onClick={donate}
        disabled={status === "working"}
      >
        {status === "working" ? "One moment…" : "Keep Us Going"}
      </button>

      {status === "error" && (
        <p className="purchase-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
