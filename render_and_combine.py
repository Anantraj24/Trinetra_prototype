import subprocess
import os
import sys

base_dir = os.path.abspath("brag-series-4min")
parts = list(range(1, 9))

# Add ffmpeg path
ffmpeg_bin = r"C:\Users\anant\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-full_build\bin"
env = os.environ.copy()
if ffmpeg_bin not in env.get("PATH", ""):
    env["PATH"] = ffmpeg_bin + os.pathsep + env.get("PATH", "")

print("=" * 60)
print("STARTING BATCH RENDER FOR TRINETRA 4-MINUTE LAUNCH FILM")
print("=" * 60)

for p in parts:
    part_dir = os.path.join(base_dir, f"part-{p}")
    out_mp4 = os.path.join(base_dir, f"part-{p}.mp4")
    
    if os.path.exists(out_mp4) and os.path.getsize(out_mp4) > 1000000:
        print(f"\n[Step {p}/{len(parts)}] Part {p} already rendered ({out_mp4}), skipping.")
        continue

    print(f"\n[Step {p}/{len(parts)}] Rendering Part {p} -> {out_mp4}...")
    cmd = ["npx", "hyperframes", "render", "--output", f"../part-{p}.mp4"]
    res = subprocess.run(cmd, cwd=part_dir, shell=True, env=env)
    if res.returncode != 0:
        print(f"Error rendering Part {p}!")
        sys.exit(1)
    print(f"[OK] Part {p} successfully rendered ({out_mp4})")

# Write concat list
concat_file = os.path.join(base_dir, "concat_list.txt")
with open(concat_file, "w") as f:
    for p in parts:
        f.write(f"file 'part-{p}.mp4'\n")

print("\n" + "=" * 60)
print("CONCATENATING ALL 8 PARTS INTO 4-MINUTE MASTER FILM")
print("=" * 60)

ffmpeg_exe = os.path.join(ffmpeg_bin, "ffmpeg.exe")
master_mp4 = os.path.join(base_dir, "trinetra-4min-complete.mp4")
concat_cmd = [ffmpeg_exe, "-y", "-f", "concat", "-safe", "0", "-i", "concat_list.txt", "-c", "copy", "trinetra-4min-complete.mp4"]
subprocess.run(concat_cmd, cwd=base_dir, shell=True, check=True, env=env)

# Extract poster frame from master
poster_jpg = os.path.join(base_dir, "trinetra-4min-poster.jpg")
poster_cmd = [ffmpeg_exe, "-y", "-ss", "35.0", "-i", "trinetra-4min-complete.mp4", "-frames:v", "1", "-q:v", "2", "trinetra-4min-poster.jpg"]
subprocess.run(poster_cmd, cwd=base_dir, shell=True, check=True, env=env)

print("\n[OK] 4-MINUTE MASTER FILM COMPLETED SUCCESSFULLY!")
print(f"Master Video: {master_mp4}")
print(f"Poster Frame: {poster_jpg}")
