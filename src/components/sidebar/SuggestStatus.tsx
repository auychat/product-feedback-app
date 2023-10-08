import React from "react";

const SuggestStatus = () => {
  const virtualData = [
    {
      color: "bg-orange-accent",
      text: "Planned",
      count: 2,
    },
    {
      color: "bg-purple-light",
      text: "In-Progress",
      count: 3,
    },
    {
      color: "bg-cyan-accent",
      text: "Live",
      count: 1,
    },
  ];

  return (
    <div className="w-[255px] min-h-[166px] p-6 bg-white rounded-[10px] shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-hm text-blue-dark">Roadmap</h2>
        <p className="text-b3 text-blue-primary font-bold underline">View</p>
      </div>

      {virtualData.map((data, index) => (
        <div key={index} className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            <div className={`w-[8px] h-[8px] rounded-full ${data.color}`} />
            <p className="text-b1 text-gray-text font-normal">{data.text}</p>
          </div>
          <p className="text-b1 text-gray-text font-bold">{data.count}</p>
        </div>
      ))}
    </div>
  );
};

export default SuggestStatus;
