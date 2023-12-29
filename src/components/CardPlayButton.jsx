import {Pause, Play} from "./Player"
import {usePlayerStore} from '@/store/playerStore'


export function CardPlayButton({id, song, size = 'small',variant } ) {
    const {
        currentMusic,
        isPlaying,
        setIsPlaying,
        setCurrentMusic
    } = usePlayerStore(state => state)

    const isPlayingPlaylist =
        isPlaying &&
        ((currentMusic?.playlist.id === id && !song) || (currentMusic?.song.id === song?.id && song));


    const handleClick = () => {
        if (isPlayingPlaylist) {
            setIsPlaying(false)
            return
        }

        fetch(`/api/get-info-playlist.json?id=${id ?? song.albumId}`)
            .then(res => res.json())
            .then(data => {
                const {songs, playlist} = data
                setIsPlaying(true)
                setCurrentMusic({songs, playlist, song: song ?? songs[0]})
            })
    }

    const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'

    if (variant === 'table') {
        return (

            <button onClick={handleClick}
                    className="card-play-button rounded-full bg-green-500 p-2 hover:scale-105 transition hover:bg-green-400">

            {isPlayingPlaylist ? <Pause className={"w-2 h-2" }/> :
                    <Play className={"w-2 h-2" }/>}
            </button>)
    } else {
        return (<button onClick={handleClick}
                        className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
            {isPlayingPlaylist ? <Pause className={iconClassName}/> :
                <Play className={iconClassName}/>}
        </button>)
    }


}