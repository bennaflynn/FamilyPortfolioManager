export const httpGet = (URL,Token) => {
    return fetch(URL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
}