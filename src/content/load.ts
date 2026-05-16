import type { ComponentType } from 'react';

import {
  parseWorkFrontmatter,
  parseWritingFrontmatter,
  type WorkEntry,
  type WritingEntry,
} from './types';

interface MdxModule {
  default: ComponentType;
  frontmatter: unknown;
}

const writingModules = import.meta.glob<MdxModule>('/content/writing/*.mdx', { eager: true });
const workModules = import.meta.glob<MdxModule>('/content/work/*.mdx', { eager: true });

function buildWriting(): WritingEntry[] {
  return Object.entries(writingModules)
    .map(([path, mod]) => ({
      frontmatter: parseWritingFrontmatter(mod.frontmatter, path),
      Component: mod.default,
    }))
    .filter((entry) => !entry.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
    );
}

function buildWork(): WorkEntry[] {
  return Object.entries(workModules)
    .map(([path, mod]) => ({
      frontmatter: parseWorkFrontmatter(mod.frontmatter, path),
      Component: mod.default,
    }))
    .filter((entry) => !entry.frontmatter.draft)
    .sort((a, b) => {
      const orderA = a.frontmatter.order;
      const orderB = b.frontmatter.order;
      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB;
      }
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;
      return (
        new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
      );
    });
}

export const writingEntries: WritingEntry[] = buildWriting();
export const workEntries: WorkEntry[] = buildWork();

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  return writingEntries.find((entry) => entry.frontmatter.slug === slug);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return workEntries.find((entry) => entry.frontmatter.slug === slug);
}

export interface AdjacentEntry<T> {
  prev?: T;
  next?: T;
}

export function getAdjacent<T extends { frontmatter: { slug: string } }>(
  entries: T[],
  slug: string
): AdjacentEntry<T> {
  const index = entries.findIndex((entry) => entry.frontmatter.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? entries[index - 1] : undefined,
    next: index < entries.length - 1 ? entries[index + 1] : undefined,
  };
}

export function formatWritingDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
