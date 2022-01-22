export default async function getTopSongs(token, amount, timeRange) {
  let res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${amount}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data = await res.json();

  if (data.error) {
    return 0;
  } else {
    return data;
  }
}
