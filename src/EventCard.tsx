import { Calendar, Clock, MapPin } from 'lucide-react'
import React from 'react'


type EventCardProps = {
    image: string,
    title: string,
    date: string,
    time: string,
    location: string,
    description: string,
    type: string
}

const EventCard: React.FC<EventCardProps> = ({ image, title, date, time, location, description, }) => {
    return (

        <div className='w-84 bg-white border-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'>
            <img src={image} alt={title} />
            <div className='p-4 space-y-2'>
                <div className='flex flex-col space-y-1'>
                    <h3 className='text-l font-bold leading-snug'>{title}</h3>
                    <p className='font-light'>{description}</p>
                </div>
                <div className='text-sm text-gray-600 space-y-1'>
                    <p className='inline-flex'><Calendar /> {date}</p>
                    <p className='inline-flex'><Clock />Saat: {time}</p>
                    <p className='inline-flex'><MapPin />Konum: {location}</p>
                </div>
            </div>
        </div>
    )
}

export default EventCard