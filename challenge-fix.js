/* Distinct reasoning tasks for step 5; keep step 4 as basic practice. */
(()=>{
const tasks=[
 {q:'평행사변형 ABCD에서 ∠A=65°일 때 ∠B와 ∠C의 크기를 차례대로 고르세요.',opts:['65°, 115°','115°, 65°','115°, 115°','65°, 65°'],answer:1,why:'이웃한 두 각의 합은 180°이고 마주 보는 각은 같으므로 ∠B=115°, ∠C=65°예요.'},
 {q:'사각형 ABCD에서 AB와 CD가 평행하고 길이도 같습니다. 반드시 알 수 있는 결론은?',opts:['직사각형이다','마름모이다','평행사변형이다','정사각형이다'],answer:2,why:'한 쌍의 대변이 평행하고 길이도 같으면 평행사변형이지만 직각이나 네 변의 길이가 같다는 조건은 없어요.'},
 {q:'직사각형 ABCD의 가로와 세로가 각각 8 cm, 6 cm입니다. 대각선 AC의 길이는?',opts:['7 cm','10 cm','12 cm','14 cm'],answer:1,why:'직각삼각형 ABC에서 피타고라스 정리를 적용하면 AC²=8²+6²=100이므로 AC=10 cm예요.'},
 {q:'마름모 ABCD에서 두 대각선의 길이가 각각 12 cm, 16 cm일 때 한 변의 길이는?',opts:['7 cm','10 cm','14 cm','20 cm'],answer:1,why:'대각선은 서로 수직이등분하므로 반쪽 길이 6 cm와 8 cm를 직각변으로 하는 삼각형의 빗변은 10 cm예요.'},
 {q:'어떤 평행사변형의 두 대각선은 길이가 같고 서로 수직입니다. 이 도형은 반드시 무엇인가요?',opts:['직사각형이지만 정사각형은 아니다','마름모이지만 정사각형은 아니다','정사각형','일반 사다리꼴만 해당한다'],answer:2,why:'길이가 같은 대각선은 직사각형의 조건, 수직인 대각선은 마름모의 조건이에요. 두 조건을 함께 만족하는 평행사변형은 정사각형이에요.'},
 {q:'다음 설명 중 항상 옳은 것을 고르세요.',opts:['모든 직사각형은 정사각형이다','모든 마름모는 직사각형이다','모든 정사각형은 직사각형이면서 마름모이다','모든 사다리꼴은 정사각형이다'],answer:2,why:'정사각형은 네 각이 직각이고 네 변의 길이가 같으므로 직사각형과 마름모의 성질을 모두 가져요.'}
];
const original=renderQuiz;
renderQuiz=function(area,lesson,challenge){if(!challenge){original(area,lesson,false);return;}delete area.dataset.challengeAttempted;const task=tasks[current];area.innerHTML=`<div class="practice-card"><span class="eyebrow dark">CHALLENGE · 생각 넓히기</span><h3>${task.q}</h3><div class="quiz-options">${task.opts.map((option,i)=>`<button type="button" data-reason-answer="${i}">${i+1}. ${option}</button>`).join('')}</div><div id="quizFeedback" role="status" aria-live="polite"></div><div class="hint-row"><button type="button" class="hint-btn" id="reasonHint">힌트 보기</button></div></div>`;area.querySelectorAll('[data-reason-answer]').forEach(button=>button.onclick=()=>{area.dataset.challengeAttempted='yes';const ok=Number(button.dataset.reasonAnswer)===task.answer;area.querySelector('#quizFeedback').innerHTML=`<div class="feedback ${ok?'good':'bad'}">${ok?'정답이에요! '+task.why:'조건을 모두 사용했는지 살펴보세요. 힌트를 참고하고 다시 도전해요.'}</div>`;});area.querySelector('#reasonHint').onclick=()=>{area.querySelector('#quizFeedback').innerHTML='<div class="feedback bad">기본 성질을 하나씩 적용하고, 주어지지 않은 조건을 마음대로 가정하지 않았는지 확인해 보세요.</div>';};};
// Completion means attempting the challenge, not necessarily answering correctly.
// Capture before app.js advances the step and writes completion to localStorage.
document.getElementById('nextStep')?.addEventListener('click',event=>{if(step!==4)return;const area=document.getElementById('interactiveArea');if(area?.dataset.challengeAttempted==='yes')return;event.preventDefault();event.stopImmediatePropagation();const feedback=area?.querySelector('#quizFeedback');if(feedback)feedback.textContent='먼저 도전 문제의 답을 하나 선택해 주세요. 틀려도 학습을 마칠 수 있어요.';},true);
})();