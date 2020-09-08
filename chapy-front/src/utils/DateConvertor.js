const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])

export function toPersian(date) {
  return p2e(new Date(date).toLocaleDateString("fa-IR", options).replace('،‏', '-'));
}
