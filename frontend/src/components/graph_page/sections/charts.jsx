import React, { useState, useEffect } from "react";
import { Bar } from "@nivo/bar";
import { USER_SERVER } from '../../../Config';

function Charts(props) {

  const [loc, setLoc] = useState(props.loc)
  const [videoId, setVideoId] = useState(props.videoId)
  const [count, setCount] = useState([])
  let numOfNonHelmet = 0
  let numOfOverTwo = 0

  const styles = {
    fontFamily: "sans-serif",
    fontSize: "14px",
    textAlign: "center"
  };
  useEffect(() => {
    // get number of (log, value)
    fetch(`${USER_SERVER}/graph/${loc}/${videoId}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)


        response.forEach((item) => {
          if (item.value == 'non-helmet') {
            numOfNonHelmet += 1
          } else if (item.value == 'over-two') {
            numOfOverTwo += 1
          }
        })
        setCount([numOfOverTwo, numOfNonHelmet])

      })
      .catch((err) => {
        console.log(err)
      })

  }, []);
  
  const sampleData =
  [
    {
      "id": "non-helmet",
      "color": "hsl(85, 70%, 50%)",
      "value": count[1]
    },
    {
      "id": "over-two",
      "color": "hsl(180, 70%, 50%)",
      "value":  count[0]
    }
  ];
  
  const commonProperties = {
    width: 550,
    height: 400,
    data: sampleData,
    keys: ["value"],
    indexBy: "id",
    margin: {
      top: 10,
      right: 5,
      bottom: 60,
      left: 80
    }
  };
  

  return(
    <div style={styles}>
    <Bar
      {...commonProperties}
      axisBottom={{
        // using custom function
        format: d => `${d}`
      }}
    />

  </div>
  )
}

export default Charts;