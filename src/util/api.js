// These helpers are calling FTW's own server-side routes
// so, they are not directly calling Marketplace API or Integration API.
// You can find these api endpoints from 'server/api/...' directory


export const apiBaseUrl = () => {
  /*const port = 3000;
  const useDevApiServer = process.env.NODE_ENV === 'development' && !!port;

  // In development, the dev API server is running in a different port
  if (useDevApiServer) {
    return `http://localhost:${port}`;
  }*/

  // Otherwise, use the same domain and port as the frontend
  return `http://localhost:3001`;
};





const post = (path, body) => {
  const url = `${apiBaseUrl()}${path}`;
  console.log(body);
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/transit+json',
    },
    body: body,
  };
  console.log(options);
  return window.fetch(url, options).then(res => {
    const contentTypeHeader = res.headers.get('Content-Type');
    const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;

    if (res.status >= 400) {
      console.log("Errore nella richiesta");
      return res.json().then(data => {
        let e = new Error();
        e = Object.assign(e, data);

        throw e;
      });
    }
    if (contentType === 'application/transit+json') {
      console.log("sono qui dentro");
      return res.text();
    } else if (contentType === 'application/json') {
      return res.json();
    }
    return res.text();
  });
};

const get = (path) => {
    const url = `${apiBaseUrl()}${path}`;
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/transit+json',
      },
    };
    return window.fetch(url, options).then(res => {
      const contentTypeHeader = res.headers.get('Content-Type');
      const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;
  
      if (res.status >= 400) {
        return res.json().then(data => {
          let e = new Error();
          e = Object.assign(e, data);
  
          throw e;
        });
      }
      if (contentType === 'application/transit+json') {
        return res.text();
      } else if (contentType === 'application/json') {
        return res;
      }
      return res.text();
    });
  };


export const testaaa = body => {
    return post('/api/test', body);
}
/*
export const createUserWithIdp = body => {
  return post('/api/auth/create-user-with-idp', body);
};*/