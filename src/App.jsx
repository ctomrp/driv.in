import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { CarAPI } from './services/carAPI';
import {
  ButtonPrincipalComponent,
  ButtonSecondaryComponent,
  CarTableComponent,
  LoaderComponent,
  ModalComponent,
  PaginationComponent,
  TitleComponent
} from './components';
import FilterForm from './forms/FilterForm';
import { useFilters } from './contexts/FilterContext';
import 'react-tooltip/dist/react-tooltip.css'

export default function App() {
  const navigate = useNavigate();
  const { filters, applyFilters, resetFilters } = useFilters();
  const [order, setOrder] = useState('class');
  const [orderDirection, setOrderDirection] = useState('asc');
  const limit = 50;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [modalFilter, setModalFilter] = useState(false);

  const { data: carList = [],
    isLoading } = useQuery({
      queryKey: ['cars', limit],
      queryFn: () => CarAPI.getAllCars(limit),
      refetchOnMount: false,
      staleTime: 10000,
    });

  const handleSort = (sortBy) => {
    if (order === sortBy) {
      setOrderDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrder(sortBy);
      setOrderDirection('asc');
    }
  };

  const handleMap = (index, car) => {
    navigate(`/map/${index}`, { state: { car } });
  };

  const handleFilter = (newFilters) => {
    applyFilters(newFilters);
    setCurrentPage(1);
  };


  const handleReset = () => {
    resetFilters();
  };

  const applyFiltersToList = (list) => {
    if (!filters || !Array.isArray(list)) return list;

    return list.filter(car => {
      const inCityMpgRange = filters.city_mpg ? car.city_mpg >= filters.city_mpg : true;
      const inHighwayMpgRange = filters.highway_mpg ? car.highway_mpg >= filters.highway_mpg : true;
      const inCombinationMpgRange = filters.combination_mpg ? car.combination_mpg >= filters.combination_mpg : true;

      return (
        (!filters.type || car.class.toLowerCase().includes(filters.type.toLowerCase())) &&
        (!filters.make || car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
        (!filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
        (!filters.year || car.year.toString().includes(filters.year)) &&
        (!filters.transmission || car.transmission.toLowerCase().includes(filters.transmission.toLowerCase())) &&
        inCityMpgRange &&
        inHighwayMpgRange &&
        inCombinationMpgRange
      );
    });
  };

  const sortedCarList = carList.sort((a, b) => {
    if (a[order] < b[order]) return orderDirection === 'asc' ? -1 : 1;
    if (a[order] > b[order]) return orderDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCarList = applyFiltersToList(sortedCarList);
  const totalPages = Math.ceil(filteredCarList.length / itemsPerPage);

  const paginatedCarList = filteredCarList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='flex flex-col min-h-screen bg-[#001E2C]'>
      <TitleComponent title={'Gestor de Vehículos'}>
        <div className='flex flex-col xl:flex-row justify-center items-center md:justify-end gap-5'>
          <div data-tooltip-content={'Restablece la lista'}
            data-tooltip-id='tooltip'
            data-tooltip-place='top'
          >
            <ButtonSecondaryComponent onClick={handleReset} type={'button'}>Limpiar filtro</ButtonSecondaryComponent>
          </div>
          <div data-tooltip-content={'Filtra los resultados'}
            data-tooltip-id='tooltip'
            data-tooltip-place='top'
          >
            <ButtonPrincipalComponent onClick={() => setModalFilter(prevState => !prevState)} type='button'>Filtrar</ButtonPrincipalComponent>
          </div>
        </div>
      </TitleComponent>



      {isLoading ? (
        <div className=''>
          <LoaderComponent />
        </div>
      ) : (
        <div className='flex-1 mb-10'>
          <div className='px-0 xl:px-20 mb-20'>

            <CarTableComponent
              carList={paginatedCarList}
              order={order}
              orderDirection={orderDirection}
              handleSort={handleSort}
              handleMap={handleMap}
            />
          </div>
        </div>
      )}

      <footer className={`fixed w-full py-1 flex-none bottom-0 bg-[#EEF4F8]`}>
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className='flex justify-center'
        />
      </footer>

      <ModalComponent showModal={modalFilter} onClose={() => setModalFilter(false)}>
        <FilterForm onFilter={handleFilter} onClose={() => setModalFilter(false)} />
      </ModalComponent>
      <Tooltip id="tooltip" />

    </div>
  );
}
