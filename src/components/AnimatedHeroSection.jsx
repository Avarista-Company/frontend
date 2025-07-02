import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

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
	const [activeIndex, setActiveIndex] = useState(0);
	const sectionRef = useRef();
	const overlayRef = useRef();
	const timeoutRef = useRef();

	useEffect(() => {
		const animateIn = () => {
			gsap.fromTo(
				sectionRef.current,
				{ x: '60vw', opacity: 0, scale: 0.97, filter: 'blur(10px)' },
				{ x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'power4.out' }
			);
			gsap.fromTo(
				overlayRef.current,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
			);
		};
		const animateOut = (cb) => {
			gsap.to(sectionRef.current, {
				x: '-60vw',
				opacity: 0,
				scale: 0.97,
				filter: 'blur(10px)',
				duration: 1.1,
				ease: 'power4.in',
				onComplete: cb,
			});
			gsap.to(overlayRef.current, {
				opacity: 0,
				y: 40,
				duration: 0.7,
				ease: 'power2.in',
			});
		};
		animateIn();
		timeoutRef.current = setTimeout(() => {
			animateOut(() => {
				setActiveIndex((prev) => (prev + 1) % heroSections.length);
			});
		}, 3500);
		return () => clearTimeout(timeoutRef.current);
	}, [activeIndex]);

	const section = heroSections[activeIndex];

	return (
		<div className="w-full">
			<section
				ref={sectionRef}
				className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
				style={{ backgroundImage: `url(${section.image})` }}
			>
				{/* Gradient Overlay */}
				<div className={`absolute inset-0 pointer-events-none ${section.gradient} z-10`} />
				{/* Overlay Content */}
				<div
					ref={overlayRef}
					className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6"
				>
					<h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-4 text-center">
						{section.label}
					</h1>
					<p className="text-xl md:text-2xl text-white/90 font-medium mb-8 text-center max-w-2xl">
						{section.tagline}
					</p>
					<button className="btn-primary px-8 py-4 text-lg rounded-full shadow-xl bg-white/90 text-neutral-900 font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-200">
						Shop Now
					</button>
				</div>
			</section>
		</div>
	);
}