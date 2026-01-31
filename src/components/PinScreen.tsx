import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PinScreenProps {
  mode: 'create' | 'verify';
  onSuccess: () => void;
  onBiometric?: () => void;
  biometricEnabled?: boolean;
}

const PinScreen = ({ mode, onSuccess, onBiometric, biometricEnabled = false }: PinScreenProps) => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');
  const { toast } = useToast();

  useEffect(() => {
    if (mode === 'create' && step === 'confirm' && confirmPin.length === 4) {
      if (pin === confirmPin) {
        toast({
          title: 'PIN-код установлен',
          description: 'Ваш PIN-код успешно сохранён',
        });
        setTimeout(onSuccess, 500);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: 'PIN-коды не совпадают',
        });
        setConfirmPin('');
      }
    } else if (mode === 'verify' && pin.length === 4) {
      const savedPin = localStorage.getItem('userPin') || '1234';
      if (pin === savedPin) {
        toast({
          title: 'Успешно',
          description: 'PIN-код верный',
        });
        setTimeout(onSuccess, 500);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ошибка',
          description: 'Неверный PIN-код',
        });
        setPin('');
      }
    }
  }, [pin, confirmPin, mode, step, onSuccess, toast]);

  const handleNumberPress = (num: number) => {
    if (mode === 'create') {
      if (step === 'enter' && pin.length < 4) {
        const newPin = pin + num;
        setPin(newPin);
        if (newPin.length === 4) {
          setTimeout(() => setStep('confirm'), 300);
        }
      } else if (step === 'confirm' && confirmPin.length < 4) {
        setConfirmPin(confirmPin + num);
      }
    } else {
      if (pin.length < 4) {
        setPin(pin + num);
      }
    }
  };

  const handleDelete = () => {
    if (mode === 'create') {
      if (step === 'confirm') {
        setConfirmPin(confirmPin.slice(0, -1));
      } else {
        setPin(pin.slice(0, -1));
      }
    } else {
      setPin(pin.slice(0, -1));
    }
  };

  const handleBiometric = () => {
    toast({
      title: 'Биометрия',
      description: 'В веб-версии используется имитация биометрии',
    });
    setTimeout(onBiometric || onSuccess, 1000);
  };

  const currentPin = mode === 'create' ? (step === 'confirm' ? confirmPin : pin) : pin;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md p-8 space-y-8 animate-scale-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-purple-pink flex items-center justify-center">
            <Icon name="Lock" className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold">
              {mode === 'create' 
                ? (step === 'enter' ? 'Создайте PIN-код' : 'Подтвердите PIN-код')
                : 'Введите PIN-код'
              }
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {mode === 'create'
                ? (step === 'enter' ? 'Придумайте 4-значный код' : 'Повторите код для подтверждения')
                : 'Для доступа к приложению'
              }
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all ${
                currentPin.length > i
                  ? 'bg-primary scale-110'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              variant="outline"
              size="lg"
              className="h-16 text-xl font-semibold hover:scale-105 transition-transform"
              onClick={() => handleNumberPress(num)}
            >
              {num}
            </Button>
          ))}
          
          {mode === 'verify' && biometricEnabled && (
            <Button
              variant="ghost"
              size="lg"
              className="h-16"
              onClick={handleBiometric}
            >
              <Icon name="Fingerprint" className="h-6 w-6 text-primary" />
            </Button>
          )}
          {(!biometricEnabled || mode === 'create') && <div />}
          
          <Button
            variant="outline"
            size="lg"
            className="h-16 text-xl font-semibold hover:scale-105 transition-transform"
            onClick={() => handleNumberPress(0)}
          >
            0
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            className="h-16"
            onClick={handleDelete}
            disabled={currentPin.length === 0}
          >
            <Icon name="Delete" className="h-6 w-6" />
          </Button>
        </div>

        {mode === 'verify' && (
          <Button variant="link" className="w-full" onClick={() => setPin('')}>
            Забыли PIN-код?
          </Button>
        )}
      </Card>
    </div>
  );
};

export default PinScreen;
