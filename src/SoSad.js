import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinTongueWink } from '@fortawesome/free-solid-svg-icons'

const SoSad = () => {
    return (
        <div className='errorBox' >        
            <p><FontAwesomeIcon icon={faGrinTongueWink}/>   Something wrong. Sorry</p>
        </div>
    );
}

export { SoSad };