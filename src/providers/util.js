/**
 * Created by Usuario on 02/06/2017.
 */
var Util = (function () {
    function Util() {
        this.constants = {
            logged: 'logged',
            tutorial: 'tutorial',
            user: 'user',
            token: 'token'
        };
        this.url = "http://localhost:1337/";
        this.google_api_key = "AIzaSyDvZFVr2cdCCVyLmMBg0-8MaJTJDaHD8pE";
    }
    Util.prototype.savePreference = function (key, value) {
        localStorage.setItem(key, value);
    };
    Util.prototype.getPreference = function (key) {
        return localStorage.getItem(key);
    };
    Util.prototype.clearAllData = function () {
        localStorage.clear();
    };
    return Util;
}());
export { Util };
//# sourceMappingURL=util.js.map