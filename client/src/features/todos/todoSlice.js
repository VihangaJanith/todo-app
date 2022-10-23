import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addTodo = createAsyncThunk(
  "todo/add",
  async (todosData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);

      return await todoService.addTodo(todosData, token);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTodos = createAsyncThunk("todo/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);

    return await todoService.getTodos(token);
  } catch (e) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      console.log(token);

      return await todoService.deleteTodo(id, token);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComplete = createAsyncThunk(
  "goals/update",
  async ({ todoId, todoData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.updateComplete(todoId, todoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload.id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateComplete.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = [
          ...state.todos.filter((todo) => todo._id !== action.payload._id),
          action.payload,
        ];
      })
      .addCase(updateComplete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
