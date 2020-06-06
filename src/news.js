export async function getNews(page) {
  var url = "https://newsapi.org/v2/top-headlines?country=in&page="+page+"&apiKey=YOUR_API_KEY";
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}