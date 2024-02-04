// import React, {useContext, useEffect} from 'react'
// import NoteContext from '../Context/Notes/NoteContext'
import React from "react"

const About = () => {
  // const a = useContext(NoteContext);
  // useEffect(() => {
  //   // a.update(); this is related to comment part in noteState -> update function in noteState
  //   // eslint-disable-next-line
  // }, []) // Using just like componentDidMount(){} classBased component
  return (
    <div>
      {/* {"About " + a.state.name + a.state.class} -> this is relater to comment part in noteState -> name = dexter and all */}
      THis is about section 
    </div>
  )
}

export default About