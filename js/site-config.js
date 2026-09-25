/**
 * ============================================================
 *  Restaurant settings — the ONE file to edit for a new client
 * ============================================================
 * Everything brand-specific on the page (name, logo, contact details,
 * currency, colors) is read from here by js/site.js. The menu itself
 * lives in js/menu-data.js.
 *
 * Also update by hand in index.html (crawlers don't run JS):
 *   <title>, meta description, og:* / twitter:* tags (use absolute URLs).
 */
window.SITE = {
  // Full name (hero, footer, copyright) and short name (navbar, logo letter)
  name: 'مطاعم 911',
  shortName: '911',

  // Hero headline + the line under the name
  slogan: 'طوارئ الجوع',
  tagline: 'شاورما عالفحم، دجاج تكا عالفحم، بروستد وسناكات',

  // English version of the page: the EN button in the navbar. Each text
  // above/below has an *En twin; menu items use their `en` fields.
  // Set english: false to hide the button.
  english: true,
  nameEn: '911 Restaurants',
  shortNameEn: '911',
  sloganEn: 'Hunger emergency',
  taglineEn: 'Charcoal shawarma, charcoal chicken tikka, broasted and snacks',

  // Logo image path (square, ideally transparent WebP/PNG), e.g.
  // 'assets/img/logo/logo.webp'. Leave empty to show a colored circle with
  // the first letter of shortName instead.
  logo: 'assets/img/logo/logo.webp',

  // Contact / footer
  address: 'إربد: شارع الثلاثين بجانب محامص الشعب · نعيمة مقابل البلدية · مقابل إربد مول القديم',
  hours: 'يومياً من 9 صباحاً حتى 12 منتصف الليل',
  addressEn: 'Irbid: Al-Thalatheen St. by Al-Shaab Roastery · Naimeh opposite the municipality · opposite old Irbid Mall',
  hoursEn: 'Daily, 9 AM to midnight',
  phones: [
    { display: '07 911 911 20', tel: '+962791191120' }
  ],

  // WhatsApp number that receives table orders: international format,
  // digits only, no "+" or leading zeros (e.g. Jordan 079xxxxxxx -> 96279xxxxxxx).
  whatsapp: '962791191120',

  // Social links: full URLs, or '' to hide the button
  instagram: '',
  facebook: 'https://www.facebook.com/restaurant911restaurant',

  // Menu from a Google Sheet (optional): the ID from the sheet's link
  // docs.google.com/spreadsheets/d/<ID>/edit. The sheet must be shared as
  // "Anyone with the link: Viewer" (see js/sheet.js). Empty = js/menu-data.js.
  sheetId: '',

  // Prices
  currency: 'د.أ',
  currencyNote: 'الأسعار بالدينار الأردني',
  currencyEn: 'JOD',
  currencyNoteEn: 'Prices in Jordanian dinars',

  // Brand colors (CSS custom properties on :root)
  theme: {
    '--accent': '#C4521B',      // 911 orange (darkened from the menu's #CD5B24 so white text passes AA)
    '--accent-dark': '#A2410F', // hover/pressed
    '--accent-soft': '#FBE5D6', // light tint (table badge, notes)
    '--bg': '#F3F2F0',          // light grey, like the printed menu paper
    '--bg-2': '#E8E6E3',
    '--ink': '#2F3232',         // charcoal of the "911" digits
    '--dark': '#2A2C2C'         // footer, cart bar, stepper
  }};
