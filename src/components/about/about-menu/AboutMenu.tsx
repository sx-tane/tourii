import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface AboutMenuProps {
	onClose: () => void;
}

const AboutMenu: React.FC<AboutMenuProps> = ({ onClose }) => {
	const pathname = usePathname();
	const handleClick = (id: string) => (event: React.MouseEvent) => {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};

	// TODO: when the user is on the about page, the link should be black
	const linkClass = (href: string) => {
		const fragment = href;
		const pathnameWithSlash = pathname.endsWith("/")
			? pathname
			: `${pathname}/`;
		const newHref = fragment ? pathnameWithSlash + fragment : pathname;
		return `uppercase transition-all hover:text-black ${
			pathnameWithSlash === newHref ? "text-black" : "text-white"
		}`;
	};

	return (
		<div onMouseLeave={onClose} className="flex items-center justify-center">
			<Image
				src="/image/about/about-menu.svg"
				alt="menu"
				width={1000}
				height={1000}
			/>
			<div className="absolute z-10 flex flex-col items-center justify-center space-y-11 text-center text-[9px] font-semibold leading-3 tracking-widest text-white">
				<Link
					href={"#who-is-tourii"}
					onClick={handleClick("who-is-tourii")}
					className={linkClass("#who-is-tourii")}
				>
					Who is Tourii
				</Link>
				<Link
					href={"#our-objectives"}
					onClick={handleClick("our-objectives")}
					className={linkClass("#our-objectives")}
				>
					Our Objectives
				</Link>
				<Link
					href={"#your-journey"}
					onClick={handleClick("your-journey")}
					className={linkClass("#your-journey")}
				>
					Your Journey
				</Link>
				<Link
					href={"#about-tourii-nft"}
					onClick={handleClick("about-tourii-nft")}
					className={linkClass("#about-tourii-nft")}
				>
					About Tourii NFT
				</Link>
				<Link
					href={"#meet-our-crew"}
					onClick={handleClick("meet-our-crew")}
					className={linkClass("#meet-our-crew")}
				>
					Meet Our Crew
				</Link>
			</div>
		</div>
	);
};

export default AboutMenu;
