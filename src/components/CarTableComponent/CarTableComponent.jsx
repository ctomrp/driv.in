import { CaretUpSquareFill, CaretDownSquareFill } from 'react-bootstrap-icons';

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
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('class')}>
            Tipo de auto {getSortIcon('class')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('fuel_type')}>
            Tipo de combustible {getSortIcon('fuel_type')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('make')}>
            Marca {getSortIcon('make')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('model')}>
            Modelo {getSortIcon('model')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('year')}>
            Año {getSortIcon('year')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('transmission')}>
            Tipo de transmisión {getSortIcon('transmission')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('city_mpg')}>
            Consumo en ciudad {getSortIcon('city_mpg')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('highway_mpg')}>
            Consumo en carretera {getSortIcon('highway_mpg')}
          </th>
          <th className='bg-[#001E2C] hover:bg-[#0073A9] text-white' onClick={() => handleSort('combination_mpg')}>
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
  );
};

export default CarTableComponent;
