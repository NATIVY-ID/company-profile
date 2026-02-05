
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
    features: ['Microservices Architecture', 'Cloud Native', 'Military-Grade Security'],
    // Fix: added price property to satisfy updated Product interface
    price: 0
  },
  {
    id: 's2',
    name: 'Digital Creative',
    tagline: 'Building Experiences.',
    description: 'Bridging the gap between aesthetic beauty and functional digital strategy.',
    longDescription: 'Our creative studio doesn’t just design; we define brands. We create digital identities that resonate with users through immersive UI/UX and strategic storytelling, ensuring your agency stands out in a crowded market.',
    category: 'Digital Agency',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    features: ['UI/UX Design', 'Brand Identity', 'Creative Strategy'],
    // Fix: added price property to satisfy updated Product interface
    price: 0
  },
  {
    id: 's3',
    name: 'Mobile Ecosystems',
    tagline: 'Nativy in your pocket.',
    description: 'High-performance iOS and Android applications that feel like home.',
    longDescription: 'We develop native and cross-platform mobile apps that prioritize the user journey. By leveraging the latest mobile frameworks, we ensure your software is fast, intuitive, and future-proof.',
    category: 'Software Solution',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    features: ['Flutter & React Native', 'Offline-First Design', 'Real-time Sync'],
    // Fix: added price property to satisfy updated Product interface
    price: 0
  },
  {
    id: 's4',
    name: 'Web Platforms',
    tagline: 'Build Fast.',
    description: 'Modern web applications designed for the next generation of browsers.',
    longDescription: 'Using technologies like Next.js and Tailwind CSS, we craft web experiences that are SEO-optimized, blazing fast, and accessible to everyone. Our platforms are built to evolve as your business grows.',
    category: 'Digital Agency',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    features: ['Next.JS Core', 'Headless CMS', 'High Performance'],
    // Fix: added price property to satisfy updated Product interface
    price: 0
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
        title: "Digital Craftsmanship: The Nativy Origin",
        date: "June 12, 2025",
        excerpt: "Tracing our roots from a small creative hub to a powerhouse for high-performance software systems.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Nativy.id started with a simple belief: that Indonesia's digital landscape deserved more than just 'working' apps. We saw a gap where engineering precision met aesthetic clarity. Our journey began with the vision to bridge this gap, treating every project as a piece of craftsmanship."
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "From our early days developing local solutions to our expansion into national-scale governance systems, the core philosophy remains the same: Build Fast, Scale Smart."
            )
        )
    },
    {
        id: 2,
        title: "Engineering for Governance: Korlantas Polri",
        date: "May 28, 2025",
        excerpt: "A deep dive into how we built secure, real-time data ecosystems for national security and public safety.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Working with Korlantas Polri demanded a level of security and uptime that few agencies are equipped to handle. We implemented microservices architectures that allow for massive concurrent data processing while maintaining military-grade encryption."
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "This project redefined our approach to 'Scale Smart.' When millions of citizens rely on a system, there is zero room for error."
            )
        )
    },
    {
        id: 3,
        title: "Next.js & Cloud-Native: The Future Tech Stack",
        date: "April 15, 2025",
        excerpt: "Why we choose cutting-edge technologies to deliver blazing fast performance for our partners.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Technology evolves weekly, but stability is a requirement for enterprise growth. At Nativy, we lean heavily on Next.js, Flutter, and Cloud-Native architectures. This stack allows us to deploy rapidly without compromising on SEO or user experience."
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "By decoupling the frontend from the backend, we ensure that our apps are resilient, easy to maintain, and ready to pivot whenever the business needs change."
            )
        )
    },
    {
        id: 4,
        title: "The Human-Centric UI: Beyond Just Pixels",
        date: "March 10, 2025",
        excerpt: "How our Digital Creative studio balances functional strategy with immersive brand storytelling.",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "A beautiful app that is hard to use is a failure. Our creative process starts with the user journey. Whether it's a university management system or a healthcare app for PT. Rolas Nusantara Medika, accessibility is our priority."
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "We don't just design interfaces; we design experiences that evoke trust and efficiency. Design at Nativy is a strategic tool for growth, not just decoration."
            )
        )
    }
];

export const BRAND_NAME = 'Nativy.id';
export const BRAND_COLOR = '#3D3430';
export const ACCENT_COLOR = '#E8D8C9';
export const WHATSAPP_LINK = 'https://wa.me/6282386199996';
export const INSTAGRAM_LINK = 'https://instagram.com/nativy.id';
