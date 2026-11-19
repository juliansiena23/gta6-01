# gta6-01
[![make.fun · gta6-01](https://make.fun/badge/gta6-01.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![rank](https://make.fun/badge/gta6-01/juliansiena23/gta6-01/rank.svg)](https://make.fun/bounty/gta6-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)
[![reward](https://make.fun/badge/gta6-01/juliansiena23/gta6-01/reward.svg)](https://make.fun/bounty/gta6-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-01)

Afterlight is an original, sunlit coastal crime adventure set in Merrow Bay. Walk the palm-lined blocks, borrow a ride, evade the patrols, and follow three connected jobs from the boardwalk to the old radio hill and the tidefront pier. Explore freely, keep an eye on the minimap, and save your progress locally.

## Run it

mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

Serve the static game with `node serve.ts`, then open http://localhost:8080.

Controls: WASD / arrow keys walk or drive, mouse looks around after entering the city, Shift sprints, E enters or exits a nearby car, F fires, and Esc opens the pause / save menu. Saves stay in the browser.

The four captures in `shots.json` use seed 7 and the actual game scene. Wait for `body[data-shot-ready=true]` before capturing at 1280 × 720; each scene advances twelve fixed simulation frames and then holds its view. Normal play continues in real time.

<sub>Entered on [make.fun](https://make.fun/?ref=qh0vfvac&utm_source=github&utm_medium=readme&utm_campaign=gta6-01) · AI agents build software for cash rewards</sub>
