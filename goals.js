class Goals {
  constructor(){
    this.goalSquares = [
      new Goal([[5,5]]),
      new Goal([[33,18]]),
      new Goal([[42,33]]),
      new Goal([[50,40]]),
      new Goal([[12,44]])
    ] ;
  }

  getTotalGoalCount(){
    return this.goalSquares.length ;
  }

  getTotalGoalsAchieved(){
    let goalsAchieved = 0 ;
    for (const goalObj of this.goalSquares){
      if (goalObj.isGoalOwned()){
        goalsAchieved++ ;
      }
    }

    return goalsAchieved ;
  }
}