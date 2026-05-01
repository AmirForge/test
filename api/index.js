import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

export const config = {
  api: { bodyParser: false },
  supportsResponseStreaming: true,
  maxDuration: 60,
};

const _e = (process.env["TARGET_DOMAIN"] || "").replace(/\/$/, "");

const _s = new Set([
  "host", "connection", "keep-alive",
  "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade",
  "forwarded", "x-forwarded-host", "x-forwarded-proto", "x-forwarded-port",
]);

function _p() {
  const a = [
    '<!DOCTYPE html><html lang="fa" dir="rtl"><head><meta charset="UTF-8"/>',
    '<meta name="viewport" content="width=device-width,initial-scale=1.0"/>',
    '<meta name="description" content="Online scientific calculator"/>',
    '<title>Smart Calculator</title><style>',
    '*{box-sizing:border-box;margin:0;padding:0}',
    'body{font-family:system-ui,sans-serif;background:#f5f5f5;display:flex;align-items:center;justify-content:center;min-height:100vh}',
    '.c{background:#fff;border-radius:20px;padding:24px;width:320px;box-shadow:0 4px 24px rgba(0,0,0,.08)}',
    '.h{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}',
    '.t{font-size:14px;color:#888}.b{font-size:11px;background:#f0f0f0;color:#666;border-radius:20px;padding:3px 10px}',
    '.hi{font-size:12px;color:#bbb;font-family:monospace;text-align:right;min-height:16px;margin-bottom:8px}',
    '.dp{background:#f8f8f8;border-radius:12px;padding:16px;margin-bottom:16px;text-align:right}',
    '.ex{font-size:13px;color:#bbb;min-height:18px;font-family:monospace}',
    '.nm{font-size:32px;font-weight:500;color:#111;font-family:monospace}',
    '.g{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}',
    'button{border:none;border-radius:10px;font-size:16px;height:56px;cursor:pointer;transition:transform .1s,opacity .1s;font-family:inherit}',
    'button:active{transform:scale(.95);opacity:.8}',
    '.n{background:#f0f0f0;color:#111}.o{background:#deeeff;color:#1a5fa8;font-weight:500}',
    '.q{background:#1D9E75;color:#fff;font-weight:500}.r{background:#ffeae6;color:#b03a1d}',
    '.f{background:#f5f5f5;color:#666;font-size:13px}.w{grid-column:span 2}',
    '</style></head><body><div class="c">',
    '<div class="h"><span class="t">\u0645\u0627\u0634\u06CC\u0646 \u062D\u0633\u0627\u0628</span>',
    '<span class="b">\u0639\u0644\u0645\u06CC</span></div>',
    '<div class="hi" id="z"></div>',
    '<div class="dp"><div class="ex" id="y"></div><div class="nm" id="x">0</div></div>',
    '<div class="g">',
    '<button class="f" data-f="s">sin</button>',
    '<button class="f" data-f="c">cos</button>',
    '<button class="f" data-f="t">tan</button>',
    '<button class="f" data-f="r">\u221A</button>',
    '<button class="r" data-a="c">C</button>',
    '<button class="o" data-a="s">+/\u2212</button>',
    '<button class="o" data-a="p">%</button>',
    '<button class="o" data-o="\u00F7">\u00F7</button>',
    '<button class="n" data-d="7">7</button>',
    '<button class="n" data-d="8">8</button>',
    '<button class="n" data-d="9">9</button>',
    '<button class="o" data-o="\u00D7">\u00D7</button>',
    '<button class="n" data-d="4">4</button>',
    '<button class="n" data-d="5">5</button>',
    '<button class="n" data-d="6">6</button>',
    '<button class="o" data-o="\u2212">\u2212</button>',
    '<button class="n" data-d="1">1</button>',
    '<button class="n" data-d="2">2</button>',
    '<button class="n" data-d="3">3</button>',
    '<button class="o" data-o="+">+</button>',
    '<button class="n w" data-d="0">0</button>',
    '<button class="n" data-a="d">.</button>',
    '<button class="q" data-a="e">=</button>',
    '</div></div><script>',
    'void function(){var a="0",b=null,c=null,d=!0,e=[];',
    'var f=document.getElementById("x");',
    'var g=document.getElementById("y");',
    'var h=document.getElementById("z");',
    'function u(){var t=a;if(t.length>12)t=parseFloat(parseFloat(t).toPrecision(9)).toString();f.textContent=t}',
    'function k(p,q,o){switch(o){case"+":return p+q;case"\\u2212":return p-q;case"\\u00D7":return p*q;case"\\u00F7":return q!==0?p/q:"\\u062E\\u0637\\u0627"}}',
    'document.querySelector(".g").addEventListener("click",function(ev){',
    'var v=ev.target.closest("button");if(!v)return;',
    'if(v.dataset.d!==void 0){if(d){a=v.dataset.d;d=!1}else a=a==="0"?v.dataset.d:a+v.dataset.d;u()}',
    'else if(v.dataset.o){var w=v.dataset.o;if(b&&!d){var r=k(parseFloat(c),parseFloat(a),b);a=typeof r==="number"?parseFloat(r.toPrecision(10)).toString():r;u()}c=a;b=w;d=!0;g.textContent=a+" "+w}',
    'else if(v.dataset.a==="e"){if(b&&c!==null&&!d){var r=k(parseFloat(c),parseFloat(a),b);var m=c+" "+b+" "+a+" = "+(typeof r==="number"?parseFloat(r.toPrecision(10)):r);e.unshift(m);if(e.length>2)e.pop();h.textContent=e[0]||"";a=typeof r==="number"?parseFloat(r.toPrecision(10)).toString():r;b=null;c=null;d=!0;g.textContent="";u()}}',
    'else if(v.dataset.a==="c"){a="0";b=null;c=null;d=!0;g.textContent="";u()}',
    'else if(v.dataset.a==="s"){a=(parseFloat(a)*-1).toString();u()}',
    'else if(v.dataset.a==="p"){a=(parseFloat(a)/100).toString();u()}',
    'else if(v.dataset.a==="d"){if(d){a="0.";d=!1}else if(!a.includes("."))a+=".";u()}',
    'else if(v.dataset.f){var j=parseFloat(a),n;',
    'switch(v.dataset.f){case"s":n=Math.sin(j*Math.PI/180);break;case"c":n=Math.cos(j*Math.PI/180);break;case"t":n=Math.tan(j*Math.PI/180);break;case"r":n=j>=0?Math.sqrt(j):"\\u062E\\u0637\\u0627";break}',
    'var m=v.dataset.f+"("+j+") = "+(typeof n==="number"?parseFloat(n.toPrecision(6)):n);',
    'e.unshift(m);if(e.length>2)e.pop();h.textContent=e[0]||"";',
    'a=typeof n==="number"?parseFloat(n.toPrecision(10)).toString():n;d=!0;g.textContent="";u()}',
    '})}();',
    '<\/script></body></html>'
  ];
  return a.join("");
}

const _h = _p();

export default async function handler(req, res) {
  if (req.url === "/" || req.url === "") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.statusCode = 200;
    return res.end(_h);
  }

  if (!_e) {
    res.statusCode = 500;
    return res.end("Service configuration error");
  }

  try {
    const _t = _e + req.url;
    const _hd = {};
    let _ip = null;

    for (const _k of Object.keys(req.headers)) {
      const _kl = _k.toLowerCase();
      const _v = req.headers[_k];
      if (_s.has(_kl)) continue;
      if (_kl.startsWith("x-vercel-")) continue;
      if (_kl === "x-real-ip") { _ip = _v; continue; }
      if (_kl === "x-forwarded-for") { if (!_ip) _ip = _v; continue; }
      _hd[_kl] = Array.isArray(_v) ? _v.join(", ") : _v;
    }

    if (_ip) _hd["x-forwarded-for"] = _ip;

    const _m = req.method;
    const _b = _m !== "GET" && _m !== "HEAD";
    const _o = { method: _m, headers: _hd, redirect: "manual" };

    if (_b) {
      _o.body = Readable.toWeb(req);
      _o.duplex = "half";
    }

    const _u = await fetch(_t, _o);
    res.statusCode = _u.status;

    for (const [_rk, _rv] of _u.headers) {
      if (_rk.toLowerCase() === "transfer-encoding") continue;
      try { res.setHeader(_rk, _rv); } catch (_x) {}
    }

    if (_u.body) {
      await pipeline(Readable.fromWeb(_u.body), res);
    } else {
      res.end();
    }
  } catch (_er) {
    if (!res.headersSent) {
      res.statusCode = 502;
      res.end("Service temporarily unavailable");
    }
  }
}
