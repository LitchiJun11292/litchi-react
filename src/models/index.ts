import { configureStore } from "@reduxjs/toolkit";
import counter from "./counter";
import loading from "./loading";

export default configureStore({
  reducer: { counter, loading },
});
