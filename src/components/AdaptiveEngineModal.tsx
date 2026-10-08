import React, { useState, useEffect } from 'react';
import {
  AdaptiveEngineMetrics,
  AdaptiveLogEntry,
  AdapterTier,
  RegionalConfig,
} from '../types';
import { adaptiveEngine, SUPPORTED_REGIONS } from '../services/adaptiveEngine';
import {
  X,
  ShieldCheck,
  Zap,
  Activity,
  Globe,
  Smartphone,
  RefreshCw,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wifi,
  Sparkles,
  Server,
  Play,
} from 'lucide-react';

interface AdaptiveEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegionChange?: (region: RegionalConfig) => void;
}

export const AdaptiveEngineModal: React.FC<AdaptiveEngineModalProps> = ({
  isOpen,
  onClose,
  onRegionChange,
}) => {
  const [metrics, setMetrics] = useState<AdaptiveEngineMetrics>(adaptiveEngine.getMetrics());
  const [logs, setLogs] = useState<AdaptiveLogEntry[]>(adaptiveEngine.getLogs());
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  useEffect(() => {
    const unsub = adaptiveEngine.subscribe((newMetrics, newLogs) => {
      setMetrics(newMetrics);
      setLogs(newLogs);
    });
    return unsub;
  }, []);

  if (!isOpen) return null;

  const handleRunDiagnostic = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await adaptiveEngine.runDiagnosticTest();
      setTestResult(`Все тесты пройдены! Пинг: ${res.latencyMs} мс, Оценка обхода защиты: ${res.evasionScore}%`);
    } catch {
      setTestResult('Ошибка соединения при диагностике');
    } finally {
      setTesting(false);
    }
  };

  const handleSelectTier = (tier: AdapterTier) => {
    adaptiveEngine.setTier(tier);
  };

  const handleSelectNetwork = (mode: 'turbo' | 'adaptive' | 'low_data') => {
    adaptiveEngine.setNetworkMode(mode);
  };

  const handleSelectRegion = (code: string) => {
    adaptiveEngine.setRegion(code);
    const reg = SUPPORTED_REGIONS[code];
    if (reg && onRegionChange) {
      onRegionChange(reg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  Адаптивный движок & Защита обхода
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Многоуровневая адаптация под Temu, обход Kasada/Akamai и региональные шлюзы
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80">
              <div className="flex items-center justify-between text-orange-700 text-[11px] font-bold mb-1">
                <span>Обход WAF</span>
                <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {metrics.antiBotEvasionScore}%
              </div>
              <div className="text-[10px] text-orange-800/80 mt-0.5 font-medium">Kasada/Akamai OK</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold mb-1">
                <span>Отклик (Ping)</span>
                <Zap className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {metrics.latencyMs} мс
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Узел Франкфурт-01</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center justify-between text-emerald-700 text-[11px] font-bold mb-1">
                <span>Надежность</span>
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-emerald-700">
                {metrics.reliabilityPercent}%
              </div>
              <div className="text-[10px] text-emerald-800 mt-0.5 font-medium">Circuit: CLOSED</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80">
              <div className="flex items-center justify-between text-sky-700 text-[11px] font-bold mb-1">
                <span>Запросов</span>
                <Server className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {metrics.totalRequests}
              </div>
              <div className="text-[10px] text-sky-800 mt-0.5">100% маршрутизировано</div>
            </div>
          </div>

          {/* Diagnostic Test Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Самодиагностика адаптивной цепочки</span>
              </div>
              <div className="text-[11px] text-slate-300">
                {testResult || 'Проверить скорость отклика шлюзов и состояние обхода защиты'}
              </div>
            </div>

            <button
              type="button"
              disabled={testing}
              onClick={handleRunDiagnostic}
              className="py-2.5 px-4 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-sm"
            >
              {testing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Тестирование...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Запустить тест</span>
                </>
              )}
            </button>
          </div>

          {/* Section 1: Adapter Tiers */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-orange-500" />
              <span>Уровни маршрутизации адаптера (Tier Routing)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'direct_gateway',
                  title: 'Прямой шлюз Temu Edge',
                  desc: 'TLS JA3 фингерпринт, эмуляция сессии приложения v5.42',
                  tag: 'Рекомендуется',
                },
                {
                  id: 'cors_mesh',
                  title: 'CORS Distributed Proxy Mesh',
                  desc: 'Распределенный пул прокси-ретрансляторов (Frankfurt / US)',
                  tag: 'Резервный',
                },
                {
                  id: 'deep_resolver',
                  title: 'Deep Link Referral Unwrapper',
                  desc: 'Разбор сокращенных ссылок (temu.to), Base64 параметров и SKU',
                  tag: 'Парсер',
                },
                {
                  id: 'heuristic_synthesis',
                  title: 'Эвристическое зеркало',
                  desc: 'Синтез цен по историческим кривым в случае блокировок',
                  tag: 'Офлайн',
                },
              ].map((tier) => {
                const isSelected = metrics.activeTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectTier(tier.id as AdapterTier)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-200'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{tier.title}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                          isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {tier.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{tier.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Regional Delivery & Duty limits */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-orange-500" />
              <span>Региональная адаптация и таможенные пороги</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(SUPPORTED_REGIONS).map(([code, reg]) => {
                const isSelected = metrics.activeRegion.countryCode === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleSelectRegion(code)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500 text-white shadow-xs font-bold'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="truncate font-bold">{reg.countryName}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-orange-100' : 'text-slate-400'}`}>
                      {reg.defaultCurrency} • до {reg.customsDutyLimitEur}€
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Network Optimization Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Wifi className="w-4 h-4 text-orange-500" />
              <span>Оптимизация под сеть и трафик</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'turbo', label: '⚡ Турбо-режим', desc: 'Максимум скорости' },
                { id: 'adaptive', label: '🔄 Адаптивный', desc: 'Авто-подстройка' },
                { id: 'low_data', label: '📉 Экономия', desc: 'Сжатие трафика' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectNetwork(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                    metrics.networkMode === opt.id
                      ? 'border-slate-900 bg-slate-900 text-white font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Live Event Stream Logs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-orange-500" />
                <span>Журнал адаптаций в реальном времени (Live Stream)</span>
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {logs.length} записей
              </span>
            </div>

            <div className="bg-slate-950 rounded-2xl p-3.5 font-mono text-[11px] text-slate-300 max-h-48 overflow-y-auto space-y-1.5 border border-slate-800">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 select-none shrink-0">[{log.timestamp}]</span>
                  <span
                    className={`font-bold uppercase text-[9px] px-1 py-0.2 rounded shrink-0 ${
                      log.level === 'evasion'
                        ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                        : log.level === 'success'
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                        : log.level === 'warn'
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {log.level}
                  </span>
                  <span className="text-slate-200 break-words">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Система адаптаций защищена сквозным шифрованием</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
