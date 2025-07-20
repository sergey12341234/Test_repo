import type { FormData } from '@/schema/schema';

export function saveDataToLocalStorage(data: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { image, ...safeData } = data;

  localStorage.setItem('formData', JSON.stringify(safeData));
}
