import { useState } from "react";
import Link from "next/link";
import authURL from "../lib/authRequest";

export default function Nav({ hash }) {
  const [active, setActive] = useState(false);

  return (
    <nav id={active ? "active" : "inactive"}>
      <div id="nav-container">
        <ul id="nav-content">
          <Link href={`/merge${hash}`} passHref>
            <p>Merger</p>
          </Link>
          <Link href={`/${hash}`} passHref>
            <p>Mixer</p>
          </Link>
          {/* <Link href={`/help${hash}`} passHref>
            <p>Help</p>
          </Link> */}
          <p onClick={authURL}>Reauthenticate</p>
        </ul>
      </div>
      <span
        id="nav-toggle"
        onClick={() => {
          if (active) {
            setActive(false);
          } else {
            setActive(true);
          }
        }}
      ></span>
    </nav>
  );
}
