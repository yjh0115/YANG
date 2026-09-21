/* Keyboard and touch alternative for the conditions activity. */
(()=>{'use strict';
const original=renderConditions;
renderConditions=function(area){
 original(area);
 const cards=[...area.querySelectorAll('.condition')],zone=area.querySelector('#dropZone'),feedback=area.querySelector('#conditionFeedback');
 if(!cards.length||!zone||!feedback)return;
 const instruction=area.querySelector('.prompt-card > p');
 if(instruction){instruction.id='conditionInstructions';instruction.textContent='조건 카드를 끌어 놓거나 카드를 선택하고 연구 노트에 넣어 보세요. 키보드에서는 Tab으로 카드를 찾고 Enter 또는 스페이스바로 선택한 뒤 넣기 버튼을 누르세요.';}
 const note=document.createElement('p');note.id='conditionSelection';note.setAttribute('role','status');note.setAttribute('aria-live','polite');zone.before(note);
 zone.setAttribute('role','region');zone.setAttribute('aria-label','평행사변형 조건 연구 노트');
 if(instruction)zone.setAttribute('aria-describedby',instruction.id);
 const add=document.createElement('button');add.type='button';add.className='tool-btn';add.textContent='선택한 조건을 연구 노트에 넣기';add.disabled=true;add.setAttribute('aria-describedby',note.id);zone.after(add);
 feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
 let selected=null,dragged=null;
 const count=()=>cards.filter(card=>card.parentElement===zone).length;
 const complete=()=>count()===3;
 const remaining=()=>cards.filter(card=>card.parentElement!==zone);
 const nextStep=()=>area.closest('#lessonView')?.querySelector('#nextStep');
 const update=()=>{note.textContent=`올바른 조건 ${count()}/3개 분류 완료. ${complete()?'모든 올바른 조건을 찾았어요.':selected?'선택한 조건: '+selected.textContent:'카드를 선택해 주세요.'}`;};
 const clear=()=>{selected=null;cards.forEach(card=>{if(card.parentElement!==zone)card.setAttribute('aria-pressed','false');});add.disabled=true;update();};
 const choose=card=>{if(card.parentElement===zone||complete()||card.getAttribute('aria-disabled')==='true')return;selected=card;cards.forEach(item=>{if(item.parentElement!==zone)item.setAttribute('aria-pressed',String(item===card));});add.disabled=false;update();};
 cards.forEach(card=>{
  card.setAttribute('role','button');card.tabIndex=0;card.setAttribute('aria-pressed','false');card.setAttribute('aria-label',`조건 카드: ${card.textContent}`);
  if(instruction)card.setAttribute('aria-describedby',instruction.id);
  card.addEventListener('click',()=>choose(card));
  card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(card);}});
  // Override the original handler: only active cards can initiate a local drag.
  card.ondragstart=event=>{
   dragged=null;
   if(card.parentElement===zone||complete()||!event.dataTransfer){event.preventDefault();return;}
   dragged=card;
   event.dataTransfer.effectAllowed='move';
   event.dataTransfer.setData('text/plain',card.dataset.c);
  };
  card.addEventListener('dragend',()=>{dragged=null;});
 });
 const finishCard=card=>{card.draggable=false;card.tabIndex=-1;card.removeAttribute('role');card.removeAttribute('aria-pressed');card.removeAttribute('aria-label');card.removeAttribute('aria-describedby');};
 const finishActivity=()=>{if(!complete())return;remaining().forEach(card=>{card.draggable=false;card.tabIndex=-1;card.setAttribute('aria-disabled','true');card.removeAttribute('aria-pressed');});feedback.textContent+=' 올바른 조건 세 개를 모두 찾았어요. 다음 단계로 이동할 수 있어요.';};
 const classify=card=>{if(!card||card.parentElement===zone||complete())return false;const ok=card.dataset.c!=='1';feedback.textContent=ok?'맞아요. 이 조건은 평행사변형을 보장해요.':'대각선의 길이가 같은 등변사다리꼴도 있어요. 반드시 평행사변형은 아니에요.';feedback.className=ok?'feedback good':'feedback bad';if(ok){zone.append(card);finishCard(card);}clear();if(complete())finishActivity();return ok;};
 add.addEventListener('click',()=>{if(!selected)return;const card=selected;const ok=classify(card);if(complete()){nextStep()?.focus();return;}if(ok){remaining()[0]?.focus();}else{card.focus();}});
 // Never advertise this zone as a valid destination for external or finished drags.
 const validDrag=()=>dragged&&cards.includes(dragged)&&dragged.parentElement!==zone&&!complete();
 zone.ondragover=event=>{if(validDrag()){event.preventDefault();if(event.dataTransfer)event.dataTransfer.dropEffect='move';}};
 zone.ondrop=event=>{
  if(!validDrag())return;
  event.preventDefault();
  const card=dragged;
  dragged=null;
  if(event.dataTransfer?.getData('text/plain')===card.dataset.c)classify(card);
 };
 update();
};
})();