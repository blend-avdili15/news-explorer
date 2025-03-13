const API_KEY = "0c338cb5ffb8419196420a163251cc45";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const fetchNews = async (query) => {
  if (!query) {
    throw new Error("Please enter a keyword");
  }

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7); // Get news from past 7 days
  const toDate = new Date();

  const url = `${BASE_URL}?q=${encodeURIComponent(
    query
  )}&apiKey=${API_KEY}&from=${fromDate.toISOString().split("T")[0]}&to=${
    toDate.toISOString().split("T")[0]
  }&pageSize=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again later.");
    }
    const data = await response.json();
    return data.articles; // Extracts the articles array
  } catch (error) {
    throw new Error(error.message);
  }
};
