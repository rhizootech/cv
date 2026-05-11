export type StackGroup = {
  label: string;
  items: string[];
};

/**
 * Tech stack grouped by category. The Stack section renders this verbatim;
 * recruiters scan for keywords, so the items here are the words that get matched.
 */
export const stack: StackGroup[] = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C / C++"],
  },
  {
    label: "Backend",
    items: ["Django", "DRF", "FastAPI", "Sanic", "Flask", "Node.js"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "shadcn/ui", "PyQt"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB", "InfluxDB", "BigQuery"],
  },
  {
    label: "Cloud",
    items: ["AWS", "GCP", "Azure", "Heroku", "Vercel"],
  },
  {
    label: "AI / Computer Vision",
    items: ["OpenCV", "TensorFlow", "YOLO", "Caffe", "Edge AI"],
  },
  {
    label: "Messaging & APIs",
    items: ["MQTT", "Google Pub/Sub", "OpenAPI / Swagger", "REST", "WhatsApp / Telegram bots"],
  },
  {
    label: "Platform & Ops",
    items: ["Linux", "Docker", "Proxmox", "Git"],
  },
  {
    label: "Hardware & IoT",
    items: ["Sensor electronics", "Industrial automation", "PLC integration", "Ardupilot", "3D printing"],
  },
];
