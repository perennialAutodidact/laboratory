import React, { useState, useEffect, useRef, useCallback } from "react";
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

/**
 * @param {function} formDataSetter -
 * @param {Object[]} allOptions - list of options for autocomplete
 * @param {string} fieldName - name attribute of the select field
 *
 */
// formDataSetter - the function to update the select's value in the parent form
// allOptions - list of options for autocomplete
// fieldName - name of the input field
const AutoCompleteSelect = ({ formDataSetter, allOptions, fieldName }) => {
  const [state, setState] = useState({
    query: "",
    results: [],
    trie: new Trie(),
    firstOption: 0,
    lastOption: 5,
    selectedOption: 0,
    selectedValue: null,
    keyPressed: null,
  });
  const { query, results, trie, selectedOption } = state;

  // detect if up or down arrow is pressed
  const upKeyPress = useKeyPress("ArrowUp");
  const downKeyPress = useKeyPress("ArrowDown");
  const enterKeyPress = useKeyPress("Enter");

  let optionRef = useRef(null);
  let maxOptions = 5;

  // apply state changes to results array
  const updateResults = useCallback((results) => {
    setState((state) => ({
      ...state,
      results: results,
    }));
  }, []);

  // change 'query' in state when input value changes
  const onChange = (e) => {
    setState({ ...state, query: e.target.value, selectedOption: 0 });
  };

  // update the parent form and results array for this component
  const updateFormData = useCallback(() => {
    let newResults;
    if (query === "") {
      newResults = [];
    } else {
      newResults = trie.find(query.toLowerCase());
    }
    formDataSetter(query);
    updateResults(newResults);
  }, [query, formDataSetter, updateResults, trie]);

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      allOptions.forEach((option) => {
        trie.addWords(option.label.toLowerCase());
      });
    }
  }, [allOptions, trie]);

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    if (query === "") {
      // reset results if query is blank
      updateFormData();
    } else if (query !== "") {
      updateFormData();
    }
  }, [query, updateFormData]);

  // change the selected auto complete option using arrow keys
  useEffect(() => {
    const updateOptions = ({ selectedOption }) => {
      console.log(selectedOption);

      setState({
        ...state,
        selectedOption: selectedOption,
      });
    };

    console.log(state.selectedOption);

    if (upKeyPress) {
      if (state.selectedOption > 0) {
        updateOptions(state.selectedOption - 1);
        // setState(s => ({
        //   ...s,
        //   selectedOption: selectedOption - 1,
        // }));
      }
    } else if (downKeyPress) {
      console.log(state.selectedOption);

      if (
        state.selectedOption < maxOptions &&
        state.selectedOption < results.length - 1
      ) {
        updateOptions(state.selectedOption + 1);

        // setState(s=>({
        //   ...s,
        //   selectedOption: selectedOption + 1,
        // }));
      }
    } else if (enterKeyPress) {
      console.log("enter pressed");
      // onKeyPress("enter");
    }
  }, [upKeyPress, downKeyPress, enterKeyPress, maxOptions, results, state]);

  return (
    <div id="auto-complete-select">
      <input type="text" name={fieldName} value={query} onChange={onChange} />

      {results && results.length > 0 ? (
        <div className="auto-complete-options" ref={(el) => (optionRef = el)}>
          {/* display the first 6 options */}
          {results.map((label, i) =>
            i <= 100 ? (
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
