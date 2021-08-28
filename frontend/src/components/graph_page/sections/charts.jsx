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
    textAlign: "center"
  };

  const theme = {
    axis: {
      ticks: {
        text: {
          fontSize: 20,
          fill: "gray"
        }
      }
    },
  };

  useEffect(() => {
    // get number of (log, value)
    fetch(`${USER_SERVER}/graph/${loc}/${videoId}`)
      .then(response => response.json())
      .then(response => {
        console.log(response)

        response.forEach((item) => {
          if (item.value === 'non-helmet') {
            numOfNonHelmet += 1
          } else if (item.value === 'over-two') {
            numOfOverTwo += 1
          }
        })
        setCount([numOfOverTwo, numOfNonHelmet])

      })
      .catch((err) => {
        console.log(err)
      })

  }, []);

  const Data =
    [
      {
        "id": "non-helmet",
        "color": "hsl(55, 70%, 50%)",
        "value": count[1]
      },
      {
        "id": "over-two",
        "color": "hsl(313, 70%, 50%)",
        "value": count[0]
      }
    ];

  const commonProperties = {
    width: 1260,
    height: 500,
    data: Data,
    keys: ["value"],
    indexBy: "id",
    minValue: 0,
    maxValue: Math.max(count[0],count[1]) + 10, // max of y value
    padding: 0.65, // graph width (0:wide~1:narrow)
    labelTextColor: {from: 'color', fontSize: 20, modifiers: [ [ 'darker', 3 ] ]},
    margin: {
      top: 10,
      right: 50,
      bottom: 50,
      left: 50
    }
  };

  return (
    <div style={styles}>
      <Bar
        {...commonProperties}
        colors={{ scheme: 'nivo' }}
        colorBy="indexValue"
        axisBottom= {{
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: 32
        }}
        theme={theme}
      />
    </div>
  )
}

export default Charts;