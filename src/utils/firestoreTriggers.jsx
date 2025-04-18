import { useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  orderBy, // Import from Firestore instead of Lodash
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore"; // Add this import

export const triggerStatsRefresh = async (userId) => {
  try {
    const triggerRef = doc(collection(db, "dashboardTriggers"));
    console.log("🏹 Creating trigger:", triggerRef.id);
    await setDoc(triggerRef, {
      triggeredBy: userId,
      timestamp: serverTimestamp(), // Use server timestamp instead of client time
    });
  } catch (error) {
    console.error("Error triggering stats refresh:", error);
  }
};
export const useAdminStatsSync = (refetchFn) => {
  useEffect(() => {
    let isMounted = true;
    const processedIds = new Set();

    const triggersRef = collection(db, "dashboardTriggers");
    const q = query(
      triggersRef,
      where("timestamp", ">", new Date(Date.now() - 300000)), // 5 minute window
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true }, // Critical for immediate updates
      async (snapshot) => {
        if (!isMounted) return;

        // Get only NEW triggers that haven't been processed
        const newTriggers = snapshot.docChanges().filter(
          (change) =>
            change.type === "added" &&
            !processedIds.has(change.doc.id) &&
            !change.doc.metadata.hasPendingWrites // Ignore local writes
        );

        if (newTriggers.length > 0) {
          console.log(
            "🔥 Detected new triggers:",
            newTriggers.map((t) => t.doc.id)
          );

          // Process triggers and refetch
          const deletePromises = newTriggers.map(async ({ doc }) => {
            processedIds.add(doc.id);
            try {
              await deleteDoc(doc.ref);
              console.log(`✅ Deleted trigger ${doc.id}`);
            } catch (error) {
              console.error("❌ Delete failed:", error);
            }
          });

          await Promise.all(deletePromises);
          refetchFn(); // Remove debounce for immediate refresh
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [refetchFn]);
};
