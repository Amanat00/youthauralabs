export type RoadmapStep = {
  title: string;
  details: string[];
};

export type ProgramRoadmap = {
  slug: string;
  title: string;
  goal: string;
  intro: string;
  startingPoint?: string;
  steps: RoadmapStep[];
  outcomes: string[];
};

export const programRoadmaps: ProgramRoadmap[] = [
  {
    slug: "freelancing",
    title: "Freelancing",
    startingPoint: "Students should already have a marketable skill.",
    goal:
      "Turn that existing skill into a freelance-ready profile and practical client acquisition approach.",
    intro:
      "Turn the skill you already have into a real freelance opportunity. This track takes you beyond simply creating a profile: you will learn how to position your skill, present your work, identify worthwhile jobs, write stronger proposals, communicate with clients and confidently begin applying to relevant opportunities.",
    steps: [
      {
        title: "Identify Your Freelance Skill",
        details: [
          "Identify the skill you can offer professionally.",
          "Choose suitable services and niches.",
        ],
      },
      {
        title: "Explore Freelance Platforms",
        details: [
          "Explore platforms such as Upwork, Fiverr and other relevant platforms.",
          "Understand profiles, jobs, clients, proposals and bidding.",
        ],
      },
      {
        title: "Create Your Account",
        details: [
          "Set up the required freelance accounts.",
          "Complete account information professionally.",
        ],
      },
      {
        title: "Build Your Profile",
        details: [
          "Write a clear profile description.",
          "Present your skills, experience and services effectively.",
        ],
      },
      {
        title: "Build Your Portfolio",
        details: [
          "Select and organize existing work.",
          "Identify gaps and create sample work where needed.",
          "Present projects professionally.",
        ],
      },
      {
        title: "Find the Right Jobs",
        details: [
          "Search for jobs that match your skill.",
          "Learn how to judge whether a job is worth applying for.",
          "Identify unsuitable opportunities and potential red flags.",
        ],
      },
      {
        title: "Cover Letters & Proposals",
        details: [
          "Write customized cover letters.",
          "Create proposals based on the client's requirements.",
        ],
      },
      {
        title: "Bidding & Applying",
        details: [
          "Practice bidding and applying for suitable jobs.",
          "Track applications and responses.",
        ],
      },
      {
        title: "Client Communication",
        details: [
          "Practice professional client conversations.",
          "Understand requirements, scope, timelines and expectations.",
        ],
      },
      {
        title: "Mentorship & Freelance Launch",
        details: [
          "Get mentor feedback on your profile, portfolio and proposals.",
          "Improve your approach and begin applying to suitable opportunities.",
        ],
      },
    ],
    outcomes: [
      "A professionally completed freelancer account.",
      "A clearly positioned profile based on your skill, service and target niche.",
      "An organized, portfolio-ready collection of relevant work.",
      "A practical approach for identifying suitable freelance jobs and avoiding unsuitable opportunities.",
      "Customized cover-letter and proposal templates.",
      "Hands-on experience with bidding, applying and tracking applications.",
      "Improved client communication, requirement gathering and expectation setting.",
      "Mentor feedback on your profile, portfolio and application approach.",
    ],
  },

  {
    slug: "e-commerce",
    title: "E-commerce",
    goal:
      "Learn the e-commerce process by researching, planning and building an online-store concept.",
    intro:
      "Go from an e-commerce idea to a practical store concept. You will explore how online businesses work, research products and customers, validate opportunities, plan a store and create the foundations needed to present and market products online.",
    steps: [
      {
        title: "Explore E-commerce Models",
        details: [
          "Explore different ways businesses sell products online.",
          "Study real e-commerce businesses and their models.",
        ],
      },
      {
        title: "Product Research",
        details: [
          "Research products and markets.",
          "Identify potential opportunities and study competitors.",
        ],
      },
      {
        title: "Customer Research",
        details: [
          "Identify target customers.",
          "Understand their needs, preferences and buying behavior.",
        ],
      },
      {
        title: "Product Validation",
        details: [
          "Evaluate demand, competition and positioning.",
          "Determine whether a product is worth pursuing.",
        ],
      },
      {
        title: "Explore E-commerce Tools",
        details: [
          "Explore platforms such as Shopify and other relevant tools.",
          "Understand their practical uses and features.",
        ],
      },
      {
        title: "Build Store Structure",
        details: [
          "Plan the homepage, categories, product pages and navigation.",
          "Create a basic store structure and customer journey.",
        ],
      },
      {
        title: "Create Product Listings",
        details: [
          "Write product descriptions.",
          "Organize product information, images and pricing.",
        ],
      },
      {
        title: "Customer Acquisition",
        details: [
          "Explore practical marketing channels for e-commerce.",
          "Create a basic customer acquisition plan.",
        ],
      },
      {
        title: "Real E-commerce Case Study",
        details: [
          "Analyze an existing online store.",
          "Identify its strengths, problems and opportunities.",
        ],
      },
      {
        title: "Mentorship & Store Project",
        details: [
          "Build an e-commerce store concept or prototype.",
          "Present it to a mentor and improve it based on feedback.",
        ],
      },
    ],
    outcomes: [
      "A research-backed product idea with basic market and competitor analysis.",
      "A clear understanding of the target customer and their buying needs.",
      "A validated product opportunity based on demand, competition and positioning.",
      "Practical exposure to e-commerce platforms and relevant tools.",
      "A planned store structure covering key pages, navigation and customer journey.",
      "Sample product listings with organized descriptions, information and pricing.",
      "A basic customer-acquisition plan for the selected product or store concept.",
      "A store concept or prototype reviewed and improved through mentor feedback.",
    ],
  },

  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    goal: "Plan and execute a practical digital marketing campaign.",
    intro:
      "Learn digital marketing by building a campaign, not by memorizing marketing terms. You will work with real or realistic business scenarios to research audiences and competitors, choose the right channels, create campaign assets, use relevant tools and review performance to improve your approach.",
    steps: [
      {
        title: "Explore Real Brands",
        details: [
          "Study how real businesses market themselves online.",
          "Analyze real campaigns and marketing approaches.",
        ],
      },
      {
        title: "Audience Research",
        details: [
          "Research a target audience.",
          "Create a practical customer profile.",
        ],
      },
      {
        title: "Competitor Research",
        details: [
          "Analyze competitors, their content, positioning and marketing channels.",
          "Identify opportunities and gaps.",
        ],
      },
      {
        title: "Choose Marketing Channels",
        details: [
          "Explore relevant digital channels.",
          "Select channels based on the business and target audience.",
        ],
      },
      {
        title: "Build a Marketing Strategy",
        details: [
          "Define the objective, audience, message, channels, content and timeline.",
          "Connect the strategy to a practical business goal.",
        ],
      },
      {
        title: "Explore Marketing Tools",
        details: [
          "Research and practice using tools for content, research, scheduling and analytics.",
        ],
      },
      {
        title: "Create Campaign Content",
        details: [
          "Develop campaign concepts and messaging.",
          "Create practical campaign assets.",
        ],
      },
      {
        title: "Launch/Simulate a Campaign",
        details: [
          "Execute or simulate a campaign for a real or realistic business.",
          "Follow the planned campaign timeline.",
        ],
      },
      {
        title: "Measure & Improve",
        details: [
          "Review campaign performance and key metrics.",
          "Identify improvements and optimization opportunities.",
        ],
      },
      {
        title: "Mentorship & Campaign Review",
        details: [
          "Present the campaign to a mentor.",
          "Receive feedback and refine the final work.",
        ],
      },
    ],
    outcomes: [
      "An audience and customer profile based on practical research.",
      "A competitor analysis covering positioning, content and channels.",
      "A clear digital marketing strategy with objectives, audience, message, channels and timeline.",
      "Practical experience with relevant marketing and analytics tools.",
      "Campaign concepts, messaging and practical campaign assets.",
      "Experience executing or simulating a campaign for a real or realistic business.",
      "A basic performance review using relevant marketing metrics.",
      "A final campaign refined through mentor feedback and presented professionally.",
    ],
  },

  {
    slug: "social-media-handling",
    title: "Social Media Handling",
    goal:
      "Develop practical experience managing a brand's social media presence.",
    intro:
      "Step into the role of a social media handler and learn how a brand's online presence is managed in practice. You will audit a real or realistic brand, build content pillars and calendars, create content, explore management tools and use performance insights to improve the brand's social presence.",
    steps: [
      {
        title: "Study a Real Brand",
        details: [
          "Understand the brand, audience and business goals.",
          "Study how the brand currently uses social media.",
        ],
      },
      {
        title: "Social Media Audit",
        details: [
          "Review the brand's existing social presence.",
          "Identify gaps, strengths and opportunities.",
        ],
      },
      {
        title: "Platform Research",
        details: [
          "Determine which platforms are relevant.",
          "Study competitors and their social strategies.",
        ],
      },
      {
        title: "Create Content Pillars",
        details: [
          "Define the main topics the brand should communicate.",
          "Develop practical content themes.",
        ],
      },
      {
        title: "Build a Content Calendar",
        details: [
          "Plan posts, dates, formats and campaigns.",
          "Create a consistent posting schedule.",
        ],
      },
      {
        title: "Create Content",
        details: [
          "Write captions and content ideas.",
          "Create sample posts, stories and short-form content.",
        ],
      },
      {
        title: "Explore Management Tools",
        details: [
          "Explore tools for design, scheduling, publishing and analytics.",
          "Practice using relevant tools.",
        ],
      },
      {
        title: "Manage a Simulated Brand Account",
        details: [
          "Schedule content.",
          "Practice responding to comments and messages.",
          "Maintain the brand's communication style.",
        ],
      },
      {
        title: "Analytics & Reporting",
        details: [
          "Review social media performance.",
          "Prepare a simple performance report.",
        ],
      },
      {
        title: "Mentorship & Social Media Project",
        details: [
          "Present the complete strategy, calendar and sample content.",
          "Receive mentor feedback and refine the work.",
        ],
      },
    ],
    outcomes: [
      "A practical social media audit of a real or realistic brand.",
      "Defined content pillars and brand-relevant content themes.",
      "A structured content calendar with formats, dates and posting plan.",
      "Sample captions, posts, stories and short-form content ideas.",
      "Hands-on exposure to scheduling, management and analytics tools.",
      "Practice maintaining brand voice and handling basic audience interactions.",
      "A simple performance report with observations and improvement ideas.",
      "A complete social media strategy and portfolio project reviewed by a mentor.",
    ],
  },

  {
    slug: "graphic-designing",
    title: "Graphic Designing",
    goal:
      "Build practical design experience through real-world briefs and portfolio projects.",
    intro:
      "Build your design skills through practical briefs that feel like real client work. You will explore industry-relevant tools, create brand and marketing assets, respond to feedback, revise your work and turn your strongest projects into portfolio-ready pieces.",
    steps: [
      {
        title: "Explore Design Tools",
        details: [
          "Explore tools such as Canva, Adobe tools and other relevant design software.",
          "Understand which tools are suitable for different tasks.",
        ],
      },
      {
        title: "Design Challenges",
        details: [
          "Practice composition, typography, color, spacing and visual hierarchy.",
          "Complete short practical design exercises.",
        ],
      },
      {
        title: "Brand Brief",
        details: [
          "Work with a real or realistic brand brief.",
          "Understand the client's requirements and target audience.",
        ],
      },
      {
        title: "Create Brand Assets",
        details: [
          "Develop visual direction, colors, typography and basic brand elements.",
        ],
      },
      {
        title: "Social Media Designs",
        details: [
          "Create posts, stories, advertisements and promotional graphics.",
        ],
      },
      {
        title: "Marketing Materials",
        details: [
          "Create practical business and marketing designs such as banners, presentations and promotional materials.",
        ],
      },
      {
        title: "Design Revision Process",
        details: [
          "Receive feedback on designs.",
          "Make revisions and improve the work according to the brief.",
        ],
      },
      {
        title: "Real-world Design Project",
        details: [
          "Complete a project from initial brief to final delivery.",
        ],
      },
      {
        title: "Portfolio Development",
        details: [
          "Select the strongest work.",
          "Organize and present projects professionally.",
        ],
      },
      {
        title: "Mentorship & Portfolio Review",
        details: [
          "Receive mentor feedback and refine selected projects.",
        ],
      },
    ],
    outcomes: [
      "Practical experience with relevant design tools and workflows.",
      "Stronger understanding of composition, typography, color and layout.",
      "A basic brand visual direction and practical brand assets.",
      "Social media, promotional and marketing-ready designs.",
      "Experience working from a client-style brief.",
      "Practice receiving feedback, making revisions and preparing final deliverables.",
      "A complete client-style project from brief to final delivery.",
      "Selected portfolio-ready work presented professionally and reviewed by a mentor.",
    ],
  },

  {
    slug: "ai-automation",
    title: "AI Automation",
    goal:
      "Identify automation opportunities, explore AI automation tools and build useful real-world workflows.",
    intro:
      "Learn how to turn repetitive business tasks into useful AI-powered workflows. You will explore automation platforms such as n8n and Zapier, map real processes, connect tools, test workflows and research practical industry use cases before building a complete automation project.",
    steps: [
      {
        title: "Automation Fundamentals",
        details: [
          "Understand what automation is and where it can be useful.",
          "Identify repetitive tasks that can potentially be automated.",
        ],
      },
      {
        title: "Automation Tools Exploration",
        details: [
          "Explore tools such as n8n, Zapier and other relevant platforms.",
          "Understand their capabilities and practical use cases.",
        ],
      },
      {
        title: "Workflow Mapping",
        details: [
          "Select a manual process and map its steps.",
          "Identify inputs, actions, outputs and automation opportunities.",
        ],
      },
      {
        title: "AI + Automation",
        details: [
          "Explore how AI can be integrated into automated workflows.",
          "Understand practical AI-powered actions and decision-making.",
        ],
      },
      {
        title: "Tool Integration",
        details: [
          "Connect different tools and platforms.",
          "Explore triggers, actions, integrations and data flow.",
        ],
      },
      {
        title: "Build Real Workflows",
        details: [
          "Build practical automation workflows.",
          "Test, troubleshoot and improve them.",
        ],
      },
      {
        title: "Business & Industry Use Cases",
        details: [
          "Research how automation is being used across industries.",
          "Identify real business problems that can be automated.",
        ],
      },
      {
        title: "Real-world Automation Projects",
        details: [
          "Study practical workflows and use cases.",
          "Build automation around realistic business scenarios.",
        ],
      },
      {
        title: "Mentorship & Workflow Review",
        details: [
          "Review the workflow with a mentor.",
          "Improve its usefulness, reliability and efficiency.",
        ],
      },
      {
        title: "Final Automation Project",
        details: [
          "Build a complete AI-powered workflow that solves a practical problem.",
          "Present and refine the project based on feedback.",
        ],
      },
    ],
    outcomes: [
      "The ability to identify repetitive tasks and suitable automation opportunities.",
      "Practical exposure to tools such as n8n, Zapier and other relevant automation platforms.",
      "Workflow maps showing inputs, actions, decisions and outputs.",
      "Experience connecting tools, triggers, actions and data flows.",
      "Working AI-assisted workflows tested and troubleshot in realistic scenarios.",
      "Research into practical automation use cases across industries.",
      "Documentation explaining the problem, workflow, tools and result.",
      "A complete AI-powered automation project reviewed and improved through mentor feedback.",
    ],
  },

  {
    slug: "applied-ai-across-industries",
    title: "Applied AI Across Industries",
    goal:
      "Apply AI tools to practical problems across different professional contexts.",
    intro:
      "Move beyond experimenting with AI tools and learn how to apply them to professional problems. You will explore industry use cases, test different AI solutions, verify outputs, build practical workflows and document how AI can improve real tasks across different professional contexts.",
    steps: [
      {
        title: "Explore AI Tools",
        details: [
          "Research current AI tools and their practical applications.",
          "Explore tools for research, content, productivity and professional work.",
        ],
      },
      {
        title: "Research Industry Use Cases",
        details: [
          "Explore AI applications in marketing, education, business, operations, research and other fields.",
          "Study real-world examples.",
        ],
      },
      {
        title: "Identify a Real Problem",
        details: [
          "Select a professional task or problem where AI could provide useful support.",
        ],
      },
      {
        title: "Test AI Solutions",
        details: [
          "Try different AI tools.",
          "Compare outputs and identify the most suitable approach.",
        ],
      },
      {
        title: "AI-Assisted Research",
        details: [
          "Use AI for practical research and information processing.",
          "Learn to verify AI-generated information.",
        ],
      },
      {
        title: "AI-Assisted Content & Communication",
        details: [
          "Create practical professional outputs using AI.",
          "Improve and refine AI-generated work.",
        ],
      },
      {
        title: "Build an AI Workflow",
        details: [
          "Combine appropriate AI tools to solve a specific professional task.",
        ],
      },
      {
        title: "Test in a Realistic Scenario",
        details: [
          "Apply the workflow to a realistic professional case.",
          "Evaluate the quality and usefulness of the result.",
        ],
      },
      {
        title: "Document the Process",
        details: [
          "Document the problem, tools used, process, output and improvements.",
        ],
      },
      {
        title: "Mentorship & Final Project",
        details: [
          "Present the AI solution to a mentor.",
          "Receive feedback and improve the final project.",
        ],
      },
    ],
    outcomes: [
      "Practical understanding of current AI tools and their professional use cases.",
      "Research into how AI can support different industries and job functions.",
      "The ability to identify a professional problem suitable for AI assistance.",
      "Hands-on comparison and testing of AI tools and outputs.",
      "Practice verifying AI-generated information and improving output quality.",
      "AI-assisted research, content or communication outputs for realistic professional tasks.",
      "A documented AI workflow showing the problem, solution, process and result.",
      "A final applied-AI project refined through mentor feedback.",
    ],
  },

  {
    slug: "project-management",
    title: "Project Management",
    goal:
      "Learn project management by actually planning, coordinating and tracking a project.",
    intro:
      "Learn project management by actually planning and running a project. You will turn a goal into tasks, milestones and responsibilities, set up a project workspace, track progress, handle problems and prepare clear project reporting while practicing coordination and follow-up.",
    steps: [
      {
        title: "Choose a Project",
        details: ["Select a real or realistic project to work on."],
      },
      {
        title: "Define the Project",
        details: ["Define the goal, scope and expected deliverables."],
      },
      {
        title: "Break Down the Work",
        details: [
          "Create tasks, milestones and dependencies.",
          "Organize the work into manageable stages.",
        ],
      },
      {
        title: "Create the Project Plan",
        details: [
          "Set timelines, responsibilities and deadlines.",
          "Build a practical project schedule.",
        ],
      },
      {
        title: "Explore Project Management Tools",
        details: [
          "Explore tools such as Trello, Asana, Notion and other relevant platforms.",
          "Select an appropriate tool for the project.",
        ],
      },
      {
        title: "Set Up the Project",
        details: [
          "Create the project workspace.",
          "Add tasks, deadlines and responsibilities.",
        ],
      },
      {
        title: "Run & Track the Project",
        details: [
          "Monitor progress.",
          "Follow up on tasks and update project status.",
        ],
      },
      {
        title: "Handle Problems",
        details: [
          "Identify delays and risks.",
          "Coordinate solutions and keep the project moving.",
        ],
      },
      {
        title: "Project Reporting",
        details: [
          "Prepare progress updates and documentation.",
          "Create a final project report.",
        ],
      },
      {
        title: "Mentorship & Project Review",
        details: [
          "Review the complete project with a mentor.",
          "Identify improvements and lessons learned.",
        ],
      },
    ],
    outcomes: [
      "A clearly defined project goal, scope and deliverables.",
      "A task breakdown with milestones, dependencies, responsibilities and deadlines.",
      "A working project-management workspace using a relevant tool.",
      "Experience tracking progress and following up on assigned work.",
      "A practical approach to identifying delays, risks and coordination issues.",
      "Project documentation and progress updates.",
      "A final project report showing progress, outcomes and lessons learned.",
      "A project plan and execution reviewed with a mentor.",
    ],
  },

  {
    slug: "web-development-awareness",
    title: "Web Development Awareness",
    goal:
      "Understand modern web workflows well enough to plan, brief, review and improve website projects.",
    intro:
      "Understand websites from a practical coordination and review perspective. You will learn how modern websites are structured, study real websites, create clear briefs, work through a development workflow, test builds and identify improvements without needing to become a full-time developer.",
    steps: [
      {
        title: "Explore How Websites Are Built",
        details: [
          "Understand frontend, backend, databases and hosting at a practical level.",
        ],
      },
      {
        title: "Study Real Websites",
        details: [
          "Analyze different websites.",
          "Identify good practices and areas for improvement.",
        ],
      },
      {
        title: "Website Planning",
        details: [
          "Define requirements.",
          "Create a sitemap and map basic user journeys.",
        ],
      },
      {
        title: "Explore Web Tools & Technologies",
        details: [
          "Explore commonly used web technologies and platforms.",
          "Understand what each is used for.",
        ],
      },
      {
        title: "Create a Website Brief",
        details: [
          "Convert business requirements into clear instructions for a developer.",
        ],
      },
      {
        title: "Developer Coordination",
        details: [
          "Practice assigning tasks.",
          "Give feedback and follow up on development progress.",
        ],
      },
      {
        title: "Review a Website Build",
        details: [
          "Check content, layout, links, forms, responsiveness and basic functionality.",
        ],
      },
      {
        title: "Website Testing",
        details: [
          "Test the user journey.",
          "Identify issues and document required improvements.",
        ],
      },
      {
        title: "Real Website Audit",
        details: [
          "Review a real or realistic website.",
          "Prepare a practical improvement report.",
        ],
      },
      {
        title: "Mentorship & Final Review",
        details: [
          "Present the website brief/audit to a mentor.",
          "Refine the final work based on feedback.",
        ],
      },
    ],
    outcomes: [
      "Practical understanding of frontend, backend, databases and hosting.",
      "The ability to analyze real websites for usability, structure and improvement areas.",
      "Clear website requirements, sitemap and basic user journey.",
      "A developer brief translating business needs into actionable requirements.",
      "Practical experience coordinating tasks and giving development feedback.",
      "A website review covering content, layout, links, forms, responsiveness and basic functionality.",
      "A testing checklist and documented issues and improvements.",
      "A final website audit and recommendations reviewed by a mentor.",
    ],
  },

  {
    slug: "business-development",
    title: "Business Development",
    goal:
      "Practice the complete process of finding potential clients, starting conversations and developing business opportunities.",
    intro:
      "Learn how businesses turn potential clients into real opportunities. You will research markets and prospects, build targeted outreach, write personalized messages, practice pitching and client conversations, track leads and follow up through a practical business-development project.",
    steps: [
      {
        title: "Study a Real Business",
        details: [
          "Understand its product/service, target market and business model.",
        ],
      },
      {
        title: "Identify the Target Market",
        details: [
          "Define ideal customers.",
          "Research their needs and challenges.",
        ],
      },
      {
        title: "Research Prospects",
        details: [
          "Find relevant businesses and potential clients.",
          "Build a targeted prospect list.",
        ],
      },
      {
        title: "Explore Lead Generation Tools",
        details: [
          "Explore platforms and tools for finding and organizing prospects.",
        ],
      },
      {
        title: "Build an Outreach Strategy",
        details: [
          "Decide who to contact, where to contact them and what value to communicate.",
        ],
      },
      {
        title: "Write Outreach Messages",
        details: [
          "Create practical email, LinkedIn and other outreach messages.",
          "Practice personalizing them for different prospects.",
        ],
      },
      {
        title: "Practice Pitching",
        details: [
          "Develop a clear value proposition.",
          "Practice presenting a product or service.",
        ],
      },
      {
        title: "Practice Client Conversations",
        details: [
          "Practice discovery questions, requirement gathering and objection handling.",
        ],
      },
      {
        title: "Follow-up & Lead Tracking",
        details: [
          "Track prospects and conversations.",
          "Practice follow-ups and maintain a simple CRM/pipeline.",
        ],
      },
      {
        title: "Mentorship & Real-world BD Project",
        details: [
          "Build a complete prospecting and outreach campaign.",
          "Practice the pitch and review the work with a mentor.",
        ],
      },
    ],
    outcomes: [
      "A clear understanding of a business, its target market and customer needs.",
      "A targeted prospect list based on practical research.",
      "Exposure to lead-generation tools and prospect organization.",
      "A structured outreach strategy with a clear target, channel and value proposition.",
      "Personalized email, LinkedIn and other outreach messages.",
      "Practice with pitching, discovery questions, requirement gathering and objection handling.",
      "A simple lead tracker or CRM pipeline with a follow-up process.",
      "A complete prospecting and outreach project reviewed through mentor feedback.",
    ],
  },
];