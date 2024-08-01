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
    <table className={`table-auto mx-auto text-center w-[90%] border-separate border-spacing-1 cursor-pointer p-3`}>
      <thead>
        <tr className='capitalize cursor-pointer select-none'>
            <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('class')}
              data-tooltip-content={'Ordenar por tipo de auto'}
              data-tooltip-id='tooltip'
              >
            Tipo de auto {getSortIcon('class')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('fuel_type')}
                          data-tooltip-content={'Ordenar por tipo de combustible'}
              data-tooltip-id='tooltip'
            >
            Tipo de combustible {getSortIcon('fuel_type')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('make')}
                          data-tooltip-content={'Ordenar por marca'}
              data-tooltip-id='tooltip'
            >
            Marca {getSortIcon('make')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('model')}
                          data-tooltip-content={'Ordenar por modelo'}
              data-tooltip-id='tooltip'
            >
            Modelo {getSortIcon('model')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('year')}
                          data-tooltip-content={'Ordenar por año'}
              data-tooltip-id='tooltip'
            >
            Año {getSortIcon('year')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('transmission')}
                          data-tooltip-content={'Ordenar por tipo de transmisión'}
              data-tooltip-id='tooltip'
            >
            Tipo de transmisión {getSortIcon('transmission')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('city_mpg')}
                          data-tooltip-content={'Ordenar por rendimiento en ciudad'}
              data-tooltip-id='tooltip'
            >
            Consumo en ciudad {getSortIcon('city_mpg')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('highway_mpg')}
                          data-tooltip-content={'Ordenar por rendimiento en carretera'}
              data-tooltip-id='tooltip'
            >
            Consumo en carretera {getSortIcon('highway_mpg')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white w-40' onClick={() => handleSort('combination_mpg')}
                          data-tooltip-content={'Ordenar por rendimiento mixto'}
              data-tooltip-id='tooltip'
            >
            Consumo mixto {getSortIcon('combination_mpg')}
          </th>
        </tr>
      </thead>
      <tbody>
        {carList.length < 1 ? (
          <tr>
            <td colSpan="9" className='text-center capitalize text-white pt-3 font-semibold'>
              No existen coincidencias
            </td>
          </tr>
        ) : (
          carList.map((car, index) => (
            <tr key={index} className='capitalize bg-white hover:bg-[#1393ce] hover:text-white'
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
<Tooltip id="tooltip" />
    </table>
  );
};

export default CarTableComponent;
