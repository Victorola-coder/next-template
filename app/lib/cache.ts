interface CacheData<T> {
  data: T;
  timestamp: number;
  expirationMinutes: number;
}

export const cacheManager = {
  set: <T>(key: string, data: T, expirationMinutes: number = 5) => {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      expirationMinutes,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  },

  get: <T>(key: string): T | null => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheData: CacheData<T> = JSON.parse(cached);
    const now = Date.now();
    const expirationMs = cacheData.expirationMinutes * 60 * 1000;

    if (now - cacheData.timestamp > expirationMs) {
      localStorage.removeItem(key);
      return null;
    }

    return cacheData.data;
  },

  clear: (key: string) => {
    localStorage.removeItem(key);
  },
};
