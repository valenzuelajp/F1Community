'use client';

import React from 'react';
import { Flag, ShoppingBag } from 'lucide-react';

interface AuthHeaderProps {
  activeTab: 'f1' | 'store';
  onTabChange: (tab: 'f1' | 'store') => void;
}

/**
 * Header component for the F1 Platform Login page.
 * Displays official F1 branding along with a dual toggle switch
 * allowing users to see how their single account grants access to both
 * F1 Live Website features and F1 Merchandise Store purchases.
 */
export function AuthHeader({ activeTab, onTabChange }: AuthHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-6">
      {/* Brand Badge */}
      <div className="auth-badge">
        <Flag className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        Official F1 Platform Account
      </div>

      {/* Main Title */}
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Sign In to <span className="f1-gradient-text">F1 Hub</span>
      </h1>
      <p className="text-sm text-gray-400 max-w-sm mx-auto">
        One unified account for live telemetry, standings, and official team merchandise.
      </p>

      {/* Dual Platform Switcher */}
      <div className="tab-switcher">
        <button
          type="button"
          onClick={() => onTabChange('f1')}
          className={`tab-btn ${activeTab === 'f1' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
        >
          <Flag className="w-3.5 h-3.5" />
          F1 Website
        </button>
        <button
          type="button"
          onClick={() => onTabChange('store')}
          className={`tab-btn ${activeTab === 'store' ? 'tab-btn--active' : 'tab-btn--inactive'}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          F1 Store
        </button>
      </div>
    </div>
  );
}
