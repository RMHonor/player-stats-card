import 'babel-polyfill';

import { getAllPlayers, getPlayerById } from '../../lib/api/get';
import { renderElementTree, renderError } from '../../lib/dom/render';
import select from '../../lib/dom/select';

import './home.scss';

(async function () {
    try {
        const data = await getAllPlayers();

        const playerTree = createPlayerTree(data.players);
        renderElementTree(playerTree, select('.container'));
    } catch (err) {
        renderError('Error', 'Unable to load players, please try again later', select('.container'));
    }

    select('.loader').style.display = 'none';
})();

function createPlayerTree(players) {
    const tree = [];
    tree.push({
        tagName: 'h2',
        text: 'Select a player:',
    });

    players.forEach(({player}) => {
        tree.push({
            tagName: 'div',
            attributes: [
                { key: 'class', value: 'col-lg-3 col-md-4 col-sm-6 col-xs-12' },
            ],
            children: [
                {
                    tagName: 'a',
                    attributes: [
                        { key: 'class', value: 'player-tile__container' },
                        { key: 'href', value: `./player?id=${player.id}` },
                    ],
                    children: [
                        {
                            tagName: 'div',
                            attributes: [
                                { key: 'class', value: `player-tile__image player-image--${player.id}`},
                            ],
                        },
                        {
                            tagName: 'div',
                            attributes: [
                                { key: 'class', value: 'player-tile__name'}
                            ],
                            children: [
                                {
                                    tagName: 'span',
                                    text: player.name.first,
                                },
                                {
                                    tagName: 'br'
                                },
                                {
                                    tagName: 'span',
                                    text: player.name.last,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    return tree;
}
