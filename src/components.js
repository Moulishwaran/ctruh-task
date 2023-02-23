import React, { useState, useRef, useEffect } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = props.width;
    canvas.height = props.height;
  }, [props.width, props.height]);

  // Handle canvas color change
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [color]);

  // Handle number overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.font = "bold 50px Arial";
    context.fillStyle = "#ffffff";
    context.fillText(props.number, canvas.width - 80, 60);
  }, [props.number]);

  // Handle zoomed-in view
  const [showZoom, setShowZoom] = useState(false);
  const [zoomX, setZoomX] = useState(0);
  const [zoomY, setZoomY] = useState(0);
  const handleMouseOver = (event) => {
    setShowZoom(true);
    setZoomX(event.nativeEvent.offsetX);
    setZoomY(event.nativeEvent.offsetY);
  };
  const handleMouseOut = () => {
    setShowZoom(false);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {showZoom && (
        <div
          style={{
            position: "absolute",
            top: zoomY,
            left: zoomX + 20,
            width: 100,
            height: 100,
            border: "1px solid black",
            background: color,
            transform: "scale(2)",
            transformOrigin: "top left",
          }}
        />
      )}
      <div>
        <label>Canvas Color:</label>
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </div>
    </div>
  );
}

function App() {
  const [number, setNumber] = useState(42);
  const [palette, setPalette] = useState(["#ffffff", "#000000", "#ff0000"]);

  return (
    <div>
      <Canvas width={400} height={400} number={number} />
      <div>
        <label>Number:</label>
        <input
          type="number"
          value={number}
          onChange={(event) => setNumber(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label>Background Color Palette:</label>
        <select
          value={palette}
          onChange={(event) =>
            setPalette(
              event.target.options[event.target.selectedIndex].value.split(",")
            )
          }
        >
          <option value="#ffffff,#000000,#ff0000">Default</option>
          <option value="#ff00ff,#00ff00,#0000ff">Alternative</option>
        </select>
      </div>
    </div>
  );
}

export default App;
