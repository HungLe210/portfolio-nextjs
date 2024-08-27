import CardWrapper, { Card } from '@/components/ui/dashboard/cards';
import RevenueChart from '@/components/ui/dashboard/revenue-chart';
import LatestInvoices from '@/components/ui/dashboard/latest-invoices';
import { lusitana } from '@/components/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton, CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton, TitleSkeleton } from '@/components/ui/skeletons';
import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import { slideInFromTop } from '@/utils/motion';
import { motion } from 'framer-motion';

export default async function Page() {

    return (
        <div className='custom z-[30] mt-[100px]'>
            <div
                className='Welcome-box py-[8px] px-[4px] border border-[#7042f88b] opacity-[0.9]'
            >
                <SparklesIcon className='text-[#b49bff] mr-[10px] h-5 w-5' />
                <h1 className='Welcome-text text-[13px]'>
                    Dashboard
                </h1>

            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-2">
                <Suspense fallback={<CardsSkeleton />}>
                    <CardWrapper />
                </Suspense>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>

        </div >
    );
}