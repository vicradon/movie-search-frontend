import http from ".";

export const searchByTitle = async ({ title, fetchCached }) => {
  const searchParams = new URLSearchParams({
    title,
    fetchCached: String(Number(fetchCached)),
  });

  const { data } = await http.get(`/movies?${searchParams}`);
  return data;
};
