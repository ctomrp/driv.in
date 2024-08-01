import { Tooltip } from "react-tooltip";

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage, className }) => {
  const getVisiblePages = (current, total) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, index) => index + 1);
    } else if (current <= 3) {
      return [1, 2, 3, 4, 5];
    } else if (current >= total - 2) {
      return [total - 4, total - 3, total - 2, total - 1, total];
    } else {
      return [current - 2, current - 1, current, current + 1, current + 2];
    }
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handleFirst = () => {
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLast = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-[#001E2C] uppercase align-middle transition-all rounded-lg select-none hover:bg-[#EEF4F8] active:bg-[#EEF4F8] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-tooltip-content={'Ir a la primera página'}
          data-tooltip-id="tooltip"
          data-tooltip-place="top"
        >
          Inicio
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-[#001E2C] uppercase align-middle transition-all rounded-lg select-none hover:bg-[#EEF4F8] active:bg-[#EEF4F8] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-tooltip-content={'Volver a la página anterior'}
          data-tooltip-id="tooltip"
          data-tooltip-place="top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => handleClick(number)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all ${currentPage === number
                ? 'bg-[#001E2C] text-white shadow-md shadow-[#EEF4F8] hover:shadow-lg hover:shadow-[#EEF4F8]'
                : 'text-[#001E2C] hover:bg-[#EEF4F8] active:bg-[#EEF4F8]'
                } disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
              type="button"
              data-tooltip-content={`Ir a la página ${number}`}
              data-tooltip-id="tooltip"
              data-tooltip-place="top"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {number}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-[#001E2C] uppercase align-middle transition-all rounded-lg select-none hover:bg-[#EEF4F8] active:bg-[#EEF4F8] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-tooltip-content={'Avanzar a la página siguiente'}
          data-tooltip-id="tooltip"
          data-tooltip-place="top"
        >
          Siguiente
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-[#001E2C] uppercase align-middle transition-all rounded-lg select-none hover:bg-[#EEF4F8] active:bg-[#EEF4F8] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-tooltip-content={'Ir a la última página'}
          data-tooltip-id="tooltip"
          data-tooltip-place="top"
        >
          Fin
        </button>
      </div>
      <Tooltip id="tooltip" />
    </div>
  );
};

export default PaginationComponent;
