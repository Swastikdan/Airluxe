import './globals.css';
import { DM_Sans, Sora, Pathway_Extreme } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const pathway_extreme = Pathway_Extreme({
  subsets: ['latin'],
  variable: '--font-pathway-extreme',
  display: 'swap',
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Nestly | Holiday rentals, cabins, beach houses &amp; more',
  description:
    'Nestly is a web application that helps users find the best home deals in their desired location. We offer a wide range of homes to choose from, with competitive prices and excellent customer service.',
  twitterCard: '/android-chrome-512x512.png',
  ogTitle: 'Nestly | Holiday rentals, cabins, beach houses &amp; more',
  ogDescription:
    'Nestly is a web application that helps users find the best home deals in their desired location. We offer a wide range of homes to choose from, with competitive prices and excellent customer service.',
  ogUrl: 'https://nestly.vercel.app/', // Replace with your website URL
  ogImage: '/android-chrome-512x512.png', // Replace with the appropriate path to your image file
  ogImageWidth: '512',
  ogImageHeight: '512',
};
import SessionProvider from '../providers/SessionProvider';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="en" />
      <meta name="author" content="....." />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta
        name="robots"
        content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="robots" content="noodp " />
      <meta name="description" content={metadata.description} />
      <meta name="twitter:card" content={metadata.twitterCard} />
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:url" content={metadata.ogUrl} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:image:width" content={metadata.ogImageWidth} />
      <meta property="og:image:height" content={metadata.ogImageHeight} />
      <meta name="robots" content="index, follow" />
      <title>{metadata.title}</title>
      <link rel="canonical" href={metadata.ogUrl} />
      <meta name="apple-mobile-web-app-title" content="Nestly" />
      <meta name="application-name" content="Nestly" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="manifest"
        href="/site.webmanifest"
        crossOrigin="use-credentials"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
        href="apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="114x114"
        href="apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="72x72"
        href="apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="144x144"
        href="apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="60x60"
        href="apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="120x120"
        href="apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="76x76"
        href="apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        sizes="152x152"
        href="apple-touch-icon-152x152.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="favicon-196x196.png"
        sizes="196x196"
      />
      <link
        rel="icon"
        type="image/png"
        href="favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href="favicon-128.png"
        sizes="128x128"
      />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <meta name="application-name" content="&nbsp;" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
      <meta
        name="msapplication-square150x150logo"
        content="mstile-150x150.png"
      />
      <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
      <meta
        name="msapplication-square310x310logo"
        content="mstile-310x310.png"
      />
      <head />
      <body
        className={`${pathway_extreme.variable} overflow-y-auto 
          scroll-smooth 
        [&::-webkit-scrollbar-thumb]:bg-gray-400
        dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
          [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        dark:[&::-webkit-scrollbar-track]:bg-slate-700  [&::-webkit-scrollbar]:w-2`}
      >
        <SessionProvider>
          <NavBar />
          <main className="mx-auto w-full  ">
            {children}
            <div className="font-heading">
              <Toaster richColors />
            </div>
          </main>
          <BottomNav />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
