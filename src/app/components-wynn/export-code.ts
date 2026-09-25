/**
 * Paste-ready export snippets for Login / Mini Login Copy chips.
 * Keep in sync with page.tsx renderers + auth-forms.css / components.css.
 *
 * Export rules (Copy TSX / Copy CSS):
 * - Bake decisions resolved at copy time into the output (variant, labels,
 *   accent, bg, order, width). Emit the final className / CSS rules — do NOT
 *   emit runtime branches the recipient does not need.
 * - Copy CSS includes only rules that apply to the selected variant/order.
 * - Live showcase components may keep runtime props; exports should not.
 * - TSX must be a single module: at most one 'use client', one import block,
 *   no mid-file directives/imports. Use finalizeTsx() for every Copy TSX.
 * - CSS width must match the TSX width baked at copy time.
 */

export type LoginExportMeta = {
  type: string;
  id: string;
  name: string;
  tag: string;
  paletteLabel?: string;
  variants?: string[];
  defaultInMini?: boolean;
  usage?: string;
};

export type MiniExportConfig = {
  loginVariant: 'Classic' | 'Variant 2';
  guestVariant: 'Classic' | 'Variant 2';
  bgVariant: 'Classic' | 'Variant 2' | 'Variant 3';
  accent: string;
  passwordVisible: boolean;
  loginLabel: string;
  guestLabel: string;
  footerNote: string;
  footerLink: string;
};

function hasVariants(def: LoginExportMeta) {
  return (def.variants?.length ?? 0) > 1;
}

function resolveVariant(def: LoginExportMeta, variant: string) {
  return hasVariants(def) ? variant : 'Classic';
}

function tsxHeader(def: LoginExportMeta, variant: string) {
  const active = resolveVariant(def, variant);
  return [
    `// ${def.id} — ${def.name} [${def.tag}]`,
    hasVariants(def) ? `// variant: ${active}` : '// variant: Classic (no variants)',
    '// Drop into a client component · deps: lucide-react (icons), react (state where used)',
    '',
  ].join('\n');
}

function cssHeader(def: LoginExportMeta, variant: string) {
  const active = resolveVariant(def, variant);
  return [
    `/* ${def.id} — ${def.name} [${def.tag}]`,
    hasVariants(def) ? ` * variant: ${active}` : ' * variant: Classic (no variants)',
    ' * Source: src/components/auth/auth-forms.css (+ components.css for SVG / accent)',
    ' */',
    '',
  ].join('\n');
}

const ARROW_CSS = `.components-auth-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.35);
  font-size: 0.9rem;
  line-height: 1;
  color: #ffffff;
}
`;

const LOGIN_SVG_CSS = `.components-login-svg-btn {
  height: 38px !important;
  min-height: 38px !important;
  max-height: 38px !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: url('/login-btn.svg?v=2') !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  box-shadow: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.components-login-svg-btn:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.components-login-svg-btn:disabled {
  opacity: 0.7;
}
`;

const GUEST_SVG_CSS = `.components-guest-svg-btn {
  height: 38px !important;
  min-height: 38px !important;
  max-height: 38px !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: url('/guest-btn.svg?v=1') !important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  border: none !important;
  box-shadow: none !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.components-guest-svg-btn:hover {
  background-color: transparent !important;
  border-color: transparent !important;
  filter: brightness(1.08);
  transform: translateY(-1px);
}
`;

const INPUT_CSS = `.auth__input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.375rem;
  background-color: #1a2332;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.auth__input:focus-within {
  border-color: #ff1801;
  box-shadow: 0 0 0 1px rgba(255, 24, 1, 0.4);
}

.auth__input-icon {
  position: absolute;
  left: 0.75rem;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.auth__input-field {
  width: 100%;
  background: transparent;
  padding: 0.6rem 2.25rem 0.6rem 2.25rem;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #ffffff;
  outline: none;
}

.auth__input-field::placeholder {
  color: rgba(255, 255, 255, 0.45);
  font-size: 9.5px;
  letter-spacing: 0.08em;
}

.auth__input-field.has-error {
  color: #fca5a5;
}
`;

const PASSWORD_TOGGLE_CSS = `.auth__password-toggle {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: color 0.15s ease;
}

.auth__password-toggle:hover {
  color: #ffffff;
}
`;

const EMAIL_TSX = `'use client';

import { Mail } from 'lucide-react';

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
`;

const PASSWORD_TSX = `'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

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
`;

const ERROR_TSX = `'use client';

import { AlertCircle } from 'lucide-react';

export function ErrorBanner() {
  return (
    <div className="auth-error-banner" style={{ width: '100%' }}>
      <AlertCircle className="auth-error-icon" />
      <span>Invalid credentials. Check email and password.</span>
    </div>
  );
}
`;

const STATUS_TSX = `export function StatusBanner() {
  return (
    <p className="auth-status-banner" role="status" style={{ width: '100%' }}>
      Account created. Log in to join the grid.
    </p>
  );
}
`;

const REMEMBER_TSX = `'use client';

import { useState } from 'react';

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
`;

function loginBtnTsX(variant: string, label: string) {
  const cls =
    variant === 'Variant 2'
      ? 'auth__btn--primary group components-login-svg-btn'
      : 'auth__btn--primary group';
  return `'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function LoginButton({ label = ${JSON.stringify(label)} }: { label?: string } = {}) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className="${cls}"
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
`;
}

function guestBtnTsX(variant: string, label: string) {
  const cls =
    variant === 'Variant 2'
      ? 'auth__btn--secondary group components-guest-svg-btn'
      : 'auth__btn--secondary group';
  return `export function GuestButton({ label = ${JSON.stringify(label)} }: { label?: string } = {}) {
  return (
    <button
      type="button"
      className="${cls}"
      style={{ width: '100%', height: 38 }}
    >
      <span className="auth__btn-label">{label}</span>
      <span className="auth__btn-arrow" aria-hidden>
        <span className="components-auth-arrow">›</span>
      </span>
    </button>
  );
}
`;
}

const DIVIDER_TSX = `export function OrDivider() {
  return (
    <div className="auth__divider" style={{ width: '100%' }}>
      <span>OR</span>
    </div>
  );
}
`;

const TABS_TSX = `'use client';

import { useState } from 'react';
import { Flag, ShoppingBag } from 'lucide-react';

export function PlatformTabs() {
  const [tab, setTab] = useState<'f1' | 'store'>('f1');

  return (
    <div className="auth-tab-switcher" style={{ width: '100%', maxWidth: '16rem' }}>
      <button
        type="button"
        onClick={() => setTab('f1')}
        className={\`auth-tab-btn \${tab === 'f1' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}\`}
      >
        <Flag className="w-3.5 h-3.5" />
        F1 Website
      </button>
      <button
        type="button"
        onClick={() => setTab('store')}
        className={\`auth-tab-btn \${tab === 'store' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}\`}
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        F1 Store
      </button>
    </div>
  );
}
`;

const SOCIAL_TSX = `export function SocialAuth() {
  return (
    <div style={{ width: '100%', maxWidth: '16rem' }}>
      <div className="social-auth-divider">
        <div className="social-auth-divider-line" />
        <span className="social-auth-divider-label">Or continue with</span>
      </div>
      <div className="social-auth-grid">
        <button type="button" className="social-auth-btn">
          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          Google
        </button>
        <button type="button" className="social-auth-btn">
          <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 170 170" aria-hidden>
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.72.13-9.57-1.97-14.56-6.3-3.14-2.76-7.05-7.44-11.75-14.04-6.62-9.49-11.89-20.4-15.82-32.73-3.92-12.33-5.89-24.36-5.89-36.09 0-15.42 3.86-28.32 11.58-38.69 7.72-10.37 17.65-15.68 29.79-15.93 5.41 0 11.22 1.34 17.43 4.02 6.21 2.68 10.32 4.06 12.33 4.14 1.77 0 5.92-1.42 12.45-4.26 6.53-2.84 12.28-4.14 17.25-3.9 13.06.63 23.51 5.37 31.35 14.22-11.53 6.94-17.15 16.71-16.86 29.31.28 9.94 4.12 18.23 11.52 24.87 7.4 6.64 16.27 10.37 26.61 11.19-2.27 6.84-5.32 13.91-9.15 21.21z" />
          </svg>
          Apple
        </button>
      </div>
    </div>
  );
}
`;

const HEADER_TSX = `export function FormHeader() {
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
`;

function footerTsX(note: string, link: string) {
  return `export function FooterCallout({
  note = ${JSON.stringify(note)},
  link = ${JSON.stringify(link)},
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
`;
}

function stickerTsX(num: string) {
  const raw = (num ?? '').replace(/\D/g, '').slice(0, 2);
  const display = raw ? raw.padStart(2, '0') : '01';
  return `export function AuthBackImage() {
  return (
    <div className="auth-back-image">
      <span className="auth-back-image__num" aria-hidden="true">${display}</span>
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
`;
}

const STICKER_CSS = `@import url('https://fonts.googleapis.com/css2?family=Karantina&display=swap');

.auth-back-image {
  position: relative;
  width: 100%;
  aspect-ratio: 7 / 8;
  overflow: hidden;
  container-type: inline-size;
}

.auth-back-image__num {
  position: absolute;
  right: 50%;
  top: -12%;
  z-index: 0;
  font-family: 'Karantina', 'Arial Narrow', sans-serif;
  font-size: min(700px, 60cqw);
  line-height: 1;
  letter-spacing: -0.01em;
  color: transparent;
  -webkit-text-stroke: 2px #ffffff;
  user-select: none;
  pointer-events: none;
}

.auth-back-image__ornament {
  position: absolute;
  left: 50%;
  bottom: calc(1% + 50px);
  width: 50%;
  max-width: none;
  transform: translateX(-40%);
  opacity: 1;
  z-index: 0;
  user-select: none;
  pointer-events: none;
}

.auth-back-image__photo {
  position: absolute;
  top: 60%;
  left: 50%;
  width: 135%;
  height: 135%;
  max-width: none;
  transform: translate(-50%, -50%);
  object-fit: contain;
  z-index: 1;
  user-select: none;
  pointer-events: none;
}
`;

const BACK_IMAGE_CSS = STICKER_CSS.replace(/^@import[^;]+;\s*/, '');

const AUTH_HEADER_TSX = `'use client';

import { useState } from 'react';
import { Flag, ShoppingBag } from 'lucide-react';

export function AuthHeaderBlock() {
  const [tab, setTab] = useState<'f1' | 'store'>('f1');

  return (
    <div className="auth-header-wrap">
      <div className="auth-header-badge">
        <Flag className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        Official F1 Platform Account
      </div>
      <h1 className="auth-header-title" style={{ fontSize: '1.5rem' }}>
        Sign In to <span style={{ color: '#ff1801' }}>F1 Hub</span>
      </h1>
      <p className="auth-header-subtitle" style={{ margin: 0 }}>
        One unified account for live telemetry, standings, and official team merchandise.
      </p>
      <div className="auth-tab-switcher" style={{ margin: 0, width: '100%', maxWidth: '20rem' }}>
        <button
          type="button"
          onClick={() => setTab('f1')}
          className={\`auth-tab-btn \${tab === 'f1' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}\`}
        >
          <Flag className="w-3.5 h-3.5" />
          F1 Website
        </button>
        <button
          type="button"
          onClick={() => setTab('store')}
          className={\`auth-tab-btn \${tab === 'store' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}\`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          F1 Store
        </button>
      </div>
    </div>
  );
}
`;

const EMAIL_CSS = INPUT_CSS;

const PASSWORD_CSS = INPUT_CSS + '\n' + PASSWORD_TOGGLE_CSS;

const ERROR_CSS = `.auth-error-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(239, 68, 68, 0.5);
  background-color: rgba(69, 10, 10, 0.8);
  padding: 0.5rem 0.75rem;
  font-size: 11px;
  color: #fecaca;
}

.auth-error-icon {
  height: 0.875rem;
  width: 0.875rem;
  flex-shrink: 0;
  color: #f87171;
}

.auth-error-text {
  font-size: 10px;
  color: #f87171;
  padding-left: 0.25rem;
}
`;

const STATUS_CSS = `.auth-status-banner {
  border-radius: 0.375rem;
  border: 1px solid rgba(52, 211, 153, 0.4);
  background-color: rgba(6, 78, 59, 0.7);
  padding: 0.5rem 0.75rem;
  font-size: 11px;
  color: #a7f3d0;
}
`;

const REMEMBER_CSS = `.auth__form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: 0.06em;
  padding: 0.15rem 0;
}

.auth__remember {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
}

.auth__checkbox {
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 2px;
  background-color: #1a2332;
  border: 1px solid rgba(255, 255, 255, 0.3);
  accent-color: #ff1801;
}

.auth__forgot {
  color: #ff1801;
  font-weight: 700;
  transition: color 0.15s ease;
}

.auth__forgot:hover {
  color: #ff4d3d;
}
`;

const LOGIN_BASE_CSS = `.auth__btn--primary {
  position: relative;
  display: flex;
  width: 100%;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  background: linear-gradient(90deg, #d31200 0%, #ff1801 100%);
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 24, 1, 0.35);
  transition: all 0.15s ease;
}

.auth__btn--primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.auth__btn--primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth__btn-label {
  font-size: 10.5px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #ffffff;
}

.auth__btn-arrow {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
}
`;

const GUEST_BASE_CSS = `.auth__btn--secondary {
  position: relative;
  display: flex;
  width: 100%;
  height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #07090e;
  border: 1px solid rgba(255, 24, 1, 0.6);
  cursor: pointer;
  transition: all 0.15s ease;
}

.auth__btn--secondary:hover {
  background-color: #0d121c;
  border-color: #ff1801;
}

.auth__btn-label {
  font-size: 10.5px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #ffffff;
}

.auth__btn-arrow {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18px;
  width: 18px;
}
`;

const DIVIDER_CSS = `.auth__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 8.5px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  margin: 0.1rem 0;
}

.auth__divider::before,
.auth__divider::after {
  content: '';
  flex: 1 1 auto;
  min-width: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
`;

const TABS_CSS = `.auth-tab-switcher {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  max-width: 20rem;
  margin: 0 auto;
}

.auth-tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: all 0.15s ease;
}

.auth-tab-btn--active {
  background-color: #dc2626;
  color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.3);
}

.auth-tab-btn--inactive {
  color: #9ca3af;
}

.auth-tab-btn--inactive:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.05);
}
`;

const SOCIAL_CSS = `.social-auth-divider {
  position: relative;
  margin: 1rem 0;
}

.social-auth-divider-line {
  position: relative;
  inset: 0;
  display: flex;
  align-items: center;
}

.social-auth-divider-line::before {
  content: '';
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-auth-divider-label {
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  background-color: #12141d;
  padding: 0 0.75rem;
  color: #9ca3af;
  font-weight: 500;
}

.social-auth-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.social-auth-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #e5e7eb;
  transition: all 0.15s ease;
}

.social-auth-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}
`;

const HEADER_CSS = `.auth__form-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.auth__form-title {
  font-size: 1.15rem;
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1.1;
  letter-spacing: 0.05em;
  color: #ffffff;
}

.auth__form-subtitle {
  margin-top: 0.35rem;
  font-size: 8.5px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.35;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.8);
}

.auth__form-slashes {
  display: flex;
  gap: 0.2rem;
  padding-top: 0.15rem;
  flex-shrink: 0;
}

.auth__form-slash {
  display: inline-block;
  height: 1.1rem;
  width: 0.3rem;
  transform: skewX(-20deg);
  background-color: #ff1801;
}

.components-accent-text {
  color: #ff1801;
}
`;

const FOOTER_CSS = `.auth__form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding-top: 0.4rem;
}

.auth__footer-note {
  color: rgba(255, 255, 255, 0.7);
}

.auth__footer-link {
  color: #ff1801;
  font-weight: 900;
  transition: color 0.15s ease;
}

.auth__footer-link:hover {
  color: #ff4d3d;
}
`;

const AUTH_HEADER_CSS = `.auth-header-wrap {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.auth-header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background-color: rgba(69, 10, 10, 0.6);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.auth-header-title {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #ffffff;
}

@media (min-width: 640px) {
  .auth-header-title {
    font-size: 2.25rem;
  }
}

.auth-header-subtitle {
  font-size: 0.875rem;
  color: #9ca3af;
  max-width: 24rem;
  margin: 0 auto;
}

`;

const TYPE_TO_EXPORT: Record<
  string,
  (ctx: { variant: string; label?: string; note?: string; link?: string; num?: string }) => {
    tsx: string;
    css: string;
  }
> = {
  email: () => ({ tsx: EMAIL_TSX, css: EMAIL_CSS }),
  password: () => ({ tsx: PASSWORD_TSX, css: PASSWORD_CSS }),
  error: () => ({ tsx: ERROR_TSX, css: ERROR_CSS }),
  status: () => ({ tsx: STATUS_TSX, css: STATUS_CSS }),
  remember: () => ({ tsx: REMEMBER_TSX, css: REMEMBER_CSS }),
  login: ({ variant, label }) => ({
    tsx: loginBtnTsX(variant, label ?? 'LOGIN'),
    css:
      LOGIN_BASE_CSS +
      '\n' +
      ARROW_CSS +
      (variant === 'Variant 2' ? '\n' + LOGIN_SVG_CSS : ''),
  }),
  guest: ({ variant, label }) => ({
    tsx: guestBtnTsX(variant, label ?? 'CONTINUE AS GUEST'),
    css:
      GUEST_BASE_CSS +
      '\n' +
      ARROW_CSS +
      (variant === 'Variant 2' ? '\n' + GUEST_SVG_CSS : ''),
  }),
  divider: () => ({ tsx: DIVIDER_TSX, css: DIVIDER_CSS }),
  tabs: () => ({ tsx: TABS_TSX, css: TABS_CSS }),
  social: () => ({ tsx: SOCIAL_TSX, css: SOCIAL_CSS }),
  header: () => ({ tsx: HEADER_TSX, css: HEADER_CSS }),
  footer: ({ note, link }) => ({
    tsx: footerTsX(note ?? "DON'T HAVE AN ACCOUNT?", link ?? 'REGISTER >'),
    css: FOOTER_CSS,
  }),
  sticker: ({ num }) => ({ tsx: stickerTsX(num ?? '01'), css: STICKER_CSS }),
  'auth-header': () => ({ tsx: AUTH_HEADER_TSX, css: AUTH_HEADER_CSS + TABS_CSS }),
};

export function buildLoginTsx(
  def: LoginExportMeta,
  variant: string,
  opts?: { label?: string; note?: string; link?: string; num?: string },
): string {
  const active = resolveVariant(def, variant);
  const entry = TYPE_TO_EXPORT[def.type];
  const body = entry
    ? entry({ variant: active, ...opts }).tsx
    : `// No TSX snapshot for type "${def.type}".\n// See ${def.usage ?? 'LOGIN_COMPONENTS registry in page.tsx'}\n`;
  return finalizeTsx(tsxHeader(def, active) + body);
}

export function buildLoginCss(
  def: LoginExportMeta,
  variant: string,
  opts?: { label?: string; note?: string; link?: string; num?: string },
): string {
  const active = resolveVariant(def, variant);
  const entry = TYPE_TO_EXPORT[def.type];
  const body = entry
    ? entry({ variant: active, ...opts }).css
    : `/* No CSS snapshot for type "${def.type}". */\n`;
  return cssHeader(def, active) + body;
}

/** Component names used when composing Mini Login TSX */
const MINI_COMPONENT_NAMES: Record<string, string> = {
  email: 'TextInput',
  password: 'PasswordInput',
  error: 'ErrorBanner',
  status: 'StatusBanner',
  remember: 'RememberRow',
  login: 'LoginButton',
  guest: 'GuestButton',
  divider: 'OrDivider',
  tabs: 'PlatformTabs',
  social: 'SocialAuth',
  header: 'FormHeader',
  footer: 'FooterCallout',
  sticker: 'AuthBackImage',
};

const MINI_BLOCK_LABELS: Record<string, string> = {
  email: 'Text input',
  password: 'Password',
  error: 'Error banner',
  status: 'Status banner',
  remember: 'Remember row',
  login: 'Login CTA',
  guest: 'Guest CTA',
  divider: 'OR divider',
  tabs: 'Platform tabs',
  social: 'Social auth',
  header: 'Header',
  footer: 'Footer',
  sticker: 'Back image',
};

function miniBlockCall(type: string, cfg: MiniExportConfig): string {
  const name = MINI_COMPONENT_NAMES[type] ?? 'null';
  switch (type) {
    case 'login':
      return `<${name} label={${JSON.stringify(cfg.loginLabel)}} />`;
    case 'guest':
      return `<${name} label={${JSON.stringify(cfg.guestLabel)}} />`;
    case 'footer':
      return `<${name} note={${JSON.stringify(cfg.footerNote)}} link={${JSON.stringify(cfg.footerLink)}} />`;
    case 'password':
      return `<${name} visible={passwordVisible} onVisibleChange={setPasswordVisible} />`;
    default:
      return `<${name} />`;
  }
}

function uniqueTypes(order: string[]) {
  return Array.from(new Set(order.filter((t) => MINI_COMPONENT_NAMES[t])));
}

function exportCtx(
  type: string,
  cfg: MiniExportConfig,
): { variant: string; label?: string; note?: string; link?: string } {
  if (type === 'login') return { variant: cfg.loginVariant, label: cfg.loginLabel };
  if (type === 'guest') return { variant: cfg.guestVariant, label: cfg.guestLabel };
  if (type === 'footer') return { variant: 'Classic', note: cfg.footerNote, link: cfg.footerLink };
  return { variant: 'Classic' };
}

function stripStandaloneDirectives(tsx: string): string {
  return tsx
    .split('\n')
    .filter((line) => {
      const t = line.trim();
      if (t === "'use client';" || t === '"use client";') return false;
      if (t.startsWith('import ')) return false;
      return true;
    })
    .join('\n')
    .replace(/^\n+/, '')
    .trimEnd();
}

function extractLeadingComments(src: string): { comments: string; body: string } {
  const lines = src.split('\n');
  const comments: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (comments.length === 0 && t === '') {
      i += 1;
      continue;
    }
    if (t.startsWith('//')) {
      comments.push(lines[i]);
      i += 1;
      continue;
    }
    break;
  }
  while (i < lines.length && lines[i].trim() === '') i += 1;
  return { comments: comments.join('\n'), body: lines.slice(i).join('\n') };
}

function dedupeLines(lines: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/**
 * Normalize any export snippet into a single paste-ready module:
 * leading // comments → optional one 'use client' → one import block → body.
 */
function finalizeTsx(
  raw: string,
  opts?: { forceClient?: boolean; prefixImports?: string[] },
): string {
  const { comments, body } = extractLeadingComments(raw);
  const imports: string[] = [];
  const rest: string[] = [];
  let sawUseClient = false;

  for (const line of body.split('\n')) {
    const t = line.trim();
    if (t === "'use client';" || t === '"use client";') {
      sawUseClient = true;
      continue;
    }
    if (t.startsWith('import ')) {
      imports.push(t);
      continue;
    }
    rest.push(line);
  }

  const bodyText = rest.join('\n').replace(/^\n+/, '').replace(/\n+$/, '');
  const interactive =
    /\buseState\b|\buseEffect\b|\buseRef\b|\bonClick\b|\bonChange\b|\bonMouseMove\b|\bonMouseEnter\b|\bonPointerDown\b/.test(
      bodyText,
    );

  const needsClient = Boolean(opts?.forceClient) || sawUseClient || interactive;
  const importLines = dedupeLines([...(opts?.prefixImports ?? []), ...imports]);

  const out: string[] = [];
  if (comments) {
    out.push(comments, '');
  }
  if (needsClient) {
    out.push("'use client';", '');
  }
  if (importLines.length > 0) {
    out.push(importLines.join('\n'), '');
  }
  out.push(bodyText);
  const text = out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';

  const useClientCount = (text.match(/^'use client';$/gm) || []).length;
  if (useClientCount > 1) {
    throw new Error(`Export TSX must have at most one 'use client' (got ${useClientCount})`);
  }
  const exportIdx = text.indexOf('export ');
  if (exportIdx >= 0 && text.slice(exportIdx).includes('\nimport ')) {
    throw new Error('Export TSX has imports after component body');
  }
  return text;
}

function joinCss(blocks: string[]): string {
  return blocks
    .map((b) => b.trim())
    .filter(Boolean)
    .join('\n\n');
}

function collectMiniComponents(
  order: string[],
  cfg: MiniExportConfig,
  backNum?: string,
): string {
  const types = uniqueTypes(order);
  const parts: string[] = [];
  for (const type of types) {
    const entry = TYPE_TO_EXPORT[type];
    if (!entry) continue;
    parts.push(stripStandaloneDirectives(entry(exportCtx(type, cfg)).tsx));
  }
  if (backNum && !types.includes('sticker')) {
    parts.push(
      stripStandaloneDirectives(
        TYPE_TO_EXPORT['sticker']({ variant: 'Classic', num: backNum }).tsx,
      ),
    );
  }
  return parts.join('\n\n');
}

function collectMiniImports(order: string[], glow: boolean): string[] {
  const lines: string[] = ["import './mini-login.css';"];

  const reactParts: string[] = [];
  const needsUseState =
    glow ||
    order.some((t) =>
      ['password', 'remember', 'login', 'tabs', 'auth-header'].includes(t),
    );
  if (needsUseState) reactParts.push('useState');
  if (glow) reactParts.push('useRef', 'type MouseEvent');
  reactParts.push('type CSSProperties');
  lines.push(`import { ${reactParts.join(', ')} } from 'react';`);

  const lucide: string[] = [];
  if (order.includes('email')) lucide.push('Mail');
  if (order.includes('password')) lucide.push('Lock', 'Eye', 'EyeOff');
  if (order.includes('error')) lucide.push('AlertCircle');
  if (order.includes('login')) lucide.push('Loader2');
  if (order.includes('tabs') || order.includes('auth-header')) {
    lucide.push('Flag', 'ShoppingBag');
  }
  const uniqueLucide = Array.from(new Set(lucide));
  if (uniqueLucide.length > 0) {
    lines.push(`import { ${uniqueLucide.join(', ')} } from 'lucide-react';`);
  }

  return lines;
}

function stripAuthBtnSharedRules(css: string): string {
  return css
    .replace(/\n*\.auth__btn-label\s*\{[^}]*\}/g, '')
    .replace(/\n*\.auth__btn-arrow\s*\{[^}]*\}/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+/, '')
    .trim();
}

function needsPasswordState(order: string[]) {
  return order.includes('password');
}

function needsRememberState(order: string[]) {
  return order.includes('remember');
}

function needsGlow(order: string[], cfg: MiniExportConfig) {
  return cfg.bgVariant === 'Variant 3' && order.length > 0;
}

export function buildMiniLoginTsx(input: {
  order: string[];
  width: number;
  cfg: MiniExportConfig;
  back?: { on: boolean; variant: string; num: string };
}): string {
  const { order, width, cfg, back } = input;
  const backOn = back?.on ?? true;
  const backVariant = back?.variant ?? 'Classic';
  const backRaw = (back?.num ?? '').replace(/\D/g, '').slice(0, 2);
  const backNum = backRaw ? backRaw.padStart(2, '0') : '01';
  const glow = needsGlow(order, cfg);
  const bgClass =
    cfg.bgVariant === 'Variant 3'
      ? 'mini-login--bg-v3'
      : cfg.bgVariant === 'Variant 2'
        ? 'mini-login--bg-v2'
        : 'mini-login--bg-classic';

  const body =
    order.length === 0
      ? '      {/* empty builder */}\n'
      : order
          .map((type) => `      {${miniBlockCall(type, cfg)}}`)
          .join('\n');

  const glowHandlers = glow
    ? `      onMouseEnter={(e) => {
        setGlow(true);
        updateGlow(e);
      }}
      onMouseLeave={() => setGlow(false)}
      onMouseMove={updateGlow}
`
    : '';
  const refAttr = glow ? 'ref={formRef}' : '';

  const glowDiv = glow
    ? `      {glow ? <div className="mini-login__glow" aria-hidden /> : null}
`
    : '';

  const bgImg =
    cfg.bgVariant === 'Variant 3'
      ? `      <img
        className="mini-login__bg-svg"
        src="/mini-login-bg.svg?v=5"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
`
      : '';

  const backImg = backOn
    ? `      <div
        className="mini-login__back"
        aria-hidden="true"
        data-back-variant="${backVariant.toLowerCase()}"
      >
        <AuthBackImage />
      </div>
`
    : null;

  const stateLines = [
    needsPasswordState(order)
      ? `  const [passwordVisible, setPasswordVisible] = useState(${cfg.passwordVisible});`
      : null,
    needsRememberState(order) ? '  // RememberRow manages its own checkbox state' : null,
    glow ? '  const [glow, setGlow] = useState(false);' : null,
    glow ? '  const formRef = useRef<HTMLDivElement | null>(null);' : null,
    glow
      ? `  const updateGlow = (e: MouseEvent<HTMLDivElement>) => {
    const el = formRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--glow-x', \`\${e.clientX - rect.left}px\`);
    el.style.setProperty('--glow-y', \`\${e.clientY - rect.top}px\`);
  };`
      : null,
  ]
    .filter(Boolean)
    .join('\n');

  const classNameExpr = glow
    ? `\`mini-login ${bgClass}\${glow ? ' is-glow' : ''}\``
    : `'mini-login ${bgClass}'`;

  const header = [
    '// L13 Mini Login — paste-ready form (matches current builder order/config)',
    `// order: ${order.map((t) => t).join(' → ') || '(empty)'}`,
    `// width: ${width}px · bg: ${cfg.bgVariant} · accent: ${cfg.accent} · back: ${backOn ? `${backVariant} №${backNum}` : 'off'}`,
    '// Pair with the Mini Login "Copy CSS" output as mini-login.css',
    '// Assets: /public/login-btn.svg · /public/guest-btn.svg · /public/mini-login-bg.svg · /public/imgSticker1.png · /public/imgOrnament24.svg',
    '',
  ].join('\n');

  const formJsx = [
    `    <div`,
    refAttr ? `      ${refAttr}` : null,
    `      className={${classNameExpr}}`,
    `      style={`,
    `        {`,
    `          width: ${width},`,
    `          ['--auth-accent']: ${JSON.stringify(cfg.accent)},`,
    glow ? `          ['--glow-x']: '50%',` : null,
    glow ? `          ['--glow-y']: '50%',` : null,
    `        } as CSSProperties`,
    `      }`,
    glow ? glowHandlers.replace(/\n$/, '') : null,
    `    >`,
    bgImg ? bgImg.replace(/\n$/, '') : null,
    glowDiv ? glowDiv.replace(/\n$/, '') : null,
    body.replace(/\n$/, ''),
    `    </div>`,
  ]
    .filter((line): line is string => line !== null)
    .map((line) =>
      line
        .split('\n')
        .map((l) => (l ? `  ${l}` : l))
        .join('\n'),
    )
    .join('\n');

  const component = [
    collectMiniComponents(order, cfg, backOn ? backNum : undefined),
    '',
    `export function MiniLogin() {`,
    stateLines ? stateLines + '\n' : '',
    `  return (`,
    `    <div className="mini-login-scene">`,
    backImg ? backImg.replace(/\n$/, '') : null,
    formJsx,
    `    </div>`,
    `  );`,
    `}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return finalizeTsx(header + '\n' + component, {
    forceClient: true,
    prefixImports: collectMiniImports(order, glow),
  });
}

export function buildMiniLoginCss(input: {
  order: string[];
  width: number;
  cfg: MiniExportConfig;
}): string {
  const { order, width, cfg } = input;
  const parts: string[] = [];

  parts.push(`@import url('https://fonts.googleapis.com/css2?family=Karantina&display=swap');
`);

  parts.push(`/* L13 Mini Login — form chrome + used blocks
 * width: ${width}px · bg: ${cfg.bgVariant} · accent: ${cfg.accent}
 * Pair with Mini Login "Copy TSX"
 */
`);

  const v3 = cfg.bgVariant === 'Variant 3';
  const v2 = cfg.bgVariant === 'Variant 2';

  parts.push(`.mini-login {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: ${width}px;
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  border: 1px solid rgba(255, 24, 1, 0.45);
  border-radius: 0.5rem;
  background: #06080d;
  box-shadow: 0 0 24px rgba(255, 24, 1, 0.12);
  box-sizing: border-box;
  transition: box-shadow 0.2s ease, background-color 0.2s ease, background-image 0.2s ease;
  --auth-accent: ${cfg.accent};
}

.mini-login--bg-classic {
  background-color: #06080d;
  background-image: none;
}
`);

  parts.push(`/* Back image — keeps its L15 formation, sits behind the form container and
 * pops out to the left (like a sticker tucked behind the login card) */
.mini-login-scene {
  position: relative;
  width: fit-content;
}

.mini-login__back {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

${BACK_IMAGE_CSS}`);

  parts.push(`.mini-login > *:not(.mini-login__bg-svg):not(.mini-login__glow) {
  position: relative;
  z-index: 1;
}
`);

  if (v2) {
    parts.push(`.mini-login--bg-v2 {
  background-color: #0a0608;
  background-image:
    linear-gradient(135deg, rgba(255, 24, 1, 0.14) 0%, transparent 42%),
    linear-gradient(to bottom right, rgba(206, 21, 3, 0.22), rgba(6, 8, 13, 0.95)),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(255, 255, 255, 0.03) 10px,
      rgba(255, 255, 255, 0.03) 11px
    );
  border-color: rgba(255, 24, 1, 0.7);
  box-shadow: 0 0 28px rgba(255, 24, 1, 0.22);
}
`);
  }

  if (v3) {
    parts.push(`.mini-login--bg-v3 {
  background-color: transparent;
  background-image: none;
  border-radius: 0;
  border-color: transparent;
  box-shadow: none;
  padding: 2.25rem 2.75rem 2.35rem;
}

.mini-login__bg-svg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
  user-select: none;
}

.mini-login--bg-v3 .mini-login__glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
  background: radial-gradient(
    240px circle at var(--glow-x, 50%) var(--glow-y, 50%),
    rgba(255, 30, 0, 1) 0%,
    rgba(255, 24, 1, 0.75) 18%,
    rgba(255, 24, 1, 0.35) 42%,
    rgba(255, 24, 1, 0.12) 65%,
    transparent 85%
  );
  mix-blend-mode: screen;
  -webkit-mask-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1106 1085' preserveAspectRatio='none'%3E%3Cpath d='M28 0 H1078 L1106 28 V1057 L1078 1085 H28 L0 1057 V28 Z' fill='none' stroke='white' stroke-width='5' stroke-linejoin='round'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1106 1085' preserveAspectRatio='none'%3E%3Cpath d='M28 0 H1078 L1106 28 V1057 L1078 1085 H28 L0 1057 V28 Z' fill='white'/%3E%3C/svg%3E");
  mask-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1106 1085' preserveAspectRatio='none'%3E%3Cpath d='M28 0 H1078 L1106 28 V1057 L1078 1085 H28 L0 1057 V28 Z' fill='none' stroke='white' stroke-width='5' stroke-linejoin='round'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1106 1085' preserveAspectRatio='none'%3E%3Cpath d='M28 0 H1078 L1106 28 V1057 L1078 1085 H28 L0 1057 V28 Z' fill='white'/%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%, 100% 100%;
  mask-size: 100% 100%, 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}

.mini-login.is-glow .mini-login__glow {
  opacity: 1;
}
`);
  }

  const hasEmail = order.includes('email');
  const hasPassword = order.includes('password');
  const hasRemember = order.includes('remember');
  const hasHeader = order.includes('header');
  const hasFooter = order.includes('footer');
  const hasLogin = order.includes('login');
  const hasGuest = order.includes('guest');

  const accentBlocks: string[] = [];
  if (hasHeader) {
    accentBlocks.push(`.mini-login .components-accent-text {
  color: var(--auth-accent);
}

.mini-login .auth__form-slash {
  background-color: var(--auth-accent);
}`);
  }
  if (hasEmail || hasPassword) {
    accentBlocks.push(`.mini-login .auth__input:focus-within {
  border-color: var(--auth-accent);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--auth-accent) 40%, transparent);
}`);
  }
  if (hasRemember) {
    accentBlocks.push(`.mini-login .auth__checkbox {
  accent-color: var(--auth-accent);
}

.mini-login .auth__forgot {
  color: var(--auth-accent);
}`);
  }
  if (hasFooter) {
    accentBlocks.push(`.mini-login .auth__footer-link {
  color: var(--auth-accent);
}`);
  }
  if (hasLogin) {
    accentBlocks.push(`.mini-login .auth__btn--primary:not(.components-login-svg-btn) {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--auth-accent) 88%, #000) 0%,
    var(--auth-accent) 100%
  );
}`);
  }
  if (hasGuest) {
    accentBlocks.push(`.mini-login .auth__btn--secondary:not(.components-guest-svg-btn) {
  border-color: var(--auth-accent);
}`);
  }
  if (accentBlocks.length > 0) {
    parts.push(`/* Accent overrides inside the form */\n${joinCss(accentBlocks)}`);
  }

  const chunks: Array<{ key: string; label: string; css: string }> = [];
  const addChunk = (key: string, label: string, css: string) => {
    chunks.push({ key, label, css });
  };

  if (hasEmail || hasPassword) {
    addChunk('input', 'Input fields', INPUT_CSS);
  }
  if (hasPassword) {
    addChunk('password-toggle', 'Password toggle', PASSWORD_TOGGLE_CSS);
  }

  for (const type of uniqueTypes(order)) {
    if (type === 'email' || type === 'password') continue;
    const entry = TYPE_TO_EXPORT[type];
    if (!entry) continue;
    const label = MINI_BLOCK_LABELS[type] ?? type;
    let css = entry(exportCtx(type, cfg)).css.trimEnd();

    if (type === 'guest' && hasLogin) {
      css = stripAuthBtnSharedRules(css);
      addChunk('guest', `${label} (guest)`, css);
      addChunk('arrow', 'Button arrow', ARROW_CSS);
      if (cfg.guestVariant === 'Variant 2') {
        addChunk('guest-svg', 'Guest SVG', GUEST_SVG_CSS);
      }
      continue;
    }
    if (type === 'login') {
      addChunk('login', `${label} (login)`, css.replace(ARROW_CSS.trim(), '').trim());
      addChunk('arrow', 'Button arrow', ARROW_CSS);
      if (cfg.loginVariant === 'Variant 2') {
        addChunk('login-svg', 'Login SVG', LOGIN_SVG_CSS);
      }
      continue;
    }
    if (type === 'guest') {
      addChunk('guest', `${label} (guest)`, css.replace(ARROW_CSS.trim(), '').trim());
      addChunk('arrow', 'Button arrow', ARROW_CSS);
      if (cfg.guestVariant === 'Variant 2') {
        addChunk('guest-svg', 'Guest SVG', GUEST_SVG_CSS);
      }
      continue;
    }
    addChunk(type, `${label} (${type})`, css);
  }

  const seenKeys = new Set<string>();
  for (const chunk of chunks) {
    if (seenKeys.has(chunk.key) || !chunk.css.trim()) continue;
    seenKeys.add(chunk.key);
    parts.push(`/* ── ${chunk.label} ── */`);
    parts.push(chunk.css.trimEnd());
    parts.push('');
  }

  if (order.length === 0) {
    parts.push('/* No blocks in builder — form chrome only */');
  }

  return parts.join('\n');
}
