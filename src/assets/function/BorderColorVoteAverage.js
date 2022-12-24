export default function borderColorVoteAverage(vote_average) {
  if (vote_average < 3) {
    return "red";
  }
  if ((vote_average >= 3) & (vote_average < 5)) {
    return "orange";
  }
  if ((vote_average >= 5) & (vote_average < 7)) {
    return "yellow";
  }
  if (vote_average >= 7) {
    return "green";
  }
}
