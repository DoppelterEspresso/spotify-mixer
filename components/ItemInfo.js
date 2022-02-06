import styles from "../styles/Info.module.css";
import addToPlaylist from "../lib/addToPlaylist";
import addRandomSongs from "../lib/addRandomSongs";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function ItemInfo({ topItems, id, token, alertFunc }) {
  const [rngAmount, setRngAmount] = useState(topItems ? topItems.length : 0);

  useEffect(() => {
    if (!id || id.length < 22) {
      alertFunc("Please provide a valid playlist link");
    }
  }, []);

  if (!topItems) {
    alertFunc("Please reauthenticate");
    return <></>;
  }

  return (
    <div>
      <h2>Top Songs</h2>
      {topItems.map((item) => {
        return (
          <li key={topItems.indexOf(item)}>
            <div className={styles.container}>
              <span className={styles.infoSpan}>{item.name}</span>
              <img
                src={item.album.images[2].url}
                alt=""
                className={styles.previewImage}
              />
              <span className={styles.artist}>{item.artists[0].name}</span>
              <button
                onClick={(e) => {
                  console.log(this);
                  addToPlaylist(id, token, item.uri, e, alertFunc);
                }}
                className={styles.addButton}
              >
                Add
              </button>
            </div>
          </li>
        );
      })}

      <div className={styles.shuffleContainer}>
        <label htmlFor="shuffleAmount">Amount to add to playlist:</label>
        <input
          onInput={(e) => setRngAmount(e.target.valueAsNumber)}
          type="number"
          name="shuffleAmount"
          className={styles.shuffleAmount}
        ></input>
        <button
          onClick={() => {
            if (id) addRandomSongs(rngAmount, id, topItems, token);
            else alertFunc("Please provide a valid playlist");
          }}
          className={styles.shuffleButton}
        >
          Add Random Songs
        </button>
      </div>
    </div>
  );
}
