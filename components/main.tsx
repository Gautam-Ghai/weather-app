import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"


import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Image from 'next/image'
import { CurrentWeatherDataResponse } from '@/lib/types'
import { useEffect, useState } from "react"

interface Props {
    weather: CurrentWeatherDataResponse
}

function Main({ weather }: Props) {

    const [date, setDate] = useState<string | null>(null)
    const [time, setTime] = useState<string | null>(null)

    useEffect(() => {
        if (weather.dt) {
            const event = new Date(weather.dt*1000);
            setDate(
                event.toLocaleDateString('en-US', {
                    weekday: 'long', //year: 'numeric', month: 'long', day: 'numeric'
                })
            )

            setTime(
                event.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                })
            )
        }
    }, [weather.dt])


    return (
        <Card className="h-full w-full">
            <CardHeader>
                <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="Search for places ..." />
                    <Button variant="ghost"> <Search className="h-6 w-6" /></Button>
                </div>
            </CardHeader>
            <CardContent className='p-10'>
                <div className='flex flex-col items-center justify-center'>
                    {
                        weather.weather[0].icon ?
                            <Image
                                alt='svg'
                                src={`/openweathermap/${weather.weather[0].icon}.svg`}
                                width={300}
                                height={300}
                            />
                            :
                            <Skeleton className="h-40 w-40 rounded-full" />
                    }

                </div>
                <h1 className="my-10 scroll-m-20 text-8xl font-extralight tracking-tight">
                    {weather.main.temp ?
                        <>
                            {weather.main.temp}<span className='absolute pt-3 text-3xl font-normal'>°C</span>
                        </>
                        :
                        <Skeleton className="h-16 w-[200px]" />
                    }



                </h1>
                {weather.dt ?
                    <p className='text-xl'>{date}, <span className='text-slate-500'>{time}</span></p>
                    :
                    <Skeleton className="h-8 w-[200px]" />
                }

            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default Main