import * as usersAPI from './users-api'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)

    // for right now, this won't be a token but we will be returning one eventually
    localStorage.setItem('token', token)
    return getUser()
}



export function getToken() {
    // get the token from local storage
    // get the token's payload
    // check if the token has expired
    // if it hasn't return the token

    const token = localStorage.getItem('token')
    if (!token) return null
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    //eyJ1c2VyIjp7Im5hbWUiOiJhc2VmIiwiZW1haWwiOiJhc2VmQGVtYWlsLm9jbSIsIl9pZCI6IjYzZWE1YTk4Zjg5MTdmODMxYWYxNjk5ZSIsImNyZ
    //WF0ZWRBdCI6IjIwMjMtMDItMTNUMTU6NDM6MjAuMjk1WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMTNUMTU6NDM6MjAuMjk1WiIsIl9fdiI6MH0sIm
    //lhdCI6MTY3NjMwMzAwMCwiZXhwIjoxNjc2Mzg5NDAwfQ.
    //U66xV7nOvfFhhC24GbZUgu-E2hRho_wtl4guTNhU10g

    //^^ that's our JWT
    // Part 11 is the header
    // Part 2 is the payload
    // Part 3 is the signature
    const payload = token.split('.')[1]
    // JWTs are base64 encoded
    // we need to decode it to make it usable
    // Javascript has a builtin function for decoding base 64
    // called atob()
    const decodedPayload = atob(payload)
    const parsedPayload = JSON.parse(decodedPayload)
    // JWT's exp is express in seconds, not milliseconds, so convert
    if (parsedPayload.exp < Date.now() / 1000) {
        // Token has expired - remove it
        localStorage.removeItem('token')
        return null
    } else {
        return token
    }
}

export function getUser() {
    const token = getToken()
    if (token) {
        const payload = token.split('.')[1]
        const decodedPayload = atob(payload)
        const parsedPayload = JSON.parse(decodedPayload)
        return parsedPayload.user
    } else {
        return null
    }

    // return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut() {
    localStorage.removeItem('token')
}

export async function logIn(credentials) {
    const token = await usersAPI.logIn(credentials)
    localStorage.setItem('token', token)
    return getUser()
}

export function checkToken() {
    return usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
}

