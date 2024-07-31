import React, { useState } from 'react';
import {
  ButtonPrincipalComponent,
  ButtonSecondaryComponent
} from '../components';
import { inputSelect, inputCheckboxLabel } from '../utils/tailwindClasses';

export default function FilterForm({ onFilter, onClose }) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const minCity = 13;
  const maxCity = 23;
  const minHighway = 19;
  const maxHighway = 33;
  const minCombo = 15;
  const maxCombo = 27;
  const [selectedCityMpg, setSelectedCityMpg] = useState(minCity);
  const [selectedHighwayMpg, setSelectedHighwayMpg] = useState(minHighway);
  const [selectedCombinationMpg, setSelectedCombinationMpg] = useState(minCombo);

  const filters = {
    type: ['midsize car', 'subcompact car', 'compact car'],
    make: ['audi', 'buick', 'cadillac', 'chevrolet', 'chrysler', 'cx automotive', 'dodge', 'ford', 'hyundai', 'mercury', 'nissan', 'subaru', 'toyota', 'volkswagen'],
    model: ['100', 'century', 'regal', 'riviera', 'eldorado', 'seville', 'lumina', 'new yorker', 'xm v6', 'xm v6a', 'charger', 'dynasty', 'spirit', 'taurus', 'taurus sho', 'sonata', 'sable', 'maxima', 'loyale', 'corolla', 'golf iii / gti', 'jetta iii'],
    year: [1993, 1985],
    transmission: ['a', 'm'],
    cityMpg: [17, 21, 18, 15, 13, 23, 19, 22, 16, 20],
    highwayMpg: [22, 24, 28, 26, 25, 27, 23, 19, 33, 29, 31, 30],
    combinationMpg: ['19', '23', '21', '20', '18', '17', '15', '27', '25', '22', '24', '26'],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    switch (name) {
      case 'type':
        setSelectedType(value);
        break;
      case 'make':
        setSelectedMake(value);
        break;
      case 'model':
        setSelectedModel(value);
        break;
      case 'year':
        setSelectedYear(value);
        break;
      case 'transmission':
        setSelectedTransmission(value);
        break;
      case 'cityMpg':
        setSelectedCityMpg(numericValue);
        break;
      case 'highwayMpg':
        setSelectedHighwayMpg(numericValue);
        break;
      case 'combinationMpg':
        setSelectedCombinationMpg(numericValue);
        break;
      default:
        break;
    }
  };

  const handleApplyFilters = () => {
    onFilter({
      type: selectedType,
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
      transmission: selectedTransmission,
      city_mpg: selectedCityMpg,
      highway_mpg: selectedHighwayMpg,
      combination_mpg: selectedCombinationMpg
    });
    onClose();
  };

  return (
    <form className='flex flex-col'>
      <div className='flex justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Tipo de auto:
          <select name="type" className={`${inputSelect}`} value={selectedType} onChange={handleFilterChange}>
            <option value="">Seleccione el tipo de auto</option>
            {filters.type.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Año:
          <select name="year" className={`${inputSelect}`} value={selectedYear} onChange={handleFilterChange}>
            <option value="">Seleccione el año</option>
            {filters.year.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Marca:
          <select name="make" className={`${inputSelect}`} value={selectedMake} onChange={handleFilterChange}>
            <option value="">Seleccione la marca</option>
            {filters.make.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Modelo:
          <select name="model" className={`${inputSelect}`} value={selectedModel} onChange={handleFilterChange}>
            <option value="">Seleccione el modelo</option>
            {filters.model.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Tipo de transmisión:
          <select name="transmission" className={`${inputSelect}`} value={selectedTransmission} onChange={handleFilterChange}>
            <option value="">Seleccione la transmisión</option>
            {filters.transmission.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </label>

        <div className='flex-1'></div>
      </div>

      <div className='flex justify-center gap-5 text-center mb-3'>
          <label className={`${inputCheckboxLabel}`}>
          Consumo mínimo en ciudad:&nbsp;
          <span>{selectedCityMpg}</span>
          <div className='flex'>
            <span>{minCity}</span>&nbsp;
            <input
              name="cityMpg"
              type='range'
              value={selectedCityMpg}
              onChange={handleFilterChange}
              min={minCity}
              max={maxCity}
            />&nbsp;
            <span>{maxCity}</span>
          </div>
        </label>

        <label className={`${inputCheckboxLabel}`}>
          Consumo mínimo en carretera:&nbsp;
          <span>{selectedHighwayMpg}</span>
          <div className='flex'>
            <span>{minHighway}</span>&nbsp;
            <input
              name="highwayMpg"
              type='range'
              value={selectedHighwayMpg}
              onChange={handleFilterChange}
              min={minHighway}
              max={maxHighway}
            />&nbsp;
            <span>{maxHighway}</span>
          </div>
        </label>

        <label className={`${inputCheckboxLabel}`}>
          Consumo mixto mínimo:&nbsp;
          <span>{selectedCombinationMpg}</span>
          <div className='flex'>
            <span>{minCombo}</span>&nbsp;
            <input
              name="combinationMpg"
              type='range'
              value={selectedCombinationMpg}
              onChange={handleFilterChange}
              min={minCombo}
              max={maxCombo}
              />&nbsp;
              <span>{maxCombo}</span>
          </div>
        </label>
      </div>

      <div className='flex w-100 justify-between mt-5'>
        <ButtonSecondaryComponent type="button" onClick={() => onClose()}>
          Cancelar
        </ButtonSecondaryComponent>
        <ButtonPrincipalComponent type="button" onClick={handleApplyFilters}>
          Aplicar
        </ButtonPrincipalComponent>
      </div>
    </form>
  );
}
