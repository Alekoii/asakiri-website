import type { RoadmapStatus } from "@/features/roadmap/components/RoadmapCard";

export interface RoadmapMilestone {
  title: string;
  description: string;
}

export interface RoadmapColumn {
  status: RoadmapStatus;
  title: string;
  description?: string;
  items: RoadmapMilestone[];
}

export interface RoadmapConfig {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  columns: RoadmapColumn[];
}

export const roadmapConfig: RoadmapConfig = {
  hero: {
    eyebrow: "Roadmap",
    title: "What we are building next",
    description:
      "Follow the progress across planned concepts, active builds and recently shipped features for the Asakiri platform.",
  },
  columns: [
    {
      status: "planned",
      title: "Planned",
      description:
        "Ideas that are validated and scoped. We expect to start these soon once the in progress work wraps up.",
      items: [
        {
          title: "Backend refactor",
          description:
            "Rework the service architecture to improve maintainability, unlock new integrations and scale for future growth.",
        },
        {
          title: "Mobile app",
          description:
            "Expand the learner experience with a dedicated mobile app that mirrors course progress and supports offline study.",
        },
        {
          title: "Hosted course packages",
          description:
            "Launch a web presence for packaged courses so teams can publish, manage access and deliver content without custom infrastructure.",
        },
      ],
    },
    {
      status: "in-progress",
      title: "In Progress",
      description:
        "Active projects that the team is currently designing, building and testing.",
      items: [
        {
          title: "Creator frontend redo",
          description:
            "Rebuilding the creator facing frontend with shadcn UI foundations to deliver a cleaner interface and smoother authoring flows.",
        },
        {
          title: "Desktop practice feature",
          description:
            "Adding guided practice to the desktop web app so learners can drill concepts with immediate feedback and progress tracking.",
        },
      ],
    },
    {
      status: "completed",
      title: "Shipped",
      description:
        "Recently delivered improvements that are live for creators and learners today.",
      items: [
        {
          title: "Creator app alpha",
          description:
            "Released the first alpha build of the creator app to gather feedback from early adopters and shape the production roadmap.",
        },
        {
          title: "Course viewer website",
          description:
            "Published an open source course viewer that consumes JSON course data and lets anyone explore content directly from GitHub.",
        },
      ],
    },
  ],
};
