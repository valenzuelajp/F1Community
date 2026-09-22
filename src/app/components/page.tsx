'use client';

import React from 'react';
import {
  InteractionProvider,
  Modal,
  Tooltip,
  Dropdown,
  Accordion,
  useInteractions,
} from '@/components/InteractionCollection';
import './components.css';

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
      <h1 className="components-title">
        Components Showcase
      </h1>

      <section className="components-section">
        <h2 className="components-section-title">
          Modal
        </h2>
        <button
          className="components-btn components-btn--primary"
          onClick={() => openModal('demo')}
        >
          Open Modal
        </button>
        <Modal id="demo" title="Demo Modal">
          <p style={{ color: '#9ca3af' }}>This is a demo modal content.</p>
        </Modal>
      </section>

      <section className="components-section">
        <h2 className="components-section-title">
          Tooltip
        </h2>
        <Tooltip content="This is a tooltip">
          <button className="components-btn components-btn--secondary">
            Hover me
          </button>
        </Tooltip>
      </section>

      <section className="components-section">
        <h2 className="components-section-title">
          Dropdown
        </h2>
        <Dropdown trigger="Menu" items={dropdownItems} />
      </section>

      <section className="components-section">
        <h2 className="components-section-title">
          Accordion
        </h2>
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
