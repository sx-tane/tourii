import { SectionTitle } from "@/components/common/section-title";
import Header from "@/components/header/header-component/header";
import { Footer } from "@/components/homepage";
import type { Metadata } from "next";
import Link from "next/link";
import { useId } from "react";

export const metadata: Metadata = {
	title: "Cookie Policy",
	description:
		"Cookie Policy for Tourii - Learn how we use cookies and similar technologies",
};

export default function CookiePolicyPage() {
	const lastUpdated = "June 21, 2025";

	return (
		<>
			<Header theme="white" />
			<div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<article className="prose prose-warmGrey max-w-none">
					<div className="mb-8">
						<SectionTitle
							subtitle={["LEGAL", "INFORMATION"]}
							title={["Cookie", "Policy"]}
						/>
					</div>
					<p className="text-warmGrey3 mb-8">Last updated: {lastUpdated}</p>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							What Are Cookies?
						</h2>
						<p className="text-warmGrey4 mb-4">
							Cookies are small text files that are placed on your device when
							you visit a website. They are widely used to make websites work
							more efficiently and provide information to website owners.
						</p>
						<p className="text-warmGrey4">
							This Cookie Policy explains how Tourii ("we," "us," or "our") uses
							cookies and similar technologies when you use our platform.
						</p>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							How We Use Cookies
						</h2>
						<p className="text-warmGrey4 mb-4">
							We use cookies and similar technologies for the following
							purposes:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
							<li>
								<strong>Authentication:</strong> To log you in and keep you
								signed in
							</li>
							<li>
								<strong>Preferences:</strong> To remember your settings and
								preferences
							</li>
							<li>
								<strong>Analytics:</strong> To understand how you use our
								platform
							</li>
							<li>
								<strong>Performance:</strong> To improve the speed and
								functionality
							</li>
							<li>
								<strong>Security:</strong> To help protect your account and data
							</li>
							<li>
								<strong>Advertising:</strong> To deliver relevant advertisements
							</li>
						</ul>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							Types of Cookies We Use
						</h2>

						<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
							Essential Cookies
						</h3>
						<p className="text-warmGrey4 mb-4">
							These cookies are necessary for the website to function properly.
							They include:
						</p>
						<div className="bg-warmGrey1 rounded-lg p-4 mb-6">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-warmGrey2">
										<th className="text-left py-2 text-charcoal">
											Cookie Name
										</th>
										<th className="text-left py-2 text-charcoal">Purpose</th>
										<th className="text-left py-2 text-charcoal">Duration</th>
									</tr>
								</thead>
								<tbody className="text-warmGrey4">
									<tr className="border-b border-warmGrey2">
										<td className="py-2">session_id</td>
										<td className="py-2">Maintains user session</td>
										<td className="py-2">Session</td>
									</tr>
									<tr className="border-b border-warmGrey2">
										<td className="py-2">auth_token</td>
										<td className="py-2">Authentication</td>
										<td className="py-2">2 weeks</td>
									</tr>
									<tr>
										<td className="py-2">csrf_token</td>
										<td className="py-2">Security</td>
										<td className="py-2">Session</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
							Functional Cookies
						</h3>
						<p className="text-warmGrey4 mb-4">
							These cookies enable enhanced functionality and personalization:
						</p>
						<div className="bg-warmGrey1 rounded-lg p-4 mb-6">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-warmGrey2">
										<th className="text-left py-2 text-charcoal">
											Cookie Name
										</th>
										<th className="text-left py-2 text-charcoal">Purpose</th>
										<th className="text-left py-2 text-charcoal">Duration</th>
									</tr>
								</thead>
								<tbody className="text-warmGrey4">
									<tr className="border-b border-warmGrey2">
										<td className="py-2">language_pref</td>
										<td className="py-2">Language preference</td>
										<td className="py-2">1 year</td>
									</tr>
									<tr className="border-b border-warmGrey2">
										<td className="py-2">theme_pref</td>
										<td className="py-2">Theme preference</td>
										<td className="py-2">1 year</td>
									</tr>
									<tr>
										<td className="py-2">location_consent</td>
										<td className="py-2">Location permission status</td>
										<td className="py-2">1 year</td>
									</tr>
								</tbody>
							</table>
						</div>

						<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
							Analytics Cookies
						</h3>
						<p className="text-warmGrey4 mb-4">
							These cookies help us understand how visitors interact with our
							platform:
						</p>
						<div className="bg-warmGrey1 rounded-lg p-4 mb-6">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b border-warmGrey2">
										<th className="text-left py-2 text-charcoal">
											Cookie Name
										</th>
										<th className="text-left py-2 text-charcoal">Provider</th>
										<th className="text-left py-2 text-charcoal">Purpose</th>
									</tr>
								</thead>
								<tbody className="text-warmGrey4">
									<tr className="border-b border-warmGrey2">
										<td className="py-2">_ga</td>
										<td className="py-2">Google Analytics</td>
										<td className="py-2">User identification</td>
									</tr>
									<tr className="border-b border-warmGrey2">
										<td className="py-2">_gid</td>
										<td className="py-2">Google Analytics</td>
										<td className="py-2">Session tracking</td>
									</tr>
									<tr>
										<td className="py-2">_tourii_analytics</td>
										<td className="py-2">Tourii</td>
										<td className="py-2">Platform usage</td>
									</tr>
								</tbody>
							</table>
						</div>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							Third-Party Cookies
						</h2>
						<p className="text-warmGrey4 mb-4">
							We work with third-party services that may set their own cookies:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
							<li>
								<strong>Google Analytics:</strong> For website analytics
							</li>
							<li>
								<strong>Social Media Platforms:</strong> When you share content
								or log in
							</li>
							<li>
								<strong>Payment Processors:</strong> For secure transactions
							</li>
							<li>
								<strong>Content Delivery Networks:</strong> For faster content
								delivery
							</li>
						</ul>
						<p className="text-warmGrey4">
							These third parties have their own privacy policies and we do not
							have control over their cookies.
						</p>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							Managing Cookies
						</h2>
						<p className="text-warmGrey4 mb-4">
							You can control and manage cookies in various ways:
						</p>

						<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
							Browser Settings
						</h3>
						<p className="text-warmGrey4 mb-4">
							Most browsers allow you to control cookies through their settings:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-warmGrey4 mb-4">
							<li>
								<a
									href="https://support.google.com/chrome/answer/95647"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Chrome
								</a>
							</li>
							<li>
								<a
									href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Firefox
								</a>
							</li>
							<li>
								<a
									href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Safari
								</a>
							</li>
							<li>
								<a
									href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Edge
								</a>
							</li>
						</ul>

						<div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
							<p className="text-amber-900 text-sm">
								<strong>Note:</strong> Blocking all cookies may impact your
								experience on our platform. Some features may not function
								properly without cookies.
							</p>
						</div>

						<h3 className="text-xl font-semibold text-charcoal mb-3 mt-6">
							Opt-Out Options
						</h3>
						<p className="text-warmGrey4 mb-4">
							You can opt out of specific types of cookies:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
							<li>
								Analytics: Visit{" "}
								<a
									href="https://tools.google.com/dlpage/gaoptout"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Google Analytics Opt-out
								</a>
							</li>
							<li>
								Advertising: Visit{" "}
								<a
									href="https://optout.aboutads.info/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-red hover:text-red2 underline"
								>
									Digital Advertising Alliance Opt-out
								</a>
							</li>
						</ul>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							Other Tracking Technologies
						</h2>
						<p className="text-warmGrey4 mb-4">
							In addition to cookies, we may use other similar technologies:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-warmGrey4">
							<li>
								<strong>Local Storage:</strong> To store preferences locally on
								your device
							</li>
							<li>
								<strong>Session Storage:</strong> To maintain data during your
								browsing session
							</li>
							<li>
								<strong>Web Beacons:</strong> To track email opens and
								interactions
							</li>
							<li>
								<strong>Device Fingerprinting:</strong> To identify unique
								devices for security
							</li>
						</ul>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							7. Updates to This Policy
						</h2>
						<p className="text-warmGrey4 mb-4">
							We may update this Cookie Policy from time to time to reflect
							changes in our practices or for legal, operational, or regulatory
							reasons.
						</p>
						<p className="text-warmGrey4">
							We will notify you of any material changes by updating the "Last
							updated" date at the top of this policy.
						</p>
					</section>

					<section id={useId()} className="mb-12">
						<h2 className="text-2xl font-semibold text-charcoal mb-4">
							8. Contact Us
						</h2>
						<p className="text-warmGrey4 mb-4">
							If you have questions about our use of cookies or this Cookie
							Policy, please contact us:
						</p>
						<div className="bg-warmGrey1 rounded-lg p-4 text-warmGrey4">
							<p className="font-semibold">Tourii Support</p>
							<p>Email: privacy@tourii.com</p>
							<p>Address: [Company Address]</p>
						</div>
					</section>

					<div className="mt-12 pt-8 border-t border-warmGrey2">
						<p className="text-sm text-warmGrey3">
							By continuing to use Tourii, you consent to our use of cookies as
							described in this policy. For more information about how we handle
							your personal data, please see our{" "}
							<Link
								href="/privacy"
								className="text-red hover:text-red2 underline"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</article>
			</div>
			<Footer />
		</>
	);
}
