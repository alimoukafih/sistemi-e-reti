const mb=document.getElementById("mb"),nv=document.getElementById("nav");
mb&&mb.addEventListener("click",()=>{const o=nv.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
window.$=s=>document.querySelector(s);window.esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));