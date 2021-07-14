const Auth = {
    isAuthenticated: localStorage.getItem('token') !== null,
    authenticate(user, password) {
       return fetch("https://contact-book-api-heroku.herokuapp.com/authenticate",{
            "method": "POST",
            "headers": {"content-type": "application/json","accept": "application/json"},
            "body": JSON.stringify({
                username: user,
                password: password
            })
        })
    },
    signout() {
        localStorage.removeItem('token')
        this.isAuthenticated = false;
    },
    getAuth() {
        return this.isAuthenticated;
    }
};
export default Auth;