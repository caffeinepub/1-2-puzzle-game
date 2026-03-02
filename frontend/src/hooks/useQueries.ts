import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Service, StaffMember, BusinessHours, ContactInfo } from '../backend';

export function useServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useStaff() {
  const { actor, isFetching } = useActor();

  return useQuery<StaffMember[]>({
    queryKey: ['staff'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaff();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useBusinessHours() {
  const { actor, isFetching } = useActor();

  return useQuery<BusinessHours | null>({
    queryKey: ['businessHours'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBusinessHours();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useContactInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactInfo | null>({
    queryKey: ['contactInfo'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getContactInfo();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      phone,
      preferredDateTime,
      service,
    }: {
      name: string;
      phone: string;
      preferredDateTime: string;
      service: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitAppointmentRequest(name, phone, preferredDateTime, service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
}
