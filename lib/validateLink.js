export default async function validateLink(link, alertFunc, token) {
  let playlistId;
  try {
    playlistId = link.slice(34, 56);
  } catch {
    alertFunc("Invalid playlist-link");
    return false;
  }
  if (playlistId < 22) {
    alertFunc("Invalid playlist-link");
    return false;
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

  let playlist;
  try {
    playlist = await getPlaylist.json();
  } catch {
    alertFunc("Invalid playlist-link");
    return false;
  }

  if (playlist.tracks) {
    return {
      playlistId: playlistId,
      playlistName: playlist.name,
    };
  } else {
    return false;
  }
}
