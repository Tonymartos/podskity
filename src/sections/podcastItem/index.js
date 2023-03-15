/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import DetailsArtist from '../../components/detailsPodcast'

const EpisodesList = (props) => {
    return (
        <table>
            <thead>
                <tr className='episodes__table-header'>
                    <th>Title</th>              
                    <th>Date</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.dataList && props.dataList.length > 0 ?
                    props.dataList.map((row, key) => {
                        return  (
                            <tr key={key}>
                                <td>
                                    <Link 
                                        to={`episode/${row.id}`} 
                                        state={
                                            {
                                                detailsArtist: props.dataArtist,
                                                description: props.descriptionPodcast,
                                                episodes: row
                                            }
                                        }
                                    >
                                        {row.title}
                                    </Link>
                                </td>
                                <td>{row.date}</td>
                                <td>{row.duration}</td>
                            </tr>
                        )
                    })
                    : null
                }
            </tbody>
        </table>
    )

}


const PodcastItem = () => {

    const paramsId = useParams()
    const podId = paramsId.id

    const [details, setDetails] = useState([])

    const [artistPodcast, setArtistPodcast] = useState('')

    const [description, setDescription] = useState('')

    const [episodes, setEpisodes] = useState([])

    const [countEpisodes, setCountEpisodes] = useState(0)


    useEffect(() => {
        fetchApiDetails()
    }, [])

    useEffect(() => {
        const getIndexDetails = details[0]

        if(getIndexDetails){
            const objectArtist = {
                imagePod: getIndexDetails.artworkUrl600,
                nameArtist: getIndexDetails.artistName,
                namePodcast: getIndexDetails.trackName
            }

            const getXMLData = details[0].feedUrl

            setArtistPodcast(objectArtist)
            getDataFromXML(getXMLData, 'description')
            getDataFromXML(getXMLData, 'item')
        }

    }, [details])

    const fetchApiDetails = async () => {
        try{
            const fetchDetails = await fetch(`https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=${podId}`).then((res) => {return res.json()})
            const getDetails = fetchDetails.results

            setDetails(getDetails)
    
        }catch(err){console.log(err)}
    }


    const validateContent = (content) => {
        return content ? content.textContent : null
    }

    const getDataFromXML = (xml, tag) => {
        const requestXML = new XMLHttpRequest();

        try{
            requestXML.open("GET", 'https://cors-anywhere.herokuapp.com/'+xml, false);

            requestXML.send();

            if(tag === 'description'){
                const dataXML = requestXML.responseXML

                let getElementDescription = dataXML.getElementsByTagName(tag)[0];
        
                getElementDescription = getElementDescription.childNodes[0].nodeValue
        
                getElementDescription = getElementDescription.replaceAll(/(<([^>]+)>)/ig, '')

                setDescription(getElementDescription)
            }

            if(tag === 'item'){
                let episodesList = []

                const dataXML = requestXML.responseXML

                let getElementsEpisodes = dataXML.getElementsByTagName(tag);

                getElementsEpisodes = [...getElementsEpisodes]
        
                getElementsEpisodes.map((item) => {
                    const getIdEpisode = validateContent(item.getElementsByTagName('guid')[0])
                    const getTitleEpisode = validateContent(item.getElementsByTagName('title')[0])
                    const getDateEpisode = validateContent(item.getElementsByTagName('pubDate')[0])
                    const getDurationEpisode = validateContent(item.getElementsByTagName('itunes:duration')[0])
                    const getSummary = validateContent(item.getElementsByTagName('description')[0])
                    const audioPodcast = item.getElementsByTagName("enclosure")[0] ? item.getElementsByTagName("enclosure")[0].getAttribute('url') : null

                    let episode = {
                        id: getIdEpisode,
                        title: getTitleEpisode,
                        date: getDateEpisode,
                        duration: getDurationEpisode,
                        summary: getSummary.replaceAll(/(<([^>]+)>)/ig, ''),
                        audio: audioPodcast
                    }

                    episodesList.push(episode)
                })


                setCountEpisodes(episodesList.length - 1)
                setEpisodes(episodesList)
            }
        }catch(err){err}
    }

    

    return (
        <div className='podcast-details'>
            <div className='podcast-details__container podcast-details__container-info'>
                <DetailsArtist artist={artistPodcast} description={description}/>
            </div>
            <div className='podcast-details__container-episodes'>
                <div className='podcast-details__container podcast-details__container-count-episodes'>
                    <span>Episodes: {countEpisodes}</span>
                </div>
                <div className='podcast-details__container podcast-details__container-episodes-list'>
                    <EpisodesList dataList={episodes} dataArtist={artistPodcast} descriptionPodcast={description}/>
                </div>
            </div>
        </div>
    )
}

export default PodcastItem;
