import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Thinker
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Submit comprehensive website specifications and get Fortune 500-quality results
        </p>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold mb-2">Choose a Template</h3>
                <p className="text-sm text-gray-600">
                  Select from our curated templates or start with a blank canvas
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-semibold mb-2">Fill the Form</h3>
                <p className="text-sm text-gray-600">
                  Complete our comprehensive multi-step form with your requirements
                </p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-gray-600">
                  Receive a tracking ID and monitor your request status
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/request"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Start Your Request
          </Link>

          <div className="mt-8 text-sm text-gray-500">
            <Link href="/admin" className="hover:text-blue-600 transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-auto py-8 text-center text-sm text-gray-500">
        <p>Thinker © 2025 - Fortune 500 Website Request System</p>
      </footer>
    </div>
  );
}
