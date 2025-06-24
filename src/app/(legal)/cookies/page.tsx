import { Footer } from "@/components/homepage";
import { LegalPageHero, LegalPageSection } from "@/components/legal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Cookie Policy",
	description:
		"Cookie Policy for Tourii - Learn how we use cookies and similar technologies",
};

export default function CookiePolicyPage() {
	const lastUpdated = "June 21, 2025";

	return (
		<div className="bg-warmGrey">
			<div className="min-h-screen bg-warmGrey">
				<LegalPageHero title="Cookie Policy" lastUpdated={lastUpdated} />

				{/* Content Section */}
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="space-y-16">
						<LegalPageSection title="What Are Cookies?">
							<p>
								Cookies are small text files that are placed on your device
								when you visit a website. They are widely used to make
								websites work more efficiently and provide information to
								website owners.
							</p>
							<p>
								This Cookie Policy explains how Tourii ("we," "us," or "our")
								uses cookies and similar technologies when you use our
								platform.
							</p>
						</LegalPageSection>

						<LegalPageSection title="How We Use Cookies">
							<p>
								We use cookies and similar technologies for the following
								purposes:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Authentication:</strong> To log you in and keep
										you signed in
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Preferences:</strong> To remember your settings
										and preferences
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Analytics:</strong> To understand how you use our
										platform
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Performance:</strong> To improve the speed and
										functionality
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Security:</strong> To help protect your account
										and data
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Advertising:</strong> To deliver relevant
										advertisements
									</span>
								</li>
							</ul>
						</LegalPageSection>

						<LegalPageSection title="Types of Cookies We Use">
							<div className="space-y-8">
								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Essential Cookies
									</h4>
									<p className="mb-4">
										These cookies are necessary for the website to function
										properly. They include:
									</p>
									<div className="space-y-2">
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">session_id</span>
											<span>Maintains user session</span>
											<span>Session</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">auth_token</span>
											<span>Authentication</span>
											<span>2 weeks</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">csrf_token</span>
											<span>Security</span>
											<span>Session</span>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Functional Cookies
									</h4>
									<p className="mb-4">
										These cookies enable enhanced functionality and
										personalization:
									</p>
									<div className="space-y-2">
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">language_pref</span>
											<span>Language preference</span>
											<span>1 year</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">theme_pref</span>
											<span>Theme preference</span>
											<span>1 year</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">location_consent</span>
											<span>Location permission status</span>
											<span>1 year</span>
										</div>
									</div>
								</div>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Analytics Cookies
									</h4>
									<p className="mb-4">
										These cookies help us understand how visitors interact with
										our platform:
									</p>
									<div className="space-y-2">
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">_ga</span>
											<span>Google Analytics - User identification</span>
											<span>2 years</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">_gid</span>
											<span>Google Analytics - Session tracking</span>
											<span>24 hours</span>
										</div>
										<div className="flex justify-between py-2 border-b border-charcoal/20">
											<span className="font-medium">_tourii_analytics</span>
											<span>Tourii - Platform usage</span>
											<span>1 year</span>
										</div>
									</div>
								</div>
							</div>
						</LegalPageSection>

						<LegalPageSection title="Third-Party Cookies">
							<p>
								We work with third-party services that may set their own
								cookies:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Google Analytics:</strong> For website analytics
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Social Media Platforms:</strong> When you share
										content or log in
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Payment Processors:</strong> For secure
										transactions
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Content Delivery Networks:</strong> For faster
										content delivery
									</span>
								</li>
							</ul>
							<p>
								These third parties have their own privacy policies and we do
								not have control over their cookies.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Managing Cookies">
							<div className="space-y-6">
								<p>You can control and manage cookies in various ways:</p>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Browser Settings
									</h4>
									<p className="mb-4">
										Most browsers allow you to control cookies through their
										settings:
									</p>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												<a
													href="https://support.google.com/chrome/answer/95647"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Chrome
												</a>
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												<a
													href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Firefox
												</a>
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												<a
													href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Safari
												</a>
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												<a
													href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Edge
												</a>
											</span>
										</li>
									</ul>
								</div>

								<div>
									<p className="font-medium">Important Note:</p>
									<p>
										Blocking all cookies may impact your experience on our
										platform. Some features may not function properly without
										cookies.
									</p>
								</div>

								<div>
									<h4 className="text-xl tracking-wider font-semibold text-charcoal mb-4">
										Opt-Out Options
									</h4>
									<p className="mb-4">
										You can opt out of specific types of cookies:
									</p>
									<ul className="space-y-2 ml-6">
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Analytics: Visit{" "}
												<a
													href="https://tools.google.com/dlpage/gaoptout"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Google Analytics Opt-out
												</a>
											</span>
										</li>
										<li className="flex items-start space-x-3">
											<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
											<span>
												Advertising: Visit{" "}
												<a
													href="https://optout.aboutads.info/"
													target="_blank"
													rel="noopener noreferrer"
													className="text-red hover:text-red/80 underline"
												>
													Digital Advertising Alliance Opt-out
												</a>
											</span>
										</li>
									</ul>
								</div>
							</div>
						</LegalPageSection>

						<LegalPageSection title="Other Tracking Technologies">
							<p>
								In addition to cookies, we may use other similar technologies:
							</p>
							<ul className="space-y-2 ml-6">
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Local Storage:</strong> To store preferences
										locally on your device
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Session Storage:</strong> To maintain data during
										your browsing session
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Web Beacons:</strong> To track email opens and
										interactions
									</span>
								</li>
								<li className="flex items-start space-x-3">
									<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
									<span>
										<strong>Device Fingerprinting:</strong> To identify unique
										devices for security
									</span>
								</li>
							</ul>
						</LegalPageSection>

						<LegalPageSection title="Updates to This Policy">
							<p>
								We may update this Cookie Policy from time to time to reflect
								changes in our practices or for legal, operational, or
								regulatory reasons.
							</p>
							<p>
								We will notify you of any material changes by updating the
								"Created at" date at the top of this policy.
							</p>
						</LegalPageSection>

						<LegalPageSection title="Contact Us">
							<p>
								If you have questions about our use of cookies or this Cookie
								Policy, please contact us:
							</p>
							<div className="space-y-2">
								<p className="font-medium">Tourii Support</p>
								<p>Email: privacy@tourii.com</p>
								<p>Address: [Company Address]</p>
							</div>
						</LegalPageSection>

						<div className="pt-8 border-t border-charcoal/20">
							<p className="text-charcoal text-center tracking-wider">
								By continuing to use Tourii, you consent to our use of cookies
								as described in this policy. For more information about how we
								handle your personal data, please see our{" "}
								<Link
									href="/privacy"
									className="text-red hover:text-red/80 underline"
								>
									Privacy Policy
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}