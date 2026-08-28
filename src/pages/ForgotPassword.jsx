import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase.js";
import "../styles/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage(
        "Password reset email sent. Check your inbox and follow the link to create a new password."
      );
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
          <p className="auth-eyebrow">ACCOUNT RECOVERY</p>

          <h1>Get back to your job search.</h1>

          <p>
            Enter the email address connected to your Pathpholio account and
            we’ll send you a secure link to create a new password.
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

          <h2>Forgot your password?</h2>

          <p className="auth-intro">
            Enter your email address and we’ll send you a password reset link.
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
              <label htmlFor="reset-email">Email address</label>

              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-switch">
            Remembered your password?{" "}
            <Link to="/auth" className="auth-forgot">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}