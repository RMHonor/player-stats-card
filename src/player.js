function Player(player) {
  this.stats = player.stats;
  this.name = `${player.player.name.first} ${player.player.name.last}`;
  this.id = player.player.id;
  this.team = player.player.currentTeam;

  switch (player.player.info.position){
    case 'D':
      this.position = 'Defender';
      break;
    case 'M':
      this.position = 'Midfield';
      break;
    case 'F':
      this.position = 'Striker';
      break;
  }
}

Player.prototype.getStat = function(statName) {
  const stat = this.stats.find(stat => stat.name === statName);
  return stat ? stat.value : 0;
};

Player.prototype.getGoalsPerMatch = function() {
  const gpm = this.getStat('goals') / this.getStat('appearances');
  return isFinite(gpm) ? gpm : 0;
};

Player.prototype.getPassesPerMinutes = function() {
  const ppm = (this.getStat('fwd_pass') + this.getStat('backward_pass')) /
    this.getStat('mins_played');
  return isFinite(ppm) ? ppm : 0;
};

export default Player;