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
  const revenue = await fetchRevenue();
  const chartHeight = 350;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }



  return (
    <div className="w-full md:col-span-4">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[4px] border border-[#7042f88b] opacity-[0.9]"
      >

        <SparklesIcon className='text-[#b49bff] mr-[10px] h-5 w-5' />
        <h1 className='Welcome-text text-[13px]'>Recent Revenue</h1>
      </motion.div>
      {/* NOTE: Uncomment this code in Chapter 7 */}


      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex">
          <div
            className="flex flex-col justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px`, width: '50px' }} // Chiều rộng cột chỉ mục
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="text-center">{label}</p>
            ))}
          </div>
          <div className="flex-1 overflow-x-auto">
            <div className="flex flex-nowrap items-end">
              {revenue.map((month) => (
                <div key={month.month} className="flex flex-col items-center gap-2 px-1">
                  <div
                    className="w-10 rounded-md bg-blue-300"
                    style={{
                      height: `${(chartHeight / topLabel) * month.revenue}px`,
                      marginBottom: 'auto', // Đảm bảo căn chỉnh từ dưới lên
                    }}
                  ></div>
                  <p className="text-sm text-gray-400">{month.month}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>




    </div>
  );
}
