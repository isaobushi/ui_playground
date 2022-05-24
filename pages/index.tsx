import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home() {
  return <div></div>;
}
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query ($userName: String!) {
        user(login: $userName) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      userName: "mr-m3l3",
    },
  });

  return {
    props: {
      data,
    },
  };
}
