import React, { useState, useEffect, useRef } from "react";
import { Trie } from "./autoComplete";
import titleize from "../../../../utilities/titleize";
import useKeyPress from "../../../../utilities/useKeyPress";
import useVisible from "../../../../utilities/useVisible";
import { CgKeyhole } from "react-icons/cg";

const Option = ({ text, id, selected, first, last }) => {
  let optionRef = useRef(null);

  return (
    <div
      className={
        "auto-complete-option " +
        (selected ? "selected " : "") +
        (first ? "first-option" : "") +
        (last ? "last-option" : "")
      }
      ref={(el) => (optionRef = el)}
    >
      <span id={id}>{titleize(text)}</span>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////

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
const AutoCompleteSelect = ({
  allOptions,
  fieldName,
  formDataSetter,
  optionsShown,
}) => {
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(5);
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null);
  const [trie] = useState(new Trie());
  const [results, setResults] = useState([]);

  // detect if up or down arrow is pressed
  const upKeyPress = useKeyPress("ArrowUp");
  const downKeyPress = useKeyPress("ArrowDown");
  const enterKeyPress = useKeyPress("Enter");

  // set up listener to detent click outside of this element
  let allOptionsRef = useRef(null);
  let {isVisible, setIsVisible} = useVisible(true, allOptionsRef);

  useEffect(()=>{
    console.log('allOptionsRef', allOptionsRef);
  }, [allOptionsRef])

  // change 'query' in state when input value changes
  const onChange = (e) => {
    setQuery(e.target.value);
    setSelectedOption(0);
    setIsVisible(true);
  };

  // update which select options are shown based on the currently selected option
  const updateOptions = () => {
    console.log(rangeStart, selectedOption, rangeEnd);
  };

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      // add individual words to trie rather than all at once
      // in order to add each as a lowercase word, rather than the whole object
        trie.addWords(allOptions);
    }
  }, [allOptions, trie]);

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    let newResults;
    if (query === "") {
      newResults = [];
      setIsVisible(false);
    } else {
      newResults = trie.find(query.toLowerCase());
      setIsVisible(true);
    }
    formDataSetter(query); // update form state
    setResults(newResults); // update auto complete results
  }, [query, formDataSetter, trie]);

  // change the selected auto complete option using arrow keys
  useEffect(() => {
    if (upKeyPress) {
      if (selectedOption > 0) {
        setSelectedOption(selectedOption - 1);
      }
    } else if (downKeyPress) {
      if (selectedOption < results.length - 1) {
        setSelectedOption(selectedOption + 1);
      }
    } else if (enterKeyPress) {
      console.log("enter pressed");
    }
  }, [
    selectedOption,
    optionsShown,
    results,
    upKeyPress,
    downKeyPress,
    enterKeyPress,
  ]);

  return (
    <div id="auto-complete-select">
      <input type="text" name={fieldName} value={query} onChange={onChange} />

      {isVisible && results && results.length > 0 ? (
        <div className="auto-complete-options" ref={allOptionsRef}>
          {/* display the first 6 options */}
          {results.map((text, i) =>
            i < 100 ? (
              <Option
                text={text}
                id={i}
                key={i}
                selected={selectedOption === i}
                first={rangeStart === i}
                last={rangeEnd === i}
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
