// Real world viewpoints for the four portfolio captures. Actors and HUD are
// configured by main.js; these cameras only frame that same playable scene.
export const SHOT_VIEWS = {
 play: { eye: [140,13,18], target: [117,2,0] },
 chase: { eye: [128,13,20], target: [110,1,0] },
 mission: { eye: [138,10,14], target: [117,2,0] },
 explore: { eye: [134,16,-12], target: [113,2,0] },
};

export const SHOT_FRAMES = 12;

export function frameShot(camera, name) {
 const view = SHOT_VIEWS[name];
 if (!view) return;
 camera.position.set(...view.eye);
 camera.lookAt(...view.target);
}
