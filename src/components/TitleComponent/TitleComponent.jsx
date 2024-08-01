import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import logo from '/logo.png';

function TitleComponent({title}) {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center w-full mb-24'>
            <img src={`${logo}`} width={'96px'} className='absolute invisible md:visible left-24 p-3 cursor-pointer' onClick={()=>navigate('/')} alt=""
            data-tooltip-content={'Home'}
            data-tooltip-id='tooltip'
            data-tooltip-place='bottom'
            />
            <h1 className='text-white text-3xl font-semibold p-5 text-center select-none'>{title}</h1>
            <Tooltip id='tooltip' />
        </div>
    )
}

export default TitleComponent