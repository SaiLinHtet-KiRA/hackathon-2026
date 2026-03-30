import PostData from "./post.js";

const report = {
  path: "unit",
  data: [
    {
      // id: "EMS-013",
      type: "Ambulance",
      // status: "Available",
    },
    {
      // id: "EMS-014",
      type: "Ambulance",
      // status: "Available",
    },
    {
      // id: "EMS-015",
      type: "Ambulance",
      // status: "En Route",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
    {
      // id: "EMS-016",
      type: "Ambulance",
      // status: "En Route",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
    {
      // id: "EMS-017",
      type: "Ambulance",
      // status: "On Scene",
      // incidentId: "INC-2023-8902",
      // ResponderUnit: "",
    },
    {
      // id: "EMS-018",
      type: "Ambulance",
      // status: "Available",
      // incidentId: null,
    },
    {
      // id: "EMS-019",
      type: "Ambulance",
      // status: "Available",
      // incidentId: null,
    },
    {
      // id: "EMS-020",
      type: "Ambulance",
      // status: "Available",
      // incidentId: null,
    },
    {
      // id: "EMS-021",
      type: "Ambulance",
      // status: "Available",
      // incidentId: null,
    },
    {
      // id: "PD-007",
      type: "Police",
      // status: "On Scene",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
    {
      // id: "PD-008",
      type: "Police",
      // status: "On Scene",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
    {
      // id: "FD-003",
      type: "Fire & Rescue",
      // status: "En Route",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
    {
      // id: "FD-004",
      type: "Fire & Rescue",
      // status: "En Route",
      // incidentId: "INC-2023-8901",
      // ResponderUnit: "",
    },
  ],
};

try {
  report.data.map(async (data) => await PostData(report.path, data));
  console.log("Report data added!!");
} catch (error) {
  console.log(error);
}
