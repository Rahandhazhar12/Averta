const translations = {
  en: {
    pageTitle: 'Averta — Resale Finds',
    navShop: 'Shop',
    navContact: 'Contact',
    languageLabel: 'Choose language',
    eyebrow: 'Welcome to Averta',
    heroTitle: 'Good finds,<br /><em>found again.</em>',
    heroDescription: 'A curated mix of finds, ready for their next owner.',
    explore: 'Explore finds',
    collection: 'Available now',
    productTitle: 'Current finds',
    productCategory: 'SSD',
    product1Name: '1 TB SSD',
    product2Name: '2 TB SSD',
    buyNow: 'Buy',
    contactLabel: 'Instagram'
  },
  ckb: {
    pageTitle: 'ئاڤێرتا — فرۆشتنی کاڵای جۆراوجۆر',
    navShop: 'بەرهەمەکان',
    navContact: 'پەیوەندی',
    languageLabel: 'زمان هەڵبژێرە',
    eyebrow: 'بەخێربێیت بۆ ئاڤێرتا',
    heroTitle: 'دۆزینەوەی جوان،<br /><em>بۆ جارێکی تر.</em>',
    heroDescription: 'کۆمەڵێک کاڵای هەڵبژێردراو، ئامادە بۆ خاوەندارێکی نوێ.',
    explore: 'بینینی دۆزینەوەکان',
    collection: 'کۆمەڵەی ئێستا',
    productTitle: 'کاڵاکانی بەردەست',
    productCategory: 'SSD',
    product1Name: '١ TB SSD',
    product2Name: '٢ TB SSD',
    buyNow: 'کڕین',
    contactLabel: 'ئینستاگرام'
  },
  ar: {
    pageTitle: 'أفيرتا — متجر إعادة البيع',
    navShop: 'المنتجات',
    navContact: 'تواصل',
    languageLabel: 'اختر اللغة',
    eyebrow: 'أهلاً بك في أفيرتا',
    heroTitle: 'اكتشافات مميزة،<br /><em>تبدأ من جديد.</em>',
    heroDescription: 'تشكيلة مختارة من الأشياء، جاهزة لمالكها القادم.',
    explore: 'اكتشف المنتجات',
    collection: 'المجموعة الحالية',
    productTitle: 'المعروض حالياً',
    productCategory: 'SSD',
    product1Name: 'SSD 1 TB',
    product2Name: 'SSD 2 TB',
    buyNow: 'شراء',
    contactLabel: 'إنستغرام'
  }
};

const languagePicker = document.querySelector('#language');

function setLanguage(language) {
  const dictionary = translations[language] || translations.en;
  const isRtl = language === 'ckb' || language === 'ar';

  document.documentElement.lang = language;
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.title = dictionary.pageTitle;

  if (languagePicker) {
    languagePicker.value = language;
    languagePicker.setAttribute('aria-label', dictionary.languageLabel);
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const translation = dictionary[element.dataset.i18n];
    if (translation) {
      element.innerHTML = translation;
    }
  });

  document.querySelectorAll('.buy-button').forEach((element) => {
    const productName = element.closest('.product-card').querySelector('h3')?.textContent || 'SSD';
    element.setAttribute('aria-label', `${dictionary.buyNow}: ${productName}`);
  });

  try {
    localStorage.setItem('averta-language', language);
  } catch {
    // Storage is unavailable; the page still works without it.
  }
}

languagePicker?.addEventListener('change', (event) => setLanguage(event.target.value));

try {
  const savedLanguage = localStorage.getItem('averta-language');
  if (savedLanguage && translations[savedLanguage]) {
    setLanguage(savedLanguage);
  } else {
    setLanguage('en');
  }
} catch {
  setLanguage('en');
}
