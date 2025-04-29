import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";

const educationData = [
  {
    level: "Doctoral degree",
    unemployment: 1.6,
    earnings: 1664,
  },
  {
    level: "Professional degree",
    unemployment: 1.6,
    earnings: 1745,
  },
  {
    level: "Master's degree",
    unemployment: 2.4,
    earnings: 1380,
  },
  {
    level: "Bachelor's degree",
    unemployment: 2.7,
    earnings: 1156,
  },
  {
    level: "Associate's degree",
    unemployment: 3.6,
    earnings: 819,
  },
  {
    level: "Some college, no degree",
    unemployment: 4.4,
    earnings: 756,
  },
  {
    level: "High school diploma",
    unemployment: 5.2,
    earnings: 692,
  },
  {
    level: "Less than a high school diploma",
    unemployment: 7.4,
    earnings: 504,
  },
];

const EducationUnemploymentChart = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* RTO Code and Header */}
      <div className="text-left text-xs mb-4">RTO CODE: 45282</div>

      {/* Main Title */}
      <div className="text-center mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-bold">
          Unemployment rates and earnings by educational attainment, 2016
        </h2>
      </div>

      {/* Chart Headers */}
      <div className="flex justify-between text-center mb-2">
        <div className="w-1/2 text-xs sm:text-sm">
          <p className="font-medium">Unemployment rate (%)</p>
        </div>
        <div className="w-1/2 text-xs sm:text-sm">
          <p className="font-medium">Median usual weekly earnings ($)</p>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="flex flex-row">
        {/* Unemployment Rate Chart */}
        <div className="w-1/2 h-80 sm:h-96 md:h-112 lg:h-128">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={educationData}
              barSize={20}
              margin={{ top: 5, right: 25, left: 90, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <YAxis
                type="category"
                dataKey="level"
                tick={{ fontSize: 10, width: 100 }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <XAxis
                type="number"
                domain={[0, 8]}
                tickCount={5}
                fontSize={10}
              />
              <ReferenceLine
                x={4}
                stroke="#666"
                strokeDasharray="3 3"
                label={{ value: "Total: 4%", position: "bottom", fontSize: 10 }}
              />
              <Tooltip />
              <Bar dataKey="unemployment" fill="#4682B4" radius={0}>
                <LabelList
                  dataKey="unemployment"
                  position="right"
                  fill="#000"
                  formatter={(value) => `${value}`}
                  style={{ fontSize: "10px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Earnings Chart */}
        <div className="w-1/2 h-80 sm:h-96 md:h-112 lg:h-128">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={educationData}
              barSize={20}
              margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <YAxis
                type="category"
                dataKey="level"
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                hide={true}
              />
              <XAxis
                type="number"
                domain={[0, 2000]}
                tickCount={5}
                fontSize={10}
              />
              <ReferenceLine
                x={885}
                stroke="#666"
                strokeDasharray="3 3"
                label={{
                  value: "All workers: $885",
                  position: "bottom",
                  fontSize: 10,
                }}
              />
              <Tooltip />
              <Bar dataKey="earnings" fill="#90EE90" radius={0}>
                <LabelList
                  dataKey="earnings"
                  position="right"
                  fill="#000"
                  formatter={(value) => `${value}`}
                  style={{ fontSize: "10px" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ATR Logo placeholder */}
      <div className="text-center mt-8">
        <div className="mx-auto w-24 h-12 bg-white">
          {/* This would be replaced with the actual ATR logo image */}
        </div>
      </div>
    </div>
  );
};

export default EducationUnemploymentChart;
