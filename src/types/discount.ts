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

export interface DiscountRule {
  id: string;
  type: DiscountType;
  name: string;
  description?: string;
  logic: DiscountLogic;
  value: number;
  // Unified Discount Structure
  baseType: 'EQP' | 'FLAT_DISCOUNT';
  eqpModifier: string; // 'NONE', '3%', '5%', or custom like '10%'
  moqOption: 'NONE' | 'HALF' | 'FULL';
  setupOption: 'NONE' | 'HALF' | 'FULL';
  
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
