(function(){
'use strict';
/* Rigvo site translation. Default English; visitor picks DE/ES/PL/FR/PT/IT. Choice kept in localStorage (essential: user-requested preference). */
var LANGS=[['en','English'],['de','Deutsch'],['es','Español'],['pl','Polski'],['fr','Français'],['pt','Português'],['it','Italiano']];
var IDX={de:0,es:1,pl:2,fr:3,pt:4,it:5};
var D=__DICT__;
var MON={Jan:['Jan.','ene','sty','janv.','jan','gen'],Feb:['Feb.','feb','lut','févr.','fev','feb'],Mar:['März','mar','mar','mars','mar','mar'],Apr:['Apr.','abr','kwi','avr.','abr','apr'],May:['Mai','may','maj','mai','mai','mag'],Jun:['Juni','jun','cze','juin','jun','giu'],Jul:['Juli','jul','lip','juil.','jul','lug'],Aug:['Aug.','ago','sie','août','ago','ago'],Sep:['Sept.','sept','wrz','sept.','set','set'],Oct:['Okt.','oct','paź','oct.','out','ott'],Nov:['Nov.','nov','lis','nov.','nov','nov'],Dec:['Dez.','dic','gru','déc.','dez','dic'],Fri:['Fr','vie','pt','ven.','sex','ven']};
var TPL=[];Object.keys(D).forEach(function(k){if(k.indexOf('{')<0)return;var names=[];var re=k.replace(/[.*+?^$()|[\]\\]/g,'\\$&').replace(/\{(\w)\}/g,function(_,n){names.push(n);return '(.+?)'});TPL.push([new RegExp('^'+re+'$'),names,k])});
var LANG='en';
try{var q=new URLSearchParams(location.search).get('lang');if(q&&(q in IDX||q==='en'))LANG=q;else{var s=localStorage.getItem('rigvo_lang');if(s&&(s in IDX))LANG=s}}catch(e){}
function one(t,i){
  if(D[t])return D[t][i];
  for(var j=0;j<TPL.length;j++){var m=t.match(TPL[j][0]);if(m){var out=D[TPL[j][2]][i];TPL[j][1].forEach(function(n,x){out=out.split('{'+n+'}').join(one(m[x+1],i)||m[x+1])});return out}}
  var mm=t.match(/^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/);if(mm)return mm[1]+' '+MON[mm[2]][i];
  if(MON[t])return MON[t][i];
  return null}
function tr(t,i){var lead=t.match(/^\s*/)[0],tail=t.match(/\s*$/)[0],s=t.trim();if(!s||!/[A-Za-z]/.test(s))return t;
  var r=one(s,i);if(r!=null)return lead+r+tail;
  var seps=[' · ',' — '];for(var k=0;k<seps.length;k++){if(s.indexOf(seps[k])>0){var parts=s.split(seps[k]),done=parts.map(function(p){var x=one(p.trim(),i);return x==null?p:x});if(done.join()!==parts.join())return lead+done.join(seps[k])+tail}}
  var w=s.match(/^(.*\S)\s+(Fri|Mon|Tue|Wed|Thu|Sat|Sun)$/);if(w&&MON[w[2]]){var a=one(w[1],i);return lead+(a||w[1])+' '+MON[w[2]][i]+tail}
  return t}
var ATTR=['placeholder','aria-label','title'];
function walk(root){var i=IDX[LANG];var doText=function(n){var p=n.parentElement;if(!p||p.closest('script,style,svg,[data-notr]'))return;if(n.__en==null||n.nodeValue!==n.__tr)n.__en=n.nodeValue;var v=i==null?n.__en:tr(n.__en,i);if(v!==n.nodeValue)n.nodeValue=v;n.__tr=v};
  var doEl=function(el){ATTR.forEach(function(a){if(!el.hasAttribute(a))return;var k='__en_'+a,cur=el.getAttribute(a);if(el[k]==null||cur!==el[k+'t'])el[k]=cur;var v=i==null?el[k]:tr(el[k],i);if(v!==cur)el.setAttribute(a,v);el[k+'t']=v})};
  if(root.nodeType===3){doText(root);return}if(root.nodeType!==1)return;doEl(root);var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT),n;while(n=tw.nextNode())n.nodeType===3?doText(n):doEl(n)}
function links(){document.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(!/^(signup|login|demo)(\.html)?([?#]|$)/.test(h))return;var u=new URL(h,location.href);if(LANG==='en')u.searchParams.delete('lang');else u.searchParams.set('lang',LANG);a.setAttribute('href',u.pathname.split('/').pop()+u.search+u.hash)})}
function apply(){document.documentElement.lang=LANG;walk(document.body);links();var s=document.getElementById('rvLang');if(s)s.value=LANG}
window.rigvoLang=function(){return LANG};
window.rigvoSetLang=function(l){if(!(l in IDX)&&l!=='en')return;LANG=l;try{l==='en'?localStorage.removeItem('rigvo_lang'):localStorage.setItem('rigvo_lang',l)}catch(e){}try{var u=new URL(location.href);u.searchParams.delete('lang');history.replaceState(null,'',u)}catch(e){}apply()};
function picker(){var host=document.querySelector('[data-lang-picker]');if(!host)return;var sel=document.createElement('select');sel.id='rvLang';sel.setAttribute('aria-label','Language');sel.setAttribute('data-notr','');sel.className='rv-lang';LANGS.forEach(function(l){var o=document.createElement('option');o.value=l[0];o.textContent=l[0].toUpperCase()+' · '+l[1];sel.appendChild(o)});sel.value=LANG;sel.addEventListener('change',function(){rigvoSetLang(sel.value)});host.appendChild(sel)}
var mo=new MutationObserver(function(ms){if(LANG==='en')return;ms.forEach(function(m){m.addedNodes.forEach(walk);if(m.type==='characterData')walk(m.target)})});
function start(){picker();if(LANG!=='en')apply();else links();mo.observe(document.body,{childList:true,subtree:true,characterData:true})}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start):start();
})();
