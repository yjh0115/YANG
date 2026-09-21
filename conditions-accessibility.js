/* Keyboard and touch alternative for the conditions activity. */
(()=>{'use strict';
const original=renderConditions;
renderConditions=function(area){
 original(area);
 const cards=[...area.querySelectorAll('.condition')],zone=area.querySelector('#dropZone'),feedback=area.querySelector('#conditionFeedback');
 if(!cards.length||!zone||!feedback)return;
 const instruction=area.querySelector('.prompt-card > p');
 if(instruction)instruction.textContent='조건 카드를 끌어 놓거나 카드를 선택하고 연구 노트에 넣어 보세요. 키보드에서는 Tab과 Enter를 사용하세요.';
 const note=document.createElement('p');note.id='conditionSelection';note.setAttribute('role','status');note.setAttribute('aria-live','polite');zone.before(note);
 const add=document.createElement('button');add.type='button';add.className='tool-btn';add.textContent='선택한 조건을 연구 노트에 넣기';add.disabled=true;zone.after(add);
 feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
 let selected=null;
 const remaining=()=>cards.filter(card=>card.parentElement!==zone);
 const complete=()=>cards.filter(card=>card.parentElement===zone).length===3;
 const nextStep=()=>area.closest('#lessonView')?.querySelector('#nextStep');
 const update=()=>{const count=cards.filter(card=>card.parentElement===zone).length;note.textContent=`올바른 조건 ${count}/3개 분류 완료. ${count===3?'모든 올바른 조건을 찾았어요.':selected?'선택한 조건: '+selected.textContent:'카드를 선택해 주세요.'}`;};
 const clear=()=>{selected=null;cards.forEach(card=>{card.setAttribute('aria-pressed','false');card.style.outline='';});add.disabled=true;update();};
 const choose=card=>{if(card.parentElement===zone||complete())return;selected=card;cards.forEach(item=>{const active=item===card;item.setAttribute('aria-pressed',String(active));item.style.outline=active?'3px solid #7652ca':'';});add.disabled=false;update();};
 cards.forEach(card=>{card.setAttribute('role','button');card.tabIndex=0;card.setAttribute('aria-pressed','false');card.setAttribute('aria-label',`조건 카드: ${card.textContent}`);card.addEventListener('click',()=>choose(card));card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(card);}});});
 const finishCard=card=>{card.tabIndex=-1;card.setAttribute('role','listitem');card.removeAttribute('aria-pressed');};
 const focusNext=()=>{const next=complete()?nextStep():(remaining().find(item=>item.dataset.c!=='1')||remaining()[0]);if(next)next.focus();};
 add.addEventListener('click',()=>{if(!selected)return;const card=selected,ok=card.dataset.c!=='1';feedback.textContent=ok?'맞아요. 이 조건은 평행사변형을 보장해요.':'대각선의 길이가 같은 등변사다리꼴도 있어요. 반드시 평행사변형은 아니에요.';feedback.className=ok?'feedback good':'feedback bad';if(ok){zone.append(card);finishCard(card);}clear();if(complete()){remaining().forEach(card=>{card.tabIndex=-1;card.setAttribute('aria-disabled','true');});}focusNext();});
 zone.addEventListener('drop',()=>{cards.filter(card=>card.parentElement===zone).forEach(finishCard);clear();if(complete()){remaining().forEach(card=>{card.tabIndex=-1;card.setAttribute('aria-disabled','true');});nextStep()?.focus();}});
 update();
};
})();