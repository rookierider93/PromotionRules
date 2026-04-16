export type DiscountType = 'PRODUCT' | 'ORDER';

export type DiscountLogic = 
  | 'PERCENTAGE' 
  | 'FLAT_AMOUNT' 
  | 'EQP' 
  | 'NQP' 
  | 'SHIPPING_PERCENTAGE' 
  | 'SHIPPING_FLAT'
  | 'SPEND_X_SAVE_Y_AMOUNT'
  | 'SPEND_X_SAVE_Y_PERCENT';

export type DiscountScope = 'SITEWIDE' | 'CATEGORY' | 'PRODUCT' | 'CUSTOMER_GROUP';

export interface TieredFlatDiscount {
  minOrderAmount: number;
  discountAmount: number;
}

export interface PromotionalRule {
  id: string;
  name: string;
  description?: string;
  logic: DiscountLogic;
  
  // Unified Discount Structure
  isAutomatic: boolean;
  baseType: 'EQP' | 'FLAT_DISCOUNT' | 'MOQ' | 'SETUP_CHARGE' | 'SHIPPING_DISCOUNT';
  eqpModifier: string; // 'NONE', '3%', '5%', or custom like '10%'
  moqOption: string; // 'NONE', 'HALF', 'FULL', or custom like '25%'
  setupOption: string; // 'NONE', 'HALF', 'FULL', or custom like '25%'
  
  // Flat Discount Specifics
  flatDiscountType?: 'PERCENTAGE' | 'AMOUNT';
  flatDiscountValue?: number; // Unique field for flat discount value
  maxDiscountAmount?: number;
  flatDiscountApplyOnBasket?: boolean; // Unique field
  tieredFlatDiscounts?: TieredFlatDiscount[];
  
  // Free Product Specifics
  isFreeProduct?: boolean;
  freeProductIds?: string[];
  freeProductMinOrderAmount?: number; // Unique field
  freeProductApplyOnBasket?: boolean; // Unique field

  // Shipping Discount Specifics
  shippingDiscountType?: 'FREE' | 'PERCENTAGE' | 'AMOUNT';
  shippingDiscountValue?: number;
  shippingMethods?: string[];
  shippingMinOrderAmount?: number;
  
  // Targeting & Validity Specifics
  applyOnFirstTimeBuyer?: boolean;
  promoCodeUseOneTime?: boolean;
  applyOnItemPlusCharges?: boolean;
  
  promoCode?: string;
  scope: DiscountScope;
  
  // Separate Targeting Fields
  categoryIds?: string[];
  productIds?: string[];
  customerGroupIds?: string[];
  
  status: 'ACTIVE' | 'INACTIVE';
  startDate: string;
  endDate: string;
  maxLimitPerUser?: number;
}
