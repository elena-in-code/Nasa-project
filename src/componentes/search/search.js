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
  const [cards, setCards] = useState([]);
  const [showInput, setShowInput] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [radioButtonSelection, setRadioButtonSelection] = useState('all');

  const mediaTypeURL =
    radioButtonSelection !== 'all' ? `&media_type=${radioButtonSelection}` : '';

  const fetchData = async () => {
    let dataResponse = await fetch(nasaURL + inputValue + mediaTypeURL);
    let dataResponseJson = await dataResponse.json();

    const rawItems = dataResponseJson.collection.items;
    let cardCollection = await Promise.all(
      rawItems.map(async (item) => {
        const { data, links, href } = item;
        const { title, description, nasa_id, media_type } = data[0];
        const imageLink = links ? links[0].href : '';
        let audioLink;

        if (media_type === 'audio') {
          let audioResponse = await fetch(href);
          let audioResponseJson = await audioResponse.json();
          audioLink = audioResponseJson[0];
        }
        const card = {
          title,
          description,
          nasaId: nasa_id,
          imageLink,
          audio: audioLink,
        };
        return card;
      })
    );
    setLoading(false);
    setCards(cardCollection);
  };

  const handleSubmit = () => {
    if (inputValue) {
      setLoading(true);
      fetchData();
    }
    return setSubmitted(true);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setSubmitted(false);
  };

  const handleReset = () => {
    setCards([]);
    setInputValue('');
    setShowInput(true);
    setSubmitted(false);
  };

  const handleRadioButtonChange = (event) => {
    if (event && event.target.checked) {
      setRadioButtonSelection(event.target.value);
    }
  };

  const renderMessage = () => {
    if (loading)
      return <Message messageText="Loading..." messageStatusClassName="info" />;
    if (submitted && inputValue && cards.length === 0)
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

  const renderSearchResults = () => {
    if (cards) {
      const getCardComponent = cards.map((card) => {
        const { imageLink, title, description, nasaId, audio } = card;
        return (
          <Card
            key={nasaId}
            cardTitle={title}
            image={imageLink}
            imageAlt={title}
            description={description}
            audio={audio}
          />
        );
      });
      return getCardComponent;
    }
  };

  return (
    <div className="search__container">
      <Form
        onClick={
          cards.length === 0 ? () => handleSubmit() : () => handleReset()
        }
        onChange={handleChange}
        value={inputValue}
        buttonText={cards.length === 0 ? 'Search' : 'Reset Search'}
        showInput={cards.length === 0 && showInput}
      />
      {cards.length === 0 && (
        <RadioButton
          checked={radioButtonSelection}
          onChange={handleRadioButtonChange}
        />
      )}
      {renderMessage()}
      {cards.length !== 0 && <SearchTerm searchTerm={inputValue} />}
      <div className="search-results__container">
        {cards.length !== 0 && renderSearchResults()}
      </div>
    </div>
  );
};

export default Search;
