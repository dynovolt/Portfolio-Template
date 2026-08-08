import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, ArrowRight } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import Magnetic from "@/components/ui/Magnetic";

export async function generateStaticParams() {
  return portfolioConfig.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = portfolioConfig.projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} Case Study | Alex Thorne`,
    description: project.shortDescription,
  };
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = portfolioConfig.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-[#030303] text-white pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-16">
      
      {/* Back button */}
      <div>
        <Magnetic range={25}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </Magnetic>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-4 max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight leading-[1.1]">
          {project.title}
        </h1>
        <p className="text-xl sm:text-2xl text-white/50 font-light leading-relaxed">
          {project.subtitle}
        </p>
      </div>

      {/* Project Thumbnail Image Hero */}
      <div className="relative w-full h-[320px] sm:h-[480px] md:h-[580px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Project Specifications Block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/5 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Role</span>
          <span className="font-medium text-white/90">{project.role}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Client</span>
          <span className="font-medium text-white/90">{project.client || "Self-Initiated"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Timeline</span>
          <span className="font-medium text-white/90">{project.year} &bull; {project.duration}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Repository &amp; Live</span>
          <div className="flex items-center gap-4 mt-0.5">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white flex items-center gap-1.5 transition-colors">
                <Github className="w-4 h-4" />
                <span className="text-xs">GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white flex items-center gap-1.5 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Live Site</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Counter Panels */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-center h-28 md:h-32">
              <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-blue">
                {m.value}
              </span>
              <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider mt-1">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Details content layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        
        {/* Left Side: Long Description */}
        <div className="lg:col-span-8 flex flex-col gap-10 md:gap-12">
          
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Project Overview</h2>
            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
              {project.caseStudy.overview}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">The Challenge</h2>
            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
              {project.caseStudy.challenge}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">The Solution</h2>
            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
              {project.caseStudy.solution}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">The Results</h2>
            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
              {project.caseStudy.results}
            </p>
          </div>

        </div>

        {/* Right Side: Key Features & Tech Stack */}
        <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
          
          {/* Key Features card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Key Features</span>
            <ul className="flex flex-col gap-3 text-xs text-white/70 font-light leading-relaxed list-disc pl-4 marker:text-brand-blue">
              {project.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </div>

          {/* Tech Stack card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Technologies Used</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-white/60 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

    </article>
  );
}
