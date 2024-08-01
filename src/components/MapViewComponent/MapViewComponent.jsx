import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import L from 'leaflet';
import { Tooltip } from "react-tooltip";

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
    initializeMap();
  }, [latitude, longitude]);

  return (
    <div className='flex flex-col min-h-screen bg-[#001E2C] text-white'>
      <TitleComponent title={'Localización'} />
      <div className='flex justify-center md:justify-end gap-5 w-full md:w-[94%] mb-5 md:mb-10'>
        <div
        data-tooltip-content={'Volver a la vista anterior'}
        data-tooltip-id="tooltip"
        data-tooltip-place="top"
        >
        <ButtonPrincipalComponent onClick={() => navigate(-1)} type='button'>
          Volver
        </ButtonPrincipalComponent>
        </div>
      </div>
      <div className="flex flex-col mx-auto px-4 md:px-0">
        <div className="text-lg pb-3 text-wrap mx-0 md:mx-5 text-justify">
          El vehículo <span className="capitalize">{car.make}</span>&nbsp;
          modelo <span className="capitalize">{car.model}</span>&nbsp;
          del año {car.year} se encuentra en las coordenadas: {[latitude, longitude].join(', ')}
        </div>
        <div className="flex justify-center">
          <div id="map" className="w-full md:w-[89vw]" style={{ height: '50vh' }}></div>
        </div>
      </div>
      <Tooltip id="tooltip" />
    </div>
  );
}

export default MapViewComponent;
