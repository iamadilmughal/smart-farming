import Axios from "axios";
import Cookies from "universal-cookie";

class Auth {
  constructor() {
    this.authenticated = false;
    this.cookies = new Cookies();
  }

  checkAdminCreds(username, password) {
    var data = {
      username: username,
      password: password,
    };
    Axios.post("http://localhost:3000/admin/login", data)
      .then((response) => {
        if (response.data.status === 0) {
          return false;
        }
        if (response.data.status === 1) {
          return true;
        }
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

  login(username, password) {
    if (this.checkAdminCreds(username, password)) {
      this.authenticated = true;
      var e = new Date();
      this.cookies.set("username", username, {
        expires: new Date(e.getDate + 24 * 60 * 60 * 1000),
      });
      return true
    }
    else{
        return false;
    }
  }

  logout() {
    if(this.authenticated === true && this.cookies.get("username") != null ){
        this.cookies.remove("username")
        this.authenticated = false
    }
    return true
  }

  isAuthenticated() {
    return this.authenticated && this.cookies.get("username") != null;
  }

  getUsername(){
      return this.cookies.get("username")
  }
}

export default new Auth();
