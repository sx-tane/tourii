import { Camera, FileText, Share2 } from "lucide-react";

interface TaskTypeIconProps {
	taskType: string;
	size?: number;
}

export default function TaskTypeIcon({
	taskType,
	size = 16,
}: TaskTypeIconProps) {
	switch (taskType) {
		case "PHOTO_UPLOAD":
			return <Camera size={size} className="text-green-600" />;
		case "SHARE_SOCIAL":
			return <Share2 size={size} className="text-blue-600" />;
		case "ANSWER_TEXT":
			return <FileText size={size} className="text-purple-600" />;
		default:
			return <FileText size={size} className="text-gray-600" />;
	}
}
