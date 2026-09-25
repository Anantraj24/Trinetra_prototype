import subprocess
import os

scripts = {
    1: [
        ("v1.wav", "The Himalayas and Northeast corridors hold India's most breathtaking frontiers."),
        ("v2.wav", "But when cell towers vanish and mountain passes freeze, a single wrong turn leaves you invisible."),
        ("v3.wav", "Ordinary travel apps assume you have 5G. Trinetra assumes you have nothing.")
    ],
    2: [
        ("v1.wav", "Introducing Trinetra, the intelligent tourist telemetry and autonomous rescue network."),
        ("v2.wav", "Built for unpredictable Himalayan corridors, it bridges offline travelers directly to state rescue systems."),
        ("v3.wav", "Turning vulnerable explorers into monitored, self-reliant adventurers.")
    ],
    3: [
        ("v1.wav", "Safety begins before you take your first step."),
        ("v2.wav", "Trinetra issues a government-verified Tourist Safety Pass with real-time biometric eKYC."),
        ("v3.wav", "Your medical profile, emergency contacts, and blood group are sealed in an offline-ready QR pass.")
    ],
    4: [
        ("v1.wav", "In remote valleys, communication is survival."),
        ("v2.wav", "Trinetra provides on-device dialect translation across twelve Northeast languages."),
        ("v3.wav", "From Khasi and Garo to Bodo and Assamese, speak naturally and be understood anywhere.")
    ],
    5: [
        ("v1.wav", "On the mountain trail, every checkpoint matters."),
        ("v2.wav", "Trinetra monitors sequential waypoints from S1 through S6 with live satellite telemetry."),
        ("v3.wav", "Keep your travel squad synchronized, alerting leaders instantly if anyone deviates.")
    ],
    6: [
        ("v1.wav", "Trinetra never panics, but it never sleeps."),
        ("v2.wav", "Four adaptive threat tiers continuously evaluate your terrain and altitude risk."),
        ("v3.wav", "Deviations and landslide proximity trigger Sentinel Mode automatically in zero point four seconds.")
    ],
    7: [
        ("v1.wav", "When cell signal dies completely, your autonomous Rescue Capsule activates."),
        ("v2.wav", "It bundles your GPS coordinates, trajectory history, and medical telemetry into an encrypted black box."),
        ("v3.wav", "Transmitting distress beacons across local mesh and rescue frequencies to save lives.")
    ],
    8: [
        ("v1.wav", "Trinetra is the ultimate digital safety net for the next generation of explorers."),
        ("v2.wav", "Venture deeper. Climb higher. Explore freely."),
        ("v3.wav", "Travel beyond the grid. Never travel alone. Trinetra.")
    ]
}

for part, lines in scripts.items():
    dest_dir = f"brag-series-4min/part-{part}/assets/voice"
    os.makedirs(dest_dir, exist_ok=True)
    for filename, text in lines:
        out_path = os.path.join(dest_dir, filename)
        cmd = ["npx", "hyperframes", "tts", text, "-o", out_path, "-v", "am_adam", "-s", "1.05"]
        print(f"Generating Part {part}: {filename}...")
        subprocess.run(cmd, shell=True, check=True)

print("All 24 voice tracks generated successfully!")
