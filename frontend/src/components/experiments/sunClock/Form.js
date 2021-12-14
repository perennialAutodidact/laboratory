import React, { useState, useRef, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { TimelineLite, TweenMax, Elastic } from "gsap"; // gsap animation library
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../../state/slices/sunClockSlice"; // pull in actions from slice
import { countryList } from "../../constants/countryList";
import { stateList } from "../../constants/USStates"
import AutoCompleteSelect from "./AutoCompleteSelect/AutoCompleteSelect";

const Form = () => {
  const dispatch = useDispatch();
  const { showForm } = useSelector((state) => state.sunClock);

  const [formData, setFormData] = useState({
    city: "",
    lat: "",
    lng: "",
  });
  const { city, lat, lng } = formData;
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");

  // for GSAP enter/exit animation
  let ref = useRef(null);

  // form control functions
  // -------------------------------------
  const onSubmit = (e) => {
    e.preventDefault();

    // get the value of the inputs
    console.log(city, stateName, lat, lng, stateName, country);

    // call APIs with form data
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // ---------------------------------------

  // useEffect(()=>{},[formData])

  useEffect(() => {
    const tl = new TimelineLite();

    // tween the form in or out based on the value of the showForm boolean
    let tween = TweenMax.to(ref, {
      y: showForm ? 0 : -500,
      scale: showForm ? 1 : 0,
      duration: 1,
      ease: "elastic.out(.75, 0.5)",
    });

    // add the tween to the timeline
    tl.add(tween);
  }, [showForm]);

  return (
    <form
      id="form"
      onSubmit={onSubmit}
      ref={(el) => (ref = el)}
      onKeyDown={(e) => {
        // override default action when Enter is pressed
        // to avoid erroneous form submissions when using Enter
        // to choose an option in the select menus
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div id="header">
        <span id="close-x">
          {/* toggle hide/show form */}
          <CgCloseR onClick={() => dispatch(toggleForm())} />
        </span>
        <span id="title">Location</span>
      </div>
      <div id="city-state-country">
        <div className="form-row">
          <p className="label">
            <span className="text">Country</span>
          </p>
          <AutoCompleteSelect
            fieldName={"country"}
            value={country}
            allOptions={countryList}
            formDataSetter={setCountry}
            optionsShown={6}
          />
        </div>

        <div className="form-row">
          {country !== "United States" ? (
            <div className="disabled-form-row">
              {/* alpha'd box over row when disabled */}
            </div>
          ) : (
            ""
          )}
          <p className="label">
            <span className="text">State</span>
          </p>
          <AutoCompleteSelect
            fieldName={"state"}
            value={stateName}
            allOptions={stateList}
            formDataSetter={setStateName}
            optionsShown={6}
            isDisabled={country !== "United States"}
          />
        </div>

        <div className="form-row">
        {!country ? (
            <div className="disabled-form-row">
              {/* alpha'd box over row when disabled */}
            </div>
          ) : (
            ""
          )}
          <p className="label">
            <span className="text">City</span>
          </p>
          <input type="text" name="city" value={city} onChange={onChange} disabled={!country}/>
        </div>
      </div>
      <div id="divider">
        <span id="circle">
          <span>OR</span>
        </span>
      </div>

      <div id="lat-lng">
        <div className="form-row">
          <p className="label">
            <span className="text">Latitude</span>
          </p>
          <input type="text" name="lat" value={lat} onChange={onChange} />
        </div>
        <div className="form-row">
          <p className="label">Longitude</p>
          <input type="text" name="lng" value={lng} onChange={onChange} />
        </div>

        <div className="form-row">
          <input type="submit" id="submit" value="Submit" />
        </div>
      </div>
    </form>
    // </Transition>
  );
};

export default Form;
