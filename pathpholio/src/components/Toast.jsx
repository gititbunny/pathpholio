import { useEffect } from "react";

export default function Toast({ items, onRemove }) {
  useEffect(() => {
    const timers = items.map((t) => setTimeout(() => onRemove(t.id), 3000));
    return () => timers.forEach(clearTimeout);
  }, [items, onRemove]);

  return (
    <div className="toast" aria-live="polite">
      {items.map((t) => (
        <div
          key={t.id}
          className={`toastItem ${t.type === "error" ? "error" : ""}`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
