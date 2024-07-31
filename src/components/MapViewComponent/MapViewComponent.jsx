import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getRandomLocation } from "../../utils";
import ButtonPrincipalComponent from "../ButtonComponent/ButtonComponent";
import TitleComponent from "../TitleComponent/TitleComponent";

function MapViewComponent() {

  const location = useLocation();
  const { car } = location.state || {};
  const navigate = useNavigate();
  const mapRef = useRef(null);

  const [latitude, longitude] = getRandomLocation();

  function initializeMap() {
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
      console.error("Contenedor del mapa no encontrado.");
      return;
    }

    if (mapRef.current) return;

    mapRef.current = L.map(mapContainer).setView([latitude, longitude], 16);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);

    L.marker([latitude, longitude]).addTo(mapRef.current);
  }

  useEffect(() => {
    initializeMap(latitude, longitude);
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-[#001E2C] text-white'>
      <TitleComponent title={'Localización'} />
      <div className='flex justify-end gap-5 me-20'>
        <ButtonPrincipalComponent onClick={() => navigate(-1)} type='button'>
          Volver
        </ButtonPrincipalComponent>
      </div>
      <div className="flex flex-col mx-auto">
        <div className="text-lg pb-5">
        El vehículo <span className="capitalize">{car.make}</span>&nbsp;
        modelo <span className="capitalize">{car.model}</span>&nbsp;
        del año {car.year} se encuentra en:          
        </div>
      <div className="flex justify-center">
        <div id="map" style={{ height: '50vh', width: '50vw' }}></div>
      </div>
      </div>
    </div>
  );
}

export default MapViewComponent;
