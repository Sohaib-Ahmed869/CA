import { configureStore } from "@reduxjs/toolkit";
import adminDashboardStatsSlice from "./Admin/adminDashboardStatsSlice";
const store = configureStore({
  reducer: {
    adminDashboardStats: adminDashboardStatsSlice.reducer,
  },
});

export default store;
