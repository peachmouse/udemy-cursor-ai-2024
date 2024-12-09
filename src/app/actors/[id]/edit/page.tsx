import { ActorEditForm } from '@/components/actors/actor-edit-form';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

interface ActorEditPageProps {
  params: {
    id: string;
  };
}

export default async function ActorEditPage({ params }: ActorEditPageProps) {
  const actor = await prisma.actor.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!actor) {
    notFound();
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Actor</h1>
      <ActorEditForm actor={actor} />
    </div>
  );
}
