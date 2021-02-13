import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
  });

  const { city, state, country, lat, lng } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <div id="city-state-country">
        <div>
          City{" "}
          <input type="text" name="city" value={city} onChange={onChange} />
        </div>
        <div>
          State{" "}
          <input type="text" name="state" value={state} onChange={onChange} />
        </div>
        <div>
          Country{" "}
          <input
            type="text"
            name="country"
            value={country}
            onChange={onChange}
          />
        </div>
      </div>

      <div>or</div>

      <div id="lat-lng">
        <div>
          Latitude{" "}
          <input type="text" name="lat" value={lat} onChange={onChange} />
        </div>
        <div>
          Longitude{" "}
          <input type="text" name="lng" value={lng} onChange={onChange} />
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
