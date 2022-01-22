export default async function addToPlaylist(
  playlistId,
  token,
  songUri,
  e,
  alertFunc
) {
  if (!playlistId) {
    alertFunc("Please provide a valid playlist");
    return;
  }

  let getPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let playlist = await getPlaylist.json();
  let itemsInPlaylist;

  try {
    itemsInPlaylist = playlist.tracks.items;
  } catch {
    alertFunc("Please provide a valid playlist");
    return;
  }
  let uriArray = [];

  for (let item of itemsInPlaylist) {
    uriArray.push(item.track.uri);
  }

  if (uriArray.includes(songUri)) {
    if (e.target.innerText !== "Add Anyway") {
      alertFunc("This Song is already in your playlist");
      e.target.innerText = "Add Anyway";
      return;
    }
  }

  let res = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${songUri}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data = await res.json();

  e.target.innerText = "Added";

  return data;
}
