import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";

actor {
  type ScoreEntry = {
    playerName : Text;
    moveCount : Nat;
    timeInSeconds : Nat;
    timestamp : Int;
  };

  module ScoreEntry {
    public func compareByMoves(entry1 : ScoreEntry, entry2 : ScoreEntry) : Order.Order {
      if (entry1.moveCount < entry2.moveCount) {
        #less;
      } else if (entry1.moveCount > entry2.moveCount) {
        #greater;
      } else if (entry1.timeInSeconds < entry2.timeInSeconds) {
        #less;
      } else if (entry1.timeInSeconds > entry2.timeInSeconds) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  let scoresList = List.empty<ScoreEntry>();

  public shared ({ caller }) func saveScore(playerName : Text, moveCount : Nat, timeInSeconds : Nat, timestamp : Int) : async () {
    let newEntry : ScoreEntry = {
      playerName;
      moveCount;
      timeInSeconds;
      timestamp;
    };
    scoresList.add(newEntry);
  };

  public query ({ caller }) func getTopScores() : async [ScoreEntry] {
    let scoresArray = scoresList.toArray();
    let sortedArray = scoresArray.sort(ScoreEntry.compareByMoves);
    let resultList = List.empty<ScoreEntry>();
    for (i in Nat.range(0, 10)) {
      if (i >= sortedArray.size()) { return resultList.toArray() };
      resultList.add(sortedArray[i]);
    };
    resultList.toArray();
  };

  public shared ({ caller }) func clearScores() : async () {
    scoresList.clear();
  };
};
