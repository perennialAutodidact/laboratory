import React, { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import { TweenMax, TimelineLite } from 'gsap'
import { GrClose } from 'react-icons/gr'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { setClockData } from '../../../state/slices/sunClockSlice'

const SearchResults = ({ results, loadingStatus, setShowSearchResults }) => {

  const searchResultsRef = useRef()
  useEffect(()=>{
    const tl = new TimelineLite()

    tl.set(searchResultsRef.current, {
      y: -50,
      opacity: 0
    }).to(searchResultsRef.current, {
      opacity: 1,
      y: 0
    })
  }, [])

  return (
    <div id='search-results' ref={searchResultsRef}>
      <div id='results-header'>
        <span className='close-x'>
          <GrClose />
        </span>
        <span id='header-text'>RESULTS</span>
      </div>

      <div className='results-list'>
        {!results || loadingStatus === 'PENDING' ? (
          <div className='result-item spinner-container'>
            <AiOutlineLoading3Quarters className='spinner' />{' '}
          </div>
        ) : results.length === 0 ? (
          <div className='result-item'>No results</div>
        ) : (
          <>
            {results.map((result, i) => (
              <div
                className='result-item'
                onClick={() => {
                  let data = {
                    city: result.components.city,
                    state: result.components.state,
                    country: result.components.country,
                    lat: result.geometry.lat,
                    lng: result.geometry.lng,
                    sunrise: result.annotations.sun.rise.apparent,
                    sunset: result.annotations.sun.set.apparent
                  }
                  setClockData(data)
                }}
                key={`result-${i}`}
              >
                {result.formatted}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchResults
