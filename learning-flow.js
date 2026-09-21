/* QUAD LAB: consistent navigation and student-verified map progress. */
(()=>{'use strict';
const KEY='quad-lab-map-completed';
const path=location.pathname;
const isMap=path.endsWith('/relation-map.html');
const isMission=path.endsWith('/master-mission.html');
const isHome=path.endsWith('/index.html')||path.endsWith('/');
const getDone=()=>{try{return localStorage.getItem(KEY)==='yes'}catch{return false}};
const setDone=()=>{try{localStorage.setItem(KEY,'yes')}catch{}};
const makeLink=(text,href)=>{const a=document.createElement('a');a.href=href;a.textContent=text;a.className='primary';a.style.cssText='display:inline-block;text-decoration:none;text-align:center;padding:13px 20px;margin:12px 8px 0 0';return a};
if(isMap){
 const result=document.getElementById('result'),check=document.getElementById('check'),reveal=document.getElementById('reveal'),reset=document.getElementById('reset');
 if(result&&!document.getElementById('mapNextStep')){const next=document.createElement('div');next.id='mapNextStep';next.setAttribute('aria-live','polite');next.style.cssText='margin-top:15px;padding:16px;border-radius:14px;background:#f0f9ef';result.insertAdjacentElement('afterend',next);
 let revealed=false;
 const show=()=>{next.replaceChildren();const p=document.createElement('p');if(getDone()){p.textContent='🎉 관계 지도 학습을 완료했어요! 이제 10문제 최종 미션에 도전해 보세요.';next.append(p,makeLink('🏆 최종 미션으로 이동 →','master-mission.html'));}else{p.textContent=revealed?'완성 지도를 확인했어요. 직접 풀어 완료하려면 다시 도전을 누른 뒤 답을 채우고 정답 확인을 눌러 주세요.':'답 카드를 모두 채우고 정답 확인을 눌러 보세요. 완성 지도 보기는 복습용이며 학습 완료로 기록되지 않습니다.';next.append(p)}};
 check?.addEventListener('click',()=>{const blanks=[...document.querySelectorAll('.blank')];if(revealed){result.textContent='📚 완성 지도 보기는 복습용이에요. 학습 완료를 기록하려면 다시 도전한 뒤 직접 답을 채워 주세요.';}else if(blanks.length&&blanks.every(b=>b.dataset.value===b.dataset.answer)){setDone();}show()});
 reveal?.addEventListener('click',()=>{revealed=true;show()});
 reset?.addEventListener('click',()=>{revealed=false;show()});
 show();}
}
if(isMission){
 const result=document.getElementById('result'),grade=document.getElementById('grade'),retry=document.getElementById('retry'),form=document.getElementById('mission');
 if(result&&form&&!document.getElementById('missionNextStep')){
  const next=document.createElement('div');next.id='missionNextStep';next.setAttribute('aria-live','polite');result.insertAdjacentElement('afterend',next);
  // Do not reveal answers or calculate a score while any question is unanswered.
  grade?.addEventListener('click',event=>{const questions=[...form.querySelectorAll('.question')];const unanswered=questions.filter(q=>!q.querySelector('input[type="radio"]:checked'));if(!unanswered.length)return;event.preventDefault();event.stopImmediatePropagation();next.replaceChildren();const p=document.createElement('p');p.textContent=`아직 ${unanswered.length}문제를 풀지 않았어요. 모든 문제의 답을 선택한 뒤 채점해 주세요.`;next.append(p);unanswered[0].querySelector('input[type="radio"]')?.focus();},true);
  result.tabIndex=-1;
  grade?.addEventListener('click',()=>{next.replaceChildren();const p=document.createElement('p');p.textContent='수고했어요! 해설을 확인하고 복습하거나 학습 목록으로 돌아가세요.';next.append(p,makeLink('🧩 관계 지도 복습','relation-map.html'),makeLink('🏠 학습 목록으로','index.html'));result.focus({preventScroll:true})});
  retry?.addEventListener('click',()=>next.replaceChildren());
  form.addEventListener('change',()=>{if(result.hidden)return;result.hidden=true;result.textContent='';form.querySelectorAll('.question').forEach(q=>{q.classList.remove('checked','correct','wrong');q.querySelector('.status').textContent=''});next.replaceChildren();const notice=document.createElement('p');notice.textContent='답을 변경했어요. 현재 답안으로 다시 채점해 주세요.';next.append(notice)});
 }
}
if(isHome){
 const navMap=document.getElementById('navMap');if(navMap)navMap.onclick=()=>{location.href='relation-map.html'};
 const navMission=document.getElementById('navMission');if(navMission)navMission.onclick=()=>{location.href='master-mission.html'};
 const bannerButton=document.getElementById('missionBannerBtn');if(bannerButton){bannerButton.disabled=false;bannerButton.textContent='10문제 최종 미션 도전 →';bannerButton.onclick=()=>{location.href='master-mission.html'}};
 const banner=document.querySelector('.mission-banner');if(banner){const description=banner.querySelector('p');if(description)description.textContent='6개 탐구와 관계 지도를 마친 뒤 도전해 보세요. 복습을 위해 미션을 먼저 열 수도 있어요.';let note=document.getElementById('mapProgressNote');if(!note){note=document.createElement('p');note.id='mapProgressNote';note.style.cssText='margin:12px 0;font-weight:700';banner.insertAdjacentElement('afterend',note)}note.textContent=getDone()?'🧩 관계 지도 완료! 최종 미션에 도전해 보세요.':'🧩 추천 학습 순서: 6개 탐구 → 관계 지도 → 최종 미션';}
}
})();