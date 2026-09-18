/* QUAD LAB: navigation and student-verified map progress. */
(()=>{'use strict';
const KEY='quad-lab-map-completed';
const path=location.pathname;
const isMap=path.endsWith('/relation-map.html');
const isMission=path.endsWith('/master-mission.html');
const isHome=path.endsWith('/index.html')||path.endsWith('/');
const getDone=()=>{try{return localStorage.getItem(KEY)==='yes'}catch{return false}};
const setDone=value=>{try{if(value)localStorage.setItem(KEY,'yes');else localStorage.removeItem(KEY)}catch{}};
const makeLink=(text,href)=>{const a=document.createElement('a');a.href=href;a.textContent=text;a.className='primary';a.style.cssText='display:inline-block;text-decoration:none;text-align:center;padding:13px 20px;margin:12px 8px 0 0';return a};
if(isMap){
 const result=document.getElementById('result'),check=document.getElementById('check'),reveal=document.getElementById('reveal'),reset=document.getElementById('reset');
 if(result){const next=document.createElement('div');next.id='mapNextStep';next.setAttribute('aria-live','polite');next.style.cssText='margin-top:15px;padding:16px;border-radius:14px;background:#f0f9ef';result.insertAdjacentElement('afterend',next);
 const show=()=>{next.replaceChildren();const p=document.createElement('p');if(getDone()){p.textContent='🎉 관계 지도 학습을 완료했어요! 이제 10문제 최종 미션에 도전해 보세요.';next.append(p,makeLink('🏆 최종 미션으로 이동 →','master-mission.html'));}else{p.textContent='답 카드를 모두 채우고 정답 확인을 눌러 보세요. 완성 지도 보기는 복습용이며 학습 완료로 기록되지 않습니다.';next.append(p)}};
 check?.addEventListener('click',()=>{const blanks=[...document.querySelectorAll('.blank')];if(blanks.length&&blanks.every(b=>b.dataset.value===b.dataset.answer))setDone(true);show()});
 reveal?.addEventListener('click',show);
 reset?.addEventListener('click',show);
 show();}
}
if(isMission){const result=document.getElementById('result'),grade=document.getElementById('grade'),retry=document.getElementById('retry');if(result){const next=document.createElement('div');next.id='missionNextStep';result.insertAdjacentElement('afterend',next);grade?.addEventListener('click',()=>{next.replaceChildren();const p=document.createElement('p');p.textContent='수고했어요! 해설을 확인하고 복습하거나 학습 목록으로 돌아가세요.';next.append(p,makeLink('🧩 관계 지도 복습','relation-map.html'),makeLink('🏠 학습 목록으로','index.html'))});retry?.addEventListener('click',()=>next.replaceChildren())}}
if(isHome){const banner=document.querySelector('.mission-banner');if(banner&&!document.getElementById('mapProgressNote')){const p=document.createElement('p');p.id='mapProgressNote';p.style.cssText='margin:12px 0;font-weight:700';p.textContent=getDone()?'🧩 관계 지도 완료! 최종 미션에 도전해 보세요.':'🧩 6개 탐구 → 관계 지도 → 최종 미션 순서로 학습해 보세요.';banner.insertAdjacentElement('afterend',p)}}
})();