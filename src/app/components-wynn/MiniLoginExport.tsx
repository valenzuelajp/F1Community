// L13 Mini Login — paste-ready form (matches current builder order/config)
// order: header → error → email → password → remember → login → divider → guest → footer
// width: 520px · bg: Classic · accent: #ff1801 · back: Classic №01
// Pair with the Mini Login "Copy CSS" output as mini-login.css
// Assets: /public/login-btn.svg · /public/guest-btn.svg · /public/mini-login-bg.svg · /public/imgSticker1.png · /public/imgOrnament24.svg

'use client';

import './mini-login.css';
import { useState, type CSSProperties } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

export function FormHeader() {
  return (
    <div className="auth__form-header" style={{ width: '100%' }}>
      <div>
        <h2 className="auth__form-title">
          WELCOME BACK, <span className="components-accent-text">CHAMP</span>
        </h2>
        <p className="auth__form-subtitle">
          LOG IN NOW TO UPDATE YOUR PREDICTIONS BEFORE{' '}
          <span className="components-accent-text">F1</span> BEGINS
        </p>
      </div>
      <div className="auth__form-slashes" aria-hidden="true">
        <span className="auth__form-slash" />
        <span className="auth__form-slash" />
        <span className="auth__form-slash" />
      </div>
    </div>
  );
}

export function ErrorBanner() {
  return (
    <div className="auth-error-banner" style={{ width: '100%' }}>
      <AlertCircle className="auth-error-icon" />
      <span>Invalid credentials. Check email and password.</span>
    </div>
  );
}

export function TextInput() {
  return (
    <div className="auth__input" style={{ width: '100%' }}>
      <div className="auth__input-icon">
        <Mail className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <input
        type="email"
        placeholder="EMAIL ADDRESS"
        className="auth__input-field"
        aria-label="Email address"
      />
    </div>
  );
}

export function PasswordInput({
  visible,
  onVisibleChange,
}: {
  visible?: boolean;
  onVisibleChange?: (v: boolean) => void;
} = {}) {
  const [internal, setInternal] = useState(false);
  const show = visible ?? internal;
  const setShow = (v: boolean) => {
    if (onVisibleChange) onVisibleChange(v);
    else setInternal(v);
  };

  return (
    <div className="auth__input" style={{ width: '100%' }}>
      <div className="auth__input-icon">
        <Lock className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <input
        type={show ? 'text' : 'password'}
        placeholder="PASSWORD"
        className="auth__input-field"
        aria-label="Password"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="auth__password-toggle"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function RememberRow() {
  const [remember, setRemember] = useState(false);

  return (
    <div className="auth__form-options" style={{ width: '100%' }}>
      <label className="auth__remember">
        <input
          type="checkbox"
          className="auth__checkbox"
          checked={remember}
          onChange={() => setRemember((v) => !v)}
        />
        <span>REMEMBER ME</span>
      </label>
      <span className="auth__forgot">FORGOT PASSWORD?</span>
    </div>
  );
}

export function LoginButton({ label = "LOGIN" }: { label?: string } = {}) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className="auth__btn--primary group"
      style={{ width: '100%', height: 38 }}
      disabled={busy}
      onClick={() => {
        if (busy) return;
        setBusy(true);
        setTimeout(() => setBusy(false), 1200);
      }}
    >
      {busy ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>LOGGING IN...</span>
        </>
      ) : (
        <>
          <span className="auth__btn-label">{label}</span>
          <span className="auth__btn-arrow" aria-hidden>
            <span className="components-auth-arrow">›</span>
          </span>
        </>
      )}
    </button>
  );
}

export function OrDivider() {
  return (
    <div className="auth__divider" style={{ width: '100%' }}>
      <span>OR</span>
    </div>
  );
}

export function GuestButton({ label = "CONTINUE AS GUEST" }: { label?: string } = {}) {
  return (
    <button
      type="button"
      className="auth__btn--secondary group"
      style={{ width: '100%', height: 38 }}
    >
      <span className="auth__btn-label">{label}</span>
      <span className="auth__btn-arrow" aria-hidden>
        <span className="components-auth-arrow">›</span>
      </span>
    </button>
  );
}

export function FooterCallout({
  note = "DON'T HAVE AN ACCOUNT?",
  link = "REGISTER >",
}: {
  note?: string;
  link?: string;
} = {}) {
  return (
    <div className="auth__form-footer" style={{ width: '100%' }}>
      <span className="auth__footer-note">{note}</span>
      <span className="auth__footer-link">{link}</span>
    </div>
  );
}

export function AuthBackImage() {
  return (
    <div className="auth-back-image">
      <span className="auth-back-image__num" aria-hidden="true">01</span>
      <img
        className="auth-back-image__ornament"
        src="/imgOrnament24.svg?v=2"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <img
        className="auth-back-image__photo"
        src="/imgSticker1.png?v=1"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </div>
  );
}

export function MiniLogin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // RememberRow manages its own checkbox state

  return (
    <div className="mini-login-scene">
      <div
        className="mini-login__back"
        aria-hidden="true"
        data-back-variant="classic"
      >
        <AuthBackImage />
      </div>
      <div
        className={'mini-login mini-login--bg-classic'}
        style={
          {
            width: 520,
            ['--auth-accent']: "#ff1801",
          } as CSSProperties
        }
      >
        {<FormHeader />}
        {<ErrorBanner />}
        {<TextInput />}
        {<PasswordInput visible={passwordVisible} onVisibleChange={setPasswordVisible} />}
        {<RememberRow />}
        {<LoginButton label={"LOGIN"} />}
        {<OrDivider />}
        {<GuestButton label={"CONTINUE AS GUEST"} />}
        {<FooterCallout note={"DON'T HAVE AN ACCOUNT?"} link={"REGISTER >"} />}
      </div>
    </div>
  );
}
