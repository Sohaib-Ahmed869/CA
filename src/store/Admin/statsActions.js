import {
  getChartData,
  getDashboardStats,
} from "../../Customer/Services/adminServices";
import { adminDashboardStatsActions } from "./adminDashboardStatsSlice";

export const fetchDashboardData =
  (userId, selectedAgent) => async (dispatch) => {
    try {
      dispatch(adminDashboardStatsActions.clearError());
      dispatch(adminDashboardStatsActions.setLoading(true));

      const [statsData, chartsData] = await Promise.all([
        getDashboardStats({ id: userId, agentId: selectedAgent }),
        getChartData({ id: userId, agentId: selectedAgent }),
      ]);

      // Handle stats data
      if (statsData.message) {
        throw new Error(statsData.message);
      } else {
        dispatch(adminDashboardStatsActions.setStats(statsData));
      }

      // Handle chart data
      if (chartsData.message) {
        throw new Error(chartsData.message);
      } else {
        dispatch(adminDashboardStatsActions.setChartsData(chartsData));
      }
    } catch (error) {
      dispatch(adminDashboardStatsActions.setError(error.message));
    } finally {
      dispatch(adminDashboardStatsActions.setLoading(false));
    }
  };
