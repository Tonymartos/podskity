/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import DetailsPodcast from '../../components/detailsPodcast'

const EpisodeView = () => {
    const location = useLocation()
    console.log(location)

    // const [dataEpisode, setDataEpisode] = useState({})
    const [detailsInfo, setDetailsInfo] = useState({})
    const [descriptionPodcast, setDescriptionPodcast] = useState('')

    useEffect(() => {
        if(location.state){
            setDetailsInfo(location.state.detailsArtist)
            // setDataEpisode(location.state.episodes)
            setDescriptionPodcast(location.state.description)
        }
    }, [location])

    return (
        <div className='podcast-details'>
            <div className='podcast-details__container podcast-details__container-info'>
                <DetailsPodcast artist={detailsInfo} description={descriptionPodcast}/>
            </div>
            <div className='podcast-details__container podcast-details__container-episodes-list'>

            </div>
        </div>
    )
}

export default EpisodeView;