import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { format } from "date-fns";

/**
 Calculates the time difference between the server time and client time.
 @param {Date} serverTime - The server time.
 @param {Date} clientTime - The client time.
 @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */

const calculateTimeDifference = (serverTime, clientTime) => {
  console.log("ServerTime: " ,serverTime);
  console.log("ClientTime: ", clientTime);

  const days = Math.abs(serverTime.getDay() - clientTime.getDay())
  const hours = Math.abs(serverTime.getHours() - clientTime.getHours())
  const minutes = Math.abs(serverTime.getMinutes() - clientTime.getMinutes())
  const seconds = Math.abs(serverTime.getSeconds() - clientTime.getSeconds())

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home({ serverTime }) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    setClientTime(new Date().toISOString());
  }, []);

  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  return (
      <>
        <Head>
          <title>Web 2 - Exam TD</title>
          <meta name="description" content="Just an exam" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1>The easiest exam you will ever find</h1>
          <div>
            {/* Display the server time (DD-MM-YYYY HH:mm) */}
            <p>
              Server time: <span className="serverTime">{format(new Date(serverTime), "dd-MM-yyyy HH:mm")}</span>
            </p>
            {/* Display the time difference between the server side and the client side */}
            <p>
              Time diff:{" "}
              <span className="serverTime">
              {calculateTimeDifference(new Date(serverTime), new Date(clientTime))}
            </span>
            </p>
          </div>

          <div>
            <button onClick={moveToTaskManager}>Go to task manager</button>
          </div>
        </main>
      </>
  );
}

export async function getServerSideProps() {
  const serverTime = new Date().toISOString();
  return {
    props: {
      serverTime,
    },
  };
}
