import { InfoCircleOutlined } from "@ant-design/icons";
import { FC } from "react";

type Props = {
  text: string;
};

const Information: FC<Props> = (props) => {
  const { text } = props;
  return (
    <div className="bg-gray-200 p-4 rounded flex gap-2 text-gray-600">
      <div>
        <InfoCircleOutlined size={16} />
      </div>
      <p>{text}</p>
    </div>
  );
};

Information.displayName = "Information";

export default Information;
