import React, {useState, useEffect} from 'react';
import FilterComponent from '../../components/filterComponent'
import ListPodcast from '../../components/listPodcast'


const Podcast = () => {
  const [dataPodcasts, setDataPodcasts] = useState([])
  const [dataFilter, setDataFilter] = useState(null)
  const [countPods, setCountPods] = useState(0)

  useEffect(() => {
	fetchApiPodcast()
  },[])

  const fetchApiPodcast = async () => {
	try{
		const fetchTopPods = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json').then((res) => {return res.json()})

		const getPopularPods = fetchTopPods.feed.entry

		const getCountPods = fetchTopPods.feed.entry.length

		setCountPods(getCountPods)
		setDataPodcasts(getPopularPods)

	}catch(err){console.log(err)}
}

  const filterPodcastRender = (filter) => {
	const filterWords = filter.target.value.toUpperCase()

	if(filterWords !== ''){
		const dataFilter = dataPodcasts.filter((element) => element['im:name'].label.toUpperCase().includes(filterWords))
		const countDataFilter = dataFilter.length
		setDataFilter(dataFilter)
		setCountPods(countDataFilter)
	}

	if(filterWords === ''){
		const countDataPodcasts = dataPodcasts.length
		setDataFilter(null)
		setCountPods(countDataPodcasts)
	}
  }
  
  return (
    <div>
        <FilterComponent count={countPods} callFilter={(f) => filterPodcastRender(f)}/>
        <ListPodcast data={dataFilter ? dataFilter : dataPodcasts} />
    </div>
  );
}

export default Podcast;
