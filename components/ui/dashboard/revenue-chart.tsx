'use client'
import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/ui/fonts';
import { Revenue } from '@/app/lib/definitions';
import { fetchRevenue } from '@/app/lib/data';
import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import { motion } from 'framer-motion';
import { slideInFromTop } from '@/utils/motion';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  //const revenue = await fetchRevenue();

  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = {
    command: 'SELECT',
    rowCount: 12,
    rows: [
      { month: 'Jan', revenue: 2000 },
      { month: 'Feb', revenue: 1800 },
      { month: 'Mar', revenue: 2200 },
      { month: 'Apr', revenue: 2500 },
      { month: 'May', revenue: 2300 },
      { month: 'Jun', revenue: 3200 },
      { month: 'Jul', revenue: 3500 },
      { month: 'Aug', revenue: 3700 },
      { month: 'Sep', revenue: 2500 },
      { month: 'Oct', revenue: 2800 },
      { month: 'Nov', revenue: 3000 },
      { month: 'Dec', revenue: 4800 }
    ],
    fields: [
      {
        name: 'month',
        dataTypeID: 1043,
        tableID: 24611,
        columnID: 1,
        dataTypeSize: -1,
        dataTypeModifier: 8,
        format: 'text'
      },
      {
        name: 'revenue',
        dataTypeID: 23,
        tableID: 24611,
        columnID: 2,
        dataTypeSize: 4,
        dataTypeModifier: -1,
        format: 'text'
      }
    ],
    rowAsArray: false,
    viaNeonFetch: true
  }
  const revenue = data.rows;
  const chartHeight = 350;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex items-end justify-between gap-2 rounded-md bg-white p-4">
          {/* Cột label */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="text-center">{label}</p>
            ))}
          </div>

          {/* Các cột doanh thu */}
          {revenue.map((month) => (
            <div
              key={month.month}
              className="flex flex-col items-center gap-2 flex-grow"
              style={{ flexBasis: `calc(100% / 12)` }} /* Điều chỉnh số cột */
            >
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                  maxHeight: '350px'
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0 text-center">
                {month.month}
              </p>
            </div>
          ))}
        </div>


        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div >
  );
}
