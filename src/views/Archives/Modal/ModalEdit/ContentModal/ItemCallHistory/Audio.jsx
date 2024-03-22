import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import CommonStyles from 'components/CommonStyles';
import testAudio from 'assets/audio/test-audio.mp3';
import Play from 'assets/IconsSVG/Audio/play.svg';
import Pause from 'assets/IconsSVG/Audio/pause.svg';
import { BASE_IMAGE } from 'constants/api';

const useStyles = makeStyles((theme) => {
  return {
    audioContainer: {
      position: 'relative',
      height: '56px',
    },
    audio: {
      width: '100%',
      marginBottom: '16px',
      '&::-webkit-media-controls-panel': {
        background: '#F5FBFF',
        padding: '0 20px',
      },
    },
    buttonPlay: {
      position: 'absolute !important',
      top: 'calc(50% - 20px)',
      padding: '0 !important',
      left: '10px',
    },
    play: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#25DAC5',
      zIndex: '100',
      backgroundSize: '120%',
      backgroundPosition: 'center',
    },
  };
});

const Audio = ({ source }) => {
  //! State
  const classes = useStyles();
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const id = useRef(Math.floor(Math.random() * 100000));

  //! Function
  useEffect(() => {
    const audio = document.getElementById(id.current);
    if (isPlaying) {
      audio && audio.play();
    } else {
      audio && audio.pause();
    }
  }, [isPlaying]);

  //! Render
  return (
    <div className={classes.audioContainer}>
      <CommonStyles.Button variant="text" className={classes.buttonPlay} onClick={() => setIsPlaying(!isPlaying)}>
        <div className={classes.play} style={{ backgroundImage: `url(${isPlaying ? Pause : Play})` }}></div>
      </CommonStyles.Button>
      <audio controls className={classes.audio} id={id?.current}>
        <track kind="captions" />
        <source
          src={source?.indexOf('https://') > -1 || source?.indexOf('http://') > -1 ? source : `${BASE_IMAGE + source}`}
          type="audio/ogg"
        />
        {/* <source src={testMp3} type="audio/wav" /> */}
      </audio>
    </div>
  );
};

export default Audio;
