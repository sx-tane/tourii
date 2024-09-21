interface BurnButtonProps {
  goshuinId: string | undefined;
  goshuinName: string | undefined;
  goshuinRedeemDate: string | undefined;
  onRedeemSuccess: () => void;
}

const BurnButton: React.FC<BurnButtonProps> = ({ goshuinId, goshuinName, goshuinRedeemDate, onRedeemSuccess }) => {})