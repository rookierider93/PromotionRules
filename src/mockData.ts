import { DiscountRule } from './types/discount';

export const MOCK_RULES: DiscountRule[] = [
  {
    id: '1',
    type: 'PROMOTION',
    name: '10PERSHIP',
    description: '10% discount on shipping for orders over $600',
    logic: 'SHIPPING_PERCENTAGE',
    value: 10,
    minOrderAmount: 600,
    promoCode: '10PERSHIP',
    scope: 'SITEWIDE',
    targetIds: [],
    status: 'ACTIVE',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    isFirstTimeBuyerOnly: false,
    isOneTimeUseOnly: false,
    applyOnItemPriceOnly: false,
    maxLimitPerUser: 0
  },
  {
    id: '2',
    type: 'CUSTOM_GROUP',
    name: 'Test NQP 16',
    description: 'Special NQP pricing for selected customers',
    logic: 'NQP',
    value: 0,
    scope: 'PRODUCT',
    targetIds: ['PROD-001', 'PROD-002'],
    status: 'ACTIVE',
    startDate: '2023-04-03',
    endDate: '2026-12-31',
    customerIds: ['CUST-001', 'CUST-002']
  }
];
