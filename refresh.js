/* Progressive enhancements for QUAD LAB. Original geometry logic remains in app.js. */
(()=>{
'use strict';
const tips=[
 ['꼭짓점을 움직인 뒤 마주 보는 변과 각을 비교해 보세요.','서로 마주 보는 두 변과 두 각은 어떤 관계인가요?','대각선의 교점 O가 각 대각선의 중점인지 확인하세요.','어떤 성질이 항상 성립하는지 근거를 찾아보세요.','하나의 성질만으로 결론을 내릴 수 있는지 살펴보세요.','발견한 세 가지 성질을 친구에게 설명해 보세요.'],
 ['조건 카드를 살펴보고 평행사변형이 되는 조건을 분류하세요.','충분한 조건과 부족한 조건을 비교해 보세요.','대각선이 서로를 이등분하는 조건도 기억하세요.','주어진 조건만으로 반드시 성립하는지 판단하세요.','조건의 일부만 성립하는 반례를 생각해 보세요.','각 조건이 왜 충분한지 설명해 보세요.'],
 ['꼭짓점을 움직여 가로와 세로를 바꾸고 대각선을 비교하세요.','두 대각선의 길이가 어떻게 변하는지 관찰하세요.','직사각형은 평행사변형의 성질도 모두 가져요.','대각선의 길이와 교점의 성질을 구별하세요.','직사각형이 정사각형이 되려면 무엇이 더 필요할까요?','직사각형의 성질을 말로 정리해 보세요.'],
 ['마름모를 움직이며 네 변과 대각선을 살펴보세요.','두 대각선이 이루는 각을 관찰하세요.','마름모는 네 변의 길이가 같고 대각선이 수직이에요.','대각선이 수직인 이유를 떠올려 보세요.','마름모가 정사각형이 되는 추가 조건을 찾아보세요.','마름모와 직사각형을 비교해 보세요.'],
 ['변과 대각선을 관찰하며 두 종류의 성질을 함께 찾아보세요.','직사각형과 마름모의 공통점을 생각해 보세요.','정사각형은 직사각형이면서 마름모예요.','길이가 같은 대각선과 수직인 대각선을 구별하세요.','두 성질이 동시에 성립하는 이유를 설명해 보세요.','정사각형이 포함되는 도형을 모두 말해 보세요.'],
 ['관계도에서 도형 이름을 클릭하고 연결 관계를 살펴보세요.','어떤 조건을 더하면 다음 도형이 되는지 비교하세요.','정사각형은 직사각형과 마름모의 성질을 모두 가져요.','포함 관계의 방향을 확인하세요.','변·각·대각선 조건을 함께 연결해 보세요.','사각형 관계를 처음부터 끝까지 설명해 보세요.']
];
const setText=(el,value)=>{if(el&&el.textContent!==value)el.textContent=value};
function link(id,label,href){let el=document.getElementById(id);if(el)return el;el=document.createElement('a');el.id=id;el.href=href;el.className='primary';el.textContent=label;el.style.cssText='display:inline-block;text-decoration:none;text-align:center;margin:10px 0;padding:13px 20px';return el}
function enhanceHome(){const banner=document.querySelector('.mission-banner');if(!banner)return;const map=link('relationshipMapLink','🧩 사각형 관계 지도 완성하기 →','relation-map.html');if(!map.isConnected)banner.insertAdjacentElement('afterend',map);const mission=link('masterMissionLink','🏆 사각형 마스터 최종 미션 →','master-mission.html');if(!mission.isConnected)map.insertAdjacentElement('afterend',mission);
 const button=document.getElementById('missionBannerBtn');if(button){button.disabled=false;setText(button,'10문제 최종 미션 도전 →');button.onclick=()=>{location.href='master-mission.html'}};
 const navMap=document.getElementById('navMap');if(navMap)navMap.onclick=()=>{location.href='relation-map.html'};
 const navMission=document.getElementById('navMission');if(navMission)navMission.onclick=()=>{location.href='master-mission.html'};
 const description=banner.querySelector('p');setText(description,'6개 탐구와 관계 지도를 마친 뒤 도전해 보세요. 복습을 위해 미션을 먼저 열 수도 있어요.');
}
function enhanceLessonSix(idx,step){if(idx!==5){document.querySelector('#lessonSixMapLink')?.remove();return}const area=document.querySelector('#interactiveArea');if(!area)return;const walker=document.createTreeWalker(area,NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode())){if(node.parentElement?.closest('script,style'))continue;const revised=node.textContent.replaceAll('다음 명제 중 옳지 않은 것은?','다음 설명 중 옳지 않은 것은?').replaceAll('노드를 클릭','사각형 이름을 클릭');if(revised!==node.textContent)node.textContent=revised}if(step===5){const map=link('lessonSixMapLink','🧩 다음 단계: 관계 지도 완성하기 →','relation-map.html');if(!map.isConnected)area.append(map)}else document.querySelector('#lessonSixMapLink')?.remove()}
function update(){enhanceHome();const title=document.querySelector('#lessonTitle')?.textContent||'';const idx=['평행사변형의 성질','평행사변형이 되는 조건','직사각형','마름모','정사각형','사각형 관계 탐험'].indexOf(title);const phase=document.querySelector('#phaseTag')?.textContent||'';const step=Math.max(0,Math.min(5,(Number(phase.match(/STEP\s*(\d+)/)?.[1])||1)-1));if(idx<0)return;setText(document.querySelector('#lessonTip'),tips[idx][step]);const heading=document.querySelector('#phaseTitle'),desc=document.querySelector('#phaseDesc');if(idx===1&&step===0){setText(heading,'평행사변형이 되는 조건을 찾아보세요');setText(desc,'조건 카드를 살펴보고 평행사변형이 되는 조건을 골라 보세요.')}if(idx===5&&step===0){setText(heading,'사각형의 관계를 탐험해 보세요');setText(desc,'관계도에서 사각형 이름을 클릭해 성질과 포함 관계를 알아보세요.')}enhanceLessonSix(idx,step)}
let pending=false;const schedule=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;update()})};new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true});schedule();
const flowScript=document.createElement('script');flowScript.src='learning-flow.js';document.body.append(flowScript);
})();