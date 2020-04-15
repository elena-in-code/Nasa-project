import React, { useState } from 'react';

import Form from '../common/form';
import Card from '../common/card';
import SearchTerm from '../common/searchTerm';

import './search.css';

const nasaURL = 'https://images-api.nasa.gov/search?q=';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [collection, setCollection] = useState([]);
  const [showInput, setShowInput] = useState(true);

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if(inputValue){
      fetch(nasaURL+inputValue)
        .then(response => response.json()
        .then(data => setCollection(data.collection))
        .catch((error) => console.log(error))
        );
    }
    return console.log("nothing here");
  };

  const handleReset = () => {
    setCollection([]);
    setInputValue('');
    setShowInput(true);
  }
  
  const renderSearchResults = () => {
    if (collection && collection.items){
        const { items } = collection;
        const getCardComponent = items.map(item => {
          const { data, links } = item;
          const { title, description } = data[0];
          return <Card key={title} cardTitle={title} image={links ? links[0].href : ''} imageAlt={title} description={description} />;
        });
      
      return getCardComponent;
    }
  };

  return (
    <div className="search__container">
      <Form 
        onClick={collection.length === 0 ? () => handleSubmit(): () => handleReset()} 
        onChange={handleChange} 
        value={inputValue} 
        buttonText={collection.length === 0 ? "Search" : "Reset Search"}
        showInput = {collection.length === 0 && showInput}
      />
      {collection.length !== 0 && <SearchTerm searchTerm={inputValue} />}
      <div className='search-results__container'>
        {collection.length !== 0 && renderSearchResults()}
      </div>
    </div>
  );
};

export default Search;
