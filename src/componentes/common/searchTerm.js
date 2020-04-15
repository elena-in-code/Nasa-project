import React from 'react';
import PropTypes from 'prop-types'; 

// import './searchTerm.scss';

const SearchTerm = props => {
  const { searchTerm } = props;
  
  return (
    <div className='searchTerm__wrapper'>
      <p>{`Results for: ${searchTerm}`}</p>
    </div>
  );
};

SearchTerm.propTypes = {
  searchTerm: PropTypes.string
}

SearchTerm.defaultProps = {
  searchTerm: ''
};

export default SearchTerm;
