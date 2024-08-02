import { CaretUpSquareFill, CaretDownSquareFill } from 'react-bootstrap-icons';
import { Tooltip } from 'react-tooltip';

const CarTableComponent = ({ carList, order, orderDirection, handleSort, handleMap }) => {
  const getSortIcon = (column) => {
    if (order === column) {
      return orderDirection === 'asc' ? <CaretUpSquareFill /> : <CaretDownSquareFill />;
    }
    return <CaretDownSquareFill />;
  };

  return (
    <div className='bg-[#EEF4F8] rounded-none xl:rounded-3xl w-full overflow-x-auto mx-auto'>
      <table className={`table-auto mx-auto text-center border-separate cursor-pointer w-screen md:w-full py-4`}>
        <thead>
          <tr className='capitalize cursor-pointer select-none'>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('class')}
              data-tooltip-content={'Ordenar por tipo de auto'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Tipo de auto</span>
                {getSortIcon('class')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('fuel_type')}
              data-tooltip-content={'Ordenar por tipo de combustible'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Tipo de combustible</span>
                {getSortIcon('fuel_type')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('make')}
              data-tooltip-content={'Ordenar por marca'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Marca</span>
                {getSortIcon('make')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('model')}
              data-tooltip-content={'Ordenar por modelo'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Modelo</span>
                {getSortIcon('model')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('year')}
              data-tooltip-content={'Ordenar por año'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Año</span>
                {getSortIcon('year')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('transmission')}
              data-tooltip-content={'Ordenar por tipo de transmisión'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Tipo de transmisión</span>
                {getSortIcon('transmission')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('city_mpg')}
              data-tooltip-content={'Ordenar por rendimiento en ciudad'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Consumo en ciudad</span>
                {getSortIcon('city_mpg')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('highway_mpg')}
              data-tooltip-content={'Ordenar por rendimiento en carretera'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Consumo en carretera</span>
                {getSortIcon('highway_mpg')}
              </div>
            </th>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('combination_mpg')}
              data-tooltip-content={'Ordenar por rendimiento mixto'}
              data-tooltip-id='tooltip'>
              <div className='flex items-center justify-between'>
                <span className='flex-1 text-center ms-4'>Consumo mixto</span>
                {getSortIcon('combination_mpg')}
              </div>
            </th>
          </tr>

        </thead>
        <tbody>
          {carList.length < 1 ? (
            <tr>
              <td colSpan="9" className='text-center capitalize text-[#001E2C] pt-3 font-semibold'>
                No existen coincidencias
              </td>
            </tr>
          ) : (
            carList.map((car, index) => (
              <tr key={index} className='capitalize bg-[#EEF4F8] hover:bg-[#1393ce] hover:text-white'
                data-tooltip-content={'Ver localización'}
                data-tooltip-place='bottom'
                data-tooltip-id='tooltip'
                onClick={() => handleMap(index, car)}>
                <td>{car.class}</td>
                <td>{car.fuel_type}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.transmission}</td>
                <td>{car.city_mpg}</td>
                <td>{car.highway_mpg}</td>
                <td>{car.combination_mpg}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
        <Tooltip id="tooltip" />
    </div>
  );
};

export default CarTableComponent;
