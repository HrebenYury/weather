import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchCity extends React.Component{        
    render(){
        const {changeHalndler, value, submit} = this.props;
        return(
            <>
            <form className="searchPlaceForm" onSubmit={submit}>            
                <input  type="text" placeholder="enter your city" onChange={changeHalndler} value={value}/>
                <span type="submit"  onClick={submit} ><FontAwesomeIcon icon={faSearch}/></span>
            </form>
            </>
        )
    }
}

export {SearchCity};