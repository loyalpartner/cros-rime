import {ILocalStorage} from "src/api/common/storage";

export class LocalStorage<T extends Object> implements ILocalStorage<T> {

  set<K extends keyof T>(key: K, value: T[K]) {
    chrome.storage.local.set({
      [key]: value
    }, () => {});
  }

  get<K extends keyof T>(key: K | K[]): Promise<Record<K, T[K]> | null | undefined> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(key as string, (items) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError.message);
        } else {
          resolve(items[key as string]);
        }
      });
    });
  }

  clear() {
    chrome.storage.local.clear();
  }

  remove<K extends keyof T>(key: K | K[]) {
    chrome.storage.local.remove(key as any);
  }
}
