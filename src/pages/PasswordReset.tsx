import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function PasswordReset({ reset = false }: { reset?: boolean }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [complete, setComplete] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    try {
      const result = reset
        ? await supabase.auth.updateUser({ password: value })
        : await supabase.auth.resetPasswordForEmail(value, {
            redirectTo: `${window.location.origin}/reset-password`,
          });
      if (result.error) throw result.error;
      setComplete(true);
      setStatus(
        reset
          ? "Your password has been updated."
          : "If an account exists, a password reset link will arrive by email.",
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to complete your request. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="studio-auth min-h-screen flex flex-col gap-8 items-center justify-center p-5">
      <Link to="/" className="studio-auth-brand">
        <img src="/favicon-32x32.png" alt="" />
        Axenora AI
      </Link>
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-card border border-border rounded-md p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold">
          {reset ? "Choose a new password" : "Reset your password"}
        </h1>
        <label className="block space-y-2">
          <span>{reset ? "New password" : "Account email"}</span>
          <Input
            type={reset ? "password" : "email"}
            autoComplete={reset ? "new-password" : "email"}
            minLength={reset ? 8 : undefined}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <Button className="w-full" disabled={busy || complete}>
          {busy
            ? "Please wait..."
            : reset
              ? "Update password"
              : "Send reset link"}
        </Button>
        {status && (
          <p role="status" className="text-sm">
            {status}
          </p>
        )}
        <Link className="block text-sm underline" to="/login">
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
