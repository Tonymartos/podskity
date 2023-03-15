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
    let statusStorageProcess = sessionStorage.getItem('processActive')


    const [sessionProcess, setSessionProcess] = useState(statusStorageProcess)

    useEffect(() => {

        const expirationDuration = 1000 * 60 * 60 * 12; // 12 hours

        const prevAccepted = localStorage.getItem("accepted");
        const currentTime = new Date().getTime();

        const notAccepted = prevAccepted == undefined;
        const prevAcceptedExpired = prevAccepted != undefined && currentTime - prevAccepted > expirationDuration;
        if (notAccepted || prevAcceptedExpired) {
            localStorage.clear();
            localStorage.setItem("accepted", currentTime);
        }

        sessionStorage.setItem('processActive', 'active')
    }, [])

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
