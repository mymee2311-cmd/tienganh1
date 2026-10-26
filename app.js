(()=>{'use strict';
const $=id=>document.getElementById(id), bank=Array.isArray(window.QUESTION_BANK)?window.QUESTION_BANK:[];
let count=10,session=[],index=0,startTime=0,wrongIds=[];
const shuffle=a=>{const c=[...a];for(let i=c.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[c[i],c[j]]=[c[j],c[i]]}return c};
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function stage(s){for(const n of ['setup','exam','results'])$(n).classList.toggle('hide',n!==s);window.scrollTo({top:0,behavior:'smooth'})}
function create(ids){const pool=ids?bank.filter(q=>ids.includes(q.id)):bank;session=shuffle(pool).slice(0,ids?pool.length:count).map(q=>({q,order:shuffle([0,1,2,3]),chosen:null}));index=0;startTime=Date.now();stage('exam');render()}
function render(){const item=session[index];if(!item)return;const {q,order,chosen}=item;
$('position').textContent=`Câu ${index+1} / ${session.length}`;
$('completed').textContent=`Đã chọn ${session.filter(x=>x.chosen!==null).length} / ${session.length}`;
$('progressFill').style.width=(100*(index+1)/session.length)+'%';
$('clock').textContent='';$('sourceNo').textContent=`Mã ${escape(q.id)} · Nhóm gốc ${q.originalGroup}`;
$('prompt').textContent=q.q;
$('choices').innerHTML='';const answerKnown=$('instant').checked&&chosen!==null;
order.forEach((orig,pos)=>{const b=document.createElement('button');b.className='option';if(chosen===orig)b.classList.add('chosen');if(answerKnown){if(orig===q.correct)b.classList.add('correct');else if(chosen===orig)b.classList.add('wrong')}b.disabled=answerKnown;b.innerHTML=`<span class="letter">${'ABCD'[pos]}</span><span>${escape(q.options[orig])}</span>`;b.onclick=()=>{item.chosen=orig;render()};$('choices').append(b)});
$('feedback').classList.toggle('hide',!answerKnown);
if(answerKnown){let correctPos=order.indexOf(q.correct);$('feedback').innerHTML=`<b>${chosen===q.correct?'✓ Chính xác':'✗ Chưa chính xác'} · Đáp án: ${'ABCD'[correctPos]} — ${escape(q.options[q.correct])}</b><div>${escape(q.explain||'')}</div>${q.note?`<div><b>Lưu ý:</b> ${escape(q.note)}</div>`:''}`}
$('prev').disabled=index===0;$('next').textContent=index===session.length-1?'Xem kết quả →':'Câu tiếp →';}
function finish(){const answered=session.filter(x=>x.chosen!==null).length;if(answered<session.length&&!confirm(`Bạn còn ${session.length-answered} câu chưa chọn. Vẫn nộp bài?`))return;
const good=session.filter(x=>x.chosen===x.q.correct).length;wrongIds=session.filter(x=>x.chosen!==x.q.correct).map(x=>x.q.id);
$('score').textContent=`${good} / ${session.length}`;$('resultText').textContent=`Đúng ${Math.round(good/session.length*100)}% · Đã trả lời ${answered} câu · Sai hoặc bỏ trống ${session.length-good} câu.`;
$('review').innerHTML=session.map((x,i)=>{let ok=x.chosen===x.q.correct;let picked=x.chosen===null?'Chưa trả lời':x.q.options[x.chosen];return `<div class="reviewitem"><small>Câu ${i+1} · ${escape(x.q.id)}</small><b>${escape(x.q.q)}</b><div class="${ok?'good':'bad'}">${ok?'✓ Đúng':'✗ Sai'} · Bạn chọn: ${escape(picked)}</div><div>Đáp án: <b style="display:inline">${escape(x.q.options[x.q.correct])}</b></div><small>${escape(x.q.explain)}</small></div>`}).join('');
$('retryWrong').disabled=wrongIds.length===0;stage('results')}
for(const b of document.querySelectorAll('#sizes button'))b.onclick=()=>{for(const x of document.querySelectorAll('#sizes button'))x.classList.remove('active');b.classList.add('active');count=Number(b.dataset.count)};
$('bankCount').textContent=`${bank.length} câu trong ngân hàng`;
$('start').onclick=()=>create();$('next').onclick=()=>index===session.length-1?finish():(index++,render());$('prev').onclick=()=>{if(index>0){index--;render()}};$('submit').onclick=finish;$('quit').onclick=()=>{if(confirm('Thoát bài đang làm?'))stage('setup')};$('retry').onclick=()=>create();$('retryWrong').onclick=()=>create(wrongIds);$('home').onclick=()=>stage('setup');
})();
