import {useEffect, FC, useState} from 'react'
import {Container} from "@mui/material";
import {styled} from "@mui/material";
import YouTubePlayer from 'youtube-player';
import {sleep} from "../utils";
import defaultJPG from '../assets/test_1.jpeg'

const VideoWrapper = styled(Container)`
  width: 100%;
  height: 600px;
  padding: 0 !important;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
  }
`
const VideoPlayer: FC<{ youtube_id: string }> = ({youtube_id}) => {
    const [showPNG, setSpng] = useState(true)
    useEffect(() => {
        let player: any = null
        const initPlayer = async () => {
            await sleep()
            player = YouTubePlayer('youtube-player', {
                videoId: youtube_id,
                width: '100%',
                height: 600
            })
            setSpng((false))
            if (await player.playVideo() as boolean) {
                player.suggestedQuality('hd720')
            }
        }
        youtube_id && initPlayer()
        return () => {
            player?.destroy()
        }
    }, [youtube_id])

    return <VideoWrapper>
        <div id="youtube-player"/>
        {
            showPNG && <Container sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 111,
                background: `url(${defaultJPG}) no-repeat center/cover`
            }}/>
        }
    </VideoWrapper>
}

export default VideoPlayer