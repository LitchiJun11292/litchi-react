import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialStateInter {
  value: number;
  posts: any[];
  status: string;
}

const initialState: InitialStateInter = {
  value: 0,
  posts: [],
  status: "idle",
};

export const fetchPosts = createAsyncThunk("counter/fetchPosts", async () => {
  const response = await new Promise((re) => {
    re(9);
  });
  return response;
});

export const fetchUsers = createAsyncThunk("counter/fetchUsers", async () => {
  const response: any = await new Promise((re) => {
    re({ value: 0, posts: [], status: "idle" });
  });
  return response;
});

export const addNewPost = createAsyncThunk(
  "counter/addNewPost",
  async (initialPost: string) => {
    const response: any = await new Promise((re) => {
      re(initialPost);
    });
    return response;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
