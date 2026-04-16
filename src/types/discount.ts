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

export interface DiscountRule {
  id: string;
  name: string;
  description?: string;
  logic: DiscountLogic;
  value: number;
  // Unified Discount Structure
  isAutomatic: boolean;
  baseType: 'EQP' | 'FLAT_DISCOUNT' | 'SHIPPING_DISCOUNT';
  combinableWith: ('EQP' | 'FLAT_DISCOUNT' | 'SHIPPING_DISCOUNT')[];
  eqpModifier: string; // 'NONE', '3%', '5%', or custom like '10%'
  moqOption: string; // 'NONE', 'HALF', 'FULL', or custom like '25%'
  setupOption: string; // 'NONE', 'HALF', 'FULL', or custom like '25%'
  
  // Flat Discount Specifics
  flatDiscountType?: 'PERCENTAGE' | 'AMOUNT';
  maxDiscountAmount?: number;
  applyOnBasketPrice?: boolean;
  tieredFlatDiscounts?: TieredFlatDiscount[];
  
  // Shipping Discount Specifics
  shippingDiscountType?: 'PERCENTAGE' | 'AMOUNT' | 'FREE';
  shippingMethods?: string[];
  
  // Targeting & Validity Specifics
  applyOnFirstTimeBuyer?: boolean;
  promoCodeUseOneTime?: boolean;
  applyOnItemPrice?: boolean;
  applyOnItemPlusCharges?: boolean;
  
  minOrderAmount?: number;
  promoCode?: string;
  scope: DiscountScope;
  targetIds: string[]; // Category IDs or Product IDs
  status: 'ACTIVE' | 'INACTIVE';
  startDate: string;
  endDate: string;
  isFirstTimeBuyerOnly?: boolean;
  isOneTimeUseOnly?: boolean;
  applyOnItemPriceOnly?: boolean;
  maxLimitPerUser?: number;
  customerGroupIds?: string[];
  customerIds?: string[]; // For CUSTOM_GROUP specific targeting
}
