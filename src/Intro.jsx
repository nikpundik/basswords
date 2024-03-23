import React from "react";

export function Intro({ machine }) {
  const [snapshot, send] = machine;
  return (
    <div>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-4xl space-y-4">
          <div className="bg-slate-50 rounded-lg border bg-card text-lg text-card-foreground shadow-lg p-6 mb-8">
            <p className="mb-2 text-xl font-bold">Welcome to Basswords™!</p>
            <p className="mb-2">
              Congratulations on your <b>first day</b> at Basswords™!
              <br />
              It's an exciting moment as you embark on this journey to showcase
              your talents and become an integral part of our team.
            </p>
            <p className="mb-4">
              In today's digital age, global systems have undergone{" "}
              <b>significant enhancements</b>. However, with these advancements
              comes the challenge of ensuring secure access to restricted areas.
              Customers now face difficulties in{" "}
              <b>submitting their passwords</b>, and that's where Basswords™
              steps in. Here at Basswords™, we pride ourselves on being the
              solution to these digital dilemmas.
              <br />
              Our mission is clear: to{" "}
              <b>
                assist customers in regaining access to their vital accounts and
                data.
              </b>
            </p>
            <p className="mb-2">
              Your journey begins with your <b>placement exam</b>. It's an
              opportunity for you to demonstrate your skills and determination.
              Are you ready to embrace the challenges ahead and prove yourself
              as a valuable member of the <b>Basswords™ team</b>? Welcome
              aboard, and let the adventure begin!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => send({ type: "START" })}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Accept job offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
