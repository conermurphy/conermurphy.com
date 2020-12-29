export default function getFutureDate(date, numberOfDays) {
  return new Date(date.setDate(date.getDate() + numberOfDays));
}
