import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Frame, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'Integration', href: '/' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '/faqs' },
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Services', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Changelog', href: '/changelog' },
			{ title: 'Brand', href: '/brand' },
			{ title: 'Help', href: '/help' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: Facebook },
			{ title: 'Instagram', href: '#', icon: Instagram },
			{ title: 'Youtube', href: '#', icon: Youtube },
			{ title: 'LinkedIn', href: '#', icon: Linkedin },
		],
	},
];

export function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Top section with logo and copyright */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-8 h-8 bg-black rounded flex items-center justify-center relative overflow-hidden">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white">
								{/* Interconnected nodes representing blockchain */}
								<circle cx="6" cy="6" r="2" fill="currentColor" />
								<circle cx="14" cy="6" r="2" fill="currentColor" />
								<circle cx="6" cy="14" r="2" fill="currentColor" />
								<circle cx="14" cy="14" r="2" fill="currentColor" />
								<circle cx="10" cy="10" r="1.5" fill="currentColor" />
								{/* Connecting lines */}
								<line x1="6" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
								<line x1="14" y1="6" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
								<line x1="6" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
								<line x1="14" y1="14" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
								<line x1="6" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
								<line x1="6" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
							</svg>
						</div>
						<span className="text-xl font-bold text-gray-900">TraceLogic</span>
					</div>
					<p className="text-gray-600 text-sm">
						© {new Date().getFullYear()} TraceLogic. All rights reserved.
					</p>
				</div>

				{/* Links grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={index * 0.1}>
							<div>
								<h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
									{section.label}
								</h4>
								<ul className="space-y-3">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-2"
											>
												{link.icon && <link.icon className="h-4 w-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<'div'>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			viewport={{ once: true }}
		>
			{children}
		</motion.div>
	);
}

// Default export
export default Footer;