import { formatpercentage } from "@/lib/utils";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { CategoryTooltip } from "./category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data?: { value: number; name: string }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart data={data}>
        <Tooltip content={<CategoryTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
                      </span>
                      <span className="text-sm">
                        {formatpercentage(entry.payload.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
