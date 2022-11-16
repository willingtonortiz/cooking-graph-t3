import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Cooking Graph</title>
        <meta name="description" content="Cooking Graph" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <p>Hello World</p>
      </div>
    </>
  );
};

export default Home;
