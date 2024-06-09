import { toast } from "@/components/ui/toast";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type TSimpleToast = {
  title: string;
  description: string;
};

export const showSimpleToast = ({ title, description }: TSimpleToast) => {
  const { dismiss } = toast({
    title: title,
    description: description,
    duration: 2000,
  });

  setTimeout(() => dismiss(), 2000);
};
