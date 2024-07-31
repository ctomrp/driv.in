import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { 
  QueryClient, 
  QueryClientProvider } from 'react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MapViewComponent from './components/MapViewComponent/MapViewComponent.jsx';
import { FiltersProvider } from './contexts/FilterContext.jsx'

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/map/:index" element={<MapViewComponent />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FiltersProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </FiltersProvider>
  </React.StrictMode>
);
