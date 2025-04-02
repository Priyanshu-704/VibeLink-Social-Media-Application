/* eslint-disable react/prop-types */
const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className="toast"
      style={{
        padding: "5px",
        borderRadius: "5px",
        position: "fixed",
        backgroundColor: `${bgColor}`,
        color: "rgb(65, 65, 124)",
        top: "5px",
        right: "5px",
        zIndex: "50",
        minWidth: "230px",
      }}
    >
      <div
        className="toast-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(149, 149, 231)",
          padding: "0rem .5rem",
        }}
      >
        <h5
          style={{
            fontWeight: "700",
          }}
        >
          {msg.title}
        </h5>
        <p
          onClick={handleShow}
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </p>
      </div>
      <div className="toast-body" style={{
        padding: "0rem .5rem",
      }}>
        <p>{msg.body}</p>
      </div>
    </div>
  );
};

export default Toast;
