import { useEffect } from "react";

export default function Toast({ items, onRemove }) {
  useEffect(() => {
    const timers = items.map((toast) =>
      setTimeout(() => onRemove(toast.id), 3000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [items, onRemove]);

  return (
    <div className="toast" aria-live="polite" aria-atomic="true">
      {items.map((toast) => (
        <div
          key={toast.id}
          className={`toastItem ${
            toast.type === "error" ? "error" : ""
          }`}
          role={toast.type === "error" ? "alert" : "status"}
        >
          {toast.msg}
        </div>
      ))}
    </div>
  );
}