export interface CrewInfoProps {
	profileImage: string;
	name: string;
	title: string;
	description: string;
	twiiterHandle: string;
	twitterLink?: string;
}

export interface DescriptionProps {
	smallTitle?: string;
	title?: string;
	content?: string;
	images?: string[];
}

export interface ExperienceCircleProps {
	number: number;
	title: string;
	description?: string;
}

export interface ExperienceDetailProps {
	number: number;
	data: ExperienceCircleProps[];
}

export interface AboutMenuProps {
	onClose: () => void;
}

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: string;
}
