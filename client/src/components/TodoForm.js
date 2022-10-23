import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../features/todos/todoSlice";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";

const theme = createTheme();

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [validate, setValidate] = useState("false");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo) {
      setValidate("true");
      setTimeout(() => {
        setValidate("false");
      }, 4000);
      return false;
    } else {
      dispatch(addTodo({ todo }));
      setTodo("");
    }
  };

  return (
    <div>
      

      <ThemeProvider theme={theme}>
        <Container component="main">
          <Box>
            {validate === "true" ? (
              <Alert style={{ marginBottom: 10 }} severity="error">
                Please Enter a Todo
              </Alert>
            ) : null}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                required
                fullWidth
                name="todo"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                id="todo"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add TODO
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default TodoForm;
