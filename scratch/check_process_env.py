import psutil
import os

def check_process_env():
    found_keys = {}
    for proc in psutil.process_iter(['pid', 'name', 'environ']):
        try:
            name = proc.info['name']
            if name and 'node' in name.lower() or 'python' in name.lower():
                env = proc.info['environ']
                if env:
                    for k, v in env.items():
                        if any(x in k.upper() for x in ['GEMINI', 'GOOGLE', 'API_KEY']) or 'AIza' in v:
                            found_keys[f"{proc.pid}_{name}_{k}"] = v
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return found_keys

def main():
    try:
        keys = check_process_env()
        print(f"Found {len(keys)} environment keys in running processes:")
        for k, v in keys.items():
            masked = v[:4] + "..." + v[-4:] if len(v) > 8 else v
            print(f"  {k} = {masked}")
    except Exception as e:
        print("Error:", e)

if __name__ == '__main__':
    main()
