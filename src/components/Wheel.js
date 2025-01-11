import React, { useState, useEffect } from "react";

const Wheel = () => {
  const [values, setValues] = useState({
    career: 1,
    finance: 1,
    health: 1,
    friends: 1,
    love: 1,
    selfdev: 1,
    leisure: 1,
    living: 1,
  });

  const [result, setResult] = useState(""); // To store the result from the backend

  // Handle slider changes
  const handleSliderChange = (category, event) => {
    setValues({
      ...values,
      [category]: event.target.value,
    });
  };

  // Function to fetch the result from the backend
  const handleShowResult = async () => {
    try {
      const response = await fetch('/api/wheel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result); // Set the result from the response
      } else {
        console.error('Error fetching result');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const drawWheel = () => {
      const wcanvas = document.getElementById("wheelCanvas");
      const dctx = wcanvas.getContext("2d");
      const radius = 200;
      const sectors = 8;
      const maxLevel = 10;

      const data = [
        values.career,
        values.finance,
        values.health,
        values.friends,
        values.love,
        values.selfdev,
        values.leisure,
        values.living,
      ];

      const colors = [
        "#ff9900", "#3d0099", "#09ab3f", "#007fff", "#cc0000", "#ff5c77",
        "#fde910", "#0000ff",
      ];

      let userRadii = new Array(sectors).fill(0);

      const animate = () => {
        dctx.clearRect(0, 0, wcanvas.width, wcanvas.height);
        dctx.translate(wcanvas.width / 2, wcanvas.height / 2);

        for (let level = 1; level <= maxLevel; level++) {
          dctx.beginPath();
          for (let i = 0; i < sectors; i++) {
            const angle = (i * 2 * Math.PI) / sectors;
            const nextAngle = ((i + 1) * 2 * Math.PI) / sectors;

            dctx.moveTo(0, 0);
            dctx.arc(0, 0, (radius / maxLevel) * level, angle, nextAngle);
            dctx.lineTo(0, 0);
          }
          dctx.strokeStyle = "#ddd";
          dctx.stroke();
        }

        let allComplete = true;
        for (let i = 0; i < sectors; i++) {
          const targetRadius = (data[i] / maxLevel) * radius;
          if (userRadii[i] < targetRadius) {
            userRadii[i] += (targetRadius - userRadii[i]) * 0.02;
            allComplete = false;
          }

          const angleStart = (i * 2 * Math.PI) / sectors;
          const angleEnd = ((i + 1) * 2 * Math.PI) / sectors;

          dctx.beginPath();
          dctx.moveTo(0, 0);
          dctx.arc(0, 0, userRadii[i], angleStart, angleEnd);
          dctx.lineTo(0, 0);

          dctx.fillStyle = colors[i] + "80";
          dctx.fill();
        }

        for (let i = 0; i < sectors; i++) {
          const angle = (i * 2 * Math.PI) / sectors;
          dctx.beginPath();
          dctx.moveTo(0, 0);
          dctx.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));
          dctx.strokeStyle = "#888";
          dctx.stroke();
        }

        dctx.setTransform(1, 0, 0, 1, 0, 0);

        if (!allComplete) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    drawWheel();
  }, [values]); // Re-run wheel drawing when values change

  return (
    <main className="main">
      {/* Input sliders */}
      <div className="inputWheel">
        {Object.keys(values).map((category, index) => (
          <div className="inputWheelItem" key={index}>
            <label>{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={values[category]}
              onChange={(e) => handleSliderChange(category, e)}
            />
            <span className="valueSpan">{values[category]}</span>
          </div>
        ))}
      </div>

      {/* Show result button */}
      <div className="inputWheelItem resultButtonContainer">
        <button
          id="showResultBtn"
          onClick={handleShowResult}
          className="showResultBtn"
        >
          Show result
        </button>
      </div>

      {/* Render wheel */}
      <canvas id="wheelCanvas" width="400" height="400"></canvas>

      {/* Color legend */}
      <div className="colorList">
        {["Career", "Finance", "Health", "Friends", "Love", "Self-development", "Leisure", "Living conditions"].map((label, index) => (
          <div className="colorListItem" key={index}>
            <div className={`color${label.replace(" ", "")}`}></div>
            <p className={label.replace(" ", "").toLowerCase()}>{label}</p>
          </div>
        ))}
      </div>

      {/* Display the result */}
      {result && (
        <div className="result">
          <h3>Wheel Results:</h3>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
};

export default Wheel;
