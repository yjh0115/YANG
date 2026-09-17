/* Geometry display corrections without changing the lesson scoring logic. */
(()=>{
'use strict';
if(typeof drawShape!=='function')return;
const originalDraw=drawShape;
drawShape=function(points,type){
 originalDraw(points,type);
 const svg=document.getElementById('geometry');
 if(!svg)return;
 const center={x:points.reduce((s,p)=>s+p.x,0)/4,y:points.reduce((s,p)=>s+p.y,0)/4};
 const labels=[...svg.querySelectorAll('text')].filter(t=>/^[ABCD]$/.test(t.textContent.trim()));
 labels.forEach((label,i)=>{
  const p=points[i];const dx=p.x-center.x,dy=p.y-center.y,len=Math.hypot(dx,dy)||1;
  label.setAttribute('x',Math.max(19,Math.min(660,p.x+dx/len*27)));
  label.setAttribute('y',Math.max(22,Math.min(428,p.y+dy/len*27+5)));
  label.setAttribute('text-anchor','middle');label.setAttribute('font-size','20');
  label.setAttribute('pointer-events','none');
 });
 const circles=[...svg.querySelectorAll('circle.drag-point')];
 circles.forEach(c=>{c.setAttribute('r','13');c.setAttribute('aria-label',`꼭짓점 ${'ABCD'[Number(c.dataset.i)]}`);c.setAttribute('role','button')});
 // The perpendicular-angle symbol must not appear when diagonals are hidden.
 if(!show.diags&&(type==='rhombus'||type==='square')){
  [...svg.querySelectorAll('path')].filter(path=>path.getAttribute('stroke')==='#16a274').forEach(path=>path.remove());
 }
 // Move numeric side lengths outside and numeric angle labels toward the interior.
 const texts=[...svg.querySelectorAll('text')];
 const sideTexts=texts.filter(t=>/^\d+\.\d$/.test(t.textContent.trim()));
 sideTexts.forEach((t,i)=>{if(i>3)return;const a=points[i],b=points[(i+1)%4];const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;const vx=mx-center.x,vy=my-center.y,len=Math.hypot(vx,vy)||1;t.setAttribute('x',Math.max(25,Math.min(655,mx+vx/len*24)));t.setAttribute('y',Math.max(22,Math.min(430,my+vy/len*24+5)));t.setAttribute('font-size','16');t.setAttribute('paint-order','stroke');t.setAttribute('stroke','#fffefa');t.setAttribute('stroke-width','4')});
 texts.filter(t=>/^\d+°$/.test(t.textContent.trim())).forEach((t,i)=>{if(i>3)return;const p=points[i];t.setAttribute('x',p.x+(center.x-p.x)*.22);t.setAttribute('y',p.y+(center.y-p.y)*.22+5);t.setAttribute('font-size','15');t.setAttribute('text-anchor','middle');t.setAttribute('paint-order','stroke');t.setAttribute('stroke','#fffefa');t.setAttribute('stroke-width','4')});
};
})();
