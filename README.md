# SelfStream 🤌

A lightweight, self-hosted Stremio addon with **2 configurable sources**, built-in HLS proxy, multi-language support (40 languages), and automatic subtitle injection.

> **All sources are disabled by default.** Enable only the ones you need from the configuration page.

---

## Features

| Feature | Description |
|---|---|
| **3 Sources** | **VixSrc** (movies & series), **AnimeUnity** (anime via Kitsu) |
| **Per-source configuration** | Enable/disable each source independently from the landing page |
| **40 Languages** | Select preferred audio and subtitle language per source |
| **HLS Proxy** | All streams are proxied through the addon — bypasses geo/IP restrictions |
| **Synthetic FHD** | Proxy rewrites manifests to serve only the best available quality (1080p) |
| **Subtitle Injection** | CinemaCity: up to 90 VTT subtitle tracks injected as HLS subtitle streams with proper BCP-47 language codes |
| **Audio Selection** | Preferred language → English fallback → first available |
| **Subtitle Selection** | Preferred language → none (no fallback) |
| **Localized Titles** | Stream titles show the localized TMDB title in your language |
| **ID Agnostic** | Works with TMDB (`786892`), IMDB (`tt30144839`), and Kitsu (`kitsu:12:1`) IDs |

### Stream Labels
- **VixSrc**: `VixSrc 🤌` — `🎬 Localized Title`
- **AnimeUnity**: `AU 🤌` — `VIX 1080 🤌`

---

## Deployment

> **First**: Fork this repo and update the Dockerfile with your GitHub username.
>
> [📺 Video Guide](https://www.youtube.com/watch?v=nnhwo0C5x3I)

### Recommended: VPS / Raspberry Pi (Best compatibility)

A persistent server is the most reliable option — it keeps the in-memory proxy cache alive and avoids cloud IP blocks.

```bash
git clone https://github.com/YOUR_USER/SelfStream.git
cd SelfStream
npm install
npm run build
PORT=7020 node dist/addon.js
```

The addon will be available at `http://your-ip:7020/manifest.json`.

### Koyeb (Recommended cloud — stable, no sleep, AnimeUnity may not work)

[📺 Video Guide](https://www.youtube.com/watch?v=IXEi81ONdNo)

1. Create an account on [Koyeb.com](https://www.koyeb.com/).
2. Click **"Create Service"** → select **GitHub**.
3. Connect your forked repository.
4. Configuration:
   - **Builder**: `Docker`
   - **Dockerfile Path**: `Dockerfile.hf`
   - **Port**: `7000`
5. Click **Deploy**.

### Hugging Face Spaces (Free, AnimeUnity may not work)

[📺 Video Guide](https://www.youtube.com/watch?v=Ti2BNDjm0ns)

1. Create a new **Space** on [Hugging Face](https://huggingface.co/spaces).
2. Choose **Docker** as SDK, **Blank** template.
3. Upload the Dockerfile (fork the project first and rename `Dockerfile.hf` with your GitHub username).
4. Copy the embed link.
5. The Space runs on port `7860`.

> **Note**: AnimeUnity/VixCloud may not work on HuggingFace due to cloud IP blocking.

### Vercel (Serverless — fast, limited and AnimeUnity may not work)

[📺 Video Guide](https://www.youtube.com/watch?v=TP3_sbt94Ag)

The project includes `vercel.json` and `api/index.ts` for serverless deployment.

1. Go to [Vercel.com](https://vercel.com/) and import your GitHub repo.
2. Vercel auto-detects the configuration.
3. Click **Deploy**.
4. Access at `https://your-app.vercel.app/manifest.json`.

> **Limitations**: Vercel free plan has a 10s function timeout. Multi-step scraping (AnimeUnity) may exceed this. The in-memory proxy header cache resets between invocations (a fallback is in place, but VPS is more reliable).

---

## Local Development

```bash
npm install
npm run build
npm start
# Or with ts-node:
npm run dev
```

The addon runs on `http://localhost:7000` by default.

---

## Technical Notes

- **Proxy architecture**: Stream URLs point to `/proxy/hls/manifest.m3u8` which rewrites all segment/audio/subtitle URIs to also go through the proxy, ensuring playback works from any network.
- **AnimeMapping**: Kitsu IDs are converted to AnimeUnity paths via the AnimeMapping API, then resolved through VixCloud.
- **Header cache fallback**: On serverless platforms where the in-memory cache is empty, the proxy infers the correct headers from the URL pattern (VixSrc, VixCloud, or generic).
