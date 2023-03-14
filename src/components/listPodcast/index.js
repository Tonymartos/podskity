/* eslint-disable react/prop-types */
import React from 'react';
import {NavLink} from 'react-router-dom'

const renderItemPodcast = (items) => {
    return items.map((item,id) => {
        const idPodcast = item['id'].attributes['im:id']
        const urlDetail = `podcast/${idPodcast}`

        return (
                    <div className='item-podcast' key={id}>
                            <NavLink key={id} to={urlDetail}>
                                <div className='item-background'>
                                    <div className='item-content'>
                                        <span><img src={item['im:image'][0].label}/></span>
                                        <div className='item-content__info'>
                                            <span className='item-content__name'>{item['im:name'].label}</span>
                                            <span className='item-content__artist'>Author:{item['im:artist'].label}</span>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
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