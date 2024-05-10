import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { InfoIcon } from "lucide-react";
import image from "../../assets/xl.jpg";

const InstructionHoverCard = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link">
          <InfoIcon className="w-6 h-6" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[500px]">
        <p>Format your Excelsheets like below example and click conform.</p>
        <img src={image} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default InstructionHoverCard;
