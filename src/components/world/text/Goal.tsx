import React from "react";
import { type GoalProps, goalData } from "../worldData";
import ReactMarkdown from "react-markdown";

const Goal: React.FC<GoalProps> = () => {
  return (
    <div className="mx-10 items-start justify-center space-y-10 text-warmGrey3  ">
      {goalData.map((goal, index) => (
        <div key={index} className="flex justify-center align-middle">
          <h2 className="rounded-full border-2 border-warmGrey3 p-2 text-center text-base font-bold uppercase tracking-widest">
            {goal.title}
          </h2>
          {/* <div className="mt-4 text-justify text-base font-medium tracking-normal">
            <ReactMarkdown>{goal.description}</ReactMarkdown>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Goal;
