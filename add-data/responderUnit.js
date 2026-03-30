import PostData from "./post.js";

const responderUnit = {
  path: "responderUnit",
  data: [
    [
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Critical",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Multi-vehicle collision cleared. One injured transported. Lanes reopened.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "High",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Two cars rear-ended near ramp. Minor injuries reported. Traffic normalized.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Standard",
        resolved: false,
        recalled: { state: false, reason: "Operator request" },
        ResolutionNotes: "Vehicle stalled on shoulder. Tow service pending.",
      },
      {
        Priority: "Critical",
        resolved: true,
        recalled: { state: true, reason: "Unit damaged" },
        ResolutionNotes:
          "Fire response unit disabled during operation. Backup deployed.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "High",
        resolved: true,
        recalled: { state: true, reason: "Unit reassigned" },
        ResolutionNotes:
          "Initial responders redirected to higher priority accident nearby.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Standard",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Debris removed from roadway. No injuries or further hazards.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "High",
        resolved: false,
        recalled: { state: false, reason: "Operator request" },
        ResolutionNotes:
          "Ongoing investigation of reported hit-and-run. Suspect vehicle unidentified.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Critical",
        resolved: true,
        recalled: { state: false, reason: "False alarm" },
        ResolutionNotes:
          "Reported collision not found. Area checked and cleared.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Standard",
        resolved: true,
        recalled: { state: true, reason: "Unit reassigned" },
        ResolutionNotes:
          "Minor traffic obstruction resolved before unit arrival.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "High",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Motorcycle and sedan collision. Rider treated and transported.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Critical",
        resolved: false,
        recalled: { state: false, reason: "Operator request" },
        ResolutionNotes:
          "Major accident with multiple injuries. Emergency response ongoing.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Standard",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Traffic signal malfunction fixed. Flow returned to normal.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "High",
        resolved: true,
        recalled: { state: true, reason: "False alarm" },
        ResolutionNotes:
          "Initial report of fire was unverified. No hazard found.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Critical",
        resolved: true,
        recalled: { state: false, reason: "Incident resolved" },
        ResolutionNotes:
          "Truck overturned. Cargo cleared and roadway reopened.",
      },
      {
        DispatchUnit: [
          "69c94406bc740bda5c65125b",
          "69c952107e4a81236fca5cda",
          "69c952107e4a81236fca5cea",
          "69c952107e4a81236fca5cec",
        ],
        Incident: "69c8ed22d53f2dbd6eef39bd",
        Priority: "Standard",
        resolved: false,
        recalled: { state: false, reason: "Operator request" },
        ResolutionNotes:
          "Broken-down vehicle causing slow traffic. Assistance en route.",
      },
    ],
  ],
};

try {
  responderUnit.data.map(async (data) => await PostData(report.path, data));
  console.log("Responder Unit data added!!");
} catch (error) {
  console.log(error);
}
