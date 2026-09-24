'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { X, CheckCircle, ChevronDown, Plus, Minus, Loader2, Check, AlertCircle, Eye, EyeOff, Flag, Lock, Mail, ShoppingBag } from 'lucide-react';
import '@/components/auth/auth-forms.css';
import './components.css';

/* Context */
interface InteractionContextType {
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  showToast: (message: string) => void;
  isModalOpen: (id: string) => boolean;
}

const InteractionContext = createContext<InteractionContextType | null>(null);

function useInteractions() {
  const context = useContext(InteractionContext);
  if (!context) throw new Error('useInteractions must be used within InteractionProvider');
  return context;
}

/* Provider */
function InteractionProvider({ children }: { children: ReactNode }) {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = useCallback((id: string) => {
    setOpenModals((prev) => new Set(prev).add(id));
  }, []);

  const closeModal = useCallback((id: string) => {
    setOpenModals((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const isModalOpen = useCallback((id: string) => openModals.has(id), [openModals]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  return (
    <InteractionContext.Provider value={{ openModal, closeModal, showToast, isModalOpen }}>
      {children}
      <div className={`interaction-toast ${toastMessage ? 'is-visible' : ''}`} role="alert">
        <CheckCircle className="h-5 w-5 text-green-400" />
        <span className="interaction-toast-message">{toastMessage}</span>
      </div>
    </InteractionContext.Provider>
  );
}

/* Modal */
function Modal({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const { isModalOpen, closeModal } = useInteractions();
  const isOpen = isModalOpen(id);

  return (
    <div className={`interaction-modal-overlay ${isOpen ? 'is-open' : ''}`} onClick={() => closeModal(id)} role="dialog" aria-modal="true">
      <div className="interaction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="interaction-modal-header">
          <h2 className="interaction-modal-title">{title}</h2>
          <button className="interaction-modal-close" onClick={() => closeModal(id)} aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="interaction-modal-body">{children}</div>
      </div>
    </div>
  );
}

/* Tooltip */
function Tooltip({ content, children }: { content: string; children: ReactNode }) {
  return (
    <div className="interaction-tooltip">
      {children}
      <div className="interaction-tooltip-content">{content}</div>
    </div>
  );
}

/* Dropdown */
function Dropdown({
  label,
  items,
  value,
  onChange,
  align = 'up',
}: {
  label: string;
  items: string[];
  value?: string;
  onChange?: (item: string) => void;
  align?: 'up' | 'down';
}) {
  const [open, setOpen] = useState(false);
  const trigger = value ?? label;

  return (
    <div className={`components-dropdown components-dropdown--${align} ${open ? 'is-open' : ''}`}>
      <button className="components-btn components-btn--secondary" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {trigger}
        <ChevronDown className="ml-1 inline h-3 w-3" />
      </button>
      <div className="components-dropdown-menu" role="menu">
        {items.map((item) => (
          <button
            key={item}
            className={`components-dropdown-item ${value === item ? 'is-active' : ''}`}
            role="menuitem"
            onClick={() => {
              onChange?.(item);
              setOpen(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Accordion */
function Accordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const rows = [
    { q: 'Soft compound', a: 'Peak grip for qualifying laps. Falls off hard after 8–10 laps of sustained load.' },
    { q: 'Medium compound', a: 'Primary race compound. Balanced degradation over long stints across mixed corner speeds.' },
    { q: 'Hard compound', a: 'Endurance option for hot tracks. Lower peak grip but holds pace deep into the stint.' },
    { q: 'Wet compound', a: 'Full wet for standing water. Never use on a dry surface — graining is immediate.' },
  ];

  return (
    <div className="interaction-accordion">
      {rows.map((row, i) => (
        <div key={row.q} className={`interaction-accordion-item ${openIdx === i ? 'is-open' : ''}`}>
          <button
            className="interaction-accordion-trigger"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
          >
            {row.q}
            <span className="interaction-accordion-icon">
              {openIdx === i ? <Minus className="h-4 w-4 text-[#ff1801]" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>
          <div className="interaction-accordion-content">
            <p className="interaction-accordion-body">{row.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Toggle button */
function ToggleButton() {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      className={`components-toggle ${on ? 'is-on' : ''}`}
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
    >
      <span className="components-toggle-track">
        <span className="components-toggle-thumb" />
      </span>
      <span className="components-toggle-label">{on ? 'On' : 'Off'}</span>
    </button>
  );
}

/* Loading button */
function LoadingButton({ showToast }: { showToast: (msg: string) => void }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    if (state === 'loading') {
      const t = setTimeout(() => {
        setState('done');
        showToast('Telemetry synced');
      }, 1200);
      return () => clearTimeout(t);
    }
    if (state === 'done') {
      const t = setTimeout(() => setState('idle'), 1600);
      return () => clearTimeout(t);
    }
  }, [state, showToast]);

  return (
    <button
      type="button"
      className={`components-btn components-btn--primary components-btn--loading ${state !== 'idle' ? `is-${state}` : ''}`}
      onClick={() => state === 'idle' && setState('loading')}
      disabled={state === 'loading'}
    >
      {state === 'loading' && <Loader2 className="components-btn-spinner" />}
      {state === 'done' && <Check className="components-btn-spinner" />}
      {state === 'idle' && 'Sync'}
      {state === 'loading' && 'Syncing'}
      {state === 'done' && 'Done'}
    </button>
  );
}

/* Segmented control */
function Segmented() {
  const [active, setActive] = useState('Q1');
  const options = ['Q1', 'Q2', 'Q3'];

  return (
    <div className="components-segmented" role="group" aria-label="Qualifying segment">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`components-segmented-btn ${active === opt ? 'is-active' : ''}`}
          onClick={() => setActive(opt)}
          aria-pressed={active === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* Long-form tabs */
function LongTabs() {
  const [active, setActive] = useState(0);
  const panels = [
    {
      label: 'Race',
      body: 'Two-stop strategies dominate at high-degradation circuits. Undercut windows open when tire delta exceeds 0.4s per lap — pit wall call is usually lap 14–18 for the first stop, then a aggressive second stint on mediums before switching to hards for the final run to the flag.',
    },
    {
      label: 'Quali',
      body: 'Push laps demand maximum deployment out of the final corner. Battery state must sit above 80% before the flying lap; otherwise the last sector bleeds three tenths. Out-laps are scrubbed clean — no traffic, tire blanket delta logged, brake balance shifted two points forward.',
    },
    {
      label: 'Setup',
      body: 'Rear wing trimmed for straight-line speed while front flap opens to keep turn-in bite. Damper stack softened on low-speed kerbs, stiffened for high-speed stability. ride height dropped 3mm after FP2 once plank wear readings came back inside the legal window.',
    },
  ];

  return (
    <div className="components-tabs">
      <div className="components-tabs-list" role="tablist">
        {panels.map((panel, i) => (
          <button
            key={panel.label}
            type="button"
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls={`panel-${i}`}
            className={`components-tabs-tab ${active === i ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {panel.label}
          </button>
        ))}
      </div>
      <div
        className="components-tabs-panel"
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
      >
        <p>{panels[active].body}</p>
      </div>
    </div>
  );
}

/* Horizontal accordion — panels expand side-by-side */
function HorizontalAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const rows = [
    {
      title: 'Front wing',
      body: 'Multi-element flaps tuned for high-speed balance. Increasing flap angle adds front load but costs straight-line speed — pit wall reviews telemetry deltas after every run before committing to a direction for qualifying.',
    },
    {
      title: 'Rear wing',
      body: 'Low-drag specification for circuits with long full-throttle sections. DRS actuator checked each session; flap open adds roughly 12–15 km/h on the straight when the zone is available.',
    },
    {
      title: 'Suspension',
      body: 'Heave and roll platforms adjusted between FP2 and qualifying. Softer front springs improve kerb riding while the rear stays firm to keep the floor working through high-speed direction changes.',
    },
    {
      title: 'Brakes',
      body: 'Carbon discs peak near 1000°C under heavy braking. Duct sizing balances cooling against drag; too much airflow and the discs never reach operating window for the out-lap.',
    },
  ];

  return (
    <div className="components-haccordion">
      {rows.map((row, i) => (
        <div key={row.title} className={`components-haccordion-item ${openIdx === i ? 'is-open' : ''}`}>
          <button
            type="button"
            className="components-haccordion-trigger"
            aria-expanded={openIdx === i}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            <span className="components-haccordion-index">{String(i + 1).padStart(2, '0')}</span>
            <span className="components-haccordion-title">{row.title}</span>
          </button>
          <div className="components-haccordion-panel">
            <p>{row.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Specimen card wrapper */
function ComponentCard({
  id,
  name,
  tag,
  control,
  children,
}: {
  id: string;
  name: string;
  tag: string;
  control?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="components-card">
      <header className="components-card-head">
        <div>
          <div className="components-card-id">{id}</div>
          <h2 className="components-card-name">{name}</h2>
        </div>
        <div className="components-card-head-end">
          <span className="components-card-tag">{tag}</span>
        </div>
      </header>
      <div className="components-card-preview">{children}</div>
      {control ? <div className="components-card-control">{control}</div> : null}
    </article>
  );
}

/* ---- Login / auth specimens (auth-forms.css) ---- */

function AuthTextInput() {
  return (
    <div className="auth__input" style={{ width: '100%' }}>
      <div className="auth__input-icon">
        <Mail className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <input type="email" placeholder="EMAIL ADDRESS" className="auth__input-field" aria-label="Email address specimen" />
    </div>
  );
}

function AuthPasswordInput({
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
        defaultValue="gridsecret"
        className="auth__input-field"
        aria-label="Password specimen"
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

function AuthErrorBanner() {
  return (
    <div className="auth-error-banner" style={{ width: '100%' }}>
      <AlertCircle className="auth-error-icon" />
      <span>Invalid credentials. Check email and password.</span>
    </div>
  );
}

function AuthStatusBanner() {
  return (
    <p className="auth-status-banner" role="status" style={{ width: '100%' }}>
      Account created. Log in to join the grid.
    </p>
  );
}

function AuthRememberRow() {
  const [remember, setRemember] = useState(false);

  return (
    <div className="auth__form-options" style={{ width: '100%' }}>
      <label className="auth__remember">
        <input type="checkbox" className="auth__checkbox" checked={remember} onChange={() => setRemember((v) => !v)} />
        <span>REMEMBER ME</span>
      </label>
      <span className="auth__forgot">FORGOT PASSWORD?</span>
    </div>
  );
}

type LoginBtnVariant = 'Classic' | 'Variant 2';

function AuthPrimaryBtn({
  variant = 'Classic',
  label = 'LOGIN',
}: {
  variant?: LoginBtnVariant;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const isSvg = variant === 'Variant 2';

  return (
    <button
      type="button"
      className={`auth__btn--primary group${isSvg ? ' components-login-svg-btn' : ''}`}
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

function LoginButtonSpecimen() {
  const [variant, setVariant] = useState<LoginBtnVariant>('Classic');

  return (
    <ComponentCard
      id="L06 · Primary"
      name="Login Button"
      tag="Action"
      control={
        <Dropdown
          label="Variant"
          items={['Classic', 'Variant 2']}
          value={variant}
          onChange={(v) => setVariant(v as LoginBtnVariant)}
        />
      }
    >
      <AuthPrimaryBtn variant={variant} />
    </ComponentCard>
  );
}

type GuestBtnVariant = 'Classic' | 'Variant 2';

function AuthSecondaryBtn({
  variant = 'Classic',
  label = 'CONTINUE AS GUEST',
}: {
  variant?: GuestBtnVariant;
  label?: string;
}) {
  const isSvg = variant === 'Variant 2';

  return (
    <button
      type="button"
      className={`auth__btn--secondary group${isSvg ? ' components-guest-svg-btn' : ''}`}
      style={{ width: '100%', height: 38 }}
    >
      <span className="auth__btn-label">{label}</span>
      <span className="auth__btn-arrow" aria-hidden>
        <span className="components-auth-arrow">›</span>
      </span>
    </button>
  );
}

function GuestButtonSpecimen() {
  const [variant, setVariant] = useState<GuestBtnVariant>('Classic');

  return (
    <ComponentCard
      id="L07 · Secondary"
      name="Guest Button"
      tag="Action"
      control={
        <Dropdown
          label="Variant"
          items={['Classic', 'Variant 2']}
          value={variant}
          onChange={(v) => setVariant(v as GuestBtnVariant)}
        />
      }
    >
      <AuthSecondaryBtn variant={variant} />
    </ComponentCard>
  );
}

function AuthDivider() {
  return (
    <div className="auth__divider" style={{ width: '100%' }}>
      <span>OR</span>
    </div>
  );
}

function AuthPlatformTabs() {
  const [tab, setTab] = useState<'f1' | 'store'>('f1');

  return (
    <div className="auth-tab-switcher" style={{ width: '100%', maxWidth: '16rem' }}>
      <button
        type="button"
        onClick={() => setTab('f1')}
        className={`auth-tab-btn ${tab === 'f1' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
      >
        <Flag className="w-3.5 h-3.5" />
        F1 Website
      </button>
      <button
        type="button"
        onClick={() => setTab('store')}
        className={`auth-tab-btn ${tab === 'store' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        F1 Store
      </button>
    </div>
  );
}

function AuthSocial() {
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

function AuthFormHeader() {
  return (
    <div className="auth__form-header" style={{ width: '100%' }}>
      <div>
        <h2 className="auth__form-title">
          WELCOME BACK, <span className="components-accent-text">CHAMP</span>
        </h2>
        <p className="auth__form-subtitle">
          LOG IN NOW TO UPDATE YOUR PREDICTIONS BEFORE <span className="components-accent-text">F1</span> BEGINS
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

function AuthFooterCallout({
  note = "DON'T HAVE AN ACCOUNT?",
  link = 'REGISTER >',
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

type MiniSectionId =
  | 'header'
  | 'error'
  | 'fields'
  | 'remember'
  | 'login'
  | 'divider'
  | 'guest'
  | 'footer';

const MINI_SECTIONS: { id: MiniSectionId; label: string }[] = [
  { id: 'header', label: 'Header' },
  { id: 'error', label: 'Error banner' },
  { id: 'fields', label: 'Fields' },
  { id: 'remember', label: 'Remember row' },
  { id: 'login', label: 'Login CTA' },
  { id: 'divider', label: 'OR divider' },
  { id: 'guest', label: 'Guest CTA' },
  { id: 'footer', label: 'Footer' },
];

const ACCENT_SWATCHES = ['#ff1801', '#ce1503', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7'];

type MiniBuilderState = {
  show: Record<MiniSectionId, boolean>;
  loginVariant: LoginBtnVariant;
  guestVariant: GuestBtnVariant;
  accent: string;
  passwordVisible: boolean;
  loginLabel: string;
  guestLabel: string;
  footerNote: string;
  footerLink: string;
};

const MINI_DEFAULTS: MiniBuilderState = {
  show: {
    header: true,
    error: true,
    fields: true,
    remember: true,
    login: true,
    divider: true,
    guest: true,
    footer: true,
  },
  loginVariant: 'Classic',
  guestVariant: 'Classic',
  accent: '#ff1801',
  passwordVisible: false,
  loginLabel: 'LOGIN',
  guestLabel: 'CONTINUE AS GUEST',
  footerNote: "DON'T HAVE AN ACCOUNT?",
  footerLink: 'REGISTER >',
};

function BuilderSwitch({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="components-builder-row">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        className={`components-toggle ${on ? 'is-on' : ''}`}
        onClick={() => onChange(!on)}
      >
        <span className="components-toggle-track">
          <span className="components-toggle-thumb" />
        </span>
      </button>
    </label>
  );
}

function BuilderText({
  label,
  value,
  onChange,
  maxLength = 40,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
}) {
  return (
    <label className="components-builder-field">
      <span>{label}</span>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Hotspot({
  id,
  label,
  activeId,
  setActiveId,
  visible,
  onShow,
  children,
  panel,
}: {
  id: MiniSectionId;
  label: string;
  activeId: MiniSectionId | null;
  setActiveId: (id: MiniSectionId | null) => void;
  visible: boolean;
  onShow: (v: boolean) => void;
  children: React.ReactNode;
  panel: React.ReactNode;
}) {
  const active = activeId === id;

  if (!visible) {
    return (
      <button
        type="button"
        className={`components-hotspot-ghost ${active ? 'is-active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onShow(true);
          setActiveId(id);
        }}
      >
        + {label}
      </button>
    );
  }

  return (
    <div
      className={`components-hotspot ${active ? 'is-active' : ''}`}
      onClick={() => setActiveId(active ? null : id)}
    >
      <span className="components-hotspot-chip">{label}</span>
      <div className="components-hotspot-body">{children}</div>
      {active ? (
        <div className="components-hotspot-panel" onClick={(e) => e.stopPropagation()}>
          <div className="components-hotspot-panel-head">
            <span>{label}</span>
            <button type="button" className="components-hotspot-close" onClick={() => setActiveId(null)} aria-label="Close editor">
              ×
            </button>
          </div>
          <BuilderSwitch label="Visible" on onChange={onShow} />
          {panel}
        </div>
      ) : null}
    </div>
  );
}

function MiniLoginCard() {
  const [activeId, setActiveId] = useState<MiniSectionId | null>(null);
  const [cfg, setCfg] = useState<MiniBuilderState>(MINI_DEFAULTS);
  const [width, setWidth] = useState(352);
  const dragRef = React.useRef<{ startX: number; startW: number } | null>(null);

  const MIN_W = 240;
  const MAX_W = 520;

  const patch = (partial: Partial<MiniBuilderState>) => setCfg((c) => ({ ...c, ...partial }));
  const setShow = (id: MiniSectionId, v: boolean) =>
    setCfg((c) => ({ ...c, show: { ...c.show, [id]: v } }));

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startW: width };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = Math.min(MAX_W, Math.max(MIN_W, drag.startW + (e.clientX - drag.startX)));
    setWidth(next);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    dragRef.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setWidth((w) => Math.max(MIN_W, w - 16));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setWidth((w) => Math.min(MAX_W, w + 16));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setWidth(MIN_W);
    } else if (e.key === 'End') {
      e.preventDefault();
      setWidth(MAX_W);
    }
  };

  const shared = {
    activeId,
    setActiveId,
  };

  return (
    <div className="components-mini-login-frame">
      <div
        className="components-mini-login"
        style={{ width: `${width}px`, ['--auth-accent' as string]: cfg.accent } as React.CSSProperties}
      >
        <Hotspot
          id="header"
          label="Header"
          visible={cfg.show.header}
          onShow={(v) => setShow('header', v)}
          {...shared}
          panel={
            <>
              <div className="components-builder-swatches" role="group" aria-label="Accent color">
                {ACCENT_SWATCHES.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    className={`components-swatch ${cfg.accent.toLowerCase() === hex ? 'is-active' : ''}`}
                    style={{ background: hex }}
                    aria-label={`Accent ${hex}`}
                    onClick={() => patch({ accent: hex })}
                  />
                ))}
                <label className="components-swatch components-swatch--custom" title="Custom accent">
                  <input
                    type="color"
                    value={cfg.accent}
                    onChange={(e) => patch({ accent: e.target.value })}
                    aria-label="Custom accent color"
                  />
                </label>
              </div>
            </>
          }
        >
          <AuthFormHeader />
        </Hotspot>

        <Hotspot
          id="error"
          label="Error banner"
          visible={cfg.show.error}
          onShow={(v) => setShow('error', v)}
          {...shared}
          panel={null}
        >
          <AuthErrorBanner />
        </Hotspot>

        <Hotspot
          id="fields"
          label="Fields"
          visible={cfg.show.fields}
          onShow={(v) => setShow('fields', v)}
          {...shared}
          panel={
            <BuilderSwitch
              label="Reveal password"
              on={cfg.passwordVisible}
              onChange={(v) => patch({ passwordVisible: v })}
            />
          }
        >
          <div className="auth__form-inputs">
            <AuthTextInput />
            <AuthPasswordInput
              visible={cfg.passwordVisible}
              onVisibleChange={(v) => patch({ passwordVisible: v })}
            />
          </div>
        </Hotspot>

        <Hotspot
          id="remember"
          label="Remember row"
          visible={cfg.show.remember}
          onShow={(v) => setShow('remember', v)}
          {...shared}
          panel={null}
        >
          <AuthRememberRow />
        </Hotspot>

        <Hotspot
          id="login"
          label="Login CTA"
          visible={cfg.show.login}
          onShow={(v) => setShow('login', v)}
          {...shared}
          panel={
            <>
              <label className="components-builder-field">
                <span>Variant</span>
                <Dropdown
                  label="Variant"
                  items={['Classic', 'Variant 2']}
                  value={cfg.loginVariant}
                  onChange={(v) => patch({ loginVariant: v as LoginBtnVariant })}
                />
              </label>
              <BuilderText
                label="Label"
                value={cfg.loginLabel}
                onChange={(v) => patch({ loginLabel: v })}
                maxLength={24}
              />
            </>
          }
        >
          <AuthPrimaryBtn variant={cfg.loginVariant} label={cfg.loginLabel} />
        </Hotspot>

        <Hotspot
          id="divider"
          label="OR divider"
          visible={cfg.show.divider}
          onShow={(v) => setShow('divider', v)}
          {...shared}
          panel={null}
        >
          <AuthDivider />
        </Hotspot>

        <Hotspot
          id="guest"
          label="Guest CTA"
          visible={cfg.show.guest}
          onShow={(v) => setShow('guest', v)}
          {...shared}
          panel={
            <>
              <label className="components-builder-field">
                <span>Variant</span>
                <Dropdown
                  label="Variant"
                  items={['Classic', 'Variant 2']}
                  value={cfg.guestVariant}
                  onChange={(v) => patch({ guestVariant: v as GuestBtnVariant })}
                />
              </label>
              <BuilderText
                label="Label"
                value={cfg.guestLabel}
                onChange={(v) => patch({ guestLabel: v })}
                maxLength={28}
              />
            </>
          }
        >
          <AuthSecondaryBtn variant={cfg.guestVariant} label={cfg.guestLabel} />
        </Hotspot>

        <Hotspot
          id="footer"
          label="Footer"
          visible={cfg.show.footer}
          onShow={(v) => setShow('footer', v)}
          {...shared}
          panel={
            <>
              <BuilderText
                label="Note"
                value={cfg.footerNote}
                onChange={(v) => patch({ footerNote: v })}
                maxLength={36}
              />
              <BuilderText
                label="Link"
                value={cfg.footerLink}
                onChange={(v) => patch({ footerLink: v })}
                maxLength={20}
              />
            </>
          }
        >
          <AuthFooterCallout note={cfg.footerNote} link={cfg.footerLink} />
        </Hotspot>
      </div>

      <div
        className="components-resize-bar"
        role="slider"
        tabIndex={0}
        aria-label="Resize login form width"
        aria-valuemin={MIN_W}
        aria-valuemax={MAX_W}
        aria-valuenow={width}
        aria-valuetext={`${width} pixels`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span className="components-resize-grip" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="components-resize-label">{width}px</span>
      </div>

      <div className="components-builder-bar">
        <span className="components-builder-bar-label">
          {activeId ? `Editing · ${MINI_SECTIONS.find((s) => s.id === activeId)?.label}` : 'Click a section to edit'}
        </span>
        <div className="components-builder-bar-actions">
          {MINI_SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`components-builder-chip ${!cfg.show[s.id] ? 'is-off' : ''} ${activeId === s.id ? 'is-active' : ''}`}
              onClick={() => {
                setActiveId(s.id);
                if (!cfg.show[s.id]) setShow(s.id, true);
              }}
            >
              {s.label}
            </button>
          ))}
          <button
            type="button"
            className="components-builder-chip components-builder-chip--reset"
            onClick={() => {
              setCfg(MINI_DEFAULTS);
              setActiveId(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniLoginSpecimen() {
  return (
    <ComponentCard id="L13 · Card" name="Mini Login" tag="Builder">
      <MiniLoginCard />
    </ComponentCard>
  );
}

function AuthHeaderBlock() {
  const [tab, setTab] = useState<'f1' | 'store'>('f1');

  return (
    <div className="auth-header-wrap components-auth-header-block">
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
          className={`auth-tab-btn ${tab === 'f1' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
        >
          <Flag className="w-3.5 h-3.5" />
          F1 Website
        </button>
        <button
          type="button"
          onClick={() => setTab('store')}
          className={`auth-tab-btn ${tab === 'store' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          F1 Store
        </button>
      </div>
    </div>
  );
}

/* Page */
function ComponentsShowcase() {
  const { openModal, showToast } = useInteractions();

  return (
    <main className="components-page">
      <header className="components-header">
        <div>
          <div className="components-eyebrow">Pit Wall / UI Library</div>
          <h1 className="components-title">
            Components <em>Showcase</em>
          </h1>
        </div>
        <div className="components-meta">
          <span className="components-meta-dot" aria-hidden />
          <span>Basic 07+03 · Auth 12+02</span>
        </div>
      </header>

      <fieldset className="components-fieldset">
        <legend className="components-legend">Basic interaction</legend>

        <div className="components-section components-section--nested">
          <div className="components-section-head">
            <span className="components-section-label">Short-form content</span>
            <span className="components-section-rule" aria-hidden />
          </div>

          <div className="components-grid">
          <ComponentCard id="P01 · Overlay" name="Modal" tag="Overlay">
            <button className="components-btn components-btn--primary" onClick={() => openModal('demo')}>
              Open Modal
            </button>
            <Modal id="demo" title="Box Box Box">
              <p style={{ color: '#9ca3af' }}>Pit window is open. Clear on exit.</p>
            </Modal>
          </ComponentCard>

          <ComponentCard id="P02 · Hover" name="Tooltip" tag="Hover">
            <Tooltip content="DRS enabled — +0.2s">
              <button className="components-btn components-btn--secondary">Hover me</button>
            </Tooltip>
          </ComponentCard>

          <ComponentCard id="P03 · Feedback" name="Toast" tag="Feedback">
            <button
              className="components-btn components-btn--secondary"
              onClick={() => showToast('Lap time deleted — track limits')}
            >
              Fire Toast
            </button>
          </ComponentCard>

          <ComponentCard id="P04 · Menu" name="Dropdown" tag="Menu">
            <Dropdown label="Compound" items={['Soft', 'Medium', 'Intermediate', 'Wet']} />
          </ComponentCard>

          <ComponentCard id="P05 · Switch" name="Toggle" tag="Switch">
            <ToggleButton />
          </ComponentCard>

          <ComponentCard id="P06 · Async" name="Loading" tag="Async">
            <LoadingButton showToast={showToast} />
          </ComponentCard>

          <ComponentCard id="P07 · Select" name="Segmented" tag="Group">
            <Segmented />
          </ComponentCard>
          </div>
        </div>

        <div className="components-section components-section--nested">
          <div className="components-section-head">
            <span className="components-section-label">Long-form content</span>
            <span className="components-section-rule" aria-hidden />
          </div>

          <div className="components-grid components-grid--wide">
            <ComponentCard id="P08 · Disclosure" name="Accordion" tag="Disclosure">
              <div style={{ width: '100%' }}>
                <Accordion />
              </div>
            </ComponentCard>

            <ComponentCard id="P09 · Tabs" name="Tabs" tag="Switch">
              <div style={{ width: '100%' }}>
                <LongTabs />
              </div>
            </ComponentCard>

            <ComponentCard id="P10 · Disclosure" name="Horizontal" tag="H. Accordion">
              <div style={{ width: '100%' }}>
                <HorizontalAccordion />
              </div>
            </ComponentCard>
          </div>
        </div>
      </fieldset>

      <fieldset className="components-fieldset" style={{ marginTop: '2.5rem' }}>
        <legend className="components-legend">Auth interaction</legend>

        <div className="components-section components-section--nested">
          <div className="components-section-head">
            <span className="components-section-label">Field controls</span>
            <span className="components-section-rule" aria-hidden />
          </div>

          <div className="components-grid">
            <ComponentCard id="L01 · Input" name="Text Input" tag="Field">
              <AuthTextInput />
            </ComponentCard>
            <ComponentCard id="L02 · Secret" name="Password" tag="Field">
              <AuthPasswordInput />
            </ComponentCard>
            <ComponentCard id="L03 · Alert" name="Error Banner" tag="Feedback">
              <AuthErrorBanner />
            </ComponentCard>
            <ComponentCard id="L04 · Ok" name="Status Banner" tag="Feedback">
              <AuthStatusBanner />
            </ComponentCard>
            <ComponentCard id="L05 · Options" name="Remember Row" tag="Options">
              <AuthRememberRow />
            </ComponentCard>
            <LoginButtonSpecimen />
            <GuestButtonSpecimen />
            <ComponentCard id="L08 · Split" name="OR Divider" tag="Chrome">
              <AuthDivider />
            </ComponentCard>
            <ComponentCard id="L09 · Switch" name="Platform Tabs" tag="Switch">
              <AuthPlatformTabs />
            </ComponentCard>
            <ComponentCard id="L10 · OAuth" name="Social Auth" tag="OAuth">
              <AuthSocial />
            </ComponentCard>
            <ComponentCard id="L11 · Header" name="Form Header" tag="Chrome">
              <AuthFormHeader />
            </ComponentCard>
            <ComponentCard id="L12 · CTA" name="Footer Callout" tag="Link">
              <AuthFooterCallout />
            </ComponentCard>
          </div>
        </div>

        <div className="components-section components-section--nested">
          <div className="components-section-head">
            <span className="components-section-label">Long-form composition</span>
            <span className="components-section-rule" aria-hidden />
          </div>

          <div className="components-grid components-grid--wide">
            <MiniLoginSpecimen />
            <ComponentCard id="L14 · Brand" name="Auth Header" tag="Composite">
              <AuthHeaderBlock />
            </ComponentCard>
          </div>
        </div>
      </fieldset>
    </main>
  );
}

export default function ComponentsPage() {
  return (
    <InteractionProvider>
      <ComponentsShowcase />
    </InteractionProvider>
  );
}
