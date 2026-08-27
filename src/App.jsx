import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "./services/supabase.js";
import Toast from "./components/Toast.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addToast = useCallback((msg, type = "success") => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: crypto.randomUUID(),
        msg,
        type,
      },
    ]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return (
    <>
      <Outlet
        context={{
          session,
          authLoading,
          addToast,
        }}
      />

      <Toast
        items={toasts}
        onRemove={removeToast}
      />
    </>
  );
}