const fs = require('fs');
const { marked } = require('marked');
const src = fs.readFileSync('design/bellwether-spec.md', 'utf8');
marked.use({ gfm: true, breaks: false });
let html = marked.parse(src);

// stable ids on h1/h2, wrap tables for horizontal scroll, build the sidebar
const used = new Map();
const slug = (t) => {
  let s = t.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (used.has(s)) { const n = used.get(s) + 1; used.set(s, n); s += '-' + n; } else used.set(s, 1);
  return s;
};
const toc = [];
html = html.replace(/<(h[12])>([\s\S]*?)<\/\1>/g, (m, tag, inner) => {
  const text = inner.replace(/<[^>]+>/g, '').trim();
  const id = slug(text);
  toc.push({ tag, id, text });
  return `<${tag} id="${id}">${inner}</${tag}>`;
});
html = html.replace(/<table>/g, '<div class="tbl"><table>').replace(/<\/table>/g, '</table></div>');

const nav = toc.map(h => h.tag === 'h1'
  ? `<div class="t1">${h.text}</div>`
  : `<a href="#${h.id}">${h.text}</a>`).join('\n');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bellwether</title>
<meta name="description" content="Product specification for Bellwether: an idle tycoon with a bound utility token on Robinhood Chain and a revenue-funded path from play to owning stock.">
<meta name="color-scheme" content="light dark">
<meta property="og:title" content="Bellwether">
<meta property="og:description" content="An idle tycoon about patience, with a bound utility token on Robinhood Chain and a revenue-funded path from play to owning stock.">
<meta property="og:type" content="article">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;600&display=swap">
<style>
:root{
  --paper:#F5F7F4; --surface:#FFFFFF; --ink:#131A17; --muted:#5A6661; --rule:#D3DAD5;
  --accent:#1E6B55; --accent-soft:#E3F0EA; --code:#EEF2EF;
  --display:"Archivo","Helvetica Neue",Arial,sans-serif;
  --body:"Source Sans 3","Segoe UI",system-ui,sans-serif;
  --mono:"JetBrains Mono",Consolas,"Courier New",monospace;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --paper:#0F1513; --surface:#151D19; --ink:#E4EBE6; --muted:#97A39D; --rule:#24302B;
  --accent:#6FCFA8; --accent-soft:#1A2E26; --code:#1A2420;
}}
:root[data-theme="dark"]{
  --paper:#0F1513; --surface:#151D19; --ink:#E4EBE6; --muted:#97A39D; --rule:#24302B;
  --accent:#6FCFA8; --accent-soft:#1A2E26; --code:#1A2420;
}
*{box-sizing:border-box}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.55}
img{max-width:100%}
a{color:var(--accent)}
a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.mast{border-bottom:1px solid var(--rule);padding:40px 24px 28px}
.mast-in{max-width:1180px;margin:0 auto;display:grid;gap:18px}
.eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
h1.title{font-family:var(--display);font-weight:800;font-size:clamp(40px,6vw,64px);line-height:1;letter-spacing:-.02em;margin:0}
.sub{font-size:19px;max-width:62ch;margin:0;color:var(--muted)}
.ledgers{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-top:6px}
.ledger{background:var(--surface);border:1px solid var(--rule);padding:14px 16px;border-left:4px solid var(--accent)}
.ledger b{font-family:var(--display);display:block;margin-bottom:4px}
.ledger span{font-size:15px;color:var(--muted)}
.wrap{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:270px minmax(0,1fr);gap:48px;padding:32px 24px 96px}
nav.toc{position:sticky;top:16px;align-self:start;max-height:calc(100vh - 32px);overflow:auto;font-size:14px;padding-right:8px}
nav.toc .t1{font-family:var(--display);font-weight:700;margin:14px 0 4px;color:var(--ink)}
nav.toc a{display:block;color:var(--muted);text-decoration:none;padding:3px 0 3px 12px;border-left:2px solid var(--rule)}
nav.toc a:hover,nav.toc a.on{color:var(--accent);border-left-color:var(--accent)}
article{max-width:74ch;min-width:0}
article h1{font-family:var(--display);font-weight:800;font-size:34px;letter-spacing:-.015em;margin:64px 0 8px;padding-top:24px;border-top:3px solid var(--ink);text-wrap:balance}
article h1:first-child{margin-top:0;border-top:0;padding-top:0}
article h2{font-family:var(--display);font-weight:700;font-size:24px;margin:44px 0 10px;text-wrap:balance}
article h3{font-family:var(--display);font-weight:600;font-size:18px;margin:28px 0 6px}
article p{margin:0 0 14px}
article ul,article ol{padding-left:22px;margin:0 0 14px}
article li{margin:4px 0}
article strong{font-weight:600}
article blockquote{margin:0 0 14px;padding:8px 16px;border-left:3px solid var(--accent);background:var(--accent-soft)}
article code{font-family:var(--mono);font-size:.86em;background:var(--code);padding:1px 5px;border-radius:3px}
article pre{background:var(--code);padding:14px;overflow-x:auto;border:1px solid var(--rule)}
article pre code{background:none;padding:0}
.tbl{overflow-x:auto;margin:0 0 18px;border:1px solid var(--rule);background:var(--surface)}
table{border-collapse:collapse;width:100%;font-size:14.5px;font-variant-numeric:tabular-nums}
th,td{text-align:left;vertical-align:top;padding:8px 10px;border-bottom:1px solid var(--rule)}
th{font-family:var(--display);font-weight:600;font-size:13px;letter-spacing:.02em;background:var(--accent-soft)}
tr:last-child td{border-bottom:0}
hr{border:0;border-top:1px solid var(--rule);margin:28px 0}
@media (max-width:900px){.wrap{grid-template-columns:1fr;gap:24px}nav.toc{position:static;max-height:none;border-bottom:1px solid var(--rule);padding-bottom:12px}}
@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}
</style>
</head>
<body>
<header class="mast"><div class="mast-in">
<div class="eyebrow">Product specification &middot; v1.0 &middot; 2 September 2026 &middot; facts as of 1 September 2026</div>
<h1 class="title">Bellwether</h1>
<p class="sub">An idle tycoon about patience, with a bound utility token on Robinhood Chain and a revenue-funded path from play to owning stock.</p>
<div class="ledgers">
<div class="ledger"><b>Game currencies</b><span>Cash, Float, Weight, Gems. Closed loop, never withdrawable.</span></div>
<div class="ledger"><b>BELL</b><span>Capped ERC-20 on chain 4663, bound to one verified player. No price, no sale, no TGE.</span></div>
<div class="ledger"><b>Stock Credit</b><span>Cents from ads and purchases under the published Bell Rule, delivered by a licensed party.</span></div>
</div></div></header>
<div class="wrap">
<nav class="toc" aria-label="Contents">
${nav}
</nav>
<article>
${html}
</article>
</div>
<script>
(function(){
  var links=[].slice.call(document.querySelectorAll('nav.toc a'));
  if(!links.length||!('IntersectionObserver' in window))return;
  var map=links.map(function(a){return [document.getElementById(a.getAttribute('href').slice(1)),a];})
               .filter(function(p){return p[0];});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){map.forEach(function(p){p[1].classList.toggle('on',p[0]===e.target);});}
    });
  },{rootMargin:'-10% 0px -80% 0px'});
  map.forEach(function(p){io.observe(p[0]);});
})();
</script>
</body>
</html>
`;
fs.writeFileSync('index.html', page);
console.log('rendered index.html bytes', fs.statSync('index.html').size, '| toc entries', toc.length, '| h1s', toc.filter(t => t.tag === 'h1').length);
