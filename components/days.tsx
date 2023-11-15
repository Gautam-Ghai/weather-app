import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'

import { Skeleton } from "@/components/ui/skeleton"
import { MinMaxTemperature } from '@/lib/types'

function Days(props: MinMaxTemperature) {
    return (
        <Card className="h-60 w-40 shrink-0">
            <CardHeader className='text-center'>
                <CardTitle>
                    {props.dayOfWeek ?
                        <>
                            {props.dayOfWeek.substring(0, 3)}
                        </>
                        :
                        <Skeleton className="h-6 w-[110px]" />
                    }
                </CardTitle>
            </CardHeader>
            <CardContent className='flex justify-center'>
                {props.weatherIcon ?
                    <Image
                        alt='svg'
                        src={`/openweathermap/${props.weatherIcon}.svg`}
                        width={75}
                        height={75}
                    />
                    :
                    <Skeleton className="h-16 w-16 rounded-full" />
                }


            </CardContent>
            <CardFooter className='flex justify-center'>
                {props.max && props.min ?
                    <p>{props.max.toFixed(1)}° <span className='text-slate-500'>{props.min.toFixed(1)}°</span></p>
                    :
                    <Skeleton className="h-4 w-[200px]" />
                }

            </CardFooter>
        </Card>
    )
}

export default Days