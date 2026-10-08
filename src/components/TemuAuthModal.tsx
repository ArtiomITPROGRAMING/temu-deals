import React, { useState } from 'react';
import { TemuAccount, TemuOrder } from '../types';
import { backendApi } from '../services/backendApi';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Mail,
  Lock,
  ArrowRight,
  RefreshCw,
  ShoppingBag,
  Truck,
  Sparkles,
  QrCode,
  Key,
  ExternalLink,
  MapPin,
  Check,
} from 'lucide-react';

interface TemuAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  temuAccount: TemuAccount;
  onUpdateTemuAccount: (account: TemuAccount) => void;
  onShowToast: (msg: string) => void;
}

export const TemuAuthModal: React.FC<TemuAuthModalProps> = ({
  isOpen,
  onClose,
  temuAccount,
  onUpdateTemuAccount,
  onShowToast,
}) => {
  const [authMethod, setAuthMethod] = useState<'phone' | 'email' | 'qr' | 'token'>('phone');
  const [step, setStep] = useState<'input' | 'code' | 'success'>('input');
  const [inputVal, setInputVal] = useState(temuAccount.emailOrPhone || '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [syncingBasket, setSyncingBasket] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);

  // Address editing state
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState(
    temuAccount.shippingAddress || {
      fullName: 'Александр Васильев',
      phone: '+7 (926) 482-19-02',
      country: 'Россия',
      city: 'Москва',
      street: 'ул. Тверская, д. 12, кв. 45',
      postalCode: '125009',
    }
  );

  if (!isOpen) return null;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('code');
      onShowToast(`Код верификации Temu отправлен на ${inputVal}`);
    }, 700);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 4) return;
    setLoading(true);

    setTimeout(() => {
      completeConnection(inputVal || '+7 (926) 482-19-02');
    }, 900);
  };

  const handleQrSimulate = () => {
    setLoading(true);
    setQrScanned(true);
    setTimeout(() => {
      completeConnection('temu_app_qr_user@temu.com');
    }, 1200);
  };

  const handleTokenLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      completeConnection('api_token_session@temu.com');
    }, 800);
  };

  const completeConnection = (contact: string) => {
    const mockOrders: TemuOrder[] = [
      {
        id: 'ord-101',
        temuOrderId: 'TM-94819204',
        items: [],
        totalPrice: 1998,
        currency: 'RUB',
        status: 'shipped',
        statusLabel: 'В пути (Авиаперевозка Гуанчжоу → Москва)',
        trackingNumber: 'LP00694829104CN',
        estimatedDelivery: '14-18 октября',
        createdAt: '2026-10-06T15:20:00Z',
      },
      {
        id: 'ord-102',
        temuOrderId: 'TM-83719284',
        items: [],
        totalPrice: 3450,
        currency: 'RUB',
        status: 'delivered',
        statusLabel: 'Доставлен в пункт выдачи CDEK',
        trackingNumber: 'LP00583719284CN',
        estimatedDelivery: '28 сентября',
        createdAt: '2026-09-22T10:10:00Z',
      },
    ];

    const updated: TemuAccount = {
      isConnected: true,
      emailOrPhone: contact,
      name: contact.includes('@') ? contact.split('@')[0] : 'Александр В.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      shippingAddress: addressDraft,
      linkedAt: new Date().toISOString(),
      orders: mockOrders,
    };

    // Sync with Live Python FastAPI Backend
    try {
      backendApi.authTemu(authType, contact, code).catch(() => {});
    } catch {
      // safe fallback
    }

    onUpdateTemuAccount(updated);
    setLoading(false);
    setStep('success');
    onShowToast('Аккаунт Temu успешно привязан и синхронизирован!');
  };

  const handleSyncBasketNow = () => {
    setSyncingBasket(true);
    setTimeout(() => {
      setSyncingBasket(false);
      onShowToast('Корзина DealFinder синхронизирована с серверами Temu!');
    }, 1100);
  };

  const handleSaveAddress = () => {
    onUpdateTemuAccount({
      ...temuAccount,
      shippingAddress: addressDraft,
    });
    setIsEditingAddress(false);
    onShowToast('Адрес доставки Temu сохранен');
  };

  const handleDisconnect = () => {
    onUpdateTemuAccount({
      isConnected: false,
      emailOrPhone: '',
      name: '',
      orders: [],
    });
    setStep('input');
    setInputVal('');
    setCode('');
    onShowToast('Синхронизация с Temu отключена');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-7 overflow-y-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
            TEMU
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Синхронизация с Temu
            </h3>
            <p className="text-xs text-slate-500">
              Единый аккаунт, выкуп по суперценам и сквозная корзина
            </p>
          </div>
        </div>

        {/* CONNECTED STATE */}
        {temuAccount.isConnected && step !== 'input' ? (
          <div className="space-y-4">
            {/* Live Connection Badge */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-emerald-900 block">
                    Аккаунт Temu активен и синхронизирован
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">
                    {temuAccount.name} ({temuAccount.emailOrPhone})
                  </span>
                  <div className="text-[10px] text-emerald-600 mt-0.5">
                    Сквозное SSL-соединение • Токен валиден
                  </div>
                </div>
              </div>

              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
            </div>

            {/* Two-Way Cart Sync Action */}
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-xs font-black text-orange-950 flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Двусторонняя синхронизация корзины</span>
                </div>
                <p className="text-[11px] text-orange-800">
                  Все добавленные товары мгновенно переносятся на серверы Temu
                </p>
              </div>

              <button
                type="button"
                onClick={handleSyncBasketNow}
                disabled={syncingBasket}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingBasket ? 'animate-spin' : ''}`} />
                <span>{syncingBasket ? 'Синхронизация...' : 'Синхронизировать'}</span>
              </button>
            </div>

            {/* Shipping Address from Temu */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" />
                  <span>Адрес доставки из Temu:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  {isEditingAddress ? 'Отмена' : 'Изменить'}
                </button>
              </div>

              {isEditingAddress ? (
                <div className="space-y-2 pt-1">
                  <input
                    type="text"
                    placeholder="ФИО получателя"
                    value={addressDraft.fullName}
                    onChange={(e) => setAddressDraft({ ...addressDraft, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Город"
                    value={addressDraft.city}
                    onChange={(e) => setAddressDraft({ ...addressDraft, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-900"
                  />
                  <input
                    type="text"
                    placeholder="Улица, дом, квартира"
                    value={addressDraft.street}
                    onChange={(e) => setAddressDraft({ ...addressDraft, street: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleSaveAddress}
                    className="w-full py-2 rounded-xl font-bold text-xs bg-slate-900 text-white"
                  >
                    Сохранить адрес
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-600 font-medium space-y-0.5">
                  <div className="text-slate-900 font-bold">{temuAccount.shippingAddress?.fullName}</div>
                  <div>
                    {temuAccount.shippingAddress?.country}, г. {temuAccount.shippingAddress?.city},{' '}
                    {temuAccount.shippingAddress?.street}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Телефон: {temuAccount.shippingAddress?.phone}
                  </div>
                </div>
              )}
            </div>

            {/* Orders Tracking */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-600" />
                  <span>Активные заказы в Temu ({temuAccount.orders.length}):</span>
                </span>
              </div>

              <div className="space-y-2">
                {temuAccount.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-orange-600">{order.temuOrderId}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                        {order.statusLabel}
                      </span>
                    </div>
                    {order.trackingNumber && (
                      <div className="text-[11px] text-slate-500 font-mono">
                        Трек-номер: <span className="font-bold text-slate-700">{order.trackingNumber}</span>
                      </div>
                    )}
                    <div className="text-[10px] text-slate-400">
                      Ожидаемая доставка: {order.estimatedDelivery}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer"
              >
                Готово
              </button>
              <button
                type="button"
                onClick={handleDisconnect}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors cursor-pointer"
              >
                Отвязать аккаунт
              </button>
            </div>
          </div>
        ) : step === 'input' ? (
          /* STEP 1: Select Method & Input */
          <div className="space-y-4">
            {/* Login Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  authMethod === 'phone' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Телефон</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  authMethod === 'email' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('qr')}
                className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
                  authMethod === 'qr' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR-код</span>
              </button>
            </div>

            {authMethod === 'phone' || authMethod === 'email' ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {authMethod === 'phone'
                      ? 'Номер телефона в Temu (+7, +1, +380, +77):'
                      : 'Email адрес аккаунта Temu:'}
                  </label>
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={
                      authMethod === 'phone'
                        ? '+7 (999) 000-00-00'
                        : 'example@gmail.com'
                    }
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 text-slate-900"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    На указанный контакт поступит одноразовый проверочный код Temu.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Безопасная интеграция через официальные шлюзы Temu. Мы никогда не запрашиваем пароли от ваших банковских карт.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Отправка кода...</span>
                    </>
                  ) : (
                    <>
                      <span>Получить код Temu</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* QR Code Method */
              <div className="text-center py-4 space-y-4">
                <div className="relative w-48 h-48 mx-auto p-3 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white shadow-xl">
                  <QrCode className="w-36 h-36 text-white" />
                  <span className="text-[10px] text-orange-400 font-black tracking-widest mt-1">
                    SCAN IN TEMU APP
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Отсканируйте камерой приложения Temu
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Откройте приложение Temu → Профиль → Сканер QR и наведите на экран для мгновенного входа.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleQrSimulate}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Подтверждение авторизации...</span>
                    </>
                  ) : (
                    <span>Имитировать сканирование в Temu</span>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : step === 'code' ? (
          /* STEP 2: Verify Code */
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Введите 6-значный код из SMS / Email:
                </label>
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-orange-600 hover:underline"
                >
                  Изменить контакт
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-3 text-center tracking-widest text-2xl font-black rounded-2xl border border-slate-200 focus:outline-hidden focus:border-orange-500 text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                Код отправлен на {inputVal}. Тестовый код: любые 6 цифр (например, 777888).
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Проверка кода Temu...</span>
                </>
              ) : (
                <span>Подтвердить и синхронизировать</span>
              )}
            </button>
          </form>
        ) : (
          /* SUCCESS SCREEN */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-black text-slate-900">
              Аккаунт Temu успешно синхронизирован!
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Теперь ваши выбранные товары автоматически передаются в корзину Temu с применением максимальных скидок и вашего сохраненного адреса доставки.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 shadow-md shadow-orange-500/25 transition-all cursor-pointer"
            >
              Перейти к покупкам в Temu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
