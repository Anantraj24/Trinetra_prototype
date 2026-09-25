# 🏔️ TRINETRA (त्रिनेत्र)
### Tourist Risk Intelligence Network for Emergency Triage, Response & Assistance

> **Predict. Verify. Protect. Even Offline.**

TRINETRA is an intelligent tourist telemetry, safety tracking, and autonomous rescue network engineered for unpredictable Himalayan and Northeast Indian corridors. Designed for extreme-terrain expeditions where cell signal vanishes and mountain weather changes in minutes, TRINETRA bridges offline explorers directly to local squads and state rescue infrastructures.

---

## 🌟 Key Features

### 🪪 1. Biometric Tourist Safety Pass & eKYC
- **Verified Identity Pass**: Issues tamper-evident digital passes with biometric verification and government-aligned eKYC.
- **Offline Cryptographic QR**: Stores critical medical profiles, emergency contacts, blood groups, and insurance data securely on-device without needing active data connectivity.

### 📍 2. Sequential Waypoint Telemetry (S1 → S6)
- **Trail Synchronization**: Tracks travelers through critical checkpoints along rugged mountain trails.
- **Squad Deviation Detection**: Real-time telemetry detects when group members diverge from safe corridors or lag behind schedule.

### ⚡ 3. 4-Tier Adaptive Threat Matrix & Sentinel Mode
- **Terrain & Altitude Risk Modeling**: Continuously assesses elevation sickness indicators, weather alerts, and geological hazard warnings.
- **Rapid Sentinel Activation**: Automatically triggers emergency state in under **0.4 seconds** upon abrupt trajectory anomalies or fall events.

### 📡 4. Autonomous Rescue Capsule
- **Encrypted Black Box**: Compiles the traveler's last verified GPS coordinates, trajectory history, and medical telemetry into an encrypted distress packet.
- **Mesh & Distress Broadcasting**: Relays packets over local peer-to-peer mesh frequencies and rescue beacons when cellular connectivity is unavailable.

### 🗣️ 5. On-Device Regional Dialect Translation
- **12 Northeast Languages**: Instant translation across regional tongues including Assamese, Khasi, Garo, Bodo, Mizo, Manipuri, and more.
- **Survival Phrasebook**: Essential medical, distress, and navigation dialogues optimized for zero-latency offline use.

### 👥 6. Squad Coordination & Travel Hub
- **Group Management**: Travel squads can organize itineraries, monitor member statuses, share locations, and assign roles.
- **Local Services & Verified Operators**: Curated database of local tour guides, verified homestays, medical posts, and fuel depots.

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) / Radix UI primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data & Storage**: [Supabase](https://supabase.com/) client & Edge Functions
- **Deployment**: Configured for seamless deployment on [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anantraj24/Trinetra_prototype.git
   cd Trinetra_prototype
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The optimized production artifacts will be placed in the `dist/` directory.

---

## 📂 Project Structure

```
├── .agents/                    # Workspace automation and skill assets
├── guidelines/                 # Project guidelines and safety standards
├── src/
│   ├── app/
│   │   ├── components/         # Core application components & views
│   │   │   ├── ui/             # Accessible UI primitives & fallback components
│   │   │   ├── Dashboard.tsx   # Desktop telemetry & safety dashboard
│   │   │   ├── MobileDashboard.tsx # Mobile traveler view
│   │   │   ├── MapsPage.tsx    # Interactive trail & waypoint mapping
│   │   │   ├── TourGuidePage.tsx # Regional guides & language support
│   │   │   └── TravelGroupsPage.tsx # Squad management & coordination
│   │   └── supabase/           # Edge functions and data interfaces
│   └── styles/                 # Global styles and theme definitions
├── generate_all_voices.py      # Voice narration generator pipeline
├── generate_compositions.py    # Automated visual composition builder
├── render_and_combine.py       # Multi-part video renderer & concatenation
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── vite.config.ts              # Vite configuration
└── vercel.json                 # Vercel deployment routing configuration
```

---

## 📄 License & Attributions

This project uses open-source components from [shadcn/ui](https://ui.shadcn.com/) licensed under the MIT License, and photography sourced from [Unsplash](https://unsplash.com/). See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full details.