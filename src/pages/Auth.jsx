import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { supabase } from "../services/supabase.js";
import "../styles/auth.css";

export default function Auth() {
  const { session, authLoading } = useOutletContext();

  const navigate = useNavigate();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!authLoading && session) {
      navigate("/app");
    }
  }, [authLoading, session, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        navigate("/app");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          navigate("/app");
        } else {
          setMessage(
            "Account created. Check your email to confirm your account, then sign in."
          );

          setMode("signin");
          setPassword("");
          setShowPassword(false);
        }
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/app`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setErrorMessage(error.message);
      setGoogleLoading(false);
    }
  }

  function switchMode() {
    setMode((currentMode) =>
      currentMode === "signin" ? "signup" : "signin"
    );

    setMessage("");
    setErrorMessage("");
    setPassword("");
    setShowPassword(false);
  }

  return (
    <main className="auth-page">
      {/* Left Side */}
      <section className="auth-visual">
        <Link to="/" className="auth-brand">
          <img src="/logo.png" alt="" />
          <span>Pathpholio</span>
        </Link>

        <div className="auth-message">
          <p className="auth-eyebrow">YOUR JOB SEARCH, ORGANISED</p>

          <h1>Keep every opportunity within reach.</h1>

          <p>
            Track applications, follow their progress and keep your job search
            organised from one simple workspace.
          </p>
        </div>

        <p className="auth-visual-footer">
          Built by Git It Bunny.
        </p>
      </section>

      {/* Form Side */}
      <section className="auth-form-side">
        <div className="auth-form-container">
          <Link to="/" className="auth-back">
            ← Back to Pathpholio
          </Link>

          <h2>
            {mode === "signin"
              ? "Welcome back."
              : "Create your account."}
          </h2>

          <p className="auth-intro">
            {mode === "signin"
              ? "Sign in to continue managing your applications."
              : "Create an account to start tracking your applications."}
          </p>

          {message && (
            <p className="auth-success-message" role="status">
              {message}
            </p>
          )}

          {errorMessage && (
            <p className="auth-error-message" role="alert">
              {errorMessage}
            </p>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            className="auth-google-button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="auth-google-icon"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.23c0-.74-.07-1.45-.19-2.14H12v4.05h5.24a4.48 4.48 0 01-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.3z"
              />
              <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.83-.87 6.44-2.36l-3.14-2.45c-.87.58-1.98.93-3.3.93-2.54 0-4.69-1.71-5.46-4.01H3.3v2.52A9.75 9.75 0 0012 21.75z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.86A5.87 5.87 0 016.23 12c0-.65.11-1.28.31-1.86V7.62H3.3A9.75 9.75 0 002.25 12c0 1.57.38 3.05 1.05 4.38l3.24-2.52z"
              />
              <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.72.49 3.73 1.45l2.79-2.79C16.82 3.21 14.63 2.25 12 2.25a9.75 9.75 0 00-8.7 5.37l3.24 2.52c.77-2.3 2.92-4.01 5.46-4.01z"
              />
            </svg>

            {googleLoading
              ? "Connecting..."
              : mode === "signin"
                ? "Continue with Google"
                : "Sign up with Google"}
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Email / Password */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-password-row">
                <label htmlFor="password">Password</label>

                {mode === "signin" && (
                  <Link
                    to="/forgot-password"
                    className="auth-forgot"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              <div className="auth-password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete={
                    mode === "signin"
                      ? "current-password"
                      : "new-password"
                  }
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  title={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A9.9 9.9 0 0112 4c5.5 0 9 5 9 5a16.6 16.6 0 01-3.1 3.6M6.2 6.2C4.1 7.6 3 9 3 9s3.5 5 9 5a9.8 9.8 0 003.1-.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "signin"
              ? "New to Pathpholio?"
              : "Already have an account?"}{" "}
            <button type="button" onClick={switchMode}>
              {mode === "signin"
                ? "Create account"
                : "Sign in"}
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}