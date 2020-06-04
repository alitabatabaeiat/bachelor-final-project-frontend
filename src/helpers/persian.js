import persianJs from 'persianjs';

export function toPersianNumber(number) {
  if (!number && number !== 0) return number;
  return persianJs(number.toString()).englishNumber().toString();
}

export function toPersianNumberWithComma(amount) {
  if (!amount && amount !== 0) return amount;
  const negativeSign = amount < 0 ? '-' : '';
  console.log(amount);
  let i = negativeSign ? amount.toString().substr(1) : amount.toString();
  console.log(i);
  console.log(i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));
  return toPersianNumber(negativeSign + i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));
}

export function toEnglishNumberWithoutComma(amount) {
  if (!amount) return amount;
  console.log('ssss', amount);
  console.log('ssss', persianJs(amount).toEnglishNumber().toString().replace(',', ''));
  return persianJs(amount).toEnglishNumber().toString().split(',').join('');
}

export function toPersianMobileNumber(number) {
  const mobileNumber = `0${number.substr(0, 3)} ` +
    `${number.substr(3, 3)} ${number.substr(6, 4)}`;
  return toPersianNumber(mobileNumber);
}
