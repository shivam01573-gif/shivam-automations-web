import os
import sys

# Get the AppData path
appdata = os.environ.get("APPDATA")
if not appdata:
    print("[!] APPDATA environment variable not found. Cannot determine startup folder.")
    sys.exit(1)

# Target startup directory for currently logged-in user (requires zero admin privileges)
startup_dir = os.path.join(appdata, "Microsoft", "Windows", "Start Menu", "Programs", "Startup")
vbs_path = os.path.join(startup_dir, "shivam_pipeline_startup.vbs")

# Absolute path of the batch file we want to run
bat_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "run_pipeline.bat"))

# VBScript to execute the batch file in the background (silently, no command window pop-up)
vbs_content = f'''Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """{bat_path}""", 0, False
'''

try:
    with open(vbs_path, "w", encoding="utf-8") as f:
        f.write(vbs_content)
    print(f"[+] Successfully installed silent startup trigger at:")
    print(f"    {vbs_path}")
    print(f"[+] The automation pipeline will now run silently every time your PC turns on and you log in.")
except Exception as e:
    print(f"[!] Failed to install startup script: {e}")
    sys.exit(1)
