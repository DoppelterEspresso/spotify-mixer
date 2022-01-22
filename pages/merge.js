import Nav from "../components/Nav";
import styles from "../styles/Merge.module.css";
import { useEffect, useState } from "react";
import mergePlaylists from "../lib/mergePlaylists";
import Alert from "../components/Alert";

export default function Merge() {
  const [token, setToken] = useState(0);
  const [hash, setHash] = useState(0);
  const [ownPlaylistLink, setOwnPlaylistLink] = useState(0);
  const [otherPlaylistLink, setOtherPlaylistLink] = useState(0);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    if (window.location.hash) {
      setToken(window.location.hash.slice(14));
      setHash(window.location.hash);
    } else {
      console.log("No hash fragment");
    }
    console.log(token);
  }, [token]);

  function showAlert(message) {
    setMessage(message);
    setAlert("alert");
    setTimeout(() => setAlert("activeAlert"), 100);
    setTimeout(() => setAlert("notActive"), 2000);
    setTimeout(() => setAlert(false), 5000);
  }

  return (
    <div>
      {alert ? <Alert active={alert} message={message} /> : <></>}

      <h1>Spotify Merger (BETA)</h1>
      <div className={styles.playlistsContainer}>
        <div className={styles.playlistInput}>
          <label htmlFor="ownPlaylistInput">Your Owned Playlist:</label>
          <input
            className={styles.textInput}
            type="text"
            name="ownPlaylistInput"
            placeholder="https://open.spotify.com/playlist/{...}?si={...}"
            onChange={(e) => setOwnPlaylistLink(e.target.value)}
          ></input>
        </div>
        <div className={styles.playlistInput}>
          <label htmlFor="otherPlaylistInput">Other Playlist:</label>
          <input
            className={styles.textInput}
            type="text"
            name="otherPlaylistInput"
            placeholder="https://open.spotify.com/playlist/{...}?si={...}"
            onChange={(e) => setOtherPlaylistLink(e.target.value)}
          ></input>
        </div>
        <button
          onClick={() =>
            mergePlaylists(
              ownPlaylistLink,
              otherPlaylistLink,
              token,
              showAlert.bind(this)
            )
          }
        >
          Merge
        </button>
      </div>
      <Nav hash={hash} />
    </div>
  );
}
