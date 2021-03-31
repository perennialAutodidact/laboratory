import React, { useState, useEffect, useRef } from "react";
import { Trie } from "./autoComplete";
import titleize from "../../../../utilities/titleize";
import useKeyPress from "../../../../utilities/useKeyPress";
import { CgKeyhole } from "react-icons/cg";

const Option = ({ label, id, selected, first, last }) => {
  let optionRef = useRef(null);

  return (
    <div
      className={
        "auto-complete-option " +
        (selected ?    "selected " : "") +
        (   first ? "first-option" : "") +
        (    last ?  "last-option" : "")
      }
      ref={(el) => (optionRef = el)}
    >
      <span id={id}>
        {titleize(label)}
      </span>
    </div>
  );
};

/**
 * @param {function} formDataSetter - the function to update the select's value in the parent form
 * @param {Object[]} allOptions - list of options for autocomplete
 * @param {string} fieldName - name attribute of the select field
 * @param {number} optionsShown - number of select options to display
 *
 */
// formDataSetter - the function to update the select's value in the parent form
// allOptions - list of options for autocomplete
// fieldName - name of the input field
const AutoCompleteSelect = ({allOptions, fieldName, formDataSetter, optionsShown}) => {
  const [state, setState] = useState({
    firstOption: 0,
    lastOption: 5,
    selectedValue: null,
  });

  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(3);
  const [trie] = useState(new Trie());
  const [results, setResults] = useState([]);

  // detect if up or down arrow is pressed
  const upKeyPress = useKeyPress("ArrowUp");
  const downKeyPress = useKeyPress("ArrowDown");
  const enterKeyPress = useKeyPress("Enter");

  // change 'query' in state when input value changes
  const onChange = (e) => {
    setQuery(e.target.value);
    setSelectedOption(0);
  };

  // update which select options are shown based on the currently selected option
  const updateOptions = () => {

  }

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      // add individual words to trie rather than all at once
      // in order to add each as a lowercase word, rather than the whole object
      props.allOptions.forEach((option) => {
        trie.addWords(option.label.toLowerCase());
      });
    }
  }, [props.allOptions, trie]);

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    let newResults;
    if (query === "") {
      newResults = [];
    } else {
      newResults = trie.find(query.toLowerCase());
    }
    formDataSetter(query);
    setResults(newResults);
  }, [query, formDataSetter, trie]);

  // change the selected auto complete option using arrow keys
  useEffect(() => {
    if (upKeyPress) {
      if (selectedOption > 0) {
        setSelectedOption(selectedOption - 1);
      }
    } else if (downKeyPress) {
      if (
        selectedOption < props.optionsShown - 1 &&
        selectedOption < results.length - 1
      ) {
        setSelectedOption(selectedOption + 1);
      } else if(selectedOption === state.firstOption + props.optionsShown){
        alert('lala')
      }
    } else if (enterKeyPress) {
      console.log("enter pressed");
    }
  }, [
    selectedOption,
    props.optionsShown,
    results,
    upKeyPress,
    downKeyPress,
    enterKeyPress,
  ]);

  return (
    <div id="auto-complete-select">
      <input
        type="text"
        name={props.fieldName}
        value={query}
        onChange={onChange}
      />

      {results && results.length > 0 ? (
        <div className="auto-complete-options">
          {/* display the first 6 options */}
          {results.map((label, i) =>
            i < 100 ? (
              <Option
                label={label}
                id={i}
                key={i}
                selected={selectedOption === i}
                first={state.firstOption === i}
                last={state.lastOption === i}
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
