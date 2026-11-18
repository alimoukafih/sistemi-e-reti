(async()=>{const J=async f=>{try{return await (await fetch("../data/"+f)).json()}catch(e){$("#err").hidden=false;return[]}};
const Q=await J("quiz.json"),F=await J("flashcards.json"),G=await J("glossary.json");
// quiz
let qs=[...Q].sort(()=>Math.random()-.5),qi=0,sc=0,bad={};
function qdraw(){const z=$("#qz");if(!qs.length){z.textContent="";return}
if(qi>=qs.length){z.innerHTML=`<p><b>Punteggio: ${sc}/${qs.length}</b></p><p>Da ripassare: ${Object.keys(bad).join(", ")||"niente, ottimo!"}</p><button id="rq">Rifai il quiz</button>`;$("#rq").onclick=()=>{qs.sort(()=>Math.random()-.5);qi=sc=0;bad={};qdraw()};return}
const q=qs[qi];z.innerHTML=`<p>Domanda ${qi+1} di ${qs.length} · ${q.topic}</p><progress max="${qs.length}" value="${qi}"></progress><p><b>${esc(q.q)}</b></p>`+q.options.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")+`<p id="qf" aria-live="polite"></p>`;
z.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,r=k==q.answer;r?sc++:bad[q.topic]=1;z.querySelectorAll(".opt").forEach((o,j)=>{o.disabled=true;if(j==q.answer)o.classList.add("good");else if(j==k)o.classList.add("bad")});
$("#qf").innerHTML=`<span class="${r?"ok":"ko"}">${r?"Corretto!":"Sbagliato."}</span> ${esc(q.explain)} <button id="nx">Avanti</button>`;$("#nx").onclick=()=>{qi++;qdraw()}})}
qdraw();
// flashcards
let deck=[...F],side=0;
function fdraw(){const z=$("#fc");if(!deck.length){z.innerHTML="<p>Hai finito il mazzo!</p><button id='fr'>Ricomincia</button>";$("#fr").onclick=()=>{deck=[...F];fdraw()};return}
const c=deck[0];z.innerHTML=`<p>Carte nel mazzo: ${deck.length}</p><button class="opt flip" id="cd">${esc(side?c.back:c.front)}</button><p>Premi la carta per girarla.</p>`+(side?`<div class="row"><button id="k1">Lo so</button><button class="alt" id="k2">Da ripassare</button></div>`:"");
$("#cd").onclick=()=>{side=!side;fdraw()};if(side){$("#k1").onclick=()=>{deck.shift();side=0;fdraw()};$("#k2").onclick=()=>{deck.push(deck.shift());side=0;fdraw()}}}
fdraw();
// esercizi
$("#c1").onclick=()=>{const r=[$("#e1h").value.trim()=="www.esempio.it",$("#e1p").value.trim()=="8080",$("#e1q").value.trim().replace("?","")=="lingua=it"];$("#o1").textContent=r.every(x=>x)?"Giusto!":"Suggerimento: l’host viene prima della porta; la query inizia dopo il ?."};
$("#c2").onclick=()=>{$("#o2").textContent=[...document.querySelectorAll(".e2")].every(s=>s.value==s.dataset.a)?"Giusto!":"Suggerimento: 4xx errore del client, 5xx errore del server, 2xx successo."};
$("#c3").onclick=()=>{$("#o3").textContent=[...document.querySelectorAll(".e3")].every(s=>s.value==s.dataset.a)?"Giusto!":"Suggerimento: prima si controlla la cache, poi si parte dalla radice e si scende."};
// glossario
const gd=()=>{const t=$("#gs").value.toLowerCase();$("#gl").innerHTML=G.filter(g=>(g.term+g.def).toLowerCase().includes(t)).map(g=>`<dt><b>${esc(g.term)}</b></dt><dd>${esc(g.def)}</dd>`).join("")};$("#gs").oninput=gd;gd()})();