import React, { useState, useEffect, useRef } from 'react'
import { Trie } from './autoComplete'
import titleize from '../../../../utilities/titleize'
import useKeyPress from '../../../../utilities/useKeyPress'
import useVisible from '../../../../utilities/useVisible'
import { CgKeyhole } from 'react-icons/cg'

const Option = ({
  text,
  id,
  selected,
  first,
  last,
  setQuery,
  setIsVisible,
  allOptionsRef
}) => {
  let optionRef = useRef(null)

  return (
    <div
      className={
        'auto-complete-option ' +
        (selected ? 'selected ' : '') +
        (first ? 'first-option' : '') +
        (last ? 'last-option' : '')
      }
      ref={el => (optionRef = el)}
      onClick={() => {
        // set the query to the innerText of the selected option
        setQuery(allOptionsRef.current.children[id].innerText)
        setIsVisible(false)
      }}
    >
      <span id={id}>{titleize(text)}</span>
    </div>
  )
}

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
  value,
  isDisabled = false
}) => {
  const [rangeStart, setRangeStart] = useState(0)
  const [rangeEnd, setRangeEnd] = useState(5)
  const [query, setQuery] = useState('')
  const [selectedOption, setSelectedOption] = useState(0)
  const [selectedValue, setSelectedValue] = useState(null)
  const [trie] = useState(new Trie())
  const [results, setResults] = useState([])
  const [visibleOptions, setVisibleOptions] = useState([])

  // detect if up or down arrow is pressed
  const upKeyPress = useKeyPress('ArrowUp')
  const downKeyPress = useKeyPress('ArrowDown')
  const enterKeyPress = useKeyPress('Enter')
  const tabKeyPress = useKeyPress('Tab')

  // set up listener to detent click outside of this element
  let allOptionsRef = useRef(null)
  let { isVisible, setIsVisible } = useVisible(true, allOptionsRef)

  // change 'query' in state when input value changes
  const onChange = e => {
    setQuery(e.target.value)
    setSelectedOption(0)
    setIsVisible(true)
  }

  const resetSelectMenuState = () => {
    setRangeStart(0)
    setRangeEnd(5)
    setSelectedOption(0)
  }

  //
  useEffect(() => {
    // update which select options are shown based on the currently selected option
    const updateOptions = () => {
      // console.log(rangeStart, selectedOption, rangeEnd);

      if (selectedOption === rangeEnd - 1 && rangeEnd + 1 < results.length) {
        setRangeStart(rangeStart + 1)
        setRangeEnd(rangeEnd + 1)
      } else if (selectedOption === rangeStart + 1 && rangeStart - 1 >= 0) {
        setRangeStart(rangeStart - 1)
        setRangeEnd(rangeEnd - 1)
      }
    }

    updateOptions()
    setVisibleOptions(results.slice(rangeStart, rangeEnd + 1))
  }, [rangeStart, rangeEnd, selectedOption, results])

  // Add all lowercase state names to Trie
  useEffect(() => {
    if (trie) {
      // add individual words to trie rather than all at once
      // in order to add each as a lowercase word, rather than the whole object
      trie.addWords(allOptions)
    }
  }, [allOptions, trie])

  // when the query changes, find all words in the Trie that begin with the query string
  useEffect(() => {
    let newResults
    if (query === '') {
      newResults = []
      setIsVisible(false)
    } else {
      newResults = trie.find(query.toLowerCase())
      setIsVisible(true)
    }
    formDataSetter(query) // update form state
    setResults(newResults) // update auto complete results

    resetSelectMenuState()
  }, [query, formDataSetter, trie])

  // change the selected auto complete option using arrow keys
  useEffect(() => {
    if (upKeyPress) {
      if (selectedOption > 0) {
        setSelectedOption(selectedOption - 1)
      }
    } else if (downKeyPress) {
      if (selectedOption < results.length - 1) {
        setSelectedOption(selectedOption + 1)
      }
    } else if (enterKeyPress || tabKeyPress) {
      if (allOptionsRef.current) {
        // set the query to the innerText of the selected option
        setQuery(
          allOptionsRef.current.children[selectedOption - rangeStart].innerText
        )
        setIsVisible(false)
      }
    }
  }, [
    selectedOption,
    optionsShown,
    results,
    upKeyPress,
    downKeyPress,
    enterKeyPress,
    tabKeyPress
  ])

  return (
    <div id='auto-complete-select'>
      <input
        type='text'
        name={fieldName}
        value={value}
        onChange={onChange}
        onClick={onChange}
        disabled={isDisabled}
      />
      {isVisible &&
      results &&
      results.length > 0 &&
      query.toLowerCase() !== results[0] ? (
        <div
          className='auto-complete-options'
          ref={el => (allOptionsRef.current = el)}
        >
          {/* display the first 6 options */}

          {visibleOptions.map((text, i) => (
            <Option
              text={text}
              id={i}
              key={i}
              selected={selectedOption - rangeStart === i}
              setQuery={setQuery}
              setIsVisible={setIsVisible}
              allOptionsRef={allOptionsRef}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default AutoCompleteSelect
