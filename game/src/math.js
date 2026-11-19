export function seededRandom(seed=1){let s=seed>>>0;return()=>{s=(s+0x6d2b79f5)|0;let t=Math.imul(s^(s>>>15),1|s);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296}}
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function angleLerp(a,b,t){let d=((b-a+Math.PI*3)%(Math.PI*2))-Math.PI;return a+d*t}
