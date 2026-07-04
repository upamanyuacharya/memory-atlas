"""Generate icons / concept art via OpenRouter image models (default gpt-5.4-image-2).
Usage: python gen.py "<prompt>" out.png [--model openai/gpt-5.4-image-2] [--aspect 1:1]
Key: OPENROUTER_API_KEY env or ~/.openrouter/.env
"""
import sys, os, json, base64, argparse
from io import BytesIO

def find_key():
    k = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if k: return k
    p = os.path.join(os.path.expanduser("~"), ".openrouter", ".env")
    if os.path.exists(p):
        for line in open(p):
            if line.strip().startswith("OPENROUTER_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

def gen(prompt, out, model, aspect):
    import requests
    from PIL import Image
    key = find_key()
    if not key:
        print("ERROR: no key"); return False
    payload = {
        "model": model,
        "modalities": ["image", "text"],
        "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
        "image_config": {"aspect_ratio": aspect},
    }
    h = {"Authorization": f"Bearer {key}", "Content-Type": "application/json",
         "HTTP-Referer": "https://upamanyuacharya.com", "X-Title": "Memory Atlas"}
    try:
        r = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=h, json=payload, timeout=180)
    except Exception as e:
        print("ERROR req:", e); return False
    if r.status_code != 200:
        print("ERROR", r.status_code, r.text[:400]); return False
    data = r.json()
    msg = data.get("choices", [{}])[0].get("message", {})
    imgs = msg.get("images", [])
    raw = None
    if imgs:
        fi = imgs[0]
        raw = fi.get("image_url", {}).get("url", "") if isinstance(fi, dict) else fi
    if not raw:
        c = msg.get("content", "")
        if isinstance(c, str) and "data:image" in c:
            raw = c[c.index("data:image"):]
    if not raw:
        print("ERROR: no image. keys:", list(msg.keys()), str(msg.get("content"))[:200]); return False
    if "," in raw:
        raw = raw.split(",", 1)[1]
    img = Image.open(BytesIO(base64.b64decode(raw)))
    img.save(out, format="PNG")
    print(f"OK {out}  {img.size[0]}x{img.size[1]}  {os.path.getsize(out):,}b")
    return True

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("prompt"); ap.add_argument("out")
    ap.add_argument("--model", default="openai/gpt-5.4-image-2")
    ap.add_argument("--aspect", default="1:1")
    a = ap.parse_args()
    sys.exit(0 if gen(a.prompt, a.out, a.model, a.aspect) else 1)
