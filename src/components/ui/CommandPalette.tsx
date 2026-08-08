"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, ArrowRight, CornerDownLeft, Sparkles, Folder, FileText, User } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio";

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Command items definition
  const navigationItems = [
    { id: "hero", title: "Home / Hero", category: "Navigation", icon: Sparkles, action: () => scrollToSection("#hero") },
    { id: "about", title: "About Alex", category: "Navigation", icon: User, action: () => scrollToSection("#about") },
    { id: "projects", title: "Projects Showcase", category: "Navigation", icon: Folder, action: () => scrollToSection("#projects") },
    { id: "experience", title: "Work & Education Timeline", category: "Navigation", icon: FileText, action: () => scrollToSection("#timeline") },
    { id: "blog", title: "Articles & Blog", category: "Navigation", icon: FileText, action: () => scrollToSection("#blog") },
    { id: "contact", title: "Contact alex", category: "Navigation", icon: Hash, action: () => scrollToSection("#contact") },
  ];

  const projectItems = portfolioConfig.projects.map((p) => ({
    id: `project-${p.slug}`,
    title: `Project: ${p.title} — ${p.subtitle}`,
    category: "Projects",
    icon: Folder,
    action: () => {
      setIsOpen(false);
      router.push(`/projects/${p.slug}`);
    },
  }));

  const socialItems = [
    { id: "github", title: "View GitHub Repository", category: "Socials", icon: Hash, action: () => window.open(portfolioConfig.personalInfo.socials.github, "_blank") },
    { id: "linkedin", title: "Connect on LinkedIn", category: "Socials", icon: Hash, action: () => window.open(portfolioConfig.personalInfo.socials.linkedin, "_blank") },
    { id: "twitter", title: "Follow on Twitter", category: "Socials", icon: Hash, action: () => window.open(portfolioConfig.personalInfo.socials.twitter, "_blank") },
    { id: "email", title: "Send an Email", category: "Socials", icon: Hash, action: () => window.open(`mailto:${portfolioConfig.personalInfo.socials.email}`, "_blank") },
  ];

  const allItems = [...navigationItems, ...projectItems, ...socialItems];

  const filteredItems = allItems.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      // Find Lenis or scroll natively
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle keys when palette is open
  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
  }, [search, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        filteredItems[activeIndex].action();
      }
    }
  };

  return (
    <>
      {/* Keyboard Shortcut Indicator in bottom corner */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/50 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 backdrop-blur-md rounded-lg transition-all"
        >
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-sans bg-white/10 rounded border border-white/10 shadow flex items-center">
            ⌘K
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Palette Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="relative w-full max-w-xl bg-card border border-white/10 rounded-xl shadow-2xl overflow-hidden z-10"
              onKeyDown={handleKeyDown}
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.01]">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
                  autoFocus
                />
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-white/30 font-sans border border-white/10 px-1 py-0.5 rounded">ESC</span>
                </div>
              </div>

              {/* Items List */}
              <div className="max-h-[340px] overflow-y-auto p-2 scrollbar-none" ref={containerRef}>
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-sm text-white/40">
                    No results found for &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  <div>
                    {/* Render grouped items */}
                    {["Navigation", "Projects", "Socials"].map((category) => {
                      const categoryItems = filteredItems.filter((item) => item.category === category);
                      if (categoryItems.length === 0) return null;

                      return (
                        <div key={category} className="mb-2 last:mb-0">
                          <div className="px-3 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                            {category}
                          </div>
                          {categoryItems.map((item) => {
                            // Find absolute index in full filteredItems list
                            const itemIndex = filteredItems.findIndex((fi) => fi.id === item.id);
                            const isSelected = itemIndex === activeIndex;

                            return (
                              <button
                                key={item.id}
                                onClick={item.action}
                                onMouseEnter={() => setActiveIndex(itemIndex)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                                  isSelected
                                    ? "bg-white/[0.07] text-white"
                                    : "text-white/70 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <item.icon className={`w-4 h-4 ${isSelected ? "text-brand-blue" : "text-white/40"}`} />
                                  <span>{item.title}</span>
                                </div>
                                {isSelected && (
                                  <div className="flex items-center gap-1 text-[10px] text-white/50">
                                    <span>Select</span>
                                    <CornerDownLeft className="w-3 h-3" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
