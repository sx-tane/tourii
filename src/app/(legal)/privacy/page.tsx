import { SectionTitle } from "@/components/common/section-title";
import Header from "@/components/header/header-component/header";
import { Footer } from "@/components/homepage";
import type { Metadata } from "next";
import Link from "next/link";
import { useId } from "react";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"Privacy Policy for Tourii - Learn how we collect, use, and protect your data",
};

export default function PrivacyPolicyPage() {
	const lastUpdated = "June 21, 2025";

	return (
		<>
			<Header theme="white" />
			<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<article className="prose prose-warmGrey max-w-none">
				<div className="mb-8">
					<SectionTitle
						subtitle={["LEGAL", "INFORMATION"]}
						title={["Privacy", "Policy"]}
					/>
				</div>
				<p className="text-warmGrey3 mb-8">Last updated: {lastUpdated}</p>


				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						1. Introduction
					</h2>
					<p className="text-warmGrey4 mb-4">
						Welcome to Tourii. We respect your privacy and are committed to
						protecting your personal data. This Privacy Policy explains how we
						collect, use, disclose, and safeguard your information when you use
						our platform.
					</p>
					<p className="text-warmGrey4">
						By using Tourii, you consent to the data practices described in this
						policy. If you do not agree with our policies and practices, please
						do not use our services.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						2. Information We Collect
					</h2>

					<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
						Information You Provide
					</h3>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Account information (username, email, profile picture)</li>
						<li>Profile details (bio, interests, preferences)</li>
						<li>Content you create (photos, reviews, comments)</li>
						<li>Communications with us or other users</li>
						<li>
							Payment information (processed securely through third-party
							providers)
						</li>
					</ul>

					<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
						Information Automatically Collected
					</h3>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>
							Device information (device type, operating system, unique
							identifiers)
						</li>
						<li>Usage data (pages visited, features used, time spent)</li>
						<li>Location data (with your permission)</li>
						<li>Log data (IP address, browser type, access times)</li>
					</ul>

					<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
						Information from Third Parties
					</h3>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
						<li>Social media profiles (if you connect your accounts)</li>
						<li>Blockchain wallet information (for NFT features)</li>
						<li>Analytics providers</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						3. How We Use Your Information
					</h2>
					<p className="text-warmGrey4 mb-4">We use your information to:</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
						<li>Provide and improve our services</li>
						<li>Personalize your experience</li>
						<li>Process transactions and manage your account</li>
						<li>
							Send you updates, newsletters, and promotional materials (with
							consent)
						</li>
						<li>Respond to your comments, questions, and requests</li>
						<li>Monitor and analyze usage patterns and trends</li>
						<li>Detect, prevent, and address technical issues and fraud</li>
						<li>Comply with legal obligations</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						4. Location Data
					</h2>
					<p className="text-warmGrey4 mb-4">
						Tourii uses location data to provide core features such as:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Location-based quests and challenges</li>
						<li>Finding nearby tourist spots and model routes</li>
						<li>Verifying quest completion</li>
						<li>Providing navigation assistance</li>
					</ul>
					<p className="text-warmGrey4 mb-4">
						We only collect location data when you explicitly grant permission.
						You can:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
						<li>Control location permissions in your device settings</li>
						<li>
							Choose when to share your location (only while using the app)
						</li>
						<li>Disable location services at any time</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						5. Data Sharing and Disclosure
					</h2>
					<p className="text-warmGrey4 mb-4">
						We do not sell your personal information. We may share your
						information with:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>
							<strong>Service Providers:</strong> Third parties who help us
							operate our platform
						</li>
						<li>
							<strong>Business Partners:</strong> Tourism partners and venues
							(with your consent)
						</li>
						<li>
							<strong>Legal Requirements:</strong> When required by law or to
							protect rights
						</li>
						<li>
							<strong>Business Transfers:</strong> In connection with mergers or
							acquisitions
						</li>
						<li>
							<strong>With Your Consent:</strong> When you explicitly agree to
							sharing
						</li>
					</ul>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						6. Data Security
					</h2>
					<p className="text-warmGrey4 mb-4">
						We implement appropriate technical and organizational measures to
						protect your personal data, including:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Encryption of data in transit and at rest</li>
						<li>Regular security assessments and updates</li>
						<li>Access controls and authentication measures</li>
						<li>Employee training on data protection</li>
					</ul>
					<p className="text-warmGrey4">
						However, no method of transmission over the internet is 100% secure.
						While we strive to protect your personal data, we cannot guarantee
						absolute security.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						7. Your Rights
					</h2>
					<p className="text-warmGrey4 mb-4">
						Depending on your location, you may have the following rights:
					</p>
					<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
						<li>Access your personal data</li>
						<li>Correct inaccurate data</li>
						<li>Request deletion of your data</li>
						<li>Object to or restrict processing</li>
						<li>Data portability</li>
						<li>Withdraw consent</li>
					</ul>
					<p className="text-warmGrey4">
						To exercise these rights, please contact us using the information
						provided below.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						8. Cookies and Tracking
					</h2>
					<p className="text-warmGrey4 mb-4">
						We use cookies and similar tracking technologies to improve your
						experience. For more information, please see our{" "}
						<Link
							href="/cookies"
							className="text-red hover:text-red2 underline"
						>
							Cookie Policy
						</Link>
						.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						9. Children's Privacy
					</h2>
					<p className="text-warmGrey4 mb-4">
						Our services are not intended for children under 13 years of age. We
						do not knowingly collect personal information from children under
						13. If we learn we have collected information from a child under 13,
						we will delete that information.
					</p>
					<p className="text-warmGrey4">
						Users between 13 and 18 should have parental consent to use our
						services.
					</p>
				</section>

				<section id={useId()} className="mb-12">
					<h2 className="text-2xl font-semibold text-charcoal mb-4">
						10. Contact Us
					</h2>
					<p className="text-warmGrey4 mb-4">
						If you have questions about this Privacy Policy or our data
						practices, please contact us at:
					</p>
					<div className="bg-warmGrey1 rounded-lg p-4 text-warmGrey4">
						<p className="font-semibold">Tourii Privacy Team</p>
						<p>Email: privacy@tourii.com</p>
						<p>Address: [Company Address]</p>
					</div>
				</section>

				<div className="mt-12 pt-8 border-t border-warmGrey2">
					<p className="text-sm text-warmGrey3">
						This Privacy Policy is effective as of {lastUpdated} and will remain
						in effect except with respect to any changes in its provisions in
						the future, which will be in effect immediately after being posted
						on this page.
					</p>
				</div>
				</article>
			</div>
			<Footer />
		</>
	);
}
