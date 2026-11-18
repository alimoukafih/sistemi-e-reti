(()=>{const T=["Client Hello: il browser propone come cifrare.","Server Hello e certificato: il server dimostra chi è.","Scambio delle chiavi: nasce una chiave segreta condivisa.","Canale protetto: i dati viaggiano cifrati e con controllo di integrità."];
$("#tls").innerHTML=T.map(t=>`<li class="done">${t}</li>`).join("");
const send=s=>{const p=$("#pw").value;$("#int").textContent=s?"x9#Kq2…(contenuto illeggibile)":"POST /login\npassword="+p;$("#srv").textContent="POST /login\npassword="+p;};
$("#h3").onclick=()=>send(false);$("#s3").onclick=()=>send(true)})();