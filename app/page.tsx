'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR fallback to prevent localStorage hydration mismatches
const ClientApp = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white font-black text-2xl flex items-center justify-center shadow-xl shadow-orange-500/25 animate-pulse">
        TM
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-lg font-black text-slate-900">DealFinder Temu</h2>
        <p className="text-xs text-slate-400">Загрузка суперцен и синхронизации корзины...</p>
      </div>
    </div>
  ),
});

export default function Page() {
  return <ClientApp />;
}
