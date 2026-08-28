import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase.js";
import "../styles/auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      setMessage("Your password has been updated successfully.");

      await supabase.auth.signOut();

      setTimeout(() => {
        navigate("/auth");
      }, 1800);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
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
          <p className="auth-eyebrow">SECURE YOUR ACCOUNT</p>

          <h1>Create a new password.</h1>

          <p>
            Choose a new password for your Pathpholio account and continue
            managing your job search.
          </p>
        </div>

        <p className="auth-visual-footer">
          Built by Git It Bunny.
        </p>
      </section>

      {/* Form Side */}
      <section className="auth-form-side">
        <div className="auth-form-container">
          <Link to="/auth" className="auth-back">
            ← Back to sign in
          </Link>

          <h2>Set a new password.</h2>

          <p className="auth-intro">
            Enter and confirm your new password below.
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

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="new-password">
                New password
              </label>

              <div className="auth-password-input">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter a new password"
                  autoComplete="new-password"
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

            <div className="auth-field">
              <label htmlFor="confirm-password">
                Confirm password
              </label>

              <div className="auth-password-input">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Enter your new password again"
                  autoComplete="new-password"
                  minLength="6"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmed password"
                      : "Show confirmed password"
                  }
                  title={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
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
                ? "Updating..."
                : "Update Password"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}