import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Info, 
  Tag, 
  Users, 
  Calendar, 
  Target,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { DiscountRule, DiscountScope } from '@/src/types/discount';

interface UnifiedDiscountFormProps {
  initialData?: Partial<DiscountRule>;
  onSave: (rule: Partial<DiscountRule>) => void;
  onCancel: () => void;
}

export function UnifiedDiscountForm({ initialData, onSave, onCancel }: UnifiedDiscountFormProps) {
  const [formData, setFormData] = React.useState<Partial<DiscountRule>>({
    type: 'PRODUCT',
    baseType: 'EQP',
    eqpModifier: 'NONE',
    moqOption: 'NONE',
    setupOption: 'NONE',
    scope: 'SITEWIDE',
    status: 'ACTIVE',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[1] || '2026-12-31',
    value: 0,
    ...initialData
  });

  const updateFormData = (data: Partial<DiscountRule>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const generateRuleString = () => {
    if (formData.baseType === 'FLAT_DISCOUNT') {
      return `Flat Discount ($${formData.value || 0})`;
    }
    
    let parts = ['EQP'];
    if (formData.eqpModifier !== 'NONE') parts[0] += ` - ${formData.eqpModifier}`;
    
    let addons = [];
    if (formData.moqOption !== 'NONE') addons.push(`${formData.moqOption === 'HALF' ? 'Half' : 'Full'} MOQ`);
    if (formData.setupOption !== 'NONE') addons.push(`${formData.setupOption === 'HALF' ? 'Half' : 'Full'} Setup Charge`);
    
    return parts.concat(addons).join(', ');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Main Form Panel */}
      <div className="flex-1 space-y-8 w-full">
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Configure Discount Rule
            </CardTitle>
            <CardDescription>Define the core logic and targeting for your discount.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                General Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Rule Type</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={formData.type === 'PRODUCT' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => updateFormData({ type: 'PRODUCT' })}
                    >
                      Product
                    </Button>
                    <Button 
                      variant={formData.type === 'ORDER' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => updateFormData({ type: 'ORDER' })}
                    >
                      Order
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Summer EQP Special" 
                    value={formData.name || ''} 
                    onChange={e => updateFormData({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 2: Discount Logic */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
                Discount Logic
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-muted-foreground">Base Discount</Label>
                  <div className="flex gap-4">
                    <Button 
                      variant={formData.baseType === 'EQP' ? 'default' : 'outline'}
                      className="flex-1 h-16 text-lg font-bold"
                      onClick={() => updateFormData({ baseType: 'EQP' })}
                    >
                      EQP
                    </Button>
                    <Button 
                      variant={formData.baseType === 'FLAT_DISCOUNT' ? 'default' : 'outline'}
                      className="flex-1 h-16 text-lg font-bold"
                      onClick={() => updateFormData({ baseType: 'FLAT_DISCOUNT' })}
                    >
                      Flat Discount
                    </Button>
                  </div>
                </div>

                {formData.baseType === 'EQP' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 p-6 bg-slate-50 rounded-xl border"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase text-slate-500">EQP Modifier</Label>
                      {(!['NONE', '3%', '5%'].includes(formData.eqpModifier || 'NONE')) && (
                        <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">Custom Value</Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['NONE', '3%', '5%'].map((m) => (
                        <Button
                          key={m}
                          variant={formData.eqpModifier === m ? 'secondary' : 'ghost'}
                          className={`flex-1 border min-w-[100px] ${formData.eqpModifier === m ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-white'}`}
                          onClick={() => updateFormData({ eqpModifier: m })}
                        >
                          {m === 'NONE' ? 'Standard' : `-${m}`}
                        </Button>
                      ))}
                      <div className="flex-1 min-w-[150px] relative">
                        <Input 
                          placeholder="Custom %"
                          className={`pl-8 ${!['NONE', '3%', '5%'].includes(formData.eqpModifier || 'NONE') ? 'border-primary ring-1 ring-primary' : 'bg-white'}`}
                          value={!['NONE', '3%', '5%'].includes(formData.eqpModifier || 'NONE') ? formData.eqpModifier?.replace('%', '') : ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') {
                              updateFormData({ eqpModifier: 'NONE' });
                            } else {
                              updateFormData({ eqpModifier: val.endsWith('%') ? val : `${val}%` });
                            }
                          }}
                        />
                        <span className="absolute left-3 top-2.5 text-slate-400 font-bold">-</span>
                        <span className="absolute right-3 top-2.5 text-slate-400 text-xs">%</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 p-6 bg-slate-50 rounded-xl border"
                  >
                    <Label className="text-xs font-bold uppercase text-slate-500">Discount Amount ($)</Label>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-white text-xl font-bold h-12"
                      value={formData.value || ''} 
                      onChange={e => updateFormData({ value: parseFloat(e.target.value) || 0 })}
                    />
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* MOQ Add-on */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold">MOQ Add-on</Label>
                      <Badge variant={formData.moqOption !== 'NONE' ? 'default' : 'outline'}>
                        {formData.moqOption !== 'NONE' ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {['NONE', 'HALF', 'FULL'].map((opt) => (
                        <Button
                          key={opt}
                          variant={formData.moqOption === opt ? 'secondary' : 'outline'}
                          className={`flex-1 text-xs ${formData.moqOption === opt ? 'border-primary bg-primary/10 text-primary' : ''}`}
                          onClick={() => updateFormData({ moqOption: opt as any })}
                        >
                          {opt.charAt(0) + opt.slice(1).toLowerCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Setup Charge Add-on */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold">Setup Charge Add-on</Label>
                      <Badge variant={formData.setupOption !== 'NONE' ? 'default' : 'outline'}>
                        {formData.setupOption !== 'NONE' ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      {['NONE', 'HALF', 'FULL'].map((opt) => (
                        <Button
                          key={opt}
                          variant={formData.setupOption === opt ? 'secondary' : 'outline'}
                          className={`flex-1 text-xs ${formData.setupOption === opt ? 'border-primary bg-primary/10 text-primary' : ''}`}
                          onClick={() => updateFormData({ setupOption: opt as any })}
                        >
                          {opt.charAt(0) + opt.slice(1).toLowerCase()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Section 3: Targeting & Validity */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span>
                Targeting & Validity
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label>Rule Scope</Label>
                  <div className="flex flex-wrap gap-2">
                    {['SITEWIDE', 'CATEGORY', 'PRODUCT', 'CUSTOMER_GROUP'].map((s) => (
                      <Button
                        key={s}
                        variant={formData.scope === s ? 'secondary' : 'outline'}
                        size="sm"
                        onClick={() => updateFormData({ scope: s as DiscountScope })}
                        className={formData.scope === s ? 'border-primary bg-primary/10 text-primary' : ''}
                      >
                        {s.replace('_', ' ').charAt(0) + s.replace('_', ' ').slice(1).toLowerCase()}
                      </Button>
                    ))}
                  </div>
                  
                  {formData.scope === 'CUSTOMER_GROUP' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-2"
                    >
                      <Label className="text-xs text-muted-foreground mb-1.5 block">Select Customer Groups</Label>
                      <Input 
                        placeholder="Search and select customer groups..." 
                        className="bg-slate-50 border-dashed"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="space-y-4">
                  <Label>Validity Period</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="date" 
                      value={formData.startDate} 
                      onChange={e => updateFormData({ startDate: e.target.value })}
                    />
                    <Input 
                      type="date" 
                      value={formData.endDate} 
                      onChange={e => updateFormData({ endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Summary Panel */}
      <div className="w-full lg:w-96 sticky top-8 space-y-6">
        <Card className="border-none shadow-xl bg-slate-800 text-white overflow-hidden">
          <div className="bg-primary h-2 w-full" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Rule Summary
            </CardTitle>
            <CardDescription className="text-slate-400">Live preview of your configuration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Rule Formula</p>
              <p className="text-2xl font-black tracking-tight text-white leading-tight">
                {generateRuleString()}
              </p>
            </div>

            <Separator className="bg-slate-700" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Type</span>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-none">
                  {formData.type === 'PRODUCT' ? 'Product' : 'Order'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Scope</span>
                <span className="text-xs font-bold uppercase tracking-wider">{formData.scope?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Status</span>
                <Badge className="bg-green-500/20 text-green-400 border-none text-[10px]">ACTIVE</Badge>
              </div>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Target className="w-4 h-4 text-primary" />
                Targeting Details
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Applying to <span className="text-white font-bold">{formData.scope?.toLowerCase()}</span>. 
                Valid from <span className="text-white font-bold">{formData.startDate}</span> to <span className="text-white font-bold">{formData.endDate}</span>.
              </p>
            </div>

            {(!formData.name) && (
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-[10px]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Please provide a rule name before saving.
              </div>
            )}
          </CardContent>
          <div className="p-6 bg-slate-700/30 border-t border-slate-700 flex flex-col gap-3">
            <Button 
              className="w-full h-12 text-md font-bold shadow-lg shadow-primary/20" 
              disabled={!formData.name}
              onClick={() => onSave(formData)}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Discount Rule
            </Button>
            <Button variant="ghost" className="w-full text-slate-400 hover:text-white" onClick={onCancel}>
              Cancel & Discard
            </Button>
          </div>
        </Card>

        <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Info className="w-4 h-4" />
            Quick Tips
          </div>
          <ul className="text-[10px] text-slate-400 space-y-2 list-disc pl-4">
            <li>EQP rules are End Quantity Pricing based.</li>
            <li>Half MOQ applies 50% reduction to minimums.</li>
            <li>Custom Groups apply directly to product pages.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
