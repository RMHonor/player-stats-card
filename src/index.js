import 'babel-polyfill';

import Player from './player';
import data from './data/player-stats.json';

//app entry point
(function () {
  const playerSelect = renderDropDown(data.players);

  playerSelect.onchange = populatePlayerCard;
})();

function renderDropDown(players) {
  const dropdown = document.querySelector('.player-select')
  players.forEach(({ player }) => {
    const option = createElement('option',
      [
        { key: 'class', value: 'player-select__option'},
        { key: 'value', value: player.id},
      ],
      `${player.name.first} ${player.name.last}`,
    );

    dropdown.appendChild(option);
  });

  return dropdown;
}

function populatePlayerCard(evt) {
  let player = new Player(
    data.players.find(player => player.player.id === +evt.target.value)
  );

  document.querySelector('.player-card')
    .classList.remove('player-card--hidden');
  document.querySelector('.player-card__name')
    .innerText = player.name;
  document.querySelector('.player-card__position')
    .innerText = player.position;
  document.querySelector('.player-card__image')
    .setAttribute('class', `player-card__image player-image--${player.id}`);
  document.querySelector('.player-card__badge')
    .setAttribute('class', `player-card__badge team-badge--${player.team.id}`);

  const stats = {
    'Appearances': player.getStat('appearances'),
    'Goals': player.getStat('goals'),
    'Assists': player.getStat('goal_assist'),
    'Goals per match': player.getGoalsPerMatch().toFixed(2),
    'Passes per minute': player.getPassesPerMinutes().toFixed(2),
  };

  renderPlayerStats(stats);
}

function renderPlayerStats(stats) {

  const renderPlayerStat = (statName, statValue) => {
    let statContainer = createElement('div', [{key: 'class', value: 'player-card__stat'}]);
    const statNameElement =
      createElement('span', [{key: 'class', value: 'player-card__stat--name'}], statName);
    const statValueElement =
      createElement('span', [{key: 'class', value: 'player-card__stat--value'}], statValue);

    statContainer = document.querySelector('.player-card__stats').appendChild(statContainer);
    statContainer.appendChild(statNameElement);
    statContainer.appendChild(statValueElement);
  };

  //delete prior stats
  const statsList = document.querySelector('.player-card__stats');
  while (statsList.firstChild) {
    statsList.removeChild(statsList.firstChild);
  }

  Object.keys(stats).forEach((key) => {
    renderPlayerStat(key, stats[key])
  })
}

function createElement(tagName, attributes = [], text = '') {
  const element = document.createElement(tagName);
  attributes.forEach((attr) => {
    element.setAttribute(attr.key, attr.value);
  });
  element.innerText = text;

  return element;
}
