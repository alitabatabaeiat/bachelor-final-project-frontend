import persianJs from 'persianjs';

export function toPersianNumber(number) {
  if (!number && number !== 0) return number;
  return persianJs(number.toString()).englishNumber().toString();
}

export function toPersianNumberWithComma(amount) {
  if (!amount && amount !== 0) return amount;
  const negativeSign = amount < 0 ? '-' : '';
  let i = negativeSign ? amount.toString().substr(1) : amount.toString();
  return toPersianNumber(negativeSign + i.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','));
}

export function toEnglishNumberWithoutComma(amount) {
  console.log(amount)
  if (!amount) return amount;
  return persianJs(amount).toEnglishNumber().toString().split(',').join('');
}

export function toPersianMobileNumber(number) {
  const mobileNumber = `0${number.substr(0, 3)} ` +
    `${number.substr(3, 3)} ${number.substr(6, 4)}`;
  return toPersianNumber(mobileNumber);
}

export function toPersianJalaliMonth(month) {
  const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  return months[month];
}
