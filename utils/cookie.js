import Cookies from "js-cookie"

export function getCookie(){
    const token = Cookies.get('token');
    if(token){
        console.log("Token from server component: ", token);
        return token;
    }
    return null;
}