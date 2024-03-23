import React, { useEffect, useRef } from "react";

const people = [
  "Bartholomew 'Bart' Bassword IV - CEO & Founder (Brilliant inventor, slightly eccentric)",
  "Prudence 'Penny' Pincher - CFO (Master of efficiency, possibly a cyborg)",
  <br />,
  <b>Product Development</b>,
  "Dr. Fiona 'Fingers' Flinchlock - Lead Security Architect (Genius hacker with a nervous twitch)",
  "Maximilian 'Max' Memory - Senior Software Engineer (Remembers everything, terrible with names)",
  "Penelope 'Penny' Programmer - Junior Software Engineer (Always coding, always caffeinated)",
  "Phil 'Phisher' Fakerton - User Interface Designer (Makes password entry delightful, maybe a little too delightful)",
  "Bartholomew 'Barry' Bluster - Chief Marketing Officer (Loud and enthusiastic, questionable fashion sense)",
  "Sunshine Smiles - Sales Representative (Sunshine disposition, questionable sales tactics)",
  "Hector 'Helpful' Hernandez - Head of Customer Happiness (Always helpful, slightly too eager to please)",
  "Fiona 'Firewall' Flanagan - Technical Support Specialist (Brilliant problem-solver, terrible with small talk)",
  "Jingles - Chief Morale Officer (Office cat, purveyor of good vibes)",
  "Barista Bob - Beverage Specialist (Master coffee brewer, questionable hygiene standards)",
  "Dr. Helga 'Glitch' Helvetica - AI Development Lead (Brilliant but socially awkward)",
  "Sir Reginald 'Buttonmasher' Buttonsworth - QA Tester (Master gamer, questionable controller hygiene)",
  "Millie 'Millisecond' Moore - Network Architect (Lightning-fast reflexes, terrible at waiting in line)",
  "Sergeant Sheila 'Sharpshooter' Sharpe - Security Analyst (Eagle-eyed, slightly paranoid)",
  "Professor Percival 'Picklock' Peabody - Data Encryption Specialist (Master of puzzles, terrible at puns)",
  "Lavender 'Lullaby' Laine - Sound Designer (Creates calming soundscapes, sleeps on the job sometimes)",
  "Captain Cornelius 'Crash' Clipper - Level Designer (Builds epic worlds, prone to motion sickness)",
  "Beatrix 'Buzzword' Billingsworth - Technical Writer (Writes clear instructions, uses too much jargon)",
  <br />,
  <b>Marketing & Sales</b>,
  "DJ Disco Dan - Community Manager (Keeps the party going, questionable music taste)",
  "Fiona 'Firewall' Fitzpatrick - Community Moderator (Keeps the peace online, terrible at video games)",
  "Sergeant Pepperoni Pete - Security Guard (Strong and intimidating, loves pizza a little too much)",
  "Dr. Beatrice 'Bug Zapper' Brown - Bug Fixer (Solves problems quickly, hates insects)",
  "Polly 'Positive' Pocket - Social Media Manager (Spreads positivity, uses too many emojis)",
  "Wink Wink - Community Spy (Knows all the secrets, winks a lot)",
  "Clickety Clack - Data Entry Specialist (Fast typist, prone to repetitive stress injuries)",
  "Sergeant Strongarm Steve - Gym Security (Muscular and imposing, loves protein shakes)",
  "Harmony 'Hummingbird' Hernandez - Voice Actress (Soothing voice, afraid of heights)",
  "Giggles - Playtester (Always laughing, terrible at keeping a serious face)",
  "Zzzap - Network Technician (Fixes electrical problems, prone to naps)",
  <br />,
  <b>Antartica Division</b>,
  "Harold 'Hotfix' Henderson - Senior Software Engineer (Brilliant coder, sleeps under his desk sometimes)",
  "Dr. Amelia 'Alias' Anderson - Lead Character Artist (Creates lifelike characters, slightly obsessed with details)",
  "Max 'Mumble' Miller - Level Designer (Builds intricate worlds, terrible at public speaking)",
  "Samantha 'Soundbite' Smith - Sound Designer (Crafts immersive sound effects, collects weird sound libraries)",
  "William 'Walkthrough' Williams - QA Tester (Finds every bug, writes ridiculously long walkthroughs)",
  "Veronica 'Voiceover' Vasquez - Voice Actress (Brings characters to life, prone to dramatic readings)",
  "Theodore 'Texture' Thompson - Environment Artist (Creates stunning textures, questionable fashion sense)",
  "Brenda 'Balance' Brown - Game Designer (Ensures fair gameplay, argues with everyone about balance)",
  "Charles 'Cutscene' Clark - Cinematic Animator (Creates epic cutscenes, cries during emotional scenes)",
  "Fiona 'Firewall' Fitzpatrick - Network Programmer (Secures online gameplay, terrible at online games)",
  "Edgar 'Eagle Eye' Edwards - UI/UX Designer (Crafts intuitive interfaces, rearranges buttons constantly)",
  "David 'Data' Daniels - Data Analyst (Tracks player behavior, talks in spreadsheets)",
  "Gregory 'Glitch' Garcia - Bug Fixer (Solves problems quickly, hates Mondays)",
  "Helen 'Hype' Hernandez - Community Manager (Keeps fans engaged, uses too many exclamation marks!!!)",
  "Iris 'Immersion' Ito - Narrative Designer (Creates compelling stories, quotes movies in meetings)",
  <br />,
  <b>Additional Roles</b>,
  "Jack 'Joystick' Johnson - Game Tester (Plays games all day, questionable posture)",
  "Katherine 'Keyboard' Khan - Level Designer (Scripts intricate levels, terrible at typing)",
  "Leonardo 'Lag' Lopez - Network Engineer (Optimizes online performance, blames the internet for everything)",
  "Maria 'Motion Capture' Martinez - Motion Capture Artist (Brings characters to life with movement, gets very sweaty)",
  "Noah 'Narrative' Nelson - Writer (Crafts captivating storylines, prone to writer's block)",
  "Olivia 'Optimization' Olsen - Performance Engineer (Makes games run smoothly, loves efficiency)",
  "Patrick 'Pixel Perfect' Patel - 3D Artist (Creates stunning visuals, complains about pixelation constantly)",
  "Quentin 'Quest' Quinn - Quest Designer (Builds engaging quests, gets lost in his own game world)",
  "Richard 'Rig' Richards - Technical Artist (Makes complex systems visually appealing, talks in technical jargon)",
  "Susan 'Storyboard' Sanchez - Concept Artist (Visualizes game concepts, carries a sketchbook everywhere)",
  "Timothy 'Tweak' Taylor - Game Balancer (Fine-tunes gameplay, argues with designers about stats)",
  "Uma 'UI' Underwood - UI Artist (Designs beautiful interfaces, uses too many colors)",
  "Victor 'Voxel' Vaughn - 3D Environment Artist (Builds breathtaking worlds, obsessed with voxel technology)",
  "Wanda 'Worldbuilder' Williams - World Designer (Creates expansive game worlds, sleeps with a globe at night)",
  "Xavier 'SFX' Xavier - Sound Designer (Crafts impactful sound effects, collects strange instruments)",
  "Yvonne 'Yield' Yang - Producer (Keeps the project on track, juggles multiple tasks like a circus act)",
  <br />,
  <b>Music credits ♬</b>,
  "Never a fuss © created by Suno.ai",
];

export const Credits = ({ machine }) => {
  const [state, send] = machine;
  const requestId = useRef();
  const ref = useRef();
  const animate = (timestamp) => {
    ref.current.scrollTop += 1;
    requestId.current = requestAnimationFrame(animate);
  };

  const restart = () => send({ type: "RESTART" });

  useEffect(() => {
    ref.current.scrollTop = 0;
    requestId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestId.current);
    };
  }, []);

  const overlayBg = state.hasTag("fade") ? "opacity-0" : "opacity-100";

  return (
    <div className={`transition-opacity ease-out duration-200 ${overlayBg}`}>
      <audio autoPlay onEnded={restart}>
        <source src="/Basswords.mp3" type="audio/mpeg" />
      </audio>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50`}
      >
        <div className="flex justify-center items-center h-full">
          <div className="p-4 text-center text-white flex flex-col h-full w-full max-w-4xl">
            <h1 className="text-2xl font-bold py-8 shrink-0">♬ Credits ♬</h1>
            <div ref={ref} className="grow-1 overflow-y-auto">
              <div
                className="text-left"
                style={{
                  paddingTop: "100%",
                  paddingBottom: "200%",
                  lineHeight: "60px",
                }}
              >
                {people.map((person, i) => (
                  <p key={i} className="mb-1 truncate">
                    {person}
                  </p>
                ))}
              </div>
            </div>
            <div className="py-2 shrink-0">
              <button
                onClick={restart}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Send CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
