import PostData from "./post.js";

const report = {
  path: "report",
  data: [
    {
      id: "WIT-001",
      phone: "+60-***-****-8821",
      language: "Malay",
      languageCode: "MS",
      original:
        "Kemalangan teruk di Lebuhraya Utara, kereta hancur, tolong hantar ambulans cepat.",
      translation:
        "Severe accident on North Highway, car crushed, please send an ambulance quickly.",
      severity: "Critical",
      // incidentMatch: "INC-2023-8901",
      incidentMatch: "69ca09118aea83b2f205e459",
      time: "03:16 PM",
    },
    {
      id: "WIT-002",
      phone: "+95-***-****-5542",
      language: "Burmese",
      languageCode: "MY",
      original: "မော်တော်ယာဉ်မတော်တဆမှုဖြစ်ပွားသည်။ သွေးများစီးဆင်းနေသည်။",
      translation:
        "A car accident happened. Profuse bleeding. Need help urgently on South Ring Road.",
      severity: "Critical",
      // incidentMatch: "INC-2023-8904",
      incidentMatch: "69ca09118aea83b2f205e45b",
      time: "06:21 PM",
    },
    {
      id: "WIT-003",
      phone: "+66-***-****-3317",
      language: "Thai",
      languageCode: "TH",
      original: "อุบัติเหตุรถชนกันที่แยก มีคนบาดเจ็บ รีบมาด่วน",
      translation:
        "Car accident at the intersection. People are injured. Come quickly.",
      severity: "High",
      // incidentMatch: "INC-2023-8902",
      incidentMatch: "69ca09118aea83b2f205e457",
      time: "04:43 PM",
    },
    {
      id: "WIT-004",
      phone: "+86-***-****-7723",
      language: "Chinese",
      languageCode: "ZH",
      original: "工业园路发生严重交通事故，大卡车撞上小汽车，需要紧急救援。",
      translation:
        "Serious traffic accident on Industrial Park Road. Large truck hit a car. Emergency rescue needed.",
      severity: "High",
      // incidentMatch: "INC-2023-8907",
      incidentMatch: "69ca09118aea83b2f205e465",
      time: "08:11 PM",
    },
    {
      id: "WIT-005",
      phone: "+60-***-****-9934",
      language: "Tamil",
      languageCode: "TA",
      original: "பாலத்தில் விபத்து நடந்தது. இரண்டு கார்கள் மோதின. உதவி தேவை.",
      translation:
        "Accident happened on the bridge. Two cars collided. Need help.",
      severity: "Medium",
      // incidentMatch: "INC-2023-8908",
      incidentMatch: "69ca09118aea83b2f205e467",
      time: "09:31 PM",
    },
    {
      id: "WIT-006",
      phone: "+66-***-****-1122",
      language: "Thai",
      languageCode: "TH",
      original: "เห็นรถชนกันบนสะพาน มีควันออกมาจากรถ ต้องการความช่วยเหลือด่วน",
      translation:
        "Witnessed cars colliding on the bridge. Smoke coming from vehicles. Need urgent help.",
      severity: "High",
      // incidentMatch: "INC-2023-8901",
      incidentMatch: "69ca09118aea83b2f205e459",
      time: "03:18 PM",
    },
    {
      id: "WIT-007",
      phone: "+66-***-****-8801",
      language: "Thai",
      languageCode: "TH",
      original: "รถจักรยานยนต์ล้มที่วงเวียน มีผู้บาดเจ็บเล็กน้อย",
      translation: "Motorcycle fell at the roundabout. Minor injuries.",
      severity: "Low",
      // incidentMatch: "INC-2023-8905",
      incidentMatch: "69ca09118aea83b2f205e45d",
      time: "07:03 PM",
    },
    {
      id: "WIT-008",
      phone: "+95-***-****-4456",
      language: "Burmese",
      languageCode: "MY",
      original: "တံတားပေါ်မှာ ကားနှစ်စီးတိုက်မိသည်။ လမ်းပိတ်နေသည်။",
      translation: "Two cars collided on the bridge. Road is blocked.",
      severity: "Medium",
      // incidentMatch: "INC-2023-8908",
      incidentMatch: "69ca09118aea83b2f205e467",
      time: "09:32 PM",
    },
    {
      id: "WIT-009",
      phone: "+86-***-****-5501",
      language: "Chinese",
      languageCode: "ZH",
      original: "南环路发生交通事故，有行人被撞，请快点来！",
      translation:
        "Traffic accident on South Ring Road. A pedestrian was hit. Please come quickly!",
      severity: "Critical",
      // incidentMatch: "INC-2023-8904",
      incidentMatch: "69ca09118aea83b2f205e45b",
      time: "06:22 PM",
    },
    {
      id: "WIT-010",
      phone: "+60-***-****-7788",
      language: "Tamil",
      languageCode: "TA",
      original:
        "வடக்கு நெடுஞ்சாலையில் கடுமையான விபத்து. ஆம்புலன்ஸ் அனுப்புங்கள்.",
      translation: "Severe accident on North Highway. Send ambulance.",
      severity: "Critical",
      // incidentMatch: "INC-2023-8901",
      incidentMatch: "69ca09118aea83b2f205e459",
      time: "03:17 PM",
    },
  ],
};

try {
  report.data.map(async (data) => await PostData(report.path, data));
  console.log("Report data added!!");
} catch (error) {
  console.log(error);
}
