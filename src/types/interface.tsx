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

// PurchaseData interface
export interface ExperiencePurchase {
  participants: number;
  date: Date | undefined;
}

export interface MerchandisePurchase {
  itemNumber: number;
  deliveryDate: Date | undefined;
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
