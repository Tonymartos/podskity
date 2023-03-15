/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react'


const DetailsPodcast = (props) => {

    const [image, setImage] = useState('')
    const [nameArtist, setNameArtist] = useState('')
    const [namePodcast, setNamePodcast] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if(props.artist && props.description){
            setImage(props.artist.imagePod)
            setNameArtist(props.artist.nameArtist)
            setNamePodcast(props.artist.namePodcast)
            setDescription(props.description)
        }
    },[props])

    return (
        <>
            <div className='podcast-artist__image'>
                <img src={image}/>
            </div>
                
            <div className='podcast-artist__name'>
                <span>{namePodcast}</span>
                <span>By: {nameArtist}</span>
            </div>
            <div className='podcast-artist__description'>
                <span>Description: </span>
                {description}
            </div>
        </>
    )
}

export default DetailsPodcast