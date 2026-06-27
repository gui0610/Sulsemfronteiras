const DIAS=["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
const MESES=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const d=new Date();
const el=document.getElementById("js-date");
if(el) el.textContent=`${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

const COINS=[
  {pair:"USD-BRL", label:"Dólar"},
  {pair:"EUR-BRL", label:"Euro"},
];
let coinIdx=0;
const coinVal=document.getElementById("coin-val");
const coinChg=document.getElementById("coin-chg");
const coinLbl=document.getElementById("coin-label");
let coinData={};

async function fetchCoins(){
  try{
    const pairs=COINS.map(c=>c.pair).join(",");
    const r=await fetch(`https://economia.awesomeapi.com.br/json/last/${pairs}`);
    const j=await r.json();L
    coinData={};
    for(const k in j){
      const key=k.slice(0,3)+"-"+k.slice(3);
      coinData[key]=j[k];
    }
    showCoin();
  }catch(e){
    if(coinVal) coinVal.textContent="—";
  }
}

function showCoin(){
  if(!coinVal||!coinLbl||!coinChg) return;
  const c=COINS[coinIdx];
  const data=coinData[c.pair];
  if(!data) return;
  const val=parseFloat(data.bid).toFixed(2).replace(".",",");
  const pct=parseFloat(data.pctChange);
  coinLbl.textContent=c.label+":";
  coinVal.textContent="R$ "+val;
  coinChg.textContent=(pct>=0?"▲":"▼")+Math.abs(pct).toFixed(2)+"%";
  coinChg.className="coin-chg "+(pct>=0?"up":"dn");
}

function rotateCoin(){
  if(Object.keys(coinData).length===0) return;
  coinIdx=(coinIdx+1)%COINS.length;
  if(coinVal){
    coinVal.style.opacity="0";
    setTimeout(()=>{showCoin();coinVal.style.opacity="1";},200);
  }
}

fetchCoins();
setInterval(rotateCoin,5000);
(async()=>{
  const cidades=[
    {nome:"Porto Alegre",lat:-30.0346,lon:-51.2177},
    {nome:"Florianópolis",lat:-27.5954,lon:-48.5480},
    {nome:"Curitiba",lat:-25.4290,lon:-49.2671},
  ];
  const wx=document.getElementById("js-wx");
  if(!wx) return;
  wx.innerHTML="";
  try{
    const res=await Promise.all(cidades.map(c=>
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m&timezone=America%2FSao_Paulo`).then(r=>r.json())
    ));
    res.forEach((r,i)=>{
      const div=document.createElement("div");
      div.className="wx-city";
      div.innerHTML=`${cidades[i].nome}: <em>${Math.round(r.current.temperature_2m)}°C</em>`;
      wx.appendChild(div);
    });
  }catch(e){wx.innerHTML="<span style='color:var(--text3);font-size:11px'>—</span>";}
})();

const veil=document.getElementById("search-veil");
const btnS=document.getElementById("btn-search");
if(btnS) btnS.onclick=()=>{veil.classList.add("on");document.getElementById("search-in").focus()};
if(veil){
  veil.onclick=e=>{if(e.target===veil)veil.classList.remove("on")};
  document.addEventListener("keydown",e=>{if(e.key==="Escape")veil.classList.remove("on")});
}

const mv=document.getElementById("modal-veil");
const btnL=document.getElementById("btn-login");
if(btnL) btnL.onclick=()=>mv.classList.add("on");
const mx=document.getElementById("modal-x");
if(mx) mx.onclick=()=>mv.classList.remove("on");
if(mv) mv.onclick=e=>{if(e.target===mv)mv.classList.remove("on")};
document.querySelectorAll(".m-tab").forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll(".m-tab").forEach(x=>x.classList.remove("on"));
    t.classList.add("on");
    document.getElementById("pane-login").style.display=t.dataset.t==="login"?"":"none";
    document.getElementById("pane-reg").style.display=t.dataset.t==="reg"?"":"none";
  };
});