import React from 'react'
import { createRoot } from "react-dom/client"
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import Header from './sections/header'
import Podcast from './sections/podcast'
import PodcastItem from './sections/podcastItem'
import '../assets/index.scss'

const router = createBrowserRouter([
  {element: <Header />,
    children:[
    {
      path: "/",
      element: (
        <Podcast />
      ),
    },
    {
      path: 'podcast/:id',
      element: (
        <PodcastItem />
      ),
    }
  ]}
]);
  
createRoot(document.getElementById("root")).render(
    <div>
      <div className='app-sections'>
        <RouterProvider router={router} />
      </div>
    </div>
);