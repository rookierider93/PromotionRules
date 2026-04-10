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
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscountTable } from './components/DiscountTable';
import { DiscountWizard } from './components/DiscountWizard';
import { MOCK_RULES } from './mockData';
import { DiscountRule } from './types/discount';

export default function App() {
  const [rules, setRules] = React.useState<DiscountRule[]>(MOCK_RULES);
  const [isWizardOpen, setIsWizardOpen] = React.useState(false);
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
    setIsWizardOpen(false);
    setEditingRule(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="h-16 border-bottom bg-white flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-1.5 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Discount Engine <span className="text-primary">Pro</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              className="bg-slate-100 border-none rounded-full pl-9 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Quick search..."
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/seed/user/32/32" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-right bg-white hidden lg:flex flex-col p-4 gap-2">
          <Button variant="ghost" className="justify-start gap-3 bg-slate-100 text-primary font-semibold">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-3 text-slate-600">
            <Plus className="w-5 h-5" />
            Create Rule
          </Button>
          <div className="mt-auto p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Need Help?</p>
            <p className="text-xs text-slate-600 mb-3">Learn how to combine promotion rules with custom groups.</p>
            <Button variant="outline" size="sm" className="w-full text-xs gap-2">
              <HelpCircle className="w-3 h-3" />
              Documentation
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {isWizardOpen ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="ghost" onClick={() => setIsWizardOpen(false)}>
                    <Menu className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </div>
                <DiscountWizard 
                  onSave={handleSaveRule} 
                  onCancel={() => setIsWizardOpen(false)} 
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
                  <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => setIsWizardOpen(true)}>
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

                {/* Main Tabs */}
                <Tabs defaultValue="all" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-white border shadow-sm">
                      <TabsTrigger value="all">All Rules</TabsTrigger>
                      <TabsTrigger value="promotions">Promotions</TabsTrigger>
                      <TabsTrigger value="groups">Custom Groups</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="mt-0">
                    <DiscountTable 
                      rules={rules} 
                      onAddRule={() => setIsWizardOpen(true)} 
                      onEditRule={(r) => {
                        setEditingRule(r);
                        setIsWizardOpen(true);
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="promotions" className="mt-0">
                    <DiscountTable 
                      rules={rules.filter(r => r.type === 'PROMOTION')} 
                      onAddRule={() => setIsWizardOpen(true)} 
                      onEditRule={(r) => {
                        setEditingRule(r);
                        setIsWizardOpen(true);
                      }}
                    />
                  </TabsContent>
                  <TabsContent value="groups" className="mt-0">
                    <DiscountTable 
                      rules={rules.filter(r => r.type === 'CUSTOM_GROUP')} 
                      onAddRule={() => setIsWizardOpen(true)} 
                      onEditRule={(r) => {
                        setEditingRule(r);
                        setIsWizardOpen(true);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

