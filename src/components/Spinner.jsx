import React  from 'react';
import loading from '../loading.gif'

const Spinner=()=>  {
  
    return( <div >
        <img className="rounded mx-auto d-block"src={loading} alt="loading" />
    </div>
    )
  
}

export default Spinner;
