import Img from 'next/image';

interface IProps {
  classes: string;
}

export default function Logo({ classes }: IProps) {
  return (
    <>
      <div className={`block dark:hidden relative ${classes}`}>
        <Img src="/standalone-icon.svg" layout="fill" objectFit="contain" />
      </div>
      <div className={`hidden dark:block relative ${classes}`}>
        <Img
          src="/standalone-icon-dark.svg"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </>
  );
}
