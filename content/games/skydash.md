+++
date = '2025-02-10T22:54:52+01:00'
draft = false
title = 'Sky Dash'
featured_image = ""
description = "A complete version of my first game ever built"
+++

<div id="gameframe"></div>
<div class="inst_table game">
    <table>
        <tr>
            <th class>Game Controls:</th>
            <th class="item">How to play</th>
        </tr>
        <tr>
            <td>Space bar<br>Left-click</td>
            <td class="item"> Try to survive the longest while avoiding seagulls and lava blocks.</td>
        </tr>
    </table>
</div>
<script src="/js/table_renderer.js"></script>
<script>
    var curr_Path = window.location.pathname;
    var gameDiv = document.getElementById('gameframe');
    if(curr_Path === "/games/skydash/" && gameDiv.childElementCount === 0){
        const iframe = document.createElement("iframe");
        iframe.classList.add('game');
        iframe.src = "/playableGames/Sky-Dash-Beta-1.9.1/web/index.html";
        iframe.width = "600px";
        iframe.height = "400px";
        document.getElementById('gameframe').appendChild(iframe);
        console.log("Woohoo!");
    }
</script>

Sky Dash is an amazing, yet simple game. While speeding across the clouds and floating platforms, make sure to dodge the incoming lava blocks and seagulls. And who knows, you might even set a new highscore!