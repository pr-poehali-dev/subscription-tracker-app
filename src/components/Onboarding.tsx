import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: 'Wallet',
    title: 'Контроль трат',
    description: 'Отслеживайте все подписки в одном месте и видите точную сумму расходов за месяц и год',
    gradient: 'gradient-purple-pink',
  },
  {
    icon: 'Bell',
    title: 'Умные уведомления',
    description: 'Получайте напоминания за 24 и 48 часов до списания — никогда не пропустите важный платёж',
    gradient: 'gradient-blue-purple',
  },
  {
    icon: 'TrendingDown',
    title: 'Экономия денег',
    description: 'Находите неиспользуемые подписки и отменяйте их одним кликом — экономьте до 30% бюджета',
    gradient: 'gradient-orange-pink',
  },
];

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md p-8 space-y-8 animate-scale-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SubTrack
          </h1>
          {currentSlide < slides.length - 1 && (
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Пропустить
            </Button>
          )}
        </div>

        <div className="space-y-6 animate-fade-in" key={currentSlide}>
          <div className={`w-24 h-24 mx-auto rounded-3xl ${slides[currentSlide].gradient} flex items-center justify-center`}>
            <Icon name={slides[currentSlide].icon} className="h-12 w-12 text-white" />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            className="w-full gradient-purple-pink border-0 hover:opacity-90"
            size="lg"
          >
            {currentSlide < slides.length - 1 ? 'Далее' : 'Начать'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
