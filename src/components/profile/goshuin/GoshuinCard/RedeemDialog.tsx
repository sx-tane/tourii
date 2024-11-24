import { Button } from "@/lib/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/lib/ui/dialog";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
// RedeemDialog.tsx
import type React from "react";
import { useState } from "react";

interface RedeemDialogProps {
	goshuinId: string | undefined;
	goshuinName: string | undefined;
	goshuinRedeemDate: string | undefined;
	onRedeemSuccess: () => void;
}

const RedeemDialog: React.FC<RedeemDialogProps> = ({
	goshuinId,
	goshuinName,
	goshuinRedeemDate,
	onRedeemSuccess,
}) => {
	const [isRedeemed, setIsRedeemed] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Collect form data
		const formData = new FormData(event.currentTarget);
		const formDataObj = Object.fromEntries(formData.entries());
		const dataToSend = {
			goshuinId: goshuinId,
			goshuinName: goshuinName,
			name: formDataObj.name,
			reservationDate: formDataObj.date,
			reservationTime: formDataObj.time,
			redemptionDate: new Date().toISOString(), // Set redemptionDate to the current date
			email: formDataObj.email,
			contactNumber: formDataObj.phone,
			reservationStatus: "PENDING", // Set reservationStatus to "Pending" or another appropriate value
		};

		// Send data to API
		try {
			const response = await fetch("/api/redeem", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataToSend),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			setIsRedeemed(true);
			// Call the onRedeemSuccess function when the form submission is successful
			setOpen(false); // Close the dialog only after successful submission
			onRedeemSuccess();
			// Handle successful submission here (e.g., show a success message or close the dialog)
		} catch (error) {
			console.error("Error submitting form:", error);
			// Handle errors here, such as displaying an error message
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					type="button"
					disabled={isRedeemed}
					className={`${isRedeemed ? " bg-re cursor-not-allowed" : "bg-charcoal"} flex h-full w-1/2 cursor-pointer items-center justify-center rounded-full bg-charcoal font-semibold tracking-widest text-warmGrey transition-all duration-300 hover:bg-red`}
				>
					{isRedeemed ? `Redeemed on: ${goshuinRedeemDate}!` : "Redeem!"}
				</button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-1/3 bg-warmGrey">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle className=" uppercase tracking-widest text-red">
							Reservation
						</DialogTitle>
						<DialogDescription className="pt-2 text-left text-sm tracking-wider text-charcoal">
							Please fill in your details to redeem this perk.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4 text-xs font-medium lowercase tracking-widest">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-left">
								Name
							</Label>
							<Input
								id="name"
								name="name"
								className="col-span-3 border-charcoal"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="date" className="text-left">
								Date
							</Label>
							<Input
								id="date"
								name="date"
								type="date"
								className="col-span-3 border-charcoal"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="time" className="text-left">
								Time
							</Label>
							<Input
								id="time"
								name="time"
								type="time"
								className="col-span-3 border-charcoal"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="email" className="text-left">
								Email
							</Label>
							<Input
								id="email"
								name="email"
								type="email"
								className="col-span-3 border-charcoal"
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="phone" className="text-left">
								Phone No.
							</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								className="col-span-3 border-charcoal"
								required
							/>
						</div>
					</div>
					<Button
						type="submit"
						className="item-center mx-auto flex rounded-full transition-all duration-300 hover:bg-red hover:text-warmGrey"
					>
						Submit
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default RedeemDialog;
