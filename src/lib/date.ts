export function convertToJST(date: Date): string {
  const jstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const nowUTC = new Date();
  const now = new Date(nowUTC.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const diff = now.getTime() - jstDate.getTime();

  if (diff < 1000 * 60) {
    return '1分前';
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}分前`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}時間前`;
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}日前`;
  }
}
