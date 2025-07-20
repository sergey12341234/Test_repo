import type { FormData } from '@/schema/schema';
import Cookies from 'js-cookie';

export function saveDataToCookies(data: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, ...safeData } = data;

  Object.entries(safeData).forEach(([key, value]) => {
    if (value !== undefined) {
      Cookies.set(key, String(value), { expires: 1 });
    }
  });
}
