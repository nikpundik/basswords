import React from "react";

export function GameOver({ machine }) {
  const [snapshot, send] = machine;
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-[50%] space-y-4">
          <div className="bg-slate-50 rounded-lg border bg-card text-lg text-card-foreground shadow-lg p-6 mb-8">
            <p className="mb-2 text-xl font-bold">You are fired!</p>
            <p className="mb-2">
              It has come to my attention that Emily and Christopher, our
              exemplary employees, have uncovered <b>evidence of cheating</b>{" "}
              during your first day at Basswords™. Such behavior is{" "}
              <b>intolerable</b> and goes against the core values of our
              company. As a result, we regret to inform you that your employment
              with us is <b>terminated effective immediately</b>.
            </p>
            <p className="italic">
              Yours truly,
              <br />
              Basswords™ CEO
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => send({ type: "CREDITS" })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Resign
            </button>
            <button
              onClick={() => send({ type: "RESTART" })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Send CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
