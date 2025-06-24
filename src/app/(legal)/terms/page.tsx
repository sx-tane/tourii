import { Footer } from "@/components/homepage";
import { LegalPageHero, LegalPageSection } from "@/components/legal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Terms of Service",
	description: "Terms of Service for using the Tourii platform",
};

export default function TermsOfServicePage() {
	const lastUpdated = "June 21, 2025";

	return (
		<div className="bg-warmGrey">
			<div className="min-h-screen bg-warmGrey">
				<LegalPageHero title="Terms of Service" lastUpdated={lastUpdated} />

				{/* Content Section */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="space-y-16">
						<LegalPageSection title="Acceptance of Terms">
							<p>
								By accessing or using Tourii ("the Service"), you agree to be
								bound by these Terms of Service ("Terms"). If you do not agree
								to these Terms, please do not use our Service.
							</p>
							<p>
								We may update these Terms from time to time. We will notify
								you of any changes by posting the new Terms on this page and
								updating the "Created at" date.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Eligibility">
							<p>
								You must be at least 13 years old to use our Service. By using
								the Service, you represent and warrant that you meet this age
								requirement.
							</p>
							<p>
								If you are under 18 years old, you must have your parent or
								guardian's permission to use the Service.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Account Registration">
							<p>
								To access certain features of our Service, you may need to
								create an account. When creating an account, you must:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Provide accurate and complete information</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Maintain the security of your account credentials
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>Promptly update any changes to your information</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Accept responsibility for all activities under your
										account
									</span>
								</li>
							</ul>
							<p>
								You may not transfer your account to another person without
								our prior written consent.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Use of Services">
							<div className="space-y-6">
								<p>
									Tourii provides a gamified tourism platform that includes:
								</p>
								<ul className="space-y-2 ml-6">
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>Interactive storytelling experiences</span>
									</li>
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>Location-based quests and challenges</span>
									</li>
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>Digital passport and collectibles</span>
									</li>
									<li className="flex items-start space-x-3">
										<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
										<span>Social features and community interactions</span>
									</li>
								</ul>

								<div className="mt-8">
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Prohibited Uses
									</h4>
									<p className="mb-4">You agree not to:</p>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Violate any laws or regulations</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Infringe on intellectual property rights</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>Harass, abuse, or harm other users</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Attempt to gain unauthorized access to the Service
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Use the Service for any fraudulent or illegal purpose
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Interfere with the proper functioning of the Service
											</span>
										</li>
									</ul>
								</div>
							</div>
						</LegalPageSection>

						<LegalPageSection title="User Content">
							<p>
								You retain ownership of any content you submit to our Service
								("User Content"). By submitting User Content, you grant us a
								worldwide, non-exclusive, royalty-free license to use,
								reproduce, modify, and display your content for the purpose of
								operating and promoting the Service.
							</p>
							<p>You represent and warrant that:</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										You own or have the necessary rights to your User Content
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Your User Content does not infringe on third-party rights
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Your User Content complies with our community guidelines
									</span>
								</li>
							</ul>
						</LegalPageSection>

						<LegalPageSection title="Digital Collectibles (NFTs)">
							<p>
								Tourii may offer digital collectibles in the form of
								non-fungible tokens (NFTs). These digital collectibles:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Are subject to additional terms specific to each
										collectible
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										May have associated benefits or utilities within the
										platform
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										Are stored on blockchain networks and subject to their
										rules
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>May have value that can fluctuate</span>
								</li>
							</ul>
							<p>
								We make no guarantees about the future value or utility of any
								digital collectibles.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Privacy">
							<p>
								Your use of our Service is also governed by our{" "}
								<Link
									href="/privacy"
									className="text-red hover:text-red/80 underline"
								>
									Privacy Policy
								</Link>
								. Please review our Privacy Policy to understand how we
								collect, use, and protect your information.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Termination">
							<p>
								We may terminate or suspend your account at any time for
								violations of these Terms or for any other reason at our sole
								discretion.
							</p>
							<p>
								You may terminate your account at any time by contacting us.
								Upon termination, your right to use the Service will
								immediately cease.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Contact Information">
							<p>
								If you have any questions about these Terms, please contact us
								at:
							</p>
							<div className="space-y-2">
								<p className="font-medium">Tourii Support</p>
								<p>Email: legal@tourii.com</p>
								<p>Address: [Company Address]</p>
							</div>
						</LegalPageSection>

						<div className="pt-8 border-t border-charcoal/20">
							<p className="text-charcoal text-center tracking-wider">
								By using Tourii, you acknowledge that you have read, understood,
								and agree to be bound by these Terms of Service.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}