'use client';

import { useState, useEffect } from 'react';
import * as Button from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import * as Label from '@/components/ui/label';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

interface UserFormProps {
  user?: User;
  onSubmit: (userData: CreateUserRequest | UpdateUserRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserForm({ user, onSubmit, onCancel, isLoading = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email deve ter um formato válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-bg-white-0 p-6 rounded-lg border border-stroke-soft-200">
      <h2 className="text-title-h4 text-text-strong-950 mb-6">
        {user ? 'Editar Usuário' : 'Novo Usuário'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label.Root htmlFor="name" className="block text-sm font-medium text-text-strong-950 mb-1">
            Nome
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                placeholder="Digite o nome do usuário"
                disabled={isLoading}
              />
            </Input.Wrapper>
          </Input.Root>
          {errors.name && (
            <p className="text-sm text-text-critical-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label.Root htmlFor="email" className="block text-sm font-medium text-text-strong-950 mb-1">
            Email
          </Label.Root>
          <Input.Root>
            <Input.Wrapper>
              <Input.Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                placeholder="Digite o email do usuário"
                disabled={isLoading}
              />
            </Input.Wrapper>
          </Input.Root>
          {errors.email && (
            <p className="text-sm text-text-critical-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button.Root type="submit" disabled={isLoading}>
            {isLoading ? 'Salvando...' : (user ? 'Atualizar' : 'Criar')}
          </Button.Root>
          <Button.Root type="button" variant="neutral" mode="stroke" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </Button.Root>
        </div>
      </form>
    </div>
  );
} 