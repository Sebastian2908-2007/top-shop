import decode from 'jwt-decode';

class AuthService {
  getProfile() {
   /**this if will keep errors from being thrown with ssr */
   if (typeof window === 'undefined') {
    return null;
  }

    return decode(this.getToken());
  }

  loggedIn() {
     /**this if will keep errors from being thrown with ssr */
     if (typeof window === 'undefined') {
      return null;
    }
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
     /**this if will keep errors from being thrown with ssr */
     if (typeof window === 'undefined') {
      return null;
    }

    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    /**this if will keep errors from being thrown with ssr */
    if (typeof window === 'undefined') {
      return null;
    }
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
     /**this if will keep errors from being thrown with ssr */
     if (typeof window === 'undefined') {
      return null;
    }
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    // decode token so we can get the isAdmin property
      const decoded = decode(idToken);
  // if admin route to admin dashboard
  if(decoded.data.isAdmin) {
     window.location.replace('/admindashboard');
   }else {
    /*If regular user route to home*/
    window.location.assign(`/`)
  }
  }

  logout() {
     /**this if will keep errors from being thrown with ssr */
     if (typeof window === 'undefined') {
      return null;
    }
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

}

export default new AuthService();