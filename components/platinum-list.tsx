import PlatinumItem from "@/components/platinum-item";
import { memo, type FC } from "react";

interface Props {
  data: string[] | null | undefined;
}

const Empty: FC = () => (
  <div className="flex items-center justify-center">
    <p className="font-medium">Nothing found :(</p>
  </div>
);

const PlatinumList: FC<Props> = (props) => {
  const { data } = props;
  if (!data || data.length === 0) return <Empty />;
  return (
    <div className="w-full-scrollbar scrollbar-gutter flex max-h-[80vh] flex-col gap-3 overflow-y-auto">
      {data?.map((plat) => <PlatinumItem key={plat} platinumId={plat} />)}
    </div>
  );
};

export default memo(PlatinumList);
