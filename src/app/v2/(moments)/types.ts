export interface Moment {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	rewardText: string;
	questName?: string;
	location?: string;
	createdAt: string;
	userId: string;
	userName: string;
	userAvatar?: string;
}

export interface MomentsResponse {
	moments: Moment[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNext: boolean;
		hasPrevious: boolean;
	};
}

export interface MomentsFilters {
	page?: number;
	limit?: number;
	questId?: string;
	location?: string;
	rewardType?: string;
	userId?: string;
	search?: string;
}