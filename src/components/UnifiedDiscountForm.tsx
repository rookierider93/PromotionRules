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
  AlertCircle,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DiscountRule, DiscountScope } from '@/src/types/discount';

const SHIPPING_METHODS = [
  { label: 'UPS Ground', value: 'UPS-Ground#1ab20e81-97c8-464e-81be-15170c9e5ae5' },
  { label: 'FedEx Ground', value: 'FedEx-Ground#ebd983c4-cdae-44b5-8c0c-b6bd83957c1c' },
  { label: 'UPS 3 Day Select', value: 'UPS-3-Day-Select#6ec326f6-1d99-4c5b-b674-eb5c0d3e41c5' },
  { label: 'UPS 2nd Day Air', value: 'UPS-2nd-Day-Air#e632d2a0-7f16-404c-a550-4526caba8895' },
  { label: 'UPS Next Day Air Saver', value: 'UPS-Next-Day-Air-Saver#a9409edd-92d1-4f96-8652-6db971dafd30' },
  { label: 'UPS Next Day Air Early AM', value: 'UPS-Next-Day-Air-Early-AM#c5a28b65-5229-4e75-8721-0e1873dc4dab' },
  { label: 'UPS Next Day Air', value: 'UPS-Next-Day-Air#be9940ec-9491-45d8-9d48-c118fe8d0afb' },
  { label: 'FIRST OVERNIGHT', value: 'FIRST-OVERNIGHT#1a78b843-fed2-415f-9c71-6d895adcfbb1' },
  { label: 'PRIORITY OVERNIGHT', value: 'PRIORITY-OVERNIGHT#056d676d-fbfa-4559-b8b8-a822df6aaf7f' },
  { label: 'STANDARD OVERNIGHT', value: 'STANDARD-OVERNIGHT#8af4c637-02f4-407b-b1b0-c5cd2316c299' },
  { label: 'FEDEX 2 DAY AM', value: 'FEDEX-2-DAY-AM#5d255074-1399-4c5d-b2be-1a6866e75625' },
  { label: 'FEDEX 2 DAY', value: 'FEDEX-2-DAY#5650cf47-e405-45c4-b9ee-837017b3195e' },
  { label: 'FEDEX EXPRESS SAVER', value: 'FEDEX-EXPRESS-SAVER#96f45c59-1e2f-4f34-bdea-00f4d08b8e84' },
  { label: 'FedEx Ground®', value: 'FedEx-Ground®#a550fb9c-9eea-4b09-b480-99b03a2628e7' },
  { label: 'FedEx 2Day®', value: 'FedEx-2Day®#7a2ac0e5-8440-4685-a486-dded48b4bd8e' },
  { label: 'FedEx 2Day® A.M.', value: 'FedEx-2Day®-A.M.#18b540bd-1141-4e4e-881e-b3bc9b080c80' },
  { label: 'FedEx Express Saver®', value: 'FedEx-Express-Saver®#ac1755c6-a31a-4ad7-b720-4181242a903f' },
  { label: 'FedEx International Priority Express®', value: 'FedEx-International-Priority-Express®#e4b806b9-cf07-4710-bef1-547829a4b6d2' },
  { label: 'FedEx First Overnight®', value: 'FedEx-First-Overnight®#5ed30b9d-18f7-4bb3-92f5-cfcf802dad9c' },
  { label: 'FedEx Home Delivery®', value: 'FedEx-Home-Delivery®#9ab274be-e048-4ddc-8c18-c645679af39a' },
  { label: 'FedEx International Economy®', value: 'FedEx-International-Economy®#ede5c50d-7c11-4398-aa59-e15165a8893d' },
  { label: 'FedEx International Priority®', value: 'FedEx-International-Priority®#9ec63cbf-032f-4a5e-b12f-79570ef172bb' },
  { label: 'FedEx International Priority® Express', value: 'FedEx-International-Priority®-Express#8a8e8629-a756-4291-92d7-0a1399ac7027' },
  { label: 'FedEx Priority Overnight®', value: 'FedEx-Priority-Overnight®#3f35ef5e-a4ef-4282-8c93-accff1ad2067' },
  { label: 'FedEx Standard Overnight®', value: 'FedEx-Standard-Overnight®#bbd44575-e3d8-4ed7-9e7e-8fce2625ab3c' },
  { label: 'UPS Ground®', value: 'UPS-Ground®#081904e6-7ded-4f8c-99ad-f98f12dd81f1' },
  { label: 'UPS 2nd Day Air®', value: 'UPS-2nd-Day-Air®#c35a5a2e-6f91-4fd7-ad66-01e92199e25e' },
  { label: 'UPS 2nd Day Air A.M.®', value: 'UPS-2nd-Day-Air-A.M.®#da68b825-4da6-4c49-8305-e5499a849854' },
  { label: 'UPS 3 Day Select®', value: 'UPS-3-Day-Select®#da68b825-4da6-4c49-8305-e5499a849854' },
  { label: 'UPS Ground with Freight Pricing', value: 'UPS-Ground-with-Freight-Pricing#f60eb9c7-75d9-4a40-b9b9-d93062638bf0' },
  { label: 'UPS Next Day Air®', value: 'UPS-Next-Day-Air®#038079be-8ff2-4f2c-bf9a-70f9e0187d66' },
  { label: 'UPS Next Day Air Saver®', value: 'UPS-Next-Day-Air-Saver®#fb6bf978-8f0f-47b9-a044-f6d8198c8a1b' },
  { label: 'UPS Next Day Air® Early A.M.®', value: 'UPS-Next-Day-Air®-Early-A.M.®#1c509c44-1f70-4e0c-9d94-429bbd94885a' },
  { label: 'UPS Standard', value: 'UPS-Standard#1c509c44-1f70-4e0c-9d94-429bbd94885a' },
  { label: 'UPS SurePost®', value: 'UPS-SurePost®#96dd2a7f-3d43-4ce4-9cb6-f9a4016b5a5f' },
  { label: 'UPS SurePost® BPM', value: 'UPS-SurePost®-BPM#2466db65-9a02-494d-a2c6-8093dc84ecf0' },
  { label: 'UPS Worldwide Expedited®', value: 'UPS-Worldwide-Expedited®#65bec6b5-f272-48b8-841e-e632f3b49a75' },
  { label: 'UPS Worldwide Express®', value: 'UPS-Worldwide-Express®#049f27cb-98e7-49b4-a469-7d21a7ee1a14' },
  { label: 'UPS Worldwide Saver®', value: 'UPS-Worldwide-Saver®#eb126671-c34d-4010-ae00-e42c697ea200' },
  { label: 'First Class', value: 'First-Class#3833d435-4534-46c8-8a28-6848c9e3c222' },
  { label: 'Ground Advantage', value: 'Ground-Advantage#3684cb8a-1b9a-4f80-bc0f-6b407dc42b57' },
  { label: 'Priority Express', value: 'Priority-Express#6d9247f1-675b-4c6f-9721-a5c32b204292' },
  { label: 'Priority Mail', value: 'Priority-Mail#f97359d0-2145-4cf6-bffa-9bea729f5895' },
  { label: 'UPS Next Day Air Early', value: 'UPS-Next-Day-Air-Early#ffe54635-31e8-4b74-a039-27e6c47b54ce' },
  { label: 'UPS 2nd Day Air AM', value: 'UPS-2nd-Day-Air-AM#3237ad29-1a9f-4f1b-86fc-8d2b3e567c83' },
];

const MOCK_CATEGORIES = [
  { id: 'Select Category', name: 'Select Category' },
  { id: 'cat-1', name: 'Writing Instruments' },
  { id: 'cat-2', name: 'Office Supplies' },
  { id: 'cat-3', name: 'Electronics' },
];

const MOCK_PRODUCTS = [
  { id: 'prod-1', name: 'Premium Pen Set', categoryId: 'cat-1' },
  { id: 'prod-2', name: 'Executive Notebook', categoryId: 'cat-2' },
  { id: 'prod-3', name: 'Wireless Mouse', categoryId: 'cat-3' },
  { id: 'prod-4', name: 'Desk Organizer', categoryId: 'cat-2' },
  { id: 'prod-5', name: 'USB-C Hub', categoryId: 'cat-3' },
  { id: 'prod-6', name: 'HPR6207 - Crystalline Mirrored Malibu Sunglasses', categoryId: 'cat-2' },
];

interface UnifiedDiscountFormProps {
  initialData?: Partial<DiscountRule>;
  onSave: (rule: Partial<DiscountRule>) => void;
  onCancel: () => void;
}

export function UnifiedDiscountForm({ initialData, onSave, onCancel }: UnifiedDiscountFormProps) {
  const [isShippingMethodsOpen, setIsShippingMethodsOpen] = React.useState(false);
  const [productSearch, setProductSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Select Category');
  const [formData, setFormData] = React.useState<Partial<DiscountRule>>({
    isAutomatic: false,
    baseType: 'SHIPPING_DISCOUNT',
    eqpModifier: 'NONE',
    moqOption: 'NONE',
    setupOption: 'NONE',
    scope: 'SITEWIDE',
    status: 'ACTIVE',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[1] || '2026-12-31',
    value: 0,
    flatDiscountType: 'AMOUNT',
    tieredFlatDiscounts: [{ minOrderAmount: 0, discountAmount: 0 }],
    applyOnBasketPrice: false,
    isFreeProduct: false,
    freeProductIds: [],
    shippingDiscountType: 'FREE',
    shippingMethods: [],
    applyOnFirstTimeBuyer: false,
    promoCodeUseOneTime: false,
    applyOnItemPrice: false,
    applyOnItemPlusCharges: false,
    combinableWith: [],
    ...initialData
  });

  const updateFormData = (data: Partial<DiscountRule>) => {
    setFormData(prev => {
      const next = { ...prev, ...data };
      
      // If baseType changed, remove it from combinableWith if it was there
      if (data.baseType && next.combinableWith) {
        next.combinableWith = next.combinableWith.filter(t => t !== data.baseType);
      }
      
      return next;
    });
  };

  const generateRuleString = () => {
    let mainRule = '';
    
    if (formData.baseType === 'FLAT_DISCOUNT') {
      if (formData.isFreeProduct) {
        const productCount = formData.freeProductIds?.length || 0;
        mainRule = `Free Products (${productCount})${formData.minOrderAmount ? ` (Min $${formData.minOrderAmount})` : ''}`;
      } else if (formData.flatDiscountType === 'PERCENTAGE') {
        mainRule = `${formData.value || 0}% Flat Discount${formData.maxDiscountAmount ? ` (Max $${formData.maxDiscountAmount})` : ''}`;
      } else {
        const tiers = formData.tieredFlatDiscounts || [];
        if (tiers.length === 1) {
          mainRule = `$${tiers[0].discountAmount} Flat Discount${tiers[0].minOrderAmount ? ` (Min $${tiers[0].minOrderAmount})` : ''}`;
        } else {
          mainRule = `${tiers.length} Tiered Flat Discount`;
        }
      }
    } else if (formData.baseType === 'EQP') {
      let parts = ['EQP'];
      if (formData.eqpModifier !== 'NONE') parts[0] += ` - ${formData.eqpModifier}`;
      
      let addons = [];
      if (formData.moqOption !== 'NONE') addons.push(`${formData.moqOption === 'HALF' ? 'Half' : 'Full'} MOQ`);
      if (formData.setupOption !== 'NONE') addons.push(`${formData.setupOption === 'HALF' ? 'Half' : 'Full'} Setup Charge`);
      
      mainRule = parts.concat(addons).join(', ');
    } else if (formData.baseType === 'SHIPPING_DISCOUNT') {
      mainRule = 'Shipping Only';
    }

    // Append shipping details if configured
    if (formData.shippingDiscountType) {
      const type = formData.shippingDiscountType === 'FREE' ? 'Free Shipping' : 
                   formData.shippingDiscountType === 'PERCENTAGE' ? `${formData.value}% Off Shipping` :
                   `$${formData.value} Off Shipping`;
      
      const methods = formData.shippingMethods || [];
      const methodText = methods.length === 0 ? 'All Methods' : 
                         methods.length === SHIPPING_METHODS.length ? 'All Methods' :
                         methods.length === 1 ? SHIPPING_METHODS.find(m => m.value === methods[0])?.label :
                         `${methods.length} Methods`;

      // If it's the base type, we just use the details
      if (formData.baseType === 'SHIPPING_DISCOUNT') {
        mainRule = `${type} on ${methodText}${formData.minOrderAmount ? ` (Min $${formData.minOrderAmount})` : ''}`;
      } else {
        // Append if it's an add-on and user changed something from default
        if (formData.shippingDiscountType !== 'FREE' || (formData.minOrderAmount && formData.minOrderAmount > 0) || methods.length > 0) {
          mainRule += ` + ${type} on ${methodText}${formData.minOrderAmount ? ` (Min $${formData.minOrderAmount})` : ''}`;
        }
      }
    }

    return mainRule;
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
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g. Summer EQP Special" 
                    value={formData.name || ''} 
                    onChange={e => updateFormData({ name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Discount Method</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={!formData.isAutomatic ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => updateFormData({ isAutomatic: false })}
                    >
                      Discount Code
                    </Button>
                    <Button 
                      variant={formData.isAutomatic ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => updateFormData({ isAutomatic: true })}
                    >
                      Automatic Discount
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {!formData.isAutomatic && (
                    <div className="space-y-2">
                      <Label htmlFor="promoCode">Discount Code</Label>
                      <Input 
                        id="promoCode" 
                        placeholder="SUMMER2026" 
                        value={formData.promoCode || ''} 
                        onChange={e => updateFormData({ promoCode: e.target.value.toUpperCase() })}
                      />
                    </div>
                  )}
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
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant={formData.baseType === 'SHIPPING_DISCOUNT' ? 'default' : 'outline'}
                      className="flex-1 h-16 text-lg font-bold min-w-[140px]"
                      onClick={() => updateFormData({ baseType: 'SHIPPING_DISCOUNT' })}
                    >
                      No Product Discount
                    </Button>
                    <Button 
                      variant={formData.baseType === 'EQP' ? 'default' : 'outline'}
                      className="flex-1 h-16 text-lg font-bold min-w-[140px]"
                      onClick={() => updateFormData({ baseType: 'EQP' })}
                    >
                      EQP
                    </Button>
                    <Button 
                      variant={formData.baseType === 'FLAT_DISCOUNT' ? 'default' : 'outline'}
                      className="flex-1 h-16 text-lg font-bold min-w-[140px]"
                      onClick={() => updateFormData({ baseType: 'FLAT_DISCOUNT' })}
                    >
                     Flat Discount on Products
                    </Button>
                  </div>
                </div>

                {formData.baseType !== 'SHIPPING_DISCOUNT' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* MOQ Add-on */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="font-bold">MOQ Add-on</Label>
                        <Badge variant={formData.moqOption !== 'NONE' ? 'default' : 'outline'}>
                          {formData.moqOption !== 'NONE' ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['NONE', 'HALF', 'FULL'].map((opt) => (
                          <Button
                            key={opt}
                            variant={formData.moqOption === opt ? 'secondary' : 'outline'}
                            className={`flex-1 text-xs min-w-[80px] ${formData.moqOption === opt ? 'border-primary bg-primary/10 text-primary' : ''}`}
                            onClick={() => updateFormData({ moqOption: opt })}
                          >
                            {opt.charAt(0) + opt.slice(1).toLowerCase()}
                          </Button>
                        ))}
                        <div className="flex-1 min-w-[120px] relative">
                          <Input 
                            type="number"
                            placeholder="Custom %"
                            className={`pl-8 h-9 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!['NONE', 'HALF', 'FULL'].includes(formData.moqOption || 'NONE') ? 'border-primary ring-1 ring-primary' : 'bg-white'}`}
                            value={!['NONE', 'HALF', 'FULL'].includes(formData.moqOption || 'NONE') ? formData.moqOption?.replace('%', '') : ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') {
                                updateFormData({ moqOption: 'NONE' });
                              } else {
                                updateFormData({ moqOption: `${val}%` });
                              }
                            }}
                          />
                          <span className="absolute left-3 top-2 text-slate-400 font-bold">-</span>
                          <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                        </div>
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
                      <div className="flex flex-wrap gap-2">
                        {['NONE', 'HALF', 'FULL'].map((opt) => (
                          <Button
                            key={opt}
                            variant={formData.setupOption === opt ? 'secondary' : 'outline'}
                            className={`flex-1 text-xs min-w-[80px] ${formData.setupOption === opt ? 'border-primary bg-primary/10 text-primary' : ''}`}
                            onClick={() => updateFormData({ setupOption: opt })}
                          >
                            {opt.charAt(0) + opt.slice(1).toLowerCase()}
                          </Button>
                        ))}
                        <div className="flex-1 min-w-[120px] relative">
                          <Input 
                            type="number"
                            placeholder="Custom %"
                            className={`pl-8 h-9 text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!['NONE', 'HALF', 'FULL'].includes(formData.setupOption || 'NONE') ? 'border-primary ring-1 ring-primary' : 'bg-white'}`}
                            value={!['NONE', 'HALF', 'FULL'].includes(formData.setupOption || 'NONE') ? formData.setupOption?.replace('%', '') : ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === '') {
                                updateFormData({ setupOption: 'NONE' });
                              } else {
                                updateFormData({ setupOption: `${val}%` });
                              }
                            }}
                          />
                          <span className="absolute left-3 top-2 text-slate-400 font-bold">-</span>
                          <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formData.baseType === 'EQP' && (
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
                )}

                {formData.baseType === 'FLAT_DISCOUNT' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 p-6 bg-slate-50 rounded-xl border"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-bold uppercase text-slate-500">Flat Discount Configuration</Label>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="freeProduct" 
                            checked={formData.isFreeProduct}
                            onCheckedChange={(checked) => updateFormData({ isFreeProduct: !!checked })}
                          />
                          <Label htmlFor="freeProduct" className="text-xs font-bold cursor-pointer text-primary">Free Products</Label>
                        </div>
                        {!formData.isFreeProduct && (
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="basketPrice" 
                              checked={formData.applyOnBasketPrice}
                              onCheckedChange={(checked) => updateFormData({ applyOnBasketPrice: !!checked })}
                            />
                            <Label htmlFor="basketPrice" className="text-xs font-medium cursor-pointer">Apply On Basket Price</Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.isFreeProduct ? (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500">Minimum Order Amount ($)</Label>
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="bg-white"
                              value={formData.minOrderAmount || ''} 
                              onChange={e => updateFormData({ minOrderAmount: parseFloat(e.target.value) || 0 })}
                            />
                          </div>
                          <div className="flex items-end pb-2">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="basketPriceFree" 
                                checked={formData.applyOnBasketPrice}
                                onCheckedChange={(checked) => updateFormData({ applyOnBasketPrice: !!checked })}
                              />
                              <Label htmlFor="basketPriceFree" className="text-xs font-medium cursor-pointer">Apply On Basket Price</Label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-xs font-bold text-slate-500">Select Free Product</Label>
                          
                          <div className="flex gap-12 items-end">
                            <div className="w-1/3">
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="bg-transparent border-0 border-b border-slate-200 rounded-none focus:ring-0 px-0 h-10 text-slate-600 shadow-none hover:border-slate-400 transition-colors">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {MOCK_CATEGORIES.map(cat => (
                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex-1 relative group">
                              <div className="absolute left-0 bottom-[11px] flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                              </div>
                              <Input 
                                className="bg-transparent border-0 border-b border-slate-200 rounded-none focus-visible:ring-0 pl-14 px-0 h-10 w-full placeholder:text-slate-400 hover:border-slate-400 transition-colors"
                                value={productSearch}
                                onChange={(e) => setProductSearch(e.target.value)}
                              />
                              
                              {/* Search Results Dropdown (Simplified for Demo) */}
                              {productSearch && (
                                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-auto">
                                  {MOCK_PRODUCTS
                                    .filter(p => 
                                      (selectedCategory === 'Select Category' || p.categoryId === selectedCategory) &&
                                      p.name.toLowerCase().includes(productSearch.toLowerCase())
                                    )
                                    .map(product => (
                                      <button
                                        key={product.id}
                                        className="w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition-colors"
                                        onClick={() => {
                                          const current = formData.freeProductIds || [];
                                          if (!current.includes(product.id)) {
                                            updateFormData({ freeProductIds: [...current, product.id] });
                                          }
                                          setProductSearch('');
                                        }}
                                      >
                                        {product.name}
                                      </button>
                                    ))
                                  }
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-4 space-y-2">
                            {formData.freeProductIds?.map(id => {
                              const product = MOCK_PRODUCTS.find(p => p.id === id);
                              if (!product) return null;
                              return (
                                <div key={id} className="inline-flex items-center gap-2 px-3 py-2 border bg-white rounded-sm text-xs font-medium mr-2 mb-2">
                                  {product.name}
                                  <button 
                                    onClick={() => {
                                      const current = formData.freeProductIds || [];
                                      updateFormData({ freeProductIds: current.filter(pid => pid !== id) });
                                    }}
                                    className="text-primary hover:text-primary/80"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-slate-500">Apply Discount As</Label>
                          <div className="flex gap-2">
                            <Button 
                              variant={formData.flatDiscountType === 'AMOUNT' ? 'default' : 'outline'}
                              size="sm"
                              className="flex-1"
                              onClick={() => updateFormData({ flatDiscountType: 'AMOUNT' })}
                            >
                              Amount ($)
                            </Button>
                            <Button 
                              variant={formData.flatDiscountType === 'PERCENTAGE' ? 'default' : 'outline'}
                              size="sm"
                              className="flex-1"
                              onClick={() => updateFormData({ flatDiscountType: 'PERCENTAGE' })}
                            >
                              Percentage (%)
                            </Button>
                          </div>
                        </div>

                        {formData.flatDiscountType === 'PERCENTAGE' ? (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-500">Percentage (%)</Label>
                              <Input 
                                type="number" 
                                placeholder="0" 
                                className="bg-white"
                                value={formData.value || ''} 
                                onChange={e => updateFormData({ value: parseFloat(e.target.value) || 0 })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-bold text-slate-500">Max Discount Amount ($)</Label>
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                className="bg-white"
                                value={formData.maxDiscountAmount || ''} 
                                onChange={e => updateFormData({ maxDiscountAmount: parseFloat(e.target.value) || 0 })}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {formData.tieredFlatDiscounts?.map((tier, index) => (
                              <div key={index} className="flex items-end gap-3">
                                <div className="flex-1 space-y-2">
                                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Min Order Amount ($)</Label>
                                  <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="bg-white"
                                    value={tier.minOrderAmount} 
                                    onChange={e => {
                                      const newTiers = [...(formData.tieredFlatDiscounts || [])];
                                      newTiers[index] = { ...newTiers[index], minOrderAmount: parseFloat(e.target.value) || 0 };
                                      updateFormData({ tieredFlatDiscounts: newTiers });
                                    }}
                                  />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <Label className="text-[10px] font-bold text-slate-400 uppercase">Discount Amount ($)</Label>
                                  <Input 
                                    type="number" 
                                    placeholder="0.00" 
                                    className="bg-white"
                                    value={tier.discountAmount} 
                                    onChange={e => {
                                      const newTiers = [...(formData.tieredFlatDiscounts || [])];
                                      newTiers[index] = { ...newTiers[index], discountAmount: parseFloat(e.target.value) || 0 };
                                      updateFormData({ tieredFlatDiscounts: newTiers });
                                    }}
                                  />
                                </div>
                                {index > 0 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                      const newTiers = formData.tieredFlatDiscounts?.filter((_, i) => i !== index);
                                      updateFormData({ tieredFlatDiscounts: newTiers });
                                    }}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full border-dashed border-2 hover:bg-slate-100"
                              onClick={() => {
                                updateFormData({ 
                                  tieredFlatDiscounts: [
                                    ...(formData.tieredFlatDiscounts || []), 
                                    { minOrderAmount: 0, discountAmount: 0 }
                                  ] 
                                });
                              }}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Tier
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <Separator />

            {/* Section 3: Shipping Discount Configuration */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span>
                Shipping Discount Configuration
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500">Minimum Order Amount ($)</Label>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-white"
                      value={formData.minOrderAmount || ''} 
                      onChange={e => updateFormData({ minOrderAmount: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-500">Shipping Methods</Label>
                    <div className="border rounded-md bg-white overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => setIsShippingMethodsOpen(!isShippingMethodsOpen)}
                        className="w-full p-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {formData.shippingMethods?.length === 0 ? 'All Shipping Methods' : 
                             formData.shippingMethods?.length === SHIPPING_METHODS.length ? 'All Shipping Methods' :
                             `${formData.shippingMethods?.length} Methods Selected`}
                          </span>
                          {formData.shippingMethods && formData.shippingMethods.length > 0 && formData.shippingMethods.length < SHIPPING_METHODS.length && (
                            <span className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {formData.shippingMethods.map(v => SHIPPING_METHODS.find(m => m.value === v)?.label).join(', ')}
                            </span>
                          )}
                        </div>
                        {isShippingMethodsOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isShippingMethodsOpen ? 'auto' : 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 border-t bg-slate-50 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="selectAllShipping"
                              checked={formData.shippingMethods?.length === SHIPPING_METHODS.length}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  updateFormData({ shippingMethods: SHIPPING_METHODS.map(m => m.value) });
                                } else {
                                  updateFormData({ shippingMethods: [] });
                                }
                              }}
                            />
                            <Label htmlFor="selectAllShipping" className="text-xs font-bold cursor-pointer">Select All</Label>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {formData.shippingMethods?.length || 0} selected
                          </span>
                        </div>
                        <ScrollArea className="h-[200px]">
                          <div className="p-2 space-y-1">
                            {SHIPPING_METHODS.map((method) => (
                              <div key={method.value} className="flex items-center space-x-2 hover:bg-slate-50 p-1 rounded transition-colors">
                                <Checkbox 
                                  id={`method-${method.value}`}
                                  checked={formData.shippingMethods?.includes(method.value)}
                                  onCheckedChange={(checked) => {
                                    const current = formData.shippingMethods || [];
                                    if (checked) {
                                      updateFormData({ shippingMethods: [...current, method.value] });
                                    } else {
                                      updateFormData({ shippingMethods: current.filter(v => v !== method.value) });
                                    }
                                  }}
                                />
                                <Label htmlFor={`method-${method.value}`} className="text-xs cursor-pointer flex-1 py-1">
                                  {method.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500">Discount Type</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={formData.shippingDiscountType === 'FREE' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateFormData({ shippingDiscountType: 'FREE', value: 0 })}
                    >
                      Free Shipping
                    </Button>
                    <Button 
                      variant={formData.shippingDiscountType === 'AMOUNT' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateFormData({ shippingDiscountType: 'AMOUNT' })}
                    >
                      Amount ($)
                    </Button>
                    <Button 
                      variant={formData.shippingDiscountType === 'PERCENTAGE' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => updateFormData({ shippingDiscountType: 'PERCENTAGE' })}
                    >
                      Percentage (%)
                    </Button>
                  </div>
                </div>

                {formData.shippingDiscountType !== 'FREE' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2"
                  >
                    <Label className="text-xs font-bold text-slate-500">
                      {formData.shippingDiscountType === 'AMOUNT' ? 'Discount Amount ($)' : 'Discount Percentage (%)'}
                    </Label>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-white text-xl font-bold h-12"
                      value={formData.value || ''} 
                      onChange={e => updateFormData({ value: parseFloat(e.target.value) || 0 })}
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <Separator />

            {/* Section 4: Targeting & Validity */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">4</span>
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

              <Separator className="opacity-50" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                  <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Is Active</Label>
                  <Switch 
                    id="isActive"
                    checked={formData.status === 'ACTIVE'}
                    onCheckedChange={(checked) => updateFormData({ status: checked ? 'ACTIVE' : 'INACTIVE' })}
                    className="data-checked:bg-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                  <Label htmlFor="firstTimeBuyer" className="text-sm font-medium cursor-pointer">Apply On First-Time Buyer</Label>
                  <Switch 
                    id="firstTimeBuyer" 
                    checked={formData.applyOnFirstTimeBuyer}
                    onCheckedChange={(checked) => updateFormData({ applyOnFirstTimeBuyer: !!checked })}
                    className="data-checked:bg-emerald-500"
                  />
                </div>

                {!formData.isAutomatic && (
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                    <Label htmlFor="oneTimeUse" className="text-sm font-medium cursor-pointer">PromoCode Use One Time</Label>
                    <Switch 
                      id="oneTimeUse" 
                      checked={formData.promoCodeUseOneTime}
                      onCheckedChange={(checked) => updateFormData({ promoCodeUseOneTime: !!checked })}
                      className="data-checked:bg-emerald-500"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                  <Label htmlFor="itemPrice" className="text-sm font-medium cursor-pointer">Apply On Item Price</Label>
                  <Switch 
                    id="itemPrice" 
                    checked={formData.applyOnItemPrice}
                    onCheckedChange={(checked) => updateFormData({ applyOnItemPrice: !!checked })}
                    className="data-checked:bg-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border">
                  <Label htmlFor="itemPlusCharges" className="text-sm font-medium cursor-pointer">Apply On Item + Charges</Label>
                  <Switch 
                    id="itemPlusCharges" 
                    checked={formData.applyOnItemPlusCharges}
                    onCheckedChange={(checked) => updateFormData({ applyOnItemPlusCharges: !!checked })}
                    className="data-checked:bg-emerald-500"
                  />
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
                <span className="text-xs text-slate-400">Method</span>
                <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-none">
                  {formData.isAutomatic ? 'Automatic' : 'Code'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Scope</span>
                <span className="text-xs font-bold uppercase tracking-wider">{formData.scope?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Status</span>
                <Badge className={`${formData.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'} border-none text-[10px]`}>
                  {formData.status}
                </Badge>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs text-slate-400">Combinable With</span>
                <div className="flex flex-col items-end gap-1">
                  {formData.combinableWith && formData.combinableWith.length > 0 ? (
                    formData.combinableWith.map(t => (
                      <Badge key={t} variant="outline" className="text-[9px] border-slate-600 text-slate-300 px-1 py-0">
                        {t.replace('_', ' ')}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-500 italic">None</span>
                  )}
                </div>
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
