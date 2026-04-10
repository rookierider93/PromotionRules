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
  ArrowUpDown
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
import { DiscountRule } from '@/src/types/discount';

interface DiscountTableProps {
  rules: DiscountRule[];
  onAddRule: () => void;
  onEditRule: (rule: DiscountRule) => void;
}

export function DiscountTable({ rules, onAddRule, onEditRule }: DiscountTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<string>('ALL');

  const filteredRules = rules.filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         rule.promoCode?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || rule.type === typeFilter;
    return matchesSearch && matchesType;
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="PROMOTION">Promotions</SelectItem>
              <SelectItem value="CUSTOM_GROUP">Custom Groups</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onAddRule}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[250px]">Rule Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Logic</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Promo Code</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.length > 0 ? (
              filteredRules.map((rule) => (
                <TableRow key={rule.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{rule.name}</span>
                      <span className="text-xs text-muted-foreground font-normal line-clamp-1">{rule.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.type === 'PROMOTION' ? 'default' : 'secondary'} className="gap-1">
                      {rule.type === 'PROMOTION' ? <Tag className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                      {rule.type === 'PROMOTION' ? 'Promo' : 'Group'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">
                    {rule.logic === 'EQP' ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">EQP</span>
                        <div className="flex flex-wrap gap-1">
                          {rule.eqpModifier && rule.eqpModifier !== 'NONE' && (
                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                              {rule.eqpModifier === 'MINUS_3' ? '-3%' : '-5%'}
                            </Badge>
                          )}
                          {rule.isHalfMOQ && (
                            <Badge variant="outline" className="text-[10px] h-4 px-1">1/2 MOQ</Badge>
                          )}
                          {rule.isHalfSetupCharge && (
                            <Badge variant="outline" className="text-[10px] h-4 px-1">1/2 Setup</Badge>
                          )}
                        </div>
                      </div>
                    ) : rule.logic}
                  </TableCell>
                  <TableCell className="font-bold">
                    {rule.logic === 'EQP' ? (
                      <span className="text-muted-foreground font-normal italic">Tiered</span>
                    ) : (
                      rule.logic.includes('PERCENTAGE') ? `${rule.value}%` : `$${rule.value}`
                    )}
                  </TableCell>
                  <TableCell>
                    {rule.promoCode ? (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-bold text-primary">
                        {rule.promoCode}
                      </code>
                    ) : (
                      <span className="text-muted-foreground text-xs italic">Automatic</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(rule.endDate).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {rule.status === 'ACTIVE' ? (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 gap-1">
                        <XCircle className="w-3 h-3" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onEditRule(rule)}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No rules found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
