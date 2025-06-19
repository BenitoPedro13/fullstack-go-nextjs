'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services/api';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import * as Button from '@/components/ui/button';
import { RiAddLine, RiRefreshLine } from '@remixicon/react';
import { toast } from 'sonner';

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Carregar usuários
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  // Criar usuário
  const handleCreateUser = async (userData: CreateUserRequest) => {
    try {
      setFormLoading(true);
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      setShowForm(false);
      toast.success('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast.error('Erro ao criar usuário');
    } finally {
      setFormLoading(false);
    }
  };

  // Atualizar usuário
  const handleUpdateUser = async (userData: UpdateUserRequest) => {
    if (!editingUser) return;

    try {
      setFormLoading(true);
      const updatedUser = await userService.updateUser(editingUser.id, userData);
      setUsers(prev => prev.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      setEditingUser(null);
      setShowForm(false);
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast.error('Erro ao atualizar usuário');
    } finally {
      setFormLoading(false);
    }
  };

  // Excluir usuário
  const handleDeleteUser = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error('Erro ao excluir usuário');
    }
  };

  // Abrir formulário para editar
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  // Cancelar formulário
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  // Carregar usuários na inicialização
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title-h2 text-text-strong-950">
            Gerenciamento de Usuários
          </h1>
          <p className="text-text-sub-600 mt-1">
            Gerencie os usuários do sistema através da API Go
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button.Root
            variant="neutral"
            mode="stroke"
            onClick={fetchUsers}
            disabled={loading}
          >
            <Button.Icon as={RiRefreshLine} />
            Atualizar
          </Button.Root>
          
          <Button.Root
            onClick={() => setShowForm(true)}
            disabled={loading}
          >
            <Button.Icon as={RiAddLine} />
            Novo Usuário
          </Button.Root>
        </div>
      </div>

      <div className="space-y-6">
        {showForm && (
                     <UserForm
             user={editingUser || undefined}
             onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
             onCancel={handleCancelForm}
             isLoading={formLoading}
           />
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-text-sub-600">Carregando usuários...</p>
          </div>
        ) : (
          <UserList
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            isLoading={formLoading}
          />
        )}
      </div>
    </div>
  );
} 