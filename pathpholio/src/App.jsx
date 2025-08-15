import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import Header from "./components/Header.jsx";
import Toast from "./components/Toast.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => subscription.unsubscribe();
  }, []);

  const addToast = (msg, type = "success") =>
    setToasts((t) => [...t, { id: crypto.randomUUID(), msg, type }]);

  return (
    <div className="container">
      <Header session={session} />
      <Outlet context={{ session, addToast }} />
      <Toast
        items={toasts}
        onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
      />
      <footer style={{ opacity: 0.85, textAlign: "center", marginTop: "16px" }}>
        Built by{" "}
        <a href="https://www.linkedin.com/in/ninankhwashu/" target="_blank">
          Nina Nkhwashu
        </a>
        .
      </footer>
    </div>
  );
}
