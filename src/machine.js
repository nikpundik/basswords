import { setup, assign, fromCallback } from "xstate";
import { levels } from "./levels";
import { calculate } from "./calculate";
import { cheat } from "./cheat";

export const gameMachine = setup({
  actions: {
    update: assign((_, { level, bassword }) => {
      const { result, rules } = calculate(level, bassword);
      return { result, rules, bassword };
    }),
    cheat: assign((_, { level, cheats }) => {
      const bassword = cheat(level);
      const { result, rules } = calculate(level, bassword);
      return { result, rules, bassword, cheats: cheats + 1 };
    }),
    load: assign((_, { levelIndex }) => ({
      level: levels[levelIndex],
      levelIndex,
      bassword: "",
      ...calculate(levels[levelIndex], ""),
    })),
    next: assign((_, { levelIndex }) => ({
      levelIndex: levelIndex + 1,
    })),
    restart: assign(() => ({
      levelIndex: 0,
      cheats: 0,
    })),
  },
  guards: {
    hasCheated: (_, { cheats }) => cheats > 1,
    isCompleted: (_, { result }) => result === 100,
    hasMoreLevels: (_, { levelIndex }) => levelIndex < levels.length - 1,
  },
  actors: {
    keyboard: fromCallback(({ sendBack }) => {
      const onKeyPress = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          sendBack({ type: "CONTINUE" });
        }
      };
      window.addEventListener("keypress", onKeyPress);
      return () => {
        window.removeEventListener("keypress", onKeyPress);
      };
    }),
  },
}).createMachine({
  id: "game",
  initial: "intro",
  context: {
    cheats: 0,
    result: 0,
    bassword: "",
    levelIndex: 0,
    level: levels[0],
    rules: [],
    result: 0,
  },
  states: {
    intro: {
      id: "intro",
      tags: "intro",
      on: { START: "game" },
    },
    game: {
      id: "game",
      invoke: {
        src: "keyboard",
      },
      entry: [
        {
          type: "load",
          params: ({ context: { levelIndex } }) => ({ levelIndex }),
        },
      ],
      initial: "todo",
      states: {
        evaluating: {
          always: [
            {
              guard: {
                type: "isCompleted",
                params: ({ context: { result } }) => ({ result }),
              },
              target: "completed",
            },
            { target: "todo" },
          ],
        },
        todo: {
          on: {
            CHEAT: {
              target: "evaluating",
              actions: {
                type: "cheat",
                params: ({ context: { level, cheats } }) => ({ level, cheats }),
              },
            },
          },
        },
        completed: {
          on: {
            CONTINUE: [
              {
                guard: {
                  type: "hasMoreLevels",
                  params: ({ context: { levelIndex } }) => ({ levelIndex }),
                },
                target: "#game",
                reenter: true,
                actions: {
                  type: "next",
                  params: ({ context: { levelIndex } }) => ({
                    levelIndex,
                  }),
                },
              },
              {
                guard: {
                  type: "hasCheated",
                  params: ({ context: { cheats } }) => ({ cheats }),
                },
                target: "#over",
              },
              { target: "#end" },
            ],
          },
        },
      },
      on: {
        TYPE: {
          target: ".evaluating",
          actions: {
            type: "update",
            params: ({ context: { level }, event: { bassword } }) => ({
              level,
              bassword,
            }),
          },
        },
      },
    },
    end: {
      id: "end",
      on: { CREDITS: { target: "credits" } },
    },
    over: {
      id: "over",
      on: { RESTART: { target: "intro", actions: "restart" } },
      on: { CREDITS: { target: "credits" } },
    },
    credits: {
      id: "credits",
      tags: "intro",
      on: { RESTART: { target: ".fadeout", actions: "restart" } },
      initial: "fadein",
      states: {
        fadein: {
          tags: "fade",
          after: {
            200: [{ target: "marquee" }],
          },
        },
        marquee: {},
        fadeout: {
          on: { RESTART: undefined },
          tags: "fade",
          after: {
            200: [{ target: "#intro" }],
          },
        },
      },
    },
  },
});
