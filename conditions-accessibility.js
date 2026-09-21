/* Accessible alternative to drag-and-drop in the conditions exploration. */
(()=>{'use strict';
const original=renderConditions;
renderConditions=function(area){
 original(area);
 const cards=[...area.querySelectorAll('.condition')],zone=area.querySelector('#dropZone'),feedback=area.querySelector('#conditionFeedback');
 if(!cards.length||!zone||!feedback)return;
 const instruction=area.querySelector('.prompt-card > p');
 if(instruction)instruction.textContent='조건 카드를 끌어 놓거나, 카드를 선택한 뒤 연구 노트에 넣어 보세요. 키보드에서는 Tab과 Enter를 사용하세요.';
 const note=document.createElement('p');note.textContent='카드를 선택하고 아래 연구 노트에 넣기 버튼을 누르세요.';note.id='conditionSelection';note.setAttribute('role','status');note.setAttribute('aria-live','polite');zone.insertAdjacentElement('beforebegin',note);
 const add=document.createElement('button');add.type='button';add.className='tool-btn';add.textContent='선택한 조건을 연구 노트에 넣기';add.disabled=true;zone.insertAdjacentElement('afterend',add);
 feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
 let selected=null;
 const clear=()=>{selected=null;cards.forEach(card=>{card.setAttribute('aria-pressed','false');card.style.outline=''});add.disabled=true;note.textContent='카드를 선택하고 아래 연구 노트에 넣기 버튼을 누르세요.'};
 const choose=card=>{selected=card;cards.forEach(item=>{const active=item===card;item.setAttribute('aria-pressed',String(active));item.style.outline=active?'3px solid #7652ca':''});add.disabled=false;note.textContent=`선택한 조건: ${card.textContent}. 연구 노트에 넣기 버튼을 누르세요.`};
 cards.forEach(card=>{card.setAttribute('role','button');card.setAttribute('tabindex','0');card.setAttribute('aria-pressed','false');card.setAttribute('aria-label',`조건 카드: ${card.textContent}`);card.addEventListener('click',()=>choose(card));card.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(card)}})});
 const classify=card=>{if(!card)return;const ok=card.dataset.c!=='1';feedback.textContent=ok?'맞아요. 이 조건은 평행사변형을 보장해요.':'두 대각선의 길이가 같은 등변사다리꼴도 있어요. 반드시 평행사변형은 아니에요.';feedback.className=ok?'feedback good':'feedback bad';if(ok)zone.append(card);clear()};
 add.addEventListener('click',()=>classify(selected));
 // The original drop handler still performs the classification; reset selection after dropping.
 zone.addEventListener('drop',()=>{clear()});
 };
})();