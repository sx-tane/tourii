import { Button } from "@/lib/ui/button";
import { Calendar } from "@/lib/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/ui/popover";
import { cn } from "@/lib/utils";
import type { ExperienceFormProps } from "@/types/product-type";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ExperienceForm: React.FC<ExperienceFormProps> = ({ onDetailsChange }) => {
	const [persons, setPersons] = useState("");
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	const handlePersonsChange = (value: number) => {
		const numericValue = Math.max(1, Math.min(Number(value), 10));
		const formattedValue = numericValue.toString();
		setPersons(formattedValue);
		onDetailsChange({ participants: Number.parseInt(formattedValue), date });
	};

	useEffect(() => {
		if (persons && date) {
			onDetailsChange({
				participants: Number.parseInt(persons),
				date: date,
			});
		}
	}, [persons, date, onDetailsChange]);

	return (
		<div className="flex pt-2 uppercase">
			<div>
				<label
					htmlFor="persons"
					className="mb-2 block text-sm font-bold tracking-widest text-red"
				>
					PAX
				</label>
				<input
					type="number"
					name="persons"
					id="persons"
					value={persons}
					onChange={(e) => handlePersonsChange(Number.parseInt(e.target.value))}
					className=" rounded-full border-[1.5px] border-red bg-warmGrey p-2 px-4 uppercase text-charcoal shadow-sm transition-all duration-300 sm:text-sm"
				/>
			</div>
			<div className="ml-4">
				<label
					htmlFor="date"
					className="mb-2 block text-sm font-bold tracking-widest text-red"
				>
					Date
				</label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"w-[240px] justify-start rounded-full border-[1.5px] border-red bg-transparent text-left font-normal uppercase tracking-widest text-charcoal hover:bg-transparent hover:text-red ",
								!date && "text-muted-foreground",
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto border-charcoal p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
							className="bg-warmGrey"
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

export default ExperienceForm;
