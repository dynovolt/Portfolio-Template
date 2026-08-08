export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "AI" | "Cloud" | "Database" | "DevOps" | "Languages";
  level: number; // 0-100
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  thumbnail: string;
  videoPreview?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  role: string;
  client?: string;
  year: string;
  duration: string;
  features: string[];
  metrics: { label: string; value: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  skillsUsed: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  achievements: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface PortfolioConfig {
  personalInfo: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    subtitle: string;
    greeting: string;
    bio: string;
    avatar: string;
    resumeUrl: string;
    socials: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      email?: string;
    };
    stats: { label: string; value: number; suffix?: string }[];
  };
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
}

export const portfolioConfig: PortfolioConfig = {
  personalInfo: {
    name: "Alex Thorne",
    firstName: "Alex",
    lastName: "Thorne",
    title: "Creative Software Engineer",
    subtitle: "building AI-driven products that feel like magic.",
    greeting: "Hello, I'm Alex.",
    bio: "I'm a designer-minded engineer specializing in building high-fidelity interfaces, scalable cloud architectures, and agentic AI systems. I merge micro-interactions with systems engineering to deliver award-winning digital experiences.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    resumeUrl: "#",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "hello@alexthorne.dev",
    },
    stats: [
      { label: "Years of Experience", value: 6, suffix: "+" },
      { label: "Completed Projects", value: 34 },
      { label: "AI Deployments", value: 120, suffix: "k" },
      { label: "Awwwards Nominations", value: 3 },
    ],
  },
  skills: [
    // Languages
    { name: "TypeScript", category: "Languages", level: 95 },
    { name: "JavaScript", category: "Languages", level: 95 },
    { name: "Python", category: "Languages", level: 90 },
    { name: "Rust", category: "Languages", level: 70 },
    { name: "Golang", category: "Languages", level: 75 },
    { name: "SQL", category: "Languages", level: 85 },
    
    // Frontend
    { name: "React / Next.js", category: "Frontend", level: 98 },
    { name: "TailwindCSS", category: "Frontend", level: 95 },
    { name: "Framer Motion", category: "Frontend", level: 92 },
    { name: "WebGL / Three.js", category: "Frontend", level: 78 },
    { name: "HTML5 / CSS3", category: "Frontend", level: 98 },
    
    // Backend
    { name: "Node.js / Express", category: "Backend", level: 90 },
    { name: "FastAPI / Python", category: "Backend", level: 88 },
    { name: "GraphQL", category: "Backend", level: 85 },
    { name: "gRPC", category: "Backend", level: 80 },
    
    // AI
    { name: "OpenAI API / LangChain", category: "AI", level: 92 },
    { name: "PyTorch", category: "AI", level: 75 },
    { name: "Vector Databases", category: "AI", level: 85 },
    
    // Cloud
    { name: "Vercel / AWS", category: "Cloud", level: 90 },
    { name: "Google Cloud Platform", category: "Cloud", level: 80 },
    { name: "Serverless Architecture", category: "Cloud", level: 88 },
    
    // Database
    { name: "PostgreSQL", category: "Database", level: 88 },
    { name: "MongoDB", category: "Database", level: 85 },
    { name: "Redis", category: "Database", level: 90 },
    { name: "Pinecone / Qdrant", category: "Database", level: 85 },
    
    // DevOps
    { name: "Docker", category: "DevOps", level: 82 },
    { name: "Kubernetes", category: "DevOps", level: 70 },
    { name: "GitHub Actions CI/CD", category: "DevOps", level: 90 },
  ],
  projects: [
    {
      slug: "synapse-ai-workflows",
      title: "Synapse Workflows",
      subtitle: "Agentic AI orchestration engine.",
      shortDescription: "A drag-and-drop workspace to construct, test, and deploy multi-agent autonomous teams with zero latency and robust failure tolerance.",
      longDescription: "Synapse reimagines LLM orchestration by converting static prompts into stateful, reactive graphs. Users build computational agent chains that run asynchronously, utilizing tool use, validation loops, and human-in-the-loop approvals. The client features smooth canvas-based panning, dynamic node execution highlights, and streaming feedback logs.",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32244-large.mp4",
      techStack: ["Next.js 14", "Framer Motion", "FastAPI", "Redis", "Pinecone", "WebSockets"],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com",
      role: "Lead Systems Architect & Frontend Engineer",
      client: "Synapse Inc.",
      year: "2026",
      duration: "4 Months",
      features: [
        "Interactive canvas graph with customized custom node editors.",
        "Real-time streaming agent response logs via secure WebSockets.",
        "Automatic tool invocation (browsing, code execution, DB queries).",
        "Adaptive workflow caching yielding up to 60% reduction in token overhead."
      ],
      metrics: [
        { label: "Token Efficiency Increase", value: "60%" },
        { label: "Concurrent Executions", value: "50k+" },
        { label: "Average Response Time", value: "140ms" }
      ],
      caseStudy: {
        overview: "Synapse was built to address the lack of low-latency, intuitive graph designers for complex AI workflows. Enterprises were writing thousands of lines of brittle Python scripting to hook tools together; they needed a visually interactive, production-ready environment that compile visual flows into clean state machines.",
        challenge: "Handling complex client-side graph renderings at 60 FPS while concurrently processing incoming websocket server-sent events for hundreds of nested agent steps. Standard React state hooks caused severe canvas re-render bottlenecks.",
        solution: "We decoupled UI canvas interactions from standard React rendering by leveraging a custom canvas matrix layout synced to high-frequency motion values, utilizing Zustand to run concurrent reactive state operations outside React's main event cycle.",
        results: "Delivered a lightning-fast visual interface that successfully reduced time-to-production for enterprise AI integrations from three weeks to under 4 hours. The site was nominated for Awwwards and gained 4,000 GitHub stars within its initial launch week."
      }
    },
    {
      slug: "orbit-decentralized-cloud",
      title: "Orbit Engine",
      subtitle: "Serverless peer-to-peer compute platform.",
      shortDescription: "Next-generation serverless platform distributing microsecond computing workloads across globally isolated peer edge nodes.",
      longDescription: "Orbit operates on a distributed WebAssembly grid, eliminating heavy cloud server overhead. The client console features real-time globe monitoring showing traffic flow, active nodes, and sub-millisecond execution times in a gorgeous visual workspace.",
      thumbnail: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
      videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-nebula-of-purple-and-blue-light-in-space-32152-large.mp4",
      techStack: ["React", "Rust / Wasm", "Cloudflare Workers", "WebRTC", "Three.js", "TailwindCSS"],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com",
      role: "Core Protocol Designer",
      client: "Orbit Cloud Networks",
      year: "2025",
      duration: "6 Months",
      features: [
        "Distributed WASM compiler allowing secure native client execution.",
        "Interactive 3D WebGL Web traffic globe visualization.",
        "Millisecond-level deployment cycles and localized node replication.",
        "Decentralized identity and payment processing powered by cryptographic tokens."
      ],
      metrics: [
        { label: "Deployment Latency Reduced", value: "92%" },
        { label: "Server Cost Reductions", value: "85%" },
        { label: "Edge Nodes Registered", value: "12,000+" }
      ],
      caseStudy: {
        overview: "Centralized cloud architectures rely on localized data hubs, imposing physical limits on execution speed and generating immense billing cycles. Orbit distributes execution directly to the edge, running isolated sandboxed WebAssembly processes on nodes closest to the requests.",
        challenge: "Establishing highly secure peer-to-peer tunnels without compromising connection times, and building a low-overhead monitoring interface capable of visualizing global transactions instantly in 3D.",
        solution: "We integrated WebRTC signalling over decentralized relays for P2P connection handling, compiling Rust core libraries directly to WASM. The dashboard globe was rendered using customized lightweight shaders.",
        results: "Achieved a peer-to-peer connection initialization time under 12ms and sustained an active global node cluster. The platform was successfully adopted by three large Web3 networks for microservice delivery."
      }
    },
    {
      slug: "linear-analytics-suite",
      title: "Vector Analytics",
      subtitle: "High-performance data visualization dashboard.",
      shortDescription: "A beautiful, hyper-fast dashboard designed for high-volume telemetry ingestion, utilizing hardware-accelerated charting layers.",
      longDescription: "Vector aggregates machine logs and infrastructure metrics. Using WebGL-backed GPU pipelines, it plots millions of real-time telemetry points with custom canvas layouts, interactive widgets, and keyboard-driven commands for advanced monitoring operations.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      videoPreview: "https://assets.mixkit.co/videos/preview/mixkit-abstract-digital-technology-background-34354-large.mp4",
      techStack: ["Next.js 14", "TailwindCSS", "WebGL Canvas", "Clickhouse", "Go (gRPC)", "Framer Motion"],
      githubUrl: "https://github.com",
      liveUrl: "https://google.com",
      role: "Lead Fullstack Developer",
      client: "Vector Analytics GmbH",
      year: "2025",
      duration: "3 Months",
      features: [
        "Interactive charts rendering 100,000 metrics per second via GPU canvas.",
        "Full keyboard-friendly navigation mapping utilizing local commands.",
        "Instant query builder compiling into raw Clickhouse structures.",
        "Tailored layout panels and workspace saving presets."
      ],
      metrics: [
        { label: "Render Frame Rate", value: "60 FPS" },
        { label: "Data Ingestion Throughput", value: "4.2M/s" },
        { label: "Query Speed Improvement", value: "8x" }
      ],
      caseStudy: {
        overview: "Industrial clients monitoring active pipelines were forced to choose between delayed analytics or heavily simplified telemetry aggregates. Vector was built to bridge this gap, delivering high-frequency, raw streaming data visualizers direct to browsers.",
        challenge: "Rendering dense live charts without blocking React main loop execution or causing page lag, especially during spikes of network activities.",
        solution: "Implemented dedicated Web Worker threads to handle data aggregation and buffer queues, feeding coordinates directly to a Canvas drawing API powered by lightweight shaders.",
        results: "The analytical tool delivered buttery smooth 60fps charting arrays, enabling network engineers to debug infrastructure disruptions in seconds. Adopted by two automated shipping ports."
      }
    }
  ],
  experience: [
    {
      company: "Linear Systems Inc",
      role: "Senior Interactive Engineer",
      location: "San Francisco, CA (Remote)",
      period: "2024 - Present",
      description: [
        "Spearheading the engineering of high-fidelity client-side platforms, rendering complex systems simple and beautiful.",
        "Designed and implemented micro-interactions, canvas-driven graphs, and premium interface animations.",
        "Reduced client-side bundle sizes by 40% using code splitting, dynamic tree-shaking, and lazy loading strategies."
      ],
      skillsUsed: ["TypeScript", "Next.js", "TailwindCSS", "Framer Motion", "Webpack", "Zustand"]
    },
    {
      company: "Aether AI Research",
      role: "AI Interface Specialist",
      location: "New York, NY",
      period: "2022 - 2024",
      description: [
        "Created WebGL visualization utilities for transformer self-attention layers, mapping model pathways in 3D.",
        "Engineered the core workflow designer for multi-agent chains, reducing visual setup overhead by 70%.",
        "Configured custom FastAPI microservices serving low-latency streamed completions via Server-Sent Events (SSE)."
      ],
      skillsUsed: ["React", "Python", "FastAPI", "Three.js", "OpenAI API", "WebSockets"]
    },
    {
      company: "Stripe Labs",
      role: "Frontend Developer",
      location: "Seattle, WA",
      period: "2020 - 2022",
      description: [
        "Crafted premium, fluid landing pages and developer dashboards featuring animated vector grids and responsive assets.",
        "Refactored shared UI design primitives to meet strict Web Accessibility Standards (WCAG 2.1 AA) and keyboard compatibility.",
        "Collaborated with design leads on animations and custom page transition systems."
      ],
      skillsUsed: ["JavaScript", "React", "PostCSS", "GSAP", "Jest", "A11y Core"]
    }
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "B.S. in Computer Science (Human-Computer Interaction Spec.)",
      period: "2016 - 2020",
      achievements: [
        "Graduated with Honors.",
        "Specialization in Human-Computer Interaction, computer graphics, and systems design.",
        "Recipient of the Undergraduate Research Award in Interactive Systems."
      ]
    }
  ],
  testimonials: [
    {
      name: "Marcus Vance",
      role: "VP of Product",
      company: "Linear Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      quote: "Alex possesses a rare combination of visual taste and deep technical engineering. He rebuilt our telemetry dashboard, turning a sluggish interface into an experience that feels alive and incredibly premium."
    },
    {
      name: "Sophia Chen",
      role: "Co-Founder",
      company: "Aether AI Labs",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      quote: "Working with Alex was a game-changer. He translated our complex multi-agent graphs into a clean, drag-and-drop workspace that customers immediately understood. Truly world-class execution."
    },
    {
      name: "Dmitri Volkov",
      role: "Lead Designer",
      company: "Stripe Labs",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      quote: "Alex doesn't just write code; he builds interactive art. His focus on smooth page transitions, micro-animations, and typographic details sets a high bar for frontend engineering."
    }
  ],
  blogs: [
    {
      slug: "interactive-3d-webgl-performance-react",
      title: "Interactive WebGL: Building 60fps Shaders in React Engine",
      summary: "A deep dive into offloading heavy mathematical grid renderings to GPU shaders, decoupling states from React cycles for ultra-smooth UI experiences.",
      coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      date: "Aug 04, 2026",
      readTime: "6 Min Read",
      tags: ["WebGL", "Performance", "React", "Shaders"],
      content: `Rendering complex interfaces at high frame rates can be challenging in modern frameworks. React is optimized for DOM manipulation, but when drawing thousands of dynamic components (like interactive grids, cursor halos, and floating nodes), standard component updates generate significant execution bottlenecks.

### The React Render Bottleneck

Every time React state updates, it recalculates the virtual DOM and diffs it with the real DOM. While React performs this quickly, doing this on high-frequency events (like \`mousemove\` or scroll) causes the browser's thread to drop frames.

### Bypassing React with HTML5 Canvas Shaders

To run a premium backdrop that matches Awwwards-level smoothness, we delegate calculations to native drawing interfaces. In this article, we'll examine:

1. **Decoupled Math Buffers**: Storing particles as simple flat arrays.
2. **Proximity-based Flow Fields**: Calculating grid distortions relative to mouse coordinates.
3. **GPU-driven rendering**: Minimizing memory overhead.

\`\`\`typescript
// The core render loop bypassing state updates
function animate() {
  ctx.clearRect(0, 0, width, height);
  // Custom gravity calculations here
  requestAnimationFrame(animate);
}
\`\`\`

By utilizing these practices, we maintain a Lighthouse Performance index above 95 while rendering interactive, luxurious visuals.`
    },
    {
      slug: "mastering-framer-motion-layout-animations",
      title: "Mastering Framer Motion: Layout Transitions & Magnetic Effects",
      summary: "Learn how to build magnetic hover effects, layout id morphs, and smooth route transitions that make developer portfolios feel expensive.",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      date: "Jul 28, 2026",
      readTime: "8 Min Read",
      tags: ["Framer Motion", "Design System", "CSS"],
      content: `The difference between a generic website and a luxury product lies in the micro-animations. Transitions must feel fluid, dampening naturally rather than using rigid linear interpolation.

### Designing Magnetic Proximity

A magnetic button calls attention by pulling itself toward the user's cursor. To achieve this premium feel, we monitor the cursor coordinates relative to the button's bounding rect:

- Compute the horizontal and vertical offset between the cursor and the center of the element.
- If the cursor lies within a activation radius, apply a spring transform.
- Once the cursor leaves, smoothly release the button back to its origin.

### Declarative Page Transitions

Next.js App Router templates allow us to wrap page renders in Framer Motion wrappers. By combining \`AnimatePresence\` and custom router keys, pages slide, fade, and scale elegantly during route switches.`
    }
  ]
};
