import Image from 'next/image';
const labels: Record<string,string>={resume:'AI Resume Analyzer',onboarding:'Microsoft employee onboarding',shipnote:'ShipNote content workspace',fixit:'FixIt AI repair information search',leads:'Lead research and outreach'};
export function ProjectVisual({type,large=false}:{type:string,large?:boolean}){
 return <div className={'project-photo '+(large?'project-photo-large':'')}><Image src={'/images/project-'+type+'.svg'} alt={'Conceptual product visualization: '+(labels[type]||'software project')} fill sizes={large?'(max-width: 720px) 100vw, 1100px':'(max-width: 720px) 100vw, 550px'} style={{objectFit:'cover'}}/><span className="project-photo-label">CONCEPT VISUAL · {labels[type]}</span></div>
}
