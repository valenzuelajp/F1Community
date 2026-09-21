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
    <div className="auth-header-wrap">
      {/* Brand Badge */}
      <div className="auth-header-badge">
        <Flag className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        Official F1 Platform Account
      </div>

      {/* Main Title */}
      <h1 className="auth-header-title">
        Sign In to <span className="f1-gradient-text">F1 Hub</span>
      </h1>
      <p className="auth-header-subtitle">
        One unified account for live telemetry, standings, and official team merchandise.
      </p>

      {/* Dual Platform Switcher */}
      <div className="auth-tab-switcher">
        <button
          type="button"
          onClick={() => onTabChange('f1')}
          className={`auth-tab-btn ${activeTab === 'f1' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
        >
          <Flag className="w-3.5 h-3.5" />
          F1 Website
        </button>
        <button
          type="button"
          onClick={() => onTabChange('store')}
          className={`auth-tab-btn ${activeTab === 'store' ? 'auth-tab-btn--active' : 'auth-tab-btn--inactive'}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          F1 Store
        </button>
      </div>
    </div>
  );
}
