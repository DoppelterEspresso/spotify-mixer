import generateRandomString from "./randomString";

export default function authURL() {
  var client_id = "644e1f56d44b459ca6fca97dc6b98c07";
  var redirect_uri = "http://spotify-mixer-beta.vercel.app";

  var state = generateRandomString(16);

  var scope =
    "user-read-private user-read-email user-top-read playlist-modify-private";

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location = url;
}
