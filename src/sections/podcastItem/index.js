/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import HtmlParser from 'html-react-parser'
import {NavLink} from 'react-router-dom'

const DetailsInfo = (props) => {
    return (
        <>
            <div className='podcast-artist__image'>
                <img src={props.image}/>
            </div>
                
            <div className='podcast-artist__name'>
                <span>{props.namePodcast}</span>
                <span>By: {props.nameArtist}</span>
            </div>
            <div className='podcast-artist__description'>
                <span>{props.description}</span>
            </div>
        </>
    )
}


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
                                <td><NavLink key={row.id} to={`episode/${row.id}`}>{row.title}</NavLink></td>
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


    const [imagePod, setImagePod] = useState('')

    const [artistPodcast, setArtistPodcast] = useState('')

    const [namePodcast, setNamePodcast] = useState(null)

    const [description, setDescription] = useState('')

    const [episodes, setEpisodes] = useState([])

    const [countEpisodes, setCountEpisodes] = useState(0)


    useEffect(() => {
        fetchApiDetails()
    }, [])

    useEffect(() => {
        const getIndexDetails = details[0]

        if(getIndexDetails){
            const getXMLData = details[0].feedUrl

            setImagePod(getIndexDetails.artworkUrl600)
            setArtistPodcast(getIndexDetails.artistName)
            setNamePodcast(getIndexDetails.trackName)
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


    const getHTMLFromNode = (node) => {
        return HtmlParser(node)
    }

    const getDataFromXML = (xml, tag) => {
        const requestXML = new XMLHttpRequest();

        requestXML.open("GET", 'https://cors-anywhere.herokuapp.com/'+xml, false);

        requestXML.send();

        if(tag === 'description'){
            const dataXML = requestXML.responseXML

            let getElementDescription = dataXML.getElementsByTagName(tag)[0];
    
            getElementDescription = getElementDescription.childNodes[0].nodeValue
    
            getElementDescription = getHTMLFromNode(getElementDescription)

            setDescription(getElementDescription)
        }

        if(tag === 'item'){
            let episodesList = []

            const dataXML = requestXML.responseXML

            let getElementsEpisodes = dataXML.getElementsByTagName(tag);

            getElementsEpisodes = [...getElementsEpisodes]
    
            getElementsEpisodes.map((item) => {
                let getIdEpisode = item.getElementsByTagName('guid')[0].textContent
                let getTitleEpisode = item.getElementsByTagName('title')[0].textContent
                let getDateEpisode = item.getElementsByTagName('pubDate')[0].textContent
                let getDurationEpisode = item.getElementsByTagName('itunes:duration')[0].textContent

                let episode = {
                    id: getIdEpisode,
                    title: getTitleEpisode,
                    date: getDateEpisode,
                    duration: getDurationEpisode
                }

                episodesList.push(episode)
            })


            setCountEpisodes(episodesList.length - 1)
            setEpisodes(episodesList)
        }
    }

    

    return (
        <div className='podcast-details'>
            <div className='podcast-details__container podcast-details__container-info'>
                <DetailsInfo image={imagePod} nameArtist={artistPodcast} namePodcast={namePodcast} description={description}/>
            </div>
            <div className='podcast-details__container-episodes'>
                <div className='podcast-details__container podcast-details__container-count-episodes'>
                    <span>Episodes: {countEpisodes}</span>
                </div>
                <div className='podcast-details__container podcast-details__container-episodes-list'>
                    <EpisodesList dataList={episodes}/>
                </div>
            </div>
        </div>
    )
}

export default PodcastItem;
