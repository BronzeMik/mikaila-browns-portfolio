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
    const access_key=process.env.WEB3FORMS_ACCESS_KEY;
    if(!access_key)return NextResponse.json({error:'The contact form is not configured yet. Add WEB3FORMS_ACCESS_KEY to your environment.'},{status:503});
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);
    let response:Response;
    try {
      response=await fetch('https://api.web3forms.com/submit',{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({access_key,name:name.trim(),email:email.trim(),replyto:email.trim(),
          subject:'New website inquiry — Mikaila Brown',interest:interest.trim(),message:message.trim(),
          from_name:'Mikaila Brown Website',botcheck:''}),
        cache:'no-store',signal:controller.signal
      });
    } finally {clearTimeout(timeout)}
    const result=await response.json().catch(()=>null);
    if(!response.ok || result?.success!==true){
      return NextResponse.json({error:'The message could not be delivered. Please try again later.'},{status:502});
    }
    return NextResponse.json({ok:true});
  }catch{return NextResponse.json({error:'Could not process the request. Please try again.'},{status:400})}
}
