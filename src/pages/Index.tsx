import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  category: 'streaming' | 'software' | 'education' | 'other';
  nextPayment: Date;
  period: 'month' | 'year';
}

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    cost: 999,
    currency: 'RUB',
    category: 'streaming',
    nextPayment: new Date(2026, 1, 3),
    period: 'month',
  },
  {
    id: '2',
    name: 'Spotify',
    cost: 299,
    currency: 'RUB',
    category: 'streaming',
    nextPayment: new Date(2026, 1, 5),
    period: 'month',
  },
  {
    id: '3',
    name: 'Adobe Creative Cloud',
    cost: 2999,
    currency: 'RUB',
    category: 'software',
    nextPayment: new Date(2026, 1, 15),
    period: 'month',
  },
  {
    id: '4',
    name: 'Coursera',
    cost: 49,
    currency: 'USD',
    category: 'education',
    nextPayment: new Date(2026, 2, 1),
    period: 'year',
  },
];

const categoryIcons = {
  streaming: 'Tv',
  software: 'Code2',
  education: 'GraduationCap',
  other: 'Package',
};

const categoryColors = {
  streaming: 'gradient-purple-pink',
  software: 'gradient-blue-purple',
  education: 'gradient-orange-pink',
  other: 'bg-muted',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const calculateTotalMonthly = () => {
    return mockSubscriptions.reduce((sum, sub) => {
      const monthlyCost = sub.period === 'year' ? sub.cost / 12 : sub.cost;
      return sum + (sub.currency === 'RUB' ? monthlyCost : monthlyCost * 90);
    }, 0);
  };

  const calculateTotalYearly = () => {
    return mockSubscriptions.reduce((sum, sub) => {
      const yearlyCost = sub.period === 'month' ? sub.cost * 12 : sub.cost;
      return sum + (sub.currency === 'RUB' ? yearlyCost : yearlyCost * 90);
    }, 0);
  };

  const getDaysUntilPayment = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPaymentStatus = (days: number) => {
    if (days <= 2) return 'urgent';
    if (days <= 7) return 'soon';
    return 'ok';
  };

  const groupByCategory = () => {
    return mockSubscriptions.reduce((acc, sub) => {
      if (!acc[sub.category]) acc[sub.category] = [];
      acc[sub.category].push(sub);
      return acc;
    }, {} as Record<string, Subscription[]>);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <header className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            SubTrack
          </h1>
          <p className="text-muted-foreground">Контроль подписок и экономия денег</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3 animate-slide-up">
          <Card className="glass-card p-6 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg gradient-purple-pink">
                <Icon name="Wallet" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">В месяц</h3>
            </div>
            <p className="text-3xl font-bold">{calculateTotalMonthly().toLocaleString('ru')} ₽</p>
          </Card>

          <Card className="glass-card p-6 border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg gradient-blue-purple">
                <Icon name="TrendingUp" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">В год</h3>
            </div>
            <p className="text-3xl font-bold">{calculateTotalYearly().toLocaleString('ru')} ₽</p>
          </Card>

          <Card className="glass-card p-6 border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg gradient-orange-pink">
                <Icon name="CreditCard" className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-muted-foreground">Подписок</h3>
            </div>
            <p className="text-3xl font-bold">{mockSubscriptions.length}</p>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-6 glass-card">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" className="h-4 w-4" />
              <span className="hidden md:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <Icon name="CreditCard" className="h-4 w-4" />
              <span className="hidden md:inline">Подписки</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" className="h-4 w-4" />
              <span className="hidden md:inline">Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Icon name="Calendar" className="h-4 w-4" />
              <span className="hidden md:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Icon name="Bell" className="h-4 w-4" />
              <span className="hidden md:inline">Уведомления</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" className="h-4 w-4" />
              <span className="hidden md:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ближайшие платежи</h2>
              <Button className="gradient-purple-pink border-0 hover:opacity-90">
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </div>

            <div className="space-y-3">
              {mockSubscriptions
                .sort((a, b) => a.nextPayment.getTime() - b.nextPayment.getTime())
                .map((sub, index) => {
                  const days = getDaysUntilPayment(sub.nextPayment);
                  const status = getPaymentStatus(days);

                  return (
                    <Card
                      key={sub.id}
                      className="glass-card p-4 hover:scale-[1.02] transition-all cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${categoryColors[sub.category]}`}>
                          <Icon name={categoryIcons[sub.category]} className="h-6 w-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{sub.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {sub.category === 'streaming' && 'Стриминг'}
                            {sub.category === 'software' && 'Софтвер'}
                            {sub.category === 'education' && 'Образование'}
                            {sub.category === 'other' && 'Другое'}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {sub.cost} {sub.currency}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sub.period === 'month' ? 'в месяц' : 'в год'}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {status === 'urgent' && (
                            <Badge className="bg-destructive text-destructive-foreground border-0">
                              <Icon name="AlertCircle" className="h-3 w-3 mr-1" />
                              {days}д
                            </Badge>
                          )}
                          {status === 'soon' && (
                            <Badge className="bg-orange-500 text-white border-0">
                              <Icon name="Clock" className="h-3 w-3 mr-1" />
                              {days}д
                            </Badge>
                          )}
                          {status === 'ok' && (
                            <Badge className="bg-green-500 text-white border-0">
                              <Icon name="Check" className="h-3 w-3 mr-1" />
                              {days}д
                            </Badge>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {sub.nextPayment.toLocaleDateString('ru')}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Все подписки</h2>
              <Button className="gradient-purple-pink border-0 hover:opacity-90">
                <Icon name="Plus" className="h-4 w-4 mr-2" />
                Добавить
              </Button>
            </div>

            {Object.entries(groupByCategory()).map(([category, subs]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-muted-foreground capitalize flex items-center gap-2">
                  <Icon name={categoryIcons[category as keyof typeof categoryIcons]} className="h-5 w-5" />
                  {category === 'streaming' && 'Стриминг'}
                  {category === 'software' && 'Софтвер'}
                  {category === 'education' && 'Образование'}
                  {category === 'other' && 'Другое'}
                  <Badge variant="outline" className="ml-2">{subs.length}</Badge>
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {subs.map((sub) => (
                    <Card key={sub.id} className="glass-card p-4 hover:scale-[1.02] transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${categoryColors[sub.category]}`}>
                          <Icon name={categoryIcons[sub.category]} className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{sub.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {sub.cost} {sub.currency}/{sub.period === 'month' ? 'мес' : 'год'}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreVertical" className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold">Статистика расходов</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="PieChart" className="h-5 w-5 text-primary" />
                  По категориям
                </h3>
                <div className="space-y-3">
                  {Object.entries(groupByCategory()).map(([category, subs]) => {
                    const total = subs.reduce((sum, sub) => {
                      const cost = sub.period === 'month' ? sub.cost : sub.cost / 12;
                      return sum + (sub.currency === 'RUB' ? cost : cost * 90);
                    }, 0);
                    const percentage = (total / calculateTotalMonthly()) * 100;

                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${categoryColors[category]}`} />
                            {category === 'streaming' && 'Стриминг'}
                            {category === 'software' && 'Софтвер'}
                            {category === 'education' && 'Образование'}
                            {category === 'other' && 'Другое'}
                          </span>
                          <span className="font-medium">{total.toFixed(0)} ₽</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${categoryColors[category]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" className="h-5 w-5 text-accent" />
                  Динамика
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-6 border border-dashed border-muted-foreground/20 rounded-lg">
                    <Icon name="BarChart3" className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">График появится в Pro версии</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold">Календарь платежей</h2>
            <Card className="glass-card p-8">
              <div className="text-center space-y-3">
                <Icon name="Calendar" className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Календарь в разработке</p>
                <p className="text-sm text-muted-foreground/60">Скоро здесь появится интерактивный календарь всех платежей</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold">Настройки уведомлений</h2>
            <Card className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Уведомления за 48 часов</h3>
                  <p className="text-sm text-muted-foreground">Получать напоминание за 2 дня до платежа</p>
                </div>
                <Button variant="outline" size="sm">Включить</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Уведомления за 24 часа</h3>
                  <p className="text-sm text-muted-foreground">Получать напоминание за 1 день до платежа</p>
                </div>
                <Button variant="outline" size="sm">Включить</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">Push-уведомления</h3>
                  <p className="text-sm text-muted-foreground">Локальные уведомления на устройстве</p>
                </div>
                <Button variant="outline" size="sm">Настроить</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold">Настройки</h2>
            <Card className="glass-card p-6 space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold">Версия</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Freemium</span>
                  <Button className="gradient-purple-pink border-0">Upgrade to Pro</Button>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-3">Pro функции</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Неограниченное количество подписок
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Мультивалютность
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Тёмная тема
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Графики и аналитика
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Экспорт данных
                  </li>
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
