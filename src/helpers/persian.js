import persianJs from 'persianjs';

export function toPersianNumber(number) {
  return persianJs(number.toString()).englishNumber().toString();
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

export function toPersianMobileNumber(number) {
  const mobileNumber = `0${number.substr(0, 3)} ` +
    `${number.substr(3, 3)} ${number.substr(6, 4)}`;
  return toPersianNumber(mobileNumber);
}
