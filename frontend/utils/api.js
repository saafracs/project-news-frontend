class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };

  saveNews = (data) => {
    return fetch(`${this._url}/news/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  };

  deleteNews = (id) => {
    return fetch(`${this._url}/news/${id}/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    });
  };
}

const api = new Api("http://localhost:3000", localStorage.getItem("jwt"));

export default api;
