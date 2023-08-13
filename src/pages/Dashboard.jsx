import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verify, logout } from "../reduxFiles/slices/auth";
import { reset, get } from "../reduxFiles/slices/tasks";
import TaskForm from "./TaskForm";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, expired } = useSelector((state) => state.auth);
  const { mainTasks, loading, success, reject } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();
  const today = new Date();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(verify({ token: user.token }));
    }

    if (expired) {
      dispatch(logout());
    }

    dispatch(get());

    return () => {
      dispatch(reset());
    };
  }, [user, expired]);

  if (loading) {
    return <h1>LOADING TASKS</h1>;
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <h1>Current User: {user && user.name}</h1>
            <div className="mt-4" id="task-container">
              <h2 className="mb-3">Recent Tasks</h2>
              {mainTasks.length == 0 ? (
                <div id="no-tasks">
                  <div>
                    <>No saved tasks for this day</>
                  </div>
                </div>
              ) : (
                <div className="current-tasks">
                  {mainTasks.map((task, ctr) => {
                    let taskDate = new Date(task.createdAt);
                    let taskDateStr = `${taskDate.getDate()}-${
                      taskDate.getMonth() + 1
                    }-${taskDate.getFullYear()}`;

                    return (
                      <div
                        className="current-task"
                        key={ctr}
                        style={{
                          color:
                            taskDate.getDate() == today.getDate() &&
                            "lightgreen",
                        }}
                      >
                        <h3>
                          {task.text}
                        </h3>
                        <p>{taskDateStr}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="col">
            <TaskForm />
          </div>
        </div>
      </div>
    </>
  );
}
