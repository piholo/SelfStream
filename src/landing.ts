import { AVAILABLE_LANGUAGES, DEFAULT_CONFIG } from './config';

export function generateLandingPage(manifest: any, addonBase: string): string {
    const langOptions = AVAILABLE_LANGUAGES.map(l =>
        '<option value="' + l.code + '"' + (l.code === DEFAULT_CONFIG.vixLang ? ' selected' : '') + '>' + l.flag + ' ' + l.label + '</option>'
    ).join('\n');

    const addonBaseJson = JSON.stringify(addonBase);

    return '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'<meta charset="UTF-8">' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'<title>' + manifest.name + ' - Installation</title>' +
'<link rel="icon" href="' + manifest.logo + '">' +
'<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@500;700&display=swap" rel="stylesheet">' +
`<style>
:root{--primary:#8A5AAB;--primary-hover:#724191;--bg:#0f0f12;--glass:rgba(255,255,255,0.05);--glass-border:rgba(255,255,255,0.1);--text:#fff;--text-muted:rgba(255,255,255,0.7)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background-color:var(--bg);background-image:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.8)),url('https://i.imgur.com/uasXEWM.jpeg');background-size:cover;background-position:center;background-attachment:fixed;color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;overflow-x:hidden}
.container{width:100%;max-width:520px;padding:40px 20px;animation:fadeIn .8s ease-out}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.card{background:var(--glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--glass-border);border-radius:24px;padding:40px;text-align:center;box-shadow:0 8px 32px 0 rgba(0,0,0,.8)}
.logo{width:120px;height:120px;border-radius:20%;margin:0 auto 24px;display:block;box-shadow:0 4px 15px rgba(0,0,0,.3)}
h1{font-family:'Outfit',sans-serif;font-size:32px;font-weight:700;margin-bottom:8px;background:linear-gradient(135deg,#fff 0%,#aaa 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.version{font-size:14px;color:var(--text-muted);background:var(--glass-border);padding:2px 10px;border-radius:12px;display:inline-block;margin-bottom:20px}
p.description{font-size:16px;color:var(--text-muted);line-height:1.6;margin-bottom:32px}
.button-group{display:flex;flex-direction:column;gap:16px}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 28px;border-radius:14px;font-size:16px;font-weight:600;text-decoration:none;transition:all .3s ease;cursor:pointer;border:none;width:100%}
.btn-primary{background-color:var(--primary);color:#fff}
.btn-primary:hover{background-color:var(--primary-hover);transform:translateY(-2px);box-shadow:0 5px 15px rgba(138,90,171,.4)}
.btn-secondary{background-color:var(--glass-border);color:#fff}
.btn-secondary:hover{background-color:rgba(255,255,255,.15);transform:translateY(-2px)}
.custom-kofi-union{background:#FF5E5B;color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:10px;transition:transform .2s;font-weight:600}
.custom-kofi-union:hover{transform:scale(1.02);background:#ff4d4a}
.custom-kofi-union img{height:24px}
.toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(100px);background:rgba(138,90,171,.9);color:#fff;padding:10px 24px;border-radius:50px;font-weight:500;transition:transform .3s ease-out;z-index:1000;backdrop-filter:blur(10px)}
.toast.show{transform:translateX(-50%) translateY(0)}
.config-section{margin-bottom:28px;text-align:left}
.config-section h2{font-family:'Outfit',sans-serif;font-size:18px;margin-bottom:16px;color:var(--text-muted);text-align:center}
.source-row{background:rgba(255,255,255,.04);border:1px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;transition:all .3s ease}
.source-row.disabled{opacity:.5}
.source-header{display:flex;align-items:center;justify-content:space-between}
.source-label{font-weight:600;font-size:15px;display:flex;align-items:center;gap:8px}
.source-badge{font-size:11px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,.1);color:var(--text-muted)}
.toggle{position:relative;width:48px;height:26px;flex-shrink:0}
.toggle input{opacity:0;width:0;height:0}
.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,.15);border-radius:26px;transition:.3s}
.toggle-slider:before{content:"";position:absolute;height:20px;width:20px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}
.toggle input:checked+.toggle-slider{background:var(--primary)}
.toggle input:checked+.toggle-slider:before{transform:translateX(22px)}
.source-options{margin-top:12px;overflow:hidden;max-height:0;transition:max-height .3s ease}
.source-row.enabled .source-options{max-height:80px}
.lang-select{width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--glass-border);background:rgba(255,255,255,.08);color:#fff;font-size:14px;font-family:'Inter',sans-serif;appearance:none;-webkit-appearance:none;cursor:pointer;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 10px center;background-size:16px}
.lang-select option{background:#1a1a2e;color:#fff}
@media(max-width:480px){.card{padding:30px 20px}h1{font-size:28px}}
</style>
</head>
<body>
<div class="container">
<div class="card">
` +
'<img src="' + manifest.logo + '" alt="Logo" class="logo">' +
'<h1>' + manifest.name + '</h1>' +
'<span class="version">v' + manifest.version + '</span>' +
'<p class="description">' + manifest.description + '</p>' +
`
<div class="config-section">
<h2>⚙️ Source Configuration</h2>

<div class="source-row enabled" id="vix-row">
    <div class="source-header">
        <span class="source-label">📺 ViX <span class="source-badge">Multi-language</span></span>
        <label class="toggle"><input type="checkbox" id="vixEnabled" checked onchange="toggleSource('vix')"><span class="toggle-slider"></span></label>
    </div>
    <div class="source-options">
        <select id="vixLang" class="lang-select">` + langOptions + `</select>
    </div>
</div>

<!-- CinemaCity disabled — Cloudflare bypass no longer viable -->
<input type="hidden" id="cinemacityEnabled" />
<input type="hidden" id="cinemacityLang" value="en" />

<div class="source-row disabled" id="animeunity-row">
    <div class="source-header">
        <span class="source-label">🇮🇹 AnimeUnity <span class="source-badge">Only Local and 🇮🇹 · Use Kitsu</span></span>
        <label class="toggle"><input type="checkbox" id="animeunityEnabled" onchange="toggleSource('animeunity')"><span class="toggle-slider"></span></label>
    </div>
</div>
</div>

<div class="button-group">
    <a href="#" class="btn btn-primary" id="install_button">Install Addon</a>
    <a href="https://ko-fi.com/G2G41MG3ZN" target="_blank" class="custom-kofi-union">
        <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="Ko-fi"><span>Buy us a beer 🍻</span>
    </a>
    <button class="btn btn-secondary" onclick="copyManifest()">Copy Manifest Link</button>
</div>
</div>
</div>

<div id="toast" class="toast">Link copied!</div>

<script>
var ADDON_BASE = ` + addonBaseJson + `;

function getConfig(){
    return {
        vixEnabled: document.getElementById('vixEnabled').checked,
        vixLang: document.getElementById('vixLang').value,
        cinemacityEnabled: document.getElementById('cinemacityEnabled').checked,
        cinemacityLang: document.getElementById('cinemacityLang').value,
        animeunityEnabled: document.getElementById('animeunityEnabled').checked
    };
}

function encodeConfig(cfg){
    var s = JSON.stringify(cfg);
    return btoa(s).replace(/\\+/g,'-').replace(/\\//g,'_').replace(/=+$/g,'');
}

function getManifestUrl(){
    return ADDON_BASE + '/' + encodeConfig(getConfig()) + '/manifest.json';
}

function toggleSource(name){
    var rowId = name + '-row';
    if(name==='vix') rowId = 'vix-row';
    var row = document.getElementById(rowId);
    var cbId = name + 'Enabled';
    if(name==='vix') cbId = 'vixEnabled';
    var cb = document.getElementById(cbId);
    if(cb.checked){ row.classList.remove('disabled'); row.classList.add('enabled'); }
    else { row.classList.remove('enabled'); row.classList.add('disabled'); }
}

function showToast(msg){
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function(){ t.classList.remove('show'); }, 2000);
}

document.getElementById('install_button').addEventListener('click', function(e){
    e.preventDefault();
    var url = getManifestUrl();
    window.location.href = 'stremio://' + url.replace(/^https?:\\/\\//, '');
});

function copyManifest(){
    var url = getManifestUrl();
    navigator.clipboard.writeText(url).then(function(){ showToast('Link copied to clipboard!'); });
}
</script>
</body>
</html>`;
}
