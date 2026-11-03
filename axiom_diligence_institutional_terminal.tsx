import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  FileText,
  Table,
  ShieldAlert,
  BookOpen,
  Download,
  Plus,
  Search,
  Check,
  Copy,
  ArrowUpRight,
  ChevronRight,
  Command,
  X,
  Sigma,
  Sparkles,
  Layers,
  Lock,
  Cpu,
  Terminal,
  Sliders,
  Eye,
  Code2,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// DYNAMIC KATEX & EDITORIAL TYPOGRAPHY LOADER + LATEX RENDERER COMPONENT
// ============================================================================
function useKatexAndFonts() {
  const [katexReady, setKatexReady] = useState(false);

  useEffect(() => {
    // 1. Inject Editorial Serif (Newsreader), Sans (Inter), and Mono (JetBrains Mono)
    if (!document.getElementById('axiom-editorial-fonts')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'axiom-editorial-fonts';
      fontLink.rel = 'stylesheet';
      fontLink.href =
        'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap';
      document.head.appendChild(fontLink);
    }

    // 2. Inject KaTeX CSS
    if (!document.getElementById('axiom-katex-css')) {
      const cssLink = document.createElement('link');
      cssLink.id = 'axiom-katex-css';
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
      cssLink.crossOrigin = 'anonymous';
      document.head.appendChild(cssLink);
    }

    // 3. Load KaTeX JS
    if (window.katex) {
      setKatexReady(true);
      return;
    }

    const existingScript = document.getElementById('axiom-katex-js');
    if (existingScript) {
      existingScript.addEventListener('load', () => setKatexReady(true));
      return;
    }

    const script = document.createElement('script');
    script.id = 'axiom-katex-js';
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => setKatexReady(true);
    document.head.appendChild(script);
  }, []);

  return katexReady;
}

/**
 * Renders publication-grade LaTeX via KaTeX when loaded, or a crisp
 * Computer Modern / Newsreader serif fallback immediately before script load.
 */
function LatexBlock({ tex, fallback, display = true, katexReady, className = '' }) {
  const html = useMemo(() => {
    if (katexReady && window.katex) {
      try {
        return window.katex.renderToString(tex, {
          displayMode: display,
          throwOnError: false,
          strict: false
        });
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [tex, display, katexReady]);

  if (html) {
    return (
      <span
        className={`${display ? 'block overflow-x-auto py-1' : 'inline'} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`${
        display ? 'block overflow-x-auto py-1.5 text-[15px]' : 'inline'
      } font-serif italic tracking-tight text-[#111110] ${className}`}
      style={{ fontFamily: "'Newsreader', 'Computer Modern Serif', Georgia, serif" }}
    >
      {fallback || tex}
    </span>
  );
}

// ============================================================================
// WALL STREET & ACCOUNTING FORMATTING HELPERS
// ============================================================================
const fmtCurrency = (val, decimals = 1, showPlus = false) => {
  if (val === null || val === undefined || isNaN(val) || Math.abs(val) < 0.005) return '—';
  const absVal = Math.abs(val).toFixed(decimals);
  if (val < 0) return `($${absVal}M)`;
  return `${showPlus && val > 0 ? '+' : ''}$${absVal}M`;
};

const fmtMultiple = (val, decimals = 2) => {
  if (val === null || val === undefined || isNaN(val) || Math.abs(val) < 0.005) return '—';
  const absVal = Math.abs(val).toFixed(decimals);
  return val < 0 ? `(${absVal}x)` : `${absVal}x`;
};

const fmtPct = (val, decimals = 1, showPlus = false) => {
  if (val === null || val === undefined || isNaN(val) || Math.abs(val) < 0.005) return '—';
  const absVal = Math.abs(val).toFixed(decimals);
  if (val < 0) return `(${absVal}%)`;
  return `${showPlus && val > 0 ? '+' : ''}${absVal}%`;
};

// ============================================================================
// PRE-LOADED DEAL PIPELINE (AXIOM DILIGENCE INSTITUTIONAL WORKSPACE)
// ============================================================================
const INITIAL_DEALS = {
  apex: {
    id: 'apex',
    name: 'Apex Systems, Inc.',
    codename: 'Project Apex',
    sector: 'B2B SaaS / Cloud ERP',
    stage: 'IC Review',
    hq: 'Austin, TX',
    advisor: 'Qatalyst Partners',
    cimPages: 99,
    cimFileName: 'Apex_Systems_Confidential_Information_Memorandum_FY24.pdf',
    headlineEv: 142.0,
    historicals: [
      {
        year: 'FY22A',
        revenue: 36.4,
        cogs: 8.4,
        grossProfit: 28.0,
        opex: 19.8,
        reportedEbitda: 8.2,
        da: 1.1,
        capex: 1.4,
        nwc: 2.1
      },
      {
        year: 'FY23A',
        revenue: 42.8,
        cogs: 9.2,
        grossProfit: 33.6,
        opex: 23.1,
        reportedEbitda: 10.5,
        da: 1.3,
        capex: 1.6,
        nwc: 2.5
      },
      {
        year: 'FY24A',
        revenue: 50.2,
        cogs: 10.3,
        grossProfit: 39.9,
        opex: 27.5,
        reportedEbitda: 12.4,
        da: 1.5,
        capex: 1.8,
        nwc: 2.8
      }
    ],
    qoeItems: [
      {
        id: 'apex-qoe-1',
        label: 'One-time legacy ERP & bare-metal AWS migration costs',
        category: 'Technology Transition',
        fy22: 0.2,
        fy23: 0.6,
        fy24: 1.15,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Footnote 4A · Cloud Infrastructure Dual-Hosting',
        verbatimQuote:
          'During Q1–Q3 FY24, the Company incurred $1,150,000 in non-recurring parallel hosting fees with Rackspace and third-party Kubernetes migration consultants (Deloitte Digital). The legacy data center lease was formally terminated on October 31, 2024.'
      },
      {
        id: 'apex-qoe-2',
        label: 'Non-recurring patent litigation settlement & legal defense',
        category: 'Legal & Regulatory',
        fy22: 0.0,
        fy23: 0.35,
        fy24: 0.65,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Footnote 4B · Non-Operating Litigation',
        verbatimQuote:
          'Reflects $650,000 of outside counsel fees (Kirkland & Ellis LLP) and final settlement disbursement resolving a non-practicing entity patent claim dismissed with prejudice in August 2024.'
      },
      {
        id: 'apex-qoe-3',
        label: 'Founder excess compensation & family board stipends',
        category: 'Executive Normalization',
        fy22: 0.8,
        fy23: 0.9,
        fy24: 0.95,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Footnote 4C · Related-Party Compensation',
        verbatimQuote:
          'Co-Founders drew $1,750,000 combined base + discretionary cash bonus in FY24 vs. executed post-closing employment agreements stipulating $800,000 aggregate executive replacement cash compensation ($950,000 net savings).'
      },
      {
        id: 'apex-qoe-4',
        label: 'Deferred revenue fair-value purchase accounting normalization',
        category: 'Accounting Policy',
        fy22: 0.0,
        fy23: 0.2,
        fy24: 0.45,
        included: true,
        haircutPct: 50,
        confidence: 'Partial Haircut',
        page: 38,
        sectionRef: 'Note 2 · ASC 606 Multi-Year Enterprise Billings',
        verbatimQuote:
          'Management proposes adding back $450,000 for deferred implementation fees amortized over 36 months. Independent QoE diligence recommends a 50% haircut ($225,000 credit) due to ongoing customer onboarding labor.'
      },
      {
        id: 'apex-qoe-5',
        label: 'Pro-forma run-rate cost savings & uncontracted pipeline synergies',
        category: 'Pro-Forma Synergies',
        fy22: 0.0,
        fy23: 0.0,
        fy24: 1.4,
        included: false,
        haircutPct: 0,
        confidence: 'Aggressive',
        page: 52,
        sectionRef: 'Management Adjustment 6 · Unverified Run-Rate',
        verbatimQuote:
          'Management includes $1,400,000 of projected annualized savings from an offshore QA vendor transition scheduled for Q3 FY25 and uncontracted upsell renewals. Axiom Diligence underwriting policy excludes unexecuted forward synergies.'
      }
    ],
    cimPagesContent: {
      38: {
        pageNumber: 38,
        title: 'Section 3.1 — Consolidated Statements of Operations (Audited GAAP)',
        subtitle: 'Apex Systems, Inc. · Fiscal Years Ended December 31, 2022, 2023, and 2024 ($ in millions)',
        narrative:
          'Consolidated financial statements have been audited by Ernst & Young LLP in accordance with US GAAP. Subscription ARR reached $43.4M at FY24 year-end (+21.4% YoY), driven by enterprise ERP module expansion across 340 industrial distribution clients.',
        tableRows: [
          { item: 'Subscription & SaaS Revenue', fy22: '$30.2M', fy23: '$36.1M', fy24: '$43.4M', highlightPage: 38 },
          { item: 'Professional Services & Onboarding', fy22: '$6.2M', fy23: '$6.7M', fy24: '$6.8M', highlightPage: 38 },
          { item: 'Total Consolidated Revenue', fy22: '$36.4M', fy23: '$42.8M', fy24: '$50.2M', isBold: true },
          { item: 'Gross Profit (ASC 606 Normalized)', fy22: '$28.0M', fy23: '$33.6M', fy24: '$39.9M', refId: 'apex-qoe-4' },
          { item: 'Reported GAAP EBITDA', fy22: '$8.2M', fy23: '$10.5M', fy24: '$12.4M', isBold: true }
        ]
      },
      44: {
        pageNumber: 44,
        title: 'Section 4.2 — Quality of Earnings (QoE) & Adjusted EBITDA Bridge',
        subtitle: 'Independent Financial Due Diligence · Alvarez & Marsal / Management Reconciliation',
        narrative:
          'Management presents FY24 Adjusted EBITDA of $17.0M. Independent QoE review verified $2.75M of cash non-recurring expenses (AWS dual-hosting, IP litigation settlement, and contractual founder salary reduction), while recommending haircuts on deferred revenue and pro-forma offshore savings.',
        tableRows: [
          { item: 'FY24A Reported GAAP EBITDA', fy22: '$8.20M', fy23: '$10.50M', fy24: '$12.40M', isBold: true },
          { item: '(+) Legacy ERP & AWS Dual-Hosting Migration', fy22: '$0.20M', fy23: '$0.60M', fy24: '$1.15M', refId: 'apex-qoe-1' },
          { item: '(+) Non-Recurring Patent Litigation Settlement', fy22: '—', fy23: '$0.35M', fy24: '$0.65M', refId: 'apex-qoe-2' },
          { item: '(+) Founder Excess Compensation Normalization', fy22: '$0.80M', fy23: '$0.90M', fy24: '$0.95M', refId: 'apex-qoe-3' }
        ]
      },
      52: {
        pageNumber: 52,
        title: 'Section 5.4 — Cohort Retention, Customer Concentration & Pro-Forma Run-Rate',
        subtitle: 'Commercial Diligence & Proposed Financing Structure Commentary',
        narrative:
          'Top-5 customers account for 14.2% of FY24 total revenue, with no single customer exceeding 4.1%. Gross dollar retention stood at 95.8% and net dollar retention at 113.6%. Note: Management Adjustment 6 ($1.40M) reflects unexecuted FY25 vendor offshoring.',
        tableRows: [
          { item: 'Gross Dollar Retention (GDR)', fy22: '94.8%', fy23: '95.2%', fy24: '95.8%' },
          { item: 'Net Dollar Retention (NDR)', fy22: '111.0%', fy23: '112.4%', fy24: '113.6%' },
          { item: 'Top-5 Customer Revenue Share', fy22: '16.5%', fy23: '15.1%', fy24: '14.2%' },
          { item: '(+) Pro-Forma Uncontracted Pipeline Synergies', fy22: '—', fy23: '—', fy24: '$1.40M', refId: 'apex-qoe-5' }
        ]
      }
    },
    lboDefaults: {
      entryMultiple: 9.25,
      exitMultiple: 9.75,
      revGrowthCagr: 14.5,
      marginExpansionBps: 150,
      seniorDebtMultiple: 3.5,
      seniorSpreadBps: 325,
      subDebtMultiple: 1.0,
      subInterestRate: 11.5,
      cashSweepPct: 85,
      capexPctRev: 3.5,
      nwcPctDeltaRev: 6.0,
      taxRate: 25.0,
      waccPct: 11.2,
      perpGrowthPct: 3.25
    },
    creditProfile: {
      sofrBaseRate: 4.5,
      customerConcentrationPct: 14.2,
      marginStabilityScore: 86,
      lgdPct: 35.0
    }
  },

  titan: {
    id: 'titan',
    name: 'Titan Cold Chain Logistics',
    codename: 'Project Titan',
    sector: 'Industrial Services',
    stage: 'Final Diligence',
    hq: 'Charlotte, NC',
    advisor: 'Lazard Middle Market',
    cimPages: 114,
    cimFileName: 'Titan_Cold_Chain_Lazard_CIM_2024.pdf',
    headlineEv: 218.5,
    historicals: [
      {
        year: 'FY22A',
        revenue: 86.0,
        cogs: 55.9,
        grossProfit: 30.1,
        opex: 12.1,
        reportedEbitda: 18.0,
        da: 4.1,
        capex: 4.8,
        nwc: 8.9
      },
      {
        year: 'FY23A',
        revenue: 94.5,
        cogs: 60.5,
        grossProfit: 34.0,
        opex: 13.7,
        reportedEbitda: 20.3,
        da: 4.5,
        capex: 5.2,
        nwc: 9.8
      },
      {
        year: 'FY24A',
        revenue: 103.8,
        cogs: 65.4,
        grossProfit: 38.4,
        opex: 15.8,
        reportedEbitda: 22.6,
        da: 4.9,
        capex: 5.6,
        nwc: 10.6
      }
    ],
    qoeItems: [
      {
        id: 'titan-qoe-1',
        label: 'Savannah Port Cold-Storage Facility pre-opening & FDA validation',
        category: 'Facility Expansion',
        fy22: 0.0,
        fy23: 0.45,
        fy24: 1.35,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Schedule 4.1 · Greenfield Facility Ramp',
        verbatimQuote:
          'Includes $1,350,000 of pre-commercial refrigeration commissioning, USDA/FDA inspection payroll, and dead-rent incurred prior to the Savannah Annex certificate of occupancy on November 12, 2024.'
      },
      {
        id: 'titan-qoe-2',
        label: 'Diesel fuel surcharge lag & spot hedge ineffectiveness',
        category: 'Commodity Pass-Through',
        fy22: 0.6,
        fy23: 0.4,
        fy24: 0.75,
        included: true,
        haircutPct: 75,
        confidence: 'Partial Haircut',
        page: 44,
        sectionRef: 'Schedule 4.2 · Fuel Indexation Clauses',
        verbatimQuote:
          'Reflects $750,000 timing mismatch on legacy 90-day fuel surcharge resets. 88% of customer contracts have transitioned to weekly DOE automated pass-throughs; QoE applies 75% credit ($562,500).'
      },
      {
        id: 'titan-qoe-3',
        label: 'Non-operating fractional aircraft lease & prior owner advisory fee',
        category: 'Owner Expenses',
        fy22: 0.5,
        fy23: 0.55,
        fy24: 0.6,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 38,
        sectionRef: 'Note 7 · Related Party Transactions',
        verbatimQuote:
          'Historical SG&A includes $600,000 in annual NetJets fractional lease charges and family office advisory fees that terminate automatically upon transaction close.'
      },
      {
        id: 'titan-qoe-4',
        label: 'Capitalized cryo-reefer maintenance reclassification (Disallowed)',
        category: 'Accounting Policy',
        fy22: 0.0,
        fy23: 0.0,
        fy24: 1.2,
        included: false,
        haircutPct: 0,
        confidence: 'Aggressive',
        page: 52,
        sectionRef: 'Audit Finding 3 · CapEx vs. OpEx Policy',
        verbatimQuote:
          'Management proposed adding back $1.20M of fleet compressor overhauls as one-time refurbishment. KPMG diligence determined these represent recurring 36-month fleet lifecycle maintenance.'
      }
    ],
    cimPagesContent: {
      38: {
        pageNumber: 38,
        title: 'Section 3.1 — Audited Consolidated Income Statements',
        subtitle: 'Titan Cold Chain Logistics LLC · FY22A–FY24A ($ in millions)',
        narrative:
          'Titan operates 14 temperature-controlled blast-freezing and biologics distribution centers across the Southeast and Mid-Atlantic corridor with 94.2% average pallet utilization.',
        tableRows: [
          { item: 'Cold Storage & Blast Freezing Revenue', fy22: '$58.4M', fy23: '$64.8M', fy24: '$71.9M' },
          { item: 'Dedicated Cryo-Fleet Freight Revenue', fy22: '$27.6M', fy23: '$29.7M', fy24: '$31.9M' },
          { item: 'Total Revenue', fy22: '$86.0M', fy23: '$94.5M', fy24: '$103.8M', isBold: true },
          { item: 'Reported GAAP EBITDA', fy22: '$18.0M', fy23: '$20.3M', fy24: '$22.6M', refId: 'titan-qoe-3', isBold: true }
        ]
      },
      44: {
        pageNumber: 44,
        title: 'Section 4.2 — Quality of Earnings EBITDA Bridge',
        subtitle: 'KPMG Transaction Services Review · FY24 Normalized Run-Rate',
        narrative:
          'Verified adjustments center on the Savannah Port cold-storage expansion pre-opening costs ($1.35M) and contractual fuel pass-through resets ($0.75M gross / $0.56M post-haircut).',
        tableRows: [
          { item: 'Reported GAAP EBITDA', fy22: '$18.00M', fy23: '$20.30M', fy24: '$22.60M', isBold: true },
          { item: '(+) Savannah Hub Pre-Opening & Validation', fy22: '—', fy23: '$0.45M', fy24: '$1.35M', refId: 'titan-qoe-1' },
          { item: '(+) Diesel Surcharge Lag Normalization', fy22: '$0.60M', fy23: '$0.40M', fy24: '$0.75M', refId: 'titan-qoe-2' }
        ]
      },
      52: {
        pageNumber: 52,
        title: 'Section 5.4 — Fleet CapEx Audit & Customer Concentration',
        subtitle: 'Technical & Commercial Underwriting Notes',
        narrative:
          'Top-5 foodservice and biologics shippers represent 24.5% of revenue under 5-year take-or-pay storage agreements. Routine compressor overhauls ($1.2M) are excluded from Adjusted EBITDA.',
        tableRows: [
          { item: 'Top-5 Customer Concentration', fy22: '27.0%', fy23: '25.8%', fy24: '24.5%' },
          { item: 'Take-or-Pay Contracted Revenue Share', fy22: '74.0%', fy23: '76.5%', fy24: '79.0%' },
          { item: '(+) Fleet Compressor Overhaul Add-Back (Disallowed)', fy22: '—', fy23: '—', fy24: '$1.20M', refId: 'titan-qoe-4' }
        ]
      }
    },
    lboDefaults: {
      entryMultiple: 8.75,
      exitMultiple: 9.0,
      revGrowthCagr: 9.5,
      marginExpansionBps: 100,
      seniorDebtMultiple: 3.75,
      seniorSpreadBps: 350,
      subDebtMultiple: 0.75,
      subInterestRate: 11.75,
      cashSweepPct: 80,
      capexPctRev: 5.2,
      nwcPctDeltaRev: 9.0,
      taxRate: 24.5,
      waccPct: 10.5,
      perpGrowthPct: 2.75
    },
    creditProfile: {
      sofrBaseRate: 4.5,
      customerConcentrationPct: 24.5,
      marginStabilityScore: 79,
      lgdPct: 30.0
    }
  },

  vela: {
    id: 'vela',
    name: 'Vela Diagnostics Corp.',
    codename: 'Project Vela',
    sector: 'Healthcare MedTech',
    stage: 'LOI Submitted',
    hq: 'Boston, MA',
    advisor: 'Jefferies Healthcare IB',
    cimPages: 82,
    cimFileName: 'Vela_Diagnostics_Jefferies_CIM_FY24.pdf',
    headlineEv: 96.0,
    historicals: [
      {
        year: 'FY22A',
        revenue: 29.5,
        cogs: 11.5,
        grossProfit: 18.0,
        opex: 11.2,
        reportedEbitda: 6.8,
        da: 0.9,
        capex: 1.2,
        nwc: 2.4
      },
      {
        year: 'FY23A',
        revenue: 34.0,
        cogs: 12.9,
        grossProfit: 21.1,
        opex: 12.9,
        reportedEbitda: 8.2,
        da: 1.1,
        capex: 1.4,
        nwc: 2.8
      },
      {
        year: 'FY24A',
        revenue: 39.2,
        cogs: 14.5,
        grossProfit: 24.7,
        opex: 15.1,
        reportedEbitda: 9.6,
        da: 1.2,
        capex: 1.5,
        nwc: 3.2
      }
    ],
    qoeItems: [
      {
        id: 'vela-qoe-1',
        label: 'FDA 510(k) Assay Clinical Trial & Regulatory Submission',
        category: 'Regulatory Milestone',
        fy22: 0.15,
        fy23: 0.4,
        fy24: 0.8,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Footnote 5A · One-Time FDA 510(k) Clearance',
        verbatimQuote:
          'Represents $800,000 of external CRO biostatistics fees for the VelaPlex Rapid Sepsis Panel cleared by the FDA in September 2024.'
      },
      {
        id: 'vela-qoe-2',
        label: 'CFO transition severance & Korn Ferry executive search retainer',
        category: 'Executive Search',
        fy22: 0.0,
        fy23: 0.0,
        fy24: 0.45,
        included: true,
        haircutPct: 100,
        confidence: 'Verified',
        page: 44,
        sectionRef: 'Footnote 5B · Executive Transition',
        verbatimQuote:
          'Includes $300,000 contractual severance for retiring CFO and $150,000 retained search fee.'
      },
      {
        id: 'vela-qoe-3',
        label: 'Cleanroom ISO-7 cartridge line relocation & calibration',
        category: 'Manufacturing',
        fy22: 0.0,
        fy23: 0.25,
        fy24: 0.35,
        included: true,
        haircutPct: 50,
        confidence: 'Partial Haircut',
        page: 38,
        sectionRef: 'Note 4 · Danvers Cleanroom Consolidation',
        verbatimQuote:
          'Management added back $350,000 for optical calibration downtime during cleanroom move; Deloitte QoE allows 50% ($175,000) due to recurring annual ISO recertification.'
      },
      {
        id: 'vela-qoe-4',
        label: 'Pro-forma hospital IDN reagent pull-through uplift',
        category: 'Commercial Synergy',
        fy22: 0.0,
        fy23: 0.0,
        fy24: 0.9,
        included: false,
        haircutPct: 0,
        confidence: 'Aggressive',
        page: 52,
        sectionRef: 'Management Adj 7 · Uninstalled Analyzers',
        verbatimQuote:
          'Reflects $900,000 of assumed high-margin reagent pull-through on 45 diagnostic analyzers currently in hospital evaluation pilots without signed reagent minimums.'
      }
    ],
    cimPagesContent: {
      38: {
        pageNumber: 38,
        title: 'Section 3.1 — Consolidated Statements of Operations',
        subtitle: 'Vela Diagnostics Corp. · FY22A–FY24A ($ in millions)',
        narrative:
          'Consumable molecular diagnostic assay cartridges generated 78.4% of FY24 revenue on an installed base of 1,120 hospital laboratory analyzers.',
        tableRows: [
          { item: 'Proprietary Assay Cartridge Consumables', fy22: '$22.4M', fy23: '$26.3M', fy24: '$30.7M' },
          { item: 'Analyzer Placements & Service Contracts', fy22: '$7.1M', fy23: '$7.7M', fy24: '$8.5M' },
          { item: 'Total Consolidated Revenue', fy22: '$29.5M', fy23: '$34.0M', fy24: '$39.2M', isBold: true },
          { item: 'Reported GAAP EBITDA', fy22: '$6.8M', fy23: '$8.2M', fy24: '$9.6M', refId: 'vela-qoe-3', isBold: true }
        ]
      },
      44: {
        pageNumber: 44,
        title: 'Section 4.2 — Quality of Earnings EBITDA Bridge',
        subtitle: 'Deloitte Healthcare Transaction Services · FY24 Audit',
        narrative:
          'Verified add-backs include completed FDA 510(k) trial costs ($0.80M) and CFO transition expenses ($0.45M).',
        tableRows: [
          { item: 'Reported GAAP EBITDA', fy22: '$6.80M', fy23: '$8.20M', fy24: '$9.60M', isBold: true },
          { item: '(+) FDA 510(k) Clinical Trial & Clearance', fy22: '$0.15M', fy23: '$0.40M', fy24: '$0.80M', refId: 'vela-qoe-1' },
          { item: '(+) CFO Transition & Executive Search', fy22: '—', fy23: '—', fy24: '$0.45M', refId: 'vela-qoe-2' }
        ]
      },
      52: {
        pageNumber: 52,
        title: 'Section 5.4 — Hospital IDN Contracts & Reagent Pull-Through',
        subtitle: 'Commercial & Regulatory Risk Assessment',
        narrative:
          'Top-5 Hospital IDNs represent 18.0% of total revenue. Pilot analyzer reagent uplift ($0.90M) is excluded from baseline credit underwriting.',
        tableRows: [
          { item: 'Installed Analyzer Base (Units)', fy22: '810', fy23: '965', fy24: '1,120' },
          { item: 'Recurring Consumable Revenue Share', fy22: '75.9%', fy23: '77.4%', fy24: '78.4%' },
          { item: '(+) Uncontracted Pilot Reagent Uplift (Disallowed)', fy22: '—', fy23: '—', fy24: '$0.90M', refId: 'vela-qoe-4' }
        ]
      }
    },
    lboDefaults: {
      entryMultiple: 9.0,
      exitMultiple: 9.5,
      revGrowthCagr: 13.0,
      marginExpansionBps: 125,
      seniorDebtMultiple: 3.25,
      seniorSpreadBps: 300,
      subDebtMultiple: 0.75,
      subInterestRate: 11.25,
      cashSweepPct: 85,
      capexPctRev: 3.8,
      nwcPctDeltaRev: 7.5,
      taxRate: 25.0,
      waccPct: 10.8,
      perpGrowthPct: 3.0
    },
    creditProfile: {
      sofrBaseRate: 4.5,
      customerConcentrationPct: 18.0,
      marginStabilityScore: 84,
      lgdPct: 32.0
    }
  }
};

// ============================================================================
// CORE WALL STREET 5-YEAR LBO & INFINITE GEOMETRIC SERIES ENGINE
// ============================================================================
function computeLboSchedule(
  baseHist,
  underwrittenEbitdaFY24,
  assumptions,
  sofrBase = 4.5,
  valuationMethod = 'multiple' // 'multiple' | 'perpetuity'
) {
  const {
    entryMultiple,
    exitMultiple,
    revGrowthCagr,
    marginExpansionBps,
    seniorDebtMultiple,
    seniorSpreadBps,
    subDebtMultiple,
    subInterestRate,
    cashSweepPct,
    capexPctRev,
    nwcPctDeltaRev,
    taxRate,
    waccPct = 11.2,
    perpGrowthPct = 3.25
  } = assumptions;

  const baseRev = baseHist.revenue;
  const baseEbitda = underwrittenEbitdaFY24;
  const baseMarginPct = (baseEbitda / baseRev) * 100;

  // Sources & Uses at Close (FY24A)
  const impliedEv = baseEbitda * entryMultiple;
  const dealFees = impliedEv * 0.022;
  const totalUses = impliedEv + dealFees;

  const initSeniorDebt = baseEbitda * seniorDebtMultiple;
  const initSubDebt = baseEbitda * subDebtMultiple;
  const initTotalDebt = initSeniorDebt + initSubDebt;
  const sponsorEquityCheck = Math.max(1.0, totalUses - initTotalDebt);

  const seniorAllInRate = sofrBase + seniorSpreadBps / 100;
  const annualMarginDelta = marginExpansionBps / 100 / 5;

  const years = [];
  let currRev = baseRev;
  let begSenior = initSeniorDebt;
  let begSub = initSubDebt;

  for (let yr = 1; yr <= 5; yr++) {
    const prevRev = currRev;
    currRev = prevRev * (1 + revGrowthCagr / 100);
    const deltaRev = currRev - prevRev;

    const marginPct = baseMarginPct + annualMarginDelta * yr;
    const ebitda = currRev * (marginPct / 100);
    const da = currRev * 0.03;
    const ebit = ebitda - da;

    const begTotalDebt = begSenior + begSub;
    const cashInterest =
      begSenior * (seniorAllInRate / 100) + begSub * (subInterestRate / 100);

    const ebt = Math.max(0, ebit - cashInterest);
    const cashTaxes = ebt * (taxRate / 100);

    const capex = currRev * (capexPctRev / 100);
    const deltaNwc = deltaRev * (nwcPctDeltaRev / 100);
    const wcAndCapexOutflow = -(capex + deltaNwc);

    // Levered Free Cash Flow (LFCF) and Unlevered FCF (UFCF)
    const lfcf = ebitda - cashInterest - cashTaxes - capex - deltaNwc;
    const ufcf = ebit * (1 - taxRate / 100) + da - capex - deltaNwc;

    // Debt Service: 1.0% mandatory amortization on initial Senior Term Loan
    const mandatoryAmort = Math.min(begSenior, initSeniorDebt * 0.01);
    const seniorAfterMand = Math.max(0, begSenior - mandatoryAmort);

    const excessCashForSweep = Math.max(0, lfcf - mandatoryAmort) * (cashSweepPct / 100);
    const optionalSeniorSweep = Math.min(seniorAfterMand, excessCashForSweep);
    const endSenior = Math.max(0, seniorAfterMand - optionalSeniorSweep);

    const remainingSweepForSub = Math.max(0, excessCashForSweep - optionalSeniorSweep);
    const optionalSubSweep = Math.min(begSub, remainingSweepForSub);
    const endSub = Math.max(0, begSub - optionalSubSweep);

    const optionalCashSweep = optionalSeniorSweep + optionalSubSweep;
    const endTotalDebt = endSenior + endSub;

    const netLeverage = ebitda > 0 ? endTotalDebt / ebitda : 0;
    const interestCoverage = cashInterest > 0 ? ebitda / cashInterest : 99.0;
    const impliedYrEv = ebitda * exitMultiple;
    const impliedYrEquity = Math.max(0, impliedYrEv - endTotalDebt);

    years.push({
      yrIndex: yr,
      period: `FY${24 + yr}E`,
      revenue: currRev,
      revGrowth: revGrowthCagr,
      ebitda,
      ebitdaMargin: marginPct,
      da: -da,
      ebit,
      cashInterest: -cashInterest,
      cashTaxes: -cashTaxes,
      wcAndCapex: wcAndCapexOutflow,
      lfcf,
      ufcf,
      begTotalDebt,
      mandatoryAmort: -mandatoryAmort,
      optionalCashSweep: -optionalCashSweep,
      endSenior,
      endSub,
      endTotalDebt,
      netLeverage,
      interestCoverage,
      impliedYrEv,
      impliedYrEquity
    });

    begSenior = endSenior;
    begSub = endSub;
  }

  const yr5 = years[4];
  const exitEvMultiple = yr5.ebitda * exitMultiple;

  // Infinite Geometric Series Terminal Value: TV = UFCF_5 * (1 + g) / (WACC - g)
  const spreadWaccG = Math.max(0.025, (waccPct - perpGrowthPct) / 100);
  const exitEvPerpetuity = (yr5.ufcf * (1 + perpGrowthPct / 100)) / spreadWaccG;
  const impliedPerpetuityMultiple = yr5.ebitda > 0 ? exitEvPerpetuity / yr5.ebitda : exitMultiple;

  const activeExitEv = valuationMethod === 'perpetuity' ? exitEvPerpetuity : exitEvMultiple;
  const exitEquity = Math.max(0, activeExitEv - yr5.endTotalDebt);
  const grossMoic = sponsorEquityCheck > 0 ? exitEquity / sponsorEquityCheck : 0;
  const netIrr = grossMoic > 0 ? (Math.pow(grossMoic, 1 / 5) - 1) * 100 : -100;
  const totalDebtRepaid = initTotalDebt - yr5.endTotalDebt;

  return {
    baseColumn: {
      period: 'FY24A',
      revenue: baseRev,
      revGrowth: ((baseRev / baseHist.prevRev - 1) * 100) || 15.8,
      ebitda: baseEbitda,
      ebitdaMargin: baseMarginPct,
      da: -baseHist.da,
      ebit: baseEbitda - baseHist.da,
      cashInterest: 0,
      cashTaxes: 0,
      wcAndCapex: -(baseHist.capex + 0.4),
      lfcf: baseEbitda - baseHist.capex - 0.4,
      ufcf: baseEbitda - baseHist.capex - 0.4,
      begTotalDebt: initTotalDebt,
      mandatoryAmort: 0,
      optionalCashSweep: 0,
      endSenior: initSeniorDebt,
      endSub: initSubDebt,
      endTotalDebt: initTotalDebt,
      netLeverage: baseEbitda > 0 ? initTotalDebt / baseEbitda : 0,
      interestCoverage: years[0]?.interestCoverage || 3.2,
      impliedYrEv: impliedEv,
      impliedYrEquity: sponsorEquityCheck
    },
    sourcesUses: {
      impliedEv,
      dealFees,
      totalUses,
      initSeniorDebt,
      initSubDebt,
      initTotalDebt,
      sponsorEquityCheck,
      seniorAllInRate,
      initLeverage: baseEbitda > 0 ? initTotalDebt / baseEbitda : 0
    },
    years,
    summary: {
      impliedEv,
      sponsorEquityCheck,
      exitEv: activeExitEv,
      exitEvMultiple,
      exitEvPerpetuity,
      impliedPerpetuityMultiple,
      exitEquity,
      totalDebtRepaid,
      grossMoic,
      netIrr,
      yr1NetLeverage: years[0].netLeverage,
      yr1InterestCoverage: years[0].interestCoverage
    }
  };
}

// ============================================================================
// TREESHAP CREDIT RISK & 1,000-RUN MONTE CARLO ENGINE
// ============================================================================
function computeCreditAndMonteCarlo(lboModel, qoeAddBackSharePct, dealCreditProfile, stressParams) {
  const { ebitdaSigmaPct, rateShockBps, covenantThreshold } = stressParams;

  const initLev = lboModel.sourcesUses.initLeverage;
  const yr1 = lboModel.years[0];
  const shockedInterest =
    Math.abs(yr1.cashInterest) + lboModel.sourcesUses.initTotalDebt * (rateShockBps / 10000);
  const effectiveIcr = shockedInterest > 0 ? yr1.ebitda / shockedInterest : 10.0;
  const fcfConversionPct = yr1.ebitda > 0 ? (yr1.lfcf / yr1.ebitda) * 100 : 0;
  const ebitdaMargin = lboModel.baseColumn.ebitdaMargin;
  const custConc = dealCreditProfile.customerConcentrationPct;

  // Unconditional Base 5-Yr Cumulative PD = 4.10% (410 bps)
  const basePdPct = 4.10;

  // TreeSHAP Feature Attributions (in bps of PD & Log-Odds)
  const levImpactBps = Math.round((initLev - 4.0) * 145);
  const icrImpactBps = Math.round((2.75 - effectiveIcr) * 130);
  const concImpactBps = Math.round((custConc - 18.0) * 9);
  const marginImpactBps = Math.round((23.0 - ebitdaMargin) * 11);
  const fcfImpactBps = Math.round((38.0 - fcfConversionPct) * 6);
  const qoeImpactBps = Math.round((qoeAddBackSharePct - 12.0) * 12);

  const shapFeatures = [
    {
      id: 'net_lev',
      name: 'Net Leverage Ratio (Debt / EBITDA)',
      symbol: '\\phi_{\\text{Lev}}',
      metricValue: `${initLev.toFixed(2)}x`,
      benchmark: '4.00x',
      bpsImpact: levImpactBps,
      logOdds: Number((levImpactBps / 250).toFixed(2))
    },
    {
      id: 'icr',
      name: 'Cash Interest Coverage (EBITDA / Int)',
      symbol: '\\phi_{\\text{ICR}}',
      metricValue: `${effectiveIcr.toFixed(2)}x`,
      benchmark: '2.75x',
      bpsImpact: icrImpactBps,
      logOdds: Number((icrImpactBps / 250).toFixed(2))
    },
    {
      id: 'qoe_share',
      name: 'QoE Add-Back Share of Base EBITDA',
      symbol: '\\phi_{\\text{QoE}}',
      metricValue: `${qoeAddBackSharePct.toFixed(1)}%`,
      benchmark: '12.0%',
      bpsImpact: qoeImpactBps,
      logOdds: Number((qoeImpactBps / 250).toFixed(2))
    },
    {
      id: 'fcf_conv',
      name: 'Levered FCF / EBITDA Conversion',
      symbol: '\\phi_{\\text{FCF}}',
      metricValue: `${fcfConversionPct.toFixed(1)}%`,
      benchmark: '38.0%',
      bpsImpact: fcfImpactBps,
      logOdds: Number((fcfImpactBps / 250).toFixed(2))
    },
    {
      id: 'margin_stab',
      name: 'Adjusted EBITDA Margin Cushion',
      symbol: '\\phi_{\\text{Mgn}}',
      metricValue: `${ebitdaMargin.toFixed(1)}%`,
      benchmark: '23.0%',
      bpsImpact: marginImpactBps,
      logOdds: Number((marginImpactBps / 250).toFixed(2))
    },
    {
      id: 'cust_conc',
      name: 'Top-5 Customer Concentration',
      symbol: '\\phi_{\\text{Conc}}',
      metricValue: `${custConc.toFixed(1)}%`,
      benchmark: '18.0%',
      bpsImpact: concImpactBps,
      logOdds: Number((concImpactBps / 250).toFixed(2))
    }
  ].sort((a, b) => Math.abs(b.bpsImpact) - Math.abs(a.bpsImpact));

  const totalDeltaBps = shapFeatures.reduce((s, f) => s + f.bpsImpact, 0);
  const cumulativePdPct = Math.min(42.0, Math.max(0.45, basePdPct + totalDeltaBps / 100));
  const lgdPct = dealCreditProfile.lgdPct;
  const expectedLossPct = (cumulativePdPct * lgdPct) / 100;

  let impliedRating = 'BB';
  let ratingTone = 'emerald';
  if (cumulativePdPct < 2.2) {
    impliedRating = 'BB+';
    ratingTone = 'emerald';
  } else if (cumulativePdPct < 4.5) {
    impliedRating = 'BB';
    ratingTone = 'emerald';
  } else if (cumulativePdPct < 7.2) {
    impliedRating = 'B+';
    ratingTone = 'amber';
  } else if (cumulativePdPct < 11.5) {
    impliedRating = 'B-';
    ratingTone = 'amber';
  } else {
    impliedRating = 'CCC+';
    ratingTone = 'crimson';
  }

  // 1,000-Run Deterministic Box-Muller Monte Carlo Simulation
  const numPaths = 1000;
  let seed = 9021042;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return Math.max(1e-6, seed / 4294967296);
  };
  const randNormal = () => {
    const u1 = rand();
    const u2 = rand();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  };

  const sigma = ebitdaSigmaPct / 100;
  const ratePenaltyLeverage = (rateShockBps / 100) * 0.11;
  const yr3LeverageSamples = [];

  const breachSchedule = lboModel.years.map((yrObj, idx) => {
    const t = idx + 1;
    const baseLev = yrObj.netLeverage + ratePenaltyLeverage * (t * 0.45);
    const sims = [];
    let breaches = 0;

    for (let i = 0; i < numPaths; i++) {
      const z = randNormal();
      const simLev = Math.max(0.25, baseLev * Math.exp(z * sigma * Math.sqrt(t * 0.55)));
      sims.push(simLev);
      if (simLev > covenantThreshold) breaches++;
      if (t === 3) yr3LeverageSamples.push(simLev);
    }

    sims.sort((a, b) => a - b);
    return {
      period: yrObj.period,
      medianLev: sims[Math.floor(numPaths * 0.5)],
      p90DownsideLev: sims[Math.floor(numPaths * 0.9)],
      covenantLimit: covenantThreshold,
      breachProbPct: (breaches / numPaths) * 100
    };
  });

  // Year 3 (FY27E) Net Leverage Histogram Buckets
  const buckets = [
    { range: '< 2.0x', min: 0, max: 2.0, count: 0 },
    { range: '2.0–2.5x', min: 2.0, max: 2.5, count: 0 },
    { range: '2.5–3.0x', min: 2.5, max: 3.0, count: 0 },
    { range: '3.0–3.5x', min: 3.0, max: 3.5, count: 0 },
    { range: '3.5–4.0x', min: 3.5, max: 4.0, count: 0 },
    { range: '4.0–4.5x', min: 4.0, max: 4.5, count: 0 },
    { range: '4.5–5.0x', min: 4.5, max: 5.0, count: 0 },
    { range: '> 5.0x', min: 5.0, max: 99.0, count: 0 }
  ];

  yr3LeverageSamples.forEach((val) => {
    const bucket = buckets.find((b) => val >= b.min && val < b.max) || buckets[buckets.length - 1];
    bucket.count += 1;
  });

  const histogramData = buckets.map((b) => ({
    range: b.range,
    count: b.count,
    pct: Number(((b.count / numPaths) * 100).toFixed(1)),
    isBreach: b.min >= covenantThreshold || (b.max > covenantThreshold && b.min + 0.25 >= covenantThreshold)
  }));

  return {
    impliedRating,
    ratingTone,
    basePdPct,
    cumulativePdPct,
    lgdPct,
    expectedLossPct,
    shapFeatures,
    breachSchedule,
    histogramData
  };
}

// ============================================================================
// MAIN AXIOM DILIGENCE WEBSITE + WORKBENCH + LATEX MONOGRAPH APPLICATION
// ============================================================================
export default function App() {
  const katexReady = useKatexAndFonts();

  // Top-Level Surface Navigation: 'website' | 'workbench' | 'monograph'
  const [surface, setSurface] = useState('website');

  // Global LaTeX Mode Toggle: 'symbolic' | 'numerical'
  const [latexMode, setLatexMode] = useState('numerical');

  // Deal Pipeline State
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [activeDealId, setActiveDealId] = useState('apex');
  const [activeTab, setActiveTab] = useState('cim'); // 'cim' | 'lbo' | 'credit' | 'memo'

  // Modals & Notification State
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  const [newDealModalOpen, setNewDealModalOpen] = useState(false);
  const [newDealName, setNewDealName] = useState('');
  const [newDealSector, setNewDealSector] = useState('B2B Enterprise Software');
  const [newDealRawText, setNewDealRawText] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // View 1 (CIM & QoE) Inspector State
  const [activeCimPage, setActiveCimPage] = useState(44);
  const [highlightedQoeId, setHighlightedQoeId] = useState('apex-qoe-1');

  // View 2 (LBO Workbench) State
  const activeDeal = deals[activeDealId];
  const [lboAssumptions, setLboAssumptions] = useState(activeDeal.lboDefaults);
  const [valuationMethod, setValuationMethod] = useState('multiple'); // 'multiple' | 'perpetuity'
  const [sensitivityMode, setSensitivityMode] = useState('entry_exit'); // 'entry_exit' | 'exit_growth'

  // View 3 (Credit & Monte Carlo) State
  const [creditStress, setCreditStress] = useState({
    ebitdaSigmaPct: 16.0,
    rateShockBps: 0,
    covenantThreshold: 4.5
  });

  // Keyboard listener for ⌘K / Ctrl+K Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCmdPaletteOpen(false);
        setNewDealModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  };

  const handleSelectDeal = (dealId) => {
    const target = deals[dealId];
    if (!target) return;
    setActiveDealId(dealId);
    setLboAssumptions(target.lboDefaults);
    setActiveCimPage(44);
    setHighlightedQoeId(target.qoeItems[0]?.id || null);
    setCmdPaletteOpen(false);
  };

  // --------------------------------------------------------------------------
  // DERIVED QOE & ADJUSTED EBITDA CALCULATIONS
  // --------------------------------------------------------------------------
  const qoeTotalsByYear = useMemo(() => {
    let add22 = 0;
    let add23 = 0;
    let add24 = 0;
    let grossSubmitted24 = 0;

    activeDeal.qoeItems.forEach((item) => {
      grossSubmitted24 += item.fy24;
      if (item.included) {
        const weight = item.haircutPct / 100;
        add22 += item.fy22 * weight;
        add23 += item.fy23 * weight;
        add24 += item.fy24 * weight;
      }
    });

    const hist22 = activeDeal.historicals[0];
    const hist23 = activeDeal.historicals[1];
    const hist24 = activeDeal.historicals[2];

    const adj22 = hist22.reportedEbitda + add22;
    const adj23 = hist23.reportedEbitda + add23;
    const adj24 = hist24.reportedEbitda + add24;

    return {
      add22,
      add23,
      add24,
      grossSubmitted24,
      haircutDisallow24: grossSubmitted24 - add24,
      adj22,
      adj23,
      adj24,
      margin22: (adj22 / hist22.revenue) * 100,
      margin23: (adj23 / hist23.revenue) * 100,
      margin24: (adj24 / hist24.revenue) * 100,
      qoeShareOfEbitdaPct: adj24 > 0 ? (add24 / adj24) * 100 : 0
    };
  }, [activeDeal]);

  const updateQoeItem = (itemId, changes) => {
    setDeals((prev) => {
      const current = prev[activeDealId];
      const updatedItems = current.qoeItems.map((q) =>
        q.id === itemId ? { ...q, ...changes } : q
      );
      return {
        ...prev,
        [activeDealId]: {
          ...current,
          qoeItems: updatedItems
        }
      };
    });
  };

  const inspectCitation = (pageNumber, qoeId = null) => {
    setActiveCimPage(pageNumber);
    if (qoeId) setHighlightedQoeId(qoeId);
  };

  // --------------------------------------------------------------------------
  // DERIVED LBO MODEL & 5x5 SENSITIVITY GRID
  // --------------------------------------------------------------------------
  const lboModel = useMemo(() => {
    const fy23 = activeDeal.historicals[1];
    const fy24 = activeDeal.historicals[2];
    return computeLboSchedule(
      { ...fy24, prevRev: fy23.revenue },
      qoeTotalsByYear.adj24,
      lboAssumptions,
      activeDeal.creditProfile.sofrBaseRate,
      valuationMethod
    );
  }, [activeDeal, qoeTotalsByYear.adj24, lboAssumptions, valuationMethod]);

  const sensitivityGrid = useMemo(() => {
    const fy23 = activeDeal.historicals[1];
    const fy24 = activeDeal.historicals[2];
    const baseInput = { ...fy24, prevRev: fy23.revenue };

    const exitSteps = [
      lboAssumptions.exitMultiple - 1.0,
      lboAssumptions.exitMultiple - 0.5,
      lboAssumptions.exitMultiple,
      lboAssumptions.exitMultiple + 0.5,
      lboAssumptions.exitMultiple + 1.0
    ];

    if (sensitivityMode === 'entry_exit') {
      const entrySteps = [
        lboAssumptions.entryMultiple - 1.0,
        lboAssumptions.entryMultiple - 0.5,
        lboAssumptions.entryMultiple,
        lboAssumptions.entryMultiple + 0.5,
        lboAssumptions.entryMultiple + 1.0
      ];

      return {
        rowHeaderLabel: 'Entry \\ Exit',
        colHeaders: exitSteps.map((x) => `${x.toFixed(2)}x`),
        rows: entrySteps.map((entryVal, rIdx) => ({
          rowLabel: `${entryVal.toFixed(2)}x`,
          cells: exitSteps.map((exitVal, cIdx) => {
            const res = computeLboSchedule(
              baseInput,
              qoeTotalsByYear.adj24,
              { ...lboAssumptions, entryMultiple: entryVal, exitMultiple: exitVal },
              activeDeal.creditProfile.sofrBaseRate,
              'multiple'
            );
            return {
              irr: res.summary.netIrr,
              moic: res.summary.grossMoic,
              isBaseCase: rIdx === 2 && cIdx === 2
            };
          })
        }))
      };
    } else {
      const growthSteps = [
        Math.max(2.0, lboAssumptions.revGrowthCagr - 4.0),
        Math.max(2.0, lboAssumptions.revGrowthCagr - 2.0),
        lboAssumptions.revGrowthCagr,
        lboAssumptions.revGrowthCagr + 2.0,
        lboAssumptions.revGrowthCagr + 4.0
      ];

      return {
        rowHeaderLabel: 'Growth \\ Exit',
        colHeaders: exitSteps.map((x) => `${x.toFixed(2)}x`),
        rows: growthSteps.map((gVal, rIdx) => ({
          rowLabel: `${gVal.toFixed(1)}%`,
          cells: exitSteps.map((exitVal, cIdx) => {
            const res = computeLboSchedule(
              baseInput,
              qoeTotalsByYear.adj24,
              { ...lboAssumptions, revGrowthCagr: gVal, exitMultiple: exitVal },
              activeDeal.creditProfile.sofrBaseRate,
              'multiple'
            );
            return {
              irr: res.summary.netIrr,
              moic: res.summary.grossMoic,
              isBaseCase: rIdx === 2 && cIdx === 2
            };
          })
        }))
      };
    }
  }, [activeDeal, qoeTotalsByYear.adj24, lboAssumptions, sensitivityMode]);

  // --------------------------------------------------------------------------
  // DERIVED CREDIT RISK & MONTE CARLO SIMULATION
  // --------------------------------------------------------------------------
  const creditAnalysis = useMemo(() => {
    return computeCreditAndMonteCarlo(
      lboModel,
      qoeTotalsByYear.qoeShareOfEbitdaPct,
      activeDeal.creditProfile,
      creditStress
    );
  }, [lboModel, qoeTotalsByYear.qoeShareOfEbitdaPct, activeDeal.creditProfile, creditStress]);

  // --------------------------------------------------------------------------
  // DYNAMIC LATEX EQUATIONS (SYMBOLIC VS. LIVE NUMERICAL SUBSTITUTION)
  // --------------------------------------------------------------------------
  const liveLatexFormulas = useMemo(() => {
    const rep24 = activeDeal.historicals[2].reportedEbitda;
    const adj24 = qoeTotalsByYear.adj24;
    const eq0 = lboModel.summary.sponsorEquityCheck;
    const eq5 = lboModel.summary.exitEquity;
    const irr = lboModel.summary.netIrr;
    const moic = lboModel.summary.grossMoic;
    const yr5Ufcf = lboModel.years[4].ufcf;
    const wacc = lboAssumptions.waccPct || 11.2;
    const g = lboAssumptions.perpGrowthPct || 3.25;
    const tvPerp = lboModel.summary.exitEvPerpetuity;

    const qoeTermsNumeric = activeDeal.qoeItems
      .filter((i) => i.included)
      .map((i) => `${(i.haircutPct / 100).toFixed(2)}(${i.fy24.toFixed(2)})`)
      .join(' + ');

    return {
      qoe: {
        symbolic:
          '\\text{EBITDA}_{\\text{Adj}} = \\text{EBITDA}_{\\text{GAAP}} + \\sum_{i=1}^{K} \\alpha_i \\cdot \\Delta_i \\cdot \\mathbb{I}(c_i \\ge \\tau)',
        numerical: `\\text{EBITDA}_{\\text{Adj}} = \\$${rep24.toFixed(2)}\\text{M} + \\Big[ ${
          qoeTermsNumeric || '0'
        } \\Big] = \\mathbf{\\$${adj24.toFixed(2)}\\text{M}}`
      },
      irr: {
        symbolic:
          '0 = -E_0 + \\sum_{t=1}^{T-1} \\frac{\\text{CFD}_t}{(1 + \\text{IRR})^t} + \\frac{\\text{EV}_T - D_T}{(1 + \\text{IRR})^T} \\implies \\text{IRR} = \\left(\\frac{E_T}{E_0}\\right)^{\\frac{1}{T}} - 1',
        numerical: `\\text{IRR} = \\left( \\frac{\\$${eq5.toFixed(1)}\\text{M}}{\\$${eq0.toFixed(
          1
        )}\\text{M}} \\right)^{\\frac{1}{5}} - 1 = (${moic.toFixed(
          2
        )}\\text{x})^{0.20} - 1 = \\mathbf{${irr.toFixed(1)}\\%}`
      },
      perpetuity: {
        symbolic:
          '\\text{TV}_T = \\sum_{t=1}^{\\infty} \\frac{\\text{UFCF}_T (1 + g)^t}{(1 + \\text{WACC})^t} = \\frac{\\text{UFCF}_T (1 + g)}{\\text{WACC} - g} \\quad (\\text{for } \\text{WACC} > g)',
        numerical: `\\text{TV}_5 = \\sum_{t=1}^{\\infty} \\frac{\\$${yr5Ufcf.toFixed(
          2
        )}\\text{M} (1 + ${(g / 100).toFixed(4)})^t}{(1 + ${(wacc / 100).toFixed(
          4
        )})^t} = \\frac{\\$${(yr5Ufcf * (1 + g / 100)).toFixed(2)}\\text{M}}{${(
          (wacc - g) /
          100
        ).toFixed(4)}} = \\mathbf{\\$${tvPerp.toFixed(1)}\\text{M}}`
      },
      shap: {
        symbolic:
          '\\phi_i(f, x) = \\sum_{S \\subseteq F \\setminus \\{i\\}} \\frac{|S|! (|F| - |S| - 1)!}{|F|!} \\big[ f_x(S \\cup \\{i\\}) - f_x(S) \\big] \\xrightarrow{\\text{TreeSHAP}} \\mathcal{O}(T L D^2)',
        numerical: `\\text{PD}_{5\\text{Y}}(x) = \\underbrace{${creditAnalysis.basePdPct.toFixed(
          2
        )}\\%}_{\\mathbb{E}[f(x)]} + \\Big( \\underbrace{${
          creditAnalysis.shapFeatures[0].bpsImpact >= 0 ? '+' : ''
        }${(creditAnalysis.shapFeatures[0].bpsImpact / 100).toFixed(2)}\\%}_{\\phi_{\\text{1}}} + \\dots \\Big) = \\mathbf{${creditAnalysis.cumulativePdPct.toFixed(
          2
        )}\\%} \\; (\\text{Rating: } \\mathbf{${creditAnalysis.impliedRating}})`
      },
      monteCarlo: {
        symbolic:
          'd\\text{EBITDA}_t = \\mu \\, \\text{EBITDA}_t \\, dt + \\sigma \\, \\text{EBITDA}_t \\, dW_t, \\quad \\mathbb{P}(\\text{Breach}_t) = \\frac{1}{N} \\sum_{k=1}^{N} \\mathbb{I}\\!\\left( \\frac{D_{t,k}}{\\text{EBITDA}_{t,k}} > \\bar{L}_{\\max} \\right)',
        numerical: `\\mathbb{P}(\\text{Breach}_{\\text{FY27E}}) = \\frac{1}{1000} \\sum_{k=1}^{1000} \\mathbb{I}\\!\\left( L_{3,k} > ${creditStress.covenantThreshold.toFixed(
          2
        )}\\text{x} \\;\\Big|\\; \\sigma=${creditStress.ebitdaSigmaPct.toFixed(
          1
        )}\\% \\right) = \\mathbf{${creditAnalysis.breachSchedule[2].breachProbPct.toFixed(1)}\\%}`
      }
    };
  }, [activeDeal, qoeTotalsByYear, lboModel, lboAssumptions, creditAnalysis, creditStress]);

  // --------------------------------------------------------------------------
  // EXPORT & NEW DEAL HANDLERS
  // --------------------------------------------------------------------------
  const handleExportCsv = () => {
    const periods = [lboModel.baseColumn, ...lboModel.years];
    const headerRow = ['Line Item ($M)', ...periods.map((p) => p.period)].join(',');

    const buildRow = (label, getter) =>
      [`"${label}"`, ...periods.map((p) => Number(getter(p)).toFixed(2))].join(',');

    const csvLines = [
      `# AXIOM DILIGENCE — INSTITUTIONAL LBO & QOE UNDERWRITING SCHEDULE`,
      `# Deal: ${activeDeal.name} (${activeDeal.codename}) | Sector: ${activeDeal.sector}`,
      `# Implied EV: $${lboModel.summary.impliedEv.toFixed(2)}M | Net IRR: ${lboModel.summary.netIrr.toFixed(2)}% | Gross MOIC: ${lboModel.summary.grossMoic.toFixed(2)}x`,
      headerRow,
      buildRow('Revenue', (p) => p.revenue),
      buildRow('Adjusted EBITDA', (p) => p.ebitda),
      buildRow('(-) D&A', (p) => p.da),
      buildRow('EBIT', (p) => p.ebit),
      buildRow('(-) Cash Interest', (p) => p.cashInterest),
      buildRow('(-) Cash Taxes', (p) => p.cashTaxes),
      buildRow('(+) Working Capital & CapEx', (p) => p.wcAndCapex),
      buildRow('Levered Free Cash Flow (LFCF)', (p) => p.lfcf),
      buildRow('Unlevered Free Cash Flow (UFCF)', (p) => p.ufcf),
      buildRow('Beginning Total Debt', (p) => p.begTotalDebt),
      buildRow('(-) Mandatory Amortization', (p) => p.mandatoryAmort),
      buildRow('(-) Optional Cash Sweep', (p) => p.optionalCashSweep),
      buildRow('Ending Senior Term Loan', (p) => p.endSenior),
      buildRow('Ending Subordinated Mezzanine', (p) => p.endSub),
      buildRow('Ending Total Debt', (p) => p.endTotalDebt),
      buildRow('Net Debt / EBITDA (x)', (p) => p.netLeverage)
    ].join('\n');

    const blob = new Blob([csvLines], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Axiom_Diligence_${activeDeal.name.replace(/[^a-zA-Z0-9]/g, '_')}_LBO.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Exported ${activeDeal.name} LBO schedule (.csv)`);
  };

  const handleCreateCustomDeal = (e) => {
    e.preventDefault();
    const cleanName = newDealName.trim() || 'Orion Industrial Automation, Inc.';
    const nums = newDealRawText.match(/\d+(\.\d+)?/g)?.map(Number) || [];
    const parsedRev24 = nums.find((n) => n >= 15 && n <= 400) || 64.0;
    const parsedEbitda24 =
      nums.find((n) => n >= 3 && n < parsedRev24 * 0.45) || Number((parsedRev24 * 0.22).toFixed(1));

    const newId = `deal_${Date.now()}`;
    const rev22 = Number((parsedRev24 * 0.76).toFixed(1));
    const rev23 = Number((parsedRev24 * 0.88).toFixed(1));

    const createdDeal = {
      id: newId,
      name: cleanName,
      codename: `Project ${cleanName.split(' ')[0]}`,
      sector: newDealSector,
      stage: 'Initial Screen',
      hq: 'Chicago, IL',
      advisor: 'William Blair & Co.',
      cimPages: 92,
      cimFileName: `${cleanName.replace(/\s+/g, '_')}_CIM_FY24.pdf`,
      headlineEv: Number(((parsedEbitda24 + 1.8) * 9.0).toFixed(1)),
      historicals: [
        {
          year: 'FY22A',
          revenue: rev22,
          cogs: Number((rev22 * 0.52).toFixed(1)),
          grossProfit: Number((rev22 * 0.48).toFixed(1)),
          opex: Number((rev22 * 0.28).toFixed(1)),
          reportedEbitda: Number((parsedEbitda24 * 0.74).toFixed(1)),
          da: 1.4,
          capex: 1.9,
          nwc: 3.8
        },
        {
          year: 'FY23A',
          revenue: rev23,
          cogs: Number((rev23 * 0.51).toFixed(1)),
          grossProfit: Number((rev23 * 0.49).toFixed(1)),
          opex: Number((rev23 * 0.27).toFixed(1)),
          reportedEbitda: Number((parsedEbitda24 * 0.87).toFixed(1)),
          da: 1.6,
          capex: 2.2,
          nwc: 4.3
        },
        {
          year: 'FY24A',
          revenue: parsedRev24,
          cogs: Number((parsedRev24 * 0.5).toFixed(1)),
          grossProfit: Number((parsedRev24 * 0.5).toFixed(1)),
          opex: Number((parsedRev24 * 0.5 - parsedEbitda24).toFixed(1)),
          reportedEbitda: parsedEbitda24,
          da: 1.8,
          capex: 2.5,
          nwc: 4.9
        }
      ],
      qoeItems: [
        {
          id: `${newId}-q1`,
          label: 'Founder compensation normalization to market CEO package',
          category: 'Executive Normalization',
          fy22: 0.7,
          fy23: 0.85,
          fy24: 1.1,
          included: true,
          haircutPct: 100,
          confidence: 'Verified',
          page: 44,
          sectionRef: 'Footnote 4A · Executive Compensation',
          verbatimQuote: `Extracted from uploaded CIM excerpt: Founder cash compensation exceeded post-closing employment contract by $1,100,000 in FY24.`
        },
        {
          id: `${newId}-q2`,
          label: 'One-time ERP cutover & warehouse consolidation costs',
          category: 'Operational Transition',
          fy22: 0.0,
          fy23: 0.3,
          fy24: 0.7,
          included: true,
          haircutPct: 100,
          confidence: 'Verified',
          page: 44,
          sectionRef: 'Footnote 4B · Non-Recurring Integration',
          verbatimQuote: `Verified third-party system integrator invoices totaling $700,000 completed in Q4 FY24.`
        },
        {
          id: `${newId}-q3`,
          label: 'Uncontracted pro-forma pricing uplift (Disallowed)',
          category: 'Pro-Forma Synergies',
          fy22: 0.0,
          fy23: 0.0,
          fy24: 1.25,
          included: false,
          haircutPct: 0,
          confidence: 'Aggressive',
          page: 52,
          sectionRef: 'Management Adj 5 · Unverified Pricing',
          verbatimQuote: `Management projects $1.25M of FY25 list-price increases not yet backed by executed customer addenda.`
        }
      ],
      cimPagesContent: {
        38: {
          pageNumber: 38,
          title: 'Section 3.1 — Consolidated Statements of Operations',
          subtitle: `${cleanName} · Audited Historicals FY22A–FY24A ($M)`,
          narrative:
            newDealRawText.trim() ||
            `${cleanName} delivered $${parsedRev24.toFixed(1)}M of revenue and $${parsedEbitda24.toFixed(1)}M of reported GAAP EBITDA in FY24A.`,
          tableRows: [
            { item: 'Total Consolidated Revenue', fy22: `$${rev22}M`, fy23: `$${rev23}M`, fy24: `$${parsedRev24}M`, isBold: true },
            { item: 'Reported GAAP EBITDA', fy22: `$${(parsedEbitda24 * 0.74).toFixed(1)}M`, fy23: `$${(parsedEbitda24 * 0.87).toFixed(1)}M`, fy24: `$${parsedEbitda24}M`, isBold: true }
          ]
        },
        44: {
          pageNumber: 44,
          title: 'Section 4.2 — Quality of Earnings EBITDA Bridge',
          subtitle: 'Extracted QoE Footnotes & Normalization Schedule',
          narrative: 'Independent review verified $1.80M of structural add-backs for FY24A.',
          tableRows: [
            { item: 'Reported GAAP EBITDA', fy22: `$${(parsedEbitda24 * 0.74).toFixed(2)}M`, fy23: `$${(parsedEbitda24 * 0.87).toFixed(2)}M`, fy24: `$${parsedEbitda24.toFixed(2)}M`, isBold: true },
            { item: '(+) Founder Compensation Normalization', fy22: '$0.70M', fy23: '$0.85M', fy24: '$1.10M', refId: `${newId}-q1` },
            { item: '(+) One-Time ERP Cutover & Consolidation', fy22: '—', fy23: '$0.30M', fy24: '$0.70M', refId: `${newId}-q2` }
          ]
        },
        52: {
          pageNumber: 52,
          title: 'Section 5.4 — Commercial & Pro-Forma Review',
          subtitle: 'Customer Concentration & Disallowed Synergies',
          narrative: 'Uncontracted pricing uplift ($1.25M) is excluded from baseline underwriting.',
          tableRows: [
            { item: '(+) Uncontracted Pricing Uplift (Disallowed)', fy22: '—', fy23: '—', fy24: '$1.25M', refId: `${newId}-q3` }
          ]
        }
      },
      lboDefaults: {
        entryMultiple: 9.0,
        exitMultiple: 9.5,
        revGrowthCagr: 12.5,
        marginExpansionBps: 125,
        seniorDebtMultiple: 3.5,
        seniorSpreadBps: 325,
        subDebtMultiple: 0.75,
        subInterestRate: 11.5,
        cashSweepPct: 85,
        capexPctRev: 4.0,
        nwcPctDeltaRev: 7.5,
        taxRate: 25.0,
        waccPct: 11.0,
        perpGrowthPct: 3.0
      },
      creditProfile: {
        sofrBaseRate: 4.5,
        customerConcentrationPct: 17.5,
        marginStabilityScore: 82,
        lgdPct: 33.0
      }
    };

    setDeals((prev) => ({ ...prev, [newId]: createdDeal }));
    setActiveDealId(newId);
    setLboAssumptions(createdDeal.lboDefaults);
    setActiveCimPage(44);
    setHighlightedQoeId(`${newId}-q1`);
    setNewDealModalOpen(false);
    setSurface('workbench');
    setNewDealName('');
    setNewDealRawText('');
    showToast(`Parsed & initialized ${cleanName} in Axiom Workbench`);
  };

  // Generate formatted Markdown / LaTeX text for IC Memo copy/download
  const memoMarkdownText = useMemo(() => {
    const d = activeDeal;
    const s = lboModel.summary;
    const su = lboModel.sourcesUses;
    const cr = creditAnalysis;
    return `AXIOM DILIGENCE · INSTITUTIONAL UNDERWRITING ENGINE
INVESTMENT COMMITTEE PRE-SCREEN MEMORANDUM
====================================================================
TARGET:          ${d.name} (${d.codename})
SECTOR:          ${d.sector} (${d.hq})
SELL-SIDE:       ${d.advisor} (${d.cimPages}-page CIM audited)
STAGE:           ${d.stage}
IC VERDICT:      ${
      s.netIrr >= 20.0 && cr.cumulativePdPct < 7.0
        ? 'RECOMMENDED FOR BINDING LOI / IC APPROVAL'
        : 'CONDITIONAL APPROVAL — SUBJECT TO VALUATION / LEVERAGE DISCIPLINE'
    }

I. EXECUTIVE SUMMARY & MATHEMATICAL THESIS
--------------------------------------------------------------------
We are evaluating the buyout of ${d.name} at a ${lboAssumptions.entryMultiple.toFixed(2)}x entry multiple on FY24A Underwritten Adjusted EBITDA of $${qoeTotalsByYear.adj24.toFixed(2)}M (${qoeTotalsByYear.margin24.toFixed(1)}% margin), implying an Enterprise Value of $${s.impliedEv.toFixed(1)}M. Following deterministic Quality of Earnings (QoE) footnote verification, Axiom Diligence credited $${qoeTotalsByYear.add24.toFixed(2)}M of structural add-backs while disallowing $${qoeTotalsByYear.haircutDisallow24.toFixed(2)}M of unverified management adjustments.

Under our base case operating model (${lboAssumptions.revGrowthCagr.toFixed(1)}% 5-year revenue CAGR and +${lboAssumptions.marginExpansionBps}bps margin expansion), the transaction deleverages from ${su.initLeverage.toFixed(2)}x at close to ${lboModel.years[4].netLeverage.toFixed(2)}x by FY29E, generating a net levered IRR of ${s.netIrr.toFixed(1)}% and ${s.grossMoic.toFixed(2)}x Gross MOIC.

II. SOURCES & USES OF FUNDS ($ MILLIONS)
--------------------------------------------------------------------
Senior Term Loan (${lboAssumptions.seniorDebtMultiple.toFixed(2)}x):     $${su.initSeniorDebt.toFixed(2)}M  (${((su.initSeniorDebt / su.totalUses) * 100).toFixed(1)}%)
Subordinated Mezzanine (${lboAssumptions.subDebtMultiple.toFixed(2)}x): $${su.initSubDebt.toFixed(2)}M  (${((su.initSubDebt / su.totalUses) * 100).toFixed(1)}%)
Sponsor Equity Check:              $${su.sponsorEquityCheck.toFixed(2)}M  (${((su.sponsorEquityCheck / su.totalUses) * 100).toFixed(1)}%)
TOTAL SOURCES / TOTAL USES:        $${su.totalUses.toFixed(2)}M  (Includes $${su.dealFees.toFixed(2)}M fees)

III. TREESHAP CREDIT ATTRIBUTION & MONTE CARLO STRESS
--------------------------------------------------------------------
Implied Credit Rating:             ${cr.impliedRating}
5-Yr Cumulative Default Prob (PD): ${cr.cumulativePdPct.toFixed(2)}% (LGD: ${cr.lgdPct.toFixed(1)}%)
Year 1 Cash Interest Coverage:     ${s.yr1InterestCoverage.toFixed(2)}x
FY27E (Yr 3) Covenant Breach Prob: ${cr.breachSchedule[2].breachProbPct.toFixed(1)}% at ${creditStress.covenantThreshold.toFixed(2)}x ceiling
`;
  }, [activeDeal, lboModel, qoeTotalsByYear, lboAssumptions, creditAnalysis, creditStress]);

  // Command Palette Actions
  const commandActions = [
    {
      label: 'Open Surface: Axiom Diligence Product Website',
      category: 'Surface',
      action: () => setSurface('website')
    },
    {
      label: 'Open Surface: Live Institutional Workbench',
      category: 'Surface',
      action: () => setSurface('workbench')
    },
    {
      label: 'Open Surface: Mathematical Monograph (LaTeX Whitepaper)',
      category: 'Surface',
      action: () => setSurface('monograph')
    },
    {
      label: 'Workbench 01: CIM & QoE Audit Inspector',
      category: 'Workbench',
      action: () => {
        setSurface('workbench');
        setActiveTab('cim');
      }
    },
    {
      label: 'Workbench 02: LBO & Infinite Geometric Series Valuation',
      category: 'Workbench',
      action: () => {
        setSurface('workbench');
        setActiveTab('lbo');
      }
    },
    {
      label: 'Workbench 03: TreeSHAP Credit & Monte Carlo Stress',
      category: 'Workbench',
      action: () => {
        setSurface('workbench');
        setActiveTab('credit');
      }
    },
    {
      label: 'Workbench 04: Investment Committee Pre-Screen Memo',
      category: 'Workbench',
      action: () => {
        setSurface('workbench');
        setActiveTab('memo');
      }
    },
    ...Object.values(deals).map((d) => ({
      label: `Load Deal: ${d.name} (${d.sector})`,
      category: 'Deals',
      action: () => {
        handleSelectDeal(d.id);
        setSurface('workbench');
      }
    })),
    {
      label: 'Toggle LaTeX Mode: Symbolic vs. Live Deal Numbers',
      category: 'LaTeX Engine',
      action: () => setLatexMode((prev) => (prev === 'symbolic' ? 'numerical' : 'symbolic'))
    },
    {
      label: 'Export 5-Year LBO Schedule to Excel (.csv)',
      category: 'Export',
      action: handleExportCsv
    }
  ].filter(
    (item) =>
      !cmdSearch.trim() ||
      item.label.toLowerCase().includes(cmdSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  const currentCimPageObj =
    activeDeal.cimPagesContent[activeCimPage] || activeDeal.cimPagesContent[44];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#111110] antialiased selection:bg-[#0044CC]/15 selection:text-[#0044CC]"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", fontSize: '13px' }}
    >
      {/* ====================================================================
          GLOBAL TOP NAVIGATION BAR (AXIOM DILIGENCE WEBSITE + PRODUCT SHELL)
         ==================================================================== */}
      <header className="h-14 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E4E2DC] px-4 lg:px-8 flex items-center justify-between gap-4 sticky top-0 z-40">
        {/* Brand Identity */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setSurface('website')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-7 h-7 rounded-[4px] bg-[#111110] text-[#FAF9F5] flex items-center justify-center font-serif text-[16px] font-semibold tracking-tight shadow-sm group-hover:bg-[#0044CC] transition-colors">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-[15px] font-semibold tracking-tight text-[#111110]"
                  style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                >
                  Axiom Diligence
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#F3F1EC] border border-[#E4E2DC] text-[#575653]">
                  v2.4
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#787774] hidden sm:block">
                Deterministic Financial AI · LBO & TreeSHAP Credit Engine
              </div>
            </div>
          </button>

          {/* Primary Surface Switcher Pills */}
          <nav className="hidden md:flex items-center bg-[#F3F1EC] p-1 rounded-[6px] border border-[#E4E2DC]">
            {[
              { id: 'website', label: 'Product Website' },
              { id: 'workbench', label: 'Live Deal Workbench', badge: 'Interactive' },
              { id: 'monograph', label: 'Mathematical Monograph (LaTeX)' }
            ].map((item) => {
              const active = surface === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSurface(item.id)}
                  className={`px-3 py-1 rounded-[4px] text-[12px] font-medium transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-[#111110] shadow-[0_1px_2px_rgba(0,0,0,0.06)] font-semibold'
                      : 'text-[#575653] hover:text-[#111110]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Controls: Global LaTeX Mode Switcher, ⌘K Search, and Launch CTA */}
        <div className="flex items-center gap-2.5">
          {toastMessage && (
            <div className="hidden lg:flex px-2.5 py-1 rounded bg-[#E6F4F1] border border-[#0F766E]/30 text-[#0F766E] text-[11px] font-mono items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Global Symbolic vs. Numerical LaTeX Switch */}
          <div className="hidden sm:flex items-center bg-[#F3F1EC] p-0.5 rounded-[5px] border border-[#E4E2DC] text-[11px] font-mono">
            <button
              onClick={() => setLatexMode('symbolic')}
              className={`px-2 py-1 rounded-[3px] transition-colors ${
                latexMode === 'symbolic'
                  ? 'bg-[#111110] text-white font-semibold'
                  : 'text-[#575653] hover:text-[#111110]'
              }`}
              title="Display pure symbolic LaTeX equations"
            >
              Symbolic LaTeX
            </button>
            <button
              onClick={() => setLatexMode('numerical')}
              className={`px-2 py-1 rounded-[3px] transition-colors ${
                latexMode === 'numerical'
                  ? 'bg-[#0044CC] text-white font-semibold'
                  : 'text-[#575653] hover:text-[#111110]'
              }`}
              title="Substitute live active deal numbers into every LaTeX formula"
            >
              Live Deal Numbers
            </button>
          </div>

          <button
            onClick={() => setCmdPaletteOpen(true)}
            className="px-2.5 py-1.5 bg-white hover:bg-[#F3F1EC] border border-[#E4E2DC] rounded-[5px] flex items-center gap-2 text-[12px] text-[#575653] transition-colors"
          >
            <Search className="w-3.5 h-3.5 text-[#787774]" />
            <span className="hidden xl:inline">Search deals or formulas...</span>
            <kbd className="text-[10px] font-mono text-[#787774] bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#E4E2DC]">
              ⌘K
            </kbd>
          </button>

          {surface === 'website' ? (
            <button
              onClick={() => setSurface('workbench')}
              className="px-3.5 py-1.5 rounded-[5px] bg-[#111110] hover:bg-[#272725] text-white text-[12px] font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Open Live Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setNewDealModalOpen(true)}
              className="px-3 py-1.5 rounded-[5px] bg-[#0044CC] hover:bg-[#0036A3] text-white text-[12px] font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload CIM</span>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Surface Switcher Bar */}
      <div className="md:hidden bg-[#F3F1EC] border-b border-[#E4E2DC] px-4 py-2 flex items-center justify-between gap-2">
        {[
          { id: 'website', label: 'Website' },
          { id: 'workbench', label: 'Workbench' },
          { id: 'monograph', label: 'LaTeX Monograph' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSurface(item.id)}
            className={`flex-1 py-1 rounded text-[11px] font-medium ${
              surface === item.id ? 'bg-[#111110] text-white' : 'text-[#575653]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ====================================================================
          SURFACE 1: EDITORIAL PRODUCT WEBSITE (AXIOMDILIGENCE.COM)
         ==================================================================== */}
      {surface === 'website' && (
        <main className="flex-1">
          {/* 1. EDITORIAL HERO SECTION */}
          <section className="border-b border-[#E4E2DC] bg-gradient-to-b from-[#FAF9F5] to-[#F3F1EC]/50 py-14 lg:py-20 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left 6 Cols: Editorial Value Proposition */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#E4E2DC] text-[11px] font-mono text-[#575653] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                  <span>AXIOM DILIGENCE · MATHEMATICAL DEAL INFRASTRUCTURE</span>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111110] leading-[1.06]"
                  style={{ fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif" }}
                >
                  From unstructured CIM to auditable{' '}
                  <span className="italic font-normal text-[#0044CC]">LBO &amp; TreeSHAP</span>{' '}
                  underwriting in 90 seconds.
                </h1>

                <p className="text-[15px] text-[#575653] leading-relaxed max-w-xl">
                  Private equity and private credit teams spend hundreds of hours manually re-keying PDF tables into brittle spreadsheets. Axiom Diligence combines deterministic document parsing with exact polynomial-time game-theoretic credit attribution—linking every cell and{' '}
                  <LatexBlock display={false} tex="\LaTeX" katexReady={katexReady} /> equation back to a verbatim CIM footnote.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSurface('workbench');
                      setActiveTab('cim');
                    }}
                    className="px-5 py-2.5 rounded-[5px] bg-[#111110] hover:bg-[#272725] text-white text-[13px] font-medium flex items-center gap-2 transition-all shadow-sm"
                  >
                    <span>Launch Interactive Deal Workbench</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSurface('monograph')}
                    className="px-4 py-2.5 rounded-[5px] bg-white hover:bg-[#F3F1EC] text-[#111110] border border-[#D5D3CD] text-[13px] font-medium flex items-center gap-2 transition-colors"
                  >
                    <Sigma className="w-4 h-4 text-[#0044CC]" />
                    <span>Read Mathematical Monograph (LaTeX)</span>
                  </button>
                </div>

                {/* Live Institutional Proof Metrics */}
                <div className="pt-6 border-t border-[#E4E2DC] grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-[22px] font-mono font-bold text-[#111110]">O(T·L·D²)</div>
                    <div className="text-[11px] text-[#575653] mt-0.5">
                      Polynomial TreeSHAP Credit Attribution (vs. NP-Hard{' '}
                      <LatexBlock display={false} tex="2^M" katexReady={katexReady} />)
                    </div>
                  </div>
                  <div>
                    <div className="text-[22px] font-mono font-bold text-[#0F766E]">100%</div>
                    <div className="text-[11px] text-[#575653] mt-0.5">
                      Verbatim CIM Page &amp; Footnote Provenance
                    </div>
                  </div>
                  <div>
                    <div className="text-[22px] font-mono font-bold text-[#0044CC]">1,000 Runs</div>
                    <div className="text-[11px] text-[#575653] mt-0.5">
                      Real-Time Stochastic SDE Covenant Simulation
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 6 Cols: Interactive Live Deal & LaTeX Telemetry Card */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-[#D5D3CD] rounded-[6px] shadow-[0_12px_32px_rgba(17,17,16,0.06)] overflow-hidden">
                  {/* Card Window Header */}
                  <div className="px-4 py-3 bg-[#F3F1EC] border-b border-[#E4E2DC] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#111110]" />
                      <span className="font-mono text-[11px] font-semibold text-[#111110]">
                        LIVE UNDERWRITING KERNEL — {activeDeal.name.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {Object.values(deals).map((d) => (
                        <button
                          key={d.id}
                          onClick={() => handleSelectDeal(d.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                            activeDealId === d.id
                              ? 'bg-[#111110] text-white font-semibold'
                              : 'bg-white text-[#575653] border border-[#E4E2DC] hover:text-[#111110]'
                          }`}
                        >
                          {d.codename.replace('Project ', '')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Mini Playground Body */}
                  <div className="p-5 space-y-4">
                    {/* Interactive Sliders right in the Hero */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF9F5] p-3 rounded-[4px] border border-[#E4E2DC]">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-[#575653]">Entry Multiple</span>
                          <span className="font-bold text-[#0044CC]">
                            {lboAssumptions.entryMultiple.toFixed(2)}x
                          </span>
                        </div>
                        <input
                          type="range"
                          min={7.0}
                          max={13.0}
                          step={0.25}
                          value={lboAssumptions.entryMultiple}
                          onChange={(e) =>
                            setLboAssumptions((p) => ({
                              ...p,
                              entryMultiple: parseFloat(e.target.value)
                            }))
                          }
                          className="w-full mt-1.5 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-[#575653]">Rev Growth CAGR</span>
                          <span className="font-bold text-[#0044CC]">
                            {lboAssumptions.revGrowthCagr.toFixed(1)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={5.0}
                          max={20.0}
                          step={0.5}
                          value={lboAssumptions.revGrowthCagr}
                          onChange={(e) =>
                            setLboAssumptions((p) => ({
                              ...p,
                              revGrowthCagr: parseFloat(e.target.value)
                            }))
                          }
                          className="w-full mt-1.5 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono">
                          <span className="text-[#575653]">Senior Debt</span>
                          <span className="font-bold text-[#0044CC]">
                            {lboAssumptions.seniorDebtMultiple.toFixed(2)}x
                          </span>
                        </div>
                        <input
                          type="range"
                          min={2.0}
                          max={4.5}
                          step={0.25}
                          value={lboAssumptions.seniorDebtMultiple}
                          onChange={(e) =>
                            setLboAssumptions((p) => ({
                              ...p,
                              seniorDebtMultiple: parseFloat(e.target.value)
                            }))
                          }
                          className="w-full mt-1.5 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Live LaTeX Equation Render Box */}
                    <div className="p-3.5 rounded-[4px] bg-[#FAF9F5] border border-[#E4E2DC] space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                        <span>Live Typeset Underwriting Identity (LaTeX)</span>
                        <span className="text-[#0044CC]">
                          {latexMode === 'numerical' ? 'Live Deal Substitution' : 'Symbolic Form'}
                        </span>
                      </div>
                      <div className="py-1 px-2 bg-white border border-[#E4E2DC] rounded">
                        <LatexBlock
                          tex={
                            latexMode === 'numerical'
                              ? liveLatexFormulas.irr.numerical
                              : liveLatexFormulas.irr.symbolic
                          }
                          katexReady={katexReady}
                        />
                      </div>
                      <div className="py-1 px-2 bg-white border border-[#E4E2DC] rounded">
                        <LatexBlock
                          tex={
                            latexMode === 'numerical'
                              ? liveLatexFormulas.shap.numerical
                              : liveLatexFormulas.shap.symbolic
                          }
                          katexReady={katexReady}
                        />
                      </div>
                    </div>

                    {/* Output Telemetry Grid */}
                    <div className="grid grid-cols-4 gap-2.5 font-mono">
                      <div className="p-2.5 rounded border border-[#E4E2DC] bg-white">
                        <div className="text-[10px] text-[#787774]">ADJ. EBITDA</div>
                        <div className="text-[15px] font-bold text-[#111110] mt-0.5">
                          {fmtCurrency(qoeTotalsByYear.adj24, 2)}
                        </div>
                      </div>
                      <div className="p-2.5 rounded border border-[#E4E2DC] bg-white">
                        <div className="text-[10px] text-[#787774]">IMPLIED EV</div>
                        <div className="text-[15px] font-bold text-[#111110] mt-0.5">
                          {fmtCurrency(lboModel.summary.impliedEv, 1)}
                        </div>
                      </div>
                      <div className="p-2.5 rounded border border-[#E4E2DC] bg-[#E6F4F1]/60">
                        <div className="text-[10px] text-[#0F766E]">NET IRR / MOIC</div>
                        <div className="text-[15px] font-bold text-[#0F766E] mt-0.5">
                          {lboModel.summary.netIrr.toFixed(1)}% / {lboModel.summary.grossMoic.toFixed(2)}x
                        </div>
                      </div>
                      <div className="p-2.5 rounded border border-[#E4E2DC] bg-white">
                        <div className="text-[10px] text-[#787774]">5Y DEFAULT PD</div>
                        <div className="text-[15px] font-bold text-[#111110] mt-0.5">
                          {creditAnalysis.cumulativePdPct.toFixed(2)}% ({creditAnalysis.impliedRating})
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card Footer Link */}
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-[#575653] font-mono">
                        Source: {activeDeal.cimFileName} ({activeDeal.cimPages}p)
                      </span>
                      <button
                        onClick={() => {
                          setSurface('workbench');
                          setActiveTab('lbo');
                        }}
                        className="font-mono font-semibold text-[#0044CC] hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Full 5-Yr Schedule</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. MATHEMATICAL & COMPUTER SCIENCE FOUNDATION SECTION */}
          <section className="py-16 px-6 lg:px-12 border-b border-[#E4E2DC] bg-white">
            <div className="max-w-7xl mx-auto space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#0044CC]">
                  Computer Science × Financial Mathematics
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-normal text-[#111110]"
                  style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                >
                  Why legacy LLM wrappers fail institutional investment committees.
                </h2>
                <p className="text-[14px] text-[#575653] leading-relaxed">
                   Language models hallucinate arithmetic, while black-box credit models cannot explain covenant risk to an Investment Committee. Axiom Diligence separates unstructured document parsing from deterministic mathematical execution.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pillar 1 */}
                <div className="p-6 rounded-[6px] border border-[#E4E2DC] bg-[#FAF9F5] flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E4E2DC] text-[#111110]">
                        01 · Deterministic QoE Parser
                      </span>
                      <FileText className="w-4 h-4 text-[#575653]" />
                    </div>
                    <h3
                      className="text-xl font-medium text-[#111110]"
                      style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                      Zero-Hallucination Footnote &amp; Haircut Reconciliation
                    </h3>
                    <p className="text-[13px] text-[#575653] leading-relaxed">
                      Every extracted Quality of Earnings add-back is bound to its exact page coordinate and verbatim legal footnote, weighted by an analyst-controlled haircut{' '}
                      <LatexBlock display={false} tex="\alpha_i \in [0, 1]" katexReady={katexReady} />:
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E4E2DC]">
                    <LatexBlock
                      tex={
                        latexMode === 'numerical'
                          ? liveLatexFormulas.qoe.numerical
                          : liveLatexFormulas.qoe.symbolic
                      }
                      katexReady={katexReady}
                    />
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 rounded-[6px] border border-[#E4E2DC] bg-[#FAF9F5] flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E4E2DC] text-[#0044CC]">
                        02 · Convergent Series Valuation
                      </span>
                      <Sigma className="w-4 h-4 text-[#0044CC]" />
                    </div>
                    <h3
                      className="text-xl font-medium text-[#111110]"
                      style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                      Infinite Geometric Series Terminal Value &amp; LBO Sweep
                    </h3>
                    <p className="text-[13px] text-[#575653] leading-relaxed">
                      Cross-check exit multiple assumptions against the exact closed-form convergent infinite geometric series of perpetual unlevered free cash flows when{' '}
                      <LatexBlock display={false} tex="\text{WACC} > g" katexReady={katexReady} />:
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E4E2DC]">
                    <LatexBlock
                      tex={
                        latexMode === 'numerical'
                          ? liveLatexFormulas.perpetuity.numerical
                          : liveLatexFormulas.perpetuity.symbolic
                      }
                      katexReady={katexReady}
                    />
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 rounded-[6px] border border-[#E4E2DC] bg-[#FAF9F5] flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E4E2DC] text-[#0F766E]">
                        03 · Polynomial TreeSHAP
                      </span>
                      <Cpu className="w-4 h-4 text-[#0F766E]" />
                    </div>
                    <h3
                      className="text-xl font-medium text-[#111110]"
                      style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                      Exact Shapley Credit Attribution in{' '}
                      <LatexBlock display={false} tex="\mathcal{O}(T L D^2)" katexReady={katexReady} /> Time
                    </h3>
                    <p className="text-[13px] text-[#575653] leading-relaxed">
                      Computing exact game-theoretic Shapley attributions across{' '}
                      <LatexBlock display={false} tex="M" katexReady={katexReady} /> credit ratios is #P-hard (
                      <LatexBlock display={false} tex="\mathcal{O}(M \cdot 2^M)" katexReady={katexReady} />
                      ). By pushing all coalition subsets simultaneously down gradient-boosted trees, Axiom computes exact credit risk drivers in milliseconds:
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded border border-[#E4E2DC]">
                    <LatexBlock
                      tex={
                        latexMode === 'numerical'
                          ? liveLatexFormulas.shap.numerical
                          : liveLatexFormulas.shap.symbolic
                      }
                      katexReady={katexReady}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. WORKBENCH MODULE PREVIEW DIRECTORY */}
          <section className="py-16 px-6 lg:px-12 bg-[#FAF9F5] border-b border-[#E4E2DC]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#787774]">
                    Interactive Product Modules
                  </div>
                  <h2
                    className="text-3xl font-normal text-[#111110] mt-1"
                    style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                  >
                    Explore the four synchronized underwriting environments.
                  </h2>
                </div>
                <button
                  onClick={() => setSurface('workbench')}
                  className="px-4 py-2 rounded-[5px] bg-[#111110] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[#272725]"
                >
                  <span>Enter Full Workbench</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    tab: 'cim',
                    num: 'MODULE 01',
                    title: 'Split-Pane CIM & QoE Audit',
                    desc: 'Inspect 100+ page CIM PDFs side-by-side with extracted GAAP schedules. Toggle add-back haircuts and verify verbatim footnotes.',
                    metric: `${fmtCurrency(qoeTotalsByYear.adj24, 2)} FY24 Base`
                  },
                  {
                    tab: 'lbo',
                    num: 'MODULE 02',
                    title: '5-Yr LBO & Series Valuation',
                    desc: 'Dynamic debt waterfall, cash sweep, 5×5 IRR/MOIC sensitivity matrix, and Infinite Geometric Series Terminal Value toggle.',
                    metric: `${lboModel.summary.netIrr.toFixed(1)}% IRR / ${lboModel.summary.grossMoic.toFixed(2)}x`
                  },
                  {
                    tab: 'credit',
                    num: 'MODULE 03',
                    title: 'TreeSHAP & Monte Carlo',
                    desc: 'Basis-point default probability decomposition and 1,000-path stochastic Geometric Brownian Motion covenant stress-testing.',
                    metric: `${creditAnalysis.impliedRating} (${creditAnalysis.cumulativePdPct.toFixed(2)}% PD)`
                  },
                  {
                    tab: 'memo',
                    num: 'MODULE 04',
                    title: 'IC Pre-Screen Memorandum',
                    desc: 'Publication-ready Investment Committee memo with embedded LaTeX equations, Sources & Uses, and one-click export.',
                    metric: 'Instant Export (.txt / .csv)'
                  }
                ].map((card) => (
                  <button
                    key={card.tab}
                    onClick={() => {
                      setSurface('workbench');
                      setActiveTab(card.tab);
                    }}
                    className="text-left p-5 rounded-[6px] bg-white border border-[#E4E2DC] hover:border-[#111110] transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#787774]">
                        <span>{card.num}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#787774] group-hover:text-[#0044CC] transition-colors" />
                      </div>
                      <div
                        className="text-[17px] font-medium text-[#111110] group-hover:text-[#0044CC] transition-colors"
                        style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                      >
                        {card.title}
                      </div>
                      <p className="text-[12px] text-[#575653] leading-relaxed">{card.desc}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#E4E2DC] flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[#787774]">Active Output:</span>
                      <span className="font-semibold text-[#111110]">{card.metric}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Website Footer */}
          <footer className="py-8 px-6 lg:px-12 bg-[#F3F1EC] text-[#575653] text-[12px]">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-[3px] bg-[#111110] text-white flex items-center justify-center font-serif text-[12px] font-bold">
                  A
                </div>
                <span className="font-semibold text-[#111110]">Axiom Diligence, Inc.</span>
                <span className="text-[#787774] font-mono text-[11px]">
                  · Deterministic Financial Modeling &amp; Explainable Credit AI
                </span>
              </div>
              <div className="flex items-center gap-6 font-mono text-[11px]">
                <button onClick={() => setSurface('workbench')} className="hover:text-[#111110]">
                  Live Workbench
                </button>
                <button onClick={() => setSurface('monograph')} className="hover:text-[#111110]">
                  LaTeX Whitepaper
                </button>
                <button onClick={handleExportCsv} className="hover:text-[#111110]">
                  Export Sample LBO (.csv)
                </button>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* ====================================================================
          SURFACE 2: LIVE DEAL WORKBENCH (FULL MULTI-DEAL TERMINAL)
         ==================================================================== */}
      {surface === 'workbench' && (
        <div className="flex-1 flex min-h-[calc(100vh-56px)]">
          {/* LEFT PIPELINE SIDEBAR (228px) */}
          <aside className="w-[228px] shrink-0 bg-[#F3F1EC]/70 border-r border-[#E4E2DC] hidden md:flex flex-col justify-between select-none">
            <div>
              {/* Workbench Modules Nav */}
              <div className="p-3 border-b border-[#E4E2DC]">
                <div className="px-2 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                  Underwriting Modules
                </div>
                <nav className="space-y-0.5">
                  {[
                    { id: 'cim', label: 'CIM & QoE Audit', icon: FileText, num: '01' },
                    { id: 'lbo', label: 'LBO & Series Valuation', icon: Table, num: '02' },
                    { id: 'credit', label: 'TreeSHAP & Monte Carlo', icon: ShieldAlert, num: '03' },
                    { id: 'memo', label: 'IC Pre-Screen Memo', icon: BookOpen, num: '04' }
                  ].map((nav) => {
                    const Icon = nav.icon;
                    const active = activeTab === nav.id;
                    return (
                      <button
                        key={nav.id}
                        onClick={() => setActiveTab(nav.id)}
                        className={`w-full px-2.5 py-1.5 rounded-[4px] flex items-center justify-between text-[12px] transition-colors ${
                          active
                            ? 'bg-[#111110] text-white font-medium'
                            : 'text-[#575653] hover:bg-[#E4E2DC]/60 hover:text-[#111110]'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${
                              active ? 'text-white' : 'text-[#787774]'
                            }`}
                          />
                          <span className="truncate">{nav.label}</span>
                        </span>
                        <span
                          className={`text-[10px] font-mono ${
                            active ? 'text-[#A09F9C]' : 'text-[#787774]'
                          }`}
                        >
                          {nav.num}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Active Deal Pipeline Switcher */}
              <div className="p-3">
                <div className="px-1.5 mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                    Active Deal Pipeline ({Object.keys(deals).length})
                  </span>
                  <button
                    onClick={() => setNewDealModalOpen(true)}
                    className="text-[11px] font-mono text-[#0044CC] hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>

                <div className="space-y-1.5">
                  {Object.values(deals).map((deal) => {
                    const isSelected = deal.id === activeDealId;
                    return (
                      <button
                        key={deal.id}
                        onClick={() => handleSelectDeal(deal.id)}
                        className={`w-full text-left p-2.5 rounded-[4px] border transition-all ${
                          isSelected
                            ? 'bg-white border-[#111110] shadow-2xs'
                            : 'bg-transparent border-transparent hover:bg-white/70 hover:border-[#E4E2DC]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[12px] font-semibold text-[#111110] truncate">
                            {deal.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#0F766E]" />
                        </div>
                        <div className="text-[11px] text-[#575653] truncate mt-0.5">
                          {deal.sector}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#787774] mt-1">
                          <span>${deal.headlineEv.toFixed(1)}M EV</span>
                          <span>{deal.cimPages}p CIM</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setNewDealModalOpen(true)}
                  className="mt-3 w-full py-1.5 px-2.5 rounded-[4px] border border-dashed border-[#C8C6C0] hover:border-[#111110] text-[11px] font-medium text-[#575653] hover:text-[#111110] bg-white/60 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Parse New CIM Excerpt</span>
                </button>
              </div>
            </div>

            {/* Sidebar Footer: Wall Street Modeling Convention */}
            <div className="p-3 border-t border-[#E4E2DC] bg-[#FAF9F5] space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                Wall Street Color Standard
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#575653]">Hardcoded Input</span>
                <span className="font-mono font-semibold text-[#0044CC] bg-[#F0F5FF] px-1.5 py-0.2 rounded border border-[#0044CC]/20">
                  9.25x
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#575653]">Formula Output</span>
                <span className="font-mono font-semibold text-[#111110]">$140.4M</span>
              </div>
            </div>
          </aside>

          {/* MAIN WORKBENCH CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Workbench Sub-Header Bar */}
            <div className="bg-white border-b border-[#E4E2DC] px-5 py-2.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                {[
                  { id: 'cim', label: '01. CIM & QoE Audit' },
                  { id: 'lbo', label: '02. LBO & Series Valuation' },
                  { id: 'credit', label: '03. TreeSHAP & Monte Carlo' },
                  { id: 'memo', label: '04. IC Memorandum' }
                ].map((t) => {
                  const isAct = activeTab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`py-1 text-[12px] border-b-2 transition-colors ${
                        isAct
                          ? 'border-[#111110] text-[#111110] font-semibold'
                          : 'border-transparent text-[#575653] hover:text-[#111110]'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Synchronized Deal Telemetry Strip */}
              <div className="flex items-center gap-4 text-[11px] font-mono">
                <div>
                  <span className="text-[#787774] mr-1">DEAL:</span>
                  <span className="font-semibold text-[#111110]">{activeDeal.name}</span>
                </div>
                <div className="h-3 w-[1px] bg-[#E4E2DC]" />
                <div>
                  <span className="text-[#787774] mr-1">FY24 ADJ EBITDA:</span>
                  <span className="font-semibold text-[#0F766E]">
                    {fmtCurrency(qoeTotalsByYear.adj24, 2)}
                  </span>
                </div>
                <div className="h-3 w-[1px] bg-[#E4E2DC]" />
                <div>
                  <span className="text-[#787774] mr-1">IRR / MOIC:</span>
                  <span className="font-semibold text-[#111110]">
                    {fmtPct(lboModel.summary.netIrr, 1)} / {fmtMultiple(lboModel.summary.grossMoic, 2)}
                  </span>
                </div>
                <button
                  onClick={handleExportCsv}
                  className="px-2.5 py-1 rounded bg-[#F3F1EC] hover:bg-[#E4E2DC] text-[#111110] font-sans font-medium text-[11px] flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* ==============================================================
                MODULE 01: SPLIT-PANE CIM & QOE AUDIT WORKBENCH
               ============================================================== */}
            {activeTab === 'cim' && (
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
                {/* LEFT PANE (7 Cols): Historicals, QoE Haircuts & Live LaTeX Equation */}
                <div className="lg:col-span-7 p-5 overflow-y-auto border-r border-[#E4E2DC] space-y-4">
                  {/* Live LaTeX QoE Formula Header Card */}
                  <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#787774]">
                        Quality of Earnings (QoE) Normalization Identity (LaTeX)
                      </span>
                      <span className="text-[11px] font-mono text-[#0F766E] font-semibold">
                        Reported: {fmtCurrency(activeDeal.historicals[2].reportedEbitda, 2)} → Underwritten:{' '}
                        {fmtCurrency(qoeTotalsByYear.adj24, 2)}
                      </span>
                    </div>
                    <div className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                      <LatexBlock
                        tex={
                          latexMode === 'numerical'
                            ? liveLatexFormulas.qoe.numerical
                            : liveLatexFormulas.qoe.symbolic
                        }
                        katexReady={katexReady}
                      />
                    </div>
                  </div>

                  {/* Consolidated Income Statement & Interactive QoE Bridge Table */}
                  <div className="bg-white border border-[#E4E2DC] rounded-[5px] overflow-hidden">
                    <div className="px-3.5 py-2.5 bg-[#FAF9F5] border-b border-[#E4E2DC] flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#111110]">
                        Audited GAAP Historicals &amp; Interactive QoE Haircut Schedule ($M)
                      </span>
                      <span className="text-[11px] text-[#575653]">
                        Click any <span className="font-mono text-[#0044CC]">[CIM p. XX]</span> badge to verify source text
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-[12px]">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[#575653] font-mono text-[11px]">
                            <th className="py-2 px-3 text-left font-sans font-semibold text-[#111110] w-[38%]">
                              Line Item / QoE Adjustment
                            </th>
                            <th className="py-2 px-2.5 text-right">FY22A</th>
                            <th className="py-2 px-2.5 text-right">FY23A</th>
                            <th className="py-2 px-2.5 text-right bg-[#F3F1EC]/70 font-semibold text-[#111110]">
                              FY24A
                            </th>
                            <th className="py-2 px-2.5 text-center">Haircut (αᵢ)</th>
                            <th className="py-2 px-2.5 text-center">Audit Status</th>
                            <th className="py-2 px-2.5 text-right">Source</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE8E2] font-mono tabular-nums">
                          <tr className="bg-[#FAF9F5]/80">
                            <td
                              colSpan={7}
                              className="py-1.5 px-3 font-sans text-[10px] font-mono uppercase tracking-wider text-[#787774]"
                            >
                              I. Audited GAAP Historical Financials
                            </td>
                          </tr>
                          <tr
                            onClick={() => inspectCitation(38)}
                            className="hover:bg-[#FAF9F5] cursor-pointer"
                          >
                            <td className="py-2 px-3 font-sans font-semibold text-[#111110]">
                              Consolidated Revenue
                            </td>
                            <td className="py-2 px-2.5 text-right">
                              {fmtCurrency(activeDeal.historicals[0].revenue)}
                            </td>
                            <td className="py-2 px-2.5 text-right">
                              {fmtCurrency(activeDeal.historicals[1].revenue)}
                            </td>
                            <td className="py-2 px-2.5 text-right font-semibold bg-[#F3F1EC]/40">
                              {fmtCurrency(activeDeal.historicals[2].revenue)}
                            </td>
                            <td className="py-2 px-2.5 text-center text-[#787774]">—</td>
                            <td className="py-2 px-2.5 text-center">
                              <span className="font-sans text-[10px] px-1.5 py-0.5 rounded bg-[#E6F4F1] text-[#0F766E]">
                                Audited GAAP
                              </span>
                            </td>
                            <td className="py-2 px-2.5 text-right">
                              <span className="text-[11px] text-[#0044CC] hover:underline">[CIM p. 38]</span>
                            </td>
                          </tr>

                          <tr
                            onClick={() => inspectCitation(38)}
                            className="bg-[#FAF9F5] border-t border-[#E4E2DC] hover:bg-[#F3F1EC]/60 cursor-pointer font-semibold"
                          >
                            <td className="py-2 px-3 font-sans text-[#111110]">Reported GAAP EBITDA</td>
                            <td className="py-2 px-2.5 text-right">
                              {fmtCurrency(activeDeal.historicals[0].reportedEbitda, 2)}
                            </td>
                            <td className="py-2 px-2.5 text-right">
                              {fmtCurrency(activeDeal.historicals[1].reportedEbitda, 2)}
                            </td>
                            <td className="py-2 px-2.5 text-right bg-[#F3F1EC]">
                              {fmtCurrency(activeDeal.historicals[2].reportedEbitda, 2)}
                            </td>
                            <td className="py-2 px-2.5 text-center text-[#787774]">100%</td>
                            <td className="py-2 px-2.5 text-center text-[11px] text-[#575653]">
                              {fmtPct(
                                (activeDeal.historicals[2].reportedEbitda /
                                  activeDeal.historicals[2].revenue) *
                                  100,
                                1
                              )}
                            </td>
                            <td className="py-2 px-2.5 text-right">
                              <span className="text-[11px] text-[#0044CC]">[CIM p. 38]</span>
                            </td>
                          </tr>

                          {/* Section II: Interactive QoE Add-Backs */}
                          <tr className="bg-[#FAF9F5]/80">
                            <td
                              colSpan={7}
                              className="py-1.5 px-3 font-sans text-[10px] font-mono uppercase tracking-wider text-[#787774]"
                            >
                              II. Quality of Earnings (QoE) Adjustments — Toggle &amp; Haircut Controls
                            </td>
                          </tr>

                          {activeDeal.qoeItems.map((item) => {
                            const isSelected = highlightedQoeId === item.id;
                            const weight = item.included ? item.haircutPct / 100 : 0;
                            const effectiveFy24 = item.fy24 * weight;

                            let badgeStyle = 'bg-[#E6F4F1] text-[#0F766E] border-[#0F766E]/20';
                            if (item.confidence === 'Partial Haircut') {
                              badgeStyle = 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]/20';
                            } else if (item.confidence === 'Aggressive') {
                              badgeStyle = 'bg-[#FFE4E6] text-[#BE123C] border-[#BE123C]/20';
                            }

                            return (
                              <tr
                                key={item.id}
                                onClick={() => inspectCitation(item.page, item.id)}
                                className={`transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#F0F5FF]'
                                    : item.included
                                    ? 'hover:bg-[#FAF9F5]'
                                    : 'bg-[#FAF9F5]/50 text-[#787774]'
                                }`}
                              >
                                <td className="py-2 px-3 font-sans">
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      checked={item.included}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) =>
                                        updateQoeItem(item.id, {
                                          included: e.target.checked,
                                          haircutPct:
                                            e.target.checked && item.haircutPct === 0
                                              ? 50
                                              : item.haircutPct
                                        })
                                      }
                                      className="mt-0.5 rounded border-[#C8C6C0] text-[#111110] focus:ring-0 cursor-pointer"
                                    />
                                    <div>
                                      <div
                                        className={`font-medium leading-snug ${
                                          item.included ? 'text-[#111110]' : 'line-through text-[#787774]'
                                        }`}
                                      >
                                        {item.label}
                                      </div>
                                      <div className="text-[10px] font-mono text-[#787774]">
                                        {item.category} · Gross Submitted: ${item.fy24.toFixed(2)}M
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="py-2 px-2.5 text-right">
                                  {fmtCurrency(item.fy22 * weight, 2, true)}
                                </td>
                                <td className="py-2 px-2.5 text-right">
                                  {fmtCurrency(item.fy23 * weight, 2, true)}
                                </td>
                                <td className="py-2 px-2.5 text-right font-semibold bg-[#F3F1EC]/40">
                                  <span className={effectiveFy24 > 0 ? 'text-[#0F766E]' : 'text-[#787774]'}>
                                    {fmtCurrency(effectiveFy24, 2, true)}
                                  </span>
                                </td>

                                <td
                                  className="py-2 px-2.5 text-center"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <select
                                    value={item.included ? item.haircutPct : 0}
                                    onChange={(e) => {
                                      const val = Number(e.target.value);
                                      updateQoeItem(item.id, {
                                        included: val > 0,
                                        haircutPct: val
                                      });
                                    }}
                                    className="font-mono text-[11px] font-semibold text-[#0044CC] bg-[#F0F5FF] hover:bg-[#E4EEFF] border border-[#0044CC]/25 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
                                  >
                                    <option value={100}>100% Credit</option>
                                    <option value={75}>75% Credit</option>
                                    <option value={50}>50% Credit</option>
                                    <option value={25}>25% Credit</option>
                                    <option value={0}>0% (Exclude)</option>
                                  </select>
                                </td>

                                <td className="py-2 px-2.5 text-center">
                                  <span
                                    className={`font-sans text-[10px] font-medium px-1.5 py-0.5 rounded border ${badgeStyle}`}
                                  >
                                    {item.confidence}
                                  </span>
                                </td>

                                <td className="py-2 px-2.5 text-right">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      inspectCitation(item.page, item.id);
                                    }}
                                    className="font-mono text-[11px] font-medium text-[#0044CC] hover:underline bg-[#F0F5FF] px-1.5 py-0.5 rounded"
                                  >
                                    [CIM p. {item.page}]
                                  </button>
                                </td>
                              </tr>
                            );
                          })}

                          {/* Final Underwritten Adjusted EBITDA Output Row */}
                          <tr className="bg-[#E6F4F1]/60 border-t-2 border-[#111110] font-bold text-[#111110]">
                            <td className="py-2.5 px-3 font-sans">
                              Underwritten Adjusted EBITDA (Flows to LBO Base)
                            </td>
                            <td className="py-2.5 px-2.5 text-right">
                              {fmtCurrency(qoeTotalsByYear.adj22, 2)}
                            </td>
                            <td className="py-2.5 px-2.5 text-right">
                              {fmtCurrency(qoeTotalsByYear.adj23, 2)}
                            </td>
                            <td className="py-2.5 px-2.5 text-right text-[#0F766E] text-[13px]">
                              {fmtCurrency(qoeTotalsByYear.adj24, 2)}
                            </td>
                            <td className="py-2.5 px-2.5 text-center font-mono text-[11px] text-[#0F766E]">
                              LBO Base
                            </td>
                            <td className="py-2.5 px-2.5 text-center font-mono text-[11px] text-[#0F766E]">
                              {fmtPct(qoeTotalsByYear.margin24, 1)} Margin
                            </td>
                            <td className="py-2.5 px-2.5 text-right">
                              <button
                                onClick={() => setActiveTab('lbo')}
                                className="font-sans text-[11px] font-medium text-[#111110] underline flex items-center gap-0.5 ml-auto"
                              >
                                <span>LBO Model</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANE (5 Cols): Interactive CIM Source Document Inspector */}
                <div className="lg:col-span-5 bg-[#F3F1EC] p-5 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-4">
                    <div className="bg-white border border-[#E4E2DC] rounded-[4px] p-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase text-[#787774]">
                          Verbatim CIM Source Inspector
                        </div>
                        <div className="text-[12px] font-mono font-medium text-[#111110] truncate">
                          {activeDeal.cimFileName}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        {[38, 44, 52].map((pg) => (
                          <button
                            key={pg}
                            onClick={() => setActiveCimPage(pg)}
                            className={`px-2 py-1 rounded border transition-colors ${
                              activeCimPage === pg
                                ? 'bg-[#111110] text-white border-[#111110] font-semibold'
                                : 'bg-[#FAF9F5] text-[#575653] border-[#E4E2DC] hover:text-[#111110]'
                            }`}
                          >
                            p. {pg}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Simulated Physical CIM Page Sheet */}
                    <div className="bg-white border border-[#D5D3CD] shadow-xs rounded-[2px] p-6 space-y-5 text-[#111110]">
                      <div className="border-b border-[#111110] pb-3 flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-[#787774]">
                            CONFIDENTIAL INFORMATION MEMORANDUM · {activeDeal.codename.toUpperCase()}
                          </div>
                          <h3
                            className="text-[15px] font-semibold text-[#111110] mt-1"
                            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                          >
                            {currentCimPageObj.title}
                          </h3>
                          <div className="text-[11px] text-[#575653]">{currentCimPageObj.subtitle}</div>
                        </div>
                        <span className="font-mono text-[11px] text-[#787774] shrink-0">
                          Page {currentCimPageObj.pageNumber} of {activeDeal.cimPages}
                        </span>
                      </div>

                      <p className="text-[12px] text-[#3A3A38] leading-relaxed">
                        {currentCimPageObj.narrative}
                      </p>

                      <div className="border border-[#E4E2DC] rounded-[2px] overflow-hidden">
                        <table className="w-full border-collapse text-[11px] font-mono tabular-nums">
                          <thead>
                            <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[#575653]">
                              <th className="py-1.5 px-2.5 text-left font-sans">CIM Schedule Line Item</th>
                              <th className="py-1.5 px-2 text-right">FY22A</th>
                              <th className="py-1.5 px-2 text-right">FY23A</th>
                              <th className="py-1.5 px-2 text-right font-semibold text-[#111110]">FY24A</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#EAE8E2]">
                            {currentCimPageObj.tableRows.map((r, i) => {
                              const isRowHighlighted = r.refId && r.refId === highlightedQoeId;
                              return (
                                <tr
                                  key={i}
                                  className={`${
                                    isRowHighlighted
                                      ? 'bg-[#FEF3C7] font-semibold'
                                      : r.isBold
                                      ? 'bg-[#FAF9F5] font-semibold'
                                      : ''
                                  }`}
                                >
                                  <td className="py-1.5 px-2.5 font-sans text-[#111110]">{r.item}</td>
                                  <td className="py-1.5 px-2 text-right">{r.fy22}</td>
                                  <td className="py-1.5 px-2 text-right">{r.fy23}</td>
                                  <td className="py-1.5 px-2 text-right">{r.fy24}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Verbatim Footnotes */}
                      <div className="space-y-2.5 pt-2">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                          Extracted Verbatim Footnotes on Page {currentCimPageObj.pageNumber}
                        </div>

                        {activeDeal.qoeItems
                          .filter((q) => q.page === currentCimPageObj.pageNumber)
                          .map((q) => {
                            const isFocused = q.id === highlightedQoeId;
                            return (
                              <div
                                key={q.id}
                                onClick={() => setHighlightedQoeId(q.id)}
                                className={`p-3 rounded-[4px] border transition-all cursor-pointer ${
                                  isFocused
                                    ? 'bg-[#FEF3C7]/70 border-[#B45309]'
                                    : 'bg-[#FAF9F5] border-[#E4E2DC] hover:border-[#787774]'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="text-[11px] font-mono font-semibold text-[#111110]">
                                    {q.sectionRef}
                                  </span>
                                  <span className="text-[11px] font-mono font-bold text-[#0044CC]">
                                    Gross: ${q.fy24.toFixed(2)}M ({q.included ? `${q.haircutPct}% Credited` : 'Excluded'})
                                  </span>
                                </div>
                                <p className="text-[12px] text-[#111110] leading-relaxed bg-white/90 p-2 rounded border border-[#E4E2DC]">
                                  "{q.verbatimQuote}"
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E4E2DC] flex items-center justify-between text-[11px] font-mono text-[#787774]">
                    <span>SELL-SIDE ADVISOR: {activeDeal.advisor}</span>
                    <span>AXIOM PROVENANCE ENGINE</span>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                MODULE 02: WALL STREET LBO & INFINITE GEOMETRIC SERIES ENGINE
               ============================================================== */}
            {activeTab === 'lbo' && (
              <div className="p-5 space-y-5 max-w-[1600px]">
                {/* Top 5 KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-5 bg-white border border-[#E4E2DC] rounded-[5px] divide-y sm:divide-y-0 sm:divide-x divide-[#E4E2DC]">
                  <div className="p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      Implied Enterprise Value
                    </div>
                    <div className="text-[20px] font-mono tabular-nums font-bold text-[#111110] mt-1">
                      {fmtCurrency(lboModel.summary.impliedEv, 1)}
                    </div>
                    <div className="text-[11px] font-mono text-[#575653] mt-0.5">
                      {fmtMultiple(lboAssumptions.entryMultiple, 2)} × {fmtCurrency(qoeTotalsByYear.adj24, 2)} EBITDA
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      Sponsor Equity Check
                    </div>
                    <div className="text-[20px] font-mono tabular-nums font-bold text-[#111110] mt-1">
                      {fmtCurrency(lboModel.summary.sponsorEquityCheck, 1)}
                    </div>
                    <div className="text-[11px] font-mono text-[#575653] mt-0.5">
                      {fmtPct(
                        (lboModel.summary.sponsorEquityCheck / lboModel.sourcesUses.totalUses) * 100,
                        1
                      )}{' '}
                      of Total Uses
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      FY29E Terminal Exit EV
                    </div>
                    <div className="text-[20px] font-mono tabular-nums font-bold text-[#0044CC] mt-1">
                      {fmtCurrency(lboModel.summary.exitEv, 1)}
                    </div>
                    <div className="text-[11px] font-mono text-[#575653] mt-0.5">
                      {valuationMethod === 'multiple'
                        ? `Exit Multiple: ${fmtMultiple(lboAssumptions.exitMultiple, 2)}`
                        : `Geometric Series (${fmtMultiple(lboModel.summary.impliedPerpetuityMultiple, 2)})`}
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      Net Levered IRR / MOIC
                    </div>
                    <div
                      className={`text-[20px] font-mono tabular-nums font-bold mt-1 ${
                        lboModel.summary.netIrr >= 20.0 ? 'text-[#0F766E]' : 'text-[#B45309]'
                      }`}
                    >
                      {fmtPct(lboModel.summary.netIrr, 1)} / {fmtMultiple(lboModel.summary.grossMoic, 2)}
                    </div>
                    <div className="text-[11px] font-mono text-[#575653] mt-0.5">
                      FY29E Equity: {fmtCurrency(lboModel.summary.exitEquity, 1)}
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      Deleveraging Profile
                    </div>
                    <div className="text-[20px] font-mono tabular-nums font-bold text-[#111110] mt-1">
                      {fmtMultiple(lboModel.sourcesUses.initLeverage, 2)} →{' '}
                      {fmtMultiple(lboModel.years[4].netLeverage, 2)}
                    </div>
                    <div className="text-[11px] font-mono text-[#0F766E] mt-0.5">
                      Debt Paid: {fmtCurrency(lboModel.summary.totalDebtRepaid, 1)}
                    </div>
                  </div>
                </div>

                {/* Terminal Valuation Methodology & Live LaTeX Equation Strip */}
                <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#787774]">
                        Terminal Valuation Methodology &amp; Live LaTeX Formulation
                      </span>
                      <div className="text-[13px] font-semibold text-[#111110]">
                        Compare Exit EBITDA Multiple vs. Convergent Infinite Geometric Series (
                        <LatexBlock display={false} tex="\text{WACC} > g" katexReady={katexReady} />)
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-[#F3F1EC] p-0.5 rounded-[4px] border border-[#E4E2DC] text-[11px] font-mono">
                        <button
                          onClick={() => setValuationMethod('multiple')}
                          className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                            valuationMethod === 'multiple'
                              ? 'bg-[#111110] text-white font-semibold'
                              : 'text-[#575653] hover:text-[#111110]'
                          }`}
                        >
                          Exit Multiple ({fmtCurrency(lboModel.summary.exitEvMultiple, 1)})
                        </button>
                        <button
                          onClick={() => setValuationMethod('perpetuity')}
                          className={`px-2.5 py-1 rounded-[3px] transition-colors ${
                            valuationMethod === 'perpetuity'
                              ? 'bg-[#0044CC] text-white font-semibold'
                              : 'text-[#575653] hover:text-[#111110]'
                          }`}
                        >
                          Infinite Geometric Series ({fmtCurrency(lboModel.summary.exitEvPerpetuity, 1)})
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div className="px-3 py-2 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                      <div className="text-[10px] font-mono text-[#787774] mb-1">
                        1. LBO Internal Rate of Return (IRR Root):
                      </div>
                      <LatexBlock
                        tex={
                          latexMode === 'numerical'
                            ? liveLatexFormulas.irr.numerical
                            : liveLatexFormulas.irr.symbolic
                        }
                        katexReady={katexReady}
                      />
                    </div>
                    <div className="px-3 py-2 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                      <div className="text-[10px] font-mono text-[#787774] mb-1">
                        2. Infinite Geometric Series Terminal Valuation (
                        <LatexBlock
                          display={false}
                          tex="\sum \text{UFCF}_5 (1+g)^t / (1+\text{WACC})^t"
                          katexReady={katexReady}
                        />
                        ):
                      </div>
                      <LatexBlock
                        tex={
                          latexMode === 'numerical'
                            ? liveLatexFormulas.perpetuity.numerical
                            : liveLatexFormulas.perpetuity.symbolic
                        }
                        katexReady={katexReady}
                      />
                    </div>
                  </div>
                </div>

                {/* Editable Blue Assumption Drivers */}
                <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-3.5">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#787774]">
                      Underwriting Model Drivers (Editable Wall Street Blue Inputs)
                    </span>
                    <button
                      onClick={() => setLboAssumptions(activeDeal.lboDefaults)}
                      className="text-[11px] font-mono text-[#0044CC] hover:underline"
                    >
                      Reset to Deal Defaults
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                    {[
                      { label: 'Entry Multiple (x)', key: 'entryMultiple', min: 7.0, max: 14.0, step: 0.25 },
                      { label: 'Exit Multiple (x)', key: 'exitMultiple', min: 7.0, max: 14.0, step: 0.25 },
                      { label: 'Revenue CAGR (%)', key: 'revGrowthCagr', min: 4.0, max: 22.0, step: 0.5 },
                      { label: 'Margin Δ (bps)', key: 'marginExpansionBps', min: -200, max: 400, step: 25 },
                      { label: 'Senior Debt (x)', key: 'seniorDebtMultiple', min: 1.5, max: 4.5, step: 0.25 },
                      { label: 'Sub Mezz (x)', key: 'subDebtMultiple', min: 0.0, max: 2.5, step: 0.25 },
                      { label: 'Discount WACC (%)', key: 'waccPct', min: 8.0, max: 15.0, step: 0.2 },
                      { label: 'Perpetuity g (%)', key: 'perpGrowthPct', min: 1.5, max: 5.0, step: 0.25 }
                    ].map((inp) => (
                      <div
                        key={inp.key}
                        className="p-2 rounded-[4px] border border-[#E4E2DC] bg-[#FAF9F5] hover:border-[#0044CC]/40 transition-colors"
                      >
                        <label className="block text-[10px] font-mono text-[#575653] truncate">
                          {inp.label}
                        </label>
                        <input
                          type="number"
                          min={inp.min}
                          max={inp.max}
                          step={inp.step}
                          value={lboAssumptions[inp.key]}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setLboAssumptions((prev) => ({ ...prev, [inp.key]: val }));
                            }
                          }}
                          className="mt-1 w-full font-mono tabular-nums text-[12px] font-bold text-[#0044CC] bg-[#F0F5FF] focus:bg-white px-1.5 py-0.5 rounded border border-[#0044CC]/25 focus:border-[#0044CC] focus:outline-none"
                        />
                        <input
                          type="range"
                          min={inp.min}
                          max={inp.max}
                          step={inp.step}
                          value={lboAssumptions[inp.key]}
                          onChange={(e) =>
                            setLboAssumptions((prev) => ({
                              ...prev,
                              [inp.key]: parseFloat(e.target.value)
                            }))
                          }
                          className="w-full mt-1.5 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5-Year LBO Operating & Deleveraging Schedule Table */}
                <div className="bg-white border border-[#E4E2DC] rounded-[5px] overflow-hidden">
                  <div className="px-3.5 py-2.5 bg-[#FAF9F5] border-b border-[#E4E2DC] flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-[#111110]">
                      Operating Forecast, Free Cash Flow &amp; Debt Deleveraging Schedule ($ in millions)
                    </span>
                    <span className="text-[11px] font-mono text-[#575653]">
                      Senior Rate: SOFR ({activeDeal.creditProfile.sofrBaseRate.toFixed(2)}%) +{' '}
                      {lboAssumptions.seniorSpreadBps}bps ={' '}
                      {lboModel.sourcesUses.seniorAllInRate.toFixed(2)}% | Sub Mezz:{' '}
                      {lboAssumptions.subInterestRate.toFixed(2)}%
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[12px] font-mono tabular-nums">
                      <thead>
                        <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[#575653] text-[11px]">
                          <th className="py-2 px-3 text-left font-sans font-semibold text-[#111110] sticky left-0 bg-[#FAF9F5] z-10 w-[28%]">
                            Financial Line Item ($M)
                          </th>
                          <th className="py-2 px-3 text-right bg-[#F3F1EC] text-[#111110] font-semibold">
                            FY24A (Close)
                          </th>
                          {lboModel.years.map((y) => (
                            <th key={y.period} className="py-2 px-3 text-right text-[#111110]">
                              {y.period}
                            </th>
                          ))}
                          <th className="py-2 px-3 text-right bg-[#FAF9F5] text-[#575653]">
                            5Y CAGR / Δ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE8E2]">
                        <tr className="hover:bg-[#FAF9F5] font-semibold text-[#111110]">
                          <td className="py-1.5 px-3 font-sans sticky left-0 bg-white">Revenue</td>
                          <td className="py-1.5 px-3 text-right bg-[#F3F1EC]/50">
                            {fmtCurrency(lboModel.baseColumn.revenue, 1)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-1.5 px-3 text-right">
                              {fmtCurrency(y.revenue, 1)}
                            </td>
                          ))}
                          <td className="py-1.5 px-3 text-right text-[#0044CC] bg-[#F0F5FF]/60">
                            {fmtPct(lboAssumptions.revGrowthCagr, 1)}
                          </td>
                        </tr>

                        <tr className="hover:bg-[#FAF9F5] font-semibold text-[#111110]">
                          <td className="py-1.5 px-3 font-sans sticky left-0 bg-white">
                            Adjusted EBITDA (QoE Normalized)
                          </td>
                          <td className="py-1.5 px-3 text-right bg-[#E6F4F1]/50 text-[#0F766E]">
                            {fmtCurrency(lboModel.baseColumn.ebitda, 2)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-1.5 px-3 text-right">
                              {fmtCurrency(y.ebitda, 2)}
                            </td>
                          ))}
                          <td className="py-1.5 px-3 text-right text-[#0F766E]">
                            {fmtPct(
                              (Math.pow(
                                lboModel.years[4].ebitda / lboModel.baseColumn.ebitda,
                                1 / 5
                              ) -
                                1) *
                                100,
                              1
                            )}
                          </td>
                        </tr>

                        <tr className="text-[#575653] hover:bg-[#FAF9F5]">
                          <td className="py-1.5 px-3 font-sans pl-6 sticky left-0 bg-white">
                            (-) Cash Interest Expense
                          </td>
                          <td className="py-1.5 px-3 text-right bg-[#F3F1EC]/50">—</td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-1.5 px-3 text-right">
                              {fmtCurrency(y.cashInterest, 2)}
                            </td>
                          ))}
                          <td className="py-1.5 px-3 text-right">—</td>
                        </tr>

                        <tr className="text-[#575653] hover:bg-[#FAF9F5]">
                          <td className="py-1.5 px-3 font-sans pl-6 sticky left-0 bg-white">
                            (-) Cash Taxes &amp; CapEx / NWC
                          </td>
                          <td className="py-1.5 px-3 text-right bg-[#F3F1EC]/50">
                            {fmtCurrency(lboModel.baseColumn.wcAndCapex, 2)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-1.5 px-3 text-right">
                              {fmtCurrency(y.cashTaxes + y.wcAndCapex, 2)}
                            </td>
                          ))}
                          <td className="py-1.5 px-3 text-right">—</td>
                        </tr>

                        <tr className="bg-[#FAF9F5] border-t border-[#111110] font-bold text-[#111110]">
                          <td className="py-2 px-3 font-sans sticky left-0 bg-[#FAF9F5]">
                            Levered Free Cash Flow (LFCF)
                          </td>
                          <td className="py-2 px-3 text-right bg-[#F3F1EC]">
                            {fmtCurrency(lboModel.baseColumn.lfcf, 2)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-2 px-3 text-right text-[#0F766E]">
                              {fmtCurrency(y.lfcf, 2)}
                            </td>
                          ))}
                          <td className="py-2 px-3 text-right text-[#0F766E]">
                            {fmtCurrency(
                              lboModel.years.reduce((acc, y) => acc + y.lfcf, 0),
                              1
                            )}{' '}
                            Cum.
                          </td>
                        </tr>

                        <tr className="bg-[#FAF9F5] border-t border-[#E4E2DC] font-bold text-[#111110]">
                          <td className="py-2 px-3 font-sans sticky left-0 bg-[#FAF9F5]">
                            Ending Total Debt
                          </td>
                          <td className="py-2 px-3 text-right bg-[#F3F1EC]">
                            {fmtCurrency(lboModel.baseColumn.endTotalDebt, 2)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-2 px-3 text-right">
                              {fmtCurrency(y.endTotalDebt, 2)}
                            </td>
                          ))}
                          <td className="py-2 px-3 text-right text-[#0F766E]">
                            {fmtCurrency(-lboModel.summary.totalDebtRepaid, 1)}
                          </td>
                        </tr>

                        <tr className="hover:bg-[#FAF9F5] font-semibold">
                          <td className="py-1.5 px-3 font-sans sticky left-0 bg-white">
                            Net Debt / Adjusted EBITDA
                          </td>
                          <td className="py-1.5 px-3 text-right bg-[#F3F1EC]/50">
                            {fmtMultiple(lboModel.baseColumn.netLeverage, 2)}
                          </td>
                          {lboModel.years.map((y) => (
                            <td key={y.period} className="py-1.5 px-3 text-right">
                              {fmtMultiple(y.netLeverage, 2)}
                            </td>
                          ))}
                          <td className="py-1.5 px-3 text-right text-[#0F766E]">
                            {fmtMultiple(
                              lboModel.years[4].netLeverage - lboModel.baseColumn.netLeverage,
                              2
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5x5 Sensitivity Matrix & Capital Structure Evolution Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-white border border-[#E4E2DC] rounded-[5px] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E4E2DC]">
                      <div>
                        <div className="text-[12px] font-semibold text-[#111110]">
                          5×5 Sponsor Returns Sensitivity Matrix (Net IRR % / MOIC x)
                        </div>
                        <div className="text-[11px] text-[#575653]">
                          Emerald cells clear the 20.0% institutional buyout hurdle rate
                        </div>
                      </div>

                      <div className="flex items-center border border-[#E4E2DC] rounded-[4px] p-0.5 bg-[#FAF9F5] text-[11px]">
                        <button
                          onClick={() => setSensitivityMode('entry_exit')}
                          className={`px-2 py-1 rounded-[3px] font-medium ${
                            sensitivityMode === 'entry_exit'
                              ? 'bg-[#111110] text-white'
                              : 'text-[#575653]'
                          }`}
                        >
                          Entry × Exit Multiple
                        </button>
                        <button
                          onClick={() => setSensitivityMode('exit_growth')}
                          className={`px-2 py-1 rounded-[3px] font-medium ${
                            sensitivityMode === 'exit_growth'
                              ? 'bg-[#111110] text-white'
                              : 'text-[#575653]'
                          }`}
                        >
                          Rev Growth × Exit Multiple
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse font-mono tabular-nums text-[11px]">
                        <thead>
                          <tr>
                            <th className="p-2 text-left bg-[#FAF9F5] border border-[#E4E2DC] text-[#575653]">
                              {sensitivityGrid.rowHeaderLabel}
                            </th>
                            {sensitivityGrid.colHeaders.map((col, idx) => (
                              <th
                                key={idx}
                                className="p-2 text-center bg-[#FAF9F5] border border-[#E4E2DC] text-[#0044CC] font-semibold"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sensitivityGrid.rows.map((row, rIdx) => (
                            <tr key={rIdx}>
                              <td className="p-2 font-semibold text-[#0044CC] bg-[#FAF9F5] border border-[#E4E2DC]">
                                {row.rowLabel}
                              </td>
                              {row.cells.map((cell, cIdx) => {
                                const clearsHurdle = cell.irr >= 20.0;
                                const moderate = cell.irr >= 16.0 && cell.irr < 20.0;
                                return (
                                  <td
                                    key={cIdx}
                                    className={`p-2 text-center border border-[#E4E2DC] ${
                                      clearsHurdle
                                        ? 'bg-[#E6F4F1] text-[#0F766E]'
                                        : moderate
                                        ? 'bg-[#FEF3C7]/60 text-[#B45309]'
                                        : 'bg-white text-[#575653]'
                                    } ${
                                      cell.isBaseCase
                                        ? 'ring-2 ring-inset ring-[#111110] font-bold'
                                        : ''
                                    }`}
                                  >
                                    <div className="font-bold">{cell.irr.toFixed(1)}%</div>
                                    <div className="text-[10px] opacity-80">{cell.moic.toFixed(2)}x</div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-white border border-[#E4E2DC] rounded-[5px] p-4 flex flex-col justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-[#111110]">
                        Capital Structure Evolution &amp; Equity Value Creation ($M)
                      </div>
                      <div className="text-[11px] text-[#575653] mb-3">
                        Senior Debt (Obsidian) · Sub Mezz (Amber) · Implied Sponsor Equity (Emerald)
                      </div>
                    </div>

                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              period: 'FY24A',
                              SeniorDebt: Number(lboModel.baseColumn.endSenior.toFixed(1)),
                              SubDebt: Number(lboModel.baseColumn.endSub.toFixed(1)),
                              SponsorEquity: Number(lboModel.baseColumn.impliedYrEquity.toFixed(1))
                            },
                            ...lboModel.years.map((y) => ({
                              period: y.period,
                              SeniorDebt: Number(y.endSenior.toFixed(1)),
                              SubDebt: Number(y.endSub.toFixed(1)),
                              SponsorEquity: Number(y.impliedYrEquity.toFixed(1))
                            }))
                          ]}
                          margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="2 2" stroke="#EAE8E2" vertical={false} />
                          <XAxis dataKey="period" stroke="#575653" tick={{ fontSize: 11, fontFamily: 'monospace' }} />
                          <YAxis
                            stroke="#575653"
                            tick={{ fontSize: 11, fontFamily: 'monospace' }}
                            tickFormatter={(v) => `$${v}M`}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#FFFFFF',
                              borderColor: '#E4E2DC',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontFamily: 'monospace'
                            }}
                          />
                          <Bar dataKey="SeniorDebt" stackId="a" name="Senior Term Debt ($M)" fill="#111110" />
                          <Bar dataKey="SubDebt" stackId="a" name="Sub Mezzanine ($M)" fill="#B45309" />
                          <Bar dataKey="SponsorEquity" stackId="a" name="Implied Sponsor Equity ($M)" fill="#0F766E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                MODULE 03: TREESHAP CREDIT RISK & MONTE CARLO STRESS ENGINE
               ============================================================== */}
            {activeTab === 'credit' && (
              <div className="p-5 space-y-5 max-w-[1600px]">
                {/* Top LaTeX Equation Strip for TreeSHAP & Stochastic SDE */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white border border-[#E4E2DC] rounded-[5px] p-4">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      1. Polynomial-Time TreeSHAP Credit Risk Decomposition (
                      <LatexBlock display={false} tex="\mathcal{O}(T L D^2)" katexReady={katexReady} />)
                    </div>
                    <div className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                      <LatexBlock
                        tex={
                          latexMode === 'numerical'
                            ? liveLatexFormulas.shap.numerical
                            : liveLatexFormulas.shap.symbolic
                        }
                        katexReady={katexReady}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#787774]">
                      2. Stochastic Cash Flow SDE &amp; Covenant Breach Estimator (N = 1,000)
                    </div>
                    <div className="px-3 py-1.5 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                      <LatexBlock
                        tex={
                          latexMode === 'numerical'
                            ? liveLatexFormulas.monteCarlo.numerical
                            : liveLatexFormulas.monteCarlo.symbolic
                        }
                        katexReady={katexReady}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* LEFT 6 COLS: TreeSHAP Attribution Table */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="grid grid-cols-3 bg-white border border-[#E4E2DC] rounded-[5px] divide-x divide-[#E4E2DC]">
                      <div className="p-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#787774]">
                          Implied Credit Rating
                        </div>
                        <div className="mt-1.5">
                          <span
                            className={`text-[18px] font-mono font-bold px-2 py-0.5 rounded border ${
                              creditAnalysis.ratingTone === 'emerald'
                                ? 'bg-[#E6F4F1] text-[#0F766E] border-[#0F766E]/30'
                                : creditAnalysis.ratingTone === 'amber'
                                ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]/30'
                                : 'bg-[#FFE4E6] text-[#BE123C] border-[#BE123C]/30'
                            }`}
                          >
                            {creditAnalysis.impliedRating}
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#787774]">
                          5-Yr Cumulative PD
                        </div>
                        <div className="text-[20px] font-mono tabular-nums font-bold text-[#111110] mt-1">
                          {fmtPct(creditAnalysis.cumulativePdPct, 2)}
                        </div>
                        <div className="text-[11px] font-mono text-[#575653]">
                          Cohort Base: {fmtPct(creditAnalysis.basePdPct, 2)}
                        </div>
                      </div>

                      <div className="p-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#787774]">
                          Expected Loss (EL)
                        </div>
                        <div className="text-[20px] font-mono tabular-nums font-bold text-[#111110] mt-1">
                          {fmtPct(creditAnalysis.expectedLossPct, 2)}
                        </div>
                        <div className="text-[11px] font-mono text-[#575653]">
                          LGD: {fmtPct(creditAnalysis.lgdPct, 1)}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E4E2DC] rounded-[5px] overflow-hidden">
                      <div className="px-3.5 py-2.5 bg-[#FAF9F5] border-b border-[#E4E2DC] flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-[#111110]">
                          TreeSHAP Feature Attribution (φᵢ Basis-Point Impact)
                        </span>
                        <span className="text-[10px] font-mono text-[#575653]">
                          Exact Shapley Additive Explanations
                        </span>
                      </div>

                      <table className="w-full border-collapse text-[12px] font-mono tabular-nums">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[#575653] text-[11px]">
                            <th className="py-2 px-3 text-left font-sans font-semibold text-[#111110]">
                              Credit Risk Factor
                            </th>
                            <th className="py-2 px-2.5 text-right">Deal Metric</th>
                            <th className="py-2 px-2.5 text-right">Benchmark</th>
                            <th className="py-2 px-2.5 text-right">Log-Odds</th>
                            <th className="py-2 px-3 text-right">PD Impact</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE8E2]">
                          {creditAnalysis.shapFeatures.map((feat) => {
                            const increasesRisk = feat.bpsImpact > 0;
                            const barWidthPct = Math.min(100, Math.max(6, Math.abs(feat.bpsImpact) / 3));

                            return (
                              <tr key={feat.id} className="hover:bg-[#FAF9F5]">
                                <td className="py-2.5 px-3 font-sans">
                                  <div className="font-medium text-[#111110]">{feat.name}</div>
                                  <div className="w-full h-1.5 bg-[#F3F1EC] rounded overflow-hidden mt-1">
                                    <div
                                      style={{ width: `${barWidthPct}%` }}
                                      className={`h-full ${
                                        increasesRisk ? 'bg-[#BE123C]' : 'bg-[#0F766E]'
                                      }`}
                                    />
                                  </div>
                                </td>
                                <td className="py-2.5 px-2.5 text-right font-semibold text-[#111110]">
                                  {feat.metricValue}
                                </td>
                                <td className="py-2.5 px-2.5 text-right text-[#787774]">
                                  {feat.benchmark}
                                </td>
                                <td className="py-2.5 px-2.5 text-right text-[#575653]">
                                  {feat.logOdds > 0 ? `+${feat.logOdds.toFixed(2)}` : feat.logOdds.toFixed(2)}
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                                      increasesRisk
                                        ? 'bg-[#FFE4E6] text-[#BE123C]'
                                        : 'bg-[#E6F4F1] text-[#0F766E]'
                                    }`}
                                  >
                                    {increasesRisk ? `+${feat.bpsImpact} bps` : `${feat.bpsImpact} bps`}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RIGHT 6 COLS: 1,000-Run Monte Carlo Simulator */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-3.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#787774] mb-2.5">
                        Stochastic Stress Parameters (Editable Blue Inputs)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-2.5 rounded border border-[#E4E2DC] bg-[#FAF9F5]">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#575653]">EBITDA Volatility (σ)</span>
                            <span className="font-mono font-bold text-[#0044CC]">
                              {creditStress.ebitdaSigmaPct.toFixed(1)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={5.0}
                            max={30.0}
                            step={1.0}
                            value={creditStress.ebitdaSigmaPct}
                            onChange={(e) =>
                              setCreditStress((prev) => ({
                                ...prev,
                                ebitdaSigmaPct: parseFloat(e.target.value)
                              }))
                            }
                            className="w-full mt-2 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                          />
                        </div>

                        <div className="p-2.5 rounded border border-[#E4E2DC] bg-[#FAF9F5]">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#575653]">SOFR Rate Shock</span>
                            <span className="font-mono font-bold text-[#0044CC]">
                              {creditStress.rateShockBps >= 0 ? '+' : ''}
                              {creditStress.rateShockBps} bps
                            </span>
                          </div>
                          <input
                            type="range"
                            min={-100}
                            max={300}
                            step={25}
                            value={creditStress.rateShockBps}
                            onChange={(e) =>
                              setCreditStress((prev) => ({
                                ...prev,
                                rateShockBps: parseInt(e.target.value, 10)
                              }))
                            }
                            className="w-full mt-2 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                          />
                        </div>

                        <div className="p-2.5 rounded border border-[#E4E2DC] bg-[#FAF9F5]">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-[#575653]">Max Leverage Covenant</span>
                            <span className="font-mono font-bold text-[#0044CC]">
                              {creditStress.covenantThreshold.toFixed(2)}x
                            </span>
                          </div>
                          <input
                            type="range"
                            min={3.5}
                            max={6.0}
                            step={0.25}
                            value={creditStress.covenantThreshold}
                            onChange={(e) =>
                              setCreditStress((prev) => ({
                                ...prev,
                                covenantThreshold: parseFloat(e.target.value)
                              }))
                            }
                            className="w-full mt-2 accent-[#0044CC] h-1 bg-[#E4E2DC] rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-4">
                      <div className="text-[12px] font-semibold text-[#111110]">
                        Monte Carlo Distribution Histogram — Year 3 (FY27E) Net Leverage
                      </div>
                      <div className="text-[11px] text-[#575653] mb-3">
                        1,000 simulated paths · Crimson bars breach the {creditStress.covenantThreshold.toFixed(2)}x maintenance covenant ceiling
                      </div>

                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={creditAnalysis.histogramData}
                            margin={{ top: 5, right: 10, left: -15, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="2 2" stroke="#EAE8E2" vertical={false} />
                            <XAxis
                              dataKey="range"
                              stroke="#575653"
                              tick={{ fontSize: 10, fontFamily: 'monospace' }}
                            />
                            <YAxis
                              stroke="#575653"
                              tick={{ fontSize: 10, fontFamily: 'monospace' }}
                              tickFormatter={(v) => `${v}%`}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: '#FFFFFF',
                                borderColor: '#E4E2DC',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontFamily: 'monospace'
                              }}
                            />
                            <Bar dataKey="pct" radius={[2, 2, 0, 0]}>
                              {creditAnalysis.histogramData.map((entry, idx) => (
                                <Cell
                                  key={`cell-${idx}`}
                                  fill={entry.isBreach ? '#BE123C' : '#111110'}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-white border border-[#E4E2DC] rounded-[5px] overflow-hidden">
                      <table className="w-full border-collapse text-[12px] font-mono tabular-nums">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[#575653] text-[11px]">
                            <th className="py-2 px-3 text-left font-sans font-semibold text-[#111110]">
                              Period
                            </th>
                            <th className="py-2 px-2.5 text-right">P50 Median Lev</th>
                            <th className="py-2 px-2.5 text-right">P90 Downside Lev</th>
                            <th className="py-2 px-2.5 text-right">Covenant Limit</th>
                            <th className="py-2 px-3 text-right">Breach Prob %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE8E2]">
                          {creditAnalysis.breachSchedule.map((row) => (
                            <tr key={row.period} className="hover:bg-[#FAF9F5]">
                              <td className="py-2 px-3 font-sans font-semibold text-[#111110]">
                                {row.period}
                              </td>
                              <td className="py-2 px-2.5 text-right">{fmtMultiple(row.medianLev, 2)}</td>
                              <td className="py-2 px-2.5 text-right text-[#B45309]">
                                {fmtMultiple(row.p90DownsideLev, 2)}
                              </td>
                              <td className="py-2 px-2.5 text-right text-[#0044CC]">
                                {fmtMultiple(row.covenantLimit, 2)}
                              </td>
                              <td className="py-2 px-3 text-right">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                                    row.breachProbPct >= 15.0
                                      ? 'bg-[#FFE4E6] text-[#BE123C]'
                                      : row.breachProbPct >= 5.0
                                      ? 'bg-[#FEF3C7] text-[#B45309]'
                                      : 'bg-[#E6F4F1] text-[#0F766E]'
                                  }`}
                                >
                                  {row.breachProbPct.toFixed(1)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                MODULE 04: INVESTMENT COMMITTEE PRE-SCREEN MEMORANDUM
               ============================================================== */}
            {activeTab === 'memo' && (
              <div className="p-6 max-w-4xl mx-auto w-full space-y-4">
                <div className="bg-white border border-[#E4E2DC] rounded-[5px] p-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[12px] text-[#575653]">
                    Typeset Investment Committee Memorandum dynamically linked to {activeDeal.name}.
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(memoMarkdownText);
                        showToast('Copied IC Memo Markdown to clipboard');
                      }}
                      className="px-2.5 py-1 rounded-[4px] bg-white hover:bg-[#FAF9F5] border border-[#E4E2DC] text-[12px] font-medium flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#575653]" />
                      <span>Copy Memo</span>
                    </button>

                    <button
                      onClick={() => {
                        const blob = new Blob([memoMarkdownText], { type: 'text/plain;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Axiom_Diligence_${activeDeal.name.replace(/[^a-zA-Z0-9]/g, '_')}_IC_Memo.txt`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        showToast('Downloaded IC Pre-Screen Memo (.txt)');
                      }}
                      className="px-3 py-1 rounded-[4px] bg-[#111110] hover:bg-[#272725] text-white text-[12px] font-medium flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Memo (.txt)</span>
                    </button>
                  </div>
                </div>

                {/* Publication-Grade IC Memo Sheet */}
                <div className="bg-white border border-[#D5D3CD] shadow-sm rounded-[3px] p-8 sm:p-10 space-y-6 text-[#111110]">
                  <div className="border-b-2 border-[#111110] pb-4">
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#787774]">
                      <span>AXIOM DILIGENCE · AUTOMATED INVESTMENT COMMITTEE MEMORANDUM</span>
                      <span>STRICTLY CONFIDENTIAL</span>
                    </div>
                    <h1
                      className="text-2xl sm:text-3xl font-normal text-[#111110] mt-1.5"
                      style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                      {activeDeal.name} ({activeDeal.codename}) — LBO &amp; Credit Underwriting Memorandum
                    </h1>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#111110]">
                      I. Executive Summary &amp; Underwritten Equations
                    </h2>
                    <p className="text-[13px] text-[#2A2A28] leading-relaxed">
                      We evaluate the leveraged buyout of <strong>{activeDeal.name}</strong> ({activeDeal.sector}, {activeDeal.hq}) at an entry multiple of{' '}
                      <span className="font-mono font-semibold">{fmtMultiple(lboAssumptions.entryMultiple, 2)}</span> on FY24A Underwritten Adjusted EBITDA of{' '}
                      <span className="font-mono font-semibold text-[#0F766E]">{fmtCurrency(qoeTotalsByYear.adj24, 2)}</span>, implying an Enterprise Value of{' '}
                      <span className="font-mono font-semibold">{fmtCurrency(lboModel.summary.impliedEv, 1)}</span>.
                    </p>

                    <div className="p-3 bg-[#FAF9F5] border border-[#E4E2DC] rounded my-3">
                      <LatexBlock
                        tex={liveLatexFormulas.irr.numerical}
                        katexReady={katexReady}
                      />
                    </div>
                  </div>

                  {/* Sources & Uses */}
                  <div className="space-y-2">
                    <h2 className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#111110]">
                      II. Sources &amp; Uses of Funds ($M)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <table className="w-full border-collapse border border-[#E4E2DC] text-[12px] font-mono tabular-nums">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[11px] text-[#575653]">
                            <th className="py-1.5 px-2.5 text-left font-sans font-semibold text-[#111110]">Sources</th>
                            <th className="py-1.5 px-2 text-right">$M</th>
                            <th className="py-1.5 px-2 text-right">x EBITDA</th>
                            <th className="py-1.5 px-2 text-right">%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE8E2]">
                          <tr>
                            <td className="py-1.5 px-2.5 font-sans">Senior Term Loan</td>
                            <td className="py-1.5 px-2 text-right">{fmtCurrency(lboModel.sourcesUses.initSeniorDebt, 1)}</td>
                            <td className="py-1.5 px-2 text-right">{fmtMultiple(lboAssumptions.seniorDebtMultiple, 2)}</td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtPct((lboModel.sourcesUses.initSeniorDebt / lboModel.sourcesUses.totalUses) * 100, 1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-2.5 font-sans">Subordinated Mezzanine</td>
                            <td className="py-1.5 px-2 text-right">{fmtCurrency(lboModel.sourcesUses.initSubDebt, 1)}</td>
                            <td className="py-1.5 px-2 text-right">{fmtMultiple(lboAssumptions.subDebtMultiple, 2)}</td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtPct((lboModel.sourcesUses.initSubDebt / lboModel.sourcesUses.totalUses) * 100, 1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-2.5 font-sans font-semibold text-[#0F766E]">Sponsor Cash Equity</td>
                            <td className="py-1.5 px-2 text-right font-semibold text-[#0F766E]">
                              {fmtCurrency(lboModel.sourcesUses.sponsorEquityCheck, 1)}
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtMultiple(lboModel.sourcesUses.sponsorEquityCheck / qoeTotalsByYear.adj24, 2)}
                            </td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtPct((lboModel.sourcesUses.sponsorEquityCheck / lboModel.sourcesUses.totalUses) * 100, 1)}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="w-full border-collapse border border-[#E4E2DC] text-[12px] font-mono tabular-nums">
                        <thead>
                          <tr className="bg-[#FAF9F5] border-b border-[#E4E2DC] text-[11px] text-[#575653]">
                            <th className="py-1.5 px-2.5 text-left font-sans font-semibold text-[#111110]">Uses</th>
                            <th className="py-1.5 px-2 text-right">$M</th>
                            <th className="py-1.5 px-2 text-right">%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAE8E2]">
                          <tr>
                            <td className="py-1.5 px-2.5 font-sans">Purchase Enterprise Value</td>
                            <td className="py-1.5 px-2 text-right">{fmtCurrency(lboModel.sourcesUses.impliedEv, 1)}</td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtPct((lboModel.sourcesUses.impliedEv / lboModel.sourcesUses.totalUses) * 100, 1)}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-1.5 px-2.5 font-sans">Estimated Advisory &amp; Financing Fees</td>
                            <td className="py-1.5 px-2 text-right">{fmtCurrency(lboModel.sourcesUses.dealFees, 1)}</td>
                            <td className="py-1.5 px-2 text-right">
                              {fmtPct((lboModel.sourcesUses.dealFees / lboModel.sourcesUses.totalUses) * 100, 1)}
                            </td>
                          </tr>
                          <tr className="bg-[#FAF9F5] font-bold">
                            <td className="py-1.5 px-2.5 font-sans">Total Uses</td>
                            <td className="py-1.5 px-2 text-right">{fmtCurrency(lboModel.sourcesUses.totalUses, 1)}</td>
                            <td className="py-1.5 px-2 text-right">100.0%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          SURFACE 3: INTERACTIVE LATEX MATHEMATICAL MONOGRAPH WHITEPAPER
         ==================================================================== */}
      {surface === 'monograph' && (
        <main className="flex-1 py-10 px-4 sm:px-8 bg-[#F3F1EC]">
          {/* Floating Interactive Controls Bar above the Paper */}
          <div className="max-w-4xl mx-auto mb-6 bg-white border border-[#D5D3CD] rounded-[6px] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#787774]">
                Active Deal Bound to Paper:
              </span>
              {Object.values(deals).map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDeal(d.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeDealId === d.id
                      ? 'bg-[#111110] text-white font-semibold'
                      : 'bg-[#FAF9F5] text-[#575653] border border-[#E4E2DC] hover:text-[#111110]'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="text-[#575653]">Equation Mode:</span>
              <button
                onClick={() => setLatexMode(latexMode === 'symbolic' ? 'numerical' : 'symbolic')}
                className="px-2.5 py-1 rounded bg-[#0044CC] text-white font-semibold"
              >
                {latexMode === 'numerical' ? 'Showing Live Deal Numbers' : 'Showing Symbolic Notation'}
              </button>
            </div>
          </div>

          {/* Academic Monograph Sheet (Econometrica / Journal of Finance Style) */}
          <article className="max-w-4xl mx-auto bg-white border border-[#D5D3CD] shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[2px] p-8 sm:p-14 space-y-8 text-[#111110]">
            {/* Paper Title & Authors */}
            <header className="text-center border-b border-[#111110] pb-8 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#787774]">
                AXIOM DILIGENCE RESEARCH MONOGRAPH · MATHEMATICAL FINANCE &amp; COMPUTER SCIENCE
              </div>
              <h1
                className="text-3xl sm:text-4xl font-normal text-[#111110] leading-tight max-w-2xl mx-auto"
                style={{ fontFamily: "'Newsreader', 'Computer Modern Serif', Georgia, serif" }}
              >
                Deterministic Document Parsing, Polynomial-Time Game-Theoretic Credit Attribution, and Stochastic LBO Underwriting
              </h1>
              <div className="text-[13px] font-serif italic text-[#575653]">
                Quantitative Architecture Specification — Live Numerical Evaluation on{' '}
                <strong className="not-italic font-semibold text-[#111110]">{activeDeal.name}</strong>
              </div>
            </header>

            {/* Abstract */}
            <section className="max-w-2xl mx-auto bg-[#FAF9F5] border border-[#E4E2DC] p-5 rounded-[2px] space-y-2">
              <div className="text-center text-[11px] font-mono uppercase tracking-widest font-semibold text-[#111110]">
                Abstract
              </div>
              <p
                className="text-[13px] text-[#2A2A28] leading-relaxed text-justify"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                Institutional buyout and private credit underwriting requires reconciling unstructured accounting disclosures with multi-period debt service waterfalls and credit default models. While naive large language models fail at deterministic arithmetic, exact game-theoretic Shapley credit attribution scales exponentially in{' '}
                <LatexBlock display={false} tex="\mathcal{O}(M \cdot 2^M)" katexReady={katexReady} /> time. We formalize the Axiom Diligence architecture: (1) a provenance-linked Quality of Earnings (QoE) operator, (2) a dual-mode Leveraged Buyout (LBO) valuation engine pairing exit multiples with convergent infinite geometric series, and (3) a polynomial-time{' '}
                <LatexBlock display={false} tex="\mathcal{O}(T L D^2)" katexReady={katexReady} /> TreeSHAP credit attribution engine coupled with 1,000-path stochastic differential equation (SDE) covenant stress-testing.
              </p>
            </section>

            {/* Section 1: QoE Normalization */}
            <section className="space-y-3">
              <h2
                className="text-xl font-medium text-[#111110] border-b border-[#E4E2DC] pb-1.5"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                § 1. Formal Quality of Earnings (QoE) Normalization Operator
              </h2>
              <p className="text-[13.5px] text-[#2A2A28] leading-relaxed">
                Let{' '}
                <LatexBlock display={false} tex="\text{EBITDA}_{\text{GAAP}}" katexReady={katexReady} />{' '}
                denote audited historical operating cash flow extracted from page 38 of the Confidential Information Memorandum. Given{' '}
                <LatexBlock display={false} tex="K" katexReady={katexReady} /> candidate management adjustments{' '}
                <LatexBlock display={false} tex="\Delta_i" katexReady={katexReady} />, each linked to a verifiable footnote citation{' '}
                <LatexBlock display={false} tex="c_i" katexReady={katexReady} /> with confidence threshold{' '}
                <LatexBlock display={false} tex="\tau" katexReady={katexReady} /> and analyst haircut weight{' '}
                <LatexBlock display={false} tex="\alpha_i \in [0, 1]" katexReady={katexReady} />, underwritten baseline cash flow is defined as:
              </p>
              <div className="p-4 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                <LatexBlock
                  tex={
                    latexMode === 'numerical'
                      ? liveLatexFormulas.qoe.numerical
                      : liveLatexFormulas.qoe.symbolic
                  }
                  katexReady={katexReady}
                />
              </div>
            </section>

            {/* Section 2: Infinite Geometric Series & LBO IRR */}
            <section className="space-y-3">
              <h2
                className="text-xl font-medium text-[#111110] border-b border-[#E4E2DC] pb-1.5"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                § 2. Convergent Infinite Geometric Series Terminal Valuation &amp; LBO IRR
              </h2>
              <p className="text-[13.5px] text-[#2A2A28] leading-relaxed">
                To eliminate circular multiple arbitrage, Axiom Diligence evaluates terminal enterprise value{' '}
                <LatexBlock display={false} tex="\text{TV}_T" katexReady={katexReady} /> both via market exit multiples and via the exact closed-form limit of an infinite geometric series of unlevered free cash flows growing at perpetuity rate{' '}
                <LatexBlock display={false} tex="g" katexReady={katexReady} /> discounted at weighted average cost of capital{' '}
                <LatexBlock display={false} tex="\text{WACC} > g" katexReady={katexReady} />:
              </p>
              <div className="p-4 bg-[#FAF9F5] border border-[#E4E2DC] rounded space-y-3">
                <LatexBlock
                  tex={
                    latexMode === 'numerical'
                      ? liveLatexFormulas.perpetuity.numerical
                      : liveLatexFormulas.perpetuity.symbolic
                  }
                  katexReady={katexReady}
                />
                <div className="border-t border-[#E4E2DC] pt-3">
                  <LatexBlock
                    tex={
                      latexMode === 'numerical'
                        ? liveLatexFormulas.irr.numerical
                        : liveLatexFormulas.irr.symbolic
                    }
                    katexReady={katexReady}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Computational Complexity & TreeSHAP */}
            <section className="space-y-3">
              <h2
                className="text-xl font-medium text-[#111110] border-b border-[#E4E2DC] pb-1.5"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                § 3. Polynomial-Time TreeSHAP Credit Attribution (
                <LatexBlock display={false} tex="\mathcal{O}(T L D^2)" katexReady={katexReady} /> vs.{' '}
                <LatexBlock display={false} tex="\mathcal{O}(M 2^M)" katexReady={katexReady} />)
              </h2>
              <p className="text-[13.5px] text-[#2A2A28] leading-relaxed">
                In cooperative game theory, the Shapley value{' '}
                <LatexBlock display={false} tex="\phi_i(f, x)" katexReady={katexReady} /> uniquely satisfies local accuracy, missingness, and consistency for attributing a borrower's 5-year Probability of Default{' '}
                <LatexBlock display={false} tex="\text{PD}_{5\text{Y}}(x)" katexReady={katexReady} /> across{' '}
                <LatexBlock display={false} tex="M" katexReady={katexReady} /> credit ratios. Evaluating all{' '}
                <LatexBlock display={false} tex="2^M" katexReady={katexReady} /> feature coalitions directly is #P-hard. By restricting the hypothesis class{' '}
                <LatexBlock display={false} tex="f" katexReady={katexReady} /> to an ensemble of{' '}
                <LatexBlock display={false} tex="T" katexReady={katexReady} /> gradient-boosted decision trees with{' '}
                <LatexBlock display={false} tex="L" katexReady={katexReady} /> leaves and maximum depth{' '}
                <LatexBlock display={false} tex="D" katexReady={katexReady} />, Axiom Diligence tracks coalition weights recursively down each tree branch in polynomial time:
              </p>
              <div className="p-4 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                <LatexBlock
                  tex={
                    latexMode === 'numerical'
                      ? liveLatexFormulas.shap.numerical
                      : liveLatexFormulas.shap.symbolic
                  }
                  katexReady={katexReady}
                />
              </div>
            </section>

            {/* Section 4: Stochastic Differential Equation Covenant Stress */}
            <section className="space-y-3">
              <h2
                className="text-xl font-medium text-[#111110] border-b border-[#E4E2DC] pb-1.5"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                § 4. Stochastic Cash Flow SDE &amp; Monte Carlo Covenant Breach Estimator
              </h2>
              <p className="text-[13.5px] text-[#2A2A28] leading-relaxed">
                We model borrower operating cash flow under a Geometric Brownian Motion stochastic process with volatility{' '}
                <LatexBlock display={false} tex="\sigma" katexReady={katexReady} /> and interest rate shock{' '}
                <LatexBlock display={false} tex="\Delta r_{\text{SOFR}}" katexReady={katexReady} />. Across{' '}
                <LatexBlock display={false} tex="N = 1,000" katexReady={katexReady} /> Box-Muller normal paths, the probability of breaching maintenance leverage ceiling{' '}
                <LatexBlock display={false} tex="\bar{L}_{\max}" katexReady={katexReady} /> in year{' '}
                <LatexBlock display={false} tex="t" katexReady={katexReady} /> is given by:
              </p>
              <div className="p-4 bg-[#FAF9F5] border border-[#E4E2DC] rounded">
                <LatexBlock
                  tex={
                    latexMode === 'numerical'
                      ? liveLatexFormulas.monteCarlo.numerical
                      : liveLatexFormulas.monteCarlo.symbolic
                  }
                  katexReady={katexReady}
                />
              </div>
            </section>
          </article>
        </main>
      )}

      {/* ====================================================================
          MODAL 1: ⌘K COMMAND PALETTE
         ==================================================================== */}
      {cmdPaletteOpen && (
        <div
          onClick={() => setCmdPaletteOpen(false)}
          className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center pt-24 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white border border-[#111110] rounded-[5px] shadow-xl overflow-hidden"
          >
            <div className="px-3.5 py-2.5 border-b border-[#E4E2DC] flex items-center gap-2">
              <Command className="w-4 h-4 text-[#787774]" />
              <input
                type="text"
                autoFocus
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                placeholder="Jump to surface, module, deal, or toggle LaTeX mode..."
                className="w-full text-[13px] text-[#111110] placeholder-[#787774] focus:outline-none"
              />
              <button
                onClick={() => setCmdPaletteOpen(false)}
                className="text-[#787774] hover:text-[#111110]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-[#EAE8E2]">
              {commandActions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setCmdPaletteOpen(false);
                  }}
                  className="w-full px-3.5 py-2.5 text-left hover:bg-[#F0F5FF] flex items-center justify-between text-[12px] transition-colors"
                >
                  <span className="font-medium text-[#111110]">{item.label}</span>
                  <span className="text-[10px] font-mono uppercase text-[#787774] bg-[#FAF9F5] px-1.5 py-0.5 rounded border border-[#E4E2DC]">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: + NEW DEAL / UPLOAD CIM PARSER
         ==================================================================== */}
      {newDealModalOpen && (
        <div
          onClick={() => setNewDealModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white border border-[#111110] rounded-[5px] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 bg-[#FAF9F5] border-b border-[#E4E2DC] flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#111110]">
                Axiom Diligence · Parse New Confidential Information Memorandum
              </span>
              <button
                onClick={() => setNewDealModalOpen(false)}
                className="text-[#787774] hover:text-[#111110]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomDeal} className="p-4 space-y-3.5 text-[12px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#575653] mb-1">
                    Target Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Orion Automation Corp."
                    value={newDealName}
                    onChange={(e) => setNewDealName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[4px] border border-[#E4E2DC] text-[#111110] focus:border-[#0044CC] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#575653] mb-1">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    value={newDealSector}
                    onChange={(e) => setNewDealSector(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-[4px] border border-[#E4E2DC] text-[#111110] focus:border-[#0044CC] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#575653] mb-1">
                  Paste Raw CIM Financial Excerpt (Revenue, Reported EBITDA, Footnotes)
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., FY24 Revenue $68.5M, Reported EBITDA $14.2M. Founder excess compensation $1.1M..."
                  value={newDealRawText}
                  onChange={(e) => setNewDealRawText(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[#E4E2DC] font-mono text-[11px] text-[#111110] focus:border-[#0044CC] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E4E2DC]">
                <button
                  type="button"
                  onClick={() => setNewDealModalOpen(false)}
                  className="px-3 py-1.5 rounded-[4px] border border-[#E4E2DC] text-[#575653] hover:text-[#111110]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-[4px] bg-[#111110] text-white font-medium hover:bg-[#272725]"
                >
                  Parse CIM &amp; Initialize Workbench
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}