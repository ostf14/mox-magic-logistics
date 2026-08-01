import { Catalog } from '@/components/Catalog'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Rules } from '@/components/Rules'
import { Tariffs } from '@/components/Tariffs'
import { Ticker } from '@/components/Ticker'
import { Worklog } from '@/components/Worklog'
import { OrderProvider, OrderSection } from '@/components/order/OrderSection'

export default function Page() {
  return (
    <OrderProvider>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Tariffs />
        <Catalog />
        <OrderSection />
        <HowItWorks />
        <Rules />
        <Worklog />
      </main>
      <Footer />
    </OrderProvider>
  )
}
