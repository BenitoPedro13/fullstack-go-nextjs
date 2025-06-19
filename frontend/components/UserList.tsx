'use client';

import { User } from '@/types/user';
import * as Button from '@/components/ui/button';
import * as Table from '@/components/ui/table';
import { RiEditLine, RiDeleteBinLine } from '@remixicon/react';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export default function UserList({ users, onEdit, onDelete, isLoading = false }: UserListProps) {
  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text-sub-600">Nenhum usuário encontrado.</p>
        <p className="text-sm text-text-weak-400 mt-1">
          Crie um novo usuário para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-white-0 rounded-lg border border-stroke-soft-200 overflow-hidden">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Nome</Table.Head>
            <Table.Head>Email</Table.Head>
            <Table.Head className="text-right">Ações</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell className="font-mono text-sm">
                {user.id}
              </Table.Cell>
              <Table.Cell className="font-medium">
                {user.name}
              </Table.Cell>
              <Table.Cell className="text-text-sub-600">
                {user.email}
              </Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button.Root
                    size="small"
                    variant="neutral"
                    mode="stroke"
                    onClick={() => onEdit(user)}
                    disabled={isLoading}
                  >
                    <Button.Icon as={RiEditLine} />
                    Editar
                  </Button.Root>
                  <Button.Root
                    size="small"
                    variant="error"
                    mode="stroke"
                    onClick={() => onDelete(user.id)}
                    disabled={isLoading}
                  >
                    <Button.Icon as={RiDeleteBinLine} />
                    Excluir
                  </Button.Root>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
} 