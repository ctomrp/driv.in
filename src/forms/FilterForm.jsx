import React, { useState, useEffect } from 'react';
import {
  ButtonPrincipalComponent,
  ButtonSecondaryComponent
} from '../components';
import { inputSelect, inputCheckboxLabel } from '../utils/tailwindClasses';
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
    <form className='flex flex-col'>
      <div className='flex justify-center w-full gap-5'>
        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Tipo de auto:
          <select name="type" className={`${inputSelect}`} value={selectedType} onChange={handleFilterChange}>
            <option value="">Seleccione el tipo de auto</option>
            {filterOptions.type.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Año:
          <select name="year" className={`${inputSelect}`} value={selectedYear} onChange={handleFilterChange}>
            <option value="">Seleccione el año</option>
            {filterOptions.year.map(year => (
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
            {filterOptions.make.map(make => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </label>

        <label className={`${inputCheckboxLabel} mb-3 flex-1`}>
          Modelo:
          <select name="model" className={`${inputSelect}`} value={selectedModel} onChange={handleFilterChange}>
            <option value="">Seleccione el modelo</option>
            {filterOptions.model.map(model => (
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
            {filterOptions.transmission.map(transmission => (
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
