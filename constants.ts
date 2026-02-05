/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Service, JournalArticle } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Enterprise Software',
    tagline: 'Scale Smart.',
    description: 'Robust, secure, and scalable systems built for high-demand environments.',
    longDescription: 'Nativy specializes in architecting enterprise-grade software that streamlines operations. From government-level integrations to large-scale university management systems, we build with security and performance as our north stars.',
    category: 'Software Solution',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    features: ['Microservices Architecture', 'Cloud Native', 'Military-Grade Security']
  },
  {
    id: 's2',
    name: 'Digital Creative',
    tagline: 'Building Experiences.',
    description: 'Bridging the gap between aesthetic beauty and functional digital strategy.',
    longDescription: 'Our creative studio doesn’t just design; we define brands. We create digital identities that resonate with users through immersive UI/UX and strategic storytelling, ensuring your agency stands out in a crowded market.',
    category: 'Digital Agency',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    features: ['UI/UX Design', 'Brand Identity', 'Creative Strategy']
  },
  {
    id: 's3',
    name: 'Mobile Ecosystems',
    tagline: 'Nativy in your pocket.',
    description: 'High-performance iOS and Android applications that feel like home.',
    longDescription: 'We develop native and cross-platform mobile apps that prioritize the user journey. By leveraging the latest mobile frameworks, we ensure your software is fast, intuitive, and future-proof.',
    category: 'Software Solution',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    features: ['Flutter & React Native', 'Offline-First Design', 'Real-time Sync']
  },
  {
    id: 's4',
    name: 'Web Platforms',
    tagline: 'Build Fast.',
    description: 'Modern web applications designed for the next generation of browsers.',
    longDescription: 'Using technologies like Next.js and Tailwind CSS, we craft web experiences that are SEO-optimized, blazing fast, and accessible to everyone. Our platforms are built to evolve as your business grows.',
    category: 'Digital Agency',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    features: ['Next.JS Core', 'Headless CMS', 'High Performance']
  }
];

export const CLIENTS = [
  { name: 'Korlantas Polri', logo: '🚔' },
  { name: 'Universitas Jember', logo: '🎓' },
  { name: 'PT. Rolas Nusantara Medika', logo: '🏥' },
  { name: 'Perhimpunan Teknik Pertanian Indonesia', logo: '🚜' },
  { name: 'Juru Sembelih Halal Indonesia', logo: '☪️' },
  { name: 'Fanres', logo: '🌾' }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "The Future of Digital Governance",
        date: "May 20, 2025",
        excerpt: "How software solutions are transforming public services and police operations.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Software in the public sector is no longer just about digitizing paperwork—it is about creating resilient, transparent, and efficient ecosystems for citizens."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "At Nativy, we work closely with government bodies like Korlantas Polri to ensure that digital transitions are seamless and secure."
            )
        )
    },
    {
        id: 2,
        title: "Building Scalable Agencies",
        date: "April 15, 2025",
        excerpt: "Why 'Scale Smart' is the most important mantra for modern digital agencies.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Growth without strategy is a liability. Our approach to scaling involves modular architecture and automated workflows that allow creative teams to focus on what they do best."
            )
        )
    }
];

export const BRAND_NAME = 'Nativy.id';
export const BRAND_COLOR = '#3D3430';
export const ACCENT_COLOR = '#E8D8C9';
export const WHATSAPP_LINK = 'https://wa.me/6282386199996';
export const INSTAGRAM_LINK = 'https://instagram.com/nativy.id';
