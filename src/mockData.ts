import { DiscountRule } from './types/discount';

export const MOCK_RULES: DiscountRule[] = [
  {
    id: '1',
    type: 'PRODUCT',
    name: 'EQP Summer Special',
    description: 'EQP - 3% with Half MOQ',
    logic: 'EQP',
    baseType: 'EQP',
    eqpModifier: '3%',
    moqOption: 'HALF',
    setupOption: 'NONE',
    value: 0,
    scope: 'SITEWIDE',
    targetIds: [],
    status: 'ACTIVE',
    startDate: '2025-11-01',
    endDate: '2025-12-31',
    promoCode: 'SUMMER3'
  },
  {
    id: '2',
    type: 'ORDER',
    name: 'VIP Flat Discount',
    description: '$50 off for VIP customers',
    logic: 'FLAT_AMOUNT',
    baseType: 'FLAT_DISCOUNT',
    eqpModifier: 'NONE',
    moqOption: 'NONE',
    setupOption: 'NONE',
    value: 50,
    scope: 'PRODUCT',
    targetIds: ['PROD-001'],
    status: 'ACTIVE',
    startDate: '2023-04-03',
    endDate: '2026-12-31'
  }
];
