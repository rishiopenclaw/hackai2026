import React, { useMemo, useState } from 'react';
import { Home, Search, User, Sun, Moon } from 'lucide-react';

const ICONS = { Home, Practice: Search, Profile: User };
const ROUTES = ['Home', 'Practice', 'Profile'];

export default function FloatingToolbarWeb({ state, navigation }) {
  const [dark, setDark] = useState(true);
  const [bounce, setBounce] = useState(false);

  const activeIndex = useMemo(() => {
    const idx = state.routes.findIndex((r) => r.name === ROUTES[state.index]);
    return idx < 0 ? 0 : idx;
  }, [state]);

  // Precise indicator alignment: button width + divider + CSS gaps
  const slotPitch = 87; // 74(btn) + 1(divider) + 12(total adjacent gaps)
  const indicatorX = 20 + activeIndex * slotPitch;

  const onToggleTheme = () => {
    setDark((v) => !v);
    setBounce(true);
    window.setTimeout(() => setBounce(false), 260);
    document.documentElement.style.background = dark ? '#f4f5f8' : '#09090C';
  };

  return (
    <>
      <style>{`
      .ft-wrap{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999}
      .ft-glow{position:absolute;inset:-20px -24px -26px;border-radius:40px;background:radial-gradient(circle at 50% 30%,rgba(232,175,72,.18),rgba(0,0,0,0));filter:blur(18px);pointer-events:none}
      .ft-noise{position:absolute;inset:0;border-radius:26px;pointer-events:none;mix-blend-mode:soft-light;opacity:.15;background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter><rect width="80" height="80" filter="url(%23n)" opacity="0.2"/></svg>')}
      .ft-bar{position:relative;display:flex;align-items:center;gap:0;height:62px;padding:0 12px;border-radius:26px;border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);background:rgba(15,17,24,.68);box-shadow:0 12px 40px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.06)}
      .ft-indicator{position:absolute;top:8px;left:${indicatorX}px;width:50px;height:44px;transition:transform 460ms cubic-bezier(0.34,1.2,0.64,1),left 460ms cubic-bezier(0.34,1.2,0.64,1)}
      .ring-glow{position:absolute;inset:-2px;border-radius:18px;background:#e8af48;opacity:.15;filter:blur(10px)}
      .ring-clip{position:absolute;inset:0;border-radius:18px;overflow:hidden}
      .ring-spin{position:absolute;width:200%;height:200%;left:-50%;top:-50%;animation:ft-spin 4.5s linear infinite;background:conic-gradient(
          #533517 0%, #c49746 16%, #feeaa5 35%,
          rgba(255,255,255,0) 36.5%, #ffc0cb 38%, #ffffff 41%, #87cefa 42.5%, rgba(255,255,255,0) 44%,
          #533517 50%, #c49746 66%, #feeaa5 85%,
          rgba(255,255,255,0) 86.5%, #ffc0cb 88%, #ffffff 91%, #87cefa 92.5%, rgba(255,255,255,0) 94%,
          #533517 100%)}
      .ring-inner{position:absolute;inset:2px;border-radius:16px;background:rgba(15,17,24,.95)}
      @keyframes ft-spin{to{transform:rotate(360deg)}}
      .ft-btn{position:relative;z-index:2;width:74px;height:62px;border:0;background:transparent;color:#cfd5e2;display:grid;place-items:center;cursor:pointer}
      .ft-btn.active{color:#fff}
      .ft-divider{width:1px;height:24px;background:rgba(255,255,255,.08)}
      .ft-theme{width:52px}
      .theme-toggle{position:relative;width:36px;height:36px;border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.03);display:grid;place-items:center;transition:transform 260ms cubic-bezier(.34,1.2,.64,1)}
      .theme-toggle.bounce{transform:scale(1.25)}
      .theme-toggle svg{position:absolute;transition:all .35s ease}
      .theme-toggle .sun{opacity:${dark ? 0 : 1};transform:rotate(${dark ? -35 : 0}deg) scale(${dark ? .7 : 1})}
      .theme-toggle .moon{opacity:${dark ? 1 : 0};transform:rotate(${dark ? 0 : 35}deg) scale(${dark ? 1 : .7})}
      `}</style>

      <div className="ft-wrap" aria-label="Floating navigation toolbar">
        <div className="ft-glow" />
        <div className="ft-bar">
          <div className="ft-indicator" aria-hidden>
            <div className="ring-glow" />
            <div className="ring-clip"><div className="ring-spin" /></div>
            <div className="ring-inner" />
          </div>

          {ROUTES.map((name, i) => {
            const routeIndex = state.routes.findIndex((r) => r.name === name);
            const active = state.index === routeIndex;
            const Icon = ICONS[name];
            return (
              <React.Fragment key={name}>
                <button className={`ft-btn ${active ? 'active' : ''}`} onClick={() => navigation.navigate(name)}>
                  <Icon size={20} strokeWidth={1.9} />
                </button>
                {i < ROUTES.length - 1 ? <div className="ft-divider" /> : null}
              </React.Fragment>
            );
          })}

          <div className="ft-divider" />
          <button className="ft-btn ft-theme" onClick={onToggleTheme}>
            <span className={`theme-toggle ${bounce ? 'bounce' : ''}`}>
              <Sun className="sun" size={16} strokeWidth={2} />
              <Moon className="moon" size={16} strokeWidth={2} />
            </span>
          </button>
          <div className="ft-noise" />
        </div>
      </div>
    </>
  );
}
