/* eslint-disable react/jsx-key */
import ProfileImg from "../images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Status.css";
import { useState, useRef } from "react";
import PhotoIcon from "@mui/icons-material/Photo";
import CameraIcon from "@mui/icons-material/Camera";
import { createpost } from "../redux/actions/postActions";

const Status = () => {
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state);
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const refVideo = useRef();
  const refCanvas = useRef();

  const dispatch = useDispatch();

  const uploadimages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let imagesArr = [];

    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.size > 1024 * 1024 * 5) return (err = "file is too long");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "file type is not supported");

      return imagesArr.push(file);
    });
    if (err) {
      dispatch({ type: "ALERT", payload: { error: err } });
    }
    setImages([...images, ...imagesArr]);
    console.log(...images);
  };

  const handleuploadinput = () => {
    const imageuploadfunc = document.getElementById("postupload");
    imageuploadfunc.click();
  };

  const deleteimage = (inde) => {
    const newArrimage = [...images];
    newArrimage.splice(inde, 1);
    setImages(newArrimage);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          refVideo.current.srcObject = stream;
          refVideo.current.play();
          const track = stream.getTracks();

          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleStreamStop = () => {
    if (tracks) {
      tracks.stop();
    }
    if (refVideo.current?.srcObject) {
      const stream = refVideo.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setStream(false);
    setTracks(null);
  };

  const handlecameraimage = () => {
    const width = refVideo.current.clientWidth;
    const height = refVideo.current.clientWidth;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(refVideo.current, 0, 0, width, height);
    const URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
    console.log(images);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      dispatch({ type: "ALERT", payload: { error: "add your image" } });
    } else {
      dispatch(createpost({ content, images, auth }));
      setContent('')
      setImages([])
      if(tracks) tracks.stop()
    }
    setContent('')
    setImages([])
    if(tracks) tracks.stop()
  };

  const handleDiscard = (e) =>{
    e.preventDefault();
    setContent('')
    setImages([])
    if(tracks) tracks.stop()
}

  return (
    <div className="status">
      <form onSubmit={handleSubmit}>
        <div className="status-header">
          <img src={auth.user.avatar || ProfileImg} alt="" />
          <h4>Status</h4>
        </div>
        <div className="status-middle">
          <textarea
            type="text"
            placeholder="Share your thoughts"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            cols="10"
          />
          <small>{content.length}</small>
        </div>
        <div className="status-imagesdiv">
          {images &&
            images.map((image, index) => (
            <div className="status-middleimagecontainer"
              key={image.camera ? `camera-${index}` : `file-${index}`}>
                <img
                  className="status-middleimages"
                  src={image.camera ? image.camera : URL.createObjectURL(image)}
                  alt="no"
                />
                <span
                  className="status-middleimagedelete"
                  onClick={() => deleteimage(index)}
                >
                  x
                </span>
              </div>
            ))}
        </div>
        {stream && (
          <div className="status-stream">
            <video
              autoPlay
              muted
              ref={refVideo}
              style={{
                height: "250px",
                width: "100%",
                border: "2px solid gray",
                padding: "3px",
                borderRadius: "10px",
              }}
            />
            <span
              className="status-middlestreamstop"
              onClick={handleStreamStop}
            >
              x
            </span>
            <canvas ref={refCanvas} style={{ display: "none" }} />
          </div>
        )}

        <div className="status-footer">
          <div className="status-footerright">
            {stream ? (
              <PhotoIcon onClick={handlecameraimage} />
            ) : (
              <>
                <CameraIcon onClick={handleStream} />
                <PhotoIcon onClick={handleuploadinput} />
              </>
            )}
            <span>
              <input
                style={{ display: "none" }}
                type="file"
                id="postupload"
                onChange={uploadimages}
                multiple
              />
            </span>
          </div>
          <div className="status-footerleft">
            <button className="status-footerleftdiscard">Discard</button>
            <button className="status-footerleftcreate" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Status;
