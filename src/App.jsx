import {useState, useRef, useEffect} from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import {addTask, deleteTask, listTask, updateTask} from "./services/TaskApi.js";
import Demo from "./components/MapCard";
import MapContainer from "./components/MapCard";
import {Button} from "antd";
import ImageCard from "./components/ImageCard.jsx";
import RandomCard from "./components/RandomCard";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const FILTER_MAP = {
  All: () => true, Active: (task) => !task.completed, Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await listTask({});
    setTasks(res.data.data);
  };


  const toggleTaskCompleted = async (id, completed) => {
    const values = {
      _id: id,
      completed: completed
    }
    const res = await updateTask(values);

    await loadData();
  }

  // 删除函数
  const onDeleteTask = async (id) => {
    const values = {
      "id": id
    }
    const res = await deleteTask(values);
    await loadData();
  }

  const editTask = async (id, newName) => {
    const values = {
      _id: id,
      name: newName,
      image: image
    }

    const res = await updateTask(values);
    await loadData();
  }

  const [image, setImage] = useState(null);

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => {
      return (
        <Todo
          id={task._id}
          name={task.name}
          completed={task.completed}
          latitude={task.latitude}
          longitude={task.longitude}
          key={task._id}
          image={image}
          setImage={setImage}
          imageUrl={task.image}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteTask={onDeleteTask}
          editTask={editTask}
        />
      )
    });

  const filterList = FILTER_NAMES.map((name) => (<FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />));

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  navigator.geolocation.getCurrentPosition((position) => {
    setLongitude(position.coords.longitude);
    setLatitude(position.coords.latitude);
  });

  const onAddTask = async (name) => {
    // const res = {latitude, longitude};
    const newTask = {name: name, completed: false, latitude: latitude, longitude: longitude};
    const res = await addTask(newTask);
    await loadData();
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (<div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={onAddTask}/>

      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
