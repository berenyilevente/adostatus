'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TablePagination,
  TableSearch,
  TableHeader,
} from '@/components';

import { useTeamMembers } from './use-teamMembers';

export const TeamMemberTable = () => {
  const router = useRouter();
  const { teamMembers, filterForm } = useTeamMembers();

  return (
    <Card className="bg-white">
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <TableSearch filterForm={filterForm} />

          <div className="flex items-center gap-1 mx-4">
            <Button
              startIcon="plus"
              size="sm"
              iconSize="xs"
              variant="default"
              color="primary"
              onClick={() => router.push('/team-members/create')}
            >
              Add TeamMember
            </Button>
          </div>
        </div>
        <div>
          {teamMembers.map((teamMember) => (
            <div key={teamMember.id}>{teamMember.user.name}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
