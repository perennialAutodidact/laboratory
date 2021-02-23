import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import { Trie } from './autoComplete';

const Option = ({ label }) => {
  return (
    <div className='option'>
      <span>{label}</span>
    </div>
  );
};

const AutoCompleteSelect = ({ allOptions, fieldName }) => {
  const [state, setState] = useState({
    query: '',
    results: [],
    trie: new Trie(),
  });
  const { query, results, trie } = state;

  // when the form input updates
  const onChange = e => {
    setState({ ...state, query: e.target.value });
    console.log('query', query);
  };

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      allOptions.forEach(option => {
        trie.addWords(option.label.toLowerCase());
      });
    }
  }, []);

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    let newResults = trie.find(query);
    console.log(newResults);
  }, [query]);

  return (
    <input
      type='text'
      id='auto-complete-select'
      name={fieldName}
      value={query}
      onChange={onChange}
    />
  );
};

export default AutoCompleteSelect;
