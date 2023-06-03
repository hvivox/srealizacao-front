import { createApp, VueElement } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//import Cookies from 'js-cookie'
import cookie from './service/cookie'
import Notifications from '@kyvg/vue3-notification'

/* BOOTSTRAP DECLAÇÃO | DECLARA O JS, CSS ETC*/
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'


const app = createApp(App)

// CONFIGURAÇÕES GLOBAIS 
axios.defaults.withCredentials = true;// todas as paginas irão ficar cm credencial = true
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.common['Accept'] = 'application/json'
//axios.defaults.headers.common['Set-Cookie'] = 'cross-site-cookie=whatever; SameSite=lax; Secure;'
// axios.defaults.headers.common['Content-Type'] = 'application/json'


// INTERCEPTADOR REQUEST | SETA OS COOKIES NAS REQUISICOES
axios.interceptors.request.use((config) => {
    const token = cookie.getToken('_token');
    // const token = sessionStorage.getItem('token');

    if (!config.headers) {
        config.headers = {};
    }
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (erro) => Promise.reject(erro));


// INTERCEPTADOR RESPONSE
axios.interceptors.response.use((response) => {
    // RESPOSTA ESTÁ OK
    return response;
}, (error) => {
    // SE HOUVER ERROS NA RESPOSTA
    if (error.response.status == 401 || error.code == 'ERR_NETWORK') {
        //if (error.code == 'ERR_NETWORK') {
        //this.$router.push({ name: "login" });
        cookie.deleteToken("_token");
        error.data = "Sistema temporariamente fora do ar, tente novamente mais tarde!";
        //window.location = '/login';
    }

    return Promise.reject(error)
});



app.use(router)
app.use(Notifications)
app.mount('#app')




