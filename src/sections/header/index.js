/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import {Link, Outlet} from 'react-router-dom'
import {ReactComponent as NotificationProcess} from '../../../assets/svg/circle-dot-regular.svg'

const RenderIcon = ({status}) => {
    return(
        <>
            {
                status === 'active' ? <NotificationProcess className='icon-process'/> : null
            }
        </>
    )
}

const Header = () => {
    const statusStorageProcess = sessionStorage.getItem('processActive')


    const [sessionProcess, setSessionProcess] = useState(statusStorageProcess)

    useEffect(() => {
        sessionStorage.setItem('processActive', 'active')
    })

    useEffect(() => {
        setSessionProcess(statusStorageProcess)
    }, [statusStorageProcess])

    return (
        <>
            <div className='header-app'>
                <div>
                    <Link to='/'>
                        <h3 className='header-app__title'>
                            Podskity
                        </h3>
                    </Link>
                </div>
                <div className='header-app__icon-notification'>
                    <RenderIcon status={sessionProcess}/>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Header;
