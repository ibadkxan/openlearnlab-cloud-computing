import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Download, RotateCcw, Sparkles } from 'lucide-react';

const palettes = [
  { name: 'Aurora', colors: ['#a7f3d0', '#93c5fd', '#c4b5fd', '#f0abfc'] },
  { name: 'Sunset', colors: ['#fb7185', '#fda4af', '#fdba74', '#facc15'] },
  { name: 'Ocean', colors: ['#67e8f9', '#38bdf8', '#818cf8', '#a5b4fc'] },
  { name: 'Mono', colors: ['#f8fafc', '#cbd5e1', '#94a3b8', '#64748b'] },
];
const modes = ['Flow', 'Orbit', 'Symmetry'];

export default function FlowState() {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const pointer = useRef({ x: 0.5, y: 0.5, active: false });
  const [mode, setMode] = useState('Flow');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [energy, setEnergy] = useState(55);
  const [trails, setTrails] = useState(65);
  const [paused, setPaused] = useState(false);
  const [seed, setSeed] = useState(1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = palettes[paletteIndex].colors;
    let tick = seed * 0.73;
    const count = Math.round(36 + energy * 0.9);
    const fade = Math.max(0.035, (100 - trails) / 100 * 0.22);
    const render = () => {
      if (!canvasRef.current) return;
      if (!paused) {
        ctx.fillStyle = `rgba(12, 13, 19, ${fade})`;
        ctx.fillRect(0, 0, width, height);
        const px = pointer.current.x * width;
        const py = pointer.current.y * height;
        for (let i = 0; i < count; i++) {
          const phase = tick * (0.16 + i * 0.0007) + i * 0.29;
          const spread = 0.15 + (i % 17) / 17 * 0.55;
          let x = width * (0.5 + Math.sin(phase * 0.72 + i * 0.11) * spread);
          let y = height * (0.5 + Math.cos(phase * 0.91 + i * 0.07) * spread);
          if (pointer.current.active) {
            x += (px - x) * 0.12;
            y += (py - y) * 0.12;
          }
          if (mode === 'Orbit') {
            const angle = phase + i * 0.05;
            const radius = Math.min(width, height) * (0.08 + (i % 23) / 36);
            x = width / 2 + Math.cos(angle) * radius;
            y = height / 2 + Math.sin(angle * 1.4) * radius * 0.58;
          } else if (mode === 'Symmetry') {
            const angle = phase + i * 0.08;
            const radius = Math.min(width, height) * (0.06 + (i % 27) / 40);
            x = width / 2 + Math.cos(angle) * radius;
            y = height / 2 + Math.sin(angle) * radius;
          }
          const length = 8 + energy * 0.2;
          const dx = Math.cos(phase * 1.7 + i) * length;
          const dy = Math.sin(phase * 1.3 + i * 0.4) * length;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.bezierCurveTo(x + dx, y - dy, x - dx * 0.7, y + dy, x + Math.sin(phase) * length * 1.8, y + Math.cos(phase) * length * 1.8);
          ctx.strokeStyle = colors[i % colors.length];
          ctx.globalAlpha = 0.28 + ((i * 7) % 60) / 100;
          ctx.lineWidth = 0.7 + ((i * 3) % 20) / 10;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        tick += 0.012 + energy * 0.00035;
      }
      frameRef.current = requestAnimationFrame(render);
    };
    ctx.fillStyle = '#0c0d13'; ctx.fillRect(0, 0, width, height);
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(render);
  }, [energy, mode, paletteIndex, paused, seed, trails]);

  useEffect(() => {
    draw();
    const observer = new ResizeObserver(() => draw());
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frameRef.current); };
  }, [draw]);

  const point = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    pointer.current = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height, active: true };
  };
  const reset = () => { setSeed(v => v + 1); pointer.current.active = false; };
  const save = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `flow-state-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return <div className="tool-body flow-tool">
    <div className="tool-heading"><div className="eyebrow"><span className="live-dot"/> CREATE / GENERATIVE ART</div><h2>Flow State</h2><p>A living canvas for color, movement, and happy accidents. Move your pointer through the field and make it your own.</p></div>
    <div className="flow-stage" onPointerMove={point} onPointerLeave={() => { pointer.current.active = false; }}>
      <canvas ref={canvasRef} aria-label="Animated generative art canvas" />
      <span className="flow-hint"><Sparkles size={13}/> MOVE TO INFLUENCE THE FLOW</span>
      <span className="flow-live">{paused ? 'PAUSED' : 'LIVE CANVAS'}</span>
    </div>
    <div className="flow-controls">
      <div className="flow-control-block"><span className="flow-label">MOVEMENT</span><div className="segmented">{modes.map(m => <button key={m} className={mode === m ? 'selected' : ''} onClick={() => setMode(m)}>{m}</button>)}</div></div>
      <div className="flow-control-block"><span className="flow-label">COLOR WORLD</span><div className="palette-row">{palettes.map((p, i) => <button key={p.name} className={`palette-choice ${paletteIndex === i ? 'selected' : ''}`} onClick={() => setPaletteIndex(i)} aria-label={`${p.name} palette`} title={p.name}><span>{p.colors.map(c => <i key={c} style={{ background: c }} />)}</span><small>{p.name}</small></button>)}</div></div>
      <label className="flow-slider"><span>Energy <b>{energy}%</b></span><input type="range" min="10" max="100" value={energy} onChange={e => setEnergy(+e.target.value)} /></label>
      <label className="flow-slider"><span>Trail length <b>{trails}%</b></span><input type="range" min="10" max="95" value={trails} onChange={e => setTrails(+e.target.value)} /></label>
      <div className="flow-actions"><button className="control-button" onClick={() => setPaused(v => !v)}>{paused ? 'Resume motion' : 'Pause motion'}</button><button className="control-button" onClick={reset}><RotateCcw size={14}/> Remix</button><button className="control-button save-control" onClick={save}><Download size={14}/> Save artwork</button></div>
    </div>
    <p className="tool-footnote">Generative visual art, not a fluid simulation. Nothing is uploaded; save your current canvas as a PNG whenever you like.</p>
  </div>;
}
