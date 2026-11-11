'use client';
import {useState} from 'react';import {ArrowUpRight} from 'lucide-react';
export function BookConsultation(){
  const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  async function pay(){
    setBusy(true);setError('');
    try{
      const res=await fetch('/api/checkout',{method:'POST'});
      const result=await res.json();
      if(!res.ok||!result.url)throw new Error(result.error||'Could not start checkout.');
      window.location.assign(result.url);
    }catch(err){setError(err instanceof Error?err.message:'Could not start checkout.');setBusy(false)}
  }
  return <div className="book-consultation">
    <button className="btn btn-dark" type="button" onClick={pay} disabled={busy}>{busy?'Redirecting…':'Book a 1-hour consultation'} <ArrowUpRight size={18}/></button>
    {error?<p role="alert">{error}</p>:<p className="form-note">Secure payment via Stripe.</p>}
  </div>;
}
