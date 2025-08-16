// components/Meta.tsx
import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const Meta: React.FC<MetaProps> = ({
  title ,
  description,
  url = "https://www.cryptohub.com",
  image = "https://www.cryptohub.com/assets/og-image.png",
}) => (
  <Head>
    {/* Primary Meta Tags */}
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="CryptoHub" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta property="og:site_name" content="CryptoHub" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:site" content="@CryptoHub" />
    <meta name="twitter:creator" content="@CryptoHub" />

    {/* Favicon */}
    <link rel="icon" href="/favicon.ico" />
    <link rel="shortcut icon" href="/favicon.ico" />
  </Head>
);

export default Meta;
