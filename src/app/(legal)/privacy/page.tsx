import { Footer } from "@/components/homepage";
import { LegalPageHero, LegalPageSection } from "@/components/legal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description:
		"Privacy Policy for Tourii - Learn how we collect, use, and protect your data",
};

export default function PrivacyPolicyPage() {
	const lastUpdated = "June 21, 2025";

	return (
		<div className="bg-warmGrey">
			<div className="min-h-screen bg-warmGrey">
				<LegalPageHero title="Privacy Policy" lastUpdated={lastUpdated} />

				{/* Content Section */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="space-y-16">
						<LegalPageSection title="Introduction">
							<p>
								Welcome to Tourii. We respect your privacy and are committed
								to protecting your personal data. This Privacy Policy explains
								how we collect, use, disclose, and safeguard your information
								when you use our platform.
							</p>
							<p>
								By using Tourii, you consent to the data practices described
								in this policy. If you do not agree with our policies and
								practices, please do not use our services.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Information We Collect">
							<div className="space-y-8">
								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Information You Provide
									</h4>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Account information (username, email, profile picture)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Profile details (bio, interests, preferences)</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Content you create (photos, reviews, comments)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Communications with us or other users</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Payment information (processed securely through
												third-party providers)
											</span>
										</li>
									</ul>
								</div>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Information Automatically Collected
									</h4>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Device information (device type, operating system,
												unique identifiers)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Usage data (pages visited, features used, time spent)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Location data (with your permission)</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Log data (IP address, browser type, access times)
											</span>
										</li>
									</ul>
								</div>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Information from Third Parties
									</h4>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Social media profiles (if you connect your accounts)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Blockchain wallet information (for NFT features)
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Analytics providers</span>
										</li>
									</ul>
								</div>
							</div>
						</LegalPageSection>

						<LegalPageSection title="How We Use Your Information">
							<p>We use your information to:</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Provide and improve our services</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Personalize your experience</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Process transactions and manage your account</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Send you updates, newsletters, and promotional materials
										(with consent)
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Respond to your comments, questions, and requests
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Monitor and analyze usage patterns and trends</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Detect, prevent, and address technical issues and fraud
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Comply with legal obligations</span>
								</li>
							</ul>
						</LegalPageSection>

						<LegalPageSection title="Location Data">
							<p>
								Tourii uses location data to provide core features such as:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Location-based quests and challenges</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Finding nearby tourist spots and model routes</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Verifying quest completion</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Providing navigation assistance</span>
								</li>
							</ul>
							<div className="mt-6 space-y-4">
								<p className="font-medium">Location Data Control</p>
								<p>
									We only collect location data when you explicitly grant
									permission. You can:
								</p>
								<ul className="space-y-2 ml-6">
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>
											Control location permissions in your device settings
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>
											Choose when to share your location (only while using the
											app)
										</span>
									</li>
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>Disable location services at any time</span>
									</li>
								</ul>
							</div>
						</LegalPageSection>

						<LegalPageSection title="Data Sharing and Disclosure">
							<p className="font-medium">
								We do not sell your personal information.
							</p>
							<p>We may share your information with:</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Service Providers:</strong> Third parties who help
										us operate our platform
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Business Partners:</strong> Tourism partners and
										venues (with your consent)
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Legal Requirements:</strong> When required by law
										or to protect rights
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Business Transfers:</strong> In connection with
										mergers or acquisitions
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>With Your Consent:</strong> When you explicitly
										agree to sharing
									</span>
								</li>
							</ul>
						</LegalPageSection>

						<LegalPageSection title="Data Security">
							<p>
								We implement appropriate technical and organizational measures
								to protect your personal data, including:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Encryption of data in transit and at rest</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Regular security assessments and updates</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Access controls and authentication measures</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Employee training on data protection</span>
								</li>
							</ul>
							<p>
								However, no method of transmission over the internet is 100%
								secure. While we strive to protect your personal data, we
								cannot guarantee absolute security.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Your Rights">
							<p>
								Depending on your location, you may have the following rights:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Access your personal data</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Correct inaccurate data</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Request deletion of your data</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Object to or restrict processing</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Data portability</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Withdraw consent</span>
								</li>
							</ul>
							<p>
								To exercise these rights, please contact us using the
								information provided below.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Cookies and Tracking">
							<p>
								We use cookies and similar tracking technologies to improve
								your experience. For more information, please see our{" "}
								<Link
									href="/cookies"
									className="text-red hover:text-red/80 underline"
								>
									Cookie Policy
								</Link>
								.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Children's Privacy">
							<p>
								Our services are not intended for children under 13 years of
								age. We do not knowingly collect personal information from
								children under 13. If we learn we have collected information
								from a child under 13, we will delete that information.
							</p>
							<p>
								Users between 13 and 18 should have parental consent to use
								our services.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Contact Us">
							<p>
								If you have questions about this Privacy Policy or our data
								practices, please contact us at:
							</p>
							<div className="space-y-2">
								<p className="font-medium">Tourii Privacy Team</p>
								<p>Email: privacy@tourii.com</p>
								<p>Address: [Company Address]</p>
							</div>
						</LegalPageSection>

						<div className="pt-8 border-t border-charcoal/20">
							<p className="text-charcoal text-center tracking-wider">
								This Privacy Policy is effective as of {lastUpdated} and will
								remain in effect except with respect to any changes in its
								provisions in the future, which will be in effect immediately
								after being posted on this page.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}