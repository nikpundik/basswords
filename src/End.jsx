import React from "react";

export function End({ machine }) {
  const [snapshot, send] = machine;
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-4xl space-y-4">
          <div className="bg-slate-50 rounded-lg border bg-card text-lg text-card-foreground shadow-lg p-6 mb-8">
            <p className="mb-2 text-xl font-bold">
              Incredible! You've made it!
            </p>
            <p className="mb-2">
              Congratulations on completing this incredible journey! Get ready
              for the next phase where you'll craft <b>billions of passwords</b>{" "}
              on behalf of real users, tackling the{" "}
              <b>toughest rules imaginable</b>.
            </p>
            <p className="mb-8">
              Your efforts will be met with <b>eternal gratitude</b>. Welcome to
              the next chapter of the adventure!
            </p>
            <p className="italic">
              Yours truly,
              <br />
              Basswords™ CEO
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => send({ type: "CREDITS" })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Resign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
