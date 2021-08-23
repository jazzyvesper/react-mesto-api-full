class Api {
    constructor ({address, token}) {
      this._address = address;
      this._token = token;
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
        headers: {
          authorization: this._token
        }
      })
      .then(this._getResponseData)
    }
  
    getinfo () {
      return fetch(`${this._address}/users/me`, {
        headers: {
          authorization: this._token
        }
      })
      .then(this._getResponseData)
    }
  
    changeInfo(data) {
      return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
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
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
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
        headers: {
          authorization: this._token,
        }
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
      return fetch(`${this._address}/cards/likes/${id}`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then(this._getResponseData)
    }
  
    changeAvatar(data) {
      return fetch(`${this._address}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          avatar: data.avatar
        })
      })
      .then(this._getResponseData)
    }
  }
  
  const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-24',
    token: '35787694-4746-4a15-83d0-360cc3763119',
  });

  export default api