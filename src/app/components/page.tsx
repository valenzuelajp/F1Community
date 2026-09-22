'use client';

import React from 'react';
import {
  InteractionProvider,
  Modal,
  Tooltip,
  Dropdown,
  Accordion,
  useInteractions,
} from '@/components/interactions/InteractionCollection';

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
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem', color: '#fff' }}>
        Components Showcase
      </h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#d1d5db' }}>
          Modal
        </h2>
        <button
          onClick={() => openModal('demo')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ff1801',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
        <Modal id="demo" title="Demo Modal">
          <p style={{ color: '#9ca3af' }}>This is a demo modal content.</p>
        </Modal>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#d1d5db' }}>
          Tooltip
        </h2>
        <Tooltip content="This is a tooltip">
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#141824',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.375rem',
              cursor: 'pointer',
            }}
          >
            Hover me
          </button>
        </Tooltip>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#d1d5db' }}>
          Dropdown
        </h2>
        <Dropdown trigger="Menu" items={dropdownItems} />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#d1d5db' }}>
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
