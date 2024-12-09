'use client';

import { Actor, Movie } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ActorsTableProps {
  actors: (Actor & { movies: Movie[] })[];
}

export function ActorsTable({ actors }: ActorsTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const router = useRouter();

  const toggleRow = (actorId: number) => {
    setExpandedRows((current) =>
      current.includes(actorId)
        ? current.filter((id) => id !== actorId)
        : [...current, actorId]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actors.map((actor) => (
          <>
            <TableRow key={actor.id}>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleRow(actor.id)}
                >
                  {expandedRows.includes(actor.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </TableCell>
              <TableCell>{actor.name}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/actors/${actor.id}/edit`)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            {expandedRows.includes(actor.id) && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={2}>
                  <div className="pl-4 py-2">
                    <h4 className="font-medium mb-2">Movies:</h4>
                    <ul className="space-y-1">
                      {actor.movies.map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                      ))}
                    </ul>
                    {actor.movies.length === 0 && (
                      <p className="text-muted-foreground text-sm">
                        No movies found
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
