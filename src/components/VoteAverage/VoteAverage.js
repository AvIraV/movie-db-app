import borderColorVoteAverage from "../../assets/function/BorderColorVoteAverage";
import "./VoteAverage.css";

const VoteAverage = ({ vote_average }) => {
  let classNames = `vote ${borderColorVoteAverage(vote_average)}`;
  return <span className={classNames}>{vote_average.toFixed(1)}</span>;
};

export default VoteAverage;
