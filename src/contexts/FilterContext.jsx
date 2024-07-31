import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

const filterOptions = {
    type: ['midsize car', 'subcompact car', 'compact car'],
    make: ['audi', 'buick', 'cadillac', 'chevrolet', 'chrysler', 'cx automotive', 'dodge', 'ford', 'hyundai', 'mercury', 'nissan', 'subaru', 'toyota', 'volkswagen'],
    model: ['100', 'century', 'regal', 'riviera', 'eldorado', 'seville', 'lumina', 'new yorker', 'xm v6', 'xm v6a', 'charger', 'dynasty', 'spirit', 'taurus', 'taurus sho', 'sonata', 'sable', 'maxima', 'loyale', 'corolla', 'golf iii / gti', 'jetta iii'],
    year: [1993, 1985],
    transmission: ['a', 'm'],
    cityMpg: [13, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    highwayMpg: [19, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33],
    combinationMpg: [15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
};

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        type: '',
        make: '',
        model: '',
        year: '',
        transmission: '',
        cityMpg: Math.min(...filterOptions.cityMpg),
        highwayMpg: Math.min(...filterOptions.highwayMpg),
        combinationMpg: Math.min(...filterOptions.combinationMpg)
    });

    const applyFilters = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    const resetFilters = () => {
        setFilters({
            type: '',
            make: '',
            model: '',
            year: '',
            transmission: '',
            cityMpg: Math.min(...filterOptions.cityMpg),
            highwayMpg: Math.min(...filterOptions.highwayMpg),
            combinationMpg: Math.min(...filterOptions.combinationMpg)
        });
    };

    return (
        <FilterContext.Provider value={{ filters, applyFilters, resetFilters, filterOptions }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FilterContext);
};
