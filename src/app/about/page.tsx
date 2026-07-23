import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { site, notices } from "@/data/demo-content";

export const metadata: Metadata = {
  title: "Про проєкт — Care Guide",
  description: "Чому існує Care Guide, як побудовані рекомендації та чому це не інтернет-магазин.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-2xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 pb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Про проєкт</h1>
          <p className="text-ink/70 sm:text-lg leading-relaxed">
            {site.name} — незалежний інформаційний ресурс, який допомагає підібрати зрозумілий
            догляд: готові добірки, покрокові схеми та прості пояснення, без потреби розбиратися
            в десятках окремих засобів.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Навіщо цей проєкт</h2>
          <p className="text-ink/70 leading-relaxed">
            Більшості людей не потрібен великий каталог — потрібна зрозуміла точка старту. Цей
            сайт існує, щоб швидко показати підходящу добірку чи схему замість того, щоб змушувати
            порівнювати десятки товарів самостійно.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Як побудовані рекомендації</h2>
          <p className="text-ink/70 leading-relaxed">
            Рекомендації базуються на простих і прозорих правилах: коротке опитування («Підібрати
            догляд») або вибір за потребою веде до вже готової добірки чи схеми. Це не
            персоналізована діагностика і не штучний інтелект — лише зрозуміла логіка на основі
            типових потреб.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-8 space-y-4">
          <h2 className="text-lg sm:text-xl font-bold">Це не інтернет-магазин</h2>
          <p className="text-ink/70 leading-relaxed">
            Сайт не приймає оплату, не обробляє замовлення та не здійснює доставку. Тут можна
            ознайомитися із засобом та його роллю в догляді, а замовлення, оплата й доставка
            відбуваються на сайті продавця.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-10 space-y-4">
          <Notice>
            <p>{notices.independent}</p>
            <p>{notices.affiliate}</p>
          </Notice>
          <Notice>
            <p>{notices.medical}</p>
          </Notice>
        </section>

        <section className="max-w-2xl mx-auto px-5 sm:px-8 pb-16 sm:pb-20">
          <Button href="/selection">Підібрати догляд</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
