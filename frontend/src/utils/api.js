class Api {
  constructor ({address, headers}) {
    this._address = address;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json()
     }else {
       return Promise.reject(res.status)
     } 
  }
  
  getCards () {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    })
    .then(this._getResponseData)
  }

  getinfo () {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
      })
    .then(this._getResponseData)
  }

  changeInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar
      })
    })
    .then(this._getResponseData)
  }

  createNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._getResponseData)
  }

   deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._getResponseData)
  }

  /*addLikes(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._getResponseData)
  }

  deleteLikes(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getResponseData)
  }*/



  changeLikeCardStatus (id, isLiked) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then(this._getResponseData)
  }

  changeAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ 
        avatar: data.avatar
      })
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  address: 'https://api.jazzyvesper.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
}
});

export default api