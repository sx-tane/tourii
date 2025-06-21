import { SectionTitle } from "@/components/common/section-title";
import Header from "@/components/header/header-component/header";
import { Footer } from "@/components/homepage";
import type { Metadata } from "next";
import Link from "next/link";
import { useId } from "react";

export const metadata: Metadata = {
	title: "Terms of Service",
	description: "Terms of Service for using the Tourii platform",
};

export default function TermsOfServicePage() {
	const lastUpdated = "June 21, 2025";

	return (
		<>
			<Header theme="white" />
			<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<article className="prose prose-warmGrey max-w-none">
				<div className="mb-8">
					<SectionTitle
						subtitle={["LEGAL", "INFORMATION"]}
						title={["Terms", "of", "Service"]}
					/>
				</div>
				<p className="text-warmGrey3 mb-8">Last updated: {lastUpdated}</p>


				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						1. Acceptance of Terms
					</h2>
					<p className="text-warmGrey4 mb-4">
						By accessing or using Tourii ("the Service"), you agree to be bound
						by these Terms of Service ("Terms"). If you do not agree to these
						Terms, please do not use our Service.
					</p>
					<p className="text-warmGrey4">
						We may update these Terms from time to time. We will notify you of
						any changes by posting the new Terms on this page and updating the
						"Last updated" date.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						2. Eligibility
					</h2>
					<p className="text-warmGrey4 mb-4">
						You must be at least 13 years old to use our Service. By using the
						Service, you represent and warrant that you meet this age
						requirement.
					</p>
					<p className="text-warmGrey4">
						If you are under 18 years old, you must have your parent or
						guardian's permission to use the Service.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						3. Account Registration
					</h2>
					<p className="text-warmGrey4 mb-4">
						To access certain features of our Service, you may need to create an
						account. When creating an account, you must:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Provide accurate and complete information</li>
						<li>Maintain the security of your account credentials</li>
						<li>Promptly update any changes to your information</li>
						<li>Accept responsibility for all activities under your account</li>
					</ul>
					<p className="text-warmGrey4">
						You may not transfer your account to another person without our
						prior written consent.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						4. Use of Services
					</h2>
					<p className="text-warmGrey4 mb-4">
						Tourii provides a gamified tourism platform that includes:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Interactive storytelling experiences</li>
						<li>Location-based quests and challenges</li>
						<li>Digital passport and collectibles</li>
						<li>Social features and community interactions</li>
					</ul>
					<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
						Prohibited Uses
					</h3>
					<p className="text-warmGrey4 mb-4">You agree not to:</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
						<li>Violate any laws or regulations</li>
						<li>Infringe on intellectual property rights</li>
						<li>Harass, abuse, or harm other users</li>
						<li>Attempt to gain unauthorized access to the Service</li>
						<li>Use the Service for any fraudulent or illegal purpose</li>
						<li>Interfere with the proper functioning of the Service</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						5. User Content
					</h2>
					<p className="text-warmGrey4 mb-4">
						You retain ownership of any content you submit to our Service ("User
						Content"). By submitting User Content, you grant us a worldwide,
						non-exclusive, royalty-free license to use, reproduce, modify, and
						display your content for the purpose of operating and promoting the
						Service.
					</p>
					<p className="text-warmGrey4 mb-4">You represent and warrant that:</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
						<li>You own or have the necessary rights to your User Content</li>
						<li>Your User Content does not infringe on third-party rights</li>
						<li>Your User Content complies with our community guidelines</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						6. Digital Collectibles (NFTs)
					</h2>
					<p className="text-warmGrey4 mb-4">
						Tourii may offer digital collectibles in the form of non-fungible
						tokens (NFTs). These digital collectibles:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>
							Are subject to additional terms specific to each collectible
						</li>
						<li>
							May have associated benefits or utilities within the platform
						</li>
						<li>
							Are stored on blockchain networks and subject to their rules
						</li>
						<li>May have value that can fluctuate</li>
					</ul>
					<p className="text-warmGrey4">
						We make no guarantees about the future value or utility of any
						digital collectibles.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						7. Privacy
					</h2>
					<p className="text-warmGrey4">
						Your use of our Service is also governed by our{" "}
						<Link
							href="/privacy"
							className="text-red hover:text-red2 underline"
						>
							Privacy Policy
						</Link>
						. Please review our Privacy Policy to understand how we collect,
						use, and protect your information.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						8. Termination
					</h2>
					<p className="text-warmGrey4 mb-4">
						We may terminate or suspend your account at any time for violations
						of these Terms or for any other reason at our sole discretion.
					</p>
					<p className="text-warmGrey4">
						You may terminate your account at any time by contacting us. Upon
						termination, your right to use the Service will immediately cease.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						9. Contact Information
					</h2>
					<p className="text-warmGrey4 mb-4">
						If you have any questions about these Terms, please contact us at:
					</p>
					<div className="bg-warmGrey1 rounded-lg p-4 text-warmGrey4">
						<p className="font-semibold">Tourii Support</p>
						<p>Email: legal@tourii.com</p>
						<p>Address: [Company Address]</p>
					</div>
				</section>

				<div className="mt-12 pt-8 border-t border-warmGrey2">
					<p className="text-sm text-warmGrey3">
						By using Tourii, you acknowledge that you have read, understood, and
						agree to be bound by these Terms of Service.
					</p>
				</div>
				</article>
			</div>
			<Footer />
		</>
	);
}
