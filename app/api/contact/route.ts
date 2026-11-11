import {NextResponse} from 'next/server';

export async function POST(req:Request){
  try {
    const body=await req.json();
    const {name,email,interest,message,website}=body??{};
    // Honeypot: silently discard bot submissions.
    if(typeof website==='string' && website.trim())return NextResponse.json({ok:true});
    if(![name,email,interest,message].every(x=>typeof x==='string'&&x.trim()) ||
      name.length>100 || email.length>200 || interest.length>100 || message.length>5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return NextResponse.json({error:'Please check the form fields and try again.'},{status:400});
    }
    const access_key=process.env.SPLITFORMS_ACCESS_KEY?.trim();
    if(!access_key)return NextResponse.json({error:'The contact form is not configured yet. Add SPLITFORMS_ACCESS_KEY to your environment.'},{status:503});
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);
    let response:Response;
    try {
      response=await fetch('https://splitforms.com/api/submit',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({access_key,name:name.trim(),email:email.trim(),replyto:email.trim(),
          subject:'New website inquiry — Mikaila Brown',from_name:'Mikaila Brown Website',
          interest:interest.trim(),message:message.trim(),botcheck:''}),
        cache:'no-store',signal:controller.signal
      });
    } finally {clearTimeout(timeout)}
    const raw=await response.text();
    let result:{success?:boolean;message?:string;code?:string}|null=null;
    try{result=JSON.parse(raw)}catch{}
    if(!response.ok || result?.success!==true){
      // Log the real reason (visible in server / Netlify function logs). Never log the access key.
      console.error('[contact] SplitForms rejected the request',{status:response.status,code:result?.code,message:result?.message,body:result?null:raw.slice(0,200)});
      const detail=process.env.NODE_ENV!=='production'?` (SplitForms: ${response.status} ${result?.code??''} ${result?.message??'non-JSON response'})`:'';
      const friendly=response.status===429?'Too many messages right now. Please wait a minute and try again.':'The message could not be delivered. Please try again later.';
      return NextResponse.json({error:friendly+detail},{status:502});
    }
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Could not process the request. Please try again.'},{status:400})}
}
