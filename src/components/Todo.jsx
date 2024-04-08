import {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Modal, Space} from "antd";
import CameraCapture from "./CameraCapture.jsx";
import ImageShow from "./ImageShow.jsx";
import MapContainer from "./MapCard";
import ImageCard from "./ImageCard.jsx";
import RandomCard from "./RandomCard";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Todo(props) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  // NOTE: As written, this function has a bug: it doesn't prevent the user
  // from submitting an empty form. This is left as an exercise for developers
  // working through MDN's React tutorial.
  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);

  const showCaptureModal = () => {
    setIsCaptureModalOpen(true);
  };

  const handleCaptureOk = () => {
    props.editTask(props.id, props.name);

    setIsCaptureModalOpen(false);
  };

  const handleCaptureCancel = () => {
    setIsCaptureModalOpen(false);
  };

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const showShowModal = () => {
    setIsShowModalOpen(true);
  };

  const handleShowOk = () => {
    setIsShowModalOpen(false);
  };

  const handleShowCancel = () => {
    setIsShowModalOpen(false);
  };

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const showMapModal = () => {
    setIsMapModalOpen(true);
  };

  const handleMapOk = () => {
    setIsMapModalOpen(false);
  };

  const handleMapCancel = () => {
    setIsMapModalOpen(false);
  };

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        {/*<Checkbox checked={props.completed}*/}
        {/*          onChange={() => props.toggleTaskCompleted(props.id, !props.completed)}></Checkbox>*/}
        <input
          id={props.id}
          type="checkbox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id, !props.completed)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
          &nbsp;  I`M IN
          &nbsp;| la {props.latitude}
          &nbsp;| lo {props.longitude}
        </label>
      </div>
      <div className="btn-group">
        <Space wrap>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setEditing(true);
            }}
            ref={editButtonRef}>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>

          <button
            type="button"
            className="btn"
            onClick={showShowModal}>
            View Photo
          </button>
          <Modal title="View Photo" open={isShowModalOpen} onOk={handleShowOk} onCancel={handleShowCancel}>
            <ImageShow imageUrl={props.imageUrl}></ImageShow>
          </Modal>

          <button
            type="button"
            className="btn"
            onClick={showCaptureModal}>
            Take Photo
          </button>
          <Modal title="Take Photo" open={isCaptureModalOpen} onOk={handleCaptureOk} onCancel={handleCaptureCancel}>
            <CameraCapture image={props.image} setImage={props.setImage}></CameraCapture>
          </Modal>


          <button
            type="button"
            className="btn"
            onClick={showMapModal}>
            Map
          </button>
          <Modal width={1100} title="Map" open={isMapModalOpen} onOk={handleMapOk} onCancel={handleMapCancel}>
            {isMapModalOpen &&
              <MapContainer
                id={props.id}
                latitude={props.latitude}
                longitude={props.longitude}
              ></MapContainer>
            }
          </Modal>

          <ImageCard></ImageCard>

          <RandomCard></RandomCard>

          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}>
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </Space>
      </div>
    </div>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
