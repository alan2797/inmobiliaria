import { CookieService } from "./CookieService";

class Auth {
  authenticated: boolean;
  constructor() {
    this.checkToken();
  }
  logOut(callback) {
    CookieService.remove("access_token");
    this.authenticated = false;
    callback();
  }
  private checkToken() {
    const token = CookieService.get("access_token");
    console.log(token ? true : false);
    this.authenticated = token ? true : false;
  }

  isAuthenticated() {
    this.checkToken();
    return this.authenticated;
  }

  getAccessToken() {
    return CookieService.get("access_token");
  }
}
export default new Auth();
