"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import TiltCard from "../ui/TiltCard";

export default function Blog() {
  const router = useRouter();
  const blogs = portfolioConfig.blogs;

  return (
    <section id="blog" className="relative py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="flex flex-col gap-4 mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue font-mono">06 / Writing</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight"
        >
          Articles &amp; Insights
        </motion.h2>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((post, idx) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              className="flex flex-col h-full group"
              maxTilt={6}
            >
              <div
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="relative h-60 w-full overflow-hidden cursor-pointer"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Float tag links */}
                <div className="absolute bottom-4 left-6 flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded border border-white/10 bg-black/60 backdrop-blur-md text-[9px] font-semibold text-white/80 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-white/[0.005]">
                <div className="flex flex-col gap-4">
                  {/* Time metadata info */}
                  <div className="flex items-center gap-4 text-white/40 text-[10px] font-semibold uppercase tracking-wider font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-brand-blue" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-brand-purple" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-brand-blue transition-colors cursor-pointer leading-tight"
                  >
                    {post.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm font-light leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-white/5">
                  <button
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue group/btn w-fit"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
