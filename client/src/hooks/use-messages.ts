import { useMutation } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export function useCreateMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.messages.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Validasi gagal");
        }
        throw new Error("Gagal mengirim pesan. Sistem error.");
      }

      // Safe parse the successful response
      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "TRANSMISI SUKSES",
        description: "Pesan Anda telah masuk ke dalam mainframe.",
        className: "bg-background border-primary text-primary font-display rounded-none box-glow-cyan",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "KONEKSI TERPUTUS",
        description: error.message,
        className: "font-display rounded-none",
      });
    },
  });
}
