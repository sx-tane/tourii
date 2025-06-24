"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-charcoal border-t border-warmGrey5 py-12 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Image
								src="/image/about/tourii-grey.png"
								alt="Tourii"
								width={1920}
								height={1920}
								className="object-contain w-24"
							/>
						</div>
						<p className="text-warmGrey3 text-sm leading-relaxed tracking-widest font-semibold max-w-md">
							EXPLORE. EARN. CONNECT.
						</p>
						<p className="text-warmGrey3 text-xs tracking-wider italic font-normal">
							Discover Japan through immersive storytelling and gamified
							exploration.
						</p>
					</div>

					{/* Legal */}
					<div className="space-y-4">
						<h3 className="text-warmGrey3 font-bold text-sm uppercase tracking-widest">
							LEGAL
						</h3>
						<ul className="space-y-2 text-warmGrey3 text-sm tracking-wider">
							<li>
								<Link
									href="/terms"
									className="hover:text-warmGrey transition-colors duration-300"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="hover:text-warmGrey transition-colors duration-300"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/cookies"
									className="hover:text-warmGrey transition-colors duration-300"
								>
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Social Media */}
					<div className="space-y-4">
						<h3 className="text-warmGrey3 font-bold text-sm uppercase tracking-widest">
							FOLLOW
						</h3>
						<ul className="space-y-2 text-warmGrey3 text-sm tracking-wider">
							<li>
								<Link
									href="https://tiktok.com/@tourii00"
									className="hover:text-warmGrey transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
								>
									TikTok
								</Link>
							</li>
							<li>
								<Link
									href="https://discord.com/invite/fsyS822VYn"
									className="hover:text-warmGrey transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
								>
									Discord
								</Link>
							</li>
							<li>
								<Link
									href="https://www.youtube.com/@TouriiJP"
									className="hover:text-warmGrey transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
								>
									Youtube
								</Link>
							</li>
							<li>
								<Link
									href="https://x.com/TouriiJP"
									className="hover:text-warmGrey transition-colors duration-300"
									target="_blank"
									rel="noopener noreferrer"
								>
									X
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-12 pt-8 border-t border-warmGrey3 text-center tracking-widest uppercase font-semibold">
					<p className="text-warmGrey3 text-xs">
						© {new Date().getFullYear()} Tourii. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
