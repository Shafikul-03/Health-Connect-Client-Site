import React from 'react';

import Bmi from './Bmi';

const Calculators = () => {
    return (
        <div>
         
            <div className='flex flex-wrap m-5 justify-center'>
                <div className='w-1/2 h-1/2'>
                    <Bmi />
                </div>
            </div>
        </div>
    );
};

export default Calculators;