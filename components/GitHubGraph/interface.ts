export default interface IDataProps {
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
