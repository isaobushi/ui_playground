import React from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client";

interface IDataProps {
  data: [
    {
      __typename: string;
      contributionDays: [
        {
          __typename: string;
          date: string;
          contributionCount: number;
        }
      ];
    }
  ];
}
export default function Home(props: IDataProps) {
  // function that check previous value then assign color
  const { data } = props;
  const checkColor = (value: number, previousValue: number) => {
    if (value > previousValue) {
      return "darkgreen";
    } else if (value === 0) {
      return "grey";
    } else {
      return "yellow";
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "90%" }}>
      {data.map((week) => {
        const { contributionDays } = week;
        return (
          <div
            key={Math.random()}
            style={{
              display: "flex",
              border: "1px solid grey",
              padding: "3px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {contributionDays.map((day, i) => {
                const previousDayCount = contributionDays[i - 1]
                  ? contributionDays[i - 1].contributionCount
                  : 0;
                return (
                  <div
                    key={Math.random()}
                    style={{
                      height: "10px",
                      width: "10px",
                      backgroundColor: checkColor(
                        day.contributionCount,
                        previousDayCount
                      ),
                      textAlign: "center",
                      padding: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "2px",
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
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
      data: data.user.contributionsCollection.contributionCalendar.weeks,
    },
  };
}
