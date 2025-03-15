
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal } from "lucide-react";

// Sample spinning mill knowledge base responses
const knowledgeBase: Record<string, string> = {
  "yarn": "Yarn is a long continuous length of interlocked fibers, suitable for use in the production of textiles, sewing, crocheting, knitting, weaving, embroidery, or ropemaking.",
  "cotton": "Cotton is a soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants. It's the most widely used natural fiber cloth in clothing.",
  "spinning": "Spinning is the process of drawing out and twisting fibers to join them into a continuous thread or yarn. In the textile industry, spinning involves transforming fiber into yarn.",
  "ring frame": "A ring frame is a spinning machine used to twist fibers into yarn. It's one of the most widely used spinning machines in the textile industry.",
  "carding": "Carding is a mechanical process that disentangles, cleans and intermixes fibers to produce a continuous web or sliver suitable for subsequent processing.",
  "combing": "Combing is a process used to remove short fibers and align the remaining long fibers in preparation for spinning fine, strong, and even yarns.",
  "drawing": "In textile manufacturing, drawing is the process of attenuating the sliver by passing it through several sets of rollers, each set moving faster than the previous one.",
  "roving": "Roving is a long and narrow bundle of fiber that has been drawn out, twisted slightly, and is used for spinning into yarn.",
  "blowroom": "The blowroom is where the first stage of yarn production takes place. It involves opening cotton bales, cleaning cotton of impurities, and forming uniform laps.",
  "count": "Yarn count is a numerical value that indicates the fineness or coarseness of yarn. Higher count generally means finer yarn.",
  "twist": "Twist in yarn refers to the number of turns about its axis per unit of length. Twist binds fibers together and contributes to the yarn's strength.",
  "spindle": "A spindle is a wooden or metal rod used in hand-spinning or in a spinning wheel or spinning frame to twist and wind thread or yarn.",
  "bobbin": "A bobbin is a cylinder or cone on which yarn, thread, or wire is wound. It's used in spinning, weaving, sewing, and other textile arts.",
  "warp": "Warp refers to the lengthwise threads in a woven fabric, through which the weft is woven.",
  "weft": "Weft (or woof) refers to the threads that run from selvedge to selvedge, perpendicular to the warp.",
  "selvedge": "Selvedge is the self-finished edge of fabric that prevents it from unraveling or fraying.",
  "autodoffing": "Autodoffing is an automatic process where full bobbins are replaced with empty ones on spinning machines, reducing the need for manual intervention.",
  "mercerization": "Mercerization is a treatment for cotton fabric and thread that gives fabric or yarns a lustrous appearance and strengthens them.",
  "open-end spinning": "Open-end spinning is a method of yarn production where fibers are continuously wrapped around a rapidly rotating rotor, offering higher productivity.",
  "compact spinning": "Compact spinning is a modified ring spinning technique that reduces hairiness and increases yarn strength by compacting the fiber assembly.",
  "slub yarn": "Slub yarn has deliberately created thick and thin places, giving fabrics a unique texture and appearance.",
  "vortex spinning": "Vortex spinning is a newer spinning technology that uses air vortices to twist fibers into yarn, offering high production speeds.",
  "ringdoubling": "Ring doubling involves combining two or more yarns together by twisting them, improving uniformity and strength.",
  "nep": "Neps are small knots of entangled fibers that appear as defects in yarn and fabric, often caused during processing."
};

interface Message {
  text: string;
  isUser: boolean;
}

const ChatAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your SpinWise assistant. How can I help you with your spinning mill questions today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Generate response based on keywords
    const userQuery = input.toLowerCase();
    let botResponse = "I'm not sure about that. Could you ask about specific spinning mill terms like 'yarn', 'cotton', 'ring frame', or 'carding'?";
    
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (userQuery.includes(keyword.toLowerCase())) {
        botResponse = response;
        break;
      }
    }
    
    // Add bot response with a slight delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);
    
    // Clear input
    setInput("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("chat")}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full pr-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[80%] ${
                    message.isUser
                      ? "bg-textile-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder={t("chatPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <Button size="icon" onClick={handleSend}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatAssistant;
