import { Button } from "@/lib/ui/button";
import { Calendar } from "@/lib/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { cn } from "@/lib/utils";
import type { MerchandisePurchase } from "@/types/interfaceProduct";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MerchandiseFormProps {
	onDetailsChange: (details: MerchandisePurchase) => void;
}

const MerchandiseForm: React.FC<MerchandiseFormProps> = ({
	onDetailsChange,
}) => {
	const [pieces, setPieces] = useState("");
	const [deliveryDate, setDeliveryDate] = React.useState<Date | undefined>(
		new Date(),
	);

	const handlePiecesChange = (value: number) => {
		const numericValue = Math.max(1, Math.min(Number(value), 10));
		const formattedValue = numericValue.toString();
		setPieces(formattedValue);
		onDetailsChange({
			itemNumber: Number.parseInt(formattedValue),
			deliveryDate,
		});
	};

	useEffect(() => {
		if (deliveryDate && pieces) {
			onDetailsChange({
				itemNumber: Number.parseInt(pieces), // Ensure pieces is converted to number
				deliveryDate: deliveryDate,
			});
		}
	}, [deliveryDate, pieces]);

	return (
		<div className="flex pt-2 uppercase">
			<div>
				<label
					htmlFor="pieces"
					className="mb-2 block text-sm font-bold tracking-widest text-red"
				>
					Pieces
				</label>
				<input
					type="number"
					name="pieces"
					id="pieces"
					value={pieces}
					onChange={(e) => handlePiecesChange(Number.parseInt(e.target.value))}
					className="rounded-full border-[1.5px] border-red bg-warmGrey p-2 px-4 uppercase text-red shadow-sm transition-all duration-300 sm:text-sm"
				/>
			</div>
			<div className="ml-4">
				<label
					htmlFor="delivery-date"
					className="mb-2 block text-sm font-bold tracking-widest text-red"
				>
					Delivery Date
				</label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] justify-start rounded-full border-[1.5px] border-red bg-transparent text-left font-normal uppercase tracking-widest text-charcoal hover:bg-transparent hover:text-red ",
								!deliveryDate && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{deliveryDate ? (
								format(deliveryDate, "PPP")
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto border-charcoal p-0" align="start">
						<Calendar
							mode="single"
							selected={deliveryDate}
							onSelect={setDeliveryDate}
							initialFocus
							className="bg-warmGrey"
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default MerchandiseForm;
