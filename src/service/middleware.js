/* INTERCEPTADOR DE ROTAS | ANTES DE CHAMAS AS ROTAS ELE SERÁ EXECUTADO */

// import Cookies from "js-cookie"
import axios from "axios";
import cookie from "./cookie";
export default {

    // MIDLLEWARE DE ROTAS | SE NAO TIVER AUTENTICADO REDIRECIONA PARA LOGIN
    guardMyroute(to, from, next) {
        const token = cookie.getToken();

        //Verifica se há um token
        if (token) {

            // Checar se token é válido / ativo
            axios.get('/api/usuario-logado');

            next(); // permite seguir o caminho solicitado pela view
        }
        else {
            next('/login'); // em caso de erro na validação retorna para login;
        }
    }


}

