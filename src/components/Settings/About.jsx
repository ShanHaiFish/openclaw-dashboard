import { motion } from 'framer-motion';
import { Github, Heart, ExternalLink, Star } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Logo } from '../ui/Logo';
import Button from '../ui/Button';
import { APP_VERSION } from '../../lib/constants';

export const About = ({ t }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="py-8">
          <div className="flex flex-col items-center text-center">
            <Logo size={64} className="mb-4" />
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              {t('app.name')}
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              {t('about.description')}
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
              <span>{t('settings.version')}</span>
              <span className="px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                v{APP_VERSION}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('about.builtWith')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', version: '18' },
              { name: 'Vite', version: '5' },
              { name: 'TailwindCSS', version: '3' },
              { name: 'Framer Motion', version: '11' },
              { name: 'Recharts', version: '2' },
              { name: 'Zustand', version: '4' },
              { name: 'Lucide', version: '' },
              { name: 'date-fns', version: '3' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)]"
              >
                <span className="text-sm text-[var(--text-primary)]">{tech.name}</span>
                {tech.version && (
                  <span className="text-xs text-[var(--text-tertiary)]">v{tech.version}</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Made with love for the OpenClaw community</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="secondary" icon={Star}>
                {t('about.starOnGithub')}
              </Button>
              <Button variant="primary" icon={ExternalLink}>
                {t('about.viewSource')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-[var(--text-tertiary)]">
        <p>© 2024 OpenClaw. Released under the MIT License.</p>
      </div>
    </div>
  );
};

export default About;
