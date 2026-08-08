import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";
import Magnetic from "@/components/ui/Magnetic";

export async function generateStaticParams() {
  return portfolioConfig.blogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = portfolioConfig.blogs.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog by Alex Thorne`,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = portfolioConfig.blogs.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Simple, lightweight native markdown parser to avoid heavy npm bundle overhead
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;

      // Handle Code blocks
      if (trimmedBlock.startsWith("```")) {
        const lines = trimmedBlock.split("\n");
        const code = lines.slice(1, -1).join("\n");
        const lang = lines[0].replace("```", "").trim() || "typescript";
        return (
          <div key={idx} className="my-6 glass-card p-6 rounded-xl font-mono text-xs overflow-x-auto border border-white/5 bg-black/60 shadow-lg">
            <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest border-b border-white/5 pb-2 mb-4">
              <span>{lang} code snippet</span>
              <span>copy</span>
            </div>
            <pre className="text-white/80 leading-relaxed">{code}</pre>
          </div>
        );
      }

      // Handle Heading 3
      if (trimmedBlock.startsWith("###")) {
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-display font-bold text-white mt-8 mb-4 tracking-tight">
            {trimmedBlock.replace("###", "").trim()}
          </h3>
        );
      }

      // Handle Heading 2
      if (trimmedBlock.startsWith("##")) {
        return (
          <h2 key={idx} className="text-2xl md:text-3xl font-display font-bold text-white mt-10 mb-5 tracking-tight">
            {trimmedBlock.replace("##", "").trim()}
          </h2>
        );
      }

      // Handle Bullet Lists
      if (trimmedBlock.startsWith("-") || trimmedBlock.startsWith("*")) {
        const items = trimmedBlock.split("\n").map((item) => item.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx} className="my-4 flex flex-col gap-2.5 pl-5 list-disc marker:text-brand-blue text-white/70 font-light leading-relaxed">
            {items.map((item, iIdx) => (
              <li key={iIdx}>{item}</li>
            ))}
          </ul>
        );
      }

      // Handle standard paragraphs with inline bold configurations
      const parts = trimmedBlock.split(/(\*\*.*?\*\*)/);
      return (
        <p key={idx} className="text-white/70 text-base font-light leading-relaxed tracking-wide mb-5">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-semibold text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            // Handle inline code formatting
            if (part.includes("`")) {
              const codeParts = part.split(/(`.*?`)/);
              return codeParts.map((cp, cIdx) => {
                if (cp.startsWith("`") && cp.endsWith("`")) {
                  return (
                    <code key={cIdx} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-white/95">
                      {cp.slice(1, -1)}
                    </code>
                  );
                }
                return cp;
              });
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <article className="min-h-screen bg-[#030303] text-white pt-28 md:pt-36 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full flex flex-col gap-10 md:gap-12">
      
      {/* Back button */}
      <div>
        <Magnetic range={25}>
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>
        </Magnetic>
      </div>

      {/* Blog Metadata Header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4 text-white/40 text-[10px] font-semibold uppercase tracking-wider font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-purple" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Insight</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white leading-tight">
          {post.title}
        </h1>
      </div>

      {/* Cover Image */}
      <div className="relative w-full h-[260px] sm:h-[400px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Main post body */}
      <div className="pt-6 border-t border-white/5 flex flex-col">
        {renderContent(post.content)}
      </div>

    </article>
  );
}
