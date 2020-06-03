import persianJs from 'persianjs';

export function toPersianNumber(number) {
  return persianJs(number).englishNumber().toString();
}

export function toPersianNumberWithComma(amount) {
  if (!amount) return amount;
  const negativeSign = amount < 0 ? '-' : '';
  let i = negativeSign ? amount.toString().substr(1) : amount.toString();
  return toPersianNumber(negativeSign + i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));
}

export function toEnglishNumberWithoutComma(amount) {
  if (!amount) return amount;
  return persianJs(amount).toEnglishNumber().toString().replace(',', '');
}
