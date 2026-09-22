'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, ChevronDown, CheckCircle } from 'lucide-react';
import './interactions.css';

/* ==========================================================================
   Interaction Context
   Centralized state for interaction components
   ========================================================================== */

interface InteractionContextType {
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  showToast: (message: string) => void;
  isModalOpen: (id: string) => boolean;
}

const InteractionContext = createContext<InteractionContextType | null>(null);

export function useInteractions() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error('useInteractions must be used within InteractionProvider');
  }
  return context;
}

/* ==========================================================================
   Interaction Provider
   Wraps app to provide interaction state management
   ========================================================================== */

export function InteractionProvider({ children }: { children: ReactNode }) {
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

  const isModalOpen = useCallback((id: string) => {
    return openModals.has(id);
  }, [openModals]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  return (
    <InteractionContext.Provider value={{ openModal, closeModal, showToast, isModalOpen }}>
      {children}
      <Toast message={toastMessage} />
    </InteractionContext.Provider>
  );
}

/* ==========================================================================
   Modal Component
   ========================================================================== */

interface ModalProps {
  id: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ id, title, children, footer }: ModalProps) {
  const { isModalOpen, closeModal } = useInteractions();
  const isOpen = isModalOpen(id);

  return (
    <div
      className={`interaction-modal-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={() => closeModal(id)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${id}`}
    >
      <div className="interaction-modal" onClick={(e) => e.stopPropagation()}>
        <div className="interaction-modal-header">
          <h2 className="interaction-modal-title" id={`modal-title-${id}`}>
            {title}
          </h2>
          <button
            className="interaction-modal-close"
            onClick={() => closeModal(id)}
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="interaction-modal-body">{children}</div>
        {footer && <div className="interaction-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

/* ==========================================================================
   Tooltip Component
   ========================================================================== */

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="interaction-tooltip">
      {children}
      <div className="interaction-tooltip-content">{content}</div>
    </div>
  );
}

/* ==========================================================================
   Dropdown Component
   ========================================================================== */

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: string;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`interaction-dropdown ${isOpen ? 'is-open' : ''}`}>
      <button
        className="interaction-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {trigger}
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="interaction-dropdown-menu" role="menu">
        {items.map((item, index) => (
          <div
            key={index}
            className="interaction-dropdown-item"
            role="menuitem"
            onClick={() => {
              item.onClick();
              setIsOpen(false);
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Toast Component
   ========================================================================== */

interface ToastProps {
  message: string | null;
}

function Toast({ message }: ToastProps) {
  return (
    <div className={`interaction-toast ${message ? 'is-visible' : ''}`} role="alert">
      <CheckCircle className="h-5 w-5 text-green-400" />
      <span className="interaction-toast-message">{message}</span>
    </div>
  );
}

/* ==========================================================================
   Accordion Component
   ========================================================================== */

interface AccordionItemData {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItemData[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="interaction-accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`interaction-accordion-item ${openIndex === index ? 'is-open' : ''}`}
        >
          <button
            className="interaction-accordion-trigger"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
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

/* ==========================================================================
   InteractionCollection
   Main export - wraps all interaction components
   ========================================================================== */

export function InteractionCollection() {
  return null;
}
