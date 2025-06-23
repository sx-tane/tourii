import type { Meta, StoryObj } from "@storybook/react";
import LegalPageSection from "./legal-page-section";

const meta: Meta<typeof LegalPageSection> = {
	title: "Components/Legal/LegalPageSection",
	component: LegalPageSection,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component: "Animated section component for legal pages with Framer Motion. Features scroll-triggered animations, animated underlines, and smooth content transitions.",
			},
		},
	},
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSection: Story = {
	args: {
		title: "Acceptance of Terms",
		children: (
			<>
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
			</>
		),
	},
};

export const SectionWithList: Story = {
	args: {
		title: "Account Registration",
		children: (
			<>
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
						<span>Maintain the security of your account credentials</span>
					</li>
					<li className="flex items-start space-x-3">
						<span className="w-1.5 h-1.5 bg-charcoal rounded-full mt-2 flex-shrink-0"></span>
						<span>Promptly update any changes to your information</span>
					</li>
				</ul>
			</>
		),
	},
};

export const SectionWithSubheadings: Story = {
	args: {
		title: "Types of Cookies We Use",
		children: (
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
					</div>
				</div>
			</div>
		),
	},
};