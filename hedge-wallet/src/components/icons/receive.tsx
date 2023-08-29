const ReceiveIcon = ({ fill = '#4CB944' }: { fill: string }) => {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 1.66699V12.3337M5 12.3337L9 8.33366M5 12.3337L1 8.33366"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ReceiveIcon;
