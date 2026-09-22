'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, ChevronDown, CheckCircle } from 'lucide-react';
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
function Dropdown({ trigger, items }: { trigger: string; items: { label: string; onClick: () => void }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`interaction-dropdown ${isOpen ? 'is-open' : ''}`}>
      <button className="interaction-dropdown-trigger" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {trigger}
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="interaction-dropdown-menu" role="menu">
        {items.map((item, i) => (
          <div key={i} className="interaction-dropdown-item" role="menuitem" onClick={() => { item.onClick(); setIsOpen(false); }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Accordion */
function Accordion({ items }: { items: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="interaction-accordion">
      {items.map((item, i) => (
        <div key={i} className={`interaction-accordion-item ${openIndex === i ? 'is-open' : ''}`}>
          <button className="interaction-accordion-trigger" onClick={() => setOpenIndex(openIndex === i ? null : i)} aria-expanded={openIndex === i}>
            {item.title}
            <ChevronDown className="interaction-accordion-icon h-4 w-4" />
          </button>
          <div className="interaction-accordion-content">
            <div className="interaction-accordion-body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Page */
function ComponentsShowcase() {
  const { openModal, showToast } = useInteractions();

  const dropdownItems = [
    { label: 'Profile', onClick: () => showToast('Profile clicked') },
    { label: 'Settings', onClick: () => showToast('Settings clicked') },
    { label: 'Logout', onClick: () => showToast('Logout clicked') },
  ];

  const accordionItems = [
    { title: 'What is F1 Store?', content: 'F1 Store is your ultimate destination for Formula 1 merchandise and collectibles.' },
    { title: 'How do I track my order?', content: 'You can track your order from the Orders section in your account dashboard.' },
    { title: 'What payment methods are accepted?', content: 'We accept all major credit cards, PayPal, and bank transfers.' },
  ];

  return (
    <main className="components-page">
      <h1 className="components-title">Components Showcase</h1>

      <section className="components-section">
        <h2 className="components-section-title">Modal</h2>
        <button className="components-btn components-btn--primary" onClick={() => openModal('demo')}>Open Modal</button>
        <Modal id="demo" title="Demo Modal">
          <p style={{ color: '#9ca3af' }}>This is a demo modal content.</p>
        </Modal>
      </section>

      <section className="components-section">
        <h2 className="components-section-title">Tooltip</h2>
        <Tooltip content="This is a tooltip">
          <button className="components-btn components-btn--secondary">Hover me</button>
        </Tooltip>
      </section>

      <section className="components-section">
        <h2 className="components-section-title">Dropdown</h2>
        <Dropdown trigger="Menu" items={dropdownItems} />
      </section>

      <section className="components-section">
        <h2 className="components-section-title">Accordion</h2>
        <Accordion items={accordionItems} />
      </section>
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
