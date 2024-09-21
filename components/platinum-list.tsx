import { memo, type FC } from "react";
import PlatinumItem from "@/components/platinum-item";

interface Props {
  data: string[] | null | undefined;
}

const Empty: FC = () => (
  <div className="flex justify-center items-center">
    <p className="font-medium">Nothing found :(</p>
  </div>
);

const PlatinumList: FC<Props> = (props) => {
  const { data } = props;
  if (!data || data.length === 0) return <Empty />;
  return (
    <div className="w-full-scrollbar flex flex-col gap-3 max-h-[80vh] overflow-y-auto scrollbar-gutter">
      {data?.map((plat) => <PlatinumItem key={plat} platinumId={plat} />)}
    </div>
  );
};

export default memo(PlatinumList);
