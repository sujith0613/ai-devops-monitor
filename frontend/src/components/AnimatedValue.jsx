import CountUp from "../reactbits/CountUp";

export default function AnimatedValue({ value, decimals = 1 }) {
  return <CountUp to={value} from={0} duration={1.2} separator="" className="" startWhen={true}/>;
}
