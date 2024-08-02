import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import logo from '/logo.png';

function TitleComponent({ title, children }) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col xl:flex xl:flex-row justify-center items-center w-full mb-24 bg-[#EEF4F8] p-5'>
            <div className='hidden flex-1 xl:flex justify-center align-middle'>
                <img src={`${logo}`} width={'96px'} className='p-3 cursor-pointer' onClick={() => navigate('/')} alt=""
                    data-tooltip-content={'Home'}
                    data-tooltip-id='tooltip'
                    data-tooltip-place='bottom'
                />
            </div>
            <div className='flex-1 flex justify-center align-middle'>
                <h1 className='text-[#001E2C] text-3xl font-semibold p-5 text-center select-none uppercase'>{title}</h1>
            </div>
            <Tooltip id='tooltip' />
            <div className='flex-1 flex justify-center align-middle items-center'>
                {children}
            </div>
        </div>
    )
}

export default TitleComponent