import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stats: {
    totalApplications: 0,
    totalPayments: 0,
    paidApplications: 0,
    certificatesGenerated: 0,
    rtoApplications: 0,
    pendingPayments: 0,
    totalCustomers: 0,
    totalAgents: 0,
    colorStatusCount: {
      hotLead: 0,
      warmLead: 0,
      coldLead: 0,
      others: 0,
    },
    conversionRate: 0,
    completionRate: 0,
  },
  chartsData: [],
  loading: false,
  error: null,
  selectedAgent: null,
  userId: null,
};

const adminDashboardStatsSlice = createSlice({
  name: "adminDashboardStats",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setChartsData: (state, action) => {
      state.chartsData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const adminDashboardStatsActions = adminDashboardStatsSlice.actions;
export const { setStats, setChartsData, setLoading, setError, clearError } =
  adminDashboardStatsSlice.actions;

export default adminDashboardStatsSlice;
