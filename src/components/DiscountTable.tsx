import * as React from 'react';
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  Tag, 
  Users, 
  Calendar,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Edit2
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { PromotionalRule } from '@/src/types/discount';

interface PromotionalRulesTableProps {
  rules: PromotionalRule[];
  onAddRule: () => void;
  onEditRule: (rule: PromotionalRule) => void;
}

export function PromotionalRulesTable({ rules, onAddRule, onEditRule }: PromotionalRulesTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<string>('ALL');

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         rule.promoCode?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rules or codes..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onAddRule}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <div className="rounded-lg overflow-hidden border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary border-none">
              <TableHead className="text-white font-bold h-12 col-span-2">Rule Name</TableHead>
              <TableHead className="text-white font-bold h-12">Logic</TableHead>
              <TableHead className="text-white font-bold h-12">Value</TableHead>
              <TableHead className="text-white font-bold h-12">Promo Code</TableHead>
              <TableHead className="text-white font-bold h-12">Validity</TableHead>
              <TableHead className="text-white font-bold h-12">Status</TableHead>
              <TableHead className="text-white font-bold h-12 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>

      <div className="space-y-3 mt-4">
        {filteredRules.length > 0 ? (
          filteredRules.map((rule) => (
            <div 
              key={rule.id} 
              className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-transparent hover:border-primary/20 transition-all"
            >
              <div className="grid grid-cols-7 w-full items-center gap-4">
                <div className="col-span-1 font-medium">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700">{rule.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal line-clamp-1">{rule.description}</span>
                  </div>
                </div>

                <div className="col-span-1 text-xs font-mono text-slate-500">
                  {rule.baseType === 'EQP' ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-700">EQP</span>
                      <div className="flex flex-wrap gap-1">
                        {rule.eqpModifier !== 'NONE' && (
                          <span className="text-[9px] bg-slate-100 px-1 rounded">-{rule.eqpModifier}</span>
                        )}
                        {rule.moqOption !== 'NONE' && (
                          <span className="text-[9px] bg-slate-100 px-1 rounded">{rule.moqOption === 'HALF' ? '1/2' : 'Full'} MOQ</span>
                        )}
                      </div>
                    </div>
                  ) : rule.baseType === 'SHIPPING_DISCOUNT' ? (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-700">Shipping</span>
                      <span className="text-[9px] bg-slate-100 px-1 rounded w-fit">
                        {rule.shippingDiscountType === 'FREE' ? 'Free' : 
                         rule.shippingDiscountType === 'PERCENTAGE' ? 'Percentage' : 'Amount'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-slate-700">Flat</span>
                      <span className="text-[9px] bg-slate-100 px-1 rounded w-fit">
                        {rule.flatDiscountType === 'PERCENTAGE' ? 'Percentage' : 'Amount'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-span-1 font-bold text-sm">
                  {rule.baseType === 'EQP' ? (
                    <span className="text-slate-400 font-normal italic text-xs">Tiered</span>
                  ) : rule.baseType === 'FLAT_DISCOUNT' ? (
                    rule.flatDiscountType === 'PERCENTAGE' ? (
                      `${rule.flatDiscountValue}%`
                    ) : (
                      rule.tieredFlatDiscounts && rule.tieredFlatDiscounts.length > 1 ? (
                        <span className="text-slate-400 font-normal italic text-xs">Multi-Tier</span>
                      ) : (
                        `$${rule.tieredFlatDiscounts?.[0]?.discountAmount || rule.flatDiscountValue}`
                      )
                    )
                  ) : rule.baseType === 'SHIPPING_DISCOUNT' ? (
                    rule.shippingDiscountType === 'FREE' ? (
                      <span className="text-green-600">FREE</span>
                    ) : rule.shippingDiscountType === 'PERCENTAGE' ? (
                      `${rule.shippingDiscountValue}%`
                    ) : (
                      `$${rule.shippingDiscountValue}`
                    )
                  ) : (
                    `$${rule.flatDiscountValue || 0}`
                  )}
                </div>

                <div className="col-span-1">
                  {rule.isAutomatic ? (
                    <Badge variant="outline" className="text-[10px] border-slate-200 text-slate-500 bg-slate-50">Automatic</Badge>
                  ) : rule.promoCode ? (
                    <code className="text-primary font-bold text-xs">{rule.promoCode}</code>
                  ) : (
                    <span className="text-slate-400 text-[10px] italic">No Code</span>
                  )}
                </div>

                <div className="col-span-1">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(rule.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="col-span-1">
                  {rule.status === 'ACTIVE' ? (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-[10px] px-2 py-0">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-[10px] px-2 py-0">Inactive</Badge>
                  )}
                </div>

                <div className="col-span-1 text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-primary hover:bg-primary/10"
                    onClick={() => onEditRule(rule)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg p-12 text-center text-slate-400 border-2 border-dashed">
            No rules found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
