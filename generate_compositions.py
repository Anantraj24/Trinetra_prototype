import os

base_styles = """
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
html, body {
  margin: 0;
  width: 1080px;
  height: 1920px;
  overflow: hidden;
  background: #0B0C0E;
  color: #FFFFFF;
  font-family: 'Manrope', -apple-system, sans-serif;
}
#root {
  position: relative;
  width: 1080px;
  height: 1920px;
  background: radial-gradient(circle at 50% 30%, #151820 0%, #0A0B0D 70%, #050607 100%);
  overflow: hidden;
}
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
  z-index: 1;
}
.vignette {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 160px rgba(0, 0, 0, 0.85);
  pointer-events: none;
  z-index: 2;
}
.amber-glow {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.18) 0%, rgba(255, 107, 0, 0) 70%);
  pointer-events: none;
  z-index: 1;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hud-frame {
  position: absolute;
  top: 60px;
  left: 60px;
  right: 60px;
  pointer-events: none;
  z-index: 30;
}
.hud-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 2px;
}
.hud-live {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #FF6B00;
  font-weight: 700;
}
.live-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #FF6B00;
  box-shadow: 0 0 12px #FF6B00;
}
.scene {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px;
  z-index: 10;
}
.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  color: #FF6B00;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.title-lg {
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 68px;
  font-weight: 900;
  line-height: 1.1;
  text-align: center;
  letter-spacing: -2px;
  text-transform: uppercase;
  margin-bottom: 28px;
  max-width: 960px;
}
.sub-desc {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  line-height: 1.4;
  max-width: 860px;
  margin-bottom: 48px;
}
.card-tactical {
  background: #141518;
  border-radius: 36px;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  padding: 40px;
  width: 900px;
}
"""

template = """<!doctype html>
<html lang="en" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <title>Trinetra - Part __PART_NUM__: __EP_TITLE__</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      __BASE_STYLES__
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="30"
      data-width="1080"
      data-height="1920"
    >
      <div class="grid-overlay"></div>
      <div class="vignette"></div>
      <div class="amber-glow" id="amber-glow"></div>

      <div class="hud-frame">
        <div class="hud-header">
          <div class="hud-live">
            <div class="live-dot"></div>
            <span>TRINETRA EPISODE 0__PART_NUM__/08</span>
          </div>
          <div>GPS: 27.5861°N, 91.8594°E</div>
        </div>
      </div>

      <div class="scene clip" id="main-scene" data-start="0" data-duration="30" data-track-index="1">
        __CONTENT_HTML__
      </div>

      <!-- Audio -->
      <audio id="bg-music" data-start="0" data-duration="30" data-track-index="10" data-volume="0.26" src="assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3"></audio>
      <audio id="v1" data-start="0.8" data-duration="7.0" data-track-index="20" data-volume="1.0" src="assets/voice/v1.wav"></audio>
      <audio id="v2" data-start="9.0" data-duration="9.0" data-track-index="21" data-volume="1.0" src="assets/voice/v2.wav"></audio>
      <audio id="v3" data-start="19.0" data-duration="8.0" data-track-index="22" data-volume="1.0" src="assets/voice/v3.wav"></audio>
      
      <audio id="sfx-intro" data-start="0.6" data-duration="1.48" data-track-index="11" data-volume="0.75" src="assets/sfx/impact/impactBell_heavy_000.ogg"></audio>
      <audio id="sfx-act1" data-start="9.0" data-duration="0.31" data-track-index="12" data-volume="0.65" src="assets/sfx/ui/switch1.ogg"></audio>
      <audio id="sfx-act2" data-start="18.8" data-duration="0.69" data-track-index="13" data-volume="0.70" src="assets/sfx/casino/card-place-1.ogg"></audio>
      <audio id="sfx-outro" data-start="26.5" data-duration="0.65" data-track-index="14" data-volume="0.80" src="assets/sfx/impact/impactBell_heavy_003.ogg"></audio>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      window.__timelines["main"] = tl;

      __ANIM_JS__

      tl.seek(0);
    </script>
  </body>
</html>
"""

def generate_part_html(part_num, content_html, anim_js, ep_title):
    res = template
    res = res.replace("__BASE_STYLES__", base_styles)
    res = res.replace("__PART_NUM__", str(part_num))
    res = res.replace("__EP_TITLE__", ep_title)
    res = res.replace("__CONTENT_HTML__", content_html)
    res = res.replace("__ANIM_JS__", anim_js)
    return res

# Part 1 Content
p1_content = """
<div style="position: relative; width: 560px; height: 560px; border-radius: 50%; border: 2px solid rgba(224, 54, 44, 0.3); display: flex; align-items: center; justify-content: center; margin-bottom: 50px;" id="radar-box">
  <div style="position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, rgba(224, 54, 44, 0.3) 0deg, transparent 90deg);" id="sweep-ring"></div>
  <div style="width: 24px; height: 24px; border-radius: 50%; background: #E0362C; box-shadow: 0 0 35px #E0362C;" id="radar-blip"></div>
</div>
<div class="eyebrow" id="p1-eyebrow">THE HIMALAYAN PARADOX</div>
<h1 class="title-lg" id="p1-title">WHEN TRAVEL GOES OFF-GRID, YOU CANNOT BE INVISIBLE</h1>
<div class="card-tactical" id="p1-card" style="border-color: rgba(224, 54, 44, 0.4);">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-size: 24px; font-weight: 800; color: #FF7B72;">TAWANG PASS CRITICAL ZONE</div>
      <div style="font-family: 'JetBrains Mono'; font-size: 18px; color: rgba(255,255,255,0.6); margin-top: 6px;">CELLULAR: 0 BARS · ZERO COVERAGE</div>
    </div>
    <div style="background: rgba(224,54,44,0.2); color: #FF7B72; font-family: 'JetBrains Mono'; font-weight: 800; padding: 10px 24px; border-radius: 100px;">TELEMETRY LOSS</div>
  </div>
</div>
"""
p1_anim = """
tl.fromTo("#radar-box", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.0, ease: "back.out(1.4)" }, 0.2)
  .to("#sweep-ring", { rotate: 720, duration: 4.0, ease: "none", repeat: 6 }, 0.2)
  .fromTo("#p1-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.6)
  .fromTo("#p1-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
  .fromTo("#p1-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 2.0)
  .to("#radar-blip", { scale: 2.2, repeat: 10, yoyo: true, duration: 0.3 }, 2.5);
"""

# Part 2 Content
p2_content = """
<div style="width: 220px; height: 220px; border-radius: 48px; background: linear-gradient(135deg, #FF6B00 0%, #D44E00 100%); box-shadow: 0 24px 80px rgba(255,107,0,0.5); display: flex; align-items: center; justify-content: center; margin-bottom: 48px;" id="p2-emblem">
  <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/>
  </svg>
</div>
<div class="eyebrow" id="p2-eyebrow">THE THIRD EYE FOR EXPLORERS</div>
<h1 class="title-lg" id="p2-title">TRINETRA PLATFORM ARCHITECTURE</h1>
<div class="card-tactical" id="p2-card">
  <div style="display: flex; gap: 24px; margin-bottom: 24px;">
    <div style="flex: 1; background: #0E0F12; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="color: #FF6B00; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 20px;">01 TELEMETRY</div>
      <div style="font-size: 20px; font-weight: 600; margin-top: 8px;">Active GPS Checkpoints & Deviation Sensing</div>
    </div>
    <div style="flex: 1; background: #0E0F12; padding: 24px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08);">
      <div style="color: #4CAF7D; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 20px;">02 SURVIVAL</div>
      <div style="font-size: 20px; font-weight: 600; margin-top: 8px;">Offline Encrypted Rescue Capsules</div>
    </div>
  </div>
  <div style="text-align: center; font-family: 'JetBrains Mono'; font-size: 19px; color: rgba(255,255,255,0.7);">
    ATITHI TOURISM PLATFORM · STATE DISASTER RECOGNIZED
  </div>
</div>
"""
p2_anim = """
tl.fromTo("#p2-emblem", { scale: 0.4, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.3)
  .fromTo("#p2-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.8)
  .fromTo("#p2-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.1)
  .fromTo("#p2-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.8);
"""

# Part 3 Content
p3_content = """
<div class="eyebrow" id="p3-eyebrow">VERIFIED CREDENTIALS</div>
<h1 class="title-lg" id="p3-title">DIGITAL TOURIST SAFETY PASS (TSP)</h1>
<div class="card-tactical" id="p3-card" style="padding: 48px; background: linear-gradient(165deg, #181A20 0%, #0F1013 100%);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
    <div>
      <div style="font-family: 'JetBrains Mono'; font-size: 32px; font-weight: 800; color: #FF8C38;">TSP-884210</div>
      <div style="font-size: 18px; color: rgba(255,255,255,0.6); font-family: 'JetBrains Mono'; margin-top: 4px;">GOVERNMENT eKYC CERTIFIED</div>
    </div>
    <div style="background: rgba(76,175,125,0.18); color: #4CAF7D; border: 1.5px solid #4CAF7D; padding: 10px 24px; border-radius: 100px; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 20px;">
      ✓ BIOMETRICS VERIFIED
    </div>
  </div>
  <div style="display: flex; gap: 36px; align-items: center; background: #0B0C0E; padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.08);">
    <div style="width: 170px; height: 170px; background: #FFFFFF; border-radius: 20px; display: flex; align-items: center; justify-content: center;" id="p3-qr">
      <svg width="130" height="130" viewBox="0 0 100 100" fill="#0B0C0E">
        <rect x="0" y="0" width="30" height="30" rx="4" />
        <rect x="70" y="0" width="30" height="30" rx="4" />
        <rect x="0" y="70" width="30" height="30" rx="4" />
        <rect x="36" y="36" width="28" height="28" rx="4" fill="#FF6B00" />
      </svg>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.6);">Tourist</span><strong>Ananya Sharma</strong></div>
      <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.6);">Blood Group</span><strong style="color: #FF7B72;">O+ Rh Positive</strong></div>
      <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.6);">SOS Contact</span><strong>+91 98450 11220</strong></div>
    </div>
  </div>
</div>
"""
p3_anim = """
tl.fromTo("#p3-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
  .fromTo("#p3-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
  .fromTo("#p3-card", { y: 50, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.6)
  .fromTo("#p3-qr", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.8)" }, 2.4);
"""

# Part 4 Content
p4_content = """
<div class="eyebrow" id="p4-eyebrow">BREAKING COMMUNICATION BARRIERS</div>
<h1 class="title-lg" id="p4-title">12 NORTHEAST DIALECTS OFFLINE</h1>
<div class="card-tactical" id="p4-card">
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px;">
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #FF8C38;">Assamese (অসমীয়া)</div>
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #4CAF7D;">Khasi (Khasi)</div>
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #FF6B00;">Bodo (बर')</div>
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #FFB347;">Mizo (Mizo)</div>
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #E05A2B;">Garo (A·chik)</div>
    <div style="background: #0E0F12; padding: 18px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08); text-align: center; font-weight: 700; font-size: 22px; color: #FF8C38;">Manipuri (মৈতৈ)</div>
  </div>
  <div style="background: rgba(255,107,0,0.12); border: 1.5px solid #FF6B00; border-radius: 20px; padding: 22px; display: flex; align-items: center; justify-content: space-between;">
    <div style="font-size: 22px; font-weight: 700;">Zero-Latency Voice & Phrasebook Engine</div>
    <div style="background: #FF6B00; color: #FFF; font-family: 'JetBrains Mono'; font-weight: 800; padding: 8px 18px; border-radius: 10px;">100% OFFLINE</div>
  </div>
</div>
"""
p4_anim = """
tl.fromTo("#p4-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
  .fromTo("#p4-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
  .fromTo("#p4-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.6);
"""

# Part 5 Content
p5_content = """
<div class="eyebrow" id="p5-eyebrow">MOUNTAIN NAVIGATION & SQUAD SYNC</div>
<h1 class="title-lg" id="p5-title">SEQUENTIAL CHECKPOINTS S1 TO S6</h1>
<div class="card-tactical" id="p5-card" style="height: 480px;">
  <svg width="100%" height="320" viewBox="0 0 800 320" fill="none">
    <path d="M 60 260 Q 200 200, 360 160 T 560 100 T 740 60" stroke="#FF6B00" stroke-width="6" fill="none" />
    <circle cx="60" cy="260" r="14" fill="#4CAF7D" />
    <text x="60" y="300" fill="#4CAF7D" font-family="JetBrains Mono" font-size="16" text-anchor="middle" font-weight="700">S1 CLEARED</text>
    <circle cx="200" cy="210" r="14" fill="#4CAF7D" />
    <text x="200" y="250" fill="#4CAF7D" font-family="JetBrains Mono" font-size="16" text-anchor="middle" font-weight="700">S2 CLEARED</text>
    <circle cx="360" cy="160" r="16" fill="#FF6B00" stroke="#FFFFFF" stroke-width="3" />
    <text x="360" y="130" fill="#FF8C38" font-family="JetBrains Mono" font-size="16" text-anchor="middle" font-weight="700">S3 ACTIVE</text>
    <circle cx="560" cy="100" r="12" fill="rgba(255,255,255,0.3)" />
    <circle cx="740" cy="60" r="12" fill="rgba(255,255,255,0.3)" />
  </svg>
  <div style="display: flex; justify-content: space-between; font-family: 'JetBrains Mono'; font-size: 19px; color: rgba(255,255,255,0.7); border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
    <span>GROUP: NORTHEAST SQUAD (4 MEMBERS)</span>
    <span style="color: #4CAF7D;">ALL IN PROXIMITY</span>
  </div>
</div>
"""
p5_anim = """
tl.fromTo("#p5-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
  .fromTo("#p5-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
  .fromTo("#p5-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.6);
"""

# Part 6 Content
p6_content = """
<div class="eyebrow" id="p6-eyebrow">ADAPTIVE PROTECTION</div>
<h1 class="title-lg" id="p6-title">4-TIER THREAT ESCALATION MATRIX</h1>
<div class="card-tactical" id="p6-card">
  <div style="display: flex; gap: 12px; margin-bottom: 32px;">
    <div style="flex: 1; padding: 18px 0; text-align: center; border-radius: 14px; background: rgba(76,175,125,0.15); color: #4CAF7D; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 18px;">NOMAD</div>
    <div style="flex: 1; padding: 18px 0; text-align: center; border-radius: 14px; background: rgba(245,158,11,0.15); color: #F59E0B; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 18px;">WATCH</div>
    <div style="flex: 1; padding: 18px 0; text-align: center; border-radius: 14px; background: rgba(224,90,43,0.15); color: #E05A2B; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 18px;">GUARDIAN</div>
    <div style="flex: 1; padding: 18px 0; text-align: center; border-radius: 14px; background: rgba(224,54,44,0.25); color: #FF7B72; border: 1.5px solid #E0362C; font-family: 'JetBrains Mono'; font-weight: 800; font-size: 18px;" id="p6-sentinel">SENTINEL</div>
  </div>
  <div style="background: rgba(224,54,44,0.14); border: 1.5px solid #E0362C; border-radius: 24px; padding: 28px;">
    <div style="font-size: 26px; font-weight: 800; color: #FFFFFF;">CRITICAL TRIGGER: 0.4 SECONDS</div>
    <div style="font-family: 'JetBrains Mono'; font-size: 20px; color: #FF9B94; margin-top: 8px;">
      ROUTE DEVIATION: +2.1 KM · ACTIVE LANDSLIDE PROXIMITY: 180M
    </div>
  </div>
</div>
"""
p6_anim = """
tl.fromTo("#p6-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
  .fromTo("#p6-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
  .fromTo("#p6-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.6)
  .to("#p6-sentinel", { scale: 1.08, repeat: 5, yoyo: true, duration: 0.3 }, 2.4);
"""

# Part 7 Content
p7_content = """
<div class="eyebrow" id="p7-eyebrow">BLACK-BOX DISPATCH</div>
<h1 class="title-lg" id="p7-title">AUTONOMOUS RESCUE CAPSULE</h1>
<div class="card-tactical" id="p7-card" style="border-color: rgba(255,107,0,0.4);">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 20px; margin-bottom: 24px;">
    <div style="font-size: 28px; font-weight: 800;">ENCRYPTED DISPATCH DOSSIER</div>
    <div style="background: #FF6B00; color: #FFF; font-family: 'JetBrains Mono'; font-weight: 800; padding: 8px 18px; border-radius: 100px;">BROADCASTING</div>
  </div>
  <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px;">
    <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.65);">Last Locked GPS</span><strong style="color: #FF8C38; font-family: 'JetBrains Mono';">27.5861°N, 91.8594°E</strong></div>
    <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.65);">Inactivity Overdue</span><strong style="color: #FF7B72; font-family: 'JetBrains Mono';">47 Minutes</strong></div>
    <div style="display: flex; justify-content: space-between; font-size: 22px;"><span style="color: rgba(255,255,255,0.65);">Channel</span><strong style="color: #FF8C38; font-family: 'JetBrains Mono';">Hybrid LoRa & Rescue Mesh</strong></div>
  </div>
  <div style="background: #0E0F12; border-radius: 18px; padding: 20px; text-align: center; font-family: 'JetBrains Mono'; font-size: 19px; color: #4CAF7D;">
    SDMA EMERGENCY SERVICES ALERTED
  </div>
</div>
"""
p7_anim = """
tl.fromTo("#p7-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
  .fromTo("#p7-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.9)
  .fromTo("#p7-card", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.6);
"""

# Part 8 Content
p8_content = """
<div style="width: 200px; height: 200px; border-radius: 48px; background: linear-gradient(135deg, #FF6B00 0%, #D44E00 100%); box-shadow: 0 24px 80px rgba(255,107,0,0.5); display: flex; align-items: center; justify-content: center; margin-bottom: 48px;" id="p8-emblem">
  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/>
  </svg>
</div>
<h1 class="title-lg" id="p8-title" style="font-size: 76px; margin-bottom: 24px;">
  TRAVEL BEYOND THE GRID.<br>
  <span style="color: #FF6B00;">NEVER TRAVEL ALONE.</span>
</h1>
<div style="font-family: 'Be Vietnam Pro'; font-size: 60px; font-weight: 900; letter-spacing: 3px; margin-bottom: 12px;" id="p8-name">TRINETRA</div>
<div style="font-family: 'JetBrains Mono'; font-size: 24px; color: rgba(255,255,255,0.65); letter-spacing: 2px;" id="p8-sub">
  ATITHI TOURIST INTELLIGENCE & SAFETY NETWORK
</div>
"""
p8_anim = """
tl.fromTo("#p8-emblem", { scale: 0.4, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.3)
  .fromTo("#p8-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
  .fromTo("#p8-name", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.8)
  .fromTo("#p8-sub", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2);
"""

parts = [
    (1, p1_content, p1_anim, "The Himalayan Paradox"),
    (2, p2_content, p2_anim, "Architecture & Guardian"),
    (3, p3_content, p3_anim, "Digital Safety Pass & eKYC"),
    (4, p4_content, p4_anim, "12 Regional Dialects"),
    (5, p5_content, p5_anim, "Route Checkpoints & Squads"),
    (6, p6_content, p6_anim, "4-Tier Threat Matrix"),
    (7, p7_content, p7_anim, "Autonomous Rescue Capsule"),
    (8, p8_content, p8_anim, "Travel Beyond The Grid"),
]

for p_num, content, anim, title in parts:
    out_dir = f"brag-series-4min/part-{p_num}"
    os.makedirs(out_dir, exist_ok=True)
    html = generate_part_html(p_num, content, anim, title)
    with open(f"{out_dir}/index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Wrote {out_dir}/index.html")

print("All 8 composition index.html files generated successfully!")
