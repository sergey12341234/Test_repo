const apiUrl = 'iplocate';

export const getUserLocation = async (): Promise<string | { error: string }> => {
  try {
    const response = await fetch(`${apiUrl}/lookup`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: { country: string } = await response.json();
    return data?.country || { error: 'Country not found' };
  } catch (error) {
    console.error('Error fetching user location:', error);
    return { error: 'Unable to retrieve location' };
  }
};
