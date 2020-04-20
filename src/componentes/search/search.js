import React, { useState } from 'react';

import Form from '../common/form';
import Card from '../common/card';
import SearchTerm from '../common/searchTerm';
import Message from '../common/message';
import RadioButton from '../common/radioButton';

import './search.scss';

const nasaURL = 'https://images-api.nasa.gov/search?q=';

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [radioButtonSelection, setRadioButtonSelection] = useState('all');

  const mediaTypeURL =
    radioButtonSelection !== 'all' ? `&media_type=${radioButtonSelection}` : '';

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (inputValue) {
      setLoading(true);
      fetch(nasaURL + inputValue + mediaTypeURL).then((response) =>
        response
          .json()
          .then((data) => {
            setItems(data.collection.items);
            setLoading(false);
          })
          .catch((error) => console.log(error))
      );
    }
    return setSubmitted(true);
  };

  const renderMessage = () => {
    if (loading)
      return <Message messageText="Loading..." messageStatusClassName="info" />;
    if (submitted && inputValue && items.length === 0)
      return (
        <Message
          messageText="There is no results for your search, please reset your search and try again"
          messageStatusClassName="warning"
        />
      );
    if (!inputValue)
      return (
        <Message
          messageText="Please insert text to start searching"
          messageStatusClassName="info"
        />
      );
  };

  const handleReset = () => {
    setItems([]);
    setInputValue('');
    setShowInput(true);
    setSubmitted(false);
  };

  const renderSearchResults = () => {
    if (items) {
      const getCardComponent = items.map((item) => {
        const { data, links } = item;
        const { title, description, nasa_id } = data[0];
        return (
          <Card
            key={nasa_id}
            cardTitle={title}
            image={links ? links[0].href : ''}
            imageAlt={title}
            description={description}
          />
        );
      });
      return getCardComponent;
    }
  };

  const handleRadioButtonChange = (event) => {
    if (event && event.target.checked) {
      setRadioButtonSelection(event.target.value);
    }
  };

  return (
    <div className="search__container">
      <Form
        onClick={
          items.length === 0 ? () => handleSubmit() : () => handleReset()
        }
        onChange={handleChange}
        value={inputValue}
        buttonText={items.length === 0 ? 'Search' : 'Reset Search'}
        showInput={items.length === 0 && showInput}
      />
      {items.length === 0 && (
        <RadioButton
          checked={radioButtonSelection}
          onChange={handleRadioButtonChange}
        />
      )}
      {renderMessage()}
      {items.length !== 0 && <SearchTerm searchTerm={inputValue} />}
      <div className="search-results__container">
        {items.length !== 0 && renderSearchResults()}
      </div>
    </div>
  );
};

export default Search;
