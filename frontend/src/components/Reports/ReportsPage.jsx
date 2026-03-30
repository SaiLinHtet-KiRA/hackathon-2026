import React, { useState } from "react";
import {
  FileBarChart2,
  Globe,
  Download,
  FileText,
  Calendar,
  Filter,
} from "lucide-react";
import { recentReports } from "../../data/mockData";
import { useGetIncidentsQuery } from "../../redux/api/incident";
import Loader from "../Loader";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "th", label: "Thai", flag: "🇹🇭" },
  { code: "ms", label: "Malay", flag: "🇲🇾" },
  { code: "my", label: "Burmese", flag: "🇲🇲" },
  { code: "zh", label: "Chinese", flag: "🇨🇳" },
  { code: "dz", label: "Bhutan", flag: "🇧🇹" },
];

const reportContent = {
  en: {
    title: "CrashFusion Accident Intelligence Report",
    subtitle: "Automated Multi-Source Incident Analysis",
    summary: "EXECUTIVE SUMMARY",
    summaryText:
      "This report covers traffic accident incidents detected and corroborated by the CrashFusion AI system for the reporting period. A total of 47 incidents were recorded, with 8 classified as Critical severity requiring immediate emergency response. AI fusion analysis achieved an average confidence score of 83.2% across all detections.",
    stats: "KEY STATISTICS",
    statItems: [
      { label: "Total Incidents", value: "47" },
      { label: "Critical Severity", value: "8" },
      { label: "High Severity", value: "15" },
      { label: "Average AI Confidence", value: "83.2%" },
      { label: "SMS Corroborations", value: "10" },
      { label: "Response Rate", value: "94.5%" },
    ],
    topIncidents: "TOP CRITICAL INCIDENTS",
    recommendations: "RECOMMENDATIONS",
    recItems: [
      "Increase patrol frequency on North Highway during peak hours (06:00–09:00, 16:00–19:00).",
      "Repair or replace CAM-W-302 (Westside Block 800) — currently offline, reducing coverage.",
      "Deploy additional CCTV nodes at South Ring Road KM 12 where pedestrian incidents are recurring.",
      "Implement SMS alert broadcast to registered first responders for Critical incidents.",
    ],
  },
  th: {
    title: "รายงานข่าวกรองอุบัติเหตุ CrashFusion",
    subtitle: "การวิเคราะห์เหตุการณ์อัตโนมัติจากหลายแหล่ง",
    summary: "บทสรุปผู้บริหาร",
    summaryText:
      "รายงานนี้ครอบคลุมเหตุการณ์อุบัติเหตุทางถนนที่ตรวจพบและยืนยันโดยระบบ AI ของ CrashFusion สำหรับช่วงเวลาที่รายงาน โดยมีเหตุการณ์ทั้งหมด 47 ครั้ง โดย 8 ครั้งถูกจัดว่ามีความรุนแรงระดับวิกฤตที่ต้องการการตอบสนองฉุกเฉินทันที การวิเคราะห์แบบผสานข้อมูล AI บรรลุคะแนนความเชื่อมั่นเฉลี่ย 83.2% สำหรับการตรวจจับทั้งหมด",
    stats: "สถิติสำคัญ",
    statItems: [
      { label: "เหตุการณ์ทั้งหมด", value: "47" },
      { label: "ระดับวิกฤต", value: "8" },
      { label: "ระดับสูง", value: "15" },
      { label: "ความเชื่อมั่น AI เฉลี่ย", value: "83.2%" },
      { label: "การยืนยันทาง SMS", value: "10" },
      { label: "อัตราการตอบสนอง", value: "94.5%" },
    ],
    topIncidents: "เหตุการณ์วิกฤตสูงสุด",
    recommendations: "ข้อเสนอแนะ",
    recItems: [
      "เพิ่มความถี่ในการลาดตระเวนบนทางหลวงสายเหนือในชั่วโมงเร่งด่วน (06:00–09:00, 16:00–19:00)",
      "ซ่อมแซมหรือเปลี่ยน CAM-W-302 (Westside Block 800) — ปัจจุบันออฟไลน์ ลดพื้นที่ครอบคลุม",
      "ติดตั้งโหนด CCTV เพิ่มเติมที่ South Ring Road KM 12 ซึ่งเหตุการณ์คนเดินเท้าเกิดขึ้นซ้ำ",
      "ดำเนินการแจ้งเตือน SMS ให้กับผู้ตอบสนองฉุกเฉินที่ลงทะเบียนสำหรับเหตุการณ์วิกฤต",
    ],
  },
  ms: {
    title: "Laporan Perisikan Kemalangan CrashFusion",
    subtitle: "Analisis Insiden Automatik Berbilang Sumber",
    summary: "RINGKASAN EKSEKUTIF",
    summaryText:
      "Laporan ini merangkumi insiden kemalangan lalu lintas yang dikesan dan disahkan oleh sistem AI CrashFusion untuk tempoh pelaporan. Sejumlah 47 insiden telah direkodkan, dengan 8 diklasifikasikan sebagai keterukan Kritikal yang memerlukan tindak balas kecemasan segera. Analisis gabungan AI mencapai skor keyakinan purata 83.2% merentas semua pengesanan.",
    stats: "STATISTIK UTAMA",
    statItems: [
      { label: "Jumlah Insiden", value: "47" },
      { label: "Keterukan Kritikal", value: "8" },
      { label: "Keterukan Tinggi", value: "15" },
      { label: "Purata Keyakinan AI", value: "83.2%" },
      { label: "Pengesahan SMS", value: "10" },
      { label: "Kadar Tindak Balas", value: "94.5%" },
    ],
    topIncidents: "INSIDEN KRITIKAL TERATAS",
    recommendations: "CADANGAN",
    recItems: [
      "Tingkatkan kekerapan rondaan di Lebuhraya Utara semasa waktu puncak (06:00–09:00, 16:00–19:00).",
      "Baiki atau ganti CAM-W-302 (Westside Block 800) — kini luar talian, mengurangkan liputan.",
      "Pasang nod CCTV tambahan di South Ring Road KM 12 di mana insiden pejalan kaki berulang.",
      "Laksanakan siaran amaran SMS kepada petugas pertolongan pertama berdaftar untuk insiden Kritikal.",
    ],
  },
  my: {
    title: "CrashFusion မတော်တဆမှု ထောက်လှမ်းရေးအစီရင်ခံစာ",
    subtitle: "အလိုအလျောက် ဘက်စုံရင်းမြစ် ဖြစ်ရပ်ခွဲခြမ်းစိတ်ဖြာမှု",
    summary: "အမှုဆောင်အကျဉ်းချုပ်",
    summaryText:
      "ဤအစီရင်ခံစာတွင် CrashFusion AI စနစ်မှ သတင်းပေးပို့ကာလအတွင်း တွေ့ရှိပြီး အတည်ပြုသော လမ်းပေါ်မတော်တဆမှု ဖြစ်ရပ်များပါဝင်သည်။ ဖြစ်ရပ်စုစုပေါင်း ၄၇ ခု မှတ်တမ်းတင်ခဲ့ပြီး ၈ ခုသည် ချက်ချင်းသောသောအရေးပေါ်တုံ့ပြန်မှု လိုအပ်သည့် အမြင့်ဆုံးအဆင့် အဖြစ် သတ်မှတ်ခဲ့သည်။ AI ပေါင်းစပ်ခွဲခြမ်းစိတ်ဖြာမှုသည် ပျမ်းမျှ ယုံကြည်မှုရမှတ် 83.2% ရရှိသည်။",
    stats: "အဓိကစာရင်းဇယားများ",
    statItems: [
      { label: "ဖြစ်ရပ်စုစုပေါင်း", value: "47" },
      { label: "အမြင့်ဆုံးအဆင့်", value: "8" },
      { label: "မြင့်မားသောအဆင့်", value: "15" },
      { label: "ပျမ်းမျှ AI ယုံကြည်မှု", value: "83.2%" },
      { label: "SMS အတည်ပြုချက်", value: "10" },
      { label: "တုံ့ပြန်မှုနှုန်း", value: "94.5%" },
    ],
    topIncidents: "အမြင့်ဆုံးဖြစ်ရပ်များ",
    recommendations: "အကြံပြုချက်များ",
    recItems: [
      "အထွတ်အထိပ်ချိန်တွင် မြောက်ပိုင်းလမ်းမတော်ပေါ်ရှိ ကင်းလှည့်ကင်မှုကို တိုးမြှင့်ပါ (06:00–09:00, 16:00–19:00)။",
      "CAM-W-302 (Westside Block 800) ကို ပြုပြင်သည် သို့မဟုတ် အစားထိုးပါ — လောလောဆယ် offline ဖြစ်နေသည်။",
      "South Ring Road KM 12 တွင် ပြင်ပ CCTV node များ တပ်ဆင်ပါ။",
      "အရေးပေါ်ဖြစ်ရပ်များအတွက် မှတ်ပုံတင်ထားသော ပထမတုံ့ပြန်သူများသို့ SMS သတိပေးချက် ထုတ်ဝေပါ။",
    ],
  },
  zh: {
    title: "CrashFusion事故情报报告",
    subtitle: "自动多源事件分析系统",
    summary: "执行摘要",
    summaryText:
      "本报告涵盖CrashFusion人工智能系统在报告期内检测和证实的交通事故事件。共记录了47起事故，其中8起被归类为需要立即紧急响应的危急严重程度。人工智能融合分析在所有检测中达到了平均83.2%的置信度。",
    stats: "关键统计数据",
    statItems: [
      { label: "事故总数", value: "47" },
      { label: "危急严重", value: "8" },
      { label: "高度严重", value: "15" },
      { label: "平均AI置信度", value: "83.2%" },
      { label: "SMS确认", value: "10" },
      { label: "响应率", value: "94.5%" },
    ],
    topIncidents: "最高危急事故",
    recommendations: "建议",
    recItems: [
      "在高峰时段（06:00–09:00，16:00–19:00）增加北部高速公路的巡逻频率。",
      "修复或更换CAM-W-302（西侧大道800号）——目前已离线，减少了覆盖范围。",
      "在南环路12公里处部署额外的CCTV节点，该地区行人事故频发。",
      "对危急事故向已注册的急救人员实施短信警报广播。",
    ],
  },
  dz: {
    title: "CrashFusion རླངས་འཁོར་དོན་རྐྱེན་སྙན་ཐོ།",
    subtitle: "རང་འགུལ་ཐབས་ལམ་གྱི་དོན་རྐྱེན་དབྱེ་ཞིབ།",
    summary: "དོན་གཙོའི་སྙན་ཐོ།",
    summaryText:
      "སྙན་ཐོ་འདི་ནང་ CrashFusion AI མཉམ་འབྲེལ་ལས་སྣ་ཡིས་ཉར་ཚགས་དུས་ཡུན་ནང་འཚོལ་ཞིབ་དང་གཏན་འཁེལ་བྱས་པའི་རླངས་འཁོར་དོན་རྐྱེན་ཚུ་ཚུད་ཡོད། སྤྱིར་བཏང་དོན་རྐྱེན་47ཅིག་ཐོ་བཀོད་འབད་ཡོདཔ་ལས་དོན་རྐྱེན་8ཅིག་ཚབས་ཆེ་ཤོས་ཀྱི་གོ་རིམ་ལུ་ངོས་འཛིན་འབད་ཡོད། AI མཉམ་འབྲེལ་དབྱེ་ཞིབ་ཀྱིས་ཆ་སྙོམས་ 83.2% ཀྱི་ཡིད་ཆེས་རྒྱུ་མཚན་ས་ལ་སླེབས་ཡོད།",
    stats: "གནད་ཁག་ཐོ་རྒྱུགས།",
    statItems: [
      { label: "དོན་རྐྱེན་ཕྱོགས་བསྡུས།", value: "47" },
      { label: "ཚབས་ཆེ་ཤོས།", value: "8" },
      { label: "ཚབས་ཆེ།", value: "15" },
      { label: "ཆ་སྙོམས་ AI ཡིད་ཆེས།", value: "83.2%" },
      { label: "SMS གཏན་འཁེལ།", value: "10" },
      { label: "ལན་འདེབས་ཚད།", value: "94.5%" },
    ],
    topIncidents: "ཚབས་ཆེ་ཤོས་དོན་རྐྱེན་ཚུ།",
    recommendations: "བསམ་འཆར་ཚུ།",
    recItems: [
      "དུས་ཚོད་གལ་ཆེ་པའི་སྐབས་ (06:00–09:00, 16:00–19:00) བྱང་ཕྱོགས་ལམ་ཐག་ལུ་སྲུང་སྐྱོབ་བྱིན་ཐངས་མང་རུ་གཏང་།",
      "CAM-W-302 (Westside Block 800) བཅོས་སྐྱོན་ཡང་ན་གསར་བཙུགས་བྱ་རོགས། — མི་སྦྲགས་ཡོད།",
      "South Ring Road KM 12 ལུ་ CCTV གནས་ཚུ་ཌིང་མཐར་གསར་བཙུགས་བྱ།",
      "ཚབས་ཆེ་ཤོས་དོན་རྐྱེན་ཚུ་གི་དོན་ལུ་ SMS སྔོན་བརྡ་ལས་འགུལ་འགན་ལེན་མི་ཚུ་ལུ་གཏང་།",
    ],
  },
};

const statusColors = {
  "Auto-Detected": { bg: "rgba(99,102,241,0.15)", text: "#6366f1" },
  "Under Review": { bg: "rgba(234,179,8,0.15)", text: "#eab308" },
  Dispatched: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
  "SMS Confirmed": { bg: "rgba(139,92,246,0.15)", text: "#8b5cf6" },
  "False Alarm": { bg: "rgba(107,114,128,0.15)", text: "#6b7280" },
};
const severityColors = {
  Critical: { text: "#ef4444" },
  High: { text: "#f97316" },
  Medium: { text: "#eab308" },
  Low: { text: "#3b82f6" },
};

export default function ReportsPage() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedIncident, setSelectedIncident] = useState("all");
  const [dateFrom, setDateFrom] = useState("2023-12-18");
  const [dateTo, setDateTo] = useState("2023-12-18");
  const [generated, setGenerated] = useState(false);
  const { data, isLoading } = useGetIncidentsQuery({});
  if (isLoading) return <Loader />;
  const content = reportContent[selectedLang];
  const langLabel = languages.find((l) => l.code === selectedLang);
  const filteredIncidents =
    selectedIncident === "all"
      ? data
      : data.filter((i) => i.id === selectedIncident);

  const handlePDF = () => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      alert("Please allow popups to download PDF.");
      return;
    }
    const rows = filteredIncidents
      .map(
        (inc) => `
      <tr>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;font-family:monospace;color:#1d4ed8">${inc.id}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${inc.location}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${inc.vehicleType}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee;font-weight:700;color:${inc.severity === "Critical" ? "#dc2626" : inc.severity === "High" ? "#ea580c" : inc.severity === "Medium" ? "#ca8a04" : "#2563eb"}">${inc.severity}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${inc.aiConfidence}%</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${inc.status}</td>
        <td style="padding:6px 10px;border-bottom:1px solid #eee">${inc.condition}</td>
      </tr>`,
      )
      .join("");
    printWindow.document.write(`<!DOCTYPE html><html><head>
      <meta charset="utf-8"/>
      <title>CrashFusion Report</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Noto+Sans+Thai&family=Noto+Sans+SC&family=Noto+Sans+Tamil&display=swap');
        body{font-family:'Noto Sans',sans-serif;margin:40px;color:#111;background:#fff}
        h1{font-size:22px;color:#1e40af;margin-bottom:4px}
        h2{font-size:13px;color:#64748b;font-weight:normal;margin:0 0 24px}
        .badge{background:#dbeafe;color:#1e40af;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700}
        .meta{display:flex;gap:24px;margin-bottom:20px;font-size:12px;color:#64748b}
        .stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}
        .stat-card{border:1px solid #e2e8f0;border-radius:8px;padding:12px}
        .stat-val{font-size:22px;font-weight:700;color:#111}
        .stat-lbl{font-size:11px;color:#94a3b8;margin-top:2px}
        table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
        th{text-align:left;padding:8px 10px;background:#f8fafc;border-bottom:2px solid #e2e8f0;color:#475569;font-weight:600}
        .rec{background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;margin:6px 0;font-size:12px;border-radius:0 6px 6px 0}
        .footer{margin-top:40px;border-top:1px solid #e2e8f0;padding-top:12px;font-size:11px;color:#94a3b8}
        @media print{body{margin:20px}.no-print{display:none}}
      </style>
    </head><body>
      <div class="badge">${langLabel?.flag} ${langLabel?.label} Report</div>
      <h1 style="margin-top:12px">${content.title}</h1>
      <h2>${content.subtitle}</h2>
      <div class="meta">
        <span>Period: <b>${dateFrom}</b> to <b>${dateTo}</b></span>
        <span>Scope: <b>${selectedIncident === "all" ? "All Incidents" : selectedIncident}</b></span>
        <span>Generated: <b>${new Date().toLocaleString()}</b></span>
      </div>
      <h3 style="font-size:11px;letter-spacing:1px;color:#3b82f6">${content.summary}</h3>
      <p style="font-size:13px;line-height:1.7;color:#374151">${content.summaryText}</p>
      <h3 style="font-size:11px;letter-spacing:1px;color:#3b82f6">${content.stats}</h3>
      <div class="stat-grid">
        ${content.statItems.map((s) => `<div class="stat-card"><div class="stat-val">${s.value}</div><div class="stat-lbl">${s.label}</div></div>`).join("")}
      </div>
      <h3 style="font-size:11px;letter-spacing:1px;color:#3b82f6;margin-top:20px">${content.topIncidents}</h3>
      <table>
        <thead><tr>
          <th>ID</th><th>Location</th><th>Type</th><th>Severity</th><th>AI%</th><th>Status</th><th>Condition</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <h3 style="font-size:11px;letter-spacing:1px;color:#3b82f6;margin-top:20px">${content.recommendations}</h3>
      ${content.recItems.map((r, i) => `<div class="rec">${i + 1}. ${r}</div>`).join("")}
      <div class="footer">Generated by CrashFusion AI Fusion Engine v2.4 · Confidential</div>
      <script>window.onload=()=>{window.print()}</script>
    </body></html>`);
    printWindow.document.close();
  };

  const handleCSV = () => {
    const headers = [
      "Incident ID",
      "Timestamp",
      "Camera ID",
      "Location",
      "Vehicle Type",
      "AI Confidence (%)",
      "Severity",
      "Status",
      "Condition",
      "Latitude",
      "Longitude",
    ];
    const rows = filteredIncidents.map((inc) => [
      inc.id,
      inc.timestamp,
      inc.cameraId,
      `"${inc.location}"`,
      inc.vehicleType,
      inc.aiConfidence,
      inc.severity,
      inc.status,
      inc.condition,
      inc.lat,
      inc.lng,
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `crashfusion_report_${dateFrom}_${dateTo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-xl font-bold flex items-center gap-2"
          style={{ color: "var(--fg)" }}
        >
          <FileBarChart2 size={20} className="text-blue-500" />
          Reports & Analytics
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--fg2)" }}>
          Generate multi-language accident intelligence reports
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-5"
        style={{ alignItems: "flex-start" }}
      >
        {/* Left: Generator Form */}
        <div className="col-span-1 space-y-4">
          <div
            className="rounded-2xl p-5 space-y-4"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              className="text-sm font-semibold flex items-center gap-2"
              style={{ color: "var(--fg)" }}
            >
              <Filter size={14} className="text-blue-500" />
              Report Generator
            </div>

            {/* Language selector */}
            <div>
              <label
                className="text-xs font-semibold mb-2 block"
                style={{ color: "var(--fg3)" }}
              >
                <Globe size={11} className="inline mr-1" />
                OUTPUT LANGUAGE
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className="flex items-center gap-2 px-3 py-3.5 rounded-lg text-xs font-medium transition-colors"
                    style={{
                      backgroundColor:
                        selectedLang === lang.code
                          ? "rgba(59,130,246,0.08)"
                          : "var(--subtle)",
                      color:
                        selectedLang === lang.code ? "#3b82f6" : "var(--fg2)",
                      border: `1px solid ${selectedLang === lang.code ? "rgba(59,130,246,0.3)" : "var(--border)"}`,
                    }}
                  >
                    <span>{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Incident filter */}
            <div>
              <label
                className="text-xs font-semibold mb-2 block"
                style={{ color: "var(--fg3)" }}
              >
                INCIDENT SCOPE
              </label>
              <select
                className="w-full px-3 py-3.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                style={{
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--fg)",
                }}
                value={selectedIncident}
                onChange={(e) => setSelectedIncident(e.target.value)}
              >
                <option value="all">All Incidents</option>
                {data.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.id} — {inc.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div>
              <label
                className="text-xs font-semibold mb-2 block"
                style={{ color: "var(--fg3)" }}
              >
                <Calendar size={11} className="inline mr-1" />
                DATE RANGE
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-3.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                  }}
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-3.5 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                  style={{
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setGenerated(true)}
              className="w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ background: "#3b82f6", color: "#fff" }}
            >
              Generate Report
            </button>

            {generated && (
              <div className="flex gap-2">
                <button
                  onClick={handlePDF}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-50"
                  style={{
                    backgroundColor: "var(--subtle)",
                    color: "#3b82f6",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Download size={13} />
                  PDF
                </button>
                <button
                  onClick={handleCSV}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-green-50"
                  style={{
                    backgroundColor: "var(--subtle)",
                    color: "#22c55e",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Download size={13} />
                  CSV
                </button>
              </div>
            )}
          </div>

          {/* Recent Reports */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                borderBottom: "1px solid var(--border)",
                backgroundColor: "var(--subtle)",
              }}
            >
              <FileText size={14} className="text-blue-500" />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--fg)" }}
              >
                Recent Reports
              </span>
            </div>
            <div>
              {recentReports.map((rpt, i) => (
                <div
                  key={rpt.id}
                  className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
                  style={{
                    borderBottom:
                      i < recentReports.length - 1
                        ? "1px solid var(--divider)"
                        : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "var(--fg)" }}
                    >
                      {rpt.title}
                    </div>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs flex-shrink-0"
                      style={{
                        backgroundColor: "rgba(59,130,246,0.1)",
                        color: "#3b82f6",
                      }}
                    >
                      {rpt.format}
                    </span>
                  </div>
                  <div className="text-xs mt-1" style={{ color: "var(--fg3)" }}>
                    {rpt.generatedAt} · {rpt.incidents} incidents ·{" "}
                    {rpt.language}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Generated Report */}
        <div className="col-span-2">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow)",
            }}
          >
            {/* Report Header */}
            <div
              className="px-6 py-4"
              style={{
                borderBottom: "1px solid var(--border)",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: "#3b82f6" }}
                  >
                    CRASHFUSION AI ·{" "}
                    {languages.find((l) => l.code === selectedLang)?.flag}{" "}
                    {languages
                      .find((l) => l.code === selectedLang)
                      ?.label.toUpperCase()}
                  </div>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: "var(--fg)" }}
                  >
                    {content.title}
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: "var(--fg2)" }}>
                    {content.subtitle}
                  </p>
                </div>
                <div
                  className="text-right text-xs"
                  style={{ color: "var(--fg3)" }}
                >
                  <div>Report ID: RPT-{Date.now().toString().slice(-6)}</div>
                  <div>
                    Period: {dateFrom} to {dateTo}
                  </div>
                  <div className="mt-1">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(34,197,94,0.1)",
                        color: "#16a34a",
                      }}
                    >
                      Auto-Generated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Summary */}
              <section>
                <h3
                  className="text-xs font-bold mb-2 tracking-wider"
                  style={{ color: "#3b82f6" }}
                >
                  {content.summary}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--fg)" }}
                >
                  {content.summaryText}
                </p>
              </section>

              {/* Stats grid */}
              <section>
                <h3
                  className="text-xs font-bold mb-3 tracking-wider"
                  style={{ color: "#3b82f6" }}
                >
                  {content.stats}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {content.statItems.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-3"
                      style={{
                        backgroundColor: "var(--subtle)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        className="text-xl font-bold"
                        style={{ color: "var(--fg)" }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--fg2)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Top Incidents table */}
              <section>
                <h3
                  className="text-xs font-bold mb-3 tracking-wider"
                  style={{ color: "#3b82f6" }}
                >
                  {content.topIncidents}
                </h3>
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <table className="w-full text-xs">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "var(--subtle)",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          ID
                        </th>
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          Location
                        </th>
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          Type
                        </th>
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          Severity
                        </th>
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          AI%
                        </th>
                        <th
                          className="px-3 py-2 text-left font-semibold"
                          style={{ color: "var(--fg2)" }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data
                        .filter(
                          (i) =>
                            i.severity === "Critical" || i.severity === "High",
                        )
                        .slice(0, 5)
                        .map((inc, i, arr) => {
                          const sc = severityColors[inc.severity] || {};
                          const stc = statusColors[inc.status] || {};
                          return (
                            <tr
                              key={inc.id}
                              className="hover:bg-slate-50 transition-colors"
                              style={{
                                borderBottom:
                                  i < arr.length - 1
                                    ? "1px solid var(--divider)"
                                    : "none",
                              }}
                            >
                              <td
                                className="px-3 py-2 font-mono"
                                style={{ color: "#3b82f6" }}
                              >
                                {inc.id}
                              </td>
                              <td
                                className="px-3 py-2"
                                style={{ color: "var(--fg)" }}
                              >
                                {inc.location}
                              </td>
                              <td
                                className="px-3 py-2"
                                style={{ color: "var(--fg2)" }}
                              >
                                {inc.vehicleType}
                              </td>
                              <td className="px-3 py-2">
                                <span
                                  className="font-semibold"
                                  style={{ color: sc.text }}
                                >
                                  {inc.severity}
                                </span>
                              </td>
                              <td
                                className="px-3 py-2 font-mono"
                                style={{ color: "#16a34a" }}
                              >
                                {inc.aiConfidence}%
                              </td>
                              <td className="px-3 py-2">
                                <span
                                  className="px-1.5 py-0.5 rounded text-xs font-semibold"
                                  style={{
                                    backgroundColor: stc.bg,
                                    color: stc.text,
                                  }}
                                >
                                  {inc.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <h3
                  className="text-xs font-bold mb-3 tracking-wider"
                  style={{ color: "#3b82f6" }}
                >
                  {content.recommendations}
                </h3>
                <div className="space-y-2">
                  {content.recItems.map((rec, i) => (
                    <div
                      key={i}
                      className="flex gap-3 px-3 py-3.5 rounded-lg text-sm"
                      style={{
                        backgroundColor: "rgba(59,130,246,0.04)",
                        border: "1px solid rgba(59,130,246,0.12)",
                        color: "var(--fg)",
                      }}
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(59,130,246,0.12)",
                          color: "#3b82f6",
                        }}
                      >
                        {i + 1}
                      </span>
                      {rec}
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer */}
              <div
                className="pt-3 text-xs"
                style={{
                  borderTop: "1px solid var(--border)",
                  color: "var(--fg3)",
                }}
              >
                Generated by CrashFusion AI Fusion Engine v2.4 · Confidential —
                For authorized personnel only
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
