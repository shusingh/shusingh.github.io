import { Route, Routes } from 'react-router-dom';

import { SiteLayout } from '@/components/Layout/SiteLayout';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { NowPage } from '@/pages/NowPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { ProjectsIndexPage } from '@/pages/ProjectsIndexPage';
import { WorkDetailPage } from '@/pages/WorkDetailPage';
import { WorkIndexPage } from '@/pages/WorkIndexPage';
import { WritingDetailPage } from '@/pages/WritingDetailPage';
import { WritingIndexPage } from '@/pages/WritingIndexPage';

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="work" element={<WorkIndexPage />} />
        <Route path="work/:slug" element={<WorkDetailPage />} />
        <Route path="projects" element={<ProjectsIndexPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="writing" element={<WritingIndexPage />} />
        <Route path="writing/:slug" element={<WritingDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="now" element={<NowPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
