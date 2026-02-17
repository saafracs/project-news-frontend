class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  searchNews(query) {
    return this._makeRequest("latest", query);
  }

  _makeRequest(path = "latest", query = "") {
    const url = `${this._url}${path}?apikey=${this._token}&q=${encodeURIComponent(
      query,
    )}&language=es&timezone=america/bogota`;
    return fetch(url)
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });
  }
}
const api_news = new Api(
  "https://newsdata.io/api/1/",
  "pub_503398cb277a4d5283a4c715594d8165",
);

export default api_news;
