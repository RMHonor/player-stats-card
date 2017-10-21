import { getAllPlayers, getPlayerById } from '../../lib/api/get';
import { createElementTree } from '../../lib/dom/render';
import select from '../../lib/dom/select';

import './home.scss';

(async function () {
    const data = await getAllPlayers();

    console.log(data);

    const playerTree = createPlayerTree(data.players);

    createElementTree(playerTree, select('.container'));
})();

function createPlayerTree(players) {
    const tree = [];

    players.forEach(({player}) => {
        tree.push({
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'col-lg-3 col-md-4 col-sm-6 col-xs-12' }
            ],
            children: [
                {
                    tagName: 'div',
                    attributes: [
                        { key: 'class', value: `player-tile__image player-image--${player.id}`}
                    ],
                },
                {
                    tagName: 'span',
                    text: `${player.name.first} ${player.name.last}`,
                    attributes: [
                        { key: 'class', value: 'player-tile__name'}
                    ]
                },
            ]
        });
    });

    return tree;
}
