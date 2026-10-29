import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles, MousePointer2 } from 'lucide-react';

export default function ParticlePlayground({ onClose }) {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('attract');
  const [density, setDensity] = useState(90);
  const [hue, setHue] = useState(280);
  const [running, setRunning] = useState(true);
  const modeRef = useRef(mode);
  const densityRef = useRef(density);
  const hueRef = useRef(hue);
  const runningRef = useRef(running);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { densityRef.current = density; }, [density]);
  useEffect(() => { hueRef.current = hue; }, [hue]);
  useEffect(() => { runningRef.current = running; }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0, frame = 0, particles = [], pointer = { x: -1000, y: -1000 };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: densityRef.current }, () => ({ x: Math.random()*width, y: Math.random()*height, vx: (Math.random()-.5)*.8, vy: (Math.random()-.5)*.8, r: Math.random()*2.4+1 }));
    };
    const move = e => { const rect = canvas.getBoundingClientRect(); pointer = { x: e.clientX-rect.left, y: e.clientY-rect.top }; };
    const leave = () => { pointer = { x: -1000, y: -1000 }; };
    const draw = () => {
      ctx.clearRect(0,0,width,height);
      const h = hueRef.current;
      for (let i=0; i<particles.length; i++) {
        const p = particles[i];
        const dx = pointer.x-p.x, dy = pointer.y-p.y, dist = Math.sqrt(dx*dx+dy*dy) || 1;
        if (dist < 150 && modeRef.current !== 'drift') {
          const force = (1-dist/150)*0.035*(modeRef.current === 'repel' ? -1 : 1);
          p.vx += dx/dist*force; p.vy += dy/dist*force;
        }
        if (runningRef.current) {
          p.x += p.vx; p.y += p.vy; p.vx *= .994; p.vy *= .994;
          if (Math.abs(p.vx)+Math.abs(p.vy)<.12) { p.vx += (Math.random()-.5)*.06; p.vy += (Math.random()-.5)*.06; }
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle = `hsla(${h+(i%36)*1.8}, 90%, ${65+(i%3)*8}%, .9)`; ctx.fill();
        for (let j=i+1; j<particles.length; j++) { const q=particles[j], lx=q.x-p.x, ly=q.y-p.y, ld=lx*lx+ly*ly; if (ld<3600) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`hsla(${h}, 85%, 70%, ${.16*(1-Math.sqrt(ld)/60)})`; ctx.lineWidth=.7; ctx.stroke(); } }
      }
      frame = requestAnimationFrame(draw);
    };
    const onResize = () => resize();
    resize(); draw(); canvas.addEventListener('pointermove',move); canvas.addEventListener('pointerleave',leave); window.addEventListener('resize',onResize);
    return () => { cancelAnimationFrame(frame); canvas.removeEventListener('pointermove',move); canvas.removeEventListener('pointerleave',leave); window.removeEventListener('resize',onResize); };
  }, []);
  useEffect(() => { const canvas=canvasRef.current; if(!canvas) return; const rect=canvas.getBoundingClientRect(); const dpr=Math.min(window.devicePixelRatio||1,2); canvas.width=Math.round(rect.width*dpr); canvas.height=Math.round(rect.height*dpr); }, [density]);

  return <div className="particle-experience"><div className="particle-head"><div><div className="eyebrow"><span className="live-dot"/> EXPERIMENT 001</div><h2>Particle Playground</h2><p>Move your cursor. Make a little universe.</p></div><span className="live-pill">LIVE CANVAS</span></div><div className="particle-stage"><canvas ref={canvasRef} aria-label="Interactive particle field. Move your pointer to influence the particles."/><div className="stage-hint"><MousePointer2 size={15}/> Move around to interact</div></div><div className="particle-controls"><div className="control-group"><span className="control-label">MOVEMENT</span><div className="segmented">{[['attract','Attract'],['repel','Repel'],['drift','Drift']].map(([id,label])=><button key={id} className={mode===id?'selected':''} onClick={()=>setMode(id)}>{label}</button>)}</div></div><div className="control-group"><label className="control-label" htmlFor="density">PARTICLE COUNT <b>{density}</b></label><input id="density" type="range" min="25" max="150" value={density} onChange={e=>setDensity(Number(e.target.value))}/></div><div className="control-group"><label className="control-label" htmlFor="hue">COLOUR <b>{hue}°</b></label><input id="hue" type="range" min="0" max="350" step="10" value={hue} onChange={e=>setHue(Number(e.target.value))}/></div><div className="control-actions"><button onClick={()=>setRunning(!running)} className="control-button">{running?'Pause':'Resume'}</button><button onClick={()=>{setDensity(90);setHue(280);setMode('attract');setRunning(true)}} className="control-button reset"><RotateCcw size={14}/> Reset</button></div></div><div className="particle-footer"><span><Sparkles size={14}/> No wrong way to play.</span><button onClick={onClose}>Back to the playground ↗</button></div></div>;
}
