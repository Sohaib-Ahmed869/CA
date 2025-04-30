// import { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { BsStopwatch, BsPlayFill, BsPauseFill } from "react-icons/bs";
// import { formatTime } from "../../utils/formatTime";
// import toast, { Toaster } from "react-hot-toast";
// const URL = import.meta.env.VITE_REACT_BACKEND_URL;

// const AgentTimer = ({ userId, logoutTrigger }) => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [totalTime, setTotalTime] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const [displayTime, setDisplayTime] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const getTodayDate = () => new Date().toISOString().split("T")[0];
//   const pauseTimer = async () => {
//     if (!isRunning || !startTime) return;

//     try {
//       const elapsed = Math.floor((Date.now() - startTime) / 1000);

//       // Update local state immediately
//       const newTotalTime = totalTime + elapsed;
//       setTotalTime(newTotalTime);
//       setDisplayTime(newTotalTime);
//       setIsRunning(false);
//       setStartTime(null);

//       // Make API call to update backend
//       await fetch(`${URL}/api/timer/pause`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, elapsed }),
//       });

//       console.log("Timer paused by logout trigger");
//     } catch (error) {
//       console.error("Failed to pause timer:", error);
//     }
//   };
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       pauseTimer();
//       return null;
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [isRunning, startTime, totalTime, userId]);

//   // Add effect to listen for logoutTrigger changes
//   useEffect(() => {
//     // Skip the first render (initial mount)
//     if (logoutTrigger > 0) {
//       console.log("Logout trigger detected, pausing timer");
//       pauseTimer();
//     }
//   }, [logoutTrigger]);
//   const loadTimerState = async () => {
//     try {
//       setIsLoading(true);
//       const today = getTodayDate();
//       const docRef = doc(db, "timerLogs", `${userId}_${today}`);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const savedTotalTime = data.totalTime || 0;

//         console.log("Loaded timer state:", data); // For debugging

//         // Always set the total and display time from Firebase
//         setTotalTime(savedTotalTime);
//         setDisplayTime(savedTotalTime);

//         if (data.status === "running" && data.lastStartTime) {
//           // If timer is running, calculate elapsed time since lastStartTime
//           const lastStartTimestamp = new Date(data.lastStartTime).getTime();
//           const elapsed = Math.floor((Date.now() - lastStartTimestamp) / 1000);

//           // Add the elapsed time since last start to total time for display
//           setDisplayTime(savedTotalTime + elapsed);

//           setIsRunning(true);
//           setStartTime(Date.now() - elapsed * 1000);
//         } else {
//           // If timer is paused, just display the saved total time
//           setIsRunning(false);
//           setStartTime(null);
//         }
//       } else {
//         console.log("No timer data found for today");
//         // Reset states if no data exists
//         setTotalTime(0);
//         setDisplayTime(0);
//         setIsRunning(false);
//         setStartTime(null);
//       }
//     } catch (error) {
//       console.error("Error loading timer state:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       loadTimerState();
//     }
//   }, [userId]);

//   // Effect for server ping when timer is running
//   useEffect(() => {
//     let interval;
//     if (isRunning) {
//       interval = setInterval(async () => {
//         await fetch(`${URL}/api/timer/ping`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         });
//       }, 60000);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning]);

//   // Effect for updating the display time every second when timer is running
//   useEffect(() => {
//     let timerInterval;
//     if (isRunning && startTime) {
//       // Update immediately
//       const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
//       setDisplayTime(totalTime + currentElapsed);

//       // Update every second
//       timerInterval = setInterval(() => {
//         const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
//         setDisplayTime(totalTime + currentElapsed);
//       }, 1000);
//     }
//     return () => clearInterval(timerInterval);
//   }, [isRunning, startTime, totalTime]);

//   const handleTimerAction = async () => {
//     if (isRunning) {
//       // Pause the timer
//       const elapsed = Math.floor((Date.now() - startTime) / 1000);

//       // Update local state immediately to show correct time when paused
//       const newTotalTime = totalTime + elapsed;
//       setTotalTime(newTotalTime);
//       setDisplayTime(newTotalTime);

//       await fetch(`${URL}/api/timer/pause`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, elapsed }),
//       });
//       toast.success("Timer paused");
//       setStartTime(null);
//     } else {
//       // Start/resume the timer
//       await fetch(`${URL}/api/timer/start`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       setStartTime(Date.now());
//       toast.success("Timer resumed");
//     }
//     setIsRunning(!isRunning);
//   };

//   return (
//     <div className="p-3 flex items-center gap-3 bg-emerald-700/20 rounded-xl my-1">
//       <div className="bg-emerald-700/50 p-2 rounded-lg">
//         <BsStopwatch className="text-xl text-white " />
//       </div>
//       <div className="flex-1 cursor-pointer transition-all duration-200 ease-in-out">
//         <div className="font-medium text-emerald-100">Agent Timer</div>
//         <div className="text-sm text-emerald-300">
//           {isLoading ? "Loading..." : formatTime(displayTime)}
//         </div>
//       </div>
//       <button
//         onClick={handleTimerAction}
//         disabled={isLoading}
//         className={`p-2 rounded-lg   transition-colors ${
//           isLoading
//             ? "opacity-50 cursor-not-allowed"
//             : "hover:bg-emerald-700/30"
//         }`}
//       >
//         {isRunning ? (
//           <BsPauseFill className="text-emerald-100 text-xl" />
//         ) : (
//           <BsPlayFill className="text-emerald-100 text-xl" />
//         )}
//       </button>
//     </div>
//   );
// };

// export default AgentTimer;
import { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { BsStopwatch, BsPlayFill, BsPauseFill } from "react-icons/bs";
import { formatTime } from "../../utils/formatTime";
import toast, { Toaster } from "react-hot-toast";
const URL = import.meta.env.VITE_REACT_BACKEND_URL;

const AgentTimer = ({ userId, logoutTrigger }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [displayTime, setDisplayTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(getTodayDate());
  const dateCheckRef = useRef(null);

  // Get today's date in YYYY-MM-DD format
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Check if the date has changed
  const checkDateTransition = () => {
    const newDate = getTodayDate();
    if (newDate !== currentDate) {
      console.log(`Date changed from ${currentDate} to ${newDate}`);
      handleDateTransition(newDate);
    }
  };

  // Handle the transition to a new day
  const handleDateTransition = async (newDate) => {
    try {
      if (isRunning) {
        // First, pause and save the timer for the previous date
        const elapsed = Math.floor((Date.now() - startTime) / 1000);

        // Save the elapsed time to the previous date
        await fetch(`${URL}/api/timer/pause`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            elapsed,
            date: currentDate, // Explicitly pass the previous date
          }),
        });

        toast.success(
          `Timer for ${currentDate} saved (${formatTime(totalTime + elapsed)})`
        );

        // Now start a new timer for the new date
        await fetch(`${URL}/api/timer/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            date: newDate, // Explicitly specify the new date
          }),
        });

        // Reset counters for the new day
        setTotalTime(0);
        setDisplayTime(0);
        setStartTime(Date.now());
        setCurrentDate(newDate);

        toast.success(`Started new timer for ${newDate}`);
      } else {
        // If timer is not running, just update the date
        setCurrentDate(newDate);
        // Reset counters for the new day
        setTotalTime(0);
        setDisplayTime(0);
        await loadTimerState(newDate);
      }
    } catch (error) {
      console.error("Error handling date transition:", error);
      toast.error("Failed to transition timer to new day");
    }
  };

  const pauseTimer = async () => {
    if (!isRunning || !startTime) return;

    try {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      // Update local state immediately
      const newTotalTime = totalTime + elapsed;
      setTotalTime(newTotalTime);
      setDisplayTime(newTotalTime);
      setIsRunning(false);
      setStartTime(null);

      // Make API call to update backend
      await fetch(`${URL}/api/timer/pause`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, elapsed, date: currentDate }),
      });

      console.log("Timer paused by logout trigger");
    } catch (error) {
      console.error("Failed to pause timer:", error);
    }
  };

  // Handle browser close/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      pauseTimer();
      return null;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning, startTime, totalTime, userId, currentDate]);

  // Add effect to listen for logoutTrigger changes
  useEffect(() => {
    // Skip the first render (initial mount)
    if (logoutTrigger > 0) {
      console.log("Logout trigger detected, pausing timer");
      pauseTimer();
    }
  }, [logoutTrigger]);

  // Set up an interval to check for date transitions every minute
  useEffect(() => {
    dateCheckRef.current = setInterval(() => {
      checkDateTransition();
    }, 60000); // Check every minute

    return () => {
      if (dateCheckRef.current) {
        clearInterval(dateCheckRef.current);
      }
    };
  }, [currentDate, isRunning, totalTime, startTime]);

  // Additional check for date transition when the component first loads
  useEffect(() => {
    const newDate = getTodayDate();
    if (newDate !== currentDate) {
      setCurrentDate(newDate);
    }
  }, []);

  const loadTimerState = async (dateToLoad = null) => {
    try {
      setIsLoading(true);
      const dateForLoading = dateToLoad || currentDate;
      const docRef = doc(db, "timerLogs", `${userId}_${dateForLoading}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const savedTotalTime = data.totalTime || 0;

        console.log(`Loaded timer state for ${dateForLoading}:`, data);

        // Always set the total and display time from Firebase
        setTotalTime(savedTotalTime);
        setDisplayTime(savedTotalTime);

        if (data.status === "running" && data.lastStartTime) {
          // If timer is running, calculate elapsed time since lastStartTime
          const lastStartTimestamp = new Date(data.lastStartTime).getTime();
          const elapsed = Math.floor((Date.now() - lastStartTimestamp) / 1000);

          // Add the elapsed time since last start to total time for display
          setDisplayTime(savedTotalTime + elapsed);

          setIsRunning(true);
          setStartTime(Date.now() - elapsed * 1000);
        } else {
          // If timer is paused, just display the saved total time
          setIsRunning(false);
          setStartTime(null);
        }
      } else {
        console.log(`No timer data found for ${dateForLoading}`);
        // Reset states if no data exists
        setTotalTime(0);
        setDisplayTime(0);
        setIsRunning(false);
        setStartTime(null);
      }
    } catch (error) {
      console.error("Error loading timer state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadTimerState();
    }
  }, [userId, currentDate]);

  // Effect for server ping when timer is running
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(async () => {
        // Check if date has changed before ping
        const newDate = getTodayDate();
        if (newDate !== currentDate) {
          checkDateTransition();
        } else {
          // Only ping if we're still on the same day
          await fetch(`${URL}/api/timer/ping`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, date: currentDate }),
          });
        }
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentDate]);

  // Effect for updating the display time every second when timer is running
  useEffect(() => {
    let timerInterval;
    if (isRunning && startTime) {
      // Update immediately
      const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
      setDisplayTime(totalTime + currentElapsed);

      // Update every second
      timerInterval = setInterval(() => {
        const currentElapsed = Math.floor((Date.now() - startTime) / 1000);
        setDisplayTime(totalTime + currentElapsed);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, startTime, totalTime]);

  const handleTimerAction = async () => {
    if (isRunning) {
      // Pause the timer
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      // Update local state immediately to show correct time when paused
      const newTotalTime = totalTime + elapsed;
      setTotalTime(newTotalTime);
      setDisplayTime(newTotalTime);

      await fetch(`${URL}/api/timer/pause`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, elapsed, date: currentDate }),
      });
      toast.success("Timer paused");
      setStartTime(null);
    } else {
      // First check if the date has changed
      const newDate = getTodayDate();
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
        setTotalTime(0);
        setDisplayTime(0);
      }

      // Start/resume the timer
      await fetch(`${URL}/api/timer/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, date: newDate }),
      });

      setStartTime(Date.now());
      toast.success("Timer resumed");
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="p-3 flex items-center gap-3 bg-emerald-700/20 rounded-xl my-1">
      <div className="bg-emerald-700/50 p-2 rounded-lg">
        <BsStopwatch className="text-xl text-white " />
      </div>
      <div className="flex-1 cursor-pointer transition-all duration-200 ease-in-out">
        <div className="font-medium text-emerald-100">Agent Timer</div>
        <div className="text-sm text-emerald-300">
          {isLoading ? "Loading..." : formatTime(displayTime)}
        </div>
      </div>
      <button
        onClick={handleTimerAction}
        disabled={isLoading}
        className={`p-2 rounded-lg transition-colors ${
          isLoading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-emerald-700/30"
        }`}
      >
        {isRunning ? (
          <BsPauseFill className="text-emerald-100 text-xl" />
        ) : (
          <BsPlayFill className="text-emerald-100 text-xl" />
        )}
      </button>
    </div>
  );
};

export default AgentTimer;
