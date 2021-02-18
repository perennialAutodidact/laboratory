import React, { useRef, useEffect, useState } from "react";
import { TimelineLite, TweenMax } from "gsap";
import { CgCloseR } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../../state/slices/sunClockSlice";
import { Transition } from 'react-transition-group';


const Form = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    country: "",
    lat: "",
    lng: "",
  });

  const dispatch = useDispatch();
  const { city, state, country, lat, lng } = formData;
  let { showForm } = useSelector((state) => state.sunClock);
  let nodeRef = useRef(null)

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
    <Transition 
      // timeout={1000} 
      mountOnEnter
      unmountOnExit
      in={showForm}
      addEndListener={(node, done) => {
        const tl = new TimelineLite();
        let tween = TweenMax.to(node, {
          y: showForm ? 0 : -500,
          autoAlpha: showForm ? 1 : 0,
          scale: showForm ? 1 : 0,
          onComplete: done,
        });

        tl.add(tween);
      }}
    >
      <form id="form" onSubmit={onSubmit}>
        <div id="header">
          <span id="close-x">
            <CgCloseR onClick={() => dispatch(toggleForm())} />
          </span>
          <span id="title">Location</span>
        </div>
        <div id="city-state-country">
          <div className="form-row">
            <p className="label">City</p>
            <input type="text" name="city" value={city} onChange={onChange} />
          </div>
          <div className="form-row">
            <p className="label">State</p>
            <input type="text" name="state" value={state} onChange={onChange} />
          </div>
          <div className="form-row">
            <p className="label"> Country </p>
            <input
              type="text"
              name="country"
              value={country}
              onChange={onChange}
            />
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
    </Transition>
  );
};

export default Form;
