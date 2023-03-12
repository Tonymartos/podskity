import React from 'react';
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import Podcast from './sections/podcast/podcast';
import '../assets/index.scss';

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Podcast />
      ),
    }
]);
  
createRoot(document.getElementById("root")).render(
    <div>
      <div className='header-app'>
        <h3>Podskity</h3>
      </div>
      <div className='app-sections'>
        <RouterProvider router={router} />
      </div>
    </div>
);