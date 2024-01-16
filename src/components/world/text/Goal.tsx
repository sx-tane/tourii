import React from "react";
import { type GoalProps, goalData } from "../worldData";

const Goal: React.FC<GoalProps> = () => {
  return (
    <div className="mx-10 mt-10 flex flex-col items-start justify-center space-y-10 text-warmGrey3 md:flex-row md:space-x-10 md:space-y-0">
      {goalData.map((goal, index) => (
        <div key={index} className="w-full px-3 md:w-6/12">
          <h2 className="text-justify text-2xl font-bold uppercase tracking-widest">
            {goal.title}
          </h2>
          <p className="mt-4 text-justify text-base font-medium tracking-normal">
            {goal.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Goal;
