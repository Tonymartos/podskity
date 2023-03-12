/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';

const FilterComponent = (props) => {

    const [getCountPodscast, setCountPodscast] = useState();

    useEffect(() => {
        setCountPodscast(props.count)
    }, [props.count])

    return (
        <div className='filter-component'>
            <div>
                <div className='filter-component__count'>
                    <span>{getCountPodscast}</span>
                </div>
                <div className='filter-component__filter'>
                    <input type='text' placeholder='Filter podcasts...' onChange={(words) => props.callFilter(words)}/>
                </div>
            </div>
        </div>
    )
}

export default FilterComponent;