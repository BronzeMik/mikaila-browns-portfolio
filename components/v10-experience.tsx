'use client';
import {useEffect} from 'react';
export function V10Experience(){useEffect(()=>{
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce)return;
const nodes=document.querySelectorAll<HTMLElement>('.v10-reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('v10-visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -35px 0px'});nodes.forEach(n=>observer.observe(n));
const tilt=document.querySelector<HTMLElement>('.v10-tilt');let raf=0;const move=(e:PointerEvent)=>{if(!tilt||window.innerWidth<900)return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const x=(e.clientX/window.innerWidth-.5)*9;const y=(e.clientY/window.innerHeight-.5)*-8;tilt.style.transform=`perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`})};const reset=()=>{if(tilt)tilt.style.transform=''};window.addEventListener('pointermove',move,{passive:true});window.addEventListener('pointerleave',reset);return()=>{observer.disconnect();window.removeEventListener('pointermove',move);window.removeEventListener('pointerleave',reset);cancelAnimationFrame(raf)}}
},[]);return <div className="v10-scroll-progress" aria-hidden="true"/>}
