export function constructImageUrl(
  profileUrl: string,
  options: {
    width?: number;
    quality?: number;
  } = {}
): string {
  let queryString = '?';

  // 先頭のフラグメント空文字列のためのデフォルト
  let isFirst = true;

  // オプションキーをマッピング
  const keyMap: { [key: string]: string } = {
    width: 'w',
    quality: 'q'
  };

  // 各プロパティをクエリパラメータとして追加
  for (const key in options) {
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      const value = options[key as keyof typeof options];
      if (value !== undefined) {
        // 最初の追加要素には＆を先頭に付けないための条件
        if (!isFirst) {
          queryString += '&';
        }
        // keyをマッピングされた値に変換
        const mappedKey = keyMap[key] || key;
        queryString += `${encodeURIComponent(mappedKey)}=${encodeURIComponent(value.toString())}`;
        isFirst = false;
      }
    }
  }

  // プロパティが存在しない場合はクエリ文字列の先頭 `?` を取り除く
  return isFirst ? profileUrl : `${profileUrl}${queryString}`;
}
