import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function SEO({
  title,
  description = SITE_DESCRIPTION,
  ogImage,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const { pathname } = useLocation();
  const url = `${SITE_ORIGIN}${pathname === '/' ? '' : pathname}`;
  const fullTitle = title ? `${title} | Shubham Singh` : SITE_TITLE;
  const image = ogImage ?? `${SITE_ORIGIN}/og/default.png`;

  useEffect(() => {
    document.title = fullTitle;
    setLink('canonical', url);
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      description
    );
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      description
    );
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow'
    );
  }, [fullTitle, description, url, type, image, noIndex]);

  return null;
}
