'use client';
import {useEffect} from 'react';

/** Progressive enhancement: content remains visible if JS or IntersectionObserver is unavailable. */
export function MotionEffects(){
  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce || !('IntersectionObserver' in window))return;
    const targets=document.querySelectorAll<HTMLElement>('.section-intro,.work-heading,.demo-section-heading,.service-card,.work-card,.approach-step,.about-strip-grid,.closing-grid,.section-tag,.project-photo,.ed-project,.ed-section-heading');
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting){entry.target.classList.add('motion-visible');observer.unobserve(entry.target)}
      }
    },{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
    targets.forEach((element,index)=>{
      element.classList.add('motion-ready');
      if(element.matches('.service-card,.work-card,.ed-project'))element.style.setProperty('--motion-delay',`${(index%4)*75}ms`);
      observer.observe(element);
    });
    return ()=>observer.disconnect();
  },[]);
  return null;
}
