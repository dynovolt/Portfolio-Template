"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { portfolioConfig, Project } from "@/config/portfolio";
import TiltCard from "../ui/TiltCard";
import Magnetic from "../ui/Magnetic";
import ScrollReveal from "../ui/ScrollReveal";

export default function Projects() {
  const router = useRouter();
  const projects = portfolioConfig.projects;

  return (
    <section id="projects" className="relative py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="flex flex-col gap-4 mb-16 md:mb-20">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">04 / Projects</span>
          </div>
        </ScrollReveal>
        <ScrollReveal variant="clip-wipe" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Selected Creations
          </h2>
        </ScrollReveal>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ScrollReveal
            key={project.slug}
            variant="perspective-3d"
            delay={idx * 0.15}
          >
            <ProjectCard project={project} onClick={() => router.push(`/projects/${project.slug}`)} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <TiltCard className="flex flex-col h-full group" maxTilt={8}>
      {/* Video / Thumbnail Container */}
      <div
        className="relative h-56 w-full bg-neutral-900 overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* Static Image Background (fades out on hover if video is active) */}
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          animate={{ opacity: isPlaying && project.videoPreview ? 0 : 1 }}
        />

        {/* Video Preview on Hover */}
        {project.videoPreview && (
          <video
            ref={videoRef}
            src={project.videoPreview}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: isPlaying ? 1 : 0 }}
          />
        )}

        {/* Dark image shadow gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Hover overlay capsule info */}
        <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white uppercase tracking-wider">
            {project.role.split(" ")[0]}
          </span>
          <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white/60 uppercase tracking-wider">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Metadata Details */}
      <div className="p-6 flex flex-col justify-between flex-grow bg-white/[0.005]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h3
              onClick={onClick}
              className="text-xl font-bold font-display text-white group-hover:text-brand-blue transition-colors cursor-pointer"
            >
              {project.title}
            </h3>
            {/* Quick Actions Links */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <Magnetic range={25}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </Magnetic>
              )}
              {project.liveUrl && (
                <Magnetic range={25}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white transition-colors"
                    aria-label="Live Site"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Magnetic>
              )}
            </div>
          </div>

          <p className="text-white/50 text-sm leading-relaxed font-light line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Bottom Panel */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col gap-4">
          {/* Tech stack items */}
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase text-white/30"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase text-white/30">
                +{project.techStack.length - 3} More
              </span>
            )}
          </div>

          {/* Learn Case Study CTA */}
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue group/btn w-fit"
          >
            <span>Read Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </TiltCard>
  );
}
