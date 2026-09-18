/* QUAD LAB learning journey: map completion and final mission navigation. */
(()=>{'use strict';
const KEY='quad-lab-map-completed';
const isMap=location.pathname.endsWith('/relation-map.html');
const isMission=location.pathname.endsWith('/master-mission.html');
const isHome=!isMap&&!isMission;
const makeLink=(text,href)=>{const a=document.createElement('a');a.href=href;a.textContent=text;a.className='primary';a.style.cssText='display:inline-block;text-decoration:none;text-align:center;padding:13px 20px;margin:12px 8px 0 0';return a};
if(isMap){
 const result=document.getElementById('result');const check=document.getElementById('check');const reveal=document.getElementById('reveal');const reset=document.getElementById('reset');
 const next=document.createElement('div');next.id='mapNextStep';next.setAttribute('aria-live','polite');next.style.cssText='margin-top:15px;padding:16px;border-radius:14px;background:#f0f9ef';
 result?.insertAdjacentElement('afterend',next);
 const update=()=>{const blanks=[...document.querySelectorAll('.blank')];const allCorrect=blanks.length>0&&blanks.every(b=>b.dataset.value===b.dataset.answer);next.replaceChildren();if(allCorrect){localStorage.setItem(KEY,'yes');const p=document.createElement('p');p.textContent='🎉 관계 지도를 완성했어요! 이제 10문제 최종 미션에 도전해 보세요.';next.append(p,makeLink('🏆 최종 미션으로 이동 →','master-mission.html'));}else{const p=document.createElement('p');p.textContent='관계 지도의 빈칸을 완성하고 정답 확인을 누르면 최종 미션으로 이어집니다.';next.append(p);}};
 check?.addEventListener('click',update);reveal?.addEventListener('click',update);reset?.addEventListener('click',()=>{localStorage.removeItem(KEY);update()});update();
}
if(isMission){const result=document.getElementById('result');const grade=document.getElementById('grade');const retry=document.getElementById('retry');const next=document.createElement('div');next.id='missionNextStep';result?.insertAdjacentElement('afterend',next);grade?.addEventListener('click',()=>{next.replaceChildren();const p=document.createElement('p');p.textContent='수고했어요! 해설을 확인한 뒤 관계 지도를 복습하거나 학습 목록으로 돌아갈 수 있어요.';next.append(p,makeLink('🧩 관계 지도 복습','relation-map.html'),makeLink('🏠 학습 목록으로','index.html'));});retry?.addEventListener('click',()=>next.replaceChildren());}
if(isHome){const banner=document.querySelector('.mission-banner');if(banner){const p=document.createElement('p');p.id='mapProgressNote';p.style.cssText='margin:12px 0;font-weight:700';p.textContent=localStorage.getItem(KEY)==='yes'?'🧩 관계 지도 완성! 최종 미션에 도전해 보세요.':'🧩 6개 탐구를 마친 뒤 관계 지도를 완성하고 최종 미션에 도전해 보세요.';banner.insertAdjacentElement('afterend',p);}}
})();