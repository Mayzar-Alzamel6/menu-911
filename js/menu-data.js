/**
 * Menu data — 911 Restaurants, typed from their printed menu (Facebook page,
 * Sept 2026; source photos in _private/fb-menu/). Prices in JD.
 * (Or connect a Google Sheet, see js/site-config.js.)
 *
 * Category:
 *   id          unique, latin letters (used in links: #cat-<id>)
 *   title, en   name on the banner and the category chip (Arabic, English)
 *   img         optional banner photo; without it `icon` (a name from js/icons.js) is shown
 *   cols, colsEn  optional sizes; then an item's price is a list, one per size
 *               (null = size not available)
 *   colsTitle, colsTitleEn  optional heading for that choice (default: choose a size)
 *   addons      optional extras for every item: [name, English, price]
 *   choices     optional pick-one options (no price), first option is the default:
 *               { title, en, options: [[Arabic, English], ...] }
 *   sizePrefix / orderPrefix  only change how a line reads in the WhatsApp
 *               order, e.g. "ساندويش فلافل (خبز صاج)"
 *   note, noteEn  optional small note under the category
 *
 * Item: either the short form ['name', '2.50'] / ['name', ['2.50', '3.00']]
 * or an object:
 *   name, en, desc, descEn
 *   price       '2.50', or a list per size
 *   photo       file name in assets/img/items (without .webp), or a full URL.
 *               Needs <name>.webp (960px) and <name>-sm.webp (320px); until the
 *               files exist a tinted placeholder with the category icon is shown.
 *   tags        any of 'popular', 'new', 'spicy', 'veg'
 *   featured    shown in the "most loved" row
 *   suggest     offered in the cart ("add something?")
 *   soldOut     shown greyed out, can't be ordered
 *   addons / choices   override the category's (false = none)
 */
(() => {
  window.MENU = [
    {
      id: 'shawarma', title: 'شاورما', en: 'Shawarma', img: 'assets/img/menu/shawarma.webp', icon: 'sandwich',
      cols: ['ساندويش', 'وجبة'], colsEn: ['Sandwich', 'Meal'],
      colsTitle: 'ساندويش أو وجبة', colsTitleEn: 'Sandwich or meal',
      items: [
        { name: 'شاورما عادي', en: 'Regular shawarma', price: ['0.75', '2.00'] },
        { name: 'شاورما عادي مع تشيز', en: 'Regular shawarma with cheese', price: ['1.00', '2.30'] },
        { name: 'شاورما سوبر', en: 'Super shawarma', price: ['1.25', '2.65'], tags: ['popular'], featured: true },
        { name: 'شاورما سوبر مع تشيز', en: 'Super shawarma with cheese', price: ['1.55', '2.95'] },
        { name: 'شاورما دبل', en: 'Double shawarma', price: [null, '3.50'] },
        { name: 'شاورما إيطالي', en: 'Italian shawarma', price: [null, '3.35'] },
        { name: 'شاورما حلبي', en: 'Aleppo shawarma', price: [null, '3.50'] }
      ],
      note: 'الدبل والإيطالي والحلبي وجبات فقط', noteEn: 'Double, Italian and Aleppo come as meals only'
    },
    {
      id: 'family', title: 'شاورما عائلية', en: 'Family shawarma', img: 'assets/img/menu/family.webp', icon: 'dish',
      items: [
        { name: 'سدر شاورما 3 أشخاص', en: 'Shawarma platter, 3 people', price: '5.75' },
        { name: 'سدر شاورما 4 أشخاص', en: 'Shawarma platter, 4 people', price: '7.50' },
        { name: 'سدر شاورما 5 أشخاص', en: 'Shawarma platter, 5 people', price: '9.50', tags: ['popular'], featured: true },
        { name: 'سدر شاورما 6 أشخاص', en: 'Shawarma platter, 6 people', price: '11.00' },
        { name: 'سدر شاورما 7 أشخاص', en: 'Shawarma platter, 7 people', price: '12.50' },
        { name: 'سدر شاورما 8 أشخاص', en: 'Shawarma platter, 8 people', price: '14.50' },
        { name: 'سدر شاورما 9 أشخاص', en: 'Shawarma platter, 9 people', price: '16.00' },
        { name: 'سدر شاورما 10 أشخاص', en: 'Shawarma platter, 10 people', price: '18.00' },
        { name: 'سدر إيطالي 3 أشخاص', en: 'Italian platter, 3 people', price: '9.25' },
        { name: 'سدر إيطالي 4 أشخاص', en: 'Italian platter, 4 people', price: '12.00' },
        { name: 'سدر إيطالي 5 أشخاص', en: 'Italian platter, 5 people', price: '15.00' },
        { name: 'سدر حلبي 3 أشخاص', en: 'Aleppo platter, 3 people', price: '8.50' },
        { name: 'سدر حلبي 6 أشخاص', en: 'Aleppo platter, 6 people', price: '16.00' }
      ]
    },
    {
      id: 'broasted', title: 'بروستد', en: 'Broasted chicken', img: 'assets/img/menu/broasted.webp', icon: 'drumstick',
      cols: ['4 قطع', '8 قطع', '12 قطعة', '16 قطعة', '20 قطعة', '24 قطعة'],
      colsEn: ['4 pcs', '8 pcs', '12 pcs', '16 pcs', '20 pcs', '24 pcs'],
      colsTitle: 'عدد القطع', colsTitleEn: 'Number of pieces',
      items: [
        { name: 'بروستد', en: 'Broasted chicken', price: ['3.50', '6.75', '10.00', '13.00', '16.00', '19.00'], tags: ['popular'], featured: true }
      ]
    },
    {
      id: 'strips', title: 'الستربس', en: 'Chicken strips', icon: 'drumstick',
      cols: ['5 قطع', '10 قطع', '20 قطعة'], colsEn: ['5 pcs', '10 pcs', '20 pcs'],
      colsTitle: 'عدد القطع', colsTitleEn: 'Number of pieces',
      items: [
        { name: 'ستربس', en: 'Chicken strips', price: ['3.50', '7.00', '12.00'] }
      ]
    },
    {
      id: 'snacks', title: 'السناكات', en: 'Snacks', icon: 'sandwich',
      items: [
        { name: 'ساندويش زنجر', en: 'Zinger sandwich', price: '2.00' },
        { name: 'وجبة زنجر', en: 'Zinger meal', price: '2.75', featured: true },
        { name: 'وجبة زنجر دبل', en: 'Double zinger meal', price: '4.75' },
        { name: 'ساندويش فاهيتا', en: 'Fajita sandwich', price: '2.00' },
        { name: 'وجبة فاهيتا', en: 'Fajita meal', price: '2.75' },
        { name: 'سدر زنجر 3 أشخاص', en: 'Zinger platter, 3 people', price: '8.00' },
        { name: 'سدر زنجر 4 أشخاص', en: 'Zinger platter, 4 people', price: '10.50' },
        { name: 'سدر زنجر 5 أشخاص', en: 'Zinger platter, 5 people', price: '13.00' }
      ]
    },
    {
      id: 'grills', title: 'المشاوي', en: 'Grills', img: 'assets/img/menu/grills.webp', icon: 'dish',
      items: [
        { name: 'سيخ شيش', en: 'Shish skewer', price: '1.25' },
        { name: 'ساندويش شيش', en: 'Shish sandwich', price: '1.50' },
        { name: 'وجبة شيش', en: 'Shish meal', price: '3.50' },
        { name: 'سدر شيش 3 أشخاص', en: 'Shish platter, 3 people', price: '6.00' },
        { name: 'سدر شيش 5 أشخاص', en: 'Shish platter, 5 people', price: '11.00' },
        { name: 'سيخ أجنحة', en: 'Wings skewer', price: '1.25' },
        { name: 'وجبة أجنحة', en: 'Wings meal', price: '3.50' },
        { name: 'سدر أجنحة 3 أشخاص', en: 'Wings platter, 3 people', price: '6.50' },
        { name: 'سدر أجنحة جامبو', en: 'Jumbo wings platter', price: '12.00' }
      ]
    },
    {
      id: 'charcoal', title: 'الدجاج على الفحم', en: 'Charcoal chicken', img: 'assets/img/menu/charcoal.webp', icon: 'drumstick',
      cols: ['مع بطاطا', 'مع أرز'], colsEn: ['With fries', 'With rice'],
      colsTitle: 'مع بطاطا أو أرز', colsTitleEn: 'With fries or rice',
      items: [
        { name: 'نصف دجاجة', en: 'Half chicken', price: ['3.50', '3.50'] },
        { name: 'دجاجة', en: 'Whole chicken', price: ['6.75', '6.75'], tags: ['popular'], featured: true },
        { name: 'دجاجة ونصف', en: 'Chicken and a half', price: ['10.00', '10.50'] },
        { name: 'دجاجتين', en: 'Two chickens', price: ['13.00', '13.00'] }
      ]
    },
    {
      id: 'sides', title: 'البطاطا والإضافات', en: 'Fries & add-ons', img: 'assets/img/menu/sides.webp', icon: 'salad',
      items: [
        { name: 'ساندويش بطاطا', en: 'Fries sandwich', price: '0.75' },
        { name: 'ساندويش بطاطا مع جبنة', en: 'Fries sandwich with cheese', price: '1.00' },
        { name: 'علبة بطاطا كبيرة', en: 'Large fries', price: '1.35' },
        { name: 'علبة بطاطا صغيرة', en: 'Small fries', price: '0.75', suggest: true },
        { name: 'صحن أرز كبير', en: 'Large rice plate', price: '1.50' },
        { name: 'علبة أرز صغيرة', en: 'Small rice box', price: '0.75' },
        { name: 'سلطة كولسلو', en: 'Coleslaw', price: '0.75', suggest: true },
        { name: 'علبة مخلل', en: 'Pickles', price: '0.75' },
        { name: 'علبة مايونيز', en: 'Mayonnaise', price: '0.75', suggest: true },
        { name: 'علبة مايونيز حار', en: 'Spicy mayonnaise', price: '0.75', tags: ['spicy'] },
        { name: 'علبة مايونيز مكس', en: 'Mixed mayonnaise', price: '0.75' },
        { name: 'صحن سرفيس', en: 'Service plate', price: '1.25' },
        { name: 'إضافة تشيز', en: 'Add cheese', price: '0.30' }
      ]
    },
    {
      id: 'drinks', title: 'المشروبات', en: 'Drinks', icon: 'cup',
      items: [
        { name: 'مشروب غازي 250 مل', en: 'Soft drink 250 ml', price: '0.30', suggest: true },
        { name: 'شنينة', en: 'Shanina (laban)', price: '0.45', suggest: true },
        { name: 'عصير طبيعي', en: 'Natural juice', price: '0.45' },
        { name: 'مياه معدنية', en: 'Mineral water', price: '0.25' }
      ]
    }
  ];
})();
