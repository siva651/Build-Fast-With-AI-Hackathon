const $ = id => document.getElementById(id);

const DEMO = {
  brand:"LumaBrew",
  goal:"Product launch",
  idea:"LumaBrew is a ready-to-drink cold brew coffee created for students and young professionals who want convenient coffee without complicated preparation. The launch campaign introduces the first LumaBrew bottled cold brew range and focuses on portability, convenience, and a clean everyday routine. The campaign should feel modern and energetic without sounding like typical overhyped advertising.",
  audience:"College students and young professionals aged 18–28 who study, commute, work on projects, and want convenient coffee during busy days.",
  tone:"Clear + confident",
  facts:"LumaBrew is a ready-to-drink bottled cold brew coffee.\nTwo flavors: Original Black and Vanilla Oat.\n250 ml each bottle.\nDesigned for on-the-go use.\nStore in refrigerator.\n4-bottle starter pack: 2 Original Black + 2 Vanilla Oat.\nLaunching October 2026.\nLaunch offer: 10% discount on starter pack during launch week.\nNo medical/health benefit claims.\nNo customer testimonials yet.",
  guardrails:"Do not invent health benefits, nutrition claims, customer testimonials, awards, statistics, ingredients, prices, caffeine amounts, sustainability claims, or product features not present in the source facts. Preserve the exact flavors, bottle size, pack composition, October 2026 launch timing, and 10% launch-week discount. Keep the writing modern and natural. Avoid excessive emojis and words such as revolutionary, miracle, guaranteed, best, or life-changing."
};

let current = null;
let activePlatform = null;

function loadData(data=DEMO){
  $("brand").value=data.brand;
  $("goal").value=data.goal;
  $("idea").value=data.idea;
  $("audience").value=data.audience;
  $("tone").value=data.tone;
  $("facts").value=data.facts;
  $("guardrails").value=data.guardrails;
}
document.querySelectorAll(".chip").forEach(btn=>{
  btn.addEventListener("click",()=>btn.classList.toggle("active"));
});
$("demoBtn").addEventListener("click",()=>loadData());

function platforms(){
  return [...document.querySelectorAll(".chip.active")].map(x=>x.dataset.platform);
}

function formData(){
  return {
    brand:$("brand").value.trim(),
    goal:$("goal").value.trim(),
    idea:$("idea").value.trim(),
    audience:$("audience").value.trim(),
    tone:$("tone").value.trim(),
    facts:$("facts").value.trim(),
    guardrails:$("guardrails").value.trim(),
    style:$("style").value,
    platforms:platforms()
  };
}

function setLoading(title, detail){
  $("emptyState").classList.add("hidden");
  $("result").classList.add("hidden");
  $("loadingState").classList.remove("hidden");
  $("loadingTitle").textContent=title;
  $("loadingDetail").textContent=detail;
}

function render(result){
  current=result;
  $("loadingState").classList.add("hidden");
  $("result").classList.remove("hidden");
  const live = result.meta?.mode === "live";
  $("engineStatus").textContent = live ? `Live · ${result.meta.model}` : "Demo fallback · API unavailable";
  $("outputMeta").textContent = live ? `Generated with ${result.meta.model}` : "Demo content · no live model";
  $("coreMessage").textContent=result.strategy?.coreMessage || "";
  $("strategyCta").textContent=result.strategy?.cta || "";
  $("pillars").innerHTML=(result.strategy?.messagePillars||[]).map(x=>`<span>${escapeHtml(x)}</span>`).join("");

  const keys=Object.keys(result.content||{});
  $("tabs").innerHTML=keys.map((k,i)=>`<button class="tab ${i===0?"active":""}" data-tab="${escapeAttr(k)}">${escapeHtml(k)}</button>`).join("");
  activePlatform=keys[0]||null;
  document.querySelectorAll(".tab").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");activePlatform=b.dataset.tab;renderPreview();});
  renderPreview();

  const audit=result.audit||{};
  const factCount=Number(audit.factCount||0);
  const observed=Number(audit.observedMatches||0);
  const risks=(audit.riskFlags?.length ? audit.riskFlags : (result.sourceLock?.riskFlags||[]));
  $("coverageValue").textContent=`${observed}/${factCount}`;
  $("riskCount").textContent=String(risks.length || 0);
  $("auditTitle").textContent = result.meta?.mode==="live" ? "Output checked against the source brief" : "Source Lock remains active in demo fallback";
  $("auditNote").textContent = audit.note || "Critical source facts are checked across the combined output.";
  $("riskFlags").innerHTML=risks.map(x=>`<div class="risk">${escapeHtml(x)}</div>`).join("");
}

function renderPreview(){
  const x=current?.content?.[activePlatform];
  if(!x){$("preview").innerHTML="";return}
  let html=`<div class="preview-label">${escapeHtml(activePlatform||"OUTPUT")}</div>`;
  if(activePlatform==="Instagram"){
    html+=`<div class="preview"><h3>${escapeHtml(x.hook||"")}</h3><p>${escapeHtml(x.caption||"")}</p><div class="hashtags">${(x.hashtags||[]).map(escapeHtml).join("  ")}</div></div>`;
  } else if(activePlatform==="LinkedIn"){
    html+=`<div class="preview"><h3>${escapeHtml(x.headline||"")}</h3><p>${escapeHtml(x.body||"")}</p><div class="hashtags">${(x.hashtags||[]).map(escapeHtml).join("  ")}</div></div>`;
  } else if(activePlatform==="X"){
    html+=`<div class="post-box"><p>${escapeHtml(x.post||"")}</p></div>`;
  } else if(activePlatform==="Email"){
    html+=`<div class="preview"><h3>${escapeHtml(x.subject||"")}</h3><p><strong>${escapeHtml(x.preheader||"")}</strong></p><p>${escapeHtml(x.body||"")}</p></div>`;
  } else {
    html+=`<div class="preview"><h3>${escapeHtml(x.headline||"")}</h3><p><strong>${escapeHtml(x.subheadline||"")}</strong></p><p>${escapeHtml(x.body||"")}</p><button class="ghost-btn">${escapeHtml(x.cta||"Explore")}</button></div>`;
  }
  $("preview").innerHTML=html;
}

function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escapeAttr(s=""){return escapeHtml(s).replace(/`/g,"&#096;")}

$("sourceTestBtn").addEventListener("click", async ()=>{
  const input=formData();
  if(!input.brand||!input.facts){
    $("auditTitle").textContent="Add a brand and authoritative source facts first.";
    return;
  }
  const button=$("sourceTestBtn");
  button.disabled=true;
  button.textContent="Testing…";
  try{
    const response=await fetch("/api/source-lock-test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(input)});
    const data=await response.json();
    if(!response.ok) throw new Error(data.error||"Source Lock test failed");
    const passed=Boolean(data.sourceLockTest?.passed);
    $("auditTitle").textContent=passed ? "Source Lock test passed — unsupported claim stayed out" : "Source Lock test flagged a potential violation";
    $("riskFlags").innerHTML=`<div class="risk ${passed?"pass":"danger"}">${escapeHtml(data.sourceLockTest?.instruction||"Adversarial claim test completed.")}</div>` + (data.audit?.riskFlags||[]).map(x=>`<div class="risk">${escapeHtml(x)}</div>`).join("");
    $("riskCount").textContent=String((data.audit?.riskFlags||[]).length);
  }catch(err){
    $("auditTitle").textContent="Source Lock test unavailable";
    $("riskFlags").innerHTML=`<div class="risk danger">${escapeHtml(err.message)}</div>`;
  }finally{
    button.disabled=false;
    button.textContent="Run Source Lock test";
  }
});

$("generateBtn").addEventListener("click", async ()=>{
  const input=formData();
  if(!input.brand||!input.idea||!input.platforms.length){
    $("outputMeta").innerHTML=`<span class="error">Add a brand, campaign idea, and at least one platform.</span>`;
    return;
  }

  $("generateBtn").disabled=true;
  setLoading("Starting ContentPilot…","The server will automatically move through its Gemini fallback chain.");
  try{
    const response=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(input)});
    const data=await response.json();
    if(!response.ok) throw new Error(data.error||"Generation failed");
    render(data);
  }catch(err){
    $("loadingState").classList.add("hidden");
    $("result").classList.remove("hidden");
    $("preview").innerHTML=`<div class="error">${escapeHtml(err.message)}</div>`;
  }finally{
    $("generateBtn").disabled=false;
  }
});
