import type { StoreCategory, StoreProduct } from '@/lib/store-data';

export type Locale = 'en' | 'zh' | 'es' | 'fr' | 'ar';

type ProductText = Pick<StoreProduct, 'title'>;
type CategoryText = Pick<StoreCategory, 'name' | 'cta'>;

export const locales: Array<{ code: Locale; label: string; href: string }> = [
  { code: 'en', label: 'EN', href: '/' },
  { code: 'zh', label: '中文', href: '/zh' },
  { code: 'es', label: 'ES', href: '/es' },
  { code: 'fr', label: 'FR', href: '/fr' },
  { code: 'ar', label: 'AR', href: '/ar' }
];

export const dictionaries = {
  en: {
    topStrip: ['18+ only', 'Curated storefront', 'Checkout on AliExpress'],
    nav: {
      newIn: 'New In',
      sets: 'Sets',
      bodysuits: 'Bodysuits',
      sizeGuide: 'Size Guide',
      storeSync: 'Store Sync'
    },
    headerAction: 'Visit store',
    heroTitle: 'Intimate pieces with a softer edge',
    heroCopy: 'Curated lingerie, lace sets, and private wardrobe essentials refreshed from our marketplace store.',
    shopNew: 'Shop new arrivals',
    viewStore: 'View AliExpress store',
    refreshedTitle: 'Refreshed from our store',
    refreshedSub: 'New and updated picks',
    productCount: 'Listed products',
    viewAll: 'View all',
    services: [
      ['Browse the current edit', 'Explore a small, curated view of the marketplace catalog.'],
      ['Check the listing', 'Confirm size, material, color, and availability on the product listing before ordering.'],
      ['Marketplace checkout', 'Orders and payment are completed on AliExpress, not on this website.'],
      ['Source transparency', 'Catalog status and the source store are shown so you can verify details.']
    ],
    syncTitle: 'Catalog status',
    lastRefresh: 'Last refresh',
    source: 'Source',
    syncCopy: 'Catalog data was loaded from the configured store source. Confirm final details on the marketplace listing.',
    fallbackNotice: 'Showing the last curated catalog snapshot. Confirm current price, availability, shipping, and returns on AliExpress.',
    viewSource: 'View source store',
    newsletterTitle: 'Stay in the know',
    newsletterCopy: 'New arrivals, exclusive offers, and fit notes sent quietly to your inbox.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    privacy: 'We respect your privacy.',
    footerTagline: 'Intimate pieces with a softer edge.',
    footerShop: 'Shop',
    footerHelp: 'Help',
    shipping: 'Shipping & Delivery',
    returns: 'Returns & Exchanges',
    contactTitle: 'Contact',
    contactEmail: 'iamhuman.api@gmail.com',
    contactTel: '+1 980 999 0101',
    contactLocation: 'Nanjing, China',
    beforeOrderTitle: 'Before you order',
    beforeOrderCopy: 'Product details, payment, shipping, and returns are handled by AliExpress. Review the current listing before ordering.',
    ageNote: '18+ Only. This site sells adult products. By entering, you confirm you are 18 years of age or older.'
  },
  zh: {
    topStrip: ['仅限 18 岁以上', '精选展示', '在 AliExpress 结账'],
    nav: {
      newIn: '新品',
      sets: '套装',
      bodysuits: '连体衣',
      sizeGuide: '尺码指南',
      storeSync: '店铺同步'
    },
    headerAction: '访问店铺',
    heroTitle: '柔和质感的私密衣橱',
    heroCopy: '精选情趣内衣、蕾丝套装与私密衣橱单品，并从我们的平台店铺持续刷新。',
    shopNew: '选购新品',
    viewStore: '查看 AliExpress 店铺',
    refreshedTitle: '来自店铺的更新',
    refreshedSub: '新品与更新精选',
    productCount: '上架商品数量',
    viewAll: '查看全部',
    services: [
      ['浏览当前精选', '查看来自平台店铺的小型精选商品目录。'],
      ['核对商品页面', '下单前请在商品页面确认尺码、材质、颜色和库存。'],
      ['平台结账', '订单与付款在 AliExpress 完成，本网站不处理支付。'],
      ['来源透明', '页面展示目录状态与来源店铺，便于核实信息。']
    ],
    syncTitle: '商品目录状态',
    lastRefresh: '最近刷新',
    source: '来源',
    syncCopy: '商品目录来自已配置的店铺数据源，最终信息请以平台商品页面为准。',
    fallbackNotice: '当前展示最近一次人工整理的目录快照。价格、库存、配送和退换政策请在 AliExpress 核实。',
    viewSource: '查看来源店铺',
    newsletterTitle: '订阅新品动态',
    newsletterCopy: '新品、专属优惠和尺码建议，将安静地发送到你的邮箱。',
    emailPlaceholder: '你的邮箱地址',
    subscribe: '订阅',
    privacy: '我们尊重你的隐私。',
    footerTagline: '柔和质感的私密衣橱。',
    footerShop: '选购',
    footerHelp: '帮助',
    shipping: '配送与交付',
    returns: '退换货',
    contactTitle: '联系信息',
    contactEmail: 'iamhuman.api@gmail.com',
    contactTel: '+1 980 999 0101',
    contactLocation: '中国南京',
    beforeOrderTitle: '下单前请确认',
    beforeOrderCopy: '商品详情、付款、配送和退换均由 AliExpress 处理。下单前请查看最新商品页面。',
    ageNote: '仅限 18 岁以上。本网站销售成人用品。进入即表示你确认已年满 18 岁。'
  },
  es: {
    topStrip: ['Solo mayores de 18', 'Selección curada', 'Pago en AliExpress'],
    nav: {
      newIn: 'Novedades',
      sets: 'Conjuntos',
      bodysuits: 'Bodysuits',
      sizeGuide: 'Guía de tallas',
      storeSync: 'Sincronización'
    },
    headerAction: 'Visitar tienda',
    heroTitle: 'Prendas íntimas con un toque más suave',
    heroCopy: 'Lencería curada, conjuntos de encaje y básicos íntimos actualizados desde nuestra tienda marketplace.',
    shopNew: 'Comprar novedades',
    viewStore: 'Ver tienda en AliExpress',
    refreshedTitle: 'Actualizado desde la tienda',
    refreshedSub: 'Selecciones nuevas y recientes',
    productCount: 'Productos publicados',
    viewAll: 'Ver todo',
    services: [
      ['Explora la selección actual', 'Consulta una selección breve del catálogo del marketplace.'],
      ['Revisa el anuncio', 'Confirma talla, material, color y disponibilidad antes de comprar.'],
      ['Pago en el marketplace', 'Los pedidos y pagos se completan en AliExpress, no en este sitio.'],
      ['Fuente transparente', 'Mostramos el estado del catálogo y la tienda de origen para verificar detalles.']
    ],
    syncTitle: 'Estado del catálogo',
    lastRefresh: 'Última actualización',
    source: 'Fuente',
    syncCopy: 'El catálogo procede de la fuente configurada. Confirma los detalles finales en el anuncio del marketplace.',
    fallbackNotice: 'Se muestra la última selección guardada. Confirma precio, disponibilidad, envío y devoluciones en AliExpress.',
    viewSource: 'Ver tienda fuente',
    newsletterTitle: 'Mantente al día',
    newsletterCopy: 'Novedades, ofertas exclusivas y notas de ajuste enviadas discretamente a tu correo.',
    emailPlaceholder: 'Tu correo electrónico',
    subscribe: 'Suscribirse',
    privacy: 'Respetamos tu privacidad.',
    footerTagline: 'Prendas íntimas con un toque más suave.',
    footerShop: 'Comprar',
    footerHelp: 'Ayuda',
    shipping: 'Envíos y entrega',
    returns: 'Devoluciones y cambios',
    contactTitle: 'Contacto',
    contactEmail: 'iamhuman.api@gmail.com',
    contactTel: '+1 980 999 0101',
    contactLocation: 'Nankín, China',
    beforeOrderTitle: 'Antes de comprar',
    beforeOrderCopy: 'AliExpress gestiona los detalles, el pago, el envío y las devoluciones. Revisa el anuncio actual antes de comprar.',
    ageNote: 'Solo para mayores de 18 años. Este sitio vende productos para adultos. Al entrar, confirmas que tienes 18 años o más.'
  },
  fr: {
    topStrip: ['18 ans et plus', 'Sélection éditée', 'Paiement sur AliExpress'],
    nav: {
      newIn: 'Nouveautés',
      sets: 'Ensembles',
      bodysuits: 'Bodys',
      sizeGuide: 'Guide des tailles',
      storeSync: 'Synchronisation'
    },
    headerAction: 'Visiter la boutique',
    heroTitle: 'Des pièces intimes au toucher plus doux',
    heroCopy: 'Lingerie sélectionnée, ensembles en dentelle et essentiels intimes actualisés depuis notre boutique marketplace.',
    shopNew: 'Voir les nouveautés',
    viewStore: 'Voir la boutique AliExpress',
    refreshedTitle: 'Actualisé depuis la boutique',
    refreshedSub: 'Nouveautés et sélections récentes',
    productCount: 'Produits en ligne',
    viewAll: 'Tout voir',
    services: [
      ['Parcourir la sélection', 'Découvrez une sélection concise du catalogue marketplace.'],
      ['Vérifier la fiche', 'Confirmez taille, matière, couleur et disponibilité avant de commander.'],
      ['Paiement marketplace', 'Les commandes et paiements sont effectués sur AliExpress, pas sur ce site.'],
      ['Source transparente', 'L’état du catalogue et la boutique source sont indiqués pour vérification.']
    ],
    syncTitle: 'État du catalogue',
    lastRefresh: 'Dernière mise à jour',
    source: 'Source',
    syncCopy: 'Le catalogue provient de la source configurée. Vérifiez les détails finaux sur la fiche marketplace.',
    fallbackNotice: 'La dernière sélection enregistrée est affichée. Vérifiez prix, disponibilité, livraison et retours sur AliExpress.',
    viewSource: 'Voir la boutique source',
    newsletterTitle: 'Restez informé',
    newsletterCopy: 'Nouveautés, offres exclusives et conseils de taille envoyés discrètement dans votre boîte mail.',
    emailPlaceholder: 'Votre adresse e-mail',
    subscribe: 'S’abonner',
    privacy: 'Nous respectons votre vie privée.',
    footerTagline: 'Des pièces intimes au toucher plus doux.',
    footerShop: 'Boutique',
    footerHelp: 'Aide',
    shipping: 'Livraison',
    returns: 'Retours et échanges',
    contactTitle: 'Contact',
    contactEmail: 'iamhuman.api@gmail.com',
    contactTel: '+1 980 999 0101',
    contactLocation: 'Nankin, Chine',
    beforeOrderTitle: 'Avant de commander',
    beforeOrderCopy: 'AliExpress gère les détails, le paiement, la livraison et les retours. Consultez la fiche actuelle avant de commander.',
    ageNote: 'Réservé aux 18 ans et plus. Ce site vend des produits pour adultes. En entrant, vous confirmez avoir 18 ans ou plus.'
  },
  ar: {
    topStrip: ['لمن هم 18 عاما فأكثر', 'اختيارات منسقة', 'الدفع عبر AliExpress'],
    nav: {
      newIn: 'وصل حديثا',
      sets: 'الأطقم',
      bodysuits: 'بودي سوت',
      sizeGuide: 'دليل المقاسات',
      storeSync: 'مزامنة المتجر'
    },
    headerAction: 'زيارة المتجر',
    heroTitle: 'قطع حميمة بلمسة أكثر نعومة',
    heroCopy: 'لانجري مختار، أطقم دانتيل، وأساسيات خزانة خاصة يتم تحديثها من متجرنا على المنصة.',
    shopNew: 'تسوقي الجديد',
    viewStore: 'عرض متجر AliExpress',
    refreshedTitle: 'محدث من متجرنا',
    refreshedSub: 'اختيارات جديدة ومحدثة',
    productCount: 'عدد المنتجات المعروضة',
    viewAll: 'عرض الكل',
    services: [
      ['تصفحي الاختيارات الحالية', 'شاهدي مجموعة مختارة ومختصرة من كتالوج المنصة.'],
      ['راجعي صفحة المنتج', 'تأكدي من المقاس والخامة واللون والتوفر قبل الطلب.'],
      ['الدفع عبر المنصة', 'يتم الطلب والدفع على AliExpress وليس على هذا الموقع.'],
      ['مصدر واضح', 'نعرض حالة الكتالوج والمتجر المصدر لتتمكني من التحقق من التفاصيل.']
    ],
    syncTitle: 'حالة الكتالوج',
    lastRefresh: 'آخر تحديث',
    source: 'المصدر',
    syncCopy: 'تم تحميل الكتالوج من المصدر المهيأ. تحققي من التفاصيل النهائية في صفحة المنتج على المنصة.',
    fallbackNotice: 'نعرض آخر نسخة محفوظة من الكتالوج. تحققي من السعر والتوفر والشحن والإرجاع على AliExpress.',
    viewSource: 'عرض المتجر المصدر',
    newsletterTitle: 'ابقي على اطلاع',
    newsletterCopy: 'الجديد، العروض الحصرية، وملاحظات المقاس تصل بهدوء إلى بريدك.',
    emailPlaceholder: 'عنوان بريدك الإلكتروني',
    subscribe: 'اشتراك',
    privacy: 'نحترم خصوصيتك.',
    footerTagline: 'قطع حميمة بلمسة أكثر نعومة.',
    footerShop: 'تسوق',
    footerHelp: 'مساعدة',
    shipping: 'الشحن والتوصيل',
    returns: 'الإرجاع والاستبدال',
    contactTitle: 'معلومات التواصل',
    contactEmail: 'iamhuman.api@gmail.com',
    contactTel: '+1 980 999 0101',
    contactLocation: 'نانجينغ، الصين',
    beforeOrderTitle: 'قبل الطلب',
    beforeOrderCopy: 'يتولى AliExpress تفاصيل المنتج والدفع والشحن والإرجاع. راجعي صفحة المنتج الحالية قبل الطلب.',
    ageNote: 'لمن هم 18 عاما فأكثر فقط. يبيع هذا الموقع منتجات للبالغين. بدخولك تؤكد أن عمرك 18 عاما أو أكثر.'
  }
} satisfies Record<Locale, Record<string, unknown>>;

export const productText: Record<Locale, Record<string, ProductText>> = {
  en: {},
  zh: {
    'lace-underwire-set': { title: '蕾丝钢圈套装' },
    'floral-embroidery-set': { title: '花朵刺绣套装' },
    'lace-bodysuit': { title: '蕾丝连体衣' },
    'satin-lace-robe': { title: '缎面蕾丝睡袍' },
    'strappy-teddy': { title: '绑带 Teddy 连体衣' },
    'sheer-lace-set': { title: '透纱蕾丝套装' },
    'lingerie-accessory-set': { title: '内衣配饰套装' }
  },
  es: {
    'lace-underwire-set': { title: 'Conjunto de encaje con aro' },
    'floral-embroidery-set': { title: 'Conjunto bordado floral' },
    'lace-bodysuit': { title: 'Bodysuit de encaje' },
    'satin-lace-robe': { title: 'Bata de satén y encaje' },
    'strappy-teddy': { title: 'Teddy con tiras' },
    'sheer-lace-set': { title: 'Conjunto de encaje translúcido' },
    'lingerie-accessory-set': { title: 'Set de accesorios de lencería' }
  },
  fr: {
    'lace-underwire-set': { title: 'Ensemble dentelle à armatures' },
    'floral-embroidery-set': { title: 'Ensemble broderie florale' },
    'lace-bodysuit': { title: 'Body en dentelle' },
    'satin-lace-robe': { title: 'Peignoir satin et dentelle' },
    'strappy-teddy': { title: 'Teddy à brides' },
    'sheer-lace-set': { title: 'Ensemble dentelle transparente' },
    'lingerie-accessory-set': { title: 'Set d’accessoires lingerie' }
  },
  ar: {
    'lace-underwire-set': { title: 'طقم دانتيل بدعامة' },
    'floral-embroidery-set': { title: 'طقم بتطريز زهري' },
    'lace-bodysuit': { title: 'بودي سوت دانتيل' },
    'satin-lace-robe': { title: 'روب ساتان ودانتيل' },
    'strappy-teddy': { title: 'تيدي بأشرطة' },
    'sheer-lace-set': { title: 'طقم دانتيل شفاف' },
    'lingerie-accessory-set': { title: 'طقم إكسسوارات لانجري' }
  }
};

export const categoryText: Record<Locale, Record<StoreCategory['id'], CategoryText>> = {
  en: {
    sets: { name: 'Lingerie Sets', cta: 'Shop Sets' },
    bodysuits: { name: 'Bodysuits', cta: 'Shop Bodysuits' },
    robes: { name: 'Robes & Sleep', cta: 'Shop Robes' },
    accessories: { name: 'Accessories', cta: 'Shop Accessories' }
  },
  zh: {
    sets: { name: '内衣套装', cta: '选购套装' },
    bodysuits: { name: '连体衣', cta: '选购连体衣' },
    robes: { name: '睡袍与居家', cta: '选购睡袍' },
    accessories: { name: '配饰', cta: '选购配饰' }
  },
  es: {
    sets: { name: 'Conjuntos de lencería', cta: 'Comprar conjuntos' },
    bodysuits: { name: 'Bodysuits', cta: 'Comprar bodysuits' },
    robes: { name: 'Batas y descanso', cta: 'Comprar batas' },
    accessories: { name: 'Accesorios', cta: 'Comprar accesorios' }
  },
  fr: {
    sets: { name: 'Ensembles lingerie', cta: 'Voir les ensembles' },
    bodysuits: { name: 'Bodys', cta: 'Voir les bodys' },
    robes: { name: 'Peignoirs & nuit', cta: 'Voir les peignoirs' },
    accessories: { name: 'Accessoires', cta: 'Voir les accessoires' }
  },
  ar: {
    sets: { name: 'أطقم لانجري', cta: 'تسوقي الأطقم' },
    bodysuits: { name: 'بودي سوت', cta: 'تسوقي البودي سوت' },
    robes: { name: 'روب وملابس نوم', cta: 'تسوقي الروب' },
    accessories: { name: 'إكسسوارات', cta: 'تسوقي الإكسسوارات' }
  }
};

export function localizeProduct(product: StoreProduct, locale: Locale): StoreProduct {
  return {
    ...product,
    title: productText[locale][product.id]?.title ?? product.title
  };
}

export function localizeCategory(category: StoreCategory, locale: Locale): StoreCategory {
  return {
    ...category,
    ...(categoryText[locale][category.id] ?? {})
  };
}
