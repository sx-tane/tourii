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
  };
  price: number;
}

// PurchaseData interface
interface ExperiencePurchase {
  date: Date;
  person: string;
}

interface MerchandisePurchase {
  itemNumber: number;
  deliveryDate: Date;
}

export interface PurchaseData {
  purchaseType: "Experience" | "Merchandise";
  details: ExperiencePurchase | MerchandisePurchase;
  totalPurchase: number;
}

// Customer interface
export interface Customer {
  name: string;
  address: string;
  telephone: string;
  email: string;
}
