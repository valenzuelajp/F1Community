'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { X, CheckCircle, ChevronDown, Plus, Minus, Loader2, Check } from 'lucide-react';
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
function Dropdown({ label, items }: { label: string; items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`components-dropdown ${open ? 'is-open' : ''}`}>
      <button className="components-btn components-btn--secondary" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {label}
        <ChevronDown className="ml-1 inline h-3 w-3" />
      </button>
      <div className="components-dropdown-menu" role="menu">
        {items.map((item) => (
          <button key={item} className="components-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
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
  children,
}: {
  id: string;
  name: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <article className="components-card">
      <header className="components-card-head">
        <div>
          <div className="components-card-id">{id}</div>
          <h2 className="components-card-name">{name}</h2>
        </div>
        <span className="components-card-tag">{tag}</span>
      </header>
      <div className="components-card-preview">{children}</div>
    </article>
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
          <span>Basic interaction · 07 short · 03 long</span>
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
