'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const UpdateActorSchema = z.object({
  name: z.string().min(1, 'Actor name cannot be empty'),
});

export type ActionState = {
  error: string | null;
  success?: boolean;
};

export async function updateActor(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get('id');
  const name = formData.get('name');

  if (!id || typeof id !== 'string') {
    return {
      error: 'Invalid actor ID',
    };
  }

  const result = UpdateActorSchema.safeParse({ name });

  if (!result.success) {
    return {
      error: result.error.errors[0].message,
    };
  }

  try {
    await prisma.actor.update({
      where: { id: parseInt(id) },
      data: { name: result.data.name },
    });

    revalidatePath('/actors');

    return {
      error: null,
      success: true,
    };
  } catch (err) {
    return {
      error: 'Failed to update actor',
    };
  }
}
