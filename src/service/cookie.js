import Cookies from "js-cookie";

const TOKEN_NAME = '_token';

export default {
    setToken(token) {
        Cookies.set(TOKEN_NAME, token, { sameSite: 'Lax' }, { expires: 1 });
    },
    getToken() {
        return Cookies.get(TOKEN_NAME);
    },
    deleteToken() {
        Cookies.remove(TOKEN_NAME);
    },
}