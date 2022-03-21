import React from 'react';
import './fromStyles.css'
import FirstStep from './FirstStep'

import Progress from './Progress';
const Header = () => (
    <div>
        <h1>Multi Step Registration</h1>
        <Progress />
        {/* <FirstStep /> */}
    </div>
);

export default Header;