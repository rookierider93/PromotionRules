import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  CheckCircle2, 
  Tag, 
  Users, 
  Settings, 
  Target,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DiscountRule, DiscountType, DiscountLogic, DiscountScope } from '@/src/types/discount';

interface DiscountWizardProps {
  onSave: (rule: Partial<DiscountRule>) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 'type', title: 'Rule Type', icon: Settings },
  { id: 'logic', title: 'Discount Logic', icon: Tag },
  { id: 'targeting', title: 'Targeting', icon: Target },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
];

export function DiscountWizard({ onSave, onCancel }: DiscountWizardProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<Partial<DiscountRule>>({
    type: 'PROMOTION',
    logic: 'PERCENTAGE',
    scope: 'SITEWIDE',
    status: 'ACTIVE',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    targetIds: [],
    customerIds: [],
  });

  const updateFormData = (data: Partial<DiscountRule>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all border-2 ${formData.type === 'PROMOTION' ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                onClick={() => updateFormData({ type: 'PROMOTION' })}
              >
                <CardHeader className="pb-2">
                  <Tag className={`w-8 h-8 mb-2 ${formData.type === 'PROMOTION' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle className="text-lg">Promotion Rule</CardTitle>
                  <CardDescription>Discount codes for checkout or automatic order-level discounts.</CardDescription>
                </CardHeader>
              </Card>
              <Card 
                className={`cursor-pointer transition-all border-2 ${formData.type === 'CUSTOM_GROUP' ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                onClick={() => updateFormData({ type: 'CUSTOM_GROUP' })}
              >
                <CardHeader className="pb-2">
                  <Users className={`w-8 h-8 mb-2 ${formData.type === 'CUSTOM_GROUP' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <CardTitle className="text-lg">Custom Group</CardTitle>
                  <CardDescription>Specific discounts applied directly to products for selected customers.</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. Summer Sale 2026" 
                  value={formData.name || ''} 
                  onChange={e => updateFormData({ name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  placeholder="Briefly describe the purpose of this rule" 
                  value={formData.description || ''} 
                  onChange={e => updateFormData({ description: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        const isEQP = formData.logic === 'EQP';
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Base Discount Logic</Label>
                <Select 
                  value={formData.logic} 
                  onValueChange={(v: DiscountLogic) => updateFormData({ logic: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select logic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                    <SelectItem value="FLAT_AMOUNT">Flat Amount ($)</SelectItem>
                    <SelectItem value="EQP">EQP (End Quantity Pricing)</SelectItem>
                    <SelectItem value="NQP">NQP (Next Quantity Pricing)</SelectItem>
                    <SelectItem value="SHIPPING_PERCENTAGE">Shipping Discount (%)</SelectItem>
                    <SelectItem value="SHIPPING_FLAT">Flat Shipping ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isEQP && (
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    value={formData.value || ''} 
                    onChange={e => updateFormData({ value: parseFloat(e.target.value) })}
                  />
                </div>
              )}
            </div>

            {isEQP && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-2 border-dashed rounded-xl bg-primary/5 space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">EQP Dynamic Rule Maker</h4>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">1. Select Modifier</Label>
                  <div className="flex gap-3">
                    {[
                      { id: 'NONE', label: 'Standard EQP' },
                      { id: 'MINUS_3', label: 'EQP - 3%' },
                      { id: 'MINUS_5', label: 'EQP - 5%' }
                    ].map((m) => (
                      <Button
                        key={m.id}
                        type="button"
                        variant={formData.eqpModifier === m.id ? 'default' : 'outline'}
                        className="flex-1 h-12"
                        onClick={() => updateFormData({ eqpModifier: m.id as any })}
                      >
                        {m.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase">2. Add-ons (Multiple allowed)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Card 
                      className={`cursor-pointer transition-all border-2 flex items-center p-4 gap-3 ${formData.isHalfMOQ ? 'border-primary bg-primary/10' : 'border-transparent'}`}
                      onClick={() => updateFormData({ isHalfMOQ: !formData.isHalfMOQ })}
                    >
                      <Checkbox checked={formData.isHalfMOQ} />
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold">Half MOQ</p>
                        <p className="text-[10px] text-muted-foreground">Apply half minimum order quantity</p>
                      </div>
                    </Card>
                    <Card 
                      className={`cursor-pointer transition-all border-2 flex items-center p-4 gap-3 ${formData.isHalfSetupCharge ? 'border-primary bg-primary/10' : 'border-transparent'}`}
                      onClick={() => updateFormData({ isHalfSetupCharge: !formData.isHalfSetupCharge })}
                    >
                      <Checkbox checked={formData.isHalfSetupCharge} />
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold">Half Setup Charge</p>
                        <p className="text-[10px] text-muted-foreground">Reduce setup fees by 50%</p>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="bg-white p-3 rounded-lg border shadow-sm flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground">Generated Rule:</span>
                    <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                      EQP
                      {formData.eqpModifier === 'MINUS_3' && ' - 3%'}
                      {formData.eqpModifier === 'MINUS_5' && ' - 5%'}
                      {formData.isHalfMOQ && ', Half MOQ'}
                      {formData.isHalfSetupCharge && ', Half Setup Charge'}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}

            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Minimum Order Amount</Label>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  value={formData.minOrderAmount || ''} 
                  onChange={e => updateFormData({ minOrderAmount: parseFloat(e.target.value) })}
                />
              </div>
              {formData.type === 'PROMOTION' && (
                <div className="space-y-2">
                  <Label>Promo Code</Label>
                  <Input 
                    placeholder="e.g. SAVE20" 
                    value={formData.promoCode || ''} 
                    onChange={e => updateFormData({ promoCode: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="first-time" 
                  checked={formData.isFirstTimeBuyerOnly} 
                  onCheckedChange={v => updateFormData({ isFirstTimeBuyerOnly: !!v })}
                />
                <Label htmlFor="first-time">First-Time Buyer Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="one-time" 
                  checked={formData.isOneTimeUseOnly} 
                  onCheckedChange={v => updateFormData({ isOneTimeUseOnly: !!v })}
                />
                <Label htmlFor="one-time">One-Time Use Only</Label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Rule Scope</Label>
              <div className="flex gap-4">
                {['SITEWIDE', 'CATEGORY', 'PRODUCT'].map((s) => (
                  <Button
                    key={s}
                    variant={formData.scope === s ? 'default' : 'outline'}
                    onClick={() => updateFormData({ scope: s as DiscountScope })}
                    className="flex-1"
                  >
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </Button>
                ))}
              </div>
            </div>

            {formData.scope !== 'SITEWIDE' && (
              <div className="space-y-2">
                <Label>{formData.scope === 'CATEGORY' ? 'Select Categories' : 'Select Products'}</Label>
                <div className="border rounded-md p-4 min-h-[100px] bg-muted/20 flex flex-wrap gap-2">
                   <Badge variant="secondary" className="px-3 py-1">
                     {formData.scope === 'CATEGORY' ? 'Apparel' : 'Product #123'}
                   </Badge>
                   <Button variant="ghost" size="sm" className="text-xs">+ Add {formData.scope === 'CATEGORY' ? 'Category' : 'Product'}</Button>
                </div>
              </div>
            )}

            {formData.type === 'CUSTOM_GROUP' && (
              <div className="space-y-2">
                <Label>Target Customers</Label>
                <div className="border rounded-md p-4 min-h-[100px] bg-muted/20 flex flex-wrap gap-2">
                   <Badge variant="outline" className="px-3 py-1">Komal Singh</Badge>
                   <Badge variant="outline" className="px-3 py-1">Mohanishttsdf Patil</Badge>
                   <Button variant="ghost" size="sm" className="text-xs">+ Add Customer</Button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input 
                  type="date" 
                  value={formData.startDate} 
                  onChange={e => updateFormData({ startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input 
                  type="date" 
                  value={formData.endDate} 
                  onChange={e => updateFormData({ endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2">{formData.type === 'PROMOTION' ? 'Promotion' : 'Custom Group'}</Badge>
                  <h3 className="text-2xl font-bold">{formData.name || 'Untitled Rule'}</h3>
                  <p className="text-muted-foreground">{formData.description || 'No description provided.'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Discount</p>
                  <p className="text-3xl font-bold text-primary">
                    {formData.logic?.includes('PERCENTAGE') ? `${formData.value}%` : `$${formData.value}`}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Logic</p>
                  <p className="font-medium">
                    {formData.logic === 'EQP' ? (
                      <span className="flex items-center gap-1">
                        EQP
                        {formData.eqpModifier === 'MINUS_3' && ' - 3%'}
                        {formData.eqpModifier === 'MINUS_5' && ' - 5%'}
                        {formData.isHalfMOQ && ', Half MOQ'}
                        {formData.isHalfSetupCharge && ', Half Setup Charge'}
                      </span>
                    ) : formData.logic}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Scope</p>
                  <p className="font-medium">{formData.scope}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Validity</p>
                  <p className="font-medium">{formData.startDate} to {formData.endDate}</p>
                </div>
                {formData.promoCode && (
                  <div>
                    <p className="text-muted-foreground">Promo Code</p>
                    <p className="font-mono font-bold text-primary">{formData.promoCode}</p>
                  </div>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-md flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold">Rule Summary</p>
                  <p>
                    This {formData.type?.toLowerCase()} will apply a {formData.value}{formData.logic?.includes('PERCENTAGE') ? '%' : '$'} discount 
                    {formData.scope === 'SITEWIDE' ? ' sitewide' : ` to selected ${formData.scope.toLowerCase()}s`}.
                    {formData.minOrderAmount ? ` Requires a minimum order of $${formData.minOrderAmount}.` : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                  idx <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'border-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${idx < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <Badge variant="outline" className="px-3 py-1">
            Step {currentStep + 1} of {STEPS.length}
          </Badge>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          {STEPS[currentStep].title}
        </CardTitle>
        <CardDescription>
          {currentStep === 0 && "Choose the type of discount rule you want to create."}
          {currentStep === 1 && "Define how the discount is calculated and its constraints."}
          {currentStep === 2 && "Select which products, categories, or customers this rule applies to."}
          {currentStep === 3 && "Review the rule configuration before saving."}
        </CardDescription>
      </CardHeader>

      <CardContent className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="ghost" onClick={currentStep === 0 ? onCancel : prevStep}>
          {currentStep === 0 ? 'Cancel' : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </>
          )}
        </Button>
        <Button onClick={currentStep === STEPS.length - 1 ? () => onSave(formData) : nextStep}>
          {currentStep === STEPS.length - 1 ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Rule
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
