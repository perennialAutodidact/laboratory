import React, { useState, useEffect, useRef } from "react";
import { Trie } from "./autoComplete";
import titleize from "../../../../utilities/titleize";
import useKeyPress from "../../../../utilities/useKeyPress";

const Option = ({ label, id, selected }) => {
  return (
    <div className={"auto-complete-option " + (selected ? "selected" : "")}>
      <span id={id}>{titleize(label)}</span>
    </div>
  );
};

// formDataSetter - the function to update parent state
// allOptions - list of options for autocomplete
// fieldName - name of the input field
const AutoCompleteSelect = ({ formDataSetter, allOptions, fieldName }) => {
  const [state, setState] = useState({
    query: "",
    results: [],
    trie: new Trie(),
    selectedOption: 0,
  });
  const { query, results, trie, selectedOption } = state;

  // detect if up or down arrow is pressed
  const upKeyPress = useKeyPress("ArrowUp");
  const downKeyPress = useKeyPress("ArrowDown");
  const enterKeyPress = useKeyPress("Enter");

  let optionRef = useRef(null);

  const updateResults = (results) => {
    setState({
      ...state,
      results: results,
    });
  };

  // when the form input updates
  const onChange = (e) => {
    setState({ ...state, query: e.target.value });
  };

  const onKeyPress = (key) => {
    switch (key) {
      case "up":
        if (selectedOption > 0) {
          setState({
            ...state,
            selectedOption: selectedOption - 1,
          });
        }
      case "down":
        if (selectedOption < 5) {
          setState({
            ...state,
            selectedOption: selectedOption + 1,
          });
        }
      case "enter":
        setState({
          ...state,
        });
    }
  };

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      allOptions.forEach((option) => {
        trie.addWords(option.label.toLowerCase());
      });
    }
  }, []);

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    if (query === "") {
      // reset results if query is blank
      updateResults([]);
    } else if (query !== "") {
      let newResults = trie.find(query.toLowerCase());
      updateResults(newResults);
      formDataSetter(newResults);
    }
  }, [query]);

  // change the selected auto complete option using arrow keys
  useEffect(() => {
    if (upKeyPress) {
      onKeyPress("up");
    } else if (downKeyPress) {
      onKeyPress("down");
    } else if (enterKeyPress) {
      onKeyPress("enter");
    }
  }, [upKeyPress, downKeyPress, enterKeyPress]);

  return (
    <div id="auto-complete-select">
      <input type="text" name={fieldName} value={query} onChange={onChange} />

      {results.length > 0 ? (
        <div className="auto-complete-options" ref={el => optionRef=el}>
          {/* display the first 6 options */}
          {results.map((label, i) =>
            i < 6 ? (
              <Option
                label={label}
                id={i}
                key={i}
                selected={selectedOption === i}
              />
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AutoCompleteSelect;
