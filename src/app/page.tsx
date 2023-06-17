"use client";

import { HuddleIframe, iframeApi, useEventListner } from "@huddle01/iframe";
import styles from "./page.module.css";
 
export default function Home() {
  // the `lobby:initialized`  event can be used to know when the lobby has been loaded 
    useEventListner("lobby:initialized", () => {
      iframeApi.initialize({
        redirectUrlOnLeave: "https://huddle01.com",
        background: "https://media.istockphoto.com/id/1217737633/vector/neon-microphone-and-glowing-border-frame-template-for-karaoke-live-music-stand-up-comedy-show.jpg?s=612x612&w=0&k=20&c=QtegyTYt0nX2Lj-O9m8jQ_RfsqjE8ZBpBYWCpTLo5wk="
      });
    });

    return (
        <div className={styles.main}>
            <HuddleIframe roomUrl="https://iframe.huddle01.com" width="100%" height="100%"/>
        </div>
    );
}
