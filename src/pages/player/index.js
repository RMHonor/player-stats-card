import { getPlayerById } from '../../lib/api/get';
import { renderElementTree, renderTable, renderError } from '../../lib/dom/render';
import select from '../../lib/dom/select';
import getParams from '../../lib/window/getParams';

import './players.scss';

(async function () {
    try {
        const data = await getPlayerById(getParams().id || -1);

        renderPlayerBanner(data.player);

        const playerInfo = createPlayerInfoTable(data.player);
        const playerStats = createPlayerStatsTable(data.stats);

        renderTable(playerInfo, select('.player-info-table'));
        renderTable(playerStats, select('.player-stats-table'));
    } catch (err) {
        renderError('Error', 'Unable to load player, please try again later', select('.container'));
    }

    select('.loader').style.display = 'none';
})();

function renderPlayerBanner(player) {
    const tree = [
        {
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'player-banner__portrait-container col-sm-3 col-xs-12' },
            ],
            children: [
                {
                    tagName: 'div',
                    attributes: [
                        { key: 'class', value: `player-banner__portrait player-image--${player.id}`},
                    ],
                },
            ],
        },
        {
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'player-banner__info col-sm-7 col-xs-8' },
            ],
            children: [
                {
                    tagName: 'h2',
                    text: `${player.name.first} ${player.name.last}`,
                    attributes: [
                        { key: 'class', value: `player-banner__name`}
                    ],
                },
                {
                    tagName: 'p',
                    text: player.info.shirtNum,
                    attributes: [
                        { key: 'class', value: `player-banner__number`},
                    ],
                },
            ],
        },
        {
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'player-banner__club col-sm-2 col-xs-4' },
            ],
            children: [
                {
                    tagName: 'div',
                    attributes: [
                        { key: 'class', value: `team-icon--${player.currentTeam.id}` },
                    ],
                },
            ],
        },
    ];

    renderElementTree(tree, select('.player-banner'));
}

function createPlayerInfoTable(player) {
    return {
        headers: ['About'],
        body: [
            ['Age', player.age],
            ['Nationality', player.nationalTeam.demonym],
            ['Team', player.currentTeam.name],
            ['Position', player.info.positionInfo],
            ['First team', player.currentTeam.teamType === 'FIRST' ? 'Yes' : 'No'],
        ],
    };
}

function createPlayerStatsTable(stats) {
    const getStat = (statName) =>
        stats.filter(el => el.name === statName)[0].value;

    return {
        headers: ['Stats'],
        body: [
            ['Goals', getStat('goals')],
            ['Apperances', getStat('appearances')],
            ['Wins', getStat('wins')],
            ['Losses', getStat('losses')],
            ['Draws', getStat('draws')],
            ['Forward passes', getStat('fwd_pass')],
            ['Backward passes', getStat('goals')],
            ['Assists', getStat('goal_assist')],
            ['Mins player', getStat('mins_played')],
        ],
    };
}
