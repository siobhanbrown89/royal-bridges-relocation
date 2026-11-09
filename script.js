document.addEventListener("DOMContentLoaded",()=>{
  const year=document.getElementById("year");
  if(year) year.textContent=new Date().getFullYear();

  const toggle=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav");
  if(toggle&&nav){
    toggle.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded",String(open));
      toggle.textContent=open?"×":"☰";
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded","false");
      toggle.textContent="☰";
    }));
  }

  const form=document.getElementById("relocationForm");
  if(form){
    form.addEventListener("submit",event=>{
      event.preventDefault();
      if(!form.reportValidity()) return;
      const data=new FormData(form);
      const lines=[];
      for(const [key,value] of data.entries()){
        if(key!=="support" && key!=="Consent" && String(value).trim()) lines.push(key+": "+value);
      }
      const supports=data.getAll("support");
      lines.push("Services requested: "+(supports.length?supports.join(", "):"Not specified"));
      const subject=encodeURIComponent("Royal Bridges Relocation Enquiry — "+(data.get("Full name")||"New enquiry"));
      const body=encodeURIComponent("ROYAL BRIDGES RELOCATION ENQUIRY\n\n"+lines.join("\n")+"\n\nConsent: The enquirer has agreed that Royal Bridges may use these details to respond.");
      const status=document.getElementById("formStatus");
      if(status) status.textContent="Your email application should open with your enquiry details filled in. Please review the message and press Send. The website does not send or store the enquiry automatically.";
      window.location.href="mailto:info@royalbridges.ae?subject="+subject+"&body="+body;
    });
  }
});