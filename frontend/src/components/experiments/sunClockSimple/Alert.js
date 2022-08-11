import { useEffect, useState, useRef } from 'react'
import { TimelineLite, TweenMax, Elastic } from 'gsap' // gsap animation library
import { GrClose } from 'react-icons/gr'

const Alert = ({ alertText, setAlertText, interval }) => {
  const [showAlert, setShowAlert] = useState(true)
  const alertRef = useRef()

  const [timeline, setTimeline] = useState(new TimelineLite())
  useEffect(() => {
    timeline
      .to(alertRef.current, { duration: 0.5, opacity: 1, y: 50 })
      .to(alertRef.current, {
        opacity: 0,
        y: -50,
        delay: interval,
        onComplete: () => setAlertText('')
      })
  }, [])
  useEffect(() => {
    if (showAlert) {
      timeline.play()
    }
  }, [showAlert])

  return (
    <div className='alert' ref={alertRef}>
      <h4>{alertText} </h4>{' '}
      <GrClose
        className='close-x'
        onClick={() => {
          timeline.play(0.5 + interval)
        }}
      />
    </div>
  )
}

export default Alert
