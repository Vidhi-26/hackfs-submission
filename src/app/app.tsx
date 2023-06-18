"use client";

import { useEffect, useState } from 'react';
import { HuddleIframe, iframeApi, useEventListner } from "@huddle01/iframe";
import styles from "./app.module.css";
import { Dropdown, DropdownButton, Button, ListGroup, Badge } from 'react-bootstrap';

export default function App() {
  const [songOptions, setSongOptions] = useState(false);
  const [selectedSongLyrics, setSelectedSongLyrics] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scores, setScores] = useState(false);

  // the `lobby:initialized` event can be used to know when the lobby has been loaded 
  useEventListner("lobby:initialized", () => {
    iframeApi.initialize({
      redirectUrlOnLeave: "https://huddle01.com"
    });
  });

  useEventListner("room:joined", () => {
    setSongOptions(true);
  });

  useEventListner("room:recording-stopped", (data) => {
    const mp4Url = data.s3URL;
  });

  const handleSongSelect = (selectedSong: string) => {
    const songLyrics: { [key: string]: string } = {
      'Closer': 'Lyrics for Song 1',
      'Shape of You': 'The club isnt the best place to find a lover. So the bar is where I go. Me and my friends at the table doing shots. Drinking fast and then we talk slow. Come over and start up a conversation with just me. And trust me Ill give it a chance now. Take my hand, stop, put Van the Man on the jukebox. And then we start to dance, and now Im singing like. Girl, you know I want your love. Your love was handmade for somebody like me. Come on now, follow my lead. I may be crazy, dont mind me. Say, boy, lets not talk too much. Grab on my waist and put that body on me. Come on now, follow my lead. Come, come on now, follow my lead',
      'Sorry': 'Lyrics for Song 3'
    };

    setSelectedSongLyrics(songLyrics[selectedSong]);
    setIsPlaying(!isPlaying);
  };

  const showResults = () => {
    setScores(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.iframeContainer}>
        <HuddleIframe roomUrl="https://iframe.huddle01.com" width="100%" height="100%" />
      </div>

      <div className={styles.buttonContainer}>
        {songOptions && (
          <>
            <DropdownButton id="dropdown-basic-button" title="Choose a Song" className="mt-3">
              <Dropdown.Item onClick={() => handleSongSelect('Closer')}>Closer</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSongSelect('Shape of You')}>Shape of You</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSongSelect('Sorry')}>Sorry</Dropdown.Item>
            </DropdownButton>
            {selectedSongLyrics && (
              <>
              <div className={`mt-3 mx-2 ${styles.lyricsContainer}`} style={{ borderRadius: '10px', 
                                                                              backgroundColor: '#963e96',
                                                                              padding: '1rem',
                                                                              overflow: 'auto',
                                                                              maxHeight: '50%'}}>
                  <p>{selectedSongLyrics}</p>
              </div>

              <div className="mt-5">
                <Button variant="primary" size="sm">Next Player</Button>{' '}
                <Button variant="primary" size="sm" onClick={showResults}>Show Results</Button>
              </div>
              </>
            )}
          </>
        )}
      </div>

      <div className={styles.scoresContainer}>
        {scores && (
          <ListGroup as="ol">
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Scores for the round</div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Vidhi</div>
                Well done!
              </div>
              <Badge bg="primary" pill>91%</Badge>
            </ListGroup.Item>
            
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">Shreyas P</div>
                Aw Keep Practicing
              </div>
              <Badge bg="primary" pill>78%</Badge>
            </ListGroup.Item>
          </ListGroup>
        )}
      </div>

      {isPlaying && (
        <audio src="/astronaut.mp3" autoPlay />
      )}
    </div>
  );
}
