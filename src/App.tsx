/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  Settings, 
  HelpCircle, 
  Bell,
  Search,
  Menu,
  Info,
  Store,
  ChevronDown,
  BarChart3,
  Package,
  Users,
  Zap,
  User,
  SlidersHorizontal,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscountTable } from './components/DiscountTable';
import { UnifiedDiscountForm } from './components/UnifiedDiscountForm';
import { MOCK_RULES } from './mockData';
import { DiscountRule } from './types/discount';

export default function App() {
  const [rules, setRules] = React.useState<DiscountRule[]>(MOCK_RULES);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingRule, setEditingRule] = React.useState<DiscountRule | null>(null);

  const handleSaveRule = (ruleData: Partial<DiscountRule>) => {
    if (editingRule) {
      setRules(prev => prev.map(r => r.id === editingRule.id ? { ...r, ...ruleData } as DiscountRule : r));
    } else {
      const newRule: DiscountRule = {
        ...ruleData,
        id: Math.random().toString(36).substr(2, 9),
        status: 'ACTIVE',
      } as DiscountRule;
      setRules(prev => [newRule, ...prev]);
    }
    setIsFormOpen(false);
    setEditingRule(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      {/* Top Navigation Bar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium text-slate-700 flex items-center gap-2">
            Discount Management
            <Info className="w-4 h-4 text-slate-400 cursor-help" />
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-50 border rounded-md px-3 py-1.5">
            <span className="text-xs font-medium text-slate-600">Take a tour</span>
            <div className="w-8 h-4 bg-slate-200 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-2 h-2 bg-slate-400 rounded-full" />
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="text-slate-600">
            <Store className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm font-medium text-slate-700">Hi, RohanBait</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Narrow style from screenshot */}
        <aside className="w-16 border-r bg-white flex flex-col items-center py-6 gap-6">
          <div className="mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Menu className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <BarChart3 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Package className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Users className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Zap className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary bg-primary/5">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Package className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary">
              <Globe className="w-5 h-5" />
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {isFormOpen ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                      {editingRule ? 'Edit Discount Rule' : 'Create New Discount Rule'}
                    </h2>
                    <p className="text-slate-500 mt-1">Configure your dynamic EQP or Flat discount logic below.</p>
                  </div>
                  <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
                    <Menu className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
                <UnifiedDiscountForm 
                  initialData={editingRule || undefined}
                  onSave={handleSaveRule} 
                  onCancel={() => {
                    setIsFormOpen(false);
                    setEditingRule(null);
                  }} 
                />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Discount Management</h2>
                    <p className="text-slate-500 mt-1">Manage all your promotion codes and customer-specific discounts in one unified system.</p>
                  </div>
                  <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => setIsFormOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    New Rule
                  </Button>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardDescription>Active Rules</CardDescription>
                      <CardTitle className="text-3xl font-bold">{rules.filter(r => r.status === 'ACTIVE').length}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                        +2 from last month
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardDescription>Promo Codes Used</CardDescription>
                      <CardTitle className="text-3xl font-bold">1,284</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        15% conversion rate
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardDescription>Total Discount Given</CardDescription>
                      <CardTitle className="text-3xl font-bold">$12,450</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-slate-500 font-medium">
                        Across all active campaigns
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Area */}
                <div className="mt-4">
                  <DiscountTable 
                    rules={rules} 
                    onAddRule={() => setIsFormOpen(true)} 
                    onEditRule={(r) => {
                      setEditingRule(r);
                      setIsFormOpen(true);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

