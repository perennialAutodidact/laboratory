import React from "react";

const SearchResults = ({results}) => {

  return (
    <div id="search-results">
      {results.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        results.map((result) => {
          <>
            <div className="result-item">BLAHBLAHBLAH</div>
            {/* <div className="result-item">{JSON.stringify(result)}</div> */}
          </>;
        })
      )}
    </div>
  );
};

export default SearchResults;
