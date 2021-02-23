import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { Trie } from "./autoComplete";

const Option = ({ label }) => {
  return (
    <div className="option">
      <span>{label}</span>
    </div>
  );
};

const AutoCompleteSelect = ({ allOptions, fieldName, value }) => {
  const [state, setState] = useState({
    query: "",
    results: [],
    trie: new Trie(),
  });
  const { query, results, trie } = state;


  const updateResults = (e) => {
    setState({
      ...state,
      results: results,
    });
  };

  const onChange = (e) => {
    
    setState({...state, query:e.target.value})
    console.log('query', query);
    // let results = trie.find(query);
    // updateResults(results);
  };

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      allOptions.forEach((option) => {
        trie.addWords(option.label.toLowerCase());
      });
    }
  }, []);

  useEffect(() => {
    let newResults = trie.find(query)
  }, [query])

  return (
    <input
      type="text"
      id="auto-complete-select"
      name={fieldName}
      value={query}
      onChange={onChange}
    />
  );
};

export default AutoCompleteSelect;
