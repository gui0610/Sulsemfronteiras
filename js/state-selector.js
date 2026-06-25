/* state-selector.js — pill deslizante para Política e Cultura */
const sel=document.getElementById("state-selector");
const pill=document.getElementById("state-pill");
const btns=sel?sel.querySelectorAll(".state-btn"):[];
const nc=document.getElementById("news-content");
const panes=nc?nc.querySelectorAll("[data-pane]"):[];

function movePill(btn){
  const sr=sel.getBoundingClientRect(),br=btn.getBoundingClientRect();
  pill.style.width=br.width+"px";
  pill.style.transform=`translateX(${br.left-sr.left-6}px)`;
}
window.addEventListener("load",()=>{
  const a=sel?sel.querySelector(".state-btn.active"):null;
  if(a) movePill(a);
});
window.addEventListener("resize",()=>{
  const a=sel?sel.querySelector(".state-btn.active"):null;
  if(a) movePill(a);
},{passive:true});
btns.forEach(btn=>{
  btn.onclick=()=>{
    nc.classList.add("fading");
    setTimeout(()=>{
      panes.forEach(p=>{p.style.display=p.dataset.pane===btn.dataset.state?"":"none"});
      nc.classList.remove("fading");
    },240);
    btns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    movePill(btn);
  };
});