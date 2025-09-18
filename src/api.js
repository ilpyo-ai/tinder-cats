const CAT_COUNT = 5;

export const fetchCatImages = async () => {
  try {
    const response = await fetch(`https://cataas.com/api/cats?limit=${CAT_COUNT}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // Convert API data to full image URLs
    return data.map(cat => `https://cataas.com/cat/${cat.id}`);
  } catch (error) {
    console.error("Failed to fetch cat images:", error);
    return [];
  }
};
