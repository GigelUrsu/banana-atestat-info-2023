// const API = 'http://localhost:8080';
// const API = 'https://express-payserver.herokuapp.com';
const API = 'https://payserverfornetlify.netlify.app';


export async function fetchFromAPI(endpoint, opts){
    const { method, body } = { method: 'POST', body: null, ...opts};

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(body && {body: JSON.stringify(body) }),
    });

    return res.json();
}

// [[redirects]]
//  from = "/*"
//  to = "/index.html"
//  status = 200