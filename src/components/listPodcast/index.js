/* eslint-disable react/prop-types */
import React from 'react';

const renderItemPodcast = (items) => {
    return items.map((item,id) => {
        return (
                <div className='item-podcast' key={id} onClick={console.log(`https:// itunes.apple.com/lookup?id=${id}`)}>
                    <div className='item-background'>
                        <div className='item-content'>
                            <span><img src={item['im:image'][0].label}/></span>
                            <span>{item['im:artist'].label}</span>
                            <span>Author: {item['im:name'].label}</span>
                        </div>
                    </div>
                </div>
            );
        })
}

const ListPodcast = (props) => {
    return (
        <div className='list-podcasts'>{renderItemPodcast(props.data)}</div>
    )
}

export default ListPodcast;