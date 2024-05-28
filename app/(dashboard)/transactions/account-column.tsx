import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
  id: string;
  account: string | null;
  accountId: string | null;
};

export const AccountColumn = ({ id, account, accountId }: Props) => {
  const { onOpen } = useOpenAccount();
  const onClick = () => {
    if (!accountId) return;
    onOpen(accountId);
  };
  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
    >
      {account}
    </div>
  );
};
