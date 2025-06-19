import Link from 'next/link';
import * as Button from '@/components/ui/button';
import { RiGithubFill, RiUserLine } from '@remixicon/react';

export default function Home() {
  return (
    <div className='container mx-auto flex-1 px-5'>
      <div className='mt-48 flex flex-col items-center'>
        <h1 className='max-w-3xl text-balance text-center text-title-h3 text-text-strong-950'>
          Aplicação Fullstack Go + Next.js
        </h1>
        <p className='mt-4 text-center text-text-sub-600 max-w-2xl'>
          Sistema integrado com API em Go e frontend em Next.js para gerenciamento de usuários
        </p>

        <div className='mt-6 flex gap-4'>
          <Button.Root asChild>
            <Link href='/usuarios'>
              <Button.Icon as={RiUserLine} />
              Gerenciar Usuários
            </Link>
          </Button.Root>

          <Button.Root variant='neutral' asChild>
            <a
              href='https://github.com/alignui/alignui-nextjs-typescript-starter'
              target='_blank'
            >
              <Button.Icon as={RiGithubFill} />
              Ver no GitHub
            </a>
          </Button.Root>
        </div>

        <div className='mt-12'>
          <h2 className='text-lg text-text-primary font-semibold'>
            Funcionalidades:
          </h2>
          <ul className='ml-6 mt-3 flex list-disc flex-col gap-2 font-mono text-paragraph-sm font-medium text-text-sub-600'>
            <li>API RESTful em Go com PostgreSQL.</li>
            <li>Frontend em Next.js com TypeScript.</li>
            <li>CRUD completo de usuários.</li>
            <li>Interface moderna com AlignUI.</li>
            <li>Integração com notificações (Sonner).</li>
            <li>Validação de formulários.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
