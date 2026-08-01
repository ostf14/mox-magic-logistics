import { Catalog } from '@/components/Catalog'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Rules } from '@/components/Rules'
import { Tariffs } from '@/components/Tariffs'
import { Worklog } from '@/components/Worklog'
import { OrderProvider, OrderSection } from '@/components/order/OrderSection'

export default function Page() {
  return (
    <OrderProvider>
      <Header />
      <main>
        <Hero />
        <Tariffs />
        <Catalog />
        <OrderSection />
        <HowItWorks />
        <Rules />
      </main>
      <Footer />
      <Worklog />
    </OrderProvider>
  )
}
