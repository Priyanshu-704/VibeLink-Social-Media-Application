import "../styles/Loading.css";
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: "5",
        backgroundColor: "#0008",
        color: "white",
        textAlign: "center",
        top: "0",
        left: "0",
      }}
    >
      <svg width={400} height={180}>
        <rect
          x={50}
          y={20}
          width={150}
          height={150}
          style={{
            fill: "none",
            stroke: "#fff",
            strokeWidth: 5,
          }}
        />

        <text className="loading-text" fill="#fff" x={4} y={147} style={{transform: 'translate(42px, -40px)'}}>
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
