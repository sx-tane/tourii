// Product interface
export interface Product {
	productId: string;
	name: string;
	description?: string;
	image: string;
	category: {
		productType: "Experience" | "Merchandise" | undefined;
		bungoOnoArea:
			| "Mie"
			| "Ogata"
			| "Asaji"
			| "Ono"
			| "Inukai"
			| "Kiyokawa"
			| "Chitose"
			| undefined;
		bungoOnoAreaColor: string;
	};
	price: number;
}

export interface ProductDetailsProps {
	product: Product;
}

export interface ProductImageProps {
	image: string;
	name: string;
}

export interface RelatedProductsProps {
	bungoOnoArea: string;
	productId: string;
}

// PurchaseData interface
export interface ExperiencePurchase {
	participants: number;
	date: Date | undefined;
}

export interface ExperienceFormProps {
	onDetailsChange: (details: ExperiencePurchase) => void;
}

export interface MerchandisePurchase {
	itemNumber: number;
	deliveryDate: Date | undefined;
}

export interface MerchandiseFormProps {
	onDetailsChange: (details: MerchandisePurchase) => void;
}

export interface PurchaseData {
	purchaseType: "Experience" | "Merchandise" | undefined;
	details: ExperiencePurchase | MerchandisePurchase | undefined;
	totalPurchase: number;
}

// Customer interface
export interface Customer {
	name: string;
	address: string;
	telephone: string;
	email: string;
}

// CartItem interface
export interface CartItem {
	product: Product;
	purchaseData: PurchaseData;
}

export interface AddToCartButtonProps {
	product: Product;
	purchaseData: PurchaseData;
}

// StoreFront Interface
export interface FilterProps {
	setFilter: (filter: string) => void;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	setPage: (page: number) => void;
}

export interface ProductCardProps {
	product: Product;
	textColor: string;
	productTypeTextColor: string;
}

export interface ProductGridProps {
	products: Product[];
	currentPage: number; // Added this prop to track page changes
}

export interface SearchBarProps {
	setSearchQuery: (query: string) => void;
}
