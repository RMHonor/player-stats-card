import { getAllPlayers, getPlayerById } from '../../lib/api/get';

(function () {
    getAllPlayers().then(data => {
        console.log(data)
    });
})();
