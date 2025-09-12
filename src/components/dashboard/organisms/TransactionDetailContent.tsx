"use client";

import React from 'react'
import DetailTransaksi from './DetailTransaksi'
import { useGetBayIdTransaksi } from '@/features'
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import SkeletonDetailTransaksi from '../atoms/SkeletonDetailTransaksi';

type Props = { id: string }

export default function TransactionDetailContent({ id }: Props) {

    const { data, isLoading } = useGetBayIdTransaksi(id)

    return (
        <div className="p-3">
            <div className="flex justify-between">
                <div className="space-x-1">
                    <h3 className="text-3xl font-bold">Belanja id</h3>
                    <p className="text-accent-foreground text-2xl font-semibold">
                        {data?.order_code ?? <Skeleton className="h-6 w-40" />}
                    </p>
                </div>
                <Badge className="bg-[#109900] text-center -top-2 -left-2 h-7.5 max-w-7.5 rounded-full px-3 text-lg text-white">
                    8
                </Badge>
            </div>
            {
                isLoading ? <SkeletonDetailTransaksi /> : <DetailTransaksi data={data} className="md:grid-cols-2" />
            }

        </div>
    )
}