import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import React, { PureComponent } from "react";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  data?: { date: string; income: number; expences: number }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dataKey="income"
          stroke="#3d82f6"
          className="drop-shadow-sm"
          dot={false}
          strokeWidth={2}
        />
        <Line
          dataKey="expences"
          stroke="#f43f5e"
          className="drop-shadow-sm"
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
