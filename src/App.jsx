import { useState, useCallback } from "react";

const TEAMS = [
  // EAST — per official 2026 bracket
  { id:"e1",  region:"East",   seed:1,  name:"Duke",         record:"32-2",  adjO:2,   adjD:4,   ft:76, to:17, conf:"ACC" },
  { id:"e16", region:"East",   seed:16, name:"Siena",        record:"17-15", adjO:210, adjD:180, ft:62, to:28, conf:"MAAC" },
  { id:"e8",  region:"East",   seed:8,  name:"Ohio St.",     record:"19-15", adjO:40,  adjD:28,  ft:72, to:21, conf:"Big Ten" },
  { id:"e9",  region:"East",   seed:9,  name:"TCU",          record:"21-13", adjO:45,  adjD:29,  ft:70, to:21, conf:"Big 12" },
  { id:"e5",  region:"East",   seed:5,  name:"St. John's",   record:"28-7",  adjO:64,  adjD:1,   ft:66, to:17, conf:"Big East" },
  { id:"e12", region:"East",   seed:12, name:"N. Iowa",      record:"24-10", adjO:82,  adjD:48,  ft:71, to:20, conf:"MVC" },
  { id:"e4",  region:"East",   seed:4,  name:"Kansas",       record:"24-10", adjO:48,  adjD:11,  ft:70, to:21, conf:"Big 12" },
  { id:"e13", region:"East",   seed:13, name:"Cal Baptist",  record:"23-10", adjO:115, adjD:80,  ft:67, to:24, conf:"WAC" },
  { id:"e6",  region:"East",   seed:6,  name:"Louisville",   record:"23-11", adjO:19,  adjD:26,  ft:73, to:18, conf:"ACC" },
  { id:"e11", region:"East",   seed:11, name:"SFLA",         record:"22-10", adjO:95,  adjD:62,  ft:68, to:23, conf:"ASUN" },
  { id:"e3",  region:"East",   seed:3,  name:"Michigan St.", record:"20-14", adjO:29,  adjD:5,   ft:70, to:20, conf:"Big Ten" },
  { id:"e14", region:"East",   seed:14, name:"NDAKST",       record:"21-12", adjO:130, adjD:95,  ft:65, to:26, conf:"Summit" },
  { id:"e7",  region:"East",   seed:7,  name:"UCLA",         record:"23-11", adjO:36,  adjD:17,  ft:73, to:18, conf:"Big Ten" },
  { id:"e10", region:"East",   seed:10, name:"UCF",          record:"20-13", adjO:55,  adjD:35,  ft:70, to:21, conf:"Big 12" },
  { id:"e2",  region:"East",   seed:2,  name:"UConn",        record:"22-13", adjO:31,  adjD:18,  ft:68, to:20, conf:"Big East" },
  { id:"e15", region:"East",   seed:15, name:"Furman",       record:"22-11", adjO:150, adjD:120, ft:64, to:26, conf:"SoCon" },
  // WEST — per official 2026 bracket
  { id:"w1",  region:"West",   seed:1,  name:"Arizona",      record:"27-7",  adjO:5,   adjD:7,   ft:75, to:16, conf:"Big 12" },
  { id:"w16", region:"West",   seed:16, name:"LIU",          record:"19-14", adjO:225, adjD:195, ft:61, to:29, conf:"NEC" },
  { id:"w8",  region:"West",   seed:8,  name:"Villanova",    record:"20-13", adjO:38,  adjD:26,  ft:73, to:19, conf:"Big East" },
  { id:"w9",  region:"West",   seed:9,  name:"Utah St.",     record:"24-10", adjO:30,  adjD:35,  ft:76, to:17, conf:"MWC" },
  { id:"w5",  region:"West",   seed:5,  name:"Wisconsin",    record:"24-10", adjO:10,  adjD:33,  ft:79, to:14, conf:"Big Ten" },
  { id:"w12", region:"West",   seed:12, name:"High Point",   record:"25-9",  adjO:105, adjD:72,  ft:68, to:24, conf:"Big South" },
  { id:"w4",  region:"West",   seed:4,  name:"Arkansas",     record:"19-15", adjO:44,  adjD:32,  ft:71, to:21, conf:"SEC" },
  { id:"w13", region:"West",   seed:13, name:"Hawaii",       record:"22-10", adjO:110, adjD:78,  ft:67, to:24, conf:"Big West" },
  { id:"w6",  region:"West",   seed:6,  name:"BYU",          record:"22-11", adjO:12,  adjD:68,  ft:72, to:22, conf:"Big 12" },
  { id:"w11", region:"West",   seed:11, name:"Texas/NC",     record:"21-13", adjO:52,  adjD:36,  ft:70, to:22, conf:"Play-in" },
  { id:"w3",  region:"West",   seed:3,  name:"Gonzaga",      record:"29-5",  adjO:8,   adjD:14,  ft:77, to:16, conf:"WCC" },
  { id:"w14", region:"West",   seed:14, name:"Kensaw St.",   record:"20-12", adjO:130, adjD:95,  ft:65, to:26, conf:"AAC" },
  { id:"w7",  region:"West",   seed:7,  name:"Miami FL",     record:"21-12", adjO:42,  adjD:27,  ft:71, to:21, conf:"ACC" },
  { id:"w10", region:"West",   seed:10, name:"Missouri",     record:"20-14", adjO:49,  adjD:24,  ft:69, to:22, conf:"SEC" },
  { id:"w2",  region:"West",   seed:2,  name:"Purdue",       record:"24-10", adjO:18,  adjD:12,  ft:80, to:15, conf:"Big Ten" },
  { id:"w15", region:"West",   seed:15, name:"Queens",       record:"21-11", adjO:170, adjD:140, ft:63, to:27, conf:"Big South" },
  // SOUTH — per official 2026 bracket
  { id:"s1",  region:"South",  seed:1,  name:"Florida",      record:"28-6",  adjO:3,   adjD:7,   ft:78, to:15, conf:"SEC" },
  { id:"s16", region:"South",  seed:16, name:"PVAM/Lehigh",  record:"18-14", adjO:220, adjD:190, ft:61, to:29, conf:"Play-in" },
  { id:"s8",  region:"South",  seed:8,  name:"Clemson",      record:"23-11", adjO:24,  adjD:15,  ft:71, to:19, conf:"ACC" },
  { id:"s9",  region:"South",  seed:9,  name:"Iowa",         record:"19-15", adjO:50,  adjD:30,  ft:72, to:21, conf:"Big Ten" },
  { id:"s5",  region:"South",  seed:5,  name:"Vanderbilt",   record:"20-14", adjO:42,  adjD:27,  ft:71, to:21, conf:"SEC" },
  { id:"s12", region:"South",  seed:12, name:"McNeese",      record:"28-5",  adjO:88,  adjD:45,  ft:71, to:20, conf:"SLC" },
  { id:"s4",  region:"South",  seed:4,  name:"Nebraska",     record:"22-12", adjO:33,  adjD:20,  ft:72, to:20, conf:"Big Ten" },
  { id:"s13", region:"South",  seed:13, name:"Troy",         record:"22-11", adjO:120, adjD:88,  ft:66, to:25, conf:"Sun Belt" },
  { id:"s6",  region:"South",  seed:6,  name:"N. Carolina",  record:"21-14", adjO:21,  adjD:40,  ft:74, to:19, conf:"ACC" },
  { id:"s11", region:"South",  seed:11, name:"VCU",          record:"22-11", adjO:71,  adjD:28,  ft:69, to:19, conf:"A-10" },
  { id:"s3",  region:"South",  seed:3,  name:"Illinois",     record:"21-13", adjO:15,  adjD:30,  ft:72, to:20, conf:"Big Ten" },
  { id:"s14", region:"South",  seed:14, name:"Penn",         record:"20-10", adjO:125, adjD:92,  ft:66, to:25, conf:"Ivy" },
  { id:"s7",  region:"South",  seed:7,  name:"Maryca",       record:"22-11", adjO:65,  adjD:38,  ft:70, to:21, conf:"MAAC" },
  { id:"s10", region:"South",  seed:10, name:"Texas A&M",    record:"20-14", adjO:44,  adjD:32,  ft:71, to:21, conf:"SEC" },
  { id:"s2",  region:"South",  seed:2,  name:"Houston",      record:"28-6",  adjO:9,   adjD:2,   ft:70, to:17, conf:"Big 12" },
  { id:"s15", region:"South",  seed:15, name:"Idaho",        record:"18-15", adjO:180, adjD:150, ft:63, to:27, conf:"Big Sky" },
  // MIDWEST — per official 2026 bracket
  { id:"m1",  region:"Midwest", seed:1, name:"Michigan",     record:"27-7",  adjO:11,  adjD:9,   ft:74, to:18, conf:"Big Ten" },
  { id:"m16", region:"Midwest", seed:16,name:"UMBC/HC",      record:"18-14", adjO:225, adjD:190, ft:61, to:29, conf:"Play-in" },
  { id:"m8",  region:"Midwest", seed:8, name:"Georgia",      record:"20-14", adjO:32,  adjD:25,  ft:71, to:20, conf:"SEC" },
  { id:"m9",  region:"Midwest", seed:9, name:"Saint Louis",  record:"21-12", adjO:55,  adjD:34,  ft:72, to:20, conf:"A-10" },
  { id:"m5",  region:"Midwest", seed:5, name:"Texas Tech",   record:"23-11", adjO:6,   adjD:37,  ft:71, to:19, conf:"Big 12" },
  { id:"m12", region:"Midwest", seed:12,name:"Akron",        record:"24-10", adjO:110, adjD:78,  ft:67, to:24, conf:"MAC" },
  { id:"m4",  region:"Midwest", seed:4, name:"Alabama",      record:"20-14", adjO:4,   adjD:31,  ft:66, to:23, conf:"SEC" },
  { id:"m13", region:"Midwest", seed:13,name:"Hofstra",      record:"23-10", adjO:108, adjD:80,  ft:67, to:24, conf:"CAA" },
  { id:"m6",  region:"Midwest", seed:6, name:"Tennessee",    record:"25-9",  adjO:18,  adjD:3,   ft:73, to:16, conf:"SEC" },
  { id:"m11", region:"Midwest", seed:11,name:"MIAOH/SP",     record:"21-13", adjO:82,  adjD:38,  ft:72, to:20, conf:"Play-in" },
  { id:"m3",  region:"Midwest", seed:3, name:"Virginia",     record:"22-11", adjO:25,  adjD:12,  ft:74, to:17, conf:"ACC" },
  { id:"m14", region:"Midwest", seed:14,name:"Wright St.",   record:"21-12", adjO:125, adjD:92,  ft:65, to:25, conf:"Horizon" },
  { id:"m7",  region:"Midwest", seed:7, name:"Kentucky",     record:"22-12", adjO:4,   adjD:57,  ft:72, to:21, conf:"SEC" },
  { id:"m10", region:"Midwest", seed:10,name:"Santa Clara",  record:"25-8",  adjO:66,  adjD:34,  ft:73, to:19, conf:"WCC" },
  { id:"m2",  region:"Midwest", seed:2, name:"Iowa State",   record:"25-9",  adjO:20,  adjD:5,   ft:74, to:18, conf:"Big 12" },
  { id:"m15", region:"Midwest", seed:15,name:"Tenn. State",  record:"20-13", adjO:175, adjD:148, ft:64, to:27, conf:"OVC" },
];

const BRACKET_REGIONS = {
  East:    { color:"#3b82f6", ids:["e1","e16","e8","e9","e5","e12","e4","e13","e6","e11","e3","e14","e7","e10","e2","e15"] },
  West:    { color:"#a78bfa", ids:["w1","w16","w8","w9","w5","w12","w4","w13","w6","w11","w3","w14","w7","w10","w2","w15"] },
  South:   { color:"#22c55e", ids:["s1","s16","s8","s9","s5","s12","s4","s13","s6","s11","s3","s14","s7","s10","s2","s15"] },
  Midwest: { color:"#f59e0b", ids:["m1","m16","m8","m9","m5","m12","m4","m13","m6","m11","m3","m14","m7","m10","m2","m15"] },
};

const ROUND_NAMES = ["","Round of 64","Round of 32","Sweet 16","Elite Eight"];

// ── localStorage persistence ──────────────────────────────────────────────────
function lsSave(claims, picks) {
  try { localStorage.setItem("mm26", JSON.stringify({ claims, picks })); } catch(e) {}
}
function lsLoad() {
  try {
    const d = localStorage.getItem("mm26");
    return d ? JSON.parse(d) : { claims: {}, picks: [] };
  } catch(e) { return { claims: {}, picks: [] }; }
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getTier(adjO, adjD) {
  if (adjO <= 25 && adjD <= 25) return { label:"Champion tier", color:"#22c55e" };
  if (adjO <= 40 && adjD <= 25) return { label:"Deep run",      color:"#3b82f6" };
  if (adjO <= 25 && adjD <= 40) return { label:"Watch out",     color:"#a78bfa" };
  if (adjO <= 60 && adjD <= 40) return { label:"Dark horse",    color:"#f59e0b" };
  return                               { label:"First exit",    color:"#6b7280" };
}

function earliestCollision(myIds, regionIds) {
  const mine = regionIds.filter(id => myIds.includes(id));
  if (mine.length < 2) return null;
  const idx = id => regionIds.indexOf(id);
  const round = (i, j) => {
    if (Math.floor(i/2) === Math.floor(j/2)) return 1;
    if (Math.floor(i/4) === Math.floor(j/4)) return 2;
    if (Math.floor(i/8) === Math.floor(j/8)) return 3;
    return 4;
  };
  let min = 99;
  for (let a = 0; a < mine.length; a++)
    for (let b = a+1; b < mine.length; b++)
      min = Math.min(min, round(idx(mine[a]), idx(mine[b])));
  return min === 99 ? null : min;
}

// ── Draft components ──────────────────────────────────────────────────────────
function StatPill({ label, value, isRank }) {
  let dot;
  if (isRank)            dot = value<=15?"#22c55e":value<=35?"#f59e0b":"#ef4444";
  else if(label==="TO%") dot = value<=17?"#22c55e":value<=21?"#f59e0b":"#ef4444";
  else                   dot = value>=76?"#22c55e":value>=71?"#f59e0b":"#ef4444";
  return (
    <div style={{background:"#0f0f0f",borderRadius:8,padding:"10px 12px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <span style={{fontSize:9,fontWeight:700,letterSpacing:"1.2px",textTransform:"uppercase",color:"#555"}}>{label}</span>
        <span style={{width:6,height:6,borderRadius:"50%",background:dot,display:"inline-block",marginTop:2}}/>
      </div>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,lineHeight:1,color:"#fff",marginTop:4}}>
        {isRank ? `#${value}` : `${value}%`}
      </div>
    </div>
  );
}

function TeamCard({ team, status, onClaim, onTaken, onClear, pickNumber }) {
  const tier = getTier(team.adjO, team.adjD);
  const isMine = status==="mine", isTaken = status==="taken";
  return (
    <div style={{background:"#141414",border:isMine?`2px solid ${tier.color}`:"1px solid #1e1e1e",borderRadius:14,overflow:"hidden",opacity:isTaken?0.35:1,transition:"all 0.2s",position:"relative",boxShadow:isMine?`0 0 20px ${tier.color}22`:"none"}}>
      {isMine&&pickNumber&&<div style={{position:"absolute",top:8,right:8,zIndex:2,background:tier.color,color:"#000",fontSize:9,fontWeight:800,padding:"2px 7px",borderRadius:20}}>PICK #{pickNumber}</div>}
      {isTaken&&<div style={{position:"absolute",top:8,right:8,zIndex:2,background:"#2a2a2a",color:"#555",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:20}}>TAKEN</div>}
      <div style={{height:3,background:tier.color,opacity:0.7}}/>
      <div style={{padding:"12px 14px 10px"}}>
        <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:2}}>
          <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:11,color:"#555"}}>#{team.seed}</span>
          <span style={{fontSize:9,color:"#444",fontWeight:600,textTransform:"uppercase"}}>{team.conf}</span>
        </div>
        <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:24,color:"#fff",lineHeight:1,marginBottom:1}}>{team.name}</div>
        <div style={{fontSize:10,color:"#555"}}>{team.record}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,padding:"0 8px 8px"}}>
        <StatPill label="Adj. Off" value={team.adjO} isRank/>
        <StatPill label="Adj. Def" value={team.adjD} isRank/>
        <StatPill label="FT%"      value={team.ft}   isRank={false}/>
        <StatPill label="TO%"      value={team.to}   isRank={false}/>
      </div>
      <div style={{padding:"8px 14px 12px",borderTop:"1px solid #1a1a1a",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontSize:9,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:tier.color}}>{tier.label}</span>
        <div style={{display:"flex",gap:6}}>
          {!isMine&&!isTaken&&<>
            <button onClick={onClaim} style={{fontSize:9,fontWeight:700,background:tier.color,color:"#000",border:"none",borderRadius:6,padding:"5px 10px",cursor:"pointer"}}>MINE</button>
            <button onClick={onTaken} style={{fontSize:9,fontWeight:700,background:"#222",color:"#666",border:"1px solid #2a2a2a",borderRadius:6,padding:"5px 10px",cursor:"pointer"}}>TAKEN</button>
          </>}
          {(isMine||isTaken)&&<button onClick={onClear} style={{fontSize:9,fontWeight:700,background:"#1e1e1e",color:"#888",border:"1px solid #2a2a2a",borderRadius:6,padding:"5px 10px",cursor:"pointer"}}>UNDO</button>}
        </div>
      </div>
    </div>
  );
}

// ── Bracket components ────────────────────────────────────────────────────────
function BracketTeamSlot({ teamId, claims }) {
  const team = TEAMS.find(t => t.id === teamId);
  if (!team) return null;
  const status = claims[teamId];
  const mine = status==="mine", taken = status==="taken";
  const region = Object.entries(BRACKET_REGIONS).find(([,v])=>v.ids.includes(teamId));
  const color = region ? region[1].color : "#555";
  return (
    <div style={{display:"flex",alignItems:"center",gap:5,padding:"3px 7px",borderRadius:4,background:mine?`${color}18`:taken?"#0d0d0d":"#111",border:mine?`1.5px solid ${color}`:taken?"1px solid #1a1a1a":"1px solid #1c1c1c",opacity:taken?0.4:1,transition:"all 0.2s",boxShadow:mine?`0 0 6px ${color}33`:"none",position:"relative",overflow:"hidden",minWidth:0}}>
      {mine&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:color}}/>}
      <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:10,color:mine?color:"#444",minWidth:14,textAlign:"center",flexShrink:0}}>{team.seed}</span>
      <span style={{fontSize:10,fontWeight:mine?600:400,color:mine?"#fff":taken?"#2a2a2a":"#777",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:90}}>{team.name}</span>
      {mine&&<div style={{marginLeft:"auto",width:4,height:4,borderRadius:"50%",background:color,flexShrink:0}}/>}
    </div>
  );
}

function PlaceholderSlot({ teamIds, claims, color, label }) {
  const mine = teamIds.filter(id => claims[id]==="mine");
  const hasMine = mine.length > 0;
  return (
    <div style={{padding:"3px 7px",borderRadius:4,background:hasMine?`${color}18`:"#0d0d0d",border:hasMine?`1px solid ${color}55`:"1px dashed #1e1e1e",fontSize:9,color:hasMine?color:"#2a2a2a",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:hasMine?700:400}}>
      {hasMine ? `✦ ${mine.map(id=>TEAMS.find(t=>t.id===id)?.name).join(" / ")}` : label}
    </div>
  );
}

function ConnectorSVG({ centers1, totalH, color, side }) {
  const W = 16;
  const paired = [];
  for (let i = 0; i < centers1.length; i+=2)
    paired.push((centers1[i]+centers1[i+1])/2);
  const lines = centers1.flatMap((y1,i) => {
    const y2 = paired[Math.floor(i/2)];
    return side==="left"
      ? [<line key={`a${i}`} x1={0}   y1={y1} x2={W/2} y2={y1} stroke={color+"55"} strokeWidth={1}/>,
         <line key={`b${i}`} x1={W/2} y1={y1} x2={W/2} y2={y2} stroke={color+"55"} strokeWidth={1}/>,
         <line key={`c${i}`} x1={W/2} y1={y2} x2={W}   y2={y2} stroke={color+"55"} strokeWidth={1}/>]
      : [<line key={`a${i}`} x1={W}   y1={y1} x2={W/2} y2={y1} stroke={color+"55"} strokeWidth={1}/>,
         <line key={`b${i}`} x1={W/2} y1={y1} x2={W/2} y2={y2} stroke={color+"55"} strokeWidth={1}/>,
         <line key={`c${i}`} x1={W/2} y1={y2} x2={0}   y2={y2} stroke={color+"55"} strokeWidth={1}/>];
  });
  return <svg width={W} height={totalH} style={{flexShrink:0,overflow:"visible"}}>{lines}</svg>;
}

function RegionBracket({ regionName, claims, side }) {
  const { color, ids } = BRACKET_REGIONS[regionName];
  const myIds = Object.entries(claims).filter(([,v])=>v==="mine").map(([k])=>k);
  const collision = earliestCollision(myIds, ids);
  const myInRegion = ids.filter(id=>myIds.includes(id)).length;
  const slotH=24;
  // Explicit Y top for each of the 16 R1 slots.
  // Real bracket structure per half (8 teams):
  //   [0v1] gapInner [1] gapPair [2v3] gapInner [3] gapPod [4v5] gapInner [5] gapPair [6v7] gapInner [7]
  // Then gapHalf before the second half mirrors the same pattern.
  const gapI=4, gapP=14, gapPod=32, gapH=52;
  // tops[0..15]: absolute Y of each slot
  const tops=[];
  // Half 0: slots 0-7
  let y=0;
  tops.push(y); y+=slotH+gapI; // 0
  tops.push(y); y+=slotH+gapP; // 1 — end of matchup 0v1
  tops.push(y); y+=slotH+gapI; // 2
  tops.push(y); y+=slotH+gapPod;// 3 — end of matchup 2v3, pod boundary
  tops.push(y); y+=slotH+gapI; // 4
  tops.push(y); y+=slotH+gapP; // 5 — end of matchup 4v5
  tops.push(y); y+=slotH+gapI; // 6
  tops.push(y); y+=slotH+gapH; // 7 — end of matchup 6v7, half boundary
  // Half 1: slots 8-15 (same pattern)
  tops.push(y); y+=slotH+gapI; // 8
  tops.push(y); y+=slotH+gapP; // 9
  tops.push(y); y+=slotH+gapI; // 10
  tops.push(y); y+=slotH+gapPod;// 11
  tops.push(y); y+=slotH+gapI; // 12
  tops.push(y); y+=slotH+gapP; // 13
  tops.push(y); y+=slotH+gapI; // 14
  tops.push(y);                  // 15
  const totalH=tops[15]+slotH+8;
  // R1 centers: midpoint between each paired slot
  const r1C=[
    (tops[0]+tops[1])/2+slotH/2,
    (tops[2]+tops[3])/2+slotH/2,
    (tops[4]+tops[5])/2+slotH/2,
    (tops[6]+tops[7])/2+slotH/2,
    (tops[8]+tops[9])/2+slotH/2,
    (tops[10]+tops[11])/2+slotH/2,
    (tops[12]+tops[13])/2+slotH/2,
    (tops[14]+tops[15])/2+slotH/2,
  ];
  const r2C=[];for(let i=0;i<8;i+=2)r2C.push((r1C[i]+r1C[i+1])/2);
  const s16C=[];for(let i=0;i<4;i+=2)s16C.push((r2C[i]+r2C[i+1])/2);
  const e8C=(s16C[0]+s16C[1])/2;
  const sw=110;
  const colR1=(<div style={{position:"relative",width:sw,height:totalH,flexShrink:0}}>{ids.map((id,i)=><div key={id} style={{position:"absolute",top:tops[i],left:0,right:0}}><BracketTeamSlot teamId={id} claims={claims}/></div>)}</div>);
  const colR2=(<div style={{position:"relative",width:sw,height:totalH,flexShrink:0}}>{r2C.map((cy,i)=><div key={i} style={{position:"absolute",top:cy-slotH/2,left:0,right:0}}><PlaceholderSlot teamIds={[ids[i*2],ids[i*2+1],ids[i*2+2],ids[i*2+3]]} claims={claims} color={color} label={`R32: ${TEAMS.find(t=>t.id===ids[i*2])?.seed}/${TEAMS.find(t=>t.id===ids[i*2+1])?.seed}/${TEAMS.find(t=>t.id===ids[i*2+2])?.seed}/${TEAMS.find(t=>t.id===ids[i*2+3])?.seed}`}/></div>)}</div>);
  const colS16=(<div style={{position:"relative",width:sw,height:totalH,flexShrink:0}}>{s16C.map((cy,i)=><div key={i} style={{position:"absolute",top:cy-slotH/2,left:0,right:0}}><PlaceholderSlot teamIds={ids.slice(i*8,i*8+8)} claims={claims} color={color} label="Sweet 16"/></div>)}</div>);
  const colE8=(<div style={{position:"relative",width:84,height:totalH,flexShrink:0}}><div style={{position:"absolute",top:e8C-slotH/2,left:0,right:0,padding:"4px 8px",borderRadius:5,background:`${color}15`,border:`1px dashed ${color}55`,textAlign:"center"}}><span style={{fontFamily:"'Bebas Neue',cursive",fontSize:11,color,letterSpacing:1}}>Elite 8</span></div></div>);
  const c1=<ConnectorSVG centers1={r1C} totalH={totalH} color={color} side={side}/>;
  const c2=<ConnectorSVG centers1={r2C} totalH={totalH} color={color} side={side}/>;
  const c3=<ConnectorSVG centers1={s16C} totalH={totalH} color={color} side={side}/>;
  const cols=side==="left"?[colR1,c1,colR2,c2,colS16,c3,colE8]:[colE8,c3,colS16,c2,colR2,c1,colR1];
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:side==="right"?"flex-end":"flex-start"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexDirection:side==="right"?"row-reverse":"row"}}>
        <span style={{fontFamily:"'Bebas Neue',cursive",fontSize:15,letterSpacing:2,color}}>{regionName}</span>
        {myInRegion>0&&<span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10,background:`${color}22`,color,border:`1px solid ${color}44`}}>{myInRegion} PICK{myInRegion>1?"S":""}</span>}
        {collision&&<span style={{fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10,background:"#ef444422",color:"#ef4444",border:"1px solid #ef444444"}}>⚠ Clash {ROUND_NAMES[collision]}</span>}
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"flex-start"}}>{cols.map((col,i)=><span key={i}>{col}</span>)}</div>
    </div>
  );
}

function FinalFourCenter({ claims }) {
  const rc={ East:"#3b82f6", West:"#a78bfa", South:"#22c55e", Midwest:"#f59e0b" };
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:"0 14px",minWidth:80}}>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:12,letterSpacing:3,color:"#2a2a2a",textAlign:"center",lineHeight:1.2}}>FINAL<br/>FOUR</div>
      <div style={{width:1,height:20,background:"#1a1a1a"}}/>
      <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:10,letterSpacing:2,color:"#1e1e1e"}}>CHAMPION</div>
      {Object.entries(rc).map(([r,c])=>{
        const n=Object.entries(claims).filter(([id,v])=>v==="mine"&&id.startsWith(r[0].toLowerCase())).length;
        return n>0?<div key={r} style={{fontSize:8,fontWeight:700,color:c}}>{n} {r}</div>:null;
      })}
    </div>
  );
}

function BracketTab({ claims }) {
  const myIds=Object.entries(claims).filter(([,v])=>v==="mine").map(([k])=>k);
  const collisions=Object.entries(BRACKET_REGIONS).map(([name,data])=>({name,round:earliestCollision(myIds,data.ids),color:data.color})).filter(c=>c.round!==null);
  return (
    <div style={{padding:"20px 16px"}}>
      <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:20,flexWrap:"wrap"}}>
        {[["#22c55e22","YOUR PICK"],["#0d0d0d","TAKEN"],["#111","AVAILABLE"]].map(([bg,label],i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:5}}>
            <div style={{width:12,height:12,borderRadius:2,background:bg,border:i===0?"1.5px solid #22c55e":"1px solid #1c1c1c",opacity:i===1?0.4:1}}/>
            <span style={{fontSize:9,color:"#555"}}>{label}</span>
          </div>
        ))}
        {collisions.length>0&&(
          <div style={{marginLeft:"auto",background:"#ef444411",border:"1px solid #ef444433",borderRadius:8,padding:"6px 12px"}}>
            <div style={{fontSize:9,fontWeight:700,color:"#ef4444"}}>⚠ {collisions.length} CLASH{collisions.length>1?"ES":""}</div>
            {collisions.map(c=><div key={c.name} style={{fontSize:8,color:"#ef4444",opacity:0.7}}>{c.name}: {ROUND_NAMES[c.round]}</div>)}
          </div>
        )}
      </div>
      <div style={{overflowX:"auto"}}>
        <div style={{display:"flex",alignItems:"flex-start",minWidth:980}}>
          <div style={{display:"flex",flexDirection:"column",gap:36}}>
            <RegionBracket regionName="East"    claims={claims} side="left"/>
            <RegionBracket regionName="West"    claims={claims} side="left"/>
          </div>
          <FinalFourCenter claims={claims}/>
          <div style={{display:"flex",flexDirection:"column",gap:36}}>
            <RegionBracket regionName="South"   claims={claims} side="right"/>
            <RegionBracket regionName="Midwest" claims={claims} side="right"/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function App() {
  const saved = lsLoad();
  const [tab, setTab]               = useState("draft");
  const [claims, setClaims]         = useState(saved.claims);
  const [myPicks, setMyPicks]       = useState(saved.picks);
  const [filterRegion, setFilter]   = useState("All");
  const [filterTier, setFilterTier] = useState("All");
  const [sortBy, setSortBy]         = useState("seed");
  const [searchQ, setSearchQ]       = useState("");

  const claim     = id => { const nc={...claims,[id]:"mine"};  const np=myPicks.includes(id)?myPicks:[...myPicks,id]; setClaims(nc);setMyPicks(np);lsSave(nc,np); };
  const markTaken = id => { const nc={...claims,[id]:"taken"}; const np=myPicks.filter(p=>p!==id); setClaims(nc);setMyPicks(np);lsSave(nc,np); };
  const clear     = id => { const nc={...claims};delete nc[id]; const np=myPicks.filter(p=>p!==id); setClaims(nc);setMyPicks(np);lsSave(nc,np); };
  const resetAll  = ()  => { if(confirm("Reset all picks?")){ setClaims({});setMyPicks([]);lsSave({},[]); } };

  const tiers   = ["All","Champion tier","Deep run","Watch out","Dark horse","First exit"];
  const regions = ["All","East","West","South","Midwest"];

  const filtered = TEAMS.filter(t => {
    if (filterRegion!=="All"&&t.region!==filterRegion) return false;
    if (filterTier!=="All"&&getTier(t.adjO,t.adjD).label!==filterTier) return false;
    if (searchQ&&!t.name.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  }).sort((a,b) => {
    if(sortBy==="seed") return a.seed-b.seed||a.region.localeCompare(b.region);
    if(sortBy==="adjO") return a.adjO-b.adjO;
    if(sortBy==="adjD") return a.adjD-b.adjD;
    if(sortBy==="ft")   return b.ft-a.ft;
    if(sortBy==="to")   return a.to-b.to;
    return 0;
  });

  const myTeams    = myPicks.map(id=>TEAMS.find(t=>t.id===id)).filter(Boolean);
  const mineCount  = myPicks.length;
  const takenCount = Object.values(claims).filter(v=>v==="taken").length;
  const availCount = TEAMS.length - mineCount - takenCount;
  const btn = active => ({fontFamily:"'Bebas Neue',cursive",fontSize:15,letterSpacing:"1.5px",padding:"10px 22px",border:"none",borderRadius:8,cursor:"pointer",background:active?"#fff":"transparent",color:active?"#000":"#555",transition:"all 0.15s"});

  return (
    <div style={{background:"#0a0a0a",minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* HEADER */}
      <div style={{borderBottom:"1px solid #1a1a1a",padding:"20px 24px 0"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:16}}>
          <div>
            <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,letterSpacing:2,lineHeight:1}}>MARCH MADNESS DRAFT</div>
            <div style={{fontSize:11,color:"#555",marginTop:3}}>2026 · 68 Teams · 4 Regions</div>
          </div>
          <div style={{display:"flex",gap:20,alignItems:"center"}}>
            {[["#22c55e",mineCount,"My Picks"],["#ef4444",takenCount,"Taken"],["#fff",availCount,"Available"]].map(([c,n,l])=>(
              <div key={l} style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:22,color:c}}>{n}</div>
                <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"0.8px"}}>{l}</div>
              </div>
            ))}
            <button onClick={resetAll} style={{fontSize:9,fontWeight:700,background:"transparent",color:"#444",border:"1px solid #2a2a2a",borderRadius:6,padding:"6px 12px",cursor:"pointer"}}>Reset</button>
          </div>
        </div>
        <div style={{display:"flex",gap:4}}>
          {[["draft","Draft Board"],["roster","My Roster"],["stats","Stats View"],["bracket","Bracket View"]].map(([key,label])=>(
            <button key={key} onClick={()=>setTab(key)} style={btn(tab===key)}>{label}</button>
          ))}
        </div>
      </div>

      {/* DRAFT BOARD */}
      {tab==="draft"&&(
        <div style={{padding:24}}>
          <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
            <input placeholder="Search team…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} style={{background:"#141414",border:"1px solid #222",borderRadius:8,padding:"8px 12px",color:"#fff",fontSize:12,outline:"none",width:160}}/>
            {regions.map(r=>(
              <button key={r} onClick={()=>setFilter(r)} style={{fontSize:10,fontWeight:700,letterSpacing:"0.8px",textTransform:"uppercase",padding:"6px 14px",borderRadius:20,border:"1px solid",cursor:"pointer",background:filterRegion===r?"#fff":"transparent",color:filterRegion===r?"#000":"#555",borderColor:filterRegion===r?"#fff":"#2a2a2a"}}>{r}</button>
            ))}
            <select value={filterTier} onChange={e=>setFilterTier(e.target.value)} style={{background:"#141414",border:"1px solid #222",borderRadius:8,padding:"6px 10px",color:"#888",fontSize:10,outline:"none"}}>
              {tiers.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:"#141414",border:"1px solid #222",borderRadius:8,padding:"6px 10px",color:"#888",fontSize:10,outline:"none"}}>
              {[["seed","Sort: Seed"],["adjO","Sort: Offense"],["adjD","Sort: Defense"],["ft","Sort: FT%"],["to","Sort: TO%"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          {filterRegion==="All" ? (
            ["East","West","South","Midwest"].map(region=>{
              const rt=filtered.filter(t=>t.region===region);
              if(!rt.length)return null;
              return (
                <div key={region} style={{marginBottom:32}}>
                  <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:18,letterSpacing:2,color:"#333",marginBottom:12,borderBottom:"1px solid #1a1a1a",paddingBottom:6}}>{region} Region</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
                    {rt.map(t=><TeamCard key={t.id} team={t} status={claims[t.id]} onClaim={()=>claim(t.id)} onTaken={()=>markTaken(t.id)} onClear={()=>clear(t.id)} pickNumber={myPicks.indexOf(t.id)+1||null}/>)}
                  </div>
                </div>
              );
            })
          ):(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
              {filtered.map(t=><TeamCard key={t.id} team={t} status={claims[t.id]} onClaim={()=>claim(t.id)} onTaken={()=>markTaken(t.id)} onClear={()=>clear(t.id)} pickNumber={myPicks.indexOf(t.id)+1||null}/>)}
            </div>
          )}
          {filtered.length===0&&<div style={{color:"#444",textAlign:"center",padding:60,fontSize:13}}>No teams match.</div>}
        </div>
      )}

      {/* MY ROSTER */}
      {tab==="roster"&&(
        <div style={{padding:24}}>
          {myTeams.length===0?(
            <div style={{textAlign:"center",padding:80,color:"#333"}}>
              <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:32,letterSpacing:2,marginBottom:8}}>No picks yet</div>
              <div style={{fontSize:12,color:"#444"}}>Head to Draft Board and hit MINE</div>
            </div>
          ):(
            <>
              <div style={{marginBottom:20,padding:"14px 18px",background:"#141414",border:"1px solid #1e1e1e",borderRadius:12,display:"flex",gap:32}}>
                {[["#22c55e",myTeams.length,"Teams Drafted"],["#fff",myTeams.filter(t=>getTier(t.adjO,t.adjD).label==="Champion tier").length,"Champion Tier"],["#f59e0b",myTeams.filter(t=>["Deep run","Watch out"].includes(getTier(t.adjO,t.adjD).label)).length,"Deep Run"]].map(([c,v,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Bebas Neue',cursive",fontSize:28,color:c}}>{v}</div>
                    <div style={{fontSize:9,color:"#555",textTransform:"uppercase",letterSpacing:"0.8px"}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:10}}>
                {myTeams.map((t,i)=><TeamCard key={t.id} team={t} status="mine" onClaim={()=>{}} onTaken={()=>markTaken(t.id)} onClear={()=>clear(t.id)} pickNumber={i+1}/>)}
              </div>
            </>
          )}
        </div>
      )}

      {/* STATS VIEW */}
      {tab==="stats"&&(
        <div style={{padding:24}}>
          <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{background:"#141414",border:"1px solid #222",borderRadius:8,padding:"7px 12px",color:"#888",fontSize:11,outline:"none"}}>
              {[["seed","Sort: Seed"],["adjO","Best Offense"],["adjD","Best Defense"],["ft","FT%"],["to","TO%"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
            {regions.map(r=>(
              <button key={r} onClick={()=>setFilter(r)} style={{fontSize:10,fontWeight:700,textTransform:"uppercase",padding:"6px 14px",borderRadius:20,border:"1px solid",cursor:"pointer",background:filterRegion===r?"#fff":"transparent",color:filterRegion===r?"#000":"#555",borderColor:filterRegion===r?"#fff":"#2a2a2a"}}>{r}</button>
            ))}
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead>
                <tr style={{borderBottom:"1px solid #1e1e1e"}}>
                  {["Status","Seed","Team","Region","Adj Off","Adj Def","FT%","TO%","Tier"].map(h=>(
                    <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:9,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"#444"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t=>{
                  const tier=getTier(t.adjO,t.adjD);
                  const st=claims[t.id];
                  const pn=myPicks.indexOf(t.id)+1;
                  return (
                    <tr key={t.id} style={{borderBottom:"1px solid #111",opacity:st==="taken"?0.35:1,background:st==="mine"?"#0d1a0d":"transparent"}}>
                      <td style={{padding:"10px 12px"}}>
                        {st==="mine"&&<span style={{background:tier.color,color:"#000",fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:10}}>#{pn} MINE</span>}
                        {st==="taken"&&<span style={{background:"#222",color:"#555",fontSize:8,fontWeight:700,padding:"2px 7px",borderRadius:10}}>TAKEN</span>}
                        {!st&&<span style={{color:"#333",fontSize:10}}>—</span>}
                      </td>
                      <td style={{padding:"10px 12px",fontFamily:"'Bebas Neue',cursive",color:"#555",fontSize:14}}>#{t.seed}</td>
                      <td style={{padding:"10px 12px",fontWeight:600,color:"#fff"}}>{t.name}</td>
                      <td style={{padding:"10px 12px",color:"#555",fontSize:11}}>{t.region}</td>
                      <td style={{padding:"10px 12px",color:t.adjO<=15?"#22c55e":t.adjO<=35?"#f59e0b":"#ef4444",fontFamily:"'Bebas Neue',cursive",fontSize:16}}>#{t.adjO}</td>
                      <td style={{padding:"10px 12px",color:t.adjD<=15?"#22c55e":t.adjD<=35?"#f59e0b":"#ef4444",fontFamily:"'Bebas Neue',cursive",fontSize:16}}>#{t.adjD}</td>
                      <td style={{padding:"10px 12px",color:t.ft>=76?"#22c55e":t.ft>=71?"#f59e0b":"#ef4444"}}>{t.ft}%</td>
                      <td style={{padding:"10px 12px",color:t.to<=17?"#22c55e":t.to<=21?"#f59e0b":"#ef4444"}}>{t.to}%</td>
                      <td style={{padding:"10px 12px"}}><span style={{color:tier.color,fontSize:10,fontWeight:700}}>{tier.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BRACKET VIEW */}
      {tab==="bracket"&&<BracketTab claims={claims}/>}
    </div>
  );
}
