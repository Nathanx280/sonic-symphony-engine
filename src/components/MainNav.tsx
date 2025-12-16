import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { Zap, Wand2, Video, GitMerge, Layers } from 'lucide-react';

export function MainNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 p-1 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50"
    >
      <NavLink to="/" icon={<Zap className="w-4 h-4" />}>
        Remix Studio
      </NavLink>
      <NavLink to="/deep-remixer" icon={<Wand2 className="w-4 h-4" />}>
        Deep Remixer
      </NavLink>
      <NavLink to="/audio-to-video" icon={<Video className="w-4 h-4" />}>
        Audio to Video
      </NavLink>
      <NavLink to="/remix-merge" icon={<GitMerge className="w-4 h-4" />}>
        Remix Merge
      </NavLink>
      <NavLink to="/stem-reconstruct" icon={<Layers className="w-4 h-4" />}>
        Stem Reconstruct
      </NavLink>
    </motion.nav>
  );
}
