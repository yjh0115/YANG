/* Rectangle interaction: drag any corner, preserve axis-aligned right angles. */
(()=>{
'use strict';
const previous=renderGeometry;
renderGeometry=function(area,type){
 previous(area,type);
 if(type!=='rectangle')return;
 const svg=document.getElementById('geometry');
 if(!svg)return;
 // A upper-left, B lower-left, C lower-right, D upper-right.
 let left=150,right=520,top=110,bottom=340;
 let active=null;
 const points=()=>[{x:left,y:top},{x:left,y:bottom},{x:right,y:bottom},{x:right,y:top}];
 const redraw=()=>drawShape(points(),'rectangle');
 redraw();
 svg.onpointerdown=e=>{
  const handle=e.target.closest('[data-i]');
  if(!handle)return;
  active=Number(handle.dataset.i);
  svg.setPointerCapture(e.pointerId);
  e.preventDefault();
 };
 svg.onpointermove=e=>{
  if(active===null)return;
  const r=svg.getBoundingClientRect();
  const x=Math.max(50,Math.min(630,(e.clientX-r.left)*680/r.width));
  const y=Math.max(45,Math.min(405,(e.clientY-r.top)*450/r.height));
  if(active===0||active===1)left=Math.min(x,right-75);
  else right=Math.max(x,left+75);
  if(active===0||active===3)top=Math.min(y,bottom-75);
  else bottom=Math.max(y,top+75);
  redraw();
 };
 const release=()=>{active=null;};
 svg.onpointerup=release;svg.onpointercancel=release;svg.onlostpointercapture=release;
};
})();