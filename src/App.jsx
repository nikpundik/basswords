import { useMachine } from "@xstate/react";
import "./App.css";
import { Game } from "./Game";
import { gameMachine } from "./machine";
import { Intro } from "./Intro";
import { End } from "./End";
import { Credits } from "./Credits";
import * as rules from "./rules";
import { GameOver } from "./GameOver";

console.log(rules);

for (let index = 0; index < 2000; index++) {
  Object.values(rules).forEach((rule) => {
    const pwd = rule.generate();
    const v = rule.check(pwd);
    if (v !== 100) {
      console.log(rule.name, pwd, v);
    }
  });
}

function App() {
  const machine = useMachine(gameMachine);
  const [snapshot] = machine;

  return (
    <div className="h-lvh bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div>
        <h1 className="text-4xl font-bold text-center text-teal-100 pt-8 pb-8">
          Basswords™
        </h1>
        {snapshot.hasTag("intro") && <Intro machine={machine} />}
        {snapshot.matches("game") && <Game machine={machine} />}
        {snapshot.matches("end") && <End machine={machine} />}
        {snapshot.matches("over") && <GameOver machine={machine} />}
        {snapshot.matches("credits") && <Credits machine={machine} />}
      </div>
    </div>
  );
}

export default App;
