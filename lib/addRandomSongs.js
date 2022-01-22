export default async function addRandomSongs(
  amount,
  playlistId,
  topItems,
  token
) {
  if (amount > topItems.length || amount < 1) {
    alert("Invalid range");
    return;
  }

  for (let i = topItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = topItems[i];
    topItems[i] = topItems[j];
    topItems[j] = temp;
  }

  let reducedArray = topItems.slice(0, amount);

  let res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let playlist = await res.json();

  let toBeAdded = [];

  for (let track of reducedArray) {
    let skip = false;
    for (let item of playlist.tracks.items) {
      if (track.uri === item.track.uri) {
        alert(`${track.name} is already in playlist`);
        skip = true;
        continue;
      }
    }
    if (skip) {
      continue;
    }
    toBeAdded.push(track.uri);
  }

  let addRes = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
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
}
