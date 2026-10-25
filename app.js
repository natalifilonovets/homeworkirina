const data=[
  [
    "She packed her clothes in a large travel ___.",
    "trunk",
    "pattern",
    "Дорожня скриня",
    "Trunk — чемодан, скриня: велика міцна скриня для перевезення речей. Pattern — візерунок.",
    "чемодан, скриня"
  ],
  [
    "The suitcase was too ___ to fit in the small locker.",
    "bulky",
    "affluent",
    "Великий багаж",
    "Bulky — громіздкий: великий і незручний для перенесення або зберігання. Affluent — багатий, заможний.",
    "громіздкий"
  ],
  [
    "Several brands sell similar bags, so they are ___.",
    "competitors",
    "belongings",
    "Конкуренція брендів",
    "Competitors — конкуренти: люди або компанії, що змагаються між собою. Belongings — особисті речі.",
    "конкуренти"
  ],
  [
    "The scarf has a colourful floral ___.",
    "pattern",
    "trunk",
    "Квітковий візерунок",
    "Pattern — візерунок, наприклад квіти або геометричні фігури на тканині. Trunk — чемодан, скриня.",
    "візерунок"
  ],
  [
    "Please keep your personal ___ with you at all times.",
    "belongings",
    "competitors",
    "Особисті речі",
    "Belongings — речі, приналежності, що належать людині. Personal belongings — особисті речі. Competitors — конкуренти.",
    "речі, приналежності"
  ],
  [
    "The handmade leather bag shows excellent ___.",
    "craftsmanship",
    "tribute",
    "Ручна робота",
    "Craftsmanship — майстерність, якість виконання роботи. Правильне написання — craftsmanship. Tribute — данина, належне.",
    "майстерність"
  ],
  [
    "The luxury boutique attracts ___ customers who can afford its high prices.",
    "affluent",
    "bulky",
    "Покупці розкішних товарів",
    "Affluent — багатий, заможний. Affluent customers — заможні покупці. Bulky — громіздкий.",
    "багатий, заможний"
  ],
  [
    "The exhibition pays ___ to the designer and her lasting influence.",
    "tribute",
    "pattern",
    "Вшанування дизайнерки",
    "Tribute — данина, належне. Pay tribute to — віддати належне, вшанувати когось. Pattern — візерунок.",
    "данина, належне"
  ],
  [
    "The logo is instantly ___: people know the brand as soon as they see it.",
    "recognisable",
    "affluent",
    "Знайомий логотип",
    "Recognisable — впізнаваний: такий, який легко впізнати. Instantly recognisable — миттєво впізнаваний. Affluent — заможний.",
    "впізнаваний"
  ],
  [
    "The bag has a ___ triangular shape that sets it apart from ordinary designs.",
    "distinctive",
    "bulky",
    "Особлива форма",
    "Distinctive — відмінний, характерний: має особливу рису, яка вирізняє його серед інших. Bulky — громіздкий.",
    "відмінний, характерний"
  ]
];
let order=data.map((_,i)=>i),pos=0,answers={},layout={};
const card=document.querySelector('#card');
function options(i){return layout[i]??(layout[i]=Math.random()<.5?[0,1]:[1,0])}
function render(){
if(pos>=order.length){results();return}
const i=order[pos],q=data[i],a=answers[i],done=a!==undefined;
card.innerHTML=`<div class="topline"><span>${pos+1} / ${order.length}</span><div class="progress" role="progressbar" aria-label="Прогрес" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${pos}"><i style="width:${pos/order.length*100}%"></i></div></div><p class="sentence" lang="en">${q[0].replace('___',`<span class="blank">${done?q[1]:'&nbsp;…&nbsp;'}</span>`)}</p><div class="options">${options(i).map((v,n)=>`<button class="option ${done?(v===0?'correct':a===v?'wrong':''):''}" data-choice="${v}" ${done?'disabled':''} aria-label="Варіант ${n+1}: ${q[v+1]}">${q[v+1]}${done&&v===0?' ✓':''}${done&&a===v&&v!==0?' ×':''}</button>`).join('')}</div>${done?`<div class="feedback"><strong>${a===0?'Правильно':'Правильна відповідь: '+q[1]}</strong>${q[4]}</div>`:''}<div class="actions"><button class="textbtn" id="back" ${pos===0?'disabled':''} aria-label="Попереднє запитання">← Назад</button>${done?`<button class="primary" id="next">${pos===order.length-1?'Результат':'Далі'} →</button>`:''}</div>`;
document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{answers[i]=+b.dataset.choice;render()});
if(done)document.querySelector('#next').onclick=()=>{pos++;render()};
document.querySelector('#back').onclick=()=>{if(pos>0){pos--;render()}}
}
function results(){
const wrong=order.filter(i=>answers[i]!==0),score=order.length-wrong.length;
card.innerHTML=`<div class="result"><h2>Результат</h2><div class="score">${score}<span> / ${order.length}</span></div><div class="actions">${wrong.length?'<button class="primary" id="retry">Повторити помилки</button>':''}<button class="textbtn" id="restart">Спочатку ↻</button></div>${wrong.map(i=>`<div class="review"><b>${data[i][1]}</b><p lang="en">${data[i][0].replace('___',data[i][1])}</p>${data[i][4]}</div>`).join('')}</div>`;
document.querySelector('#restart').onclick=()=>{order=data.map((_,i)=>i);answers={};layout={};pos=0;render()};
if(wrong.length)document.querySelector('#retry').onclick=()=>{order=wrong;answers={};layout={};pos=0;render()}
}
document.addEventListener('keydown',e=>{if(!['1','2'].includes(e.key)||e.repeat)return;const b=document.querySelectorAll('[data-choice]')[+e.key-1];if(b&&!b.disabled)b.click()});
render();
