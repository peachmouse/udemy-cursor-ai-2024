'use client';

import { Actor } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateActor } from '@/app/actions';
import { useEffect } from 'react';
import type { ActionState } from '@/app/actions';

interface ActorEditFormProps {
  actor: Actor;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}

export function ActorEditForm({ actor }: ActorEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState<ActionState, FormData>(updateActor, {
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      router.push('/actors');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <input type="hidden" name="id" value={actor.id} />
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={actor.name}
          placeholder="Enter actor name"
        />
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      </div>
      <div className="flex gap-4">
        <SubmitButton />
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/actors')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
