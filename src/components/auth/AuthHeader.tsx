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
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase">
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
      <div className="grid grid-cols-2 gap-1 p-1 bg-black/40 border border-white/10 rounded-xl max-w-xs mx-auto">
        <button
          type="button"
          onClick={() => onTabChange('f1')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'f1'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Flag className="w-3.5 h-3.5" />
          F1 Website
        </button>
        <button
          type="button"
          onClick={() => onTabChange('store')}
          className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'store'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          F1 Store
        </button>
      </div>
    </div>
  );
}
