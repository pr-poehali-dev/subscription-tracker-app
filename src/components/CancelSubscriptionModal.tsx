import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: {
    name: string;
    category: string;
  };
  isPremium: boolean;
}

const CancelSubscriptionModal = ({
  isOpen,
  onClose,
  subscription,
  isPremium,
}: CancelSubscriptionModalProps) => {
  const handleOpenSystemSettings = () => {
    alert('Открываются системные настройки App Store / Google Play');
    onClose();
  };

  const handleOpenWebsite = () => {
    window.open('https://example.com/cancel-subscription', '_blank');
    onClose();
  };

  if (!isPremium) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="glass-card border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Lock" className="h-5 w-5 text-primary" />
              Premium функция
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <div className="text-center p-6 border border-dashed border-primary/20 rounded-lg space-y-3">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-purple-pink flex items-center justify-center">
                  <Icon name="Crown" className="h-8 w-8 text-white" />
                </div>
                <p className="text-foreground font-medium">
                  Быстрая отмена подписок доступна в Premium
                </p>
                <p className="text-sm text-muted-foreground">
                  Получите прямые ссылки на отмену подписок в один клик и сэкономьте время
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Premium включает:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Быстрая отмена подписок
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Неограниченное количество подписок
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Графики и детальная аналитика
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-4 w-4 text-primary" />
                    Экспорт данных
                  </li>
                </ul>
              </div>

              <Button className="w-full gradient-purple-pink border-0 hover:opacity-90">
                Upgrade to Premium
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  const isAppStore = ['Netflix', 'Spotify'].includes(subscription.name);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-destructive/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="AlertCircle" className="h-5 w-5 text-destructive" />
            Отменить подписку
          </DialogTitle>
          <DialogDescription className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{subscription.name}</span>
                <Badge variant="outline" className="text-xs">
                  {isAppStore ? 'App Store' : 'Веб-сервис'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {isAppStore
                  ? 'Эта подписка оформлена через App Store/Google Play'
                  : 'Эта подписка оформлена через веб-сайт сервиса'
                }
              </p>
            </div>

            {isAppStore ? (
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm">Инструкция:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Откройте Настройки устройства</li>
                    <li>Перейдите в раздел "Подписки"</li>
                    <li>Найдите {subscription.name}</li>
                    <li>Нажмите "Отменить подписку"</li>
                  </ol>
                </div>

                <Button
                  onClick={handleOpenSystemSettings}
                  className="w-full gradient-purple-pink border-0 hover:opacity-90"
                >
                  <Icon name="Settings" className="h-4 w-4 mr-2" />
                  Открыть настройки
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-semibold text-sm">Как отменить:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Войдите в свой аккаунт на сайте</li>
                    <li>Откройте настройки профиля</li>
                    <li>Найдите раздел "Подписка" или "Billing"</li>
                    <li>Нажмите "Отменить подписку"</li>
                  </ol>
                </div>

                <Button
                  onClick={handleOpenWebsite}
                  className="w-full gradient-purple-pink border-0 hover:opacity-90"
                >
                  <Icon name="ExternalLink" className="h-4 w-4 mr-2" />
                  Перейти на сайт
                </Button>
              </div>
            )}

            <Button variant="outline" onClick={onClose} className="w-full">
              Отмена
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSubscriptionModal;
