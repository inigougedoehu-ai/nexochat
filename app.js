const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const input=q('#input'),send=q('#send'),conversation=q('#conversation'),typing=q('#typing'),toast=q('#toast'),sidebar=q('#sidebar'),backdrop=q('#backdrop');
const time=()=>new Intl.DateTimeFormat('es-ES',{hour:'2-digit',minute:'2-digit'}).format(new Date());
function showToast(t='Demostración visual: acción todavía no conectada'){toast.querySelector('span').textContent=t;toast.classList.add('show');clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.classList.remove('show'),2200)}
function resize(){input.style.height='auto';input.style.height=Math.min(input.scrollHeight,140)+'px'}
function userMessage(text){const row=document.createElement('div');row.className='msg user';row.innerHTML=`<div><div class="meta right">Tú <span>${time()}</span></div><div class="bubble user-bubble"><p></p></div><div class="read">✓✓</div></div>`;row.querySelector('p').textContent=text;typing.before(row)}
function reply(){const replies=['He recibido tu mensaje. Esta maqueta todavía no ejecuta acciones reales.','Perfecto. Cuando conectemos el backend, Nexo podrá consultar tus módulos y actuar.','Entendido. En la versión final te pediría confirmación antes de cualquier acción sensible.','Anotado. Esta respuesta podría convertirse después en una tarjeta, formulario o aviso.'];typing.classList.remove('hidden');conversation.scrollTop=conversation.scrollHeight;setTimeout(()=>{typing.classList.add('hidden');const row=document.createElement('div');row.className='msg assistant';row.innerHTML=`<div class="avatar-mini">✦</div><div><div class="meta">Nexo <span>${time()}</span></div><div class="bubble"><p>${replies[Math.floor(Math.random()*replies.length)]}</p></div></div>`;typing.before(row);conversation.scrollTop=conversation.scrollHeight},850)}
function submit(){const text=input.value.trim();if(!text)return;userMessage(text);input.value='';resize();conversation.scrollTop=conversation.scrollHeight;reply()}
input.addEventListener('input',resize);input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit()}});send.addEventListener('click',submit);
qa('.chips button').forEach(b=>b.onclick=()=>{input.value=b.dataset.text;resize();input.focus()});
qa('.buttons button,.new-chat,.recent,.context button').forEach(b=>b.onclick=()=>showToast());
qa('.nav').forEach(n=>n.onclick=()=>{qa('.nav').forEach(x=>x.classList.remove('active'));n.classList.add('active');q('#chatTitle').innerHTML=`${n.dataset.chat} <span>✓</span>`;q('#chatIcon').textContent=n.dataset.icon;q('#chatSub').textContent=n.dataset.sub;closeMenu();showToast('Has abierto '+n.dataset.chat)});
q('#themeBtn').onclick=()=>{document.body.classList.toggle('light');localStorage.setItem('nexo-theme',document.body.classList.contains('light')?'light':'dark')};if(localStorage.getItem('nexo-theme')==='light')document.body.classList.add('light');
function openMenu(){sidebar.classList.add('open');backdrop.classList.add('show')}function closeMenu(){sidebar.classList.remove('open');backdrop.classList.remove('show')}q('#openMenu').onclick=openMenu;q('#closeMenu').onclick=closeMenu;backdrop.onclick=closeMenu;q('#brandBtn').onclick=()=>qa('.nav')[0].click();window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu()});resize();

// Solicita orientación vertical cuando el navegador lo permite (especialmente como PWA instalada).
async function lockPortrait(){
  try{
    if(screen.orientation?.lock && (window.matchMedia('(display-mode: standalone)').matches || document.fullscreenElement)){
      await screen.orientation.lock('portrait');
    }
  }catch(_){/* Safari puede ignorarlo; el CSS mantiene el formato. */}
}
window.addEventListener('load',lockPortrait);
window.addEventListener('orientationchange',()=>setTimeout(lockPortrait,200));
