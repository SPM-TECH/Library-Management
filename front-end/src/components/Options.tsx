import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  name: string;
};

export default function Options({ Icon, name }: Props) {
  return (
    <div className="bg-zinc-700 hover:bg-zinc-800 py-4 cursor-pointer transition-colors rounded shadow">
      <div className="flex flex-col items-center justify-center">
        <Icon className="h-6 w-6 text-zinc-200 block mb-1" />
        <p className="text-white ">{name}</p>
      </div>
    </div>
  );
}
