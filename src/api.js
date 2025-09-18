const CAT_COUNT = 5;

export const fetchCatImages = async () => {
  try {
    const images = await Promise.all(
      Array.from({ length: CAT_COUNT }).map(() => {
        const uniqueParam = Date.now() + Math.random(); // unique for every request
        return fetch(`https://cataas.com/cat?random=true&unique=${uniqueParam}`)
          .then(res => res.url);
      })
    );
    return images;
  } catch (error) {
    console.error("Failed to fetch random cats:", error);
    return [];
  }
};
