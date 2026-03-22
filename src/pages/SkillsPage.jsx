import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle, ExternalLink, Code, Book } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { SkeletonList } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { cn } from '../lib/utils';

export const SkillsPage = ({ t }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSkills();
    // Auto-refresh every 30 seconds to detect new skills
    const interval = setInterval(() => fetchSkills(true), 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSkills = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data.skills || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const filteredSkills = skills.filter(
    (skill) =>
      !search ||
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <SkeletonList items={6} />;
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {t('skills.title') || 'Skills'}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {t('skills.description') || 'Installed skills and capabilities'}
            {lastUpdated && (
              <span className="ml-2 text-xs">
                · {t('skills.lastUpdated') || 'Updated'}: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchSkills(true)}
            disabled={refreshing}
            className={cn(
              'p-2 rounded-lg transition-colors',
              'bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)]',
              'text-[var(--text-secondary)]',
              refreshing && 'animate-spin'
            )}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <Badge variant="info" size="sm">
            {skills.length} {t('skills.installed') || 'installed'}
          </Badge>
        </div>
      </motion.div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder={t('skills.search') || 'Search skills...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Skills grid */}
      {filteredSkills.length === 0 ? (
        <EmptyState
          type="search"
          title={t('skills.noSkills') || 'No skills found'}
          description="Try adjusting your search"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} t={t} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const SkillCard = ({ skill, t, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card hover className="p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">{skill.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400">
                  {t('skills.installed') || 'Installed'}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="success" size="sm">v{skill.version}</Badge>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {skill.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-1">
            <Code className="w-3 h-3" />
            <span>SKILL.md</span>
            <CheckCircle className={cn(
              "w-3 h-3",
              skill.hasSkillMd ? "text-emerald-400" : "text-gray-500"
            )} />
          </div>
          <div className="flex items-center gap-1">
            <Book className="w-3 h-3" />
            <span>{skill.id}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SkillsPage;
