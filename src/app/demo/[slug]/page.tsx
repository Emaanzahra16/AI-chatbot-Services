export default function DemoPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-2xl text-center space-y-4">

        <h1 className="text-4xl font-bold">
          AI Demo for {params.slug.replace('-', ' ')}
        </h1>

        <p className="text-white/60">
          This is a personalized AI chatbot + automation system built for your business.
        </p>

        <div className="rounded-xl border border-white/10 p-6 bg-white/5">
          <p className="text-sm text-white/70">
            • Automated customer support  
            <br />
            • Lead capture system  
            <br />
            • WhatsApp integration  
            <br />
            • 24/7 AI agent  
          </p>
        </div>

      </div>
    </div>
  );
}