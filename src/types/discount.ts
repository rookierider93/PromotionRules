export type DiscountType = 'PROMOTION' | 'CUSTOM_GROUP';

export type DiscountLogic = 
  | 'PERCENTAGE' 
  | 'FLAT_AMOUNT' 
  | 'EQP' 
  | 'NQP' 
  | 'SHIPPING_PERCENTAGE' 
  | 'SHIPPING_FLAT'
  | 'SPEND_X_SAVE_Y_AMOUNT'
  | 'SPEND_X_SAVE_Y_PERCENT';

export type DiscountScope = 'SITEWIDE' | 'CATEGORY' | 'PRODUCT';

export interface DiscountRule {
  id: string;
  type: DiscountType;
  name: string;
  description?: string;
  logic: DiscountLogic;
  value: number;
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
