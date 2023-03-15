/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import DetailsPodcast from '../../components/detailsPodcast'

const EpisodeView = () => {
    const location = useLocation()
    console.log(location)

    const [idPodcast, setIdPodcast] = useState('')
    const [dataEpisode, setDataEpisode] = useState({})
    const [detailsInfo, setDetailsInfo] = useState({})
    const [descriptionPodcast, setDescriptionPodcast] = useState('')

    useEffect(() => {
        if(location.state){
            setIdPodcast(location.state.detailsArtist.idPod)
            setDetailsInfo(location.state.detailsArtist)
            setDataEpisode(location.state.episodes)
            setDescriptionPodcast(location.state.description)
        }
    }, [location])

    return (
        <div className='podcast-details'>
            <div className='podcast-details__container podcast-details__container-info'>
               <Link to={`/podcast/${idPodcast}`}><DetailsPodcast artist={detailsInfo} description={descriptionPodcast}/></Link>
            </div>
            <div className='podcast-details__container podcast-details__container-episode'>
                <span className='podcast-details__container-title'>{dataEpisode.title}</span>
                <span className='podcast-details__container-summary'>{dataEpisode.summary}</span>
                <span className='podcast-details__container-audio'>
                    <audio src={dataEpisode.audio} type="audio/mpeg" controls preload="auto"/>
                </span>
            </div>
        </div>
    )
}

export default EpisodeView;