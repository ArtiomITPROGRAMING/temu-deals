import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    title: 'Беспроводные наушники Pro 4 TWS Bluetooth 5.3 с кейсом',
    category: 'Электроника',
    subcategory: 'Наушники',
    brand: 'ProSound',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Компактные беспроводные наушники с глубоким басом, активным шумоподавлением ENC и временем автономной работы до 24 часов вместе с зарядным кейсом.',
    currentPrice: 999,
    oldPrice: 2699,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 3420,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T09:30:00Z',
    history: [
      { date: '2026-07-10', price: 2450 },
      { date: '2026-07-25', price: 2390 },
      { date: '2026-08-05', price: 2300 },
      { date: '2026-08-20', price: 2150 },
      { date: '2026-09-01', price: 2200 },
      { date: '2026-09-15', price: 1850 },
      { date: '2026-09-28', price: 1400 },
      { date: '2026-10-08', price: 999 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 999, oldPrice: 2699, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика Гуанчжоу)', price: 920, oldPrice: 2699, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true },
      { storeId: 'temu-express', storeName: 'Temu Express Hub (Авиадоставка)', price: 1050, oldPrice: 2699, url: 'https://temu.com', inStock: true, deliveryDays: 5, freeDelivery: true }
    ],
    specs: {
      'Версия Bluetooth': '5.3',
      'Время работы от батареи': 'до 24 часов с кейсом',
      'Влагозащита': 'IPX5 (защита от брызг и пота)',
      'Управление': 'Сенсорное',
      'Шумоподавление': 'ENC для четких звонков',
      'Разъем': 'USB Type-C'
    },
    reviews: [
      { id: 'r1', author: 'Алексей М.', rating: 5, date: '02.10.2026', text: 'Отличные наушники Temu! Звук чистый, басы плотные, держат заряд долго.', pros: 'Компактные, быстро заряжаются, отличный микрофон', cons: 'Нет беспроводной зарядки' },
      { id: 'r2', author: 'Мария К.', rating: 5, date: '28.09.2026', text: 'Очень удобные, не выпадают на пробежке. Пришли с Temu за 7 дней.', pros: 'Удобно сидят в ушах', cons: 'Не нашла' },
      { id: 'r3', author: 'Дмитрий С.', rating: 4, date: '19.09.2026', text: 'За 999 рублей просто подарок. В локальных магазинах они втрое дороже.', pros: 'Цена, сборка кейса' }
    ]
  },
  {
    id: 'p-2',
    title: 'Портативный умный 4K проектор Magcubic Android 11 Wi-Fi 6',
    category: 'Электроника',
    subcategory: 'Проекторы',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Компактный домашний кинотеатр с поддержкой 4K декодирования, встроенным Android 11, поворотным корпусом на 180° и сверхбыстрым Wi-Fi 6.',
    currentPrice: 2890,
    oldPrice: 8990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 8840,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T08:00:00Z',
    history: [
      { date: '2026-07-10', price: 7900 },
      { date: '2026-07-28', price: 6500 },
      { date: '2026-08-14', price: 5400 },
      { date: '2026-08-30', price: 4200 },
      { date: '2026-09-12', price: 3600 },
      { date: '2026-09-25', price: 3100 },
      { date: '2026-10-08', price: 2890 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 2890, oldPrice: 8990, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 2750, oldPrice: 8990, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true },
      { storeId: 'temu-express', storeName: 'Temu Express Hub (Авиа)', price: 3100, oldPrice: 8990, url: 'https://temu.com', inStock: true, deliveryDays: 5, freeDelivery: true }
    ],
    specs: {
      'Разрешение': 'Native 1280x720 (поддержка 4K)',
      'ОС': 'Android 11 Smart TV',
      'Яркость': '260 ANSI люмен',
      'Беспроводная связь': 'Двухдиапазонный Wi-Fi 6, Bluetooth 5.0'
    },
    reviews: [
      { id: 'r21', author: 'Игорь В.', rating: 5, date: '01.10.2026', text: 'Картинка на всю стену! Работает YouTube прямо из коробки без приставки.', pros: 'Яркий, тихий, Android 11' }
    ]
  },
  {
    id: 'p-3',
    title: 'Механическая игровая клавиатура Redragon K552 Kumara RGB',
    category: 'Электроника',
    subcategory: 'Клавиатуры',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Надежная механическая клавиатура турнирного формата TKL (без цифрового блока) на переключателях Outemu Red с яркой RGB подсветкой и металлическим основанием.',
    currentPrice: 1799,
    oldPrice: 3899,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 5210,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T10:15:00Z',
    history: [
      { date: '2026-07-01', price: 3499 },
      { date: '2026-07-20', price: 3200 },
      { date: '2026-08-10', price: 3100 },
      { date: '2026-08-25', price: 2950 },
      { date: '2026-09-10', price: 2600 },
      { date: '2026-09-25', price: 2199 },
      { date: '2026-10-08', price: 1799 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1799, oldPrice: 3899, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 1699, oldPrice: 3899, url: 'https://temu.com', inStock: true, deliveryDays: 9, freeDelivery: true }
    ],
    specs: {
      'Тип клавиатуры': 'Механическая',
      'Переключатели': 'Red Switches (линейные, тихие)',
      'Форм-фактор': 'TKL (87 клавиш)',
      'Подсветка': 'Full RGB (18 режимов)',
      'Кабель': 'В оплетке, 1.8 м'
    },
    reviews: [
      { id: 'r31', author: 'Кирилл П.', rating: 5, date: '04.10.2026', text: 'За 1800 рублей механика такого качества — просто подарок с Temu. Свитчи мягкие, отклик мгновенный.', pros: 'Тяжелая, не скользит, приятный звук', cons: 'Громковат пробел' }
    ]
  },
  {
    id: 'p-4',
    title: 'Смарт-часы Haylou Solar Plus RT3 AMOLED (LS02 обновленные)',
    category: 'Электроника',
    subcategory: 'Смарт-часы',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Умные часы с четким AMOLED-дисплеем 1.43", поддержкой Bluetooth-звонков, круглосуточным мониторингом пульса и SpO2, и автономностью до 14 дней.',
    currentPrice: 849,
    oldPrice: 2999,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 2940,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T07:15:00Z',
    history: [
      { date: '2026-07-01', price: 2790 },
      { date: '2026-07-20', price: 2600 },
      { date: '2026-08-15', price: 2400 },
      { date: '2026-09-01', price: 2100 },
      { date: '2026-09-18', price: 1490 },
      { date: '2026-10-08', price: 849 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 849, oldPrice: 2999, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 799, oldPrice: 2999, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true }
    ],
    specs: {
      'Экран': '1.43" AMOLED 466x466',
      'Автономность': 'До 14 дней базового режима',
      'Датчики': 'Пульсометр, SpO2, шагомер, сон',
      'Звонки': 'Да, через Bluetooth микрофон/динамик',
      'Защита': 'IP68'
    },
    reviews: [
      { id: 'r41', author: 'Сергей Т.', rating: 5, date: '05.10.2026', text: 'Экран шикарный, цвета сочные! Звонки работают на отлично.', pros: 'AMOLED экран, цена', cons: 'Ремешок немного жестковат' }
    ]
  },
  {
    id: 'p-5',
    title: 'Кроссовки мужские летние спортивные дышащие сетка',
    category: 'Одежда',
    subcategory: 'Обувь',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ультралегкие мужские кроссовки с амортизирующей подошвой EVA и бесшовным дышащим верхом. Идеальны для бега, тренировок и повседневной носки.',
    currentPrice: 1650,
    oldPrice: 3800,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 1650,
    freeDelivery: true,
    isHot: false,
    updatedAt: '2026-10-08T06:00:00Z',
    history: [
      { date: '2026-07-15', price: 3400 },
      { date: '2026-08-01', price: 3200 },
      { date: '2026-08-20', price: 2900 },
      { date: '2026-09-10', price: 2500 },
      { date: '2026-09-25', price: 2100 },
      { date: '2026-10-08', price: 1650 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1650, oldPrice: 3800, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 1550, oldPrice: 3800, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true }
    ],
    specs: {
      'Материал верха': 'Текстиль / дышащая 3D сетка',
      'Подошва': 'Амортизирующая пена EVA',
      'Сезон': 'Лето / Демисезон',
      'Стелька': 'Анатомическая мягкая'
    },
    reviews: [
      { id: 'r51', author: 'Артем Д.', rating: 5, date: '03.10.2026', text: 'Очень легкие, как тапочки. Нога не потеет в жару.', pros: 'Легкость, комфорт' }
    ]
  },
  {
    id: 'p-6',
    title: 'Настольная LED лампа с регулировкой яркости и таймером',
    category: 'Дом',
    subcategory: 'Освещение',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Современная складная лампа для рабочего стола с 5 режимами цветовой температуры, защитой глаз без мерцания и USB-портом для зарядки смартфона.',
    currentPrice: 599,
    oldPrice: 1999,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 2410,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T09:00:00Z',
    history: [
      { date: '2026-07-01', price: 1850 },
      { date: '2026-07-20', price: 1750 },
      { date: '2026-08-15', price: 1600 },
      { date: '2026-09-01', price: 1350 },
      { date: '2026-09-20', price: 950 },
      { date: '2026-10-08', price: 599 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 599, oldPrice: 1999, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 549, oldPrice: 1999, url: 'https://temu.com', inStock: true, deliveryDays: 9, freeDelivery: true }
    ],
    specs: {
      'Мощность': '10 Вт',
      'Цветовая температура': '3000K - 6500K (5 режимов)',
      'Управление': 'Сенсорная панель с диммером',
      'Питание': 'USB Type-C'
    },
    reviews: [
      { id: 'r61', author: 'Елена Б.', rating: 5, date: '06.10.2026', text: 'Глаза вообще не устают, можно настраивать теплый вечерний свет.', pros: 'Компактная, приятный свет' }
    ]
  },
  {
    id: 'p-7',
    title: 'Мощный повербанк 50 000 mAh 65W Fast Charge для ноутбуков и телефонов',
    category: 'Электроника',
    subcategory: 'Повербанки',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Емкий портативный аккумулятор на 50000 мАч с поддержкой Power Delivery 65W, одновременной зарядкой до 4 устройств и ярким LED дисплеем остатка заряда.',
    currentPrice: 1490,
    oldPrice: 4500,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 12410,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T11:00:00Z',
    history: [
      { date: '2026-07-01', price: 4200 },
      { date: '2026-07-25', price: 3800 },
      { date: '2026-08-15', price: 3200 },
      { date: '2026-09-01', price: 2400 },
      { date: '2026-09-20', price: 1890 },
      { date: '2026-10-08', price: 1490 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1490, oldPrice: 4500, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 1390, oldPrice: 4500, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true }
    ],
    specs: {
      'Емкость': '50 000 мАч',
      'Выходная мощность': '65W Max Power Delivery',
      'Порты': '2x Type-C (вход/выход), 3x USB-A QC 3.0',
      'Дисплей': 'Цифровой процентный LED'
    },
    reviews: [
      { id: 'r71', author: 'Максим Р.', rating: 5, date: '07.10.2026', text: 'Заряжает мой ноутбук на полной скорости! Хватает на несколько дней командировки.', pros: 'Честная емкость, быстрая зарядка 65W' }
    ]
  },
  {
    id: 'p-8',
    title: 'Игровой монитор Xiaomi Mi Curved Gaming Monitor 34" 144Hz WQHD',
    category: 'Электроника',
    subcategory: 'Мониторы',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Изогнутый ультраширокий экран с соотношением 21:9, радиусом кривизны 1500R, разрешением 3440х1440 и частотой обновления 144 Гц с технологией AMD FreeSync Premium.',
    currentPrice: 22990,
    oldPrice: 34990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 3100,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T08:30:00Z',
    history: [
      { date: '2026-07-05', price: 32500 },
      { date: '2026-07-28', price: 31000 },
      { date: '2026-08-20', price: 29500 },
      { date: '2026-09-10', price: 27900 },
      { date: '2026-09-26', price: 24500 },
      { date: '2026-10-08', price: 22990 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 22990, oldPrice: 34990, url: 'https://temu.com', inStock: true, deliveryDays: 8, freeDelivery: true, cashbackPercent: 5 }
    ],
    specs: {
      'Диагональ': '34 дюйма (21:9)',
      'Разрешение': '3440 x 1440 WQHD',
      'Частота обновления': '144 Гц',
      'Кривизна': '1500R'
    },
    reviews: [
      { id: 'r81', author: 'Павел К.', rating: 5, date: '04.10.2026', text: 'Потрясающий монитор для работы с кодом и игр! Места на рабочем столе как на двух мониторах сразу.', pros: '21:9, 144Hz, дизайн' }
    ]
  },
  {
    id: 'p-9',
    title: 'Планшет Temu Pad Pro 10.1" Android 14 8/128GB с чехлом-клавиатурой',
    category: 'Электроника',
    subcategory: 'Планшеты',
    brand: 'Temu Factory Direct',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Универсальный 10-дюймовый IPS планшет в тонком металлическом корпусе, 8-ядерный процессор, поддержка 4G LTE двух SIM-карт и съемная Bluetooth клавиатура в комплекте.',
    currentPrice: 5990,
    oldPrice: 14900,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 7150,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T09:40:00Z',
    history: [
      { date: '2026-07-01', price: 13500 },
      { date: '2026-07-20', price: 11900 },
      { date: '2026-08-15', price: 9800 },
      { date: '2026-09-01', price: 8200 },
      { date: '2026-09-22', price: 6900 },
      { date: '2026-10-08', price: 5990 }
    ],
    storeOffers: [
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 5990, oldPrice: 14900, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 6290, oldPrice: 14900, url: 'https://temu.com', inStock: true, deliveryDays: 6, freeDelivery: true }
    ],
    specs: {
      'Экран': '10.1" IPS 1920x1200 FHD',
      'Оперативная память': '8 ГБ RAM',
      'Накопитель': '128 ГБ ROM + слот MicroSD до 512 ГБ',
      'Связь': '4G Dual SIM LTE + Wi-Fi 5G'
    },
    reviews: [
      { id: 'r91', author: 'Андрей Г.', rating: 5, date: '05.10.2026', text: 'За 6000 рублей планшет вместе с клавиатурой и чехлом — невероятная находка на Temu!', pros: 'Цена, комплект с клавиатурой, экран' }
    ]
  },
  {
    id: 'p-10',
    title: 'Робот-пылесос Xiaomi Robot Vacuum S10+ с влажной уборкой',
    category: 'Дом',
    subcategory: 'Бытовая техника',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Лазерная LDS-навигация с 3D-распознаванием препятствий, мощность всасывания 4000 Па, две вращающиеся насадки для влажной уборки под давлением.',
    currentPrice: 18490,
    oldPrice: 28990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 1980,
    freeDelivery: true,
    isHot: false,
    updatedAt: '2026-10-08T07:50:00Z',
    history: [
      { date: '2026-07-10', price: 26900 },
      { date: '2026-08-01', price: 25400 },
      { date: '2026-08-25', price: 23900 },
      { date: '2026-09-15', price: 21500 },
      { date: '2026-10-08', price: 18490 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 18490, oldPrice: 28990, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 }
    ],
    specs: {
      'Сила всасывания': '4000 Па',
      'Навигация': 'LDS Лазерный радар + 3D сенсоры',
      'Уборка': 'Сухая и влажная'
    },
    reviews: []
  },
  {
    id: 'p-11',
    title: 'Портативная игровая ретро-консоль R36S 64GB 15 000 ретро-игр',
    category: 'Игры',
    subcategory: 'Консоли',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1612287232230-6725dc36b446?w=800&auto=format&fit=crop&q=80',
    description: 'Хит Temu! Карманная приставка на Linux с великолепным IPS экраном 3.5" 640x480, двумя аналоговыми стиками и поддержкой игр PS1, PSP, Sega, Dendy, GBA, Nintendo.',
    currentPrice: 2190,
    oldPrice: 5990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 16420,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T10:00:00Z',
    history: [
      { date: '2026-07-01', price: 4900 },
      { date: '2026-08-01', price: 3900 },
      { date: '2026-09-01', price: 2800 },
      { date: '2026-10-08', price: 2190 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 2190, oldPrice: 5990, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 1990, oldPrice: 5990, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true }
    ],
    specs: {
      'Экран': '3.5" IPS OCA Fully Laminated 640x480',
      'Память': '64 ГБ MicroSD (15 000+ встроенных игр)',
      'Аккумулятор': '3500 мАч (до 8 часов непрерывной игры)'
    },
    reviews: []
  },
  {
    id: 'p-12',
    title: 'Умный электрический чайник с двойными стенками Smart Kettle',
    category: 'Дом',
    subcategory: 'Бытовая техника',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    description: 'Чайник с цифровой терморегулировкой от 40°C до 100°C, функцией поддержания температуры до 12 часов и теплоизолированным корпусом Cool-Touch.',
    currentPrice: 1490,
    oldPrice: 3900,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 4840,
    freeDelivery: true,
    isHot: false,
    updatedAt: '2026-10-08T09:00:00Z',
    history: [
      { date: '2026-07-10', price: 3200 },
      { date: '2026-07-25', price: 2850 },
      { date: '2026-08-10', price: 2500 },
      { date: '2026-08-25', price: 2100 },
      { date: '2026-09-15', price: 1800 },
      { date: '2026-10-08', price: 1490 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1490, oldPrice: 3900, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 }
    ],
    specs: {
      'Объем': '1.7 л',
      'Колба': 'Пищевая нержавеющая сталь 304',
      'Мощность': '1800 Вт'
    },
    reviews: []
  },
  {
    id: 'p-temu-1',
    title: 'Беспроводной микрофон петличка K9 Type-C / Lightning для смартфонов',
    category: 'Электроника',
    subcategory: 'Аксессуары',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    description: 'Двойной беспроводной петличный микрофон 2.4G с автоматическим подключением, шумоподавлением и дальностью передачи до 20 метров. Идеально для блогов, видео и стримов.',
    currentPrice: 399,
    oldPrice: 1290,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 8940,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T11:00:00Z',
    history: [
      { date: '2026-07-10', price: 1190 },
      { date: '2026-08-01', price: 950 },
      { date: '2026-08-25', price: 790 },
      { date: '2026-09-15', price: 550 },
      { date: '2026-10-08', price: 399 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 399, oldPrice: 1290, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 349, oldPrice: 1290, url: 'https://temu.com', inStock: true, deliveryDays: 10, freeDelivery: true }
    ],
    specs: {
      'Подключение': 'Plug & Play (без Bluetooth и приложений)',
      'Частота': '2.4 ГГц',
      'Батарея': 'До 10 часов автономной работы',
      'Совместимость': 'Android, iPhone, iPad, ПК'
    },
    reviews: []
  },
  {
    id: 'p-temu-2',
    title: 'Магнитный автомобильный держатель с беспроводной зарядкой MagSafe 15W',
    category: 'Авто',
    subcategory: 'Аксессуары',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    description: 'Мощный неодимовый магнит N52 для надежной фиксации телефона даже на ухабах. Быстрая беспроводная индукционная зарядка 15W и поворот на 360 градусов.',
    currentPrice: 650,
    oldPrice: 1890,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 6120,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T11:00:00Z',
    history: [
      { date: '2026-07-10', price: 1750 },
      { date: '2026-08-01', price: 1400 },
      { date: '2026-08-20', price: 1100 },
      { date: '2026-09-15', price: 890 },
      { date: '2026-10-08', price: 650 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 650, oldPrice: 1890, url: 'https://temu.com', inStock: true, deliveryDays: 8, freeDelivery: true, cashbackPercent: 5 }
    ],
    specs: {
      'Мощность зарядки': '15 Вт Fast Charge',
      'Крепление': 'В дефлектор воздуховода',
      'Магнит': 'MagSafe N52 Ring'
    },
    reviews: []
  },
  {
    id: 'p-temu-3',
    title: 'Портативный карманный термопринтер для фото и стикеров с Bluetooth',
    category: 'Электроника',
    subcategory: 'Гаджеты',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    description: 'Печатает без чернил благодаря термобумаге! Подходит для шпаргалок, фото, наклеек, чеков и заметок прямо со смартфона через приложение.',
    currentPrice: 1190,
    oldPrice: 2990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 4320,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T10:45:00Z',
    history: [
      { date: '2026-07-15', price: 2700 },
      { date: '2026-08-05', price: 2400 },
      { date: '2026-08-25', price: 1950 },
      { date: '2026-09-15', price: 1450 },
      { date: '2026-10-08', price: 1190 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1190, oldPrice: 2990, url: 'https://temu.com', inStock: true, deliveryDays: 8, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-express', storeName: 'Temu Express Hub (Авиа)', price: 1290, oldPrice: 2990, url: 'https://temu.com', inStock: true, deliveryDays: 5, freeDelivery: true }
    ],
    specs: {
      'Тип печати': 'Термопечать (без чернил)',
      'Разрешение': '203 DPI',
      'Интерфейс': 'Bluetooth 4.0 / Type-C'
    },
    reviews: []
  },
  {
    id: 'p-temu-4',
    title: 'Ультразвуковой увлажнитель воздуха с подсветкой эффекта пламени Flame',
    category: 'Дом',
    subcategory: 'Климатическая техника',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80',
    description: 'Стильный аромадиффузор с реалистичным теплым эффектом каминного огня. Увлажняет воздух, снимает стресс и наполняет комнату приятным ароматом эфирных масел.',
    currentPrice: 1150,
    oldPrice: 3200,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 3890,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T11:15:00Z',
    history: [
      { date: '2026-07-10', price: 2900 },
      { date: '2026-08-01', price: 2600 },
      { date: '2026-08-20', price: 2100 },
      { date: '2026-09-15', price: 1650 },
      { date: '2026-10-08', price: 1150 }
    ],
    storeOffers: [
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 1150, oldPrice: 3200, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-outlet', storeName: 'Temu Clearance Outlet', price: 1090, oldPrice: 3200, url: 'https://temu.com', inStock: true, deliveryDays: 9, freeDelivery: true }
    ],
    specs: {
      'Емкость резервуара': '200 мл',
      'Подсветка': '7 цветов пламени LED',
      'Защита': 'Автоотключение при отсутствии воды'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-1',
    title: 'Набор силиконовых фиксаторов для проводов и кабелей (10 шт)',
    category: 'Аксессуары',
    subcategory: 'Органайзеры',
    brand: 'Temu Factory Direct',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    description: 'Универсальные клейкие клипсы-органайзеры для аккуратной фиксации USB-кабелей, наушников и сетевых проводов на столе или в автомобиле.',
    currentPrice: 29,
    oldPrice: 350,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 14200,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 320 },
      { date: '2026-08-01', price: 250 },
      { date: '2026-09-01', price: 99 },
      { date: '2026-10-08', price: 29 }
    ],
    storeOffers: [
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 29, oldPrice: 350, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-choice', storeName: 'Temu Choice (Главный склад)', price: 35, oldPrice: 350, url: 'https://temu.com', inStock: true, deliveryDays: 6, freeDelivery: true }
    ],
    specs: {
      'Количество в упаковке': '10 штук',
      'Крепление': 'Усиленный 3M скотч',
      'Материал': 'Эластичный эко-силикон'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-2',
    title: 'Магнитный кабель для быстрой зарядки 3-в-1 Type-C / Lightning / MicroUSB',
    category: 'Электроника',
    subcategory: 'Кабели',
    brand: 'Temu Factory Direct',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    description: 'Нейлоновый плетеный кабель с неодимовым магнитным разъемом и 3 сменными коннекторами. Поддерживает ток до 3A и подсветку индикатора питания.',
    currentPrice: 39,
    oldPrice: 690,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 28400,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 590 },
      { date: '2026-08-01', price: 390 },
      { date: '2026-09-15', price: 120 },
      { date: '2026-10-08', price: 39 }
    ],
    storeOffers: [
      { storeId: 'temu-factory', storeName: 'Temu Factory Direct (Фабрика)', price: 39, oldPrice: 690, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true, cashbackPercent: 5 },
      { storeId: 'temu-express', storeName: 'Temu Express Hub (Авиа)', price: 49, oldPrice: 690, url: 'https://temu.com', inStock: true, deliveryDays: 4, freeDelivery: true }
    ],
    specs: {
      'Длина кабеля': '1 метр',
      'Коннекторы': 'Type-C, Apple Lightning, Micro-USB',
      'Оплетка': 'Износостойкий армированный нейлон'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-3',
    title: 'Портативный гибкий USB мини-вентилятор для ноутбука и повербанка',
    category: 'Электроника',
    subcategory: 'Гаджеты',
    brand: 'Temu Factory Direct',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    description: 'Бесшумный съемный вентилятор с мягкими силиконовыми лопастями и гибкой металлической ножкой, сохраняющей любую форму.',
    currentPrice: 49,
    oldPrice: 450,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 9100,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 390 },
      { date: '2026-08-10', price: 250 },
      { date: '2026-09-20', price: 99 },
      { date: '2026-10-08', price: 49 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 49, oldPrice: 450, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Питание': 'USB 5V (ноутбук, ПК, PowerBank)',
      'Уровень шума': 'менее 20 дБ (бесшумный)',
      'Вес': '25 грамм'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-4',
    title: 'Набор кухонных овощечисток 3-в-1 из нержавеющей стали',
    category: 'Дом',
    subcategory: 'Кухня',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    description: 'Универсальный комплект пиллеров для легкой чистки картофеля, моркови, яблок и нарезки тонкой соломки по-корейски.',
    currentPrice: 69,
    oldPrice: 650,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 16800,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-15', price: 550 },
      { date: '2026-08-20', price: 350 },
      { date: '2026-09-20', price: 140 },
      { date: '2026-10-08', price: 69 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 69, oldPrice: 650, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Лезвие': 'Нержавеющая хирургическая сталь 420J2',
      'Количество': '3 насадки в комплекте',
      'Очистка': 'Можно мыть в посудомоечной машине'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-5',
    title: 'Водонепроницаемый сенсорный чехол для смартфона IPX8 со шнурком',
    category: 'Аксессуары',
    subcategory: 'Чехлы',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    description: 'Герметичный аквабокс для подводной съемки и защиты смартфона на пляже, в бассейне или в дождь. Сохраняет работу сенсорного экрана и FaceID.',
    currentPrice: 79,
    oldPrice: 590,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 22100,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 490 },
      { date: '2026-08-15', price: 290 },
      { date: '2026-09-20', price: 120 },
      { date: '2026-10-08', price: 79 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 79, oldPrice: 590, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Стандарт защиты': 'IPX8 (погружение до 30 метров)',
      'Совместимость': 'Смартфоны до 7.0 дюймов',
      'Замок': 'Двойной герметичный фиксатор Quick-Lock'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-6',
    title: 'Противоскользящий силиконовый автоковрик с держателем смартфона 360°',
    category: 'Авто',
    subcategory: 'Аксессуары',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    description: 'Многофункциональный коврик на приборную панель с поворотной подставкой под навигатор, слотом для ключей и сменной табличкой с номером телефона.',
    currentPrice: 89,
    oldPrice: 790,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 15400,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 650 },
      { date: '2026-08-15', price: 390 },
      { date: '2026-09-15', price: 150 },
      { date: '2026-10-08', price: 89 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 89, oldPrice: 790, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Материал': 'Высокотемпературный PVC силикон',
      'Крепление': 'Вакуумное прилипание без клея',
      'Особенности': 'Встроенная табличка номера для парковки'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-7',
    title: 'Карманный термо-мини-запайщик пакетов на батарейках',
    category: 'Дом',
    subcategory: 'Кухня',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Мгновенно запечатывает пакеты со снеками, крупами и заморозкой за 3 секунды, сохраняя свежесть продуктов. С обратной стороны встроен магнит для холодильника.',
    currentPrice: 99,
    oldPrice: 850,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.7,
    reviewsCount: 19300,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 690 },
      { date: '2026-08-20', price: 420 },
      { date: '2026-09-15', price: 180 },
      { date: '2026-10-08', price: 99 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 99, oldPrice: 850, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Нагрев': 'Керамический элемент (быстрый нагрев за 2 сек)',
      'Питание': '2x AA батарейки',
      'Дополнительно': 'Магнитное крепление на корпус'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-8',
    title: 'Электрический мини-венчик капучинатор для взбивания пышной пенки',
    category: 'Дом',
    subcategory: 'Кухня',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    description: 'Взбивает идеальную пенку для капучино, латте, матча или протеинового коктейля за 15 секунд благодаря мощному мотору 14 000 об/мин.',
    currentPrice: 119,
    oldPrice: 890,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 31200,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 750 },
      { date: '2026-08-15', price: 490 },
      { date: '2026-09-20', price: 210 },
      { date: '2026-10-08', price: 119 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 119, oldPrice: 890, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Скорость вращения': '14 000 об/мин',
      'Материал насадки': 'Пищевая нержавеющая сталь 304',
      'Питание': '2x AA батарейки'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-9',
    title: 'Цифровой Bluetooth термометр-гигрометр для дома с LCD экраном',
    category: 'Дом',
    subcategory: 'Климатическая техника',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=800&auto=format&fit=crop&q=80',
    description: 'Высокоточный датчик температуры и влажности швейцарского производства Sensirion с отображением комфортного смайлика и синхронизацией по Bluetooth.',
    currentPrice: 129,
    oldPrice: 990,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 24700,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 890 },
      { date: '2026-08-20', price: 550 },
      { date: '2026-09-15', price: 220 },
      { date: '2026-10-08', price: 129 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 129, oldPrice: 990, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Точность температуры': '±0.1°C',
      'Точность влажности': '±1% RH',
      'Дисплей': 'Четкий LCD 1.5"',
      'Батарея': 'CR2032 (до 1 года работы)'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-10',
    title: 'Светодиодная лента RGB 5 метров с пультом управления и USB питанием',
    category: 'Дом',
    subcategory: 'Освещение',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    description: 'Яркая RGB подсветка для телевизора, монитора, стола или комнаты. 16 миллионов цветов, динамические режимы светомузыки и удобный пульт.',
    currentPrice: 149,
    oldPrice: 1490,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 38400,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 1290 },
      { date: '2026-08-15', price: 890 },
      { date: '2026-09-10', price: 350 },
      { date: '2026-10-08', price: 149 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 149, oldPrice: 1490, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Длина': '5 метров (можно укорачивать по меткам)',
      'Светодиоды': 'SMD 5050 RGB',
      'Питание': 'USB 5V (от ТВ или адаптера)'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-11',
    title: 'Беспроводная мышь Silent 2.4G со встроенным аккумулятором и RGB подсветкой',
    category: 'Электроника',
    subcategory: 'Компьютеры',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    description: 'Ультратонкая эргономичная мышь с абсолютно бесшумными кликами, регулировкой DPI (800/1200/1600) и встроенным аккумулятором (зарядка от Type-C).',
    currentPrice: 189,
    oldPrice: 1200,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.8,
    reviewsCount: 27900,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 990 },
      { date: '2026-08-15', price: 650 },
      { date: '2026-09-15', price: 310 },
      { date: '2026-10-08', price: 189 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 189, oldPrice: 1200, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Клики': 'Silent Micro Switches (бесшумные)',
      'Аккумулятор': '500 мАч (до 30 дней работы)',
      'Подключение': 'USB ресивер 2.4 ГГц'
    },
    reviews: []
  },
  {
    id: 'p-temu-cheap-12',
    title: 'Прецизионный набор отверток 24-в-1 в магнитном пенале для электроники',
    category: 'Дом',
    subcategory: 'Инструменты',
    brand: 'Temu Choice',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80',
    description: 'Профессиональный комплект насадок из легированной стали S2 для разборки смартфонов iPhone, Android, ноутбуков, часов и игровых приставок.',
    currentPrice: 199,
    oldPrice: 1590,
    store: 'Temu',
    storeUrl: 'https://temu.com',
    rating: 4.9,
    reviewsCount: 35100,
    freeDelivery: true,
    isHot: true,
    updatedAt: '2026-10-08T12:00:00Z',
    history: [
      { date: '2026-07-10', price: 1390 },
      { date: '2026-08-15', price: 890 },
      { date: '2026-09-20', price: 380 },
      { date: '2026-10-08', price: 199 }
    ],
    storeOffers: [
      { storeId: 'temu', storeName: 'Temu', price: 199, oldPrice: 1590, url: 'https://temu.com', inStock: true, deliveryDays: 7, freeDelivery: true }
    ],
    specs: {
      'Материал бит': 'Закаленная инструментальная сталь S2 (60 HRC)',
      'Количество бит': '24 сменные прецизионные насадки',
      'Кейс': 'Алюминиевый пенал с магнитной фиксацией'
    },
    reviews: []
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', name: 'Все категории', icon: 'Grid', count: '14 250+' },
  { id: 'electronics', name: 'Электроника', icon: 'Cpu', count: '3 420+', maxDiscount: '-72%' },
  { id: 'phones', name: 'Телефоны', icon: 'Smartphone', count: '1 580+', maxDiscount: '-55%' },
  { id: 'laptops', name: 'Ноутбуки', icon: 'Laptop', count: '940+', maxDiscount: '-40%' },
  { id: 'computers', name: 'Компьютеры', icon: 'Monitor', count: '1 230+', maxDiscount: '-48%' },
  { id: 'gpus', name: 'Видеокарты', icon: 'Zap', count: '450+', maxDiscount: '-45%' },
  { id: 'games', name: 'Игры', icon: 'Gamepad2', count: '890+', maxDiscount: '-60%' },
  { id: 'home', name: 'Дом', icon: 'Home', count: '2 840+', maxDiscount: '-70%' },
  { id: 'clothes', name: 'Одежда', icon: 'Shirt', count: '3 100+', maxDiscount: '-65%' },
  { id: 'beauty', name: 'Красота', icon: 'Sparkles', count: '1 420+', maxDiscount: '-58%' },
  { id: 'auto', name: 'Авто', icon: 'Car', count: '980+', maxDiscount: '-42%' },
  { id: 'sport', name: 'Спорт', icon: 'Dumbbell', count: '1 150+', maxDiscount: '-50%' },
  { id: 'accessories', name: 'Аксессуары', icon: 'Headphones', count: '2 760+', maxDiscount: '-80%' }
];
