import React, { useState, useEffect } from 'react';
import {
  ButtonPrincipalComponent,
  ButtonSecondaryComponent
} from '../components';
import { 
  inputSelect, 
  inputCheckboxLabel } from '../utils';
import { Tooltip } from 'react-tooltip';
import { useFilters } from '../contexts/FilterContext';

export default function FilterForm({ onFilter, onClose }) {
  const { filters, filterOptions } = useFilters();
  const [selectedType, setSelectedType] = useState(filters.type || '');
  const [selectedMake, setSelectedMake] = useState(filters.make || '');
  const [selectedModel, setSelectedModel] = useState(filters.model || '');
  const [selectedYear, setSelectedYear] = useState(filters.year || '');
  const [selectedTransmission, setSelectedTransmission] = useState(filters.transmission || '');

  const minCity = Math.min(...filterOptions.cityMpg);
  const maxCity = Math.max(...filterOptions.cityMpg);
  const minHighway = Math.min(...filterOptions.highwayMpg);
  const maxHighway = Math.max(...filterOptions.highwayMpg);
  const minCombo = Math.min(...filterOptions.combinationMpg);
  const maxCombo = Math.max(...filterOptions.combinationMpg);

  const [selectedCityMpg, setSelectedCityMpg] = useState(filters.city_mpg || minCity);
  const [selectedHighwayMpg, setSelectedHighwayMpg] = useState(filters.highway_mpg || minHighway);
  const [selectedCombinationMpg, setSelectedCombinationMpg] = useState(filters.combination_mpg || minCombo);

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

  useEffect(() => {
    setSelectedType(filters.type || '');
    setSelectedMake(filters.make || '');
    setSelectedModel(filters.model || '');
    setSelectedYear(filters.year || '');
    setSelectedTransmission(filters.transmission || '');
    setSelectedCityMpg(filters.city_mpg || minCity);
    setSelectedHighwayMpg(filters.highway_mpg || minHighway);
    setSelectedCombinationMpg(filters.combination_mpg || minCombo);
  }, [filters, minCity, minHighway, minCombo]);

  return (
    <form className='flex flex-col w-screen md:w-full px-5 md:p-0'>
      <div className='flex flex-col md:flex md:flex-row justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} md:mb-3 flex-1`}
          data-tooltip-content={'Filtrar por tipo de auto'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          Tipo de auto:
          <select name="type" className={`${inputSelect}`} value={selectedType} onChange={handleFilterChange}>
            <option value="">Seleccione el tipo de auto</option>
            {filterOptions.type.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}
          data-tooltip-content={'Filtrar por año'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          Año:
          <select name="year" className={`${inputSelect}`} value={selectedYear} onChange={handleFilterChange}>
            <option value="">Seleccione el año</option>
            {filterOptions.year.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex flex-col md:flex md:flex-row justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} md:mb-3 flex-1`}
          data-tooltip-content={'Filtrar por marca'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          Marca:
          <select name="make" className={`${inputSelect}`} value={selectedMake} onChange={handleFilterChange}>
            <option value="">Seleccione la marca</option>
            {filterOptions.make.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}
          data-tooltip-content={'Filtrar por modelo'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          Modelo:
          <select name="model" className={`${inputSelect}`} value={selectedModel} onChange={handleFilterChange}>
            <option value="">Seleccione el modelo</option>
            {filterOptions.model.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </label>
      </div>

      <div className='flex flex-col md:flex md:flex-row justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} mb-3 flex-1`}
          data-tooltip-content={'Filtrar por transmisión'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          Tipo de transmisión:
          <select name="transmission" className={`${inputSelect}`} value={selectedTransmission} onChange={handleFilterChange}>
            <option value="">Seleccione la transmisión</option>
            {filterOptions.transmission.map(transmission => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </label>

        <div className='flex-1'></div>
      </div>

      <div className='flex flex-col md:flex md:flex-row justify-center items-center gap-5 text-center mb-3'>
        <label className={`${inputCheckboxLabel}`}
          data-tooltip-content={'Filtrar por consumo mínimo en ciudad'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
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

        <label className={`${inputCheckboxLabel}`}
          data-tooltip-content={'Filtrar por consumo mínimo en carretera'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
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

        <label className={`${inputCheckboxLabel}`}
          data-tooltip-content={'Filtrar por consumo mixto mínimo'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
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

      <div className='flex flex-col-reverse justify-center gap-5 md:flex md:flex-row md:justify-between mt-5'>
        <div
          className='flex'
          data-tooltip-content={'Cierra el formulario sin cambios'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          <ButtonSecondaryComponent className={'flex-1'} type="button" onClick={() => onClose()}>
            Cancelar
          </ButtonSecondaryComponent>
        </div>
        <div
          className='flex'
          data-tooltip-content={'Aplica los filtros a los resultados'}
          data-tooltip-id='tooltip'
          data-tooltip-place='bottom'
        >
          <ButtonPrincipalComponent className={'flex-1'} type="button" onClick={handleApplyFilters}>
            Aplicar
          </ButtonPrincipalComponent>
        </div>
      </div>
      <Tooltip id='tooltip' />
    </form>
  );
}
