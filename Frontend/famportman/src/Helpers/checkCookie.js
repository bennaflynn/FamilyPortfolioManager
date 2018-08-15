export const checkCookie = (cookies) => {
    if(cookies.get('token')) {
        return true;
    } else {
        return false;
    }
}