import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, del, post } from "../reduxFiles/slices/tasks";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const [taskField, setTaskField] = useState("");
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(add(taskField));
    setTaskField("");
  };

  return (
    <div>
      <div>
        <h1 className="mb-4">Add Tasks</h1>
        <form onSubmit={submit}>
          <div className="form-group form-floating">
            <input
              id="task"
              className="form-control"
              placeholder=""
              value={taskField}
              onChange={(e) => {
                setTaskField(e.target.value);
              }}
              required
            ></input>
            <label htmlFor="task">Task</label>
          </div>

          <button className="btn btn-success btn-block">Add Task</button>
        </form>
      </div>

      <div id="form-task-container" className="mt-2">
        {tasks.tasks.map((task, ctr) => {
          return (
            <div key={ctr}>
              <div className="form-task">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(del(task));
                  }}
                >
                  Delete
                </button>
                <p>
                  Task {ctr + 1}: {task.task}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-danger btn-block mt-2" onClick={() => {
        dispatch(post(tasks.tasks));
        // navigate("/")

      }}>
        Save Tasks
      </button>

      <p className="text-center">
        <FaUserEdit /> Saved tasks cannot be edited.
      </p>
    </div>
  );
}
