/* Nuvance and Co — UI, content and tools (no dependencies) */
(() => {
  "use strict";

  /* ---------------- Icons (stroke SVG paths) ---------------- */
  const I = {
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M11 16V9M15 16v-6M19 16V6"/><path d="m7 9 4-4 4 3 5-5"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/>',
    gst: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8.5 9.5a1.5 1.5 0 1 0 0-.01M15.5 15.5a1.5 1.5 0 1 0 0-.01M16 8l-8 8"/>',
    people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
    bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7 .9L21 7.2M21 3l1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l9 5H3z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    taxdoc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 12h3M9.5 12v5M13 17l1.5-5 1.5 5M13.5 15.5h2"/>',
    scale: '<path d="M12 3v18M7 21h10M5 7h14M12 3l-1 4M12 3l1 4"/><path d="m5 7-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/>',
    building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m9 9 2 2 4-4"/><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3"/>',
    growth: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>'
  };
  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;

  /* ---------------- Content (from the Nuvance flyer) ---------------- */
  const india = [
    ["calc", "Bookkeeping & Accounting", "Accurate, up-to-date books maintained on the software you prefer."],
    ["chart", "Financial Statements & Reporting", "Clear, compliant statements and MIS that show where your business stands."],
    ["doc", "Tax Preparation & Filing", "Returns prepared and filed correctly and on time, every time."],
    ["gst", "GST Services & Compliances", "Registration, returns, reconciliations, refunds and notices handled."],
    ["people", "Payroll Management", "Salary processing, PF, ESI, TDS on salary and payslips, all in one place."],
    ["rupee", "Income Tax Returns & Advisory", "ITR filing for individuals and businesses, with advice that saves tax legally."],
    ["bulb", "Business Tax Planning", "Structure decisions and timing that keep your tax outgo efficient."],
    ["handshake", "Accounts Payable & Receivable", "Vendor payments and collections tracked to protect your cash flow."],
    ["bank", "Bank Reconciliation", "Every transaction matched, so your books and bank always agree."],
    ["rocket", "Startup & Business Advisory", "From incorporation to scale-up, guidance at every milestone."]
  ];
  const global = [
    ["globe", "International Accounting & Reporting", "US GAAP / IFRS"],
    ["taxdoc", "Cross-Border Tax Advisory", "Treaties, withholding and permanent establishment"],
    ["scale", "Transfer Pricing Support", "Documentation and arm's-length analysis"],
    ["building", "Foreign Business Setup & Compliance", "Entity setup and ongoing statutory compliance"],
    ["people", "Global Payroll & Tax Filings", "Multi-country payroll and employee tax filings"]
  ];
  const globalCards = [
    ["globe", "International Accounting & Reporting", "Reporting under US GAAP and IFRS, including conversions and consolidation for group entities."],
    ["taxdoc", "Cross-Border Tax Advisory", "Treaty benefits, withholding taxes and structuring for transactions that span countries."],
    ["scale", "Transfer Pricing Support", "Related-party pricing documentation and benchmarking that stands up to scrutiny."],
    ["building", "Foreign Business Setup & Compliance", "Set up abroad or in India with the right entity and stay compliant afterwards."],
    ["people", "Global Payroll & Tax Filings", "Pay teams across countries correctly and file their taxes on time."]
  ];
  const why = [
    ["award", "CA-Led Expertise", "Every engagement is overseen by qualified chartered accountants."],
    ["handshake", "Reliable & Transparent Service", "Clear scope, clear fees and no surprises."],
    ["globe", "International Reach", "Accounting and tax support across borders."],
    ["growth", "Proactive Tax Planning", "We plan ahead, rather than react at year-end."],
    ["clock", "Timely & Efficient Support", "Deadlines met and questions answered promptly."]
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Theme ---------------- */
  const root = document.documentElement;
  let stored = null;
  try { stored = localStorage.getItem("nv-theme"); } catch (e) {}
  const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = stored || (sysDark ? "dark" : "light");
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("nv-theme", root.dataset.theme); } catch (e) {}
    window.dispatchEvent(new CustomEvent("themechange"));
  });

  /* ---------------- Nav ---------------- */
  const nav = $("#nav"), burger = $("#burger"), links = $("#navLinks"), bar = $("#progressBar");
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("is-scrolled", y > 20);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => { links.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }));

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) $$("a", links).forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["services", "global", "tools", "why", "contact"].forEach(id => sectionObs.observe(document.getElementById(id)));

  /* ---------------- Cursor glow + magnetic buttons ---------------- */
  const glow = $(".cursor-glow");
  if (!reduce && matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", e => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });
    $$(".magnetic").forEach(b => {
      b.addEventListener("pointermove", e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  /* ---------------- Marquee ---------------- */
  const items = [...india.map(s => s[1]), ...global.map(s => s[1])];
  $("#marquee").innerHTML = [...items, ...items].map(t => `<span>${t}</span>`).join("");

  /* ---------------- Services (tabs + 3D tilt cards) ---------------- */
  const grid = $("#serviceGrid"), tabs = $$(".tab"), ink = $(".tab__ink");
  const renderServices = (key) => {
    const list = key === "india" ? india : globalCards;
    grid.innerHTML = list.map(([ic, t, d], i) => `
      <article class="svc ${key === "global" ? "svc--global" : ""}" style="animation-delay:${i * 60}ms">
        <span class="svc__n">${String(i + 1).padStart(2, "0")}</span>
        <div class="svc__ic">${svg(ic)}</div>
        <h3>${t}</h3><p>${d}</p>
      </article>`).join("");
    bindTilt();
  };
  const moveInk = (btn) => { ink.style.left = btn.offsetLeft + "px"; ink.style.width = btn.offsetWidth + "px"; };
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); });
    moveInk(t); renderServices(t.dataset.tab);
  }));
  const bindTilt = () => {
    if (reduce || !matchMedia("(hover: hover)").matches) return;
    $$(".svc", grid).forEach(c => {
      c.addEventListener("pointermove", e => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.transform = `rotateY(${(x - .5) * 14}deg) rotateX(${(.5 - y) * 14}deg) translateZ(6px)`;
        c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
  };
  renderServices("india");
  requestAnimationFrame(() => moveInk(tabs[0]));
  addEventListener("resize", () => moveInk($(".tab.is-active")));
  document.fonts && document.fonts.ready.then(() => moveInk($(".tab.is-active")));

  /* ---------------- Global list ---------------- */
  $("#globalList").innerHTML = global.map(([ic, t, d], i) =>
    `<li class="reveal" style="transition-delay:${i * 80}ms"><span class="g-ic">${svg(ic)}</span><span><b>${t}</b><small>${d}</small></span></li>`).join("");

  /* ---------------- Why ---------------- */
  $("#whyGrid").innerHTML = why.map(([ic, t, d], i) =>
    `<div class="why reveal" style="transition-delay:${i * 90}ms"><div class="why__ic">${svg(ic)}</div><h3>${t}</h3><p>${d}</p></div>`).join("");

  /* ---------------- Contact interest chips ---------------- */
  const interests = ["Bookkeeping", "GST", "Income Tax", "Payroll", "Startup Advisory", "US GAAP / IFRS", "Cross-Border Tax", "Transfer Pricing", "Foreign Setup"];
  $("#interestChips").innerHTML = interests.map(t => `<button type="button" class="chip" aria-pressed="false">${t}</button>`).join("");
  $$("#interestChips .chip").forEach(c => c.addEventListener("click", () => {
    c.classList.toggle("is-active"); c.setAttribute("aria-pressed", c.classList.contains("is-active"));
  }));

  $("#contactForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, msg = $("#formMsg");
    let ok = true;
    ["name", "email"].forEach(n => {
      const el = f.elements[n], bad = !el.value.trim() || (n === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.closest(".field").classList.toggle("is-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { msg.textContent = "Please add your name and a valid email."; return; }
    const picks = $$("#interestChips .chip.is-active").map(c => c.textContent).join(", ") || "General enquiry";
    const body = `Name: ${f.elements.name.value}\nCompany: ${f.elements.company.value}\nEmail: ${f.elements.email.value}\nPhone: ${f.elements.phone.value}\nInterested in: ${picks}\n\n${f.elements.message.value}`;
    location.href = `mailto:team@nuvance.in?subject=${encodeURIComponent("Enquiry: " + picks)}&body=${encodeURIComponent(body)}`;
    msg.textContent = "Your email app should open with this enquiry. If it doesn't, write to team@nuvance.in or call +91 87509 41855.";
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revObs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); revObs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => revObs.observe(el));

  $("#year").textContent = new Date().getFullYear();

  /* ================= TOOLS ================= */
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const parseNum = (s) => Number(String(s).replace(/[^\d.]/g, "")) || 0;

  $$(".tool-tab").forEach(t => t.addEventListener("click", () => {
    $$(".tool-tab").forEach(x => { x.classList.toggle("is-active", x === t); x.setAttribute("aria-selected", x === t); });
    $$(".tool-panel").forEach(p => { const on = p.dataset.panel === t.dataset.tool; p.hidden = !on; p.classList.toggle("is-active", on); });
  }));

  const segGroup = (container, attr, cb) => {
    const btns = $$(`[data-${attr}]`, container);
    btns.forEach(b => b.addEventListener("click", () => {
      btns.forEach(x => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-checked", x === b); });
      cb(b.dataset[attr]);
    }));
  };

  /* ---- Income tax (new regime, FY 2025-26) ---- */
  const SLABS = [[0, 400000, 0], [400000, 800000, .05], [800000, 1200000, .10], [1200000, 1600000, .15], [1600000, 2000000, .20], [2000000, 2400000, .25], [2400000, Infinity, .30]];
  const taxPanel = $('[data-panel="tax"]'), taxIn = $("#taxIncome"), taxRange = $("#taxRange"), bars = $("#slabBars");
  let salaried = true;
  bars.innerHTML = SLABS.map(([lo, hi, r]) => `<div class="bar"><i></i><span>${r * 100}%</span></div>`).join("");

  const calcTax = () => {
    const income = parseNum(taxIn.value);
    const taxable = Math.max(0, income - (salaried ? 75000 : 0));
    const perSlab = SLABS.map(([lo, hi, r]) => Math.max(0, Math.min(taxable, hi) - lo) * r);
    const slabTax = perSlab.reduce((a, b) => a + b, 0);
    let afterRebate = slabTax;
    if (taxable <= 1200000) afterRebate = 0;                                  // Sec 87A rebate
    else afterRebate = Math.min(slabTax, taxable - 1200000);                  // marginal relief
    const cess = afterRebate * .04, total = afterRebate + cess;
    const eff = income ? (total / income) * 100 : 0;

    $("#taxTaxable").textContent = inr(taxable);
    $("#taxSlab").textContent = inr(slabTax);
    $("#taxRebate").textContent = slabTax - afterRebate > 0 ? "− " + inr(slabTax - afterRebate) : inr(0);
    $("#taxCess").textContent = inr(cess);
    $("#taxTotal").textContent = inr(total);
    $("#taxMonthly").textContent = inr((income - total) / 12);
    $("#taxEff").textContent = eff.toFixed(1) + "%";
    $("#taxRingFg").style.strokeDashoffset = 326.7 * (1 - Math.min(eff, 40) / 40);
    const max = Math.max(...perSlab, 1);
    $$(".bar", bars).forEach((b, i) => {
      b.querySelector("i").style.height = (perSlab[i] / max) * 85 + "%";
      b.classList.toggle("is-empty", perSlab[i] === 0);
      b.title = inr(perSlab[i]);
    });
    taxRange.style.setProperty("--p", Math.min(100, income / taxRange.max * 100) + "%");
  };
  taxIn.addEventListener("input", () => {
    const n = parseNum(taxIn.value);
    taxIn.value = n ? n.toLocaleString("en-IN") : "";
    taxRange.value = Math.min(n, taxRange.max);
    calcTax();
  });
  taxRange.addEventListener("input", () => { taxIn.value = Number(taxRange.value).toLocaleString("en-IN"); calcTax(); });
  segGroup(taxPanel, "salaried", v => { salaried = v === "1"; calcTax(); });
  calcTax();

  /* ---- GST ---- */
  const gstPanel = $('[data-panel="gst"]'), gstIn = $("#gstAmount");
  let rate = 18, mode = "add", supply = "intra";
  const calcGst = () => {
    const amt = parseNum(gstIn.value);
    const net = mode === "add" ? amt : amt / (1 + rate / 100);
    const tax = net * rate / 100, gross = net + tax;
    $("#gstNet").textContent = inr(net);
    $("#gstGross").textContent = inr(gross);
    $("#gstC").textContent = $("#gstS").textContent = inr(tax / 2);
    $("#gstI").textContent = inr(tax);
    $("#gstRowC").hidden = $("#gstRowS").hidden = supply !== "intra";
    $("#gstRowI").hidden = supply === "intra";
    $(".stack3d__tax").style.height = Math.max(4, 120 * rate / 100) + "px";
    $(".stack3d__tax span").textContent = `GST ${rate}%`;
  };
  gstIn.addEventListener("input", () => {
    const raw = gstIn.value.replace(/[^\d.]/g, "");
    const [a, b] = raw.split(".");
    gstIn.value = (a ? Number(a).toLocaleString("en-IN") : "") + (b !== undefined ? "." + b.slice(0, 2) : "");
    calcGst();
  });
  $$("#gstRates .chip").forEach(c => c.addEventListener("click", () => {
    $$("#gstRates .chip").forEach(x => { x.classList.toggle("is-active", x === c); x.setAttribute("aria-checked", x === c); });
    rate = Number(c.dataset.rate); calcGst();
  }));
  segGroup(gstPanel, "mode", v => { mode = v; calcGst(); });
  segGroup(gstPanel, "supply", v => { supply = v; calcGst(); });
  calcGst();

  /* ---- Compliance tracker ---- */
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const prevMonth = (d) => MON[(d.getMonth() + 11) % 12];
  const events = [];
  const add = (d, title, desc, cat) => { if (d >= today) events.push({ d, title, desc, cat }); };

  for (let k = 0; k < 14; k++) {
    const y = today.getFullYear(), m = today.getMonth() + k;
    const base = new Date(y, m, 1), Y = base.getFullYear(), M = base.getMonth();
    // Monthly
    const tdsDay = M === 3 ? new Date(Y, 3, 30) : new Date(Y, M, 7);
    add(tdsDay, "TDS / TCS deposit", `Tax deducted / collected in ${prevMonth(base)}`, "TDS");
    add(new Date(Y, M, 11), "GSTR-1", `Outward supplies for ${prevMonth(base)} (monthly filers)`, "GST");
    add(new Date(Y, M, 15), "PF & ESI contribution", `Employee contributions for ${prevMonth(base)}`, "Payroll");
    add(new Date(Y, M, 20), "GSTR-3B", `Summary return & tax payment for ${prevMonth(base)}`, "GST");
    // Quarterly / annual
    if ([5, 8, 11, 2].includes(M)) add(new Date(Y, M, 15), "Advance tax instalment", { 5: "1st instalment (15%)", 8: "2nd instalment (45%)", 11: "3rd instalment (75%)", 2: "Final instalment (100%)" }[M], "Income Tax");
    if ([6, 9, 0, 4].includes(M)) add(new Date(Y, M, 31), "Quarterly TDS return", "Form 24Q / 26Q for the preceding quarter", "TDS");
    if (M === 6) add(new Date(Y, 6, 31), "ITR filing (non-audit)", "Individuals & entities not requiring audit", "Income Tax");
    if (M === 8) add(new Date(Y, 8, 30), "Tax audit report", "Form 3CA/3CB-3CD for audit cases", "Income Tax");
    if (M === 9) add(new Date(Y, 9, 31), "ITR filing (audit cases)", "Businesses and companies requiring audit", "Income Tax");
    if (M === 11) add(new Date(Y, 11, 31), "GSTR-9 annual return", "Annual GST return for the previous financial year", "GST");
  }
  events.sort((a, b) => a.d - b.d);

  const calList = $("#calList");
  const renderCal = (f) => {
    const list = events.filter(e => f === "all" || e.cat === f).slice(0, 12);
    calList.innerHTML = list.map((e, i) => {
      const days = Math.round((e.d - today) / 864e5);
      const when = days === 0 ? "Due today" : days === 1 ? "Due tomorrow" : `In ${days} days`;
      return `<li style="animation-delay:${i * 40}ms">
        <div class="date-tile"><small>${MON[e.d.getMonth()]}</small><b>${e.d.getDate()}</b></div>
        <div><h4>${e.title}</h4><p>${e.desc}</p><span class="badge ${days <= 7 ? "badge--soon" : ""}">${e.cat} · ${when}</span></div>
      </li>`;
    }).join("");
  };
  $$("#calFilter .chip").forEach(c => c.addEventListener("click", () => {
    $$("#calFilter .chip").forEach(x => x.classList.toggle("is-active", x === c));
    renderCal(c.dataset.f);
  }));
  renderCal("all");
})();
