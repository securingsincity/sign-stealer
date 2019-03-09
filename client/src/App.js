import React, { Component } from "react";
import coach from "./coach.jpg";
import "./App.css";

const SIGNS = [
  "DO NOTHING",
  "TAP HAT",
  "TAP LEFT ARM",
  "TAP RIGHT ARM",
  "TAP CHEST",
  "SLIDE HAT",
  "SLIDE LEFT ARM",
  "SLIDE RIGHT ARM",
  "SLIDE CHEST",
  "LICK LIPS",
  "PULL LEFT EAR",
  "PULL RIGHT EAR"
];

class App extends Component {
  constructor() {
    super();
    this.signal.bind(this);
    this.state = {
      signs: [],
      lastPrediction: ""
    };
  }

  signal = signalNumber => {
    if (this.state.signs.length === 5) {
      this.setState({
        signs: [],
        lastPrediction: ""
      });
    }

    this.setState(
      prevState => {
        const signs = prevState.signs.concat([signalNumber]);
        return {
          ...prevState,
          signs
        };
      },
      () => {
        console.log(this.state.signs.length);
        if (this.state.signs.length === 5) {
          fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ sign: this.state.signs })
          }).then(res => {
            res.json().then(data => {
              this.setState({
                ...this.state,
                lastPrediction: data.prediction
              });
            });
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Sign Stealer</h1>
        <div>
          <strong>Last Prediction:</strong>
          {this.state.lastPrediction}
        </div>
        <div
          style={{
            height: "500px",
            width: "500px",
            margin: "auto",
            backgroundSize: "cover",
            backgroundPositionX: "-125px",
            backgroundImage: `url(${coach})`,
            position: "relative"
          }}
        >
          <button
            onClick={() => this.signal(0)}
            style={{ position: "absolute", left: "30px", top: "30px" }}
          >
            Do Nothing
          </button>
          <button
            onClick={() => this.signal(1)}
            style={{ position: "absolute", right: "200px", top: "20px" }}
          >
            Hat
          </button>
          <button
            onClick={() => this.signal(2)}
            style={{ position: "absolute", right: "82px", top: "283px" }}
          >
            Left Arm
          </button>
          <button
            onClick={() => this.signal(3)}
            style={{ position: "absolute", left: "34px", top: "280px" }}
          >
            Right Arm
          </button>
          <button
            onClick={() => this.signal(4)}
            style={{ position: "absolute", right: "200px", top: "225px" }}
          >
            Chest
          </button>
          <button
            onClick={() => this.signal(5)}
            className="slide"
            style={{ position: "absolute", right: "175px", top: "70px" }}
          >
            Slide Hat
          </button>
          <button
            onClick={() => this.signal(6)}
            className="slide"
            style={{ position: "absolute", right: "75px", top: "340px" }}
          >
            Slide Left Arm
          </button>
          <button
            onClick={() => this.signal(7)}
            className="slide"
            style={{ position: "absolute", left: "34px", top: "340px" }}
          >
            Slide Right Arm
          </button>
          <button
            onClick={() => this.signal(8)}
            className="slide"
            style={{ position: "absolute", right: "180px", top: "280px" }}
          >
            Slide Chest
          </button>
          <button
            onClick={() => this.signal(9)}
            className="slide"
            style={{ position: "absolute", right: "180px", top: "125px" }}
          >
            Lick Lips
          </button>
          <button
            onClick={() => this.signal(10)}
            className="slide"
            style={{ position: "absolute", right: "75px", top: "113px" }}
          >
            Pull Left Ear
          </button>
          <button
            onClick={() => this.signal(11)}
            className="slide"
            style={{ position: "absolute", right: "289px", top: "113px" }}
          >
            Pull Right Ear
          </button>
        </div>
        <div>
          <strong>Signs:</strong>
          {this.state.signs.map((signCall, index) => (
            <span key={`${signCall}-${index}`}>
              {SIGNS[signCall]}
              <br />
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
