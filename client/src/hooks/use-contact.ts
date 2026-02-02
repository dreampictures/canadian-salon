import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type InsertContactMessage = z.infer<typeof api.contact.create.input>;

export function useContactMessages() {
  return useQuery({
    queryKey: [api.contact.list.path],
    queryFn: async () => {
      const res = await fetch(api.contact.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch messages");
      return api.contact.list.responses[200].parse(await res.json());
    },
  });
}

export function useSendMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ title: "Message Sent", description: "We will get back to you shortly." });
    },
    onError: () => {
      toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
    },
  });
}
