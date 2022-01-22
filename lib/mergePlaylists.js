import validateLink from "./validateLink";

export default async function mergePlaylists(
  ownPlaylistLink,
  otherPlaylistLink,
  token,
  alertFunc
) {
  let ownPlaylist = await validateLink(ownPlaylistLink, alertFunc, token);
  let otherPlaylist = await validateLink(otherPlaylistLink, alertFunc, token);

  ownPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${ownPlaylist.playlistId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let returnedOwnPlaylist = await ownPlaylist.json();

  otherPlaylist = await fetch(
    `https://api.spotify.com/v1/playlists/${otherPlaylist.playlistId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let returnedOtherPlaylist = await otherPlaylist.json();

  let toBeAdded = [];

  try {
    for (let track of returnedOtherPlaylist.tracks.items) {
      let skip = false;
      for (let item of returnedOwnPlaylist.tracks.items) {
        if (track.track.uri === item.track.uri) {
          alert(`${track.track.name} is already in playlist`);
          skip = true;
          continue;
        }
      }
      if (skip) {
        continue;
      }
      toBeAdded.push(track.track.uri);
    }

    let addRes = await fetch(
      `https://api.spotify.com/v1/playlists/${returnedOwnPlaylist.id}/tracks`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uris: toBeAdded }),
      }
    );

    let data = await addRes.json();
  } catch {
    alertFunc("Enter valid playlist links");
  }
}
