import { ThoughtType } from "@/lib";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

import {
  MessageCircle,
  Clock,
} from "lucide-react";
import { getFormattedDate } from "@/utils";

export const ThoughtCard = ({ thought }: { thought: ThoughtType }) => {
  const router = useRouter();
  const lastMessageTime = thought.lastMessage?.createdAt;
  const lastMessage = thought.lastMessage;

  return (
    <div
      key={thought.id}
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 border rounded-[8px]"
      onClick={() => router.push(`/thoughts/${thought.id}`)}
    >
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {thought.title}
            </h3>
            <div className="flex items-center space-x-1 text-xs bg-secondary w-[42px] rounded-[12px] h-[20px] text-black dark:text-white justify-center">
              <MessageCircle className="h-[12px] w-[12px]" />
              <span>{thought.numberOfMessages || 0}</span>
            </div>
          </div>  
  
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed h-[40px]">
            {/*last message... */}
            {lastMessage ? lastMessage.body : "No messages."}
          </p>

          <hr className="my-3" />

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            {lastMessageTime && (
              <div className="flex items-center space-x-1"> 
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(
                    getFormattedDate(lastMessageTime).fullDate,
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            )}

            {thought.createdAt && (
              <span className="ml-auto">
                Created{" "}
                {formatDistanceToNow(
                  getFormattedDate(thought.createdAt).fullDate,
                  { addSuffix: true }
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
