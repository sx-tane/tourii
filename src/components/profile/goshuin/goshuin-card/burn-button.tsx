interface BurnButtonProps {
	goshuinId: string | undefined;
	goshuinName: string | undefined;
	goshuinRedeemDate: string | undefined;
	onRedeemSuccess: () => void;
}

const BurnButton: React.FC<BurnButtonProps> = ({
	goshuinId,
	goshuinName,
	goshuinRedeemDate,
	onRedeemSuccess,
}) => {
	return (
		<button type="button" onClick={() => onRedeemSuccess()}>
			Burn {goshuinName}
		</button>
	);
};

export default BurnButton;