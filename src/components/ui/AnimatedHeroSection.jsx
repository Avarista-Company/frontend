import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const heroSections = [
	{
		label: "Men's Wear",
		tagline: 'Bold. Modern. Timeless.',
		image: '/images/men_wear.jpeg',
		alt: 'Modern Men’s Fashion',
		gradient: 'bg-gradient-to-br from-black/70 via-black/40 to-transparent',
	},
	{
		label: "Women's Wear",
		tagline: 'Elegance in Every Thread.',
		image: '/images/women_wear.jpeg',
		alt: 'Modern Women’s Fashion',
		gradient: 'bg-gradient-to-br from-black/70 via-black/40 to-transparent',
	},
	{
		label: "Kids' Wear",
		tagline: 'Playful. Bright. Unique.',
		image: '/images/kid_fashion.jpeg',
		alt: 'Modern Kids’ Fashion',
		gradient: 'bg-gradient-to-br from-black/70 via-black/40 to-transparent',
	},
];

export default function AnimatedHeroSection() {
	const sectionRefs = useRef([]);
	const overlayRefs = useRef([]);

	useEffect(() => {
		sectionRefs.current.forEach((el, i) => {
			if (!el) return;
			const fromX = i % 2 === 0 ? '-60vw' : '60vw';
			gsap.fromTo(
				el,
				{ x: fromX, opacity: 0, scale: 0.97, filter: 'blur(10px)' },
				{
					x: 0,
					opacity: 1,
					scale: 1,
					filter: 'blur(0px)',
					duration: 1.2,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: el,
						start: 'top 85%',
						toggleActions: 'play none none reverse',
						once: false,
					},
					onComplete: () => {
						if (overlayRefs.current[i]) {
							gsap.to(overlayRefs.current[i], {
								opacity: 1,
								y: 0,
								duration: 0.8,
								delay: 0.1,
								ease: 'power2.out',
							});
						}
					},
				}
			);
			// Set overlay text to hidden initially
			if (overlayRefs.current[i]) {
				gsap.set(overlayRefs.current[i], { opacity: 0, y: 40 });
			}
		});
	}, []);

	return (
		<div className="w-full">
			{heroSections.map((section, i) => (
				<section
					key={section.label}
					ref={el => (sectionRefs.current[i] = el)}
					className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
					style={{ backgroundImage: `url(${section.image})` }}
				>
					{/* Gradient Overlay */}
					<div className={`absolute inset-0 pointer-events-none ${section.gradient} z-10`} />
					{/* Overlay Content */}
					<div
						ref={el => (overlayRefs.current[i] = el)}
						className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
					>
						<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-4 text-center">
							{section.label}
						</h1>
						<p className="text-xl md:text-2xl text-white/90 font-medium mb-8 text-center max-w-2xl">
							{section.tagline}
						</p>
						<button className="btn-primary px-8 py-4 text-lg rounded-full shadow-xl bg-white/90 text-neutral-900 font-semibold hover:bg-blue-100 transition-all duration-200">
							Shop Now
						</button>
					</div>
				</section>
			))}
		</div>
	);
}
