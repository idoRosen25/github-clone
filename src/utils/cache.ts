interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

export class CacheManager {
  private static CACHE_PREFIX = 'github_explorer_';
  private static DEFAULT_EXPIRY = 2 * 60 * 1000; // 2 minutes

  static set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRY): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn,
    };
    localStorage.setItem(this.CACHE_PREFIX + key, JSON.stringify(item));
  }

  static get<T>(key: string): T | null {
    const item = localStorage.getItem(this.CACHE_PREFIX + key);
    if (!item) return null;

    const cachedItem: CacheItem<T> = JSON.parse(item);
    const isExpired = Date.now() > cachedItem.timestamp + cachedItem.expiresIn;

    if (isExpired) {
      this.remove(key);
      return null;
    }

    return cachedItem.data;
  }

  static remove(key: string): void {
    localStorage.removeItem(this.CACHE_PREFIX + key);
  }

  static createCacheKey(...args: (string | number | null | undefined)[]): string {
    return args.filter(arg => arg !== null && arg !== undefined).join('_');
  }
} 