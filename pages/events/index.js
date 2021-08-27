import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import EventDescription from '../../components/events-detail/EventDescription';
import EventHeader from '../../components/events-detail/EventHeader';
import EventHero from '../../components/events-detail/EventHero';
import EventPresenters from '../../components/events-detail/EventPresenters';
import useSWR from 'swr';

export default function Events() {
  const router = useRouter();
  const { eventId } = router.query;
  let { data: eventsData } = useSWR(
    eventId ? `/api/events?eventId=${eventId}` : null
  );
  let { data: presentersData } = useSWR('/api/presenters');

  eventsData = eventsData?.data[0];
  presentersData = presentersData?.data.filter((el) => el.id_event == eventId);

  return (
    <div className="overflow-hidden">
      <Head>
        <title>POSTGRE 2021 | Pendaftaran Event</title>
      </Head>

      <EventHero imageUrl={eventsData?.photo} />

      <div className="min-h-screen bg-blue-50/30 relative max-w-7xl mx-auto">
        {/* Ornament */}
        <div className="absolute h-full w-full">
          {/* Right */}
          <div className="h-72 w-72 absolute -top-24 -right-44 opacity-10">
            <Image
              src="/assets/ornament.svg"
              layout="fill"
              className="animate-spin-slow"
            />
          </div>
          <div className="h-72 w-72 absolute top-1/2 -right-36 opacity-40">
            <Image
              src="/assets/ornament.svg"
              layout="fill"
              className="animate-spin-slow"
            />
          </div>
          {/* Left */}
          <div className="h-72 w-72 absolute -bottom-20 -left-36 opacity-10">
            <Image
              src="/assets/ornament.svg"
              layout="fill"
              className="animate-spin-slow"
            />
          </div>
          <div className="h-72 w-72 absolute bottom-1/2 -left-44 opacity-10">
            <Image
              src="/assets/ornament.svg"
              layout="fill"
              className="animate-spin-slow"
            />
          </div>
        </div>

        {/* Content */}
        <main className="relative p-8 max-w-6xl mx-auto">
          <EventHeader
            title={eventsData?.title}
            date={eventsData?.date}
            startTime={eventsData?.start_time}
          />
          <EventDescription desc={eventsData?.desc} />
          <EventPresenters presentersData={presentersData} />
        </main>
      </div>
    </div>
  );
}
