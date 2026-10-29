import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, Waves, Orbit, Gamepad2, Palette, X, RotateCcw, Play, Pause, Volume2, VolumeX, Download, Undo2, MousePointer2 } from 'lucide-react';
import FlowState from './experiences/FlowState.jsx';

const experiences = [
  { id: 'flow', category: 'CREATE', title: 'Flow State', desc: 'Shape a living field of color, movement, and happy accidents.', tag: 'GENERATIVE ART', icon: Sparkles, theme: 'art', status: 'CREATE NOW' },
  { id: 'sound', category: 'CREATE', title: 'Sound Garden', desc: 'Find your listening mode: calm, steady, sleep or read.', tag: 'AMBIENT SOUND', icon: Waves, theme: 'sound', status: 'PLAY NOW' },
  { id: 'gravity', category: 'EXPLORE', title: 'Gravity Room', desc: 'Explore familiar planetary gravity and build little worlds.', tag: 'SPACE & PHYSICS', icon: Orbit, theme: 'gravity', status: 'EXPLORE NOW' },
  { id: 'reaction', category: 'PLAY', title: 'Quick Reflex', desc: 'Wait for the signal and test your reaction time.', tag: 'MINI GAME', icon: Gamepad2, theme: 'game', status: 'PLAY NOW' },
  { id: 'draw', category: 'CREATE', title: 'Draw Studio', desc: 'A blank canvas, a few colors, and room to make a mess.', tag: 'CREATIVE CANVAS', icon: Palette, theme: 'draw', status: 'CREATE NOW' },
  { id: 'memory', category: 'PLAY', title: 'Memory Match', desc: 'Find matching pairs and see how well you remember.', tag: 'BRAIN GAME', icon: Sparkles, theme: 'memory', status: 'PLAY NOW' },
  { id: 'pattern', category: 'PLAY', title: 'Pattern Pulse', desc: 'Watch a pattern, then repeat it from memory.', tag: 'SEQUENCE GAME', icon: Waves, theme: 'pattern', status: 'PLAY NOW' },
  { id: 'word', category: 'PLAY', title: 'Word Sprint', desc: 'Find as many words as you can before time runs out.', tag: 'WORD GAME', icon: Gamepad2, theme: 'word', status: 'PLAY NOW' },
];

export default function App() {
  const [active, setActive] = useState('All');
  const [openExperience, setOpenExperience] = useState(null);
  const filtered = active === 'All' ? experiences : experiences.filter(e => e.category === active);
  const open = id => setOpenExperience(id);
  useEffect(() => {
    const key = e => { if (e.key === 'Escape') setOpenExperience(null); };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Open Learn Lab home"><span className="brand-mark"><Sparkles size={17}/></span><span>openlearn<span className="brand-period">lab.</span></span></a>
      <nav className="nav-links" aria-label="Main navigation"><a href="#discover">Experiences</a><a href="#about">About</a></nav>
      <a className="top-cta" href="#discover">Explore the lab <ArrowUpRight size={15}/></a>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot"/> A LITTLE SPACE TO WANDER</div>
          <h1>Curiosity looks<br/>good <span>on you.</span></h1>
          <p className="hero-description">A little corner of the internet where you can make things, play with ideas, and stumble into something unexpected.</p>
          <div className="hero-actions"><a className="button-primary" href="#discover">Find your next thing <ArrowUpRight size={17}/></a><span className="no-pressure">No goals. No pressure. Just play.</span></div>
        </div>
        <div className="hero-art" aria-label="Decorative abstract floating shapes">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-sun"/><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-orb orb-three"/><div className="hero-orb orb-four"/>
          <div className="art-label label-top">made for curious minds</div><div className="art-label label-bottom"><span>✳</span> your browser, but more fun</div>
        </div>
        <div className="hero-bottom"><span>01 / A DIFFERENT KIND OF WEBSITE</span><span>SCROLL TO WANDER ↓</span></div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-heading"><div><div className="eyebrow muted-eyebrow">THE OPEN PLAYGROUND</div><h2>What are you in<br className="mobile-break"/> the mood for?</h2></div><p>Eight little worlds, each with something to try.<br/>No accounts. No downloads. Just jump in.</p></div>
        <div className="filters" role="group" aria-label="Filter experiences">{['All','CREATE','PLAY','EXPLORE'].map(f => <button key={f} onClick={() => setActive(f)} className={active === f ? 'filter active' : 'filter'}>{f === 'All' ? 'Everything' : f}</button>)}</div>
        <div className="experience-grid">
          {filtered.map((item, i) => { const Icon = item.icon; return <article key={item.id} className={`experience-card ${item.theme}`} style={{'--delay': `${i * 55}ms`}}>
            <div className="card-visual">
              {item.id === 'flow' ? <div className="mini-particles">{Array.from({length: 32}, (_, n) => <i key={n} style={{'--i': n}}/>)}</div> : item.id === 'sound' ? <div className="sound-bars">{Array.from({length: 28}, (_, n) => <i key={n} style={{'--i': n}}/>)}</div> : item.id === 'gravity' ? <div className="gravity-visual"><div className="planet planet-a"/><div className="planet planet-b"/><div className="gravity-ring"/></div> : item.id === 'draw' ? <div className="draw-visual"><span>〰</span><i>✳</i><b>✎</b></div> : item.id === 'memory' ? <div className="new-game-visual memory-tiles">{['✦','●','▲','●'].map((x,j)=><i key={j}>{x}</i>)}</div> : item.id === 'pattern' ? <div className="new-game-visual pattern-tiles">{['●','●','●','●'].map((x,j)=><i key={j} style={{'--i':j}}>{x}</i>)}</div> : item.id === 'word' ? <div className="new-game-visual word-tiles"><b>W</b><b>O</b><b>R</b><b>D</b></div> : <div className="game-visual"><div className="game-shape shape-a"/><div className="game-shape shape-b"/><div className="game-shape shape-c"/><span>READY?</span></div>}
              <span className="visual-icon"><Icon size={17}/></span>
            </div>
            <div className="card-content"><div className="card-meta"><span>{item.tag}</span><span className="status-ready">● {item.status}</span></div><h3>{item.title}</h3><p>{item.desc}</p><button className="card-link" onClick={() => open(item.id)}>Step inside <ArrowUpRight size={16}/></button></div>
          </article>})}
        </div>
        <div className="coming-note"><span className="note-icon"><Sparkles size={18}/></span><div><strong>Everything here is ready to try.</strong><p>Explore at your own pace. Your work stays in your browser unless you choose to save it.</p></div><span className="note-sparkle">✳</span></div>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-mark"><Sparkles size={23}/></div><p>Not everything needs to be productive.<br/><span>Some things can just be wonderful.</span></p><div className="manifesto-foot"><span>MADE FOR THE IN-BETWEEN MOMENTS</span><span>TAKE YOUR TIME ✳</span></div></section>
      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark"><Sparkles size={15}/></span><span>openlearn<span className="brand-period">lab.</span></span></a><span>A small experiment in having a good time.</span><span className="credit">BUILT BY <strong>MOHAMMED IBAAD</strong> · 4NI24IS106</span></footer>
    </main>

    {openExperience && <div className="experience-overlay" role="presentation" onMouseDown={e => {if(e.target === e.currentTarget) setOpenExperience(null);}}>
      <div className="experience-modal" role="dialog" aria-modal="true" aria-label={`${experiences.find(x=>x.id===openExperience)?.title} experience`}>
        <button className="close-modal" onClick={() => setOpenExperience(null)} aria-label="Close experience"><X size={20}/></button>
        {openExperience === 'flow' && <FlowState/>}
        {openExperience === 'sound' && <SoundGarden/>}
        {openExperience === 'gravity' && <GravityRoom/>}
        {openExperience === 'reaction' && <QuickReflex/>}
        {openExperience === 'draw' && <DrawStudio/>}
        {openExperience === 'memory' && <MemoryMatch/>}
        {openExperience === 'pattern' && <PatternPulse/>}
        {openExperience === 'word' && <WordSprint/>}
      </div>
    </div>}
  </div>;
}

function ModalHeader({eyebrow, title, description}) {
  return <div className="tool-heading"><div className="eyebrow"><span className="live-dot"/>{eyebrow}</div><h2>{title}</h2><p>{description}</p></div>;
}

function QuickReflex() {
  const [phase,setPhase]=useState('idle'),[result,setResult]=useState(null),[best,setBest]=useState(null);
  const timer=useRef(null),start=useRef(0);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  const begin=()=>{clearTimeout(timer.current);setResult(null);setPhase('waiting');timer.current=setTimeout(()=>{start.current=performance.now();setPhase('go');},1200+Math.random()*2500);};
  const hit=()=>{if(phase==='waiting'){clearTimeout(timer.current);setPhase('early');return;}if(phase==='go'){const ms=Math.round(performance.now()-start.current);setResult(ms);setBest(b=>b===null?ms:Math.min(b,ms));setPhase('done');}};
  return <div className="tool-body"><ModalHeader eyebrow="PLAY / REACTION TEST" title="Quick Reflex" description="Wait for green, then tap as quickly as you can. Jump early and the round resets."/><button className={`reaction-pad phase-${phase}`} onClick={phase==='waiting'||phase==='go'?hit:begin}><span>{phase==='idle'?'Ready when you are':phase==='waiting'?'Wait for green…':phase==='go'?'TAP NOW!':phase==='early'?'Too soon!':`${result} ms`}</span><small>{phase==='done'?'reaction time':phase==='early'?'patience is part of the game':phase==='waiting'?'stay focused':'tap to start'}</small></button><div className="result-row"><div><span>LAST RESULT</span><strong>{result===null?'—':`${result} ms`}</strong></div><div><span>PERSONAL BEST</span><strong>{best===null?'—':`${best} ms`}</strong></div><button className="control-button" onClick={begin}><RotateCcw size={15}/> Try again</button></div><p className="tool-footnote">Just for fun — not a medical or professional performance assessment.</p></div>;
}

function GravityRoom() {
  const [mode,setMode]=useState('planet'),[planet,setPlanet]=useState('Earth'),[height,setHeight]=useState(10),[mass,setMass]=useState(10),[count,setCount]=useState(6),[running,setRunning]=useState(true);
  const canvas=useRef(null), sim=useRef({bodies:[],drag:-1});
  const worlds={Mercury:3.7,Venus:8.87,Earth:9.81,Moon:1.62,Mars:3.71,Jupiter:24.79,Saturn:10.44,Uranus:8.69,Neptune:11.15};
  const g=worlds[planet],fallTime=Math.sqrt((2*height)/g),weight=mass*g,impact=Math.sqrt(2*g*height);
  const reset=()=>{const c=canvas.current;if(!c)return;const w=c.clientWidth||700,h=c.clientHeight||320;sim.current.bodies=Array.from({length:count},(_,i)=>({x:w*(.12+Math.random()*.76),y:h*(.15+Math.random()*.7),vx:(Math.random()-.5)*1.1,vy:(Math.random()-.5)*1.1,r:5+Math.random()*7,mass:.5+Math.random()*2,hue:[35,190,250,330,85,45,220,300][i%8]}));};
  useEffect(()=>{if(mode!=='universe')return;const c=canvas.current;if(!c)return;const ctx=c.getContext('2d');let raf;const resize=()=>{const dpr=Math.min(window.devicePixelRatio||1,2);c.width=c.clientWidth*dpr;c.height=c.clientHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};resize();reset();const draw=()=>{const w=c.clientWidth,h=c.clientHeight;ctx.clearRect(0,0,w,h);ctx.fillStyle='#080d1a';ctx.fillRect(0,0,w,h);for(let i=0;i<80;i++){ctx.fillStyle=`rgba(255,255,255,${.15+(i%4)*.12})`;ctx.fillRect((i*97)%w,(i*53)%h,1.2,1.2)}const b=sim.current.bodies;if(running){for(let i=0;i<b.length;i++){for(let j=i+1;j<b.length;j++){const dx=b[j].x-b[i].x,dy=b[j].y-b[i].y,d2=dx*dx+dy*dy+500,force=.018*b[j].mass/d2;b[i].vx+=dx*force;b[i].vy+=dy*force;b[j].vx-=dx*force;b[j].vy-=dy*force;}b[i].x+=b[i].vx;b[i].y+=b[i].vy;if(b[i].x<4||b[i].x>w-4)b[i].vx*=-1;if(b[i].y<4||b[i].y>h-4)b[i].vy*=-1;}}b.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r+6,0,Math.PI*2);ctx.fillStyle=`hsla(${p.hue},80%,65%,.15)`;ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`hsl(${p.hue},70%,65%)`;ctx.fill();});ctx.fillStyle='#b7c3e3';ctx.font='10px monospace';ctx.fillText('SIMPLIFIED GRAVITATIONAL SANDBOX',13,18);raf=requestAnimationFrame(draw);};raf=requestAnimationFrame(draw);return()=>cancelAnimationFrame(raf);},[mode,count,running]);
  const down=e=>{const r=canvas.current.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;let found=-1,dist=30;sim.current.bodies.forEach((b,i)=>{const d=Math.hypot(b.x-x,b.y-y);if(d<dist){dist=d;found=i;}});sim.current.drag=found;if(found>=0)canvas.current.setPointerCapture(e.pointerId);};
  const move=e=>{if(sim.current.drag<0)return;const r=canvas.current.getBoundingClientRect(),b=sim.current.bodies[sim.current.drag];if(b){b.x=e.clientX-r.left;b.y=e.clientY-r.top;b.vx=0;b.vy=0;}};
  return <div className="tool-body"><ModalHeader eyebrow="EXPLORE / SPACE & PHYSICS" title="Gravity Room" description="Start with a familiar Earth value, compare worlds, or play with a simplified universe. Each mode explains what its numbers mean."/><div className="gravity-tabs">{[['planet','Planet gravity'],['solar','Solar system'],['universe','Universe sandbox']].map(([id,label])=><button key={id} className={mode===id?'selected':''} onClick={()=>setMode(id)}>{label}</button>)}</div>
  {mode==='planet'&&<><div className="gravity-facts"><div><span>SURFACE GRAVITY</span><strong>{g.toFixed(2)} <small>m/s²</small></strong></div><div><span>YOUR WEIGHT</span><strong>{weight.toFixed(1)} <small>N</small></strong></div><div><span>FALL FROM {height} M</span><strong>{fallTime.toFixed(2)} <small>s</small></strong></div></div><div className="gravity-lab-controls"><label>Choose a world<select value={planet} onChange={e=>setPlanet(e.target.value)}>{Object.keys(worlds).map(n=><option key={n}>{n}</option>)}</select></label><label>Object mass <b>{mass} kg</b><input type="range" min="1" max="100" value={mass} onChange={e=>setMass(+e.target.value)}/></label><label>Drop height <b>{height} m</b><input type="range" min="1" max="100" value={height} onChange={e=>setHeight(+e.target.value)}/></label></div><div className="gravity-explainer"><strong>{planet} vs Earth</strong><p>{planet==='Earth'?'Earth is the reference: an object accelerates downward at about 9.81 m/s² near sea level.':`At the surface of ${planet}, gravity is about ${(g/9.81*100).toFixed(0)}% of Earth's. The same ${mass} kg object weighs ${(weight).toFixed(1)} N here, compared with ${(mass*9.81).toFixed(1)} N on Earth.`}</p><small>Ideal free fall; ignores air resistance and changes in gravity with altitude. Weight = mass × g; fall time = √(2h/g).</small></div></>}
  {mode==='solar'&&<div className="solar-explorer"><div className="solar-scene"><div className="sun-core"/>{[['Mercury',38,'#aaa'],['Venus',59,'#d7a66c'],['Earth',83,'#5e9fea'],['Mars',108,'#d97757'],['Jupiter',143,'#d8b28c'],['Saturn',177,'#d9c6a2'],['Uranus',210,'#8bd4df'],['Neptune',241,'#6386e7']].map(([name,r,color])=><div key={name} className="orbit-path" style={{width:r*2,height:r*1.1,marginLeft:-r,marginTop:-r*.55}}><span title={name} style={{background:color}}/></div>)}</div><div className="solar-caption"><strong>Our Solar System</strong><p>Eight planets orbit the Sun. This is an illustrative view: planet sizes and distances are not shown to the same scale.</p><div className="planet-key">{Object.entries(worlds).filter(([n])=>n!=='Moon').map(([n,v])=><span key={n}><i/>{n}: {v.toFixed(2)} m/s²</span>)}</div></div></div>}
  {mode==='universe'&&<><canvas className="gravity-canvas universe-canvas" ref={canvas} onPointerDown={down} onPointerMove={move} onPointerUp={()=>sim.current.drag=-1} onPointerCancel={()=>sim.current.drag=-1} aria-label="Simplified interactive gravitational sandbox"/><div className="sim-controls"><label>Objects <b>{count}</b><input type="range" min="2" max="12" value={count} onChange={e=>setCount(+e.target.value)}/></label><button className="control-button" onClick={()=>setRunning(v=>!v)}>{running?<Pause size={15}/>:<Play size={15}/>} {running?'Pause':'Resume'}</button><button className="control-button" onClick={reset}><RotateCcw size={15}/> Reset worlds</button></div><p className="tool-footnote">A playful, dimensionless model of interacting bodies—not a scale model of the universe or a validated astronomical simulator. Drag objects to change their positions.</p></>}
  </div>;
}

function DrawStudio() {
  const canvas=useRef(null),drawing=useRef(false),last=useRef(null),history=useRef([]),[color,setColor]=useState('#282a3a'),[size,setSize]=useState(5);
  useEffect(()=>{const c=canvas.current;if(!c)return;const ctx=c.getContext('2d');const resize=()=>{const old=document.createElement('canvas');old.width=c.width;old.height=c.height;if(old.width)old.getContext('2d').drawImage(c,0,0);const dpr=Math.min(devicePixelRatio||1,2);c.width=c.clientWidth*dpr;c.height=c.clientHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,c.clientWidth,c.clientHeight);if(old.width)ctx.drawImage(old,0,0,old.width/dpr,old.height/dpr);};resize();window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[]);
  const snapshot=()=>{const c=canvas.current;history.current.push(c.toDataURL());if(history.current.length>20)history.current.shift();};
  const down=e=>{const c=canvas.current,r=c.getBoundingClientRect();snapshot();drawing.current=true;last.current={x:e.clientX-r.left,y:e.clientY-r.top};c.setPointerCapture(e.pointerId);};
  const move=e=>{if(!drawing.current)return;const c=canvas.current,r=c.getBoundingClientRect(),p={x:e.clientX-r.left,y:e.clientY-r.top},ctx=c.getContext('2d');ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(last.current.x,last.current.y);ctx.lineTo(p.x,p.y);ctx.stroke();last.current=p;};
  const up=()=>{drawing.current=false;last.current=null;};
  const undo=()=>{const c=canvas.current,url=history.current.pop();if(!url)return;const img=new Image();img.onload=()=>{const ctx=c.getContext('2d');ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,c.clientWidth,c.clientHeight);ctx.drawImage(img,0,0,c.clientWidth,c.clientHeight);};img.src=url;};
  const clear=()=>{snapshot();const c=canvas.current,ctx=c.getContext('2d');ctx.fillStyle='#fffdf8';ctx.fillRect(0,0,c.clientWidth,c.clientHeight);};
  const save=()=>{const a=document.createElement('a');a.download='open-learn-lab-artwork.png';a.href=canvas.current.toDataURL('image/png');a.click();};
  return <div className="tool-body"><ModalHeader eyebrow="CREATE / CANVAS" title="Draw Studio" description="Use your mouse or finger to sketch. Your artwork stays on this page until you save it."/><canvas className="draw-canvas" ref={canvas} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} aria-label="Drawing canvas"/><div className="draw-controls"><div className="color-picks">{['#282a3a','#f06a4f','#e9ad32','#5c9f75','#5a6ee1','#c05ca7','#1c9ab0'].map(c=><button key={c} className={color===c?'color-dot selected':'color-dot'} style={{background:c}} onClick={()=>setColor(c)} aria-label={`Brush color ${c}`}/>)}</div><label className="brush-control">Brush <input type="range" min="1" max="24" value={size} onChange={e=>setSize(+e.target.value)}/></label><button className="control-button" onClick={undo}><Undo2 size={15}/> Undo</button><button className="control-button" onClick={clear}>Clear</button><button className="control-button save-control" onClick={save}><Download size={15}/> Save PNG</button></div></div>;
}

function SoundGarden() {
  const [playing,setPlaying]=useState(false),[mode,setMode]=useState('calm'),[volume,setVolume]=useState(0.75);
  const audio=useRef(null), sources=useRef([]), master=useRef(null), modeRef=useRef(mode);
  modeRef.current=mode;
  const presets={
    calm:{label:'Calm',desc:'Soft, airy pink-noise texture for unwinding.',color:'#8aa99b',layers:[{type:'pink',cut:1500,level:.62},{type:'brown',cut:380,level:.12}]},
    steady:{label:'Steady',desc:'Even broadband noise to mask distracting sounds.',color:'#7892b8',layers:[{type:'white',cut:6500,level:.42},{type:'pink',cut:2600,level:.25}]},
    sleep:{label:'Sleep',desc:'Low, smooth brown noise with softened high frequencies.',color:'#7774a8',layers:[{type:'brown',cut:520,level:.72},{type:'pink',cut:700,level:.08}]},
    read:{label:'Read',desc:'Balanced pink noise designed to sit behind reading.',color:'#b59a70',layers:[{type:'pink',cut:3200,level:.5},{type:'white',cut:4500,level:.08}]}
  };
  const stop=()=>{sources.current.forEach(n=>{try{n.stop()}catch{}try{n.disconnect()}catch{}});sources.current=[];if(audio.current){audio.current.close().catch(()=>{});audio.current=null;}master.current=null;setPlaying(false);};
  const makeNoise=(ctx,type)=>{const length=ctx.sampleRate*4,buffer=ctx.createBuffer(1,length,ctx.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<length;i++){const white=Math.random()*2-1;if(type==='white')data[i]=white;else if(type==='brown'){last=(last+.02*white)/1.02;data[i]=last*3.5;}else{last=.985*last+.015*white;data[i]=last*3.2;}}const src=ctx.createBufferSource();src.buffer=buffer;src.loop=true;return src;};
  const start=async()=>{if(playing){stop();return;}const AC=window.AudioContext||window.webkitAudioContext;if(!AC){window.alert('Web Audio is not supported in this browser.');return;}const ctx=new AC();audio.current=ctx;await ctx.resume();const masterGain=ctx.createGain();masterGain.gain.value=volume;masterGain.connect(ctx.destination);master.current=masterGain;const addPreset=key=>{const preset=presets[key];preset.layers.forEach(layer=>{const src=makeNoise(ctx,layer.type),filter=ctx.createBiquadFilter(),gain=ctx.createGain();filter.type='lowpass';filter.frequency.value=layer.cut;filter.Q.value=.25;gain.gain.value=layer.level;src.connect(filter);filter.connect(gain);gain.connect(masterGain);src.start();sources.current.push(src,filter,gain);});};addPreset(mode);setPlaying(true);};
  useEffect(()=>{if(master.current&&audio.current)master.current.gain.setTargetAtTime(volume,audio.current.currentTime,.06);},[volume]);
  useEffect(()=>{if(!playing||!audio.current)return;const ctx=audio.current;const current=sources.current;sources.current=[];current.forEach(n=>{try{if(n.stop)n.stop()}catch{}try{n.disconnect()}catch{}});const preset=presets[mode];preset.layers.forEach(layer=>{const src=makeNoise(ctx,layer.type),filter=ctx.createBiquadFilter(),gain=ctx.createGain();filter.type='lowpass';filter.frequency.value=layer.cut;filter.Q.value=.25;gain.gain.value=layer.level;src.connect(filter);filter.connect(gain);gain.connect(master.current);src.start();sources.current.push(src,filter,gain);});},[mode]);
  useEffect(()=>()=>{sources.current.forEach(n=>{try{if(n.stop)n.stop()}catch{}try{n.disconnect()}catch{}});if(audio.current)audio.current.close().catch(()=>{});},[]);
  return <div className="tool-body"><ModalHeader eyebrow="CREATE / AMBIENT SOUND" title="Sound Garden" description="Four simple listening modes. No melodies or surprise tones—just continuous, carefully filtered noise textures. Choose a mode and set the level to suit your headphones or speakers."/><div className={`sound-visual sound-${mode} ${playing?'is-playing':''}`}><div className="sound-noise-orb" style={{'--sound-color':presets[mode].color}}/><div className="sound-core"><Waves size={29}/></div><span className="sound-label">{playing?'AMBIENT SOUND PLAYING':'CHOOSE YOUR LISTENING MODE'}</span></div><div className="mood-grid sound-mode-grid">{Object.entries(presets).map(([key,val])=><button key={key} onClick={()=>setMode(key)} className={mode===key?'mood-option selected':'mood-option'}><span className={`mood-swatch swatch-${key}`}/><span>{val.label}</span><span className="mood-check">{mode===key?'●':'○'}</span></button>)}</div><p className="sound-description">{presets[mode].desc}</p><div className="sound-controls"><button className="control-button save-control" onClick={start}>{playing?<VolumeX size={16}/>:<Play size={16}/>} {playing?'Stop sound':'Play sound'}</button><label><Volume2 size={16}/> Volume <input aria-label="Sound volume" type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(+e.target.value)}/><b>{Math.round(volume*100)}%</b></label></div><p className="tool-footnote">The slider runs from 0–100%. This is synthesized noise—not a field recording or a claim to reproduce real rain, ocean or space sounds. Start low and raise the level gradually.</p></div>;
}

function MemoryMatch(){
 const icons=['✦','●','▲','◆','☾','♥','✿','⬟'];const [deck,setDeck]=useState(()=>shuffle([...icons,...icons]));const [flipped,setFlipped]=useState([]),[matched,setMatched]=useState([]),[moves,setMoves]=useState(0),[locked,setLocked]=useState(false);
 function shuffle(a){return a.sort(()=>Math.random()-.5)}
 const pick=i=>{if(locked||flipped.includes(i)||matched.includes(i))return;const next=[...flipped,i];setFlipped(next);if(next.length===2){setMoves(m=>m+1);if(deck[next[0]]===deck[next[1]]){setMatched(m=>[...m,...next]);setFlipped([])}else{setLocked(true);setTimeout(()=>{setFlipped([]);setLocked(false)},750)}}};
 const reset=()=>{setDeck(shuffle([...icons,...icons]));setFlipped([]);setMatched([]);setMoves(0);setLocked(false)};
 return <div className="tool-body"><ModalHeader eyebrow="PLAY / MEMORY GAME" title="Memory Match" description="Flip two cards at a time and find all eight pairs in as few moves as you can."/><div className="game-stats"><span>Moves <b>{moves}</b></span><span>Pairs <b>{matched.length/2}/8</b></span><button className="control-button" onClick={reset}><RotateCcw size={15}/> New game</button></div><div className="memory-board">{deck.map((v,i)=><button key={i} className={`memory-card ${flipped.includes(i)||matched.includes(i)?'revealed':''} ${matched.includes(i)?'matched':''}`} onClick={()=>pick(i)} aria-label={`Card ${i+1}`}>{flipped.includes(i)||matched.includes(i)?v:'?'}</button>)}</div>{matched.length===16&&<p className="game-win">All pairs found in {moves} moves. Nice memory!</p>}</div>
}
function PatternPulse(){
 const [sequence,setSequence]=useState([]),[input,setInput]=useState([]),[showing,setShowing]=useState(false),[level,setLevel]=useState(1),[message,setMessage]=useState('Start a sequence when you are ready.');const [active,setActive]=useState(-1);const timers=useRef([]);const pads=['coral','mint','blue','gold'];
 useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
 const playSeq=seq=>{setShowing(true);setMessage('Watch the sequence…');seq.forEach((n,i)=>timers.current.push(setTimeout(()=>{setActive(n);timers.current.push(setTimeout(()=>setActive(-1),350));if(i===seq.length-1)timers.current.push(setTimeout(()=>{setShowing(false);setMessage('Now repeat it.');},500))},650+i*700)))};
 const start=()=>{timers.current.forEach(clearTimeout);const seq=[Math.floor(Math.random()*4)];setSequence(seq);setInput([]);setLevel(1);playSeq(seq)};
 const tap=n=>{if(showing||!sequence.length)return;const next=[...input,n];setInput(next);if(sequence[next.length-1]!==n){setMessage('Not quite. Start again to try a new pattern.');setSequence([]);setInput([]);return;}if(next.length===sequence.length){const seq=[...sequence,Math.floor(Math.random()*4)];setSequence(seq);setInput([]);setLevel(seq.length);playSeq(seq)}};
 return <div className="tool-body"><ModalHeader eyebrow="PLAY / SEQUENCE GAME" title="Pattern Pulse" description="Remember the glowing pad sequence, then repeat it. Each successful round adds one more step."/><p className="pattern-message">{message} <strong>Level {level}</strong></p><div className="pattern-board">{pads.map((p,i)=><button key={p} disabled={showing||!sequence.length} className={`pattern-pad ${p} ${active===i?'lit':''}`} onClick={()=>tap(i)} aria-label={`Pattern pad ${i+1}`}/>)}</div><div className="game-actions"><button className="control-button save-control" onClick={start}><Play size={15}/> {sequence.length?'Restart pattern':'Start pattern'}</button><span className="tool-footnote">Play with sound off or on—this MVP uses visual cues only.</span></div></div>
}
function WordSprint(){
 const words=['planet','orbit','comet','star','moon','cloud','river','quiet','light','dream','garden','color','canvas','music','wonder','forest','ocean','focus','little','curious','create','breeze','memory','bright'];const [round,setRound]=useState(0),[current,setCurrent]=useState(words[0]),[answer,setAnswer]=useState(''),[score,setScore]=useState(0),[seconds,setSeconds]=useState(45),[active,setActive]=useState(false),[seen,setSeen]=useState([]);const input=useRef(null);
 useEffect(()=>{if(!active)return;const t=setInterval(()=>setSeconds(s=>{if(s<=1){clearInterval(t);setActive(false);return 0}return s-1}),1000);return()=>clearInterval(t)},[active]);
 const start=()=>{setScore(0);setSeconds(45);setRound(0);setSeen([]);setCurrent(words[Math.floor(Math.random()*words.length)]);setAnswer('');setActive(true);setTimeout(()=>input.current?.focus(),30)};
 const submit=e=>{e.preventDefault();if(!active)return;const a=answer.trim().toLowerCase();const counts={};for(const ch of current)counts[ch]=(counts[ch]||0)+1;let valid=a.length>=3&&a!==current&&!seen.includes(a);for(const ch of a){if(!counts[ch]){valid=false;break;}counts[ch]--;}if(valid){setScore(s=>s+1);setSeen(v=>[...v,a])}setRound(r=>r+1);setCurrent(words[Math.floor(Math.random()*words.length)]);setAnswer('')};
 return <div className="tool-body"><ModalHeader eyebrow="PLAY / WORD GAME" title="Word Sprint" description="Type a word of at least three letters that can be made from the letters in the target word. You have 45 seconds."/><div className="word-target">{current.toUpperCase()}</div><div className="word-stats"><span>TIME <b>{seconds}s</b></span><span>SCORE <b>{score}</b></span><span>TRIES <b>{round}</b></span></div><form className="word-form" onSubmit={submit}><input ref={input} value={answer} onChange={e=>setAnswer(e.target.value)} disabled={!active} placeholder={active?'Type a word…':'Start a round to play'} aria-label="Your word"/><button className="control-button save-control" disabled={!active||!answer.trim()}>Submit</button></form><div className="game-actions"><button className="control-button" onClick={start}><RotateCcw size={15}/> {active?'Restart':'Start 45-second round'}</button><span className="tool-footnote">Valid answers must use only letters from the target word. This is a small casual word challenge.</span></div>{!active&&seconds===0&&<p className="game-win">Time! You scored {score}.</p>}</div>
}
