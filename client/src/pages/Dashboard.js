import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TodoForm from "../components/TodoForm";
import Spinner from "../components/Spinner";
import {
  reset,
  getTodos,
  deleteTodo,
  updateComplete,
} from "../features/todos/todoSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      console.log(message);
    }

    dispatch(getTodos());
  }, [user, navigate, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }


  const toggleTodo = (e) => {};

  const setaa = (e) => {
    e.preventDefault();

    const id = e.target.id;

    const data = {
      completed: true,
    };
    axios.put(`http://localhost:5000/todo/done/${id}`, data);
    window.location.reload();
  };

  const setFalse = (e) => {
    e.preventDefault();

    const id = e.target.id;

    const data = {
      completed: false,
    };
    axios.put(`http://localhost:5000/todo/done/${id}`, data);
    window.location.reload();
  };
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  return (
    <div>
      <Typography
        align="center"
        component="h1"
        variant="h5"
        fontWeight="bold"
        fontSize="30px"
      >
        {user && user.name} 's Todo List
      </Typography>

      <TodoForm />

      {todos && todos.length ? null : (
        <Typography
          align="center"
          sx={{ fontSize: 20 }}
          xs={12}
          sm={6}
          color="text.secondary"
          gutterBottom
        >
          Create Todos to See
        </Typography>
      )}

      {todos ? (
        todos.map((todo, index) => (
          <Card sx={{ minWidth: 275, ml: 30, mr: 30, mb: 2 }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography
                  sx={{ fontSize: 30, paddingLeft: 10 }}
                  xs={12}
                  sm={6}
                  color="text.secondary"
                  gutterBottom
                >
                  {todo.todo}
                </Typography>
              </Grid>

              <Grid item xs>
                {todo.completed == true ? (
                  <div>
                    <Switch
                      {...label}
                      defaultChecked
                      id={todo._id}
                      onChange={(e) => setFalse(e)}
                    />
                    <text>Completed</text>

                
                  </div>
                ) : (
                  <div>
                    <Switch
                      {...label}
                      defaultChecked={false}
                      id={todo._id}
                      onChange={(e) => setaa(e)}
                    />
                    <text>In Progress</text>
                 
                  </div>
                )}
              </Grid>

              <Grid sx={{ padding: 5 }} item xs>
                <Typography
                  sx={{ fontSize: 30, ml: 5 }}
                  xs={12}
                  sm={6}
                  color="text.secondary"
                  gutterBottom
                >
                  <div>
                    <Button
                      onClick={() => dispatch(deleteTodo(todo._id))}
                      variant="contained"
                      color="error"
                    >
                      {" "}
                      Delete
                    </Button>
                  </div>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontSize: 10, ml: 10 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {todo.createdAt.substring(0, 10)}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))
      ) : (
        <h1>Add Todo</h1>
      )}
    </div>
  );
}

export default Dashboard;
