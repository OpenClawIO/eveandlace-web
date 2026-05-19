import type { StoreCategory, StoreProduct } from '@/lib/store-data';

export type Locale = 'en' | 'zh' | 'es' | 'fr';

type ProductText = Pick<StoreProduct, 'title'>;
type CategoryText = Pick<StoreCategory, 'name' | 'cta'>;

export const locales: Array<{ code: Locale; label: string; href: string }> = [
  { code: 'en', label: 'EN', href: '/' },
  { code: 'zh', label: '中文', href: '/zh' },
  { code: 'es', label: 'ES', href: '/es' },
  { code: 'fr', label: 'FR', href: '/fr' }
];

export const dictionaries = {
  en: {
    topStrip: ['Worldwide shipping', 'Discreet packaging · Easy returns', 'Secure checkout'],
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
    viewAll: 'View all',
    services: [
      ['Quality you can feel', 'Carefully selected fabrics and thoughtful details for daily confidence.'],
      ['Find your fit', 'Inclusive sizing notes and a clear fit guide before you order.'],
      ['Discreet by design', 'Plain packaging and private checkout details for peace of mind.'],
      ['Secure & private', 'Checkout routes through trusted marketplace infrastructure.']
    ],
    syncTitle: 'Store sync status',
    lastRefresh: 'Last refresh',
    source: 'Source',
    syncCopy: 'Product data is loaded through the storefront data layer, so the page can refresh as your marketplace catalog changes.',
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
    ageNote: '18+ Only. This site sells adult products. By entering, you confirm you are 18 years of age or older.'
  },
  zh: {
    topStrip: ['全球配送', '隐私包装 · 轻松退换', '安全结账'],
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
    viewAll: '查看全部',
    services: [
      ['触手可感的品质', '精选面料与细节设计，为日常自信加一点温柔。'],
      ['找到合适尺码', '提供包容性尺码信息和清晰的下单前参考。'],
      ['隐私友好设计', '普通包装与私密结账细节，让购买更安心。'],
      ['安全与隐私', '通过可信的平台基础设施完成结账流程。']
    ],
    syncTitle: '店铺同步状态',
    lastRefresh: '最近刷新',
    source: '来源',
    syncCopy: '商品数据通过独立站数据层加载，因此页面可以随着平台店铺目录变化而刷新。',
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
    ageNote: '仅限 18 岁以上。本网站销售成人用品。进入即表示你确认已年满 18 岁。'
  },
  es: {
    topStrip: ['Envíos internacionales', 'Empaque discreto · Devoluciones sencillas', 'Pago seguro'],
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
    viewAll: 'Ver todo',
    services: [
      ['Calidad que se siente', 'Telas cuidadosamente seleccionadas y detalles pensados para la confianza diaria.'],
      ['Encuentra tu ajuste', 'Notas de tallas inclusivas y una guía clara antes de comprar.'],
      ['Diseño discreto', 'Empaque sencillo y detalles de pago privado para mayor tranquilidad.'],
      ['Seguro y privado', 'El pago se procesa mediante infraestructura confiable del marketplace.']
    ],
    syncTitle: 'Estado de sincronización',
    lastRefresh: 'Última actualización',
    source: 'Fuente',
    syncCopy: 'Los datos de producto se cargan mediante la capa de datos del sitio para refrescar la página cuando cambie el catálogo.',
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
    ageNote: 'Solo para mayores de 18 años. Este sitio vende productos para adultos. Al entrar, confirmas que tienes 18 años o más.'
  },
  fr: {
    topStrip: ['Livraison internationale', 'Emballage discret · Retours simples', 'Paiement sécurisé'],
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
    viewAll: 'Tout voir',
    services: [
      ['Une qualité qui se ressent', 'Matières soigneusement choisies et détails pensés pour une confiance au quotidien.'],
      ['Trouvez votre taille', 'Notes de taille inclusives et guide clair avant de commander.'],
      ['Discret par design', 'Emballage simple et paiement privé pour plus de tranquillité.'],
      ['Sécurisé et privé', 'Paiement via une infrastructure marketplace fiable.']
    ],
    syncTitle: 'État de synchronisation',
    lastRefresh: 'Dernière mise à jour',
    source: 'Source',
    syncCopy: 'Les données produit sont chargées via la couche de données du site afin de suivre les changements du catalogue.',
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
    ageNote: 'Réservé aux 18 ans et plus. Ce site vend des produits pour adultes. En entrant, vous confirmez avoir 18 ans ou plus.'
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
