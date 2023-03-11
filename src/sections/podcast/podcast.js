import React, {useState, useEffect} from 'react';
import ListPodcast from '../../components/listPodcast'

const Podcast = () => {
  const [dataPodcasts, setDataPodcasts] = useState([]);

  useEffect(() => {
      const fetchApiPodcast = async () => {
          try{
              const fetchTopPods = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json').then((res) => {return res.json()})

              const getPopularPods = fetchTopPods.feed.entry

              return setDataPodcasts(getPopularPods)

          }catch(err){console.log(err)}
      }
      
      fetchApiPodcast()
  },[])
  
  return (
      <ListPodcast data={dataPodcasts}/>
  );
}

export default Podcast;
