const SendIcon = ({ fill = '#fff' }: { fill: string }) => {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12.3337V1.66699M5 1.66699L1 5.66699M5 1.66699L9 5.66699"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SendIcon;
