/**
 * 日付をフォーマットする関数
 * @param date 日付オブジェクトまたは日付文字列
 * @param format フォーマット（省略可）
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (date: Date | string, format = 'YYYY/MM/DD'): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    // 無効な日付の場合は空文字を返す
    if (isNaN(d.getTime())) {
      return '';
    }
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  };
  
  /**
   * 金額を日本円表記にフォーマットする関数
   * @param amount 金額
   * @param options フォーマットオプション
   * @returns フォーマットされた金額文字列
   */
  export const formatCurrency = (
    amount: number, 
    options: { 
      style?: 'standard' | 'short',
      showSign?: boolean 
    } = {}
  ): string => {
    const { style = 'standard', showSign = false } = options;
    
    // 符号
    const sign = amount >= 0 ? (showSign ? '+' : '') : '-';
    const absAmount = Math.abs(amount);
    
    // 単位表記（short形式用）
    let formattedAmount = '';
    if (style === 'short') {
      if (absAmount >= 100000000) {
        formattedAmount = (absAmount / 100000000).toFixed(1) + '億';
      } else if (absAmount >= 10000) {
        formattedAmount = (absAmount / 10000).toFixed(1) + '万';
      } else {
        formattedAmount = absAmount.toLocaleString();
      }
    } else {
      formattedAmount = absAmount.toLocaleString();
    }
    
    return `${sign}¥${formattedAmount}`;
  };
  
  /**
   * 文字列を安全に切り詰める関数
   * @param str 対象の文字列
   * @param maxLength 最大長
   * @param suffix 省略記号（デフォルト: ...）
   * @returns 切り詰められた文字列
   */
  export const truncateString = (
    str: string, 
    maxLength: number, 
    suffix = '...'
  ): string => {
    if (!str) return '';
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - suffix.length) + suffix;
  };
  
  /**
   * ランダムなIDを生成する関数
   * @returns ランダムなID文字列
   */
  export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };
  
  /**
   * 日時から相対時間を計算する関数（例: 1時間前、昨日など）
   * @param date 日付オブジェクトまたは日付文字列
   * @returns 相対時間表記
   */
  export const getRelativeTime = (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}分前`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}時間前`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}日前`;
    
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks}週間前`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}ヶ月前`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}年前`;
  };