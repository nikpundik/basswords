import React, { useState } from "react";

function Cheat({ onClick, completed }) {
  const [clicked, setCliked] = useState(false);
  const onClickConfirm = clicked
    ? () => {
        setCliked(false);
        onClick();
      }
    : () => {
        setCliked(true);
      };
  return (
    <button
      disabled={completed}
      onClick={onClickConfirm}
      className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold py-2 px-4 rounded-md disabled:bg-slate-200 disabled:text-slate-400"
    >
      {clicked ? "Are you sure?" : "Cheat"}
    </button>
  );
}

export function Game({ machine }) {
  const [snapshot, send] = machine;
  const { level, rules, bassword } = snapshot.context;
  const type = (e) => send({ type: "TYPE", bassword: e.target.value });
  const next = () => send({ type: "CONTINUE" });
  const cheat = () => send({ type: "CHEAT" });
  const completed = snapshot.matches("game.completed");
  return (
    <div className="bg-gradient-blurred">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-4xl space-y-4">
          <div
            className="bg-slate-50 rounded-lg border bg-card text-card-foreground shadow-lg p-6"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 mb-4">
              <h3 className="whitespace-nowrap tracking-tight text-xl font-bold">
                Level {level.index} of 7
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the password to{" "}
                {level.index === 7
                  ? "complete your test"
                  : "continue to the next level"}
                .
              </p>
            </div>
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required=""
                  type={completed ? "text" : "password"}
                  value={bassword}
                  onChange={type}
                  maxLength={50}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button
                disabled={!completed}
                onClick={next}
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-slate-200 disabled:text-slate-400"
              >
                Sign up
              </button>
              <Cheat key={level.index} completed={completed} onClick={cheat} />
            </div>
          </div>
          <div
            className="bg-slate-50 rounded-lg border bg-card text-card-foreground shadow-lg"
            data-v0-t="card"
          >
            <div className="p-6 space-y-4">
              {rules.map((current) => (
                <div
                  key={current.rule.name}
                  className="flex items-center space-x-2"
                >
                  <div className={`${current.result === 100 ? "" : "blur-sm"}`}>
                    {current.rule.name}
                  </div>
                  <div className="flex-1 h-3 rounded-lg bg-gray-200">
                    <div
                      className={`transition-all ease-in-out h-full rounded-lg bg-gradient-to-r ${
                        current.result === 100
                          ? "from-teal-500 to-teal-400"
                          : "from-orange-500 to-orange-400"
                      }`}
                      style={{ width: `${current.result}%` }}
                    ></div>
                  </div>
                  <div>{current.result}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
