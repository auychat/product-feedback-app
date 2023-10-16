import Roadmap from "@/app/roadmap/page";
import Link from "next/link";
import React, { useMemo, useContext, useEffect, useState, use } from "react";
import { FeedbackContext } from "@/context/FeedbackContext";

const SuggestStatus = () => {
  const { allFeedback } = useContext(FeedbackContext);

  const [statusCounts, setStatusCounts] = useState({
    plannedCount: 0,
    inProgressCount: 0,
    liveCount: 0,
  });

  useEffect(() => {
    // Calculate counts whenever allFeedback or its elements change
    const plannedCount = allFeedback.filter((feedback) => feedback.status === "planned").length;
    const inProgressCount = allFeedback.filter((feedback) => feedback.status === "in-progress").length;
    const liveCount = allFeedback.filter((feedback) => feedback.status === "live").length;

    setStatusCounts({
      plannedCount,
      inProgressCount,
      liveCount,
    });
  }, [allFeedback]);

  return (
    <div className="w-[255px] min-h-[166px] p-6 bg-white rounded-[10px] shadow-sm xs:w-[223px] sm:w-[223px] sm:pt-6 sm:pl-6 sm:pr-4">
      <div className="flex justify-between items-center">
        <h2 className="text-hm text-blue-dark">Roadmap</h2>
        <Link
          href="/roadmap"
          className="text-b3 text-blue-primary font-bold underline"
        >
          View
        </Link>
      </div>

      {/* Planned */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <div className="w-[8px] h-[8px] rounded-full bg-orange-accent" />

          <p className="text-b1 text-gray-text font-normal">Planned</p>
        </div>
        <p className="text-b1 text-gray-text font-bold">{statusCounts.plannedCount}</p>
      </div>

      {/* In-Progress */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <div className="w-[8px] h-[8px] rounded-full bg-purple-light" />

          <p className="text-b1 text-gray-text font-normal">In-Progress</p>
        </div>
        <p className="text-b1 text-gray-text font-bold">{statusCounts.inProgressCount}</p>
      </div>

      {/* Live */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <div className="w-[8px] h-[8px] rounded-full bg-cyan-accent" />

          <p className="text-b1 text-gray-text font-normal">Live</p>
        </div>
        <p className="text-b1 text-gray-text font-bold">{statusCounts.liveCount}</p>
      </div>
    </div>
  );
};

export default SuggestStatus;
